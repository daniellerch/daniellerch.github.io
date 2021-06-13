---
layout: page
title: Practical attack on Steghide
noindex: false
submenu: true
submenuitem1: "en |"
submenuitem2: "<a href='/stego/aletheia/steghide-attack-es'>es</a>"
comments: true
---

> In this article we are going to talk about how to detect **JPEG images** 
> which contain hidden data using Steghide. To do this, we are going to use the 
> steganalysis tool 
> [Aletheia](https://github.com/daniellerch/aletheia).

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

1. [How Steghide works](#how-steghide-works)
2. [Initial exploration](#initial-exploration)
3. [Steganalysis using Deep Learning](#steganalysis-using-deep-learning)
4. [Can we trust the model?](#can-we-trust-the-model)
5. [Bruteforce attack](#bruteforce-attack)
5. [References](#references)


<br>
## How Steghide works


[StegHide](http://steghide.sourceforge.net/) 
is a steganography tool that is able to hide data in various kinds of 
image and audio-files. Throughout the article we are going to use the 
version of Steghide v0.5.1 and we are going to focus on the steganalysis 
of JPEG images.

Let's see how to use Steghide to hide information in an image. 
We download a test image and hide the text "My secret data".


```bash
wget http://links.uwaterloo.ca/Repository/TIF/lena3.tif
convert lena3.tif -quality 90 lena3.jpg
echo "My secret data" > secret.txt
steghide embed -cf lena3.jpg -sf lena3_steghide.jpg -ef secret.txt -p mypass
```

To extract the hidden data, we can execute a command like the following one, 
which will save the information stored in the "content.txt" file.


```bash
steghide extract -sf lena3_steghide.jpg -xf content.txt -p mypass          
```



With a cover image and its corresponding stego image we can use Aletheia 
to see the type of modifications that Steghide makes. We do it with the command 
"print-dct-diffs".

> NOTE: Most of the command output has been suppressed


```bash
./aletheia.py print-dct-diffs lena3.jpg lena3_steghide.jpg 

Channel 0:
[(-11.0, -10.0, 1.0), (-1.0, -2.0, -1.0), (-2.0, -1.0, 1.0), ...]
[(4.0, 3.0, -1.0), (2.0, 1.0, -1.0), (22.0, 23.0, 1.0), ... ]
[(2.0, 1.0, -1.0), (-2.0, -1.0, 1.0), (-2.0, -1.0, 1.0), ...] 
[(1.0, 2.0, 1.0), (-2.0, -1.0, 1.0), (15.0, 16.0, 1.0), ...]
[(-2.0, -1.0, 1.0), (1.0, 2.0, 1.0), (2.0, 1.0, -1.0), ...]
[(-2.0, -3.0, -1.0), (1.0, 2.0, 1.0), (-20.0, -19.0, 1.0), ...]
[(2.0, 1.0, -1.0), (-5.0, -4.0, 1.0), (-8.0, -7.0, 1.0), ...]
[(-5.0, -4.0, 1.0), (1.0, 2.0, 1.0), (-2.0, -3.0, -1.0), ...]
[(2.0, 1.0, -1.0), (2.0, 1.0, -1.0), (2.0, 1.0, -1.0), ...]
[(-5.0, -4.0, 1.0), (1.0, 2.0, 1.0), (-2.0, -1.0, 1.0), ...]
...
Common DCT coefficients frequency variation:

Channel 0:
-3: -4
-2: 18
-1: -14
+0: 0
+1: -12
+2: 12
+3: 0
...

```

The final section gives us a summary of the variation in the frequency of 
the central DCT coefficients. As we can see, there is almost no variation. 
This is due to the most interesting feature of Steghide: instead of 
replacing the LSB of each coefficient, or slightly modifying its value, 
what it does is exchange it for another DCT coefficient that has the 
desired value. In this way, the total frequency of each coefficient 
almost does not changes, making it extremely difficult to carry out first-order 
statistical attacks.

Furthermore, this substitution of one coefficient for another is always 
done with coefficients of similar value (normally a difference of 1), 
so the behavior is similar to adding or subtracting 1 to the value of 
the coefficient.

We can see it in Aletheia's output, which shows us a triplet of values 
for each modified coefficient. The first value of the triplet corresponds 
to the original value of the coefficient, the second corresponds to the 
value of the modified coefficient and the third to the difference between both. 
Thus, we can see how coefficients with a value of 2 (-2) tend to get the 
value 1 (-1), those with a value of 1 (-1) tend to get a value of 2 (-2), 
etc. The exception is coefficients with a value of 0, which are never modified.




<br>
## Initial exploration

For the following experiments we are going to use the images that are in the 
folders **actors/A1** and **actors/A2** of Aletheia. Actor A1 is an innocent 
actor, that is, an actor who is not using steganography. Actor A2 is a guilty 
actor using Steghide.

In both cases, we can start with an automatic scan, using the
Aletheia's "auto" parameter.


Let's start with actor A1:


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

We see that no images are classified as stego by Steghide, although there 
are some false positives for nsF5 and J-UNIWARD.


Let's continue with actor A2:


```bash
./aletheia.py auto actors/A2
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
```

We see that almost all the images classified as stego by Steghide.
It should be noted that different methods can use similar 
techniques, so it is common to obtain positives with different 
steganography algorithms.

The **auto** command allows us to do an initial exploration to get
some information about the images. Is steganography likely to be used? 
And in that case, which algorithms are most likely to be used?




<br>
## Steganalysis using Deep Learning

If we suspect that a particular steganography method is being used,
we can directly use the appropriate model to make the prediction.

Aletheia has multiple Deep Learning models already trained. For Steghide, 
we have the model **aletheia-models/effnetb0-A-alaska2-steghide.h5**, 
which uses the neural network EfficientNet B0 [[ 1 ](#references)].


Let's make a prediction for actor A1:

```bash
./aletheia.py effnetb0-predict actors/A1 aletheia-models/effnetb0-A-alaska2-steghide.h5 0
...
actors/A1/1.jpg 0.0
actors/A1/10.jpg 0.001
actors/A1/2.jpg 0.0
actors/A1/3.jpg 0.0
actors/A1/4.jpg 0.0
actors/A1/5.jpg 0.352
actors/A1/6.jpg 0.011
actors/A1/7.jpg 0.002
actors/A1/8.jpg 0.0
actors/A1/9.jpg 0.001
```

Let's make a prediction for actor A2:

```bash
./aletheia.py effnetb0-predict actors/A2 aletheia-models/effnetb0-A-alaska2-steghide.h5 0
actors/A2/1.jpg 1.0
actors/A2/10.jpg 1.0
actors/A2/2.jpg 1.0
actors/A2/3.jpg 1.0
actors/A2/4.jpg 1.0
actors/A2/5.jpg 0.096
actors/A2/6.jpg 1.0
actors/A2/7.jpg 1.0
actors/A2/8.jpg 1.0
actors/A2/9.jpg 1.0
```

As we can see, for those two actors, that the results are quite good.

In general, Machine Learning models, and more specifically Deep Learning 
models, are much more accurate than statistical attacks dedicated to 
certain techniques (RS [[ 2 ](#references)], SPA [[ 3 ](#references)], 
Calibration [[ 4 ](#references)], etc). However, using these models 
creates a new problem, which is still not solved to this day: the **CSM** 
or Cover Source Mismatch problem. This problem occurs when the images you want 
to analyze have different statistical properties than 
the ones used to train the model. As a consequence, the reliability
of the prediction is greatly reduced.

In the next section, we are going to use Aletheia's **DCI** [[ 5 ](#references)] 
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
the actors A1 and A2, which do not have CSM.



Let's start with actor A1:

```bash
/aletheia.py dci steghide-sim actors/A1
...
actors/A1/2.jpg          0
actors/A1/4.jpg          0
actors/A1/10.jpg         0
actors/A1/6.jpg          0
actors/A1/7.jpg          0
actors/A1/8.jpg          0
actors/A1/9.jpg          0
actors/A1/1.jpg          0
actors/A1/3.jpg          0
actors/A1/5.jpg          0
DCI prediction score: 1.0
```

We see that Aletheia is correct in all predictions and that the DCI 
prediction score is 100%. This means that the results are reliable.


Let's continue with actor A2:

```bash
./aletheia.py dci steghide-sim actors/A2
...
actors/A2/2.jpg          1
actors/A2/4.jpg          1
actors/A2/10.jpg         1 (inc)
actors/A2/6.jpg          1 (inc)
actors/A2/7.jpg          1 (inc)
actors/A2/8.jpg          1
actors/A2/9.jpg          1 (inc)
actors/A2/1.jpg          1
actors/A2/3.jpg          1
actors/A2/5.jpg          0 (inc)
DCI prediction score: 0.75
```

We see images marked "inc", which are **classification inconsistencies** 
detected by DCI. In these cases the prediction is not reliable. 
Aletheia detects almost all images as *stego* and a DCI prediction 
of 75% tells us that the quality of the model is acceptable.

Let's now see what happens in CSM cases. Now we are going to use the actors 
B1 and B2, which come from the image database **Imagenet**, and which, 
as we will see, suffers from CSM.


You can check out the different actors provided for testing by Aletheia 
at this [link](https://github.com/daniellerch/aletheia/blob/master/actors/README.md).


Let's start with B1, an innocent actor:

```bash
./aletheia.py dci steghide-sim actors/B1
...
actors/B1/2.jpg          0
actors/B1/4.jpg          0
actors/B1/10.jpg         0
actors/B1/6.jpg          0 (inc)
actors/B1/7.jpg          1 (inc)
actors/B1/8.jpg          0
actors/B1/9.jpg          0
actors/B1/1.jpg          0 (inc)
actors/B1/3.jpg          0 (inc)
actors/B1/5.jpg          1 (inc)
DCI prediction score: 0.75
```

For this set of images the prediction is quite reliable (75%), even with CSM.


Now let's see what happens with B2, a guilty actor using Steghide:

```bash
./aletheia.py dci steghide-sim actors/B2/
...
actors/B2/2.jpg          0 (inc)
actors/B2/4.jpg          0 (inc)
actors/B2/10.jpg         1 (inc)
actors/B2/6.jpg          1 (inc)
actors/B2/7.jpg          0 (inc)
actors/B2/8.jpg          0 (inc)
actors/B2/9.jpg          1 (inc)
actors/B2/1.jpg          1 (inc)
actors/B2/3.jpg          1 (inc)
actors/B2/5.jpg          1 (inc)
DCI prediction score: 0.5
```

In this case, the DCI prediction tells us that the model is not reliable,
so we should not trust their predictions.


Faced with this type of scenario, two important questions arise:


#### **What can we do if DCI tells us that the model is unreliable?**. 
Unfortunately the only way to proceed is to improve the model, that is, 
to train a new model with more images. But finding enough images of 
the same type to improve the database is not an easy task. For this 
reason the CSM is one of the most important open problems in steganalysis.

In any case, if we know that the model is not reliable, we can decide 
not to use it, which is always better than obtaining incorrect 
results without knowing it.


#### **What happens when we have few images (<10) of the same actor?**
There are steganography methods for which there are reliable statistical 
attacks that can be performed with a single image. Unfortunately Steghide 
is not one of them. A reliable detection can not be performed with 
few images, as we cannot use DCI to know if the model works.

In this case, all we can do is try to get more images from the same actor.


<br>
## Bruteforce attack

Aletheia gives us the possibility to carry out a brute force attack to find the password that has been used. If we believe that an image contains hidden data using Steghide, we can try this option.

Let's see an example:

```bash
./aletheia.py brute-force-steghide test.jpg resources/passwords.txt 
Using 16 processes
Completed: 0.4%    
Password found: 12345ab
```


<br>
## References

1. EfficientNet: Rethinking model scaling for convolutional neural networks. 
    Mingxing Tan and Quoc V Le. In International Conference on Machine Learning, 2019.

2. Reliable Detection of LSB Steganography in Color and Grayscale Images. 
   Jessica Fridrich, Miroslav Goljan and Rui Du. Proc. of the ACM Workshop 
   on Multimedia and Security, Ottawa, Canada, October 5, 2001, pp. 27-30.

3. Detection of LSB steganography via sample pair analysis. S. Dumitrescu, 
   X. Wu and Z. Wang. IEEE Transactions on Signal Processing, 51 (7), 1995-2007.

4. Steganalysis of JPEG Images: Breaking the F5 Algorithm, with M. Goljan and 
   D. Hogea, 5th Information Hiding Workshop, Noordwijkerhout, The Netherlands, 
   7-9 October 2002, pp. 310-323.

5. Detection of Classifier Inconsistencies in Image Steganalysis. July 2019. 
   Proceedings of the ACM Workshop on Information Hiding and Multimedia Security.


<br>


