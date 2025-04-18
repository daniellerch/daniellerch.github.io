---
layout: page
title: "Introduction to steganalysis with Aletheia"
subtitle: "" 
noindex: false
meta-title: "Introduction to steganalysis with Aletheia"
meta-description: "Blog post about the basic usage of the Aletheia steganalysis tool"
meta-keywords: "steganography, steganalysis, images"
lang-suffix: "-en"
comments: true
---

<center style='margin-bottom:30px'>Aletheia <a href='https://github.com/daniellerch/aletheia/tree/v0.3'>v0.3</a></center>


> In this article we are going to talk about how to use the commands offered by 
> the [Aletheia](https://github.com/daniellerch/aletheia) tool for image stegaanalysis.



<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

1. [Aletheia commands](#aletheia-commands)
2. [Automated tools](#automated-tools)
3. [Structural attacks](#structural-attacks)
4. [Calibration attacks](#calibration-attacks)
5. [Simulators](#simulators)
6. [Machine/Deep Learning based steganalysis](#machinedeep-learning-based-steganalysis)
7. [Bruteforce attacks](#bruteforce-attacks)
8. [Other tools](#other-tools)


<br>
## Aletheia commands

[Aletheia](https://github.com/daniellerch/aletheia) is a command-based tool
for image steganalysis. Next we will see how to use these commands.

Details for installing Aletheia can be found
[here](https://github.com/daniellerch/aletheia/blob/master/INSTALL.md).

Once installed, executing Aletheia without parameters allows us to see a list 
of the available commands



```bash
$ ./aletheia.py

./aletheia.py <command>

COMMANDS:

  Automated tools:
  - auto:      Try different steganalysis methods.
  - dci:       Predict a set of images using DCI evaluation.

  Structural LSB detectors (Statistical attacks to LSB replacement):
  - spa:           Sample Pairs Analysis.
  - rs:            RS attack.
  - ws:            Weighted Stego Attack.
  - triples:       Triples Attack.

  Calibration attacks to JPEG steganography:
  - calibration:   Calibration attack on F5.

  Feature extractors:
  - srm:           Full Spatial Rich Models.
  - srmq1:         Spatial Rich Models with fixed quantization q=1c.
  - scrmq1:        Spatial Color Rich Models with fixed quantization q=1c.
  - gfr:           JPEG steganalysis with 2D Gabor Filters.
  - dctr:          JPEG Low complexity features extracted from DCT residuals.

  Embedding simulators:
  - lsbr-sim:             LSB replacement simulator.
  - lsbm-sim:             LSB matching simulator.
  - hugo-sim:             HUGO simulator.
  - wow-sim:              WOW simulator.
  - s-uniward-sim:        Spatial UNIWARD simulator.
  - s-uniward-color-sim:  Spatial UNIWARD color simulator.
  - j-uniward-sim:        JPEG UNIWARD simulator.
  - j-uniward-color-sim:  JPEG UNIWARD color simulator.
  - j-mipod-sim:          JPEG MiPOD simulator.
  - j-mipod-color-sim:    JPEG MiPOD color simulator.
  - hill-sim:             HILL simulator.
  - hill-color-sim:       HILL color simulator.
  - ebs-sim:              EBS simulator.
  - ebs-color-sim:        EBS color simulator.
  - ued-sim:              UED simulator.
  - ued-color-sim:        UED color simulator.
  - nsf5-sim:             nsF5 simulator.
  - nsf5-color-sim:       nsF5 color simulator.
  - steghide-sim:         Steghide simulator.
  - outguess-sim:         Outguess simulator.
  - steganogan-sim:       SteganoGAN simulator.

  ML-based steganalysis:
  - split-sets:            Prepare sets for training and testing.
  - split-sets-dci:        Prepare sets for training and testing (DCI).
  - create-actors:         Prepare actors for training and testing.
  - effnetb0:              Train a model with EfficientNet B0.
  - effnetb0-score:        Score with EfficientNet B0.
  - effnetb0-predict:      Predict with EfficientNet B0.
  - effnetb0-dci-score:    DCI Score with EfficientNet B0.
  - effnetb0-dci-predict:  DCI Prediction with EfficientNet B0.
  - e4s:                   Train Ensemble Classifiers for Steganalysis.
  - e4s-predict:           Predict using EC.
  - actor-predict-fea:     Predict features for an actor.
  - actors-predict-fea:    Predict features for a set of actors.

  Find password by brute force using a list of passwords:
  - brute-force-f5:            Brute force a password using F5
  - brute-force-steghide:      Brute force a password using StegHide
  - brute-force-outguess:      Brute force a password using Outguess
  - brute-force-openstego:     Brute force a password using OpenStego
  - brute-force-generic:       Generic tool for finding the password using a command

  Tools:
  - hpf:                   High-pass filter.
  - print-diffs:           Differences between two images.
  - print-dct-diffs:       Differences between the DCT coefficients of two JPEG images.
  - print-pixels:          Print a range of píxels.
  - print-coeffs:          Print a range of JPEG coefficients.
  - rm-alpha:              Opacity of the alpha channel to 255.
  - plot-histogram:        Plot histogram.
  - plot-histogram-diff:   Plot histogram of differences.
  - plot-dct-histogram:    Plot DCT histogram.
  - eof-extrat:            Extract the data after EOF.
  - print-metadata:        Print Exif metadata.

```


Each command has its own parameters. To know what parameters a command 
requires, we just have to execute it. For example, suppose we want to 
perform a WS attack. To know what parameters we need, we just have to 
execute this command:


```bash
$ ./aletheia.py ws
./aletheia.py ws <image>
```

As we can see, this command only needs to receive as a parameter the 
image that we want to analyze. Therefore, we can carry out the attack with 
a command like the following:


```bash
$ ./aletheia.py ws sample_images/lena_lsbr.png 
Hidden data found in channel R 0.10590840834668327
Hidden data found in channel G 0.07463418193363092
Hidden data found in channel B 0.07968467118722876
```
As you can see from Aletheia's output, we found hidden information 
on all three channels.


The dynamics of use is the same for all commands.



<br>
## Automated tools


Aletheia has different commands that greatly simplify some common 
steganalysis tasks. It belongs to the section:



```bash
  Automated tools:
  - auto:      Try different steganalysis methods.
  - dci:       Predict a set of images using DCI evaluation.
```


**The "auto" command:**

The first command is the **auto** command, which performs an exploratory 
analysis trying to identify the steganalysis technique used. 
Let's see an example:


```bash
$ ./aletheia.py auto actors/A2/

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                  [1.0]    [1.0]    [0.9]     0.3
4.jpg                  [1.0]    [1.0]    [0.7]     0.3
10.jpg                  0.0     [1.0]     0.3      0.2
6.jpg                   0.0     [1.0]     0.1      0.0
7.jpg                  [1.0]    [1.0]     0.3      0.1
8.jpg                   0.0     [1.0]     0.1      0.2
9.jpg                  [0.8]    [1.0]    [0.7]     0.1
1.jpg                  [1.0]    [1.0]    [0.8]     0.1
3.jpg                  [1.0]    [1.0]    [1.0]     0.3
5.jpg                   0.0      0.1     [0.7]    [0.6]

* Probability of steganographic content using the indicated method.
```


From which we deduce that the most probable steganography scheme is Steghide.

This command internally uses the 
[effnetb0](https://github.com/daniellerch/aletheia/tree/master/aletheia-models), 
models, which are models trained with the 
[Alaska2](https://github.com/daniellerch/aletheia/blob/master/aletheia-models/README.md). 
image database .
They are models for color images, so they cannot be used with grayscale images. 
On the other hand, using these models to predict images with statistical characteristics 
different from those of the Alaska2 images could lead to unreliable results. 
Because of this, it is advisable to use the **dci** command hich we will see next.



**The "dci" command**:


The second command is the **dci** command, used to detect cases in which the 
models used by Aletheia might not be appropriate for the images we are analyzing. 
This issue, known as CSM or *Cover Source Mismatch* is covered in some detail 
in the following articles:


- [Practical attack on Steghide](/stego/aletheia/steghide-attack-en/#can-we-trust-the-model).
- [Practical attack on F5](/stego/aletheia/f5-attack-en/#can-we-trust-the-model).


Therefore, it is advisable next to see if the models available in 
Aletheia are suitable for making predictions on these images, with 
Steghide. 
For this, we use the **dci** command in the following way:

```bash
$ ./aletheia.py dci steghide-sim actors/A2/
Preparing the B set ...
Using 16 threads
actors/A2/2.jpg          1
actors/A2/4.jpg          1 (inc)
actors/A2/10.jpg         1 (inc)
actors/A2/6.jpg          1 (inc)
actors/A2/7.jpg          1 (inc)
actors/A2/8.jpg          1
actors/A2/9.jpg          1 (inc)
actors/A2/1.jpg          1
actors/A2/3.jpg          1
actors/A2/5.jpg          0 (inc)
DCI prediction score: 0.7
```

As we can see, we get a DCI prediction of 0.7. This means that the
models used are correct, approximately, 70% of the time. If we consider
this percentage of success sufficient, we can trust the result.

Now, let's see what happens when, due to the CSM problem, the models
are not suitable.

We use the auto command with the B4 test actor:

```bash                                                                                                                  
$ ./aletheia.py auto actors/B4                                                                                           
                                                                                                                         
                     Outguess  Steghide   nsF5  J-UNIWARD *                                                              
-----------------------------------------------------------                                                              
2.jpg                   0.0      0.0     [0.9]    [0.5]                                                                  
4.jpg                  [0.7]    [1.0]     0.3     [0.5]                                                                  
10.jpg                  0.0     [1.0]     0.1      0.3                                                                   
6.jpg                   0.0      0.0      0.3     [0.9]                                                                  
7.jpg                  [1.0]     0.0      0.0     [0.6]                                                                  
8.jpg                   0.0      0.0      0.3     [0.5]                                                                  
9.jpg                   0.0      0.0      0.1     [0.9]                                                                  
1.jpg                   0.0     [1.0]     0.1     [0.6]                                                                  
3.jpg                   0.0      0.0      0.3      0.4                                                                   
5.jpg                   0.0      0.0     [0.9]    [0.6]                                                                  
                                                                                                                         
* Probability of steganographic content using the indicated method.                                                      
```      


Using the **auto** command, we see that the method most likely predicted is **J-UNIWARD**. Now, we are interested in knowing if the models are reliable for making this prediction.

We execute the **dci** command, this time for J-UNIWARD:

```bash
$ ./aletheia.py dci j-uniward-color-sim actors/B4 0

Preparing the B set ...
Using 16 threads
actors/B4/2.jpg          1 (inc)
actors/B4/4.jpg          1 (inc)
actors/B4/10.jpg         0 (inc)
actors/B4/6.jpg          1
actors/B4/7.jpg          1 (inc)
actors/B4/8.jpg          1 (inc)
actors/B4/9.jpg          1 (inc)
actors/B4/1.jpg          1 (inc)
actors/B4/3.jpg          0 (inc)
actors/B4/5.jpg          1 (inc)
DCI prediction score: 0.55
```

As we can see, the prediction made is 0.55. A 55% probability of success is very low, so it is not advisable to trust the results obtained. This is a case of CSM.


**IMPORTANT NOTE**: It should be noted that the "dci" command requires the analysis of an actor, not just a single image. This means that we need to have several images of the same actor (with the same statistical properties) to apply this method. About 10 images are usually sufficient, although the accuracy improves with the number of images.




<br>
## Structural attacks

Structural attacks are designed to detect algorithms that use the least significant 
bit replacement technique (LSB replacement). This technique is used by 
tools such as [OpenStego](https://www.openstego.com/) or 
[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html), among many others.


It belongs to the section:

```bash
  Structural LSB detectors (Statistical attacks to LSB replacement):
  - sp:            Sample Pairs Analysis (Octave vesion).
  - ws:            Weighted Stego Attack.
  - triples:       Triples Attack.
  - spa:           Sample Pairs Analysis.
  - rs:            RS attack.
```

Aletheia implements structural attacks like RS attack, SPA attack, WS attack, etc. 
In the first section we have seen an example of the use of the WS attack. 
Now, we see an example of the SPA attack.



```bash
./aletheia.py spa sample_images/lena_lsbr.png
Hidden data found in channel R 0.09308090623358549
Hidden data found in channel G 0.09238585295279302
Hidden data found in channel B 0.11546638236749293
``` 

As we can see, it finds hidden information in the three channels.

<br>
## Calibration attacks



Calibration attacks are attacks that force recompression of a JPEG image in order 
to obtain a new image with similar statistical properties to those of the 
original *cover* image. Aletheia implements the calibration attack on the F5 
steganography scheme.

It belongs to the section:

```bash
  Calibration attacks to JPEG steganography:
  - calibration:   Calibration attack on F5.
```

This attack can be carried out with a command like the following:

```bash
./aletheia.py calibration sample_images/lena_f5.jpg
Hidden data found in channel 0: 0.4802783178664965
Hidden data found in channel 1: 0.46723791165593515
Hidden data found in channel 2: 0.45050276128936173
```

More details about this attack in the article:
- [Practical attack on F5](/stego/aletheia/f5-attack-en/).





<br>
## Simulators

To be able to perform experiments and to train models
of *machine / deep learning* it is necessary to have images with
hidden messages. To do this, Aletheia provides multiple steganography scheme 
simulators, which allow us to hide random messages into a set of images.

It belongs to the section:

```bash
  Embedding simulators:
  - lsbr-sim:             LSB replacement simulator.
  - lsbm-sim:             LSB matching simulator.
  - hugo-sim:             HUGO simulator.
  - wow-sim:              WOW simulator.
  - s-uniward-sim:        Spatial UNIWARD simulator.
  - s-uniward-color-sim:  Spatial UNIWARD color simulator.
  - j-uniward-sim:        JPEG UNIWARD simulator.
  - j-uniward-color-sim:  JPEG UNIWARD color simulator.
  - j-mipod-sim:          JPEG MiPOD simulator.
  - j-mipod-color-sim:    JPEG MiPOD color simulator.
  - hill-sim:             HILL simulator.
  - hill-color-sim:       HILL color simulator.
  - ebs-sim:              EBS simulator.
  - ebs-color-sim:        EBS color simulator.
  - ued-sim:              UED simulator.
  - ued-color-sim:        UED color simulator.
  - nsf5-sim:             nsF5 simulator.
  - nsf5-color-sim:       nsF5 color simulator.
  - steghide-sim:         Steghide simulator.
  - outguess-sim:         Outguess simulator.
  - steganogan-sim:       SteganoGAN simulator.
```

In the following example we hide random messages using the
LSB matching steganography technique. The size of
these messages is approximately 20% of the total number
of pixels.

```bash
./aletheia.py lsbm-sim cover_image_dir/ 0.2 stego_image_dir/
```

This command will hide a random message in the images into **cover_image_dir** and 
save them into the **stego_image_dir** folder.

You can also specify the payload in a range of values.
For example, to hide messages of a random size between 5% and 40% of the image 
size, we can run the following command:

```bash
./aletheia.py lsbm-sim cover_image_dir/ 0.05-0.40 stego_image_dir/
```



<br>
## Machine/Deep Learning based steganalysis


The tools used to create and use machine/deep learning models belong
the following two sections:



```bash
  Feature extractors:
  - srm:           Full Spatial Rich Models.
  - srmq1:         Spatial Rich Models with fixed quantization q=1c.
  - scrmq1:        Spatial Color Rich Models with fixed quantization q=1c.
  - gfr:           JPEG steganalysis with 2D Gabor Filters.
  - dctr:          JPEG Low complexity features extracted from DCT residuals.
```
   
```bash
  ML-based steganalysis:
  - split-sets:            Prepare sets for training and testing.
  - split-sets-dci:        Prepare sets for training and testing (DCI).
  - create-actors:         Prepare actors for training and testing.
  - effnetb0:              Train a model with EfficientNet B0.
  - effnetb0-score:        Score with EfficientNet B0.
  - effnetb0-predict:      Predict with EfficientNet B0.
  - effnetb0-dci-score:    DCI Score with EfficientNet B0.
  - effnetb0-dci-predict:  DCI Prediction with EfficientNet B0.
  - e4s:                   Train Ensemble Classifiers for Steganalysis.
  - e4s-predict:           Predict using EC.
  - actor-predict-fea:     Predict features for an actor.
  - actors-predict-fea:    Predict features for a set of actors.
```

Traditional machine learning is done in two steps. First, some features are 
extracted from the images, for which the commands in the *Feature extractors* 
section are used. A classifier is then trained and used to make predictions. 
However, this approach has become obsolete due to deep learning, much more
accurate. That is why we do not go into details.
The reader can explore the commands by himself, as they follow the usual dynamics
of Aletheia's commands.


Regarding the use of deep learning, the prediction using pretrained models 
provided by Aletheia is detailed in the following articles:

- [Practical attack on Steghide](/stego/aletheia/steghide-attack-en/).
- [Practical attack on F5](/stego/aletheia/f5-attack-en/).



<br>
## Bruteforce attacks

Aletheia implements brute force attacks on different steganography tools. 
This can be useful if we know, or suspect, that a specific tool has been used 
and we want to obtain the password and the hidden message.


It belongs to the section:

```bash
  Find password by brute force using a list of passwords:
  - brute-force-steghide:      Brute force a password using StegHide
  - brute-force-outguess:      Brute force a password using Outguess
  - brute-force-openstego:     Brute force a password using OpenStego
  - brute-force-generic:       Generic tool for finding the password using a command
```

We can carry out attacks on different steganography tools.
Here, we are going to see only two attacks, as they are all similar.


First, let's see how to carry out an attack on the well-known tool
[OpenStego](https://www.openstego.com/).

We hide a message in a PNG image protected by password:

```bash
$ openstego embed -p 123456 -mf secret.txt -cf sample_images/lena.png -sf stego.png
```

Next, we use Aletheia to find the password and extract the message:

```bash
./aletheia.py brute-force-openstego stego.png resources/passwords.txt 
Using 16 processes
Completed: 0.0%    
Password found: 123456
```

Now we are going to attack [Steghide](http://steghide.sourceforge.net/).
We hide a message using this tool into a JPEG image:

```bash
$ steghide embed -cf cover.jpg -sf test.jpg -p 12345ab
Hello World!
embedding standard input in "cover.jpg"... done
writing stego file "image.jpg"... done
```

Next, we use Aletheia to find the password and extract the message:

```bash
./aletheia.py brute-force-steghide test.jpg resources/passwords.txt 
Using 16 processes
Completed: 0.4%    
Password found: 12345ab
```





<br>
## Other tools

Finally, there is a set of commands that can be used for various unrelated tasks. 
All of them are grouped in the last section:


```bash
  Tools:
  - hpf:                   High-pass filter.
  - print-diffs:           Differences between two images.
  - print-dct-diffs:       Differences between the DCT coefficients of two JPEG images.
  - rm-alpha:              Opacity of the alpha channel to 255.
  - plot-histogram:        Plot histogram.
  - plot-histogram-diff:   Plot histogram of differences.
  - plot-dct-histogram:    Plot DCT histogram.
```

We will not explain these commands. Just to mention, the two most interesting 
commands are **print-diffs** and **print-dct-diffs**. These commands allow us 
to see the differences between an image and the same image containing
a hidden message. This is very useful when we are analyzing a 
steganography tool and we do not know exactly what it does.


The reader can explore the remaining commands, as they are simple and work 
as usual.






