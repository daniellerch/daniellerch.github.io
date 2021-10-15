---
layout: page
title: Index of code
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Steganography, steganalysis and watermarking laboratory"
---

### Steganography

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: A Python implementation of the steganography embedding technique presented in the paper "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" by Tomáš Filler, Jan Judas and Jessica Fridrich.


- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  A Python implementation of the steganography method for hidden information into JPEG images, proposed in the paper "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" by Vojtěch Holub, Jessica Fridrich and Tomáš Denemark. 

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  A Python implementation of the steganography method for hiding information into bitmap images, proposed in the paper "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" by Bin Li, Ming Wang, Jiwu Huang and Xiaolong Li.

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Python Interface to the Matlab version of Ensemble Classifiers for Steganalysis, presented in the paper "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" by Jan Kodovský, Jessica Fridrich and Vojtěch Holub.

- **[Calibration Attack](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementation of the attack to F5 algorithm (JPEG steganography) proposed in the paper [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) by Jessica Fridrich, Miroslav Goljan and Dorin Hogea.
<div style='height:16px'></div>



### Watermarking

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



<div style='height:16px'></div>

<hr>


