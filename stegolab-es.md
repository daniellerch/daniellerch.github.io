---
layout: page
title: StegoLab
subtitle: "" 
noindex: false
meta-title: "StegoLab"
meta-description: "Laboratorio de Esteganografía, Estegoanálisis y watermarking"
lang-suffix: "-es"
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


> StegoLab reúne herramientas prácticas, librerías de apoyo e implementaciones de investigación para trabajar en esteganografía, estegoanálisis y *watermarking*.


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#tools'>Tools</a> &nbsp;
| &nbsp; <a href='#research-code'>Research Code</a> &nbsp; ]
</center>


<section class="stegolab-section" id="tools">
  <h2>Tools</h2>
  <p>Herramientas orientadas al uso práctico, incluyendo estegoanálisis, esteganografía y librerías de apoyo.</p>
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

**[Aletheia](https://github.com/daniellerch/aletheia)** es una herramienta libre de estegoanálisis para la detección de mensajes ocultos en imágenes. Para alcanzar sus objetivos, Aletheia usa técnicas de *machine learning* del estado del arte. Es capaz de detectar diferentes métodos de esteganografía, como por ejemplo F5, Steghide, métodos basdos en sustitución del LSB, LSB *matching* y métodos adaptativos.

**Artículos sobre estegoanálisis práctico con Aletheia:**
- [Introducción al estegoanálisis con Aletheia.](/stego/aletheia/v03/intro-es/)
- [Cómo identificar el esquema de esteganografía.](/stego/aletheia/v03/identify-es/)
- [Ataque práctico a Steghide.](/stego/aletheia/v03/steghide-attack-es/)
- [Ataque práctico a F5.](/stego/aletheia/v03/f5-attack-es/)
- [Ataque práctico a esquemas LSB replacement: OpenStego y OpenPuff.](/stego/aletheia/v03/lsbr-attack-es/)
- [Resolución de stego-puzzles con Aletheia](/stego/aletheia/v03/stego-puzzles-es/).
- [Comparativa de herramientas de esteganografía en imágenes.](/stego/aletheia/v03/tool-comparison-es/)
- [Entrenamiento de modelos para Aletheia](/stego/aletheia/v03/training-es/).


<div style='margin-top:40px'></div>



<div style='margin-bottom:80px'></div>
### HStego

**[HStego](https://github.com/daniellerch/hstego)** es una herramienta para ocultar información en imágenes de tipo mapa de bits y en imágenes JPEG. Esta herramienta usa algunos de los más avanzados métodos de esteganografía que se conocen, junto con un límite en la cantidad de datos que esconde, calculado para que no pueda ser detectada por herramientas modernas de estegoanálisis. 


<div style='margin-bottom:80px'></div>
### Stego Retweet


**[Stego Retweet](https://github.com/daniellerch/stego-retweet)** es una herramienta para esconder mensajes en Twitter mediante retweets. Usando una lista de *hashtags* proporcionada por el usuario, esta herramienta busca y realiza retweets de  tweets que contienen ciertas palabras especiales. De esta manera es capaz de transmitir un mensaje que podrá ser leído por un destinatario poseedor de una contraseña. La capacidad de este esquema es de dos caracteres por retweet. 



<div style='margin-bottom:80px'></div>
### Python JPEG Toolbox

**[Python JPEG Toolbox](https://github.com/daniellerch/python-jpeg-toolbox)** es una librería  similar al concodio JPEG toolbox de Matlab. Permite leer y escribir información de bajo nivel de archivos JPEG, como, por ejemplo, los coeficientes DCT, o las matrices de cuantización.


<div style='margin-bottom:80px'></div>
### Python Syndrome Trellis Codes

**[PySTC](https://github.com/daniellerch/pySTC)** es una interfaz en Python para los Códigos Síndrome-Trellis (STC), un método utilizado en la esteganografía para minimizar la distorsión en la inserción al ocultar información dentro de medios digitales. Los STC son códigos convolucionales lineales representados mediante una matriz de verificación de paridad, lo que permite una inserción eficiente mientras se preserva la calidad del medio portador.


<div style='margin-bottom:60px'></div>

<section class="stegolab-section" id="research-code">
  <h2>Research Code</h2>
  <p>Implementaciones, prototipos y código experimental asociado a publicaciones y trabajo técnico de investigación.</p>
</section>

<center style='margin-bottom:30px'>
[ &nbsp; <a href='#esteganografía'>Esteganografía</a> &nbsp;
| &nbsp; <a href='#estegoanálisis'>Estegoanálisis</a> &nbsp;
| &nbsp; <a href='#watermarking'>Watermarking</a> &nbsp; ]
</center>

### Esteganografía
<hr style='border:1px solid #ccc'>



<div style='margin-bottom:50px'></div>
#### Códigos:

- **[Códigos de Hamming binarios](https://github.com/daniellerch/stegolab/tree/master/codes/hamming_codes.py)**: Implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming binarios. Puedes encontrar más información en el artículo "[Códigos de Hamming binarios en esteganografía](/stego/lab/codes/binary-hamming-es/)".


- **[Códigos de Hamming ternarios](https://github.com/daniellerch/stegolab/tree/master/codes/ternary_hamming_codes.py)**: Implementación en Python de la incrustación de información mediante técnicas de *matrix embedding* usando códigos de Hamming ternarios. Los códigos ternarios permiten una capacidad superior a la de los códigos binarios para el mismo nivel de distorsión del medio. Puedes encontrar más información en el artículo "[Códigos de Hamming ternarios en esteganografía](/stego/lab/codes/ternary-hamming-es/)".


- **[Wet Paper Codes](https://github.com/daniellerch/stegolab/tree/master/codes/wet_paper_codes.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Writing on Wet Paper](http://www.ws.binghamton.edu/fridrich/Research/EI5681-33_WPC.pdf)" de Jessica Fridrich, Miroslav Goljan, Petr Lisoněk y David Soukal

- **[Syndrome Trellis Codes](https://github.com/daniellerch/stegolab/tree/master/codes/STC.py)**: Implementación en Python de la técnica de incrustación presentada en el artículo "[Minimizing embedding impact in steganography using trellis-coded quantization](https://doi.org/10.1117/12.838002)" de Tomáš Filler, Jan Judas y Jessica Fridrich.



<div style='margin-bottom:50px'></div>
#### Funciones de coste:

- **[S-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/S-UNIWARD)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes de mapa de bits propuesta en el artículo "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" de Vojtěch Holub, Jessica Fridrich y Tomáš Denemark. 


- **[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes JPEG propuesta en el artículo "[Universal Distortion Function for Steganography in an Arbitrary Domain](https://link.springer.com/article/10.1186/1687-417X-2014-1)" de Vojtěch Holub, Jessica Fridrich y Tomáš Denemark. 
Incluye implementaciones aceleradas con Numba y descompresión a RGB sin redondear el valor de los píxeles.

- **[J-UNIWARD + Cost Polarization](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD/j-uniwardfast-rgbnr-wiener-color.py)**: 
  Implementación en Python de la técnica de polarización de costes usando el filtro Wiener para [J-UNIWARD](https://link.springer.com/article/10.1186/1687-417X-2014-1), propuesto en el artículo [JPEG Steganography With Estimated Side-Information](https://ieeexplore.ieee.org/document/8746719) de Weixiang Li, Kejiang Chen, Weiming Zhang, Hang Zhou, Yaofei Wang y Nenghai Yu.



- **[RBV](https://github.com/daniellerch/stegolab/tree/master/J-RBV)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes JPEG propuesta en el artículo "[Distortion function based on residual blocks for JPEG steganography](https://link.springer.com/article/10.1007/s11042-017-5053-7)" de Qingde Wei, Zhaoxia Yin, Zichi Wang y Xinpeng Zhang.


- **[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)**: 
  Implementación en Python del método de esteganografía para ocultar información en imágenes de tipo mapa de bits propuesto en el artículo "[A New Cost Function for Spatial Image Steganography](https://ieeexplore.ieee.org/document/7025854)" de Bin Li, Ming Wang, Jiwu Huang y Xiaolong Li.



<br>
### Estegoanálisis
<hr style='border:1px solid #ccc'>

- **[Ataque ATS](https://github.com/daniellerch/papers_code/tree/master/ATS)**: Implementación en Python del ataque ATS, una técnica de estegoanálisis no supervisado presentado en el artículo [Unsupervised steganalysis based on artificial training sets](https://www.sciencedirect.com/science/article/abs/pii/S0952197616000026) [[arXiv](https://arxiv.org/abs/2107.13862)] de Daniel Lerch-Hostalot y David Megías.

- **[Ataque de Calibración](https://github.com/daniellerch/stegolab/tree/master/calibration)**: Implementación en Python del ataque a F5 (Esteganografía JPEG) propuesto en el artículo [Steganalysis of JPEG Images: Breaking the F5 Algorithm](https://link.springer.com/chapter/10.1007/3-540-36415-3_20) de Jessica Fridrich, Miroslav Goljan y Dorin Hogea.

- **[pyEC](https://github.com/daniellerch/stegolab/tree/master/pyEC)**: Interfaz Python a la versión implementada en Matlab de Ensemble Classifiers para estegoanálisis, presentada en el artículo "[Ensemble Classifiers for Steganalysis of Digital Media](https://ieeexplore.ieee.org/document/6081929)" de Jan Kodovský, Jessica Fridrich y Vojtěch Holub.




<br>
### Watermarking
<hr style='border:1px solid #ccc'>

- **[H\[$i$\]dden](https://github.com/daniellerch/stegolab/tree/master/watermarking/H%5Bi%5Ddden.py)**: Método de incrustación reversible en el dominio complejo con cifrado homomórfico presentado en el paper [Complex Domain Approach for Reversible Data Hiding and Homomorphic Encryption: General Framework and Application to Dispersed Data](https://arxiv.org/abs/2510.03770) de David Megias, 2025 [<a href="https://arxiv.org/pdf/2510.03770">pdf</a>] [<a href="https://github.com/daniellerch/stegolab/raw/refs/heads/master/watermarking/doc/Dagstuhl%202025.pptx">slides</a>].

- **[E-Blind](/stego/lab/watermarking-methods/e-blind-es/)**: Incrustación a ciegas y detección mediante Correlación Lineal. Este método simplemente añade un patron a la imagen. Método etiquetado como *System 1* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Fixed-LC](/stego/lab/watermarking-methods/e-fixed-lc-es/)**: Incrustación informada con correlación lineal fija y detección mediante correlación lineal. Este método ajusta la fuerza de la marca para garantizar una correlación lineal específica. Método etiquetado como *System 2* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-blk-Blind](/stego/lab/watermarking-methods/e-blk-blind-es/)**: Incrustación a ciegas basada en bloques y detección mediante coeficiente de correlación. Método etiquetado como *System 3* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-es/)**: Incrustación a ciegas de 8 bits y detector de 8 bits. Método etiquetado como *System 4* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.

- **[E-Trellis-8](/stego/lab/watermarking-methods/e-trellis-8-es/)**: Incrustación usando códigos de Trellis y detección mediante el algoritmo de Viterbi. Método etiquetado como *System 5* en el libro [Digital Watermarking and Steganography](https://www.elsevier.com/books/digital-watermarking-and-steganography/cox/978-0-12-372585-1)  de I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker.






<hr>
<br><br>


