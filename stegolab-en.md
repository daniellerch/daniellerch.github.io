---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Steganography, Steganalysis and Watermarking Laboratory"
lang-suffix: "-en"
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

> In StegoLab you can find articles and implementations of different 
> techniques used in steganography, steganalysis and watermarking.


<div style='margin-bottom:50px'></div>


## Steganography
<hr style='border:1px solid #ccc'>


<div style='margin-bottom:30px'></div>
#### Basic concepts:

- **[LSB steganography in images and audio.](/stego/blog/lsb-en)**: Introductory article to LSB steganography. Includes Python examples for embedding messages in bitmap images, JPEG images, and WAV audio files.



<div style='margin-bottom:50px'></div>
#### Codes:

- **[Binary Hamming codes](/stego/lab/codes/binary-hamming-en)**: Description and implementation in Python of information hiding using matrix embedding techniques with binary Hamming codes. 


- **[Ternary Hamming codes](/stego/lab/codes/ternary-hamming-en)**: Description and implementation in Python of information hiding using matrix embedding techniques with ternary Hamming codes. Ternary codes allow a higher capacity than binary codes for the same level of media distortion.

- **[Wet Paper Codes](https://github.com/daniellerch/stegolab/tree/master/codes/WetPaperCodes.py)**: A Python implementación of the steganography embedding technique presented in the paper "[Writing on Wet Paper](http://www.ws.binghamton.edu/fridrich/Research/EI5681-33_WPC.pdf)" by Jessica Fridrich, Miroslav Goljan and David Soukal

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: A Python implementation of the steganography embedding technique presented in the paper "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" by Tomáš Filler, Jan Judas and Jessica Fridrich.



<div style='margin-bottom:50px'></div>
#### Cost functions:

- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  A Python implementation of the cost function used in steganography for hidding information into JPEG images, proposed in the paper "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" by Vojtěch Holub, Jessica Fridrich and Tomáš Denemark. 

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  A Python implementation of the cost function used in steganography for hiding information into bitmap images, proposed in the paper "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" by Bin Li, Ming Wang, Jiwu Huang and Xiaolong Li.


<br>
## Steganalisis
<hr style='border:1px solid #ccc'>

- **[ATS attack](https://github.com/daniellerch/papers_code/tree/master/ATS)**: Python implementation of the ATS attack, an unsupervised steganalysis technique presented in the article [Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026) [[arXiv](https://arxiv.org/abs/2107.13862)] by Daniel Lerch-Hostalot and David Megías.

- **[Calibration Attack](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementation of the attack to F5 algorithm (JPEG steganography) proposed in the paper [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) by Jessica Fridrich, Miroslav Goljan and Dorin Hogea.
<div style='height:16px'></div>

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Python Interface to the Matlab version of Ensemble Classifiers for Steganalysis, presented in the paper "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" by Jan Kodovský, Jessica Fridrich and Vojtěch Holub.






<br>
## Watermarking
<hr style='border:1px solid #ccc'>



- **[Watermarking examples](https://github.com/daniellerch/stegolab/tree/master/watermarking)**: Implementation of some watermarking schemes proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich and T. Kalker.

    - **System 1: E_BLIND/L_LC**<br>Blind Embedding ([E_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py)) and Linear Correlation Detection ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_BLIND simply adds a pattern to an image.

    - **System 2: E_FIXED_LC/L_LC**<br>
      Fixed Linear Correlation Embedder ([E_FIXED_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py)) and Linear Correlation Detection ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_FIXED_LC adjusts the strength of the watermark to ensure that the watermarked image has a specified linear correlation (informed embedding). 

    - **System 3: E_BLK_BLIND/D_BLK_CC**<br>
      Block-Based, Blind Embedding ([E_BLK_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py)) and Correlation Coefficient Detection ([D_BLK_CC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py)). E_BLK_BLIND adds a pattern by block averaging.


    - **System 4: E_SIMPLE_8/D_SIMPLE_8**<br>
      8-Bit Blind Embedder ([E_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py)) and 8-Bit Detector ([D_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py)). E_SIMPLE_8 is a version of E_BLIND modified to embed 8-bits.

    - **System 5: E_TRELLIS_8/D_TRELLIS_8**<br>
      Trellis-Coding Embedder ([E_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py)) and Viterbi Detector ([D_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py)). E_TRELLIS_8 embeds 8-bit messages using trellis-coded modulation.









<hr>
<br><br>


