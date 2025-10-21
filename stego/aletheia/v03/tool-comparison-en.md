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
comments: true
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
3. [Results in uncompressed images](#results-in-uncompressed-images)
   1. [LSB replacement (OpenStego, OpenPuff)](#lsb-replacement-openstego-openpuff)
   2. [LSB matching](#lsb-matching)
   3. [SteganoGAN](#steganogan)
   4. [HStego](#hstego)
4. [Results in JPEG](#results-in-jpeg)
   1. [Outguess](#outguess)
   2. [F5](#f5)
   3. [Steghide](#steghide)
   4. [HStego](#hstego)

<br>
## Comparative chart

In this article, we compare different image steganography methods
to see which ones are harder to detect. We separate the comparison into
uncompressed images and JPEG images. First, we look at the comparative charts.

<center><b>
Comparison of steganography in uncompressed images (PNG, TIF, BMP, etc):
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

In this context, the term 'payload' refers to the ratio of the size of 
the message being embedded to the total available capacity for embedding, 
when using a single-bit-per-element method. In uncompressed images, a payload of 0.4 
signifies that the message size (measured in bits) is equivalent to 40% of the 
total pixel count. For JPEG images, a payload value of 0.4 implies that the 
message constitutes 40% of the total non-zero DCT coefficients.

<br>
## Results in Uncompressed Images

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

The two chart lines highlighting LSB replacement clearly indicate its 
limitations as an information-hiding technique. Given its vulnerability to 
structural attack methods like SPA, it's deemed less reliable. Furthermore, 
its susceptibility becomes even more evident when subjected to deep 
learning-based detection, with only SteganoGAN proving easier to detect.


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

Nevertheless, given the circumstances mentioned, the use of SteganoGAN is currently not advised


### S-UNIWARD

HStego is a tool for hiding data in uncompressed and JPEG images. This tool uses some of the most advanced steganography methods known today, along with an upper limit on the amount of data that can be hidden so that it cannot be reliably detected by modern steganography tools.

However, in this analysis the limit on the amount of information has not been used to compare HStego with the other tools, as the payload varies.

The graph shows two different versions of HStego, 0.3 and 0.4. Version 0.4 introduces different improvements that make it more difficult to detect.




<br>
## Results in JPEG

### Outguess

[Outguess](https://en.wikipedia.org/wiki/OutGuess) is the easiest 
steganography method to detect of all those analyzed for JPEG.
At its time, it was a steganography method that brought certain
innovations. However, we must not forget that it is a very old method.


### F5
[F5](https://github.com/daniellerch/stego-collection/tree/master/F5) is a 
very popular steganography method, which has led to an advanced variation 
known as [nsF5](https://dde.binghamton.edu/download/nsf5simulator/). This version 
is much harder to detect, although it hasn't been implemented in any public tools.

As seen in the graph, it's a tool that can be quite reliably detected 
using current steganalysis techniques.

### Steghide

[Steghide](https://steghide.sourceforge.net/) is a steganography method 
that's perhaps the most popular for JPEG images.

It has held up quite well over the years, though it can now be 
detected with a fair amount of reliability. However, as shown in the graph, 
it offers much better results than those of F5 and Outguess.

### HStego

As previously discussed, HStego specializes in concealing data within uncompressed and JPEG images. It employs some of the most cutting-edge steganography techniques available today and sets a maximum threshold for data concealment to ensure that contemporary steganalysis tools struggle to detect it consistently.

For this analysis, the data concealment limit hasn't been applied when contrasting HStego with other tools, given that the payload fluctuates.

The chart presents two distinct HStego versions: 0.3 and 0.4. The latter version, 0.4, integrates several enhancements, further bolstering its evasion against detection.


