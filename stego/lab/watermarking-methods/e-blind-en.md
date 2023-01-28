---
layout: page
title: "Blind embedding and linear correlation detection"
subtitle: "" 
noindex: false
meta-title: "Blind embedding and linear correlation detection"
meta-description: "Blind embedding and linear correlation detection"
meta-keywords: "watermarking, robust, blind"
lang-suffix: "-en"
---

> A blind information embedding and linear correlation detection technique for 
> image watermarking is presented below.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py'>
        E_BLIND
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>
        D_LC
      </a> ]
</div>





<br>
## Embedding

This method is based on **System 1** presented in [ [1](#references) ]. 
This is a basic method that simply adds a pattern to the image. It is a robust 
method capable of resisting some alterations of the image.

The pattern that we embed is the mark, which we generate from a password and 
which we add to the value of the image pixels. For this we use a parameter 
$\alpha$ that allows us to indicate the strength with which the insertion is 
made. The larger the value of $\alpha$, the more difficult it is to remove 
the mark, although we will introduce more distortion into the image. 
In this implementation the value $\alpha=1$ has been used. This value can be 
easily changed in the source code.

The value of the mark can be embedded by adding or subtracting, which allows 
us to have two types of marks. This can be used to embed a bit of information. 
That is, if we add the mark we will be embedding a 1, while if we subtract the 
mark we will be embedding a 0.


The embed method code is available at the following link
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py'>E_BLIND</a>.

To embed a mark, just run a command like the following:

```bash
$ python3 E_BLIND.py image.png passw123 1 marked.png
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
$ python3 E_LC.py marked.png
LC: 0.92543936
watermark, m=1
```

<br>
## References


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


