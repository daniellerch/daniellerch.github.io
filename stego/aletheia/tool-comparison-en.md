---
layout: page
title: Comparison of Image Steganography Tools
subtitle: "" 
noindex: false
comments: false
meta-title: "Comparison of Image Steganography Tools"
meta-description: "Article comparing different steganography tools in images to see which ones are harder to detect."
meta-keywords: "steganography, stegoanalysis, images"
lang-suffix: "-en"
---

> In this article, we will see a comparison of steganography tools
> in images. We will use 
> [Aletheia](https://github.com/daniellerch/aletheia) to determine which tools
> are harder to detect.

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

1. [Comparative chart](#comparative-chart)
2. [Experiment description](#experiment-description)
3. [Results in bitmaps](#results-in-bitmaps)
   1. [LSB replacement (OpenStego, OpenPuff)](#lsb-replacement-openstego-openpuff)
   2. [LSB matching](#lsb-matching)
   3. [SteganoGAN](#steganogan)
   4. [S-UNIWARD](#s-uniward)
   5. [HILL (HStego)](#hill-hstego)
4. [Results in JPEG](#results-in-jpeg)
   1. [Outguess](#outguess)
   2. [Steghide](#steghide)
   3. [nsF5](#nsF5)
   4. [J-UNIWARD (HStego)](#j-uniward-hstego)

<br>
## Comparative chart

In this article, we compare different image steganography methods
to see which ones are harder to detect. We separate the comparison into
bitmap images and JPEG images. First, we look at the comparative charts.

<center><b>
Comparison of steganography in bitmap images (PNG, TIF, BMP, etc):
</b></center>

![efficiency](/stego/aletheia/resources/tool_comparison.png?style=centerme)

<center><b>
Comparison of steganography in JPEG images:
</b></center>

![efficiency](/stego/aletheia/resources/tool_comparison_jpeg.png?style=centerme)

<br>
## Experiment Description

To draw the charts presented in the previous section, multiple steganography methods were used with the image database 
[Alaska 2](https://www.kaggle.com/c/alaska2-image-steganalysis). 
This database was used by 
[Aletheia](https://github.com/daniellerch/aletheia) 
to train its models. 

The images used in the experiment come from the test set used
by Aletheia, meaning that these images were neither used for
model training nor validation.

For each of the methods, 500 cover images (with no hidden
message) and 500 stego images (with hidden information, as per
the payload indicated on the chart) were used.

<br>
## Results in Bitmaps

### LSB replacement (OpenStego, OpenPuff)

The data insertion technique 
[LSB *replacement*](/stego/lab/intro/lsb-en/#embedding-information-with-lsb-replacement)
is undoubtedly the most popular technique for embedding data in images and audio.
Many image steganography tools use this technique, some of which are very popular, such as [OpenStego](https://www.openstego.com/) 
and [OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html).

In the chart, we can see two lines for this technique. One of them, labeled
as "SPA", shows the results of conducting an SPA or Sample Pair
Analysis. The other uses a deep learning model. It's worth noting that the
LSB replacement technique introduces [statistical anomalies that make it
especially vulnerable](/stego/lab/intro/lsb-en/#the-dangers-of-lsb-replacement),
using the so-called "structural methods". One of these methods is the
SPA attack. Even though the SPA results in the chart aren't the worst, it's important to consider that structural methods
only require the image being analyzed, unlike deep learning-based methods which need to be trained with an image database. Therefore, deep learning-based methods have a significant drawback: the CSM problem. This problem introduces significant
challenges in stegoanalysis, so having a method without this problem (like SPA) makes the task much easier.

The two chart lines dedicated to LSB replacement show that it's not the best technique analyzed. This, combined with the fact that these techniques can be attacked with structural methods like SPA, makes this embedding technique **the least recommended** of those analyzed.

### LSB matching

The data insertion technique 
[LSB *matching*](/stego/lab/intro/lsb-en/#embedding-information-with-lsb-matching)
is very similar to LSB replacement. The only difference is that, instead
of replacing the least significant bit, we change its value by adding one 
or subtracting one from the byte value. This way, we achieve the same 
result without introducing the statistical anomaly that makes LSB replacement
vulnerable to structural methods.

However, it's surprising how rarely this technique is used in steganography tools, which usually lean towards the vulnerable LSB replacement. 

In the chart, we can see that this technique, although not the best, can be competitive with low payloads.

### SteganoGAN

The tool [SteganoGAN](https://github.com/DAI-Lab/SteganoGAN) creates steganographic images using adversarial training.

As seen in the chart, this is the easiest method to detect among all analyzed. It stands out that it can be detected regardless of the payload.

However, this should not be taken as an indication that it's the least secure method. What happens with images generated by a GAN (Generative Adversarial Network) is that they have different statistical properties compared to a regular image, making it easy to distinguish them. That's why the size of the hidden message does not affect its detectability; it's enough that the image was generated by SteganoGAN for us to detect it. Currently, this can be used to identify this tool. However, it's expected that the number of images produced by GANs will continue to grow, becoming commonplace, which will lead us to a scenario where merely identifying an image as generated by a GAN will not be sufficient. We will have to differentiate between images generated by a GAN with a hidden message and those generated without one. At the moment, there isn't much research on this topic.

Even so, I would not currently recommend the use of SteganoGAN.



### S-UNIWARD

[S-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) is, along with HILL, 
one of the best on the list. Actually,
it's not about a steganography tool, but a cost function
that indicates the positions in the image where information should be hidden. At the moment, it doesn't seem to have been used in any
public steganography tool.

### HILL (HStego)

[HILL](https://doi.org/10.1109/ICIP.2014.7025854) is, along with S-UNIWARD, 
one of the best on the list. Actually,
it's not about a steganography tool, but a cost function
that indicates the positions in the image where information should be hidden. This cost function is implemented in the steganography tool
[HStego](https://github.com/daniellerch/hstego).



<br>
## Results in JPEG

### Outguess

[Outguess](https://en.wikipedia.org/wiki/OutGuess) is the easiest 
steganography method to detect of all those analyzed for JPEG.
At its time, it was a steganography method that brought certain
innovations. However, we must not forget that it is a very old method.

### Steghide

[Steghide](https://steghide.sourceforge.net/) is a very popular steganography method, perhaps the most popular for JPEG images. It has held up quite well over the years, but currently there are much better methods.

As can be seen in the graph, it considerably improves the results 
of Outguess, although it is quite far from nsF5 and J-UNIWARD.

### nsF5

[nsF5](https://dde.binghamton.edu/download/nsf5simulator/) is the improved version of the well-known steganography method [F5](https://www.semanticscholar.org/paper/F-5-%E2%80%94-A-Steganographic-Algorithm-High-Capacity-Westfeld/149b41d7560d7bd628da502bd3d8122a8317d472).

As can be seen in the chart, nsF5 provides good results, especially for low payload sizes.


### J-MiPOD

[J-MiPOD](https://doi.org/10.24433/CO.2423893.v4) is, along with nsF5 and J-UNIWARD, 
one of the best of those analyzed. It surpasses nsF5 with large
payload sizes, although for small payload sizes, nsF5 slightly outperforms it.
Furthermore, it offers inferior results to J-UNIWARD in all cases.


### J-UNIWARD (HStego)

[J-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) is, along with nsF5, 
the best of those analyzed. It vastly surpasses nsF5 with large
payload sizes, although for small payload sizes, nsF5 slightly outperforms it.

Actually, it's not about a steganography tool, but a cost function 
that indicates the positions in the image where information should be hidden. This cost function is implemented in the steganography tool
[HStego](https://github.com/daniellerch/hstego).





