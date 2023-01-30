---
layout: page
title: "Block-based blind embedding and correlation coefficient detection"
subtitle: "" 
noindex: false
meta-title: "Block-based blind embedding and correlation coefficient detection"
meta-description: "Block-based blind embedding and correlation coefficient detection."
meta-keywords: "watermarking, robust, block-based, blind"
lang-suffix: "-es"
---


> A block-based blind embedding and correlation coefficient detector technique for 
> image watermarking is presented below.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py'>
        E_BLK_BLIND
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py'>
        D_BLK_CC
      </a> ]
</div>





<br>
## Embedding


This method is based on **System 4** presented in [ [1](#referencias) ]. 
It is a method based on [E-Blind](/stego/lab/watermarking-methods/e-blind-es/), 
although in this case the image is grouped into blocks and then the mark is 
distributed among them. Doing so makes the system more robust. 
The method works exactly the same as [E-Blind](/stego/lab/watermarking-methods/e-blind-es/).

The code for the embedding method is available at the following link: 
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py'>E_BLK_BLIND</a>.

To embed a mark you can run a command like the following:

```bash
$ python3 E_BLK_BLIND.py image.png passw123 1 marked.png
```


<br>
## Detection

Unlike the [E-Blind](/stego/lab/watermarking-methods/e-blind-es/) method, where 
we perform the detection using linear correlation, in this case we use the 
**correlation coefficient** between the marked image and the mark. 
We will need the password to generate the same mark that has been embedded in 
order to calculate the correlation coefficient.

The formula used for the correlation coefficient is as follows:

$Z_{cc} = \frac{ \bar{v}·\bar{w_r} }{ \sqrt{(\bar{v}·\bar{v})(\bar{w_r}·\bar{w_r})}} = \sum_{x=0}^7 \sum_{y=0}^7 \bar{v}(x,y) \bar{w_r}(x,y)$

The threshold of $Z_{cc}$ used to decide whether the mark is present or not is 
usually calculated experimentally for the type of images in which it is to be used. 
In this implementation a threshold of $0.55$ has been used.

The code of the detection method is available at the following link: 
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py'>D_BLK_CC</a>.

To detect the mark and see if a 0 or a 1 has been embedded, just run a command 
like the following:


```bash
$ python3 D_BLK_CC.py marked.png passw123
CC: 0.9324434
watermark, m=1
```

<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


