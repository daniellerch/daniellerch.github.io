---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Laboratorio de Esteganografía, Estegoanálisis y watermarking"
lang-suffix: "-es"
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
[ &nbsp; <a href='#esteganografía'>Esteganografía</a> &nbsp;
| &nbsp; <a href='#estegoanálisis'>Estegoanálisis</a> &nbsp;  
| &nbsp; <a href='#watermarking'>Watermarking</a> &nbsp; ]
</center>


> En StegoLab puedes encontrar artículos e implementaciones de
> diferentes técnicas usadas en esteganografía, estegoanálisis y 
> *watermarking*.

<div style='margin-bottom:50px'></div>


## Esteganografía
<hr style='border:1px solid #ccc'>


<div style='margin-bottom:30px'></div>

- **[Esteganografía LSB en imágenes y audio](/stego/lab/intro/lsb-es)**: Artículo introductorio a la esteganografía LSB. Incluye ejemplos en Python para la incrustación de mensajes en imágenes de mapa de bits, imágenes JPEG y archivos de audio WAV.

<div style='margin-bottom:50px'></div>
#### Códigos:

- **[Códigos de Hamming binarios](/stego/lab/codes/binary-hamming-es)**: Descripción e implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming binarios. 


- **[Códigos de Hamming ternarios](/stego/lab/codes/ternary-hamming-es)**: Descripción e implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming ternarios. Los códigos ternarios permiten una capacidad superior a la de los códigos binarios para el mismo nivel de distorsión del medio.


- **[Wet Paper Codes](https://github.com/daniellerch/stegolab/tree/master/codes/wet_paper_codes.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Writing on Wet Paper](http://www.ws.binghamton.edu/fridrich/Research/EI5681-33_WPC.pdf)" de Jessica Fridrich, Miroslav Goljan, Petr Lisoněk y David Soukal

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" de Tomáš Filler, Jan Judas y Jessica Fridrich.



<div style='margin-bottom:50px'></div>
#### Funciones de coste:

- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes JPEG propuesta en el artículo "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" de Vojtěch Holub, Jessica Fridrich y Tomáš Denemark. 

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes de tipo mapa de bits propuesto en el artículo "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" de Bin Li, Ming Wang, Jiwu Huang y Xiaolong Li.



<br>
## Estegoanálisis
<hr style='border:1px solid #ccc'>

- **[Ataque ATS](https://github.com/daniellerch/papers_code/tree/master/ATS)**: Implementación en Python del ataque ATS, una técnica de estegoanálisis no supervisado presentado en el artículo [Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026) [[arXiv](https://arxiv.org/abs/2107.13862)] de Daniel Lerch-Hostalot y David Megías.

- **[Ataque de Calibración](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementación en Python del ataque a F5 (Esteganografía JPEG) propuesto en el artículo [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) de Jessica Fridrich, Miroslav Goljan y Dorin Hogea.

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Interfaz Python a la versión implementada en Matlab de Ensemble Classifiers para estegoanálisis, presentada en el artículo "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" de Jan Kodovský, Jessica Fridrich y Vojtěch Holub.




<br>
## Watermarking
<hr style='border:1px solid #ccc'>

- **[E-Blind](/stego/lab/watermarking-methods/e-blind-es)**: Incrustación a ciegas y detección mediante Correlación Lineal. Este método simplemente añade un patron a la imagen. Método etiquetado como *System 1* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Fixed-LC](/stego/lab/watermarking-methods/e-fixed-lc-es)**: Incrustación informada con correlación lineal fija y detección mediante correlación lineal. Este método ajusta la fuerza de la marca para garantizar una correlación lineal específica. Método etiquetado como *System 2* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-blk-Blind](/stego/lab/watermarking-methods/e-blk-blind-es)**: Incrustación a ciegas basada en bloques y detección mediante coeficiente de correlación. Método etiquetado como *System 3* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-es)**: Incrustación a ciegas de 8 bits y detector de 8 bits. Método etiquetado como *System 4* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Trellis-8](/stego/lab/watermarking-methods/e-trellis-8-es)**: Incrustación usando códigos de Trellis y detección mediante el algoritmo de Viterbi. Método etiquetado como *System 5* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.






<hr>
<br><br>


