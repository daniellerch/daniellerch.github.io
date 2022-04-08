---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Laboratorio de Esteganografía, Estegoanálisis y watermarking"
lang-suffix: "-es"
---

### Esteganografía

- **[Binary Hamming Codes](https://github.com/daniellerch/stegolab/tree/master/codes/HammingCodes.py)**: Implementación en Python de *matrix embedding* usando códigos de Hamming binarios.

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" de Tomáš Filler, Jan Judas y Jessica Fridrich.

- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes JPEG propuesta en el artículo "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" de Vojtěch Holub, Jessica Fridrich y Tomáš Denemark. 

- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes de tipo mapa de bits propuesto en el artículo "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" de Bin Li, Ming Wang, Jiwu Huang y Xiaolong Li.

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Interfaz Python a la versión implementada en Matlab de Ensemble Classifiers para estegoanálisis, presentada en el artículo "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" de Jan Kodovský, Jessica Fridrich y Vojtěch Holub.

- **[Ataque de Calibración](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementación en Python del ataque a F5 (Esteganografía JPEG) propuesto en el artículo [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) de Jessica Fridrich, Miroslav Goljan y Dorin Hogea.
<div style='height:16px'></div>



### Watermarking

- **[Ejemplos de Watermarking](https://github.com/daniellerch/stegolab/tree/master/watermarking)**: Implementación libre de algunos esquemas de *watermarking* propuestos en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

    - **System 1: E_BLIND/L_LC**<br>Incrustación a ciegas ([E_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py)) y detección mediante Correlación Lineal ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_BLIND simplemente añade un patron a la imagen.

    - **System 2: E_FIXED_LC/L_LC**<br>
      Incrustación por Correlación Lineal fija ([E_FIXED_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py)) y detección mediante Correlación Lineal ([D_LC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py)). E_FIXED_LC ajusta la fuerza de la marca para asegurar que la imagen marcada tiene una correlación lineal específica (incrustación informada). 

    - **System 3: E_BLK_BLIND/D_BLK_CC**<br>
      Incrustación a ciegas basda en bloques ([E_BLK_BLIND](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py)) y detección mediante Coeficiente de Correlación ([D_BLK_CC](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py)). E_BLK_BLIND añade un patron en la media de los bloques.


    - **System 4: E_SIMPLE_8/D_SIMPLE_8**<br>
      Incrustación a ciegas de 8 bits ([E_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py)) y detector de 8 bits ([D_SIMPLE_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py)). E_SIMPLE_8 es una modificación de E_BLIND para incrustar 8 bits.

    - **System 5: E_TRELLIS_8/D_TRELLIS_8**<br>
      Incrustación usando códigos de Trellis ([E_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py)) y detección mediante el algoritmo de Viterbi ([D_TRELLIS_8](https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py)). E_TRELLIS_8 incrusta 9 bits usando códigos de Trellis.



<div style='height:16px'></div>

<hr>


