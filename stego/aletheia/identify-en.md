---
layout: page
title: Identifying the steganographic scheme
subtitle: "" 
noindex: false
meta-title: "Identifying the steganographic scheme"
meta-description: "Blog post about the identification of the steganography scheme using the Aletheia steganalysis tool"
meta-keywords: "steganography, steganalysis, images"
lang-suffix: "-en"
---

> In this article we are going to talk about how to identify the steganography 
> scheme that has been used to hide information. To do this, we will use the 
> [Aletheia](https://github.com/daniellerch/aletheia) steganalysis tool.



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

1. [Options to consider](#options-to-consider)
2. [JPEG images](#jpeg-images)
3. [Bitmaps](#bitmaps)


<br>
## Options to consider

Many times we can have suspicions that a specific steganography scheme has 
been used, which makes the analysis much easier. But many others we will 
have to identify what scheme has been used, if any has been used.

To do this, we will use the [Aletheia](https://github.com/daniellerch/aletheia)
stegoanalysis tool, so we will rely on the detection methods that this tool 
implements. That is, we will not attempt to identify steganography schemes 
for which we do not have detection methods.

On the other hand, we will assume that trivial steganography methods such as 
file concatenation, allowed by some file formats, drawing letters using 
hard-to-see colors, data in a fully transparent alpha channel, and similar 
tricks have already been verified.

It should be noted that what we are going to do is an **initial exploration**, 
and that therefore, it only helps us to get a first idea about which 
steganography methods are most likely to be used. Normally, it will be 
necessary to continue with a more in-depth analysis, such as that shown 
in other articles:

- [Practical attack on Steghide](/stego/aletheia/steghide-attack-en/).
- [Practical attack on F5](/stego/aletheia/f5-attack-en/).
- [Practical attack on LSB replacement: OpenStego and OpenPuff](/stego/aletheia/lsbr-attack-en/).


Since steganography techniques tend to be very different depending on whether 
we are dealing with a JPEG image or a bitmap image (PNG, TIF, BMP, etc.), 
we are going to perform the analysis separately.

<br>
## JPEG images

The best detection methods Aletheia has for JPEG images are based on deep 
learning models, which are the ones used by the **auto** command. Therefore, 
for JPEG images, our best option is to use this command.

Let's look at an example where the most likely scheme appears to be Steghide.


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

Let's now look at another example where the most likely scheme appears to be nsF5:


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

And finally, let's see an example for Outguess:

```bash
./aletheia.py auto actors/A5

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                  [1.0]    [1.0]    [0.7]    [1.0]  
4.jpg                  [1.0]    [1.0]     0.4     [0.8]  
10.jpg                 [1.0]    [1.0]     0.3     [1.0]  
6.jpg                  [1.0]    [1.0]     0.4     [1.0]  
7.jpg                  [1.0]     0.0     [0.8]    [1.0]  
8.jpg                  [1.0]    [1.0]    [1.0]    [1.0]  
9.jpg                  [1.0]    [1.0]     0.4     [0.7]  
1.jpg                  [1.0]    [1.0]    [1.0]    [0.9]  
3.jpg                  [1.0]    [1.0]    [0.9]    [1.0]  
5.jpg                  [1.0]    [1.0]    [0.8]    [1.0]  

* Probability of being stego using the indicated steganographic method.
```

Although in the latter case it is a bit more complicated to know which 
method is used, since other models detect it quite reliably.


<br>
## Bitmaps

In bitmaps, there is a possibility that the LSB replacement technique 
was used. For this technique there is a family of very reliable attacks, known as 
structural attacks. Therefore, it is a good idea to start with a couple of 
structural attacks.

Let's look at an example where we find hidden information:


```bash
$ ./aletheia.py spa sample_images/lena_lsbr.png
Hidden data found in channel R 0.09308090623358549
Hidden data found in channel G 0.09238585295279302
Hidden data found in channel B 0.11546638236749293

$ ./aletheia.py ws sample_images/lena_lsbr.png
Hidden data found in channel R 0.10590840834668327
Hidden data found in channel G 0.07463418193363092
Hidden data found in channel B 0.07968467118722876
```

Although we might not have found anything:

```bash
$ ./aletheia.py spa sample_images/lena.png
No hidden data found

$ ./aletheia.py ws sample_images/lena.png
No hidden data found
```

If we can't find hidden data, it's time to try deep learning models, using the 
**auto** command. However, for a reliable steganalysis using deep learning  
we need more images, due to the CSM problem, which we describe in more detail 
in other articles:

- [Practical attack on Steghide](/stego/aletheia/steghide-attack-en/).
- [Practical attack on F5](/stego/aletheia/f5-attack-en/).
- [Practical attack on LSB replacement: OpenStego and OpenPuff](/stego/aletheia/lsbr-attack-en/).

Let's see an example in which we detect different steganography schemes:

```bash
$ ./aletheia.py auto sample_images/alaska2

                       LSBR      LSBM  SteganoGAN  HILL *
---------------------------------------------------------
25422.png               0.0       0.0      0.0      0.0   
27693_steganogan.png   [0.9]     [1.0]    [1.0]    [0.9]  
74051_hill.png          0.0       0.0      0.0     [0.9]  
36466_steganogan.png   [0.9]     [1.0]    [1.0]    [1.0]  
04686.png               0.0       0.0      0.0      0.0   
37831_lsbm.png         [1.0]     [1.0]     0.0     [0.7]  
34962_hill.png          0.0       0.0      0.0     [0.5]  
00839_hill.png          0.0      [0.8]     0.0     [1.0]  
74648_lsbm.png         [1.0]     [1.0]     0.0     [0.6]  
74664.png               0.0       0.0      0.0      0.0   
55453_lsbm.png         [0.6]     [0.9]     0.0     [0.9]  
67104_steganogan.png   [0.9]     [0.9]    [1.0]    [0.8]  

* Probability of being stego using the indicated steganographic method.

```












