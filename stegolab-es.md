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
#### Conceptos básicos:

- **[Esteganografía LSB en imágenes y audio](/stego/blog/lsb-es)**: Artículo introductorio a la esteganografía LSB. Incluye ejemplos en Python para la incrustación de mensajes en imágenes de mapa de bits, imágenes JPEG y archivos de audio WAV.

<div style='margin-bottom:50px'></div>
#### Códigos:

- **[Códigos de Hamming binarios](/stego/lab/codes/binary-hamming-es)**: Descripción e implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming binarios. 


- **[Códigos de Hamming ternarios](/stego/lab/codes/ternary-hamming-es)**: Descripción e implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming ternarios. Los códigos ternarios permiten una capacidad superior a la de los códigos binarios para el mismo nivel de distorsión del medio.


- **[Wet Paper Codes](https://github.com/daniellerch/stegolab/tree/master/codes/wet_paper_codes.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Writing on Wet Paper](http://www.ws.binghamton.edu/fridrich/Research/EI5681-33_WPC.pdf)" de Jessica Fridrich, Miroslav Goljan y David Soukal

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


- **[Ejemplos de Watermarking](https://github.com/daniellerch/stegolab/tree/master/watermarking)**: Implementación libre de algunos esquemas de *watermarking* propuestos en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

    - **System 1: E_BLIND/L_LC**<br>Incrustación a ciegas ([E_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py)) y detección mediante Correlación Lineal ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_BLIND simplemente añade un patron a la imagen.

    - **System 2: E_FIXED_LC/L_LC**<br>
      Incrustación por Correlación Lineal fija ([E_FIXED_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py)) y detección mediante Correlación Lineal ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_FIXED_LC ajusta la fuerza de la marca para asegurar que la imagen marcada tiene una correlación lineal específica (incrustación informada). 

    - **System 3: E_BLK_BLIND/D_BLK_CC**<br>
      Incrustación a ciegas basda en bloques ([E_BLK_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py)) y detección mediante Coeficiente de Correlación ([D_BLK_CC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py)). E_BLK_BLIND añade un patron en la media de los bloques.


    - **System 4: E_SIMPLE_8/D_SIMPLE_8**<br>
      Incrustación a ciegas de 8 bits ([E_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py)) y detector de 8 bits ([D_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py)). E_SIMPLE_8 es una modificación de E_BLIND para incrustar 8 bits.

    - **System 5: E_TRELLIS_8/D_TRELLIS_8**<br>
      Incrustación usando códigos de Trellis ([E_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py)) y detección mediante el algoritmo de Viterbi ([D_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py)). E_TRELLIS_8 incrusta 8 bits usando códigos de Trellis.






<hr>
<br><br>


