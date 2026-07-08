---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Steganography, Steganalysis and Watermarking Laboratory"
lang-suffix: "-en"
comments: false
---

<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }

    .stegolab-section {
        margin: 3.5rem 0 2rem;
        padding: 1.5rem 1.75rem;
        border-left: 4px solid #0074D9;
        background: #f7f9fb;
    }

    .stegolab-section h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .stegolab-section p {
        margin-bottom: 0;
        color: #666;
    }

</style>


> StegoLab brings together practical tools, supporting software libraries, and research implementations for work on steganography, steganalysis, and watermarking.


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#tools'>Tools</a> &nbsp;
| &nbsp; <a href='#research-code'>Research Code</a> &nbsp; ]
</center>


<section class="stegolab-section" id="tools">
  <h2>Tools</h2>
  <p>Software intended for practical use, including steganalysis tools, steganography tools and supporting libraries.</p>
</section>

<center style='margin-bottom:30px'>
[ &nbsp; <a href='#aletheia'>Aletheia</a> &nbsp;
| &nbsp; <a href='#hstego'>HStego</a> &nbsp;
| &nbsp; <a href='#stego-retweet'>Stego Retweet</a> &nbsp;
|| &nbsp; <a href='#python-jpeg-toolbox'>Python JPEG Toolbox</a> &nbsp;
| &nbsp; <a href='#python-syndrome-trellis-codes'>pySTC</a> &nbsp; ]
</center>

<div style='margin-bottom:50px'></div>
### Aletheia


**[Aletheia](https://github.com/daniellerch/aletheia)** is an open source image steganalysis tool for the detection of hidden messages in images. To achieve its objectives, Aletheia uses state-of-the-art machine learning techniques. It is capable of detecting several different steganographic methods as for example F5, Steghide, LSB replacement, LSB matching and some kind of adaptive schemes.

**Articles on practical steganalysis with Aletheia:**
- [Introduction to steganalysis using Aletheia.](/stego/aletheia/v03/intro-en/)
- [Identifying the steganographic scheme.](/stego/aletheia/v03/identify-en/)
- [Practical attack on Steghide.](/stego/aletheia/v03/steghide-attack-en/)
- [Practical attack on F5.](/stego/aletheia/v03/f5-attack-en/)
- [Practical attack on LSB replacement: OpenStego and OpenPuff.](/stego/aletheia/v03/lsbr-attack-en/)
- [Solving Stego-Puzzles with Aletheia.](/stego/aletheia/v03/stego-puzzles-en/)
- [Comparison of Image Steganography Tools.](/stego/aletheia/v03/tool-comparison-en/)
- [Training models for Aletheia](/stego/aletheia/v03/training-en/).


<div style='margin-top:40px'></div>



<div style='margin-bottom:80px'></div>
### HStego


**[HStego](https://github.com/daniellerch/hstego)** is a tool for hiding data in bitmap and JPEG images. This tool uses modern adaptive steganography methods together with a payload limit intended to reduce detectability under supported scenarios; this should not be read as a guarantee of undetectability.

<div style='margin-bottom:80px'></div>
### Stego Retweet

**[Stego Retweet](https://github.com/daniellerch/stego-retweet)** is a tool for hiding messages in Twitter using retweets. Using a list of hashtags provided by the user, this tool finds and retweets some tweets containing especial words. This allows to hide a message that can be read by the user who has the password. The capacity is of two characters per retweet. 


<div style='margin-bottom:80px'></div>
### Python JPEG Toolbox

**[Python JPEG Toolbox](https://github.com/daniellerch/python-jpeg-toolbox)**  is a library similar to the well-known JPEG Toolbox for Matlab. It allows reading and writing low-level information from JPEG files, such as DCT coefficients or quantization matrices.


<div style='margin-bottom:80px'></div>
### Python Syndrome Trellis Codes

**[PySTC](https://github.com/daniellerch/pySTC)** is a Python interface for Syndrome-Trellis Codes (STC), a method used in steganography to minimize embedding distortion when hiding information within digital media. STCs are linear convolutional codes represented by a parity-check matrix, which allows efficient embedding while preserving the quality of the cover medium.


<div style='margin-bottom:60px'></div>

<section class="stegolab-section" id="research-code">
  <h2>Research Code</h2>
  <p>Implementations, prototypes and experimental code associated with research papers and technical work.</p>
</section>

<center style='margin-bottom:30px'>
[ &nbsp; <a href='#steganography'>Steganography</a> &nbsp;
| &nbsp; <a href='#steganalysis'>Steganalysis</a> &nbsp;
| &nbsp; <a href='#watermarking'>Watermarking</a> &nbsp; ]
</center>

### Steganography
<hr style='border:1px solid #ccc'>


<div style='margin-bottom:50px'></div>
#### Codes:

- **[Binary Hamming codes](https://github.com/daniellerch/stegolab/tree/master/codes/hamming_codes.py)**: Implementation in Python of information hiding using matrix embedding techniques with binary Hamming codes. You can find more information in the article "[Binary Hamming Codes in Steganography](/stego/codes/binary-hamming-en/)".


- **[Ternary Hamming codes](https://github.com/daniellerch/stegolab/tree/master/codes/ternary_hamming_codes.py)**: Implementation in Python of information hiding using matrix embedding techniques with ternary Hamming codes. Ternary codes allow a higher capacity than binary codes for the same level of media distortion.You can find more information in the article "[Ternary Hamming Codes in Steganography](/stego/codes/ternary-hamming-en/)".

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
### Steganalysis
<hr style='border:1px solid #ccc'>

- **[ATS attack](https://github.com/daniellerch/papers_code/tree/master/ATS)**: Python implementation of the ATS attack, an unsupervised steganalysis technique presented in the article [Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026) [[arXiv](https://arxiv.org/abs/2107.13862)] by Daniel Lerch-Hostalot and David Megías.

- **[Calibration Attack](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementation of the attack to F5 algorithm (JPEG steganography) proposed in the paper [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) by Jessica Fridrich, Miroslav Goljan and Dorin Hogea.
<div style='height:16px'></div>

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Python Interface to the Matlab version of Ensemble Classifiers for Steganalysis, presented in the paper "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" by Jan Kodovský, Jessica Fridrich and Vojtěch Holub.






<br>
### Watermarking
<hr style='border:1px solid #ccc'>

- **[H\[$i$\]dden](https://github.com/daniellerch/stegolab/tree/master/watermarking/H%5Bi%5Ddden.py)**: Reversible data embedding in complex domain with homomorphic encryption presented in the paper [Complex Domain Approach for Reversible Data Hiding and Homomorphic Encryption: General Framework and Application to Dispersed Data](https://arxiv.org/abs/2510.03770) by David Megias, 2025 [<a href="https://arxiv.org/pdf/2510.03770">pdf</a>] [<a href="https://github.com/daniellerch/stegolab/raw/refs/heads/master/watermarking/doc/Dagstuhl%202025.pptx">slides</a>].

- **[E-Blind](/stego/lab/watermarking-methods/e-blind-en/)**: Blind embedding and Linear Correlation Detection. This method simply adds a pattern to the image. The method is based on "System 1" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Fixed-LC](/stego/lab/watermarking-methods/e-fixed-lc-en/)**: Fixed Linear Correlation Embedder (informed embedding) and Linear Correlation Detection. This method adjusts the strength of the watermark to ensure that the watermarked image has a specified linear correlation. The method is based on "System 2" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1) by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-blk-Blind](/stego/lab/watermarking-methods/e-blk-blind-en/)**: Block-based blind embedding and correlation coefficient detection. This method works in a similar way to the E-Blind method. The method is based on "System 3" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-en/)**: 8-bit blind embedder and 8-bit detector. This method is a version of E-Blind modified to embed 8-bits. The method is based on "System 4" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1) by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Trellis-8](/stego/lab/watermarking-methods/e-trellis-8-en/)**: Trellis-coding embedder and Viterbi detector. This method embeds 8-bit messages using trellis-coded modulation. The method is based on "System 4" proposed in the book [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  by I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.






<hr>
<br><br>
