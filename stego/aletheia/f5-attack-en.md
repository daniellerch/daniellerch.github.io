---
layout: page
title: Practical attack on F5
noindex: false
submenu: true
submenuitem1: "en |"
submenuitem2: "<a href='/stego/aletheia/f5-attack-es'>es</a>"
comments: true
meta-title: "Practical attack on F5"
meta-description: "Blog post about the detection of JPEG images embedded with F5, using the Aletheia steganalysis tool"
---

> In this article we are going to talk about how to detect the steganography 
> scheme for **JPEG images** known as **F5**. To do this, we are going to 
> use the steganalysis tool [Aletheia](https://github.com/daniellerch/aletheia).

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

1. [How F5 and nsF5 work](#how-f5-and-nsf5-work)
2. [Initial exploration](#initial-exploration)
3. [Calibration attack](#calibration-attack)
4. [Steganalysis with Deep Learning](#steganalysis-with-deep-learning)
5. [Can we trust the model?](#can-we-trust-the-model)
7. [References](#references)


<br>
## How F5 and nsF5 work?

**F5** [ [1](#references) ] is an algorithm for hiding information 
in JPEG images. Unlike previous methods, like 
[JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg),
F5 does not modify the DCT coefficient histogram as much, so it is able 
to avoid the statistical attacks that existed when it was published.

To hide information, F5 adds 1 to the coefficients with a positive value 
and subtracts one from the coefficients with a negative value. 
The coefficients with a zero value are not modified, as this would alter 
the statistic of the image significantly.


This way of hiding information introduces a communication problem.
The receiver will extract the message by reading the LSB of the 
nonzero coefficients, since the zeros are not used. But if when 
modifying a coefficient with value 1 or -1, it has become zero, 
the receiver would lose that bit. 
The solution used by F5, when this situation occurs, is to hide the 
same bit in the next coefficient again. While this solves the 
communication problem, it considerably increases the number of 
modified coefficients. As a consequence, the capacity is reduced.
This problem is known as *shrinkage*. 


On the other hand, F5 uses *matrix embedding* techniques to hide 
the information. This allows to hide the same amount of data.
with fewer changes to the image, 

The original implementation of F5 is written in Java and can be 
easily found on the Internet, although there is no official 
repository. A copy can be downloaded 
[here](https://github.com/daniellerch/stego-collection/tree/master/F5).

This implementation is used by different tools. Perhaps one of the 
most popular is 
[Stegosuite](https://github.com/daniellerch/stego-collection/tree/master/stegosuite).


Let's see an example about how to use the Java implementation of F5. 
First we download a test image:





```bash
wget http://links.uwaterloo.ca/Repository/TIF/lena3.tif
convert lena3.tif -quality 100 lena3.jpg
```
And then we hide a message:

```bash
echo "My secret data" > secret.txt
java Embed -e secret.txt lena3.jpg lena3_f5.jpg 
```

<br>
The name **nsF5** [[2](#references)] comes from *non shrinkage F5*. 
This algorithm uses **WPC** or *Wet Paper codes* techniques to hide 
information. These techniques allow data to be hidden by marking 
certain coefficients as "non-modifiable", in a transparent way for 
the receiver. This solves the *shrinkage* problem without reducing
the capacity. That is, even if new zeros are generated from 
coefficients with a value of 1 or -1, the receiver will be able to 
read the message.

From the point of view of the modifications made to the image, 
F5 and nsF5 are equivalent. So the same techniques used to detect 
nsF5 allow us to detect F5. However, for the same number of 
modifications, nsF5 can hide more information than F5.

Aletheia implements an nsF5 simulator, so we can generate a test image 
with the following command:



```bash
./aletheia.py nsf5-color-sim lena3.jpg 0.2 nsf5 
```

> NOTE: In the previous command 0.2 corresponds to the *payload*, 
> that is, we are hiding a message whose size is 20% of the total 
> number of coefficients other than zero.

With a cover image and its corresponding stego image we can use 
Aletheia to see the type of modifications that are made. We do
this with the command "print-dct-diffs".

> NOTE: Most of the command output has been suppressed



```bash
./aletheia.py print-dct-diffs lena3.jpg nsf5/lena3.jpg 

Channel 0:
[(-8.0, -7.0, 1.0), (1.0, 0.0, -1.0), (2.0, 1.0, -1.0), ...]
[(1.0, 0.0, -1.0), (2.0, 1.0, -1.0), (40.0, 39.0, -1.0), ...]
[(2.0, 1.0, -1.0), (1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (2.0, 1.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (1.0, 0.0, -1.0), (-5.0, -4.0, 1.0), ...]
[(2.0, 1.0, -1.0), (-1.0, 0.0, 1.0), (-1.0, 0.0, 1.0), ...]
[(3.0, 2.0, -1.0), (-22.0, -21.0, 1.0), (9.0, 8.0, -1.0), ...]

...

Common DCT coefficients frequency variation:

Channel 0:
-3: -52
-2: -61
-1: -435
+0: 1189
+1: -417
+2: -94
+3: -37
...
```
In the first part of Aletheia's output we can see how the coefficients 
change. Information is displayed in triplets of values. The first value 
of the triplet corresponds to the original value of the coefficient, 
the second corresponds to the value of the modified coefficient and the 
third to the difference between the two. Thus, we can see how negative 
values always decrease and positive values always increase. We can also 
see that there is no case in which a zero is modified.

In the second part of Aletheia's output we see a summary of the variation 
in the frequency of the central DCT coefficients. As we can see, the number 
of coefficients with value zero increases while the number of coefficients 
with values 1 and -1 decreases. This is the main attack vector in the 
calibration attack, which we will see later.



<br>
## Initial exploration

For the following experiments we will use the images in the folders 
**actors/A1** and **actors/A3** of Aletheia. Actor A1 is an innocent 
actor, that is, an actor who is not using steganography. Actor A3 is 
a guilty actor using steganography. And conveniently, 
he uses the nsF5 steganography algorithm.

In both cases, we can start with an automatic exploration using Aletheia's 
"auto" parameter.


Let's run the command for actor A1.


```bash
aletheia.py auto actors/A1

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                   0.0      0.0      0.4      0.2   
4.jpg                   0.0      0.0      0.1      0.4   
10.jpg                  0.0      0.0      0.1      0.0   
6.jpg                   0.0      0.0      0.4      0.5   
7.jpg                   0.0      0.0     [0.7]    [0.7]  
8.jpg                   0.0      0.0      0.3      0.3   
9.jpg                   0.0      0.0      0.3      0.4   
1.jpg                   0.0      0.0      0.1      0.1   
3.jpg                   0.0      0.0      0.2      0.4   
5.jpg                   0.0      0.4      0.1     [0.5]  

* Probability of being stego using the indicated steganographic method.
```

We see that only one image appears as stego for nsF5. In this case it is a 
false positive. There are also some false positives for the J-UNIWARD algorithm.



Now, let's run the command for actor A3.

```bash
./aletheia.py auto actors/A3

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                   0.0      0.0     [1.0]    [1.0]
4.jpg                   0.0      0.0     [0.6]     0.3
10.jpg                  0.0      0.0      0.1      0.3
6.jpg                   0.0      0.0     [0.9]    [1.0]
7.jpg                   0.0      0.0     [0.6]     0.5
8.jpg                   0.0      0.0     [0.9]     0.4
9.jpg                   0.0     [1.0]    [0.9]     0.4
1.jpg                   0.0      0.0     [0.6]    [0.5]
3.jpg                   0.0      0.0     [0.5]     0.1
5.jpg                   0.0      0.0     [0.9]     0.2

* Probability of being stego using the indicated steganographic method.
```

We see that almost all the images are positive for F5. It should 
be noted that different methods can use similar techniques, so it 
is common to obtain positives with different steganography algorithms.

The **auto** command allows us to do an initial exploration to get
some information about the images. Is steganography likely to be used? 
And in that case, which algorithms are most likely to be used?





<br>
## Calibration attack

When an image in bitmap format is compressed to JPEG, the original image 
is divided into 8x8 blocks, to which a discrete cosine transform or 
[DCT](https://en.wikipedia.org/wiki/Discrete_cosine_transform)
is applied. Specially designed quantization matrices are applied to the 
DCT coefficients obtained to eliminate certain values with reduced visual 
impact, which generates many coefficients with zero value. This information 
is stored in the JPEG file and is used to generate the bitmap again when 
the image is displayed.

The calibration technique consists of decompressing the image to a bitmap, 
removing some rows and columns from the beginning (1-4), and compressing 
it again with JPEG. This forces the compression process to choose different 
8x8 blocks, so the new JPEG image may have a statistic more similar to the
original image than the stego image.

The idea of this process is to take the image we want to analyze, create 
another image through calibration and compare its statistics. If it is 
similar, it is that the analyzed image was cover. If it is very different, 
it is that the original image was stego.

This technique does not work for all types of JPEG steganography, but it 
does allow a very powerful attack against F5. The idea of this attack is 
to calculate the relationship between the number of ones and minus ones 
with respect to the number of zeros, Which, as we have seen previously, 
varied significantly. Details on the attack can be found in the article 
*Steganalysis of JPEG Images: Breaking the F5 Algorithm* [[3](#references)].

Aletheia implements this attack, which can be executed with a command 
like the following:



```bash
./aletheia.py calibration sample_images/lena_f5.jpg 
Hidden data found in channel 0: 0.4802783178664965
Hidden data found in channel 1: 0.46723791165593515
Hidden data found in channel 2: 0.45050276128936173
```

In the example above, the detection was successful, although when the amount 
of hidden information is small, it is not very reliable. Let's see the 
folling examples with lower payloads (0.75, 0.50, 0.50 and 0.30):

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.75.jpg 
Hidden data found in channel 0: 0.20011387088739443
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.50.jpg 
Hidden data found in channel 0: 0.10527758055512187
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.40.jpg 
Hidden data found in channel 0: 0.07801106953467886
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.30.jpg 
No hidden data found in channel 0
No hidden data found in channel 1
No hidden data found in channel 2
```



<br>
## Steganalysis with Deep Learning

If we suspect that a particular steganography method is being used,
we can directly use the appropriate model to make the prediction.

Aletheia has multiple Deep Learning models already trained, waiting 
to be used. For F5, we have the model 
**aletheia-models/effnetb0-A-alaska2-f5.h5**, 
which uses the neural network EfficientNet B0 [[4](#references)].





Let's make a prediction for actor A1:

```bash
./aletheia.py effnetb0-predict actors/A1 aletheia-models/effnetb0-A-alaska2-nsf5.h5 0
...
actors/A1/1.jpg 0.086
actors/A1/10.jpg 0.143
actors/A1/2.jpg 0.418
actors/A1/3.jpg 0.226
actors/A1/4.jpg 0.11
actors/A1/5.jpg 0.074
actors/A1/6.jpg 0.393
actors/A1/7.jpg 0.668
actors/A1/8.jpg 0.256
actors/A1/9.jpg 0.282
```

Let's now make a prediction for actor A3:

```bash
./aletheia.py effnetb0-predict actors/A3 aletheia-models/effnetb0-A-alaska2-nsf5.h5 0
...
actors/A3/1.jpg 0.643
actors/A3/10.jpg 0.121
actors/A3/2.jpg 0.999
actors/A3/3.jpg 0.542
actors/A3/4.jpg 0.6
actors/A3/5.jpg 0.918
actors/A3/6.jpg 0.922
actors/A3/7.jpg 0.636
actors/A3/8.jpg 0.931
actors/A3/9.jpg 0.874
```

As we can see, for those two actors, the results are quite good.




In general, Machine Learning models, and more specifically 
Deep Learning models, are much more accurate than dedicated 
statistical attacks, such as the calibration attack performed above.
However, using these models creates a new problem, which to this day 
is still not solved: the **CSM** or Cover Source Mismatch.
This problem occurs when the images you want 
to analyze have different statistical properties than 
the ones used to train the model. As a consequence, the reliability
of the prediction is greatly reduced.



In the next section, we will use Aletheia's **DCI** [[5](# references)] 
method, which allows us to deal with the CSM.



<br>
## Can we trust the model?

As mentioned in the previous section, the CSM or Cover Source Mismatch 
problem occurs when the images to be analyzed have different statistical 
properties from those used to train the model, considerably reducing the 
reliability of the prediction.

Although attempts have been made to create diverse enough image 
databases to avoid this problem, in practice always appear image sets
with CSM. With this problem in mind, the DCI method was created, which 
allows us to evaluate the reliability of the prediction.

For the DCI method to be applied, the images to be analyzed must come 
from the same actor. If the analyzed images are a mixture of 
images with different statistical properties, the DCI results will not 
be reliable.

You can check the results of some experiments with CSM 
[here](https://github.com/daniellerch/aletheia/blob/master/aletheia-models/README.md),
where you can see how the precision of the model is reduced when there is CSM.
You can also see the predictions made by DCI.


First we are going to see what happens if we use the DCI method with 
the actors A1 and A3, which do not have CSM.






With actor A1:



```bash
./aletheia.py dci nsf5-color-sim actors/A1
...
actors/A1/2.jpg          0
actors/A1/4.jpg          0 (inc)
actors/A1/10.jpg         0
actors/A1/6.jpg          0
actors/A1/7.jpg          1
actors/A1/8.jpg          0
actors/A1/9.jpg          0 (inc)
actors/A1/1.jpg          0 (inc)
actors/A1/3.jpg          0
actors/A1/5.jpg          0 (inc)
DCI prediction score: 0.8
```

We see images marked "inc", which are **inconsistencies** in the 
classification detected by DCI (the results obtained in these predictions 
are not very reliable). We have a DCI prediction of 80%, so the model is 
quite reliable and as we can see almost all images classify as cover.


With actor A3:



```bash
./aletheia.py dci nsf5-color-sim actors/A3
...
actors/A3/2.jpg          1 (inc)
actors/A3/4.jpg          1 (inc)
actors/A3/10.jpg         0 (inc)
actors/A3/6.jpg          1
actors/A3/7.jpg          1
actors/A3/8.jpg          1 (inc)
actors/A3/9.jpg          1
actors/A3/1.jpg          1 (inc)
actors/A3/3.jpg          1
actors/A3/5.jpg          1 (inc)
DCI prediction score: 0.7
```

In this case, the model is a little less reliable, since we have a DCI 
prediction of 70%. Almost all images classify as stego.

Let's now see what happens in CSM cases. Now we will use the actors B1 
and B3, which come from the image database **Imagenet**, and as we will 
see, suffers from CSM.

You can check out the different actors provided for testing by Aletheia 
at this [link](https://github.com/daniellerch/aletheia/blob/master/actors/README.md).

Let's start with B1, an innocent actor:


```bash
./aletheia.py dci nsf5-color-sim actors/B1
...
actors/B1/2.jpg          0
actors/B1/4.jpg          1 (inc)
actors/B1/10.jpg         0
actors/B1/6.jpg          0 (inc)
actors/B1/7.jpg          0 (inc)
actors/B1/8.jpg          0 (inc)
actors/B1/9.jpg          0 (inc)
actors/B1/1.jpg          0 (inc)
actors/B1/3.jpg          1
actors/B1/5.jpg          0 (inc)
DCI prediction score: 0.65
```

For this set of images, the model does not seem very 
reliable and this is indicated by the DCI prediction of 65%.


Now let's see what happens to B3, a guilty actor using nsF5:


```bash
./aletheia.py dci nsf5-color-sim actors/B3/
...
actors/B3/2.jpg          1 (inc)
actors/B3/4.jpg          0 (inc)
actors/B3/10.jpg         1 (inc)
actors/B3/6.jpg          1 (inc)
actors/B3/7.jpg          0
actors/B3/8.jpg          0
actors/B3/9.jpg          1 (inc)
actors/B3/1.jpg          1 (inc)
actors/B3/3.jpg          1 (inc)
actors/B3/5.jpg          0 (inc)
DCI prediction score: 0.6
```

In this case the model does not work too well either. The DCI 
prediction is only 60%.

Faced with this type of scenario, two important questions arise:




#### **What can we do if DCI tells us that the model is unreliable?**
One way to proceed is to improve the model, that is, 
to train a new model with more images. But finding enough images of the 
same type to improve the database is not an easy task. For this reason 
the CSM is one of the most important open problems in steganalysis.

In any case, if we know that the model is not reliable, we can decide 
not to use it, which is always better than obtaining incorrect results 
and not knowing it.

Another option may be to apply the calibration technique explained above, 
which although less reliable, does not have the problem of the CSM, since 
it only uses the image to be analyzed.

As a reference, the accuracy of the Calibration attack applied to the 
Alaska2 testing set is about **65%**. The accuracy of EfficientNet B0 
with the same set is about **78%**. So it can be a good alternative 
when the DCI indicates that the model is not reliable.



#### **What happens when we have few images (<10) of the same actor?**
One option is to try to get more images of the same actor. If it is not 
possible, we can always use the calibration technique, which only needs 
the image to be analyzed.



<br>
## References

1. F5 - A Steganographic Algorithm. Andreas Westfeld. 4th Information Hiding
   Workshop, Pittsburgh, PA, USA, April 25-27, 2001.

2. Statistically undetectable JPEG steganography: Dead ends, challenges, 
   and opportunities. J. Fridrich, T. Pevný, and J. Kodovský. In J. Dittmann 
   and J. Fridrich, editors, Proceedings of the 9th ACM Multimedia & Security 
   Workshop, pages 3-14, Dallas, TX, September 20-21, 2007.

3. Steganalysis of JPEG Images: Breaking the F5 Algorithm, J. Fridrich, M. Goljan and 
   D. Hogea, 5th Information Hiding Workshop, Noordwijkerhout, The Netherlands, 
   7-9 October 2002, pp. 310-323.

4. EfficientNet: Rethinking model scaling for convolutional neural networks. 
   Mingxing Tan and Quoc V Le. In International Conference on Machine Learning, 2019.

5. Detection of Classifier Inconsistencies in Image Steganalysis. Daniel Lerch-Hostalot,
   David Megías. July 2019. Proceedings of the ACM Workshop on Information Hiding and 
   Multimedia Security.






<br>



