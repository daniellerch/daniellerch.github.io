---
layout: page
title: Herramientas y librerías
subtitle: "" 
noindex: false
meta-title: "Herramientas"
meta-description: "Herramientas de esteganografía y estegoanálisis"
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
</style>


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#aletheia'>Aletheia</a> &nbsp;
| &nbsp; <a href='#hstego'>HStego</a> &nbsp;  
| &nbsp; <a href='#stego-retweet'>Stego Retweet</a> &nbsp; 
|| &nbsp; <a href='#python-jpeg-toolbox'>Python JPEG Toolbox</a> &nbsp;
| &nbsp; <a href='#python-syndrome-trellis-codes'>pySTC</a> &nbsp; ]
</center>

> Aquí puedes encontrar un listado de mis herramientas de esteganografía y estegoanálisis


<div style='margin-bottom:50px'></div>
## Herramientas
<hr style='border:1px solid #ccc'>


<div style='margin-bottom:50px'></div>
### Aletheia

**[Aletheia](https://github.com/daniellerch/aletheia)** es una herramienta libre de estegoanálisis para la detección de mensajes ocultos en imágenes. Para alcanzar sus objetivos, Aletheia usa técnicas de *machine learning* del estado del arte. Es capaz de detectar diferentes métodos de esteganografía, como por ejemplo F5, Steghide, métodos basdos en sustitución del LSB, LSB *matching* y métodos adaptativos.

**Artículos sobre estegoanálisis práctico con Aletheia:**
- [Introducción al estegoanálisis con Aletheia.](/stego/aletheia/intro-es/)
- [Cómo identificar el esquema de esteganografía.](/stego/aletheia/identify-es/)
- [Ataque práctico a Steghide.](/stego/aletheia/steghide-attack-es/)
- [Ataque práctico a F5.](/stego/aletheia/f5-attack-es/)
- [Ataque práctico a esquemas LSB replacement: OpenStego y OpenPuff.](/stego/aletheia/lsbr-attack-es/)
- [Resolución de stego-puzzles con Aletheia](/stego/aletheia/stego-puzzles-es/).
- [Comparativa de herramientas de esteganografía en imágenes.](/stego/aletheia/tool-comparison-es/)
- [Entrenamiento de modelos para Aletheia](/stego/aletheia/training-es/).


<div style='margin-top:40px'></div>



<div style='margin-bottom:80px'></div>
### HStego

**[HStego](https://github.com/daniellerch/hstego)** es una herramienta para ocultar información en imágenes de tipo mapa de bits y en imágenes JPEG. Esta herramienta usa algunos de los más avanzados métodos de esteganografía que se conocen, junto con un límite en la cantidad de datos que esconde, calculado para que no pueda ser detectada por herramientas modernas de estegoanálisis. 


<div style='margin-bottom:80px'></div>
### Stego Retweet


**[Stego Retweet](https://github.com/daniellerch/stego-retweet)** es una herramienta para esconder mensajes en Twitter mediante retweets. Usando una lista de *hashtags* proporcionada por el usuario, esta herramienta busca y realiza retweets de  tweets que contienen ciertas palabras especiales. De esta manera es capaz de transmitir un mensaje que podrá ser leído por un destinatario poseedor de una contraseña. La capacidad de este esquema es de dos caracteres por retweet. 



<div style='margin-bottom:50px;margin-top:80px'></div>
## Librerías
<hr style='border:1px solid #ccc'>



<div style='margin-bottom:50px'></div>
### Python JPEG Toolbox

**[Python JPEG Toolbox](https://github.com/daniellerch/python-jpeg-toolbox)** es una librería  similar al concodio JPEG toolbox de Matlab. Permite leer y escribir información de bajo nivel de archivos JPEG, como, por ejemplo, los coeficientes DCT, o las matrices de cuantización.


<div style='margin-bottom:80px'></div>
### Python Syndrome Trellis Codes

**[PySTC](https://github.com/daniellerch/pySTC)** es una interfaz en Python para los Códigos Síndrome-Trellis (STC), un método utilizado en la esteganografía para minimizar la distorsión en la inserción al ocultar información dentro de medios digitales. Los STC son códigos convolucionales lineales representados mediante una matriz de verificación de paridad, lo que permite una inserción eficiente mientras se preserva la calidad del medio portador.





