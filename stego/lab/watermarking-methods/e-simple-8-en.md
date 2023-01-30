---
layout: page
title: "8-bit blind embedder and 8-bit detector"
subtitle: "" 
noindex: false
meta-title: "8-bit blind embedder and 8-bit detector"
meta-description: "8-bit blind embedder and 8-bit detector."
meta-keywords: "watermarking, robust, blind, 8-bit"
lang-suffix: "-en"
---

> An 8-bit blind embedding and 8-bit blind detection/extraction technique 
> for image watermarking is presented below.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py'>
        E_SIMPLE_8
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py'>
        D_SIMPLE_8
      </a> ]
</div>





<br>
## Embedding

This method is based on **System 4** presented in [ [1](#referencias) ]. 
It is a method based on [E-Blind](/stego/lab/watermarking-methods/e-blind-es/), 
although in this case 8 different marks are embedded. This allows 8 bits to be 
embedded, since each mark can be inserted by adding (1) or subtracting (0).

As more and more marks are inserted, in order to embed more bits of information, 
the reliability decreases. Therefore, we cannot use this methodology to embed 
large amounts of information.

The code of the embedding method is available at the following link:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py'>E_SIMPLE_8</a>.

To embed a mark, just run a command like the following:

```bash
$ python3 E_SIMPLE_8.py image.png passw123 10101010 marked.png
```


<br>
## Detection

Mark detection is performed by calculating the **linear correlation** between 
the marked image and each of the eight marks. In this way, for each of the eight 
marks we extract one of the eight bits.

The formula used for the linear correlation is as follows:

$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$

In this case the threshold of $Z_{lc}$ used for the extraction of each of the bits is $0$. 
So we do not consider the option that one of the marks is not present. Thus, 
eight bits will always be extracted, even if no mark is present.

The code for the detection method is available at the following link: 
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py'>D_SIMPLE_8</a>.

To detect the mark and see if a 0 or a 1 is embedded, just run a command like the following:

```bash
$ python3 D_SIMPLE_8.py marked.png passw123
msg: 10101010
```



<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


