---
layout: page
title: "Training Models for Aletheia"
subtitle: "" 
noindex: false
meta-title: "EfficientNet-b0 Model Training for Aletheia"
meta-description: "Article about training models for Aletheia"
meta-keywords: "steganography, steganalysis, images, DCI"
lang-suffix: "-en"
comments: true
---

> In this article, we will see how to use the commands offered by 
> [Aletheia](https://github.com/daniellerch/aletheia) to train EfficientNet-b0 models



<style>
    [id]::before {
        content: '';
        display: block;
        height: 70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

## Contents

1. [Introduction](#introduction)
2. [Image Databases](#image-databases)
3. [Dataset Preparation](#dataset-preparation)
4. [Model Training](#model-training)
5. [Testing the Models](#testing-the-models)
6. [Making Predictions](#making-predictions)


<br>
## Introduction


This article explores the training of EfficientNet-B0 models for the 
steganographic analysis of images using Aletheia. We will start with 
a collection of 'cover' images, which are those without hidden messages. 
This collection will be used to generate a set of 'stego' images, 
i.e., images that contain hidden messages. 

We will use cover and stego images to prepare a training dataset, 
which will include specific subsets for training, 
validation, and testing. The training images will be used to 
train the model, while the validation images will help determine the 
optimal point to conclude the training. Finally, we will evaluate the 
model's performance with the test image set to determine 
the effectiveness of the implemented training process.


<br>
## Image Databases

Most of the models provided by Aletheia are trained using 
the [Alaska2](https://www.kaggle.com/c/alaska2-image-steganalysis) database,
so we will use the same database for our examples.

The first step in creating our dataset is to 
create stego images. We already have cover images, so now
we will use Aletheia to create stego images. We will do this
by embedding information using the steganography method for which 
we want to create the model. 

In this example, we will use Steghide, so we will need the following
command to create the stego images.

```bash
./aletheia.py steghide-sim cover 0.05-0.50 stego
```

The parameters used are as follows:
- **steghide-sim**: We are going to use the Steghide simulator
- **cover**: Directory where the cover images are located.
- **0.05-0.50**: Indicates that embedding will be done using an insertion ratio per pixel 
(or in JPG images, per non-zero DCT coefficient) randomly chosen 
between 0.04 and 0.50 of the total
- **stego**: Directory where we will save the stego images.


At the end of the process, we will have all the images with a 
random message embedded. 


If we want to prepare DCI models, we will also need to create images with
double insertion. That is, images in which two 
messages have been embedded. These images are necessary for DCI models, which are used
to detect cases of [CSM](/stego/intro/faq-en#what-is-the-cover-source-mismatch).

For this, we need a second embedding on the images that
already have one embedding:

```bash
./aletheia.py steghide-sim stego 0.05-0.50 double
```

At the end of the process, we will have all the images with two messages
of random size embedded. So we can proceed to prepare the training
dataset.



<br>
## Dataset Preparation

Next, we are going to create a dataset for training. For
this, we will need the cover images from the image database
we are using and the stego images that we have prepared in the previous
section.

We will use the **split-sets** command from Aletheia, which will create a directory
with the images separated into three sets: the training set, the validation set, and the test set.

```bash
./aletheia.py split-sets cover stego trset-s0 1000 1000 0
```

The parameters used are as follows:
- **cover**: Directory where the cover images are located
- **stego**: Directory where the stego images are located
- **trset-s0**: Directory where the dataset will be saved
- **1000**: Number of images we want in the validation set
- **1000**: Number of images we want in the test set
- **0**: Seed used, so we can generate the same dataset again


As a result, we get three directories:

```bash
$ ls trset-s0
test train valid
```

Each of them with the folders **cover** and **stego**:

```bash
$ ls trset-s0/train
cover stego
$ ls trset-s0/valid
cover stego
$ ls trset-s0/test
cover stego
```

This dataset only serves us to train simple models,
it is not suitable for DCI models. To generate a dataset that is
suitable for both types of models, we will use the following command:



```bash
./aletheia.py split-sets-dci cover stego double trset-dci-s0 1000 1000 0
```

The parameters are the same as in the previous execution, with the only
difference being that now we have to provide the **double** directory as well.


In this case, as a result, we get the following directories:

```bash
$ ls trset-dci-s0
A_test  A_train  A_valid  B_test  B_train  B_valid
```

The **A_** directories are the same as in the initial execution, for normal
models, and each contains a cover directory and a stego directory:

```bash
$ ls trset-dci-s0/A_train
cover stego
$ ls trset-dci-s0/A_valid
cover stego
$ ls trset-dci-s0/A_test
cover stego
```

But in this case, we additionally have the **B_** directories, which contain
stego and double directories:

```bash
$ ls trset-dci-s0/B_train
stego double
$ ls trset-dci-s0/B_valid
stego double
$ ls trset-dci-s0/B_test
stego double
```

With the datasets prepared, we can proceed to training.

<br>
## Model Training

To train the models, we will differentiate between two types: the A models and
the B models. The A models are simple models that allow predicting
whether an image is cover or stego. These models can be trained with
the basic dataset, which does not contain double images, but also
with the DCI dataset. The B models are models that allow
predicting whether an image is stego or double. These models are only necessary
for the DCI method. 

The DCI method uses A and B models to determine if there are
inconsistencies in the classification, which allows predicting the percentage
of hits that the A model will have for a certain set of images
with similar statistical characteristics. That is, it allows knowing if 
a model is appropriate for the prediction of a set of images, or if
it is not, due to the [CSM](/stego/intro/faq-en#what-is-the-cover-source-mismatch) problem.


We can train an A type model with the following command, using the
basic dataset:

```bash
./aletheia.py effnetb0 trset-s0/train/cover trset-s0/train/stego \
        trset-s0/valid/cover trset-s0/valid/stego A-model 0 100 32
```


The parameters used are as follows:
- **trset-s0/train/cover**: Directory containing the cover training images
- **trset-s0/train/stego**: Directory containing the stego training images
- **trset-s0/valid/cover**: Directory containing the cover validation images
- **trset-s0/valid/stego**: Directory containing the stego validation images
- **A-model**: Name of the file in which the model will be saved
- **0**: Identifier of the GPU to be used
- **100**: Stop after 100000 x BS without improvement.
- **32**: Batch size.


If we are using a dataset for DCI, we simply have to 
change some directories: 

```bash
./aletheia.py effnetb0 trset-s0/A_train/cover trset-s0/A_train/stego \
        trset-s0/A_valid/cover trset-s0/A_valid/stego A-model 0 100 32
```

Training B models is very similar, although in this case it is necessary to have datasets for DCI. The only difference is that we have to use stego and double images. The command is as follows:

```bash
./aletheia.py effnetb0 trset-s0/B_train/stego trset-s0/B_train/double \
                       trset-s0/B_valid/stego trset-s0/B_valid/double B-model 0 100 32
```

Once the process is finished, we have models ready to be used.

<br>
## Testing the Models

To see the results we obtain with the models, we have the *effnetb0-score* command. We can use it as follows:

```bash
$ ./aletheia.py effnetb0-score trset-s0/test/cover/ trset-s0/test/stego A-model.h5 0
0.945
```

Or using the DCI dataset:

```bash
$ ./aletheia.py effnetb0-score trset-s0/A_test/cover/ trset-s0/A_test/stego A-model.h5 0
0.945
```

As can be seen, the results are quite high. However, in this case, we do not know if there is CSM, so the results might not be correct.

<br>
## Making Predictions

If we want to make direct predictions, for example, of images that we do not know if they are cover or stego, we can use the **effnetb0-predict** command:

```bash
$ ./aletheia.py effnetb0-predict trset-s0/A_test/stego A-model.h5 0
...
trset-s0/test/stego/75896.jpg 1.0
trset-s0/test/stego/76067.jpg 0.005
trset-s0/test/stego/76146.jpg 1.0
trset-s0/test/stego/76217.jpg 1.0
trset-s0/test/stego/76331.jpg 1.0
trset-s0/test/stego/76345.jpg 1.0
trset-s0/test/stego/76396.jpg 1.0
trset-s0/test/stego/76399.jpg 1.0
trset-s0/test/stego/76454.jpg 1.0
trset-s0/test/stego/76502.jpg 1.0
trset-s0/test/stego/76538.jpg 0.982
trset-s0/test/stego/76811.jpg 1.0
trset-s0/test/stego/76953.jpg 1.0
trset-s0/test/stego/77314.jpg 1.0
trset-s0/test/stego/77439.jpg 0.998
trset-s0/test/stego/78686.jpg 1.0
trset-s0/test/stego/78703.jpg 1.0
trset-s0/test/stego/78839.jpg 1.0
trset-s0/test/stego/78888.jpg 1.0
trset-s0/test/stego/78934.jpg 0.999
...
```

Again, we do not know if there is CSM, so the results might not be reliable.

If we are analyzing a set of images that come from the same actor, and we consider that they may have similar statistical characteristics, we can use the **effnetb0-dci-predict** command.

To do this, we prepare images from another different database, to see to what extent there is CSM and if we can take advantage of the trained model. We use the [Bossbase](http://agents.fel.cvut.cz/stegodata/BossBase-1.01-cover.tar.bz2) database. We prepare 1000 JPEG images with quality 80 and embed half using Steghide as explained above, leaving us with 500 cover and 500 stego images. We save them in a directory called **testset-A**. Next, we embed over all the images of **testset-A**, saving the result in a directory called **testset-B**.

We have prepared a test set with CSM, let's see the results:

```bash
$ ./aletheia.py effnetb0-dci-predict testset-A testset-B A-mode.h5 B-model.h5 0
...
testset-A/971.jpg 0
testset-A/9711.jpg 0
testset-A/9719.jpg INC
testset-A/9723.jpg 0
testset-A/9724.jpg 1
testset-A/9741.jpg INC
testset-A/9744.jpg 0
testset-A/9750.jpg INC
testset-A/9767.jpg INC
testset-A/9773.jpg INC
testset-A/9912.jpg 0
testset-A/9919.jpg 0
testset-A/9930.jpg INC
testset-A/9933.jpg INC
testset-A/9936.jpg INC
testset-A/9939.jpg INC
testset-A/9944.jpg INC
testset-A/9954.jpg 0
testset-A/9958.jpg INC
testset-A/9964.jpg INC
testset-A/9967.jpg INC
testset-A/9976.jpg INC
testset-A/9982.jpg 0
testset-A/9986.jpg 0
#inc: 370 #incF1: 337 #incF2: 36 #incF2C 32 #incF2S: 4
#no_inc: 630
--
dci-prediction-score: 0.815
```

As we can see, the DCI method tells us that using these models we will be correct approximately 81.5% of the time. These are good results, so with this CSM, we can trust the model.

For reference, the actual results when predicting images from this test set are 98%, a bit far from the prediction made by DCI.

Let's now see an example with high CSM. We will use the [LFW-FACES](https://paperswithcode.com/dataset/lfw) database. We proceed as in the previous example, obtaining a set of 500 cover and 500 stego images. These are the results:

```bash
$ ./aletheia.py effnetb0-dci-predict testset-A testset-B A-mode.h5 B-model.h5 0
...
A/Wang_Yingfan_0002.jpg INC
A/Wang_Yingfan_0003.jpg INC
A/Wayne_Ferreira_0002.jpg INC
A/Wen_Ho_Lee_0001.jpg 0
A/Wes_Craven_0001.jpg INC
A/Wilbert_Elki_Meza_Majino_0001.jpg 0
A/William_Delahunt_0001.jpg 0
A/William_Genego_0001.jpg INC
A/William_Hyde_0001.jpg INC
A/William_Nessen_0001.jpg INC
A/Wolfgang_Schuessel_0004.jpg INC
A/Xavier_Malisse_0003.jpg INC
A/Yasar_Yakis_0003.jpg INC
A/Yasser_Arafat_0002.jpg INC
A/Yasser_Arafat_0005.jpg 0
A/Yoriko_Kawaguchi_0012.jpg INC
A/Yuri_Malenchenko_0002.jpg INC
A/Zalmay_Khalilzad_0001.jpg INC
A/Zavad_Zarif_0001.jpg 0
A/Zico_0001.jpg INC
A/Zinedine_Zidane_0005.jpg INC
#inc: 722 #incF1: 209 #incF2: 583 #incF2C 582 #incF2S: 1
#no_inc: 278
--
dci-prediction-score: 0.639
```

In this case, the DCI method tells us that using these models we will be correct approximately 63.9% of the time. These are not good results, so with this high CSM it is preferable not to use these models to make predictions with these images. It would be more appropriate to try with another model trained with images more statistically similar to these.

For reference, the actual results when predicting images from this test set are 66.5%, very close to the prediction made by DCI.

DCI predictions are automated using the models provided by Aletheia using the [“dci” command](/stego/aletheia/intro-en/#automated-tools).






