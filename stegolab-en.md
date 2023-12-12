---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Steganography, Steganalysis and Watermarking Laboratory"
lang-suffix: "-en"
comments: true
---

<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#steganography'>Steganography</a> &nbsp;
| &nbsp; <a href='#steganalysis'>Steganalysis</a> &nbsp;  
| &nbsp; <a href='#watermarking'>Watermarking</a> &nbsp; ]
</center>

> In StegoLab you can find implementations of different 
> techniques used in steganography, steganalysis and watermarking.


<div style='margin-bottom:50px'></div>


## Steganography
<hr style='border:1px solid #ccc'>


<div style='margin-bottom:50px'></div>
#### Codes:

- **[Binary Hamming codes](https://github.com/daniellerch/stegolab/tree/master/codes/hamming_codes.py)**: Implementation in Python of information hiding using matrix embedding techniques with binary Hamming codes. You can find more information in the article "[Binary Hamming Codes in Steganography](/stego/lab/codes/binary-hamming-en/)".


- **[Ternary Hamming codes](https://github.com/daniellerch/stegolab/tree/master/codes/ternary_hamming_codes.py)**: Implementation in Python of information hiding using matrix embedding techniques with ternary Hamming codes. Ternary codes allow a higher capacity than binary codes for the same level of media distortion.You can find more information in the article "[Ternary Hamming Codes in Steganography](/stego/lab/codes/ternary-hamming-en/)".

- **[Wet Paper Codes](https://github.com/daniellerch/stegolab/tree/master/codes/wet_paper_codes.py)**: A Python implementación of the steganography embedding technique presented in the paper "[Writing on Wet Paper](http://www.ws.binghamton.edu/fridrich/Research/EI5681-33_WPC.pdf)" by Jessica Fridrich, Miroslav Goljan, Petr Lisoněk and David Soukal

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: A Python implementation of the steganography embedding technique presented in the paper "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" by Tomáš Filler, Jan Judas and Jessica Fridrich.



<div style='margin-bottom:50px'></div>
#### Cost functions:

- **[S-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/S-UNIWARD)**: 
  A Python implementation of the cost function used in steganography for hidding information into bitmap images, proposed in the paper "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" by Vojtěch Holub, Jessica Fridrich and Tomáš Denemark. 

- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  A Python implementation of the cost function used in steganography for hidding information into JPEG images, proposed in the paper "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" by Vojtěch Holub, Jessica Fridrich and Tomáš Denemark. 
Includes fast implementations using Numba and implementations that decompress into RGB without rounding the pixel values.

- **[J-UNIWARD + Cost Polarization](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD/j-uniwardfast-rgbnr-wiener-color.py)**: 
  A Python implementation of the cost polarization technique using the Wiener filter for [J-UNIWARD](https://link.springer.com/article/10.1186/1687-417X-2014-1)  proposed in the article [JPEG Steganography With Estimated Side-Information](https://ieeexplore.ieee.org/document/8746719) by Weixiang Li, Kejiang Chen, Weiming Zhang, Hang Zhou, Yaofei Wang and Nenghai Yu.

- **[RBV](https://github.com/daniellerch/stegolab/tree/master/J-RBV)**: 
 A Python implementation of the cost function used in steganography for hidding information into JPEG images, proposed in the paper 
 "[Distortion function based on residual blocks for JPEG steganography](https://link.springer.com/article/10.1007/s11042-017-5053-7)" by Qingde Wei, Zhaoxia Yin, Zichi Wang and Xinpeng Zhang.

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  A Python implementation of the cost function used in steganography for hiding information into bitmap images, proposed in the paper "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" by Bin Li, Ming Wang, Jiwu Huang and Xiaolong Li.


<br>
## Steganalysis
<hr style='border:1px solid #ccc'>

- **[ATS attack](https://github.com/daniellerch/papers_code/tree/master/ATS)**: Python implementation of the ATS attack, an unsupervised steganalysis technique presented in the article [Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026) [[arXiv](https://arxiv.org/abs/2107.13862)] by Daniel Lerch-Hostalot and David Megías.

- **[Calibration Attack](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementation of the attack to F5 algorithm (JPEG steganography) proposed in the paper [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) by Jessica Fridrich, Miroslav Goljan and Dorin Hogea.
<div style='height:16px'></div>

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Python Interface to the Matlab version of Ensemble Classifiers for Steganalysis, presented in the paper "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" by Jan Kodovský, Jessica Fridrich and Vojtěch Holub.






<br>
## Watermarking
<hr style='border:1px solid #ccc'>


- **[E-Blind](/stego/lab/watermarking-methods/e-blind-en/)**: Blind embedding and Linear Correlation Detection. This method simply adds a pattern to the image. The method is based on "System 1" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Fixed-LC](/stego/lab/watermarking-methods/e-fixed-lc-en/)**: Fixed Linear Correlation Embedder (informed embedding) and Linear Correlation Detection. This method adjusts the strength of the watermark to ensure that the watermarked image has a specified linear correlation. The method is based on "System 2" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-blk-Blind](/stego/lab/watermarking-methods/e-blk-blind-en/)**: Block-based blind embedding and correlation coefficient detection. This method works in a similar way to the E-Blind method. The method is based on "System 3" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-en/)**: 8-bit blind embedder and 8-bit detector. This method is a version of E-Blind modified to embed 8-bits. The method is based on "System 4" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Trellis-8](/stego/lab/watermarking-methods/e-trellis-8-en/)**: Trellis-coding embedder and Viterbi detector. This method embeds 8-bit messages using trellis-coded modulation. The method is based on "System 4" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.






<hr>
<br><br>


