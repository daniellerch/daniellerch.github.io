---
layout: page
title: "Trellis-coding embedder and Viterbi detector"
subtitle: "" 
noindex: false
meta-title: "Trellis-coding embedder and Viterbi detector"
meta-description: "Trellis-coding embedder and Viterbi detector."
meta-keywords: "watermarking, robust, blind, 8-bit, Trellis codes, Trellis modulation"
lang-suffix: "-en"
---


> The following is an 8-bit blind embedding technique using Trellis codes for image watermarking. 
> The Viterbi algorithm is used to extract the 8 bits of the message.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py'>
        E_TRELLIS_8
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py'>
        D_TRELLIS_8
      </a> ]
</div>





<br>
## Embedding

This method is based on System 5 presented in  [ [1](#references) ]. 
It is a similar based method to [E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-en/), 
in the sense that 8 different marks are embedded in order to hide 8 bits. 
However, in this case Trellis codes are used to encode the bits, 
which allows for a much more reliable decoding.

It is a **robust** method, i.e. able to withstand some image alterations.

The code for the embedding method is available at the following link:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py'>E_TRELLIS_8</a>.

To embed a mark, just run a command like the following:

```bash
$ python3 E_TRELLIS_8.py image.png passw123 10101010 marked.png
```


<br>
## Detection

Mark detection and decoding is performed by calculating the 
**linear correlation** between the marked image and each of the eight marks.

The formula used for the linear correlation is as follows:

$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$

The [Viterbi](https://en.wikipedia.org/wiki/Viterbi_algorithm) 
algorithm is used for message decoding.


The code of the detection method is available at the following link: 
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py'>D_TRELLIS_8</a>.

To detect the mark and see if a 0 or a 1 has been embedded, just run a command like the following:

```bash
$ python3 D_TRELLIS_8.py marked.png passw123
msg: 10101010
```



<br>
## References


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


