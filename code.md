---
layout: page
title: Index of code
subtitle: "" 
noindex: false
meta-title: "Index of code"
meta-description: "Steganography and steganalysis programs and resources"
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

<div class='menu'></div>

## Table of contents
* [Matrix embedding](#matrix-embedding)
* [Cost functions](#cost-functions)
* [Machine/Deep Learning attacks](#machinedeep-learning-attacks)
* [Statistical attacks](#statistical-attacks)
* [Watermarking](#watermarking)
* [Tools & libraries](#tools--libraries)

<br>
<hr>


## Matrix embedding

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: A Python implementation of the steganography embedding technique presented in the paper "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" by Tomáš Filler, Jan Judas and Jessica Fridrich.


- **[PySTC](https://github.com/daniellerch/pySTC)**: Python interface to Syndrome Trellis Codes (C++), presented in the paper "[Minimizing Additive Distortion in Steganography using Syndrome-Trellis Codes](https://ieeexplore.ieee.org/document/5740590)" by Tomáš Filler, Jan Judas and Jessica Fridrich.

<hr>


## Cost functions

- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  A Python implementation of the steganography method for hidden information into JPEG images, proposed in the paper "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" by Vojtěch Holub, Jessica Fridrich and Tomáš Denemark. 

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  A Python implementation of the steganography method for hiding information into bitmap images, proposed in the paper "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" by Bin Li, Ming Wang, Jiwu Huang and Xiaolong Li.

<hr>


## Machine/Deep Learning attacks

- **[ATS](https://github.com/daniellerch/papers_code/blob/master/ATS/)**: Implementation of the ATS attack, presented in the paper "[Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026)" by Daniel Lerch-Hostalot and David Megías.

- **[MA](https://github.com/daniellerch/papers_code/blob/master/MA_PPD/)**: Implementation of the *manifold alignment* technique, presented in the paper "[Manifold alignment approach to cover source mismatch in steganalysis](https://github.com/daniellerch/papers/raw/master/dlerch2016ma.pdf)" by Daniel Lerch-Hostalot and David Megías.

- **[PPD](https://github.com/daniellerch/papers_code/blob/master/PPD/)**: Implementation of the PPD feature extractor, presented in the paper "[LSB matching steganalysis based on patterns of pixel differences and random embedding](https://www.sciencedirect.com/science/article/pii/S0167404812001745)" by Daniel Lerch-Hostalot and David Megías.

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Python Interface to the Matlab version of Ensemble Classifiers for Steganalysis, presented in the paper "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" by Jan Kodovský, Jessica Fridrich and Vojtěch Holub.

<hr>




## Statistical attacks

- **[Calibration Attack](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementation of the attack to F5 algorithm (JPEG steganography) proposed in the paper [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) by Jessica Fridrich, Miroslav Goljan and Dorin Hogea.
<div style='height:16px'></div>

<hr>

## Watermarking

- **[Watermarking examples](https://github.com/daniellerch/stegolab/tree/master/watermarking)**: Implementation of some watermarking schemes proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich and T. Kalker.
    - **System 1: E_BLIND/L_LC**<br>Blind Embedding ([E_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py)) and Linear Correlation Detection ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)).
    - **System 2: E_FIXED_LC/L_LC**<br>
      Fixed Linear Correlation Embedder ([E_FIXED_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py)) amd Linear Correlation Detection ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)).
    - **System 3: E_BLK_BLIND/D_BLK_CC**<br>
      Block-Based, Blind Embedding ([E_BLK_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py)) and Correlation Coefficient Detection ([D_BLK_CC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py))
    - **System 4: E_SIMPLE_8**<br>
      8-Bit Blind Embedder ([E_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py)) and 8-Bit Detector ([D_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py)).
    - **System 5: E_TRELLIS_8/D_TRELLIS_8**<br>
      Trellis-Coding Embedder ([E_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py)) and Viterbi Detector ([D_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py)).
<div style='height:16px'></div>

<hr>




## Tools & libraries

- **[Python JPEG Toolbox](https://github.com/daniellerch/python-jpeg-toolbox)**: Toolbox for accessing low level JPEG information (DCT coefficients, quantization tables, ...) with Python. Its interface is similar to the well-known Matlab JPEG Toolbox. 

- **[Aletheia](https://github.com/daniellerch/aletheia)**: Aletheia is an open source image steganalysis tool for the detection of hidden messages in images. To achieve its objectives, Aletheia uses state-of-the-art machine learning techniques. It is capable of detecting different steganographic methods as for example LSB replacement, LSB matching and some kind of adaptive schemes.

- **[Stego Retweet](https://github.com/daniellerch/stego-retweet)**: A tool for hiding messages in Twitter using retweets. Using a list of hashtags provided by the user, this tool finds and retweets some tweets containing especial words. This allows to hide a message that can be read by the user who has the password. The capacity is of two characters per retweet. 

<hr>



