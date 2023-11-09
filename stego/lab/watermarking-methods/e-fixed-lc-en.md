---
layout: page
title: "Fixed Linear Correlation Embedder and Linear Correlation Detection"
subtitle: "" 
noindex: false
meta-title: "Fixed Linear Correlation Embedder and Linear Correlation Detection"
meta-description: "Fixed Linear Correlation Embedder and Linear Correlation Detection."
meta-keywords: "watermarking, robust, informed embedding"
lang-suffix: "-en"
comments: true
---


> A fixed linear correlation embedder and linear correlation detection
> for image marking is presented below.

<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py'>
        E_FIXED_LC
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>
        D_LC
      </a> ]
</div>





<br>
## Embedding

This method is based on **System 2** presented in [ [1](#references) ]. 
It is a method that adds a pattern to the image, but unlike the 
[E-Blind](/stego/lab/watermarking-methods/e-blind-en/) method, in this case the 
image is analyzed before embedding the mark in order to keep the linear 
correlation value fixed. This type of insertion is known as informed embedding.


It is a **robust** method, capable of resisting some alterations of 
the image.

The pattern that we embed is the mark, which we generate from a password and 
which we add to the value of the image pixels. For this we use a parameter 
that allows us to indicate the strength with which the insertion is made. 
The larger the value of $\beta$, the more difficult it will be to remove the 
mark, although we will introduce more distortion into the image. 
In this implementation the $\beta=0.3$ value has been used. 
This value can be easily changed in the source code.

The value of the mark can be embedded by adding or subtracting, which allows 
us to have two types of marks. This can be used to embed a bit of information. 
That is, if we add the mark we will be embedding a 1, while if we subtract the 
mark we will be embedding a 0.


The embed method code is available at the following link
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py'>E_FIXED_LC</a>.

To embed a mark, just run a command like the following:

```bash
$ python3 E_FIXED_LC.py image.png passw123 1 marked.png
```


<br>
## Detection

The detection of the mark is performed by calculating the **linear correlation**
between the marked image and the mark. That is, we need the password to generate 
the same mark that has been embedded and thus be able to verify that there is a 
linear correlation.

The formula used for the linear correlation is the following:


$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$


The threshold of $Z_{lc}$ used to decide if the mark is present or not is 
usually calculated experimentally for the type of images in which it is 
intended to be used. In this implementation, a threshold of $0.7$.

The detection method is available at the following link: 
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>D_LC</a>.

To detect the mark and see if a 0 or a 1 has been embedded, just run a command 
like the following:


```bash
$ python3 D_LC.py marked.png passw123
LC: 0.9705514
watermark, m=1
```

<br>
## References


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


