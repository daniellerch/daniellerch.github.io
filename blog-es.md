---
layout: page
title: Blog
subtitle: "" 
noindex: false
meta-title: "Blog"
meta-description: "Artículos sobre esteganografía y estegoanálisis"
lang-suffix: "-es"
---

<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: todo;
    }
   .todo {
        display: none;
   }
</style>


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#esteganografía'>Esteganografía</a> &nbsp;
| &nbsp; <a href='#estegoanálisis'>Estegoanálisis</a> &nbsp; ]
</center>


<div style='margin-bottom:50px'></div>


## Esteganografía
<hr style='border:1px solid #ccc'>

### Introducción:
- [Preguntas frecuentes sobre esteganografía](/stego/intro/faq-es/).
- [Herramientas de esteganografía](/stego/intro/tools-es/).
- [Comparativa de herramientas de esteganografía en imágenes](/stego/aletheia/tool-comparison-es/).
- [Esteganografía en texto con ChatGPT](/stego/text/chatgpt-es/).
- [Esteganografía LSB en imágenes y audio](/stego/intro/lsb-es/).
- Esteganografía F5.
- Esteganografía Steghide.
- Esteganografía LSB en vídeo.
- Esteganografía LSB en MP3.
- Esteganografía en texto.
- Esteganografía robusta.
- Esteganografía reversible.

<h3 class='todo'>Historia:</h3>
- Orígenes de la esteganografía.
- Tritemio y la Steganographia.
- Esteganografía en la primera guerra mundial.
- Esteganografía en la segunda guerra mundial.
- Esteganografía en la guerra fría.


<!-- ### HStego: -->
<!-- - [Introducción a HStego](/stego/hstego/intro-es).
<!-- - [HStego como módulo Python](/stego/hstego/python-module-es). -->
<!-- - [Detalles técnicos de HStego I: mapas de bits](/stego/hstego/technical-details-I-es). -->
<!-- - [Detalles técnicos de HStego II: JPEG](/stego/hstego/technical-details-II-es). -->
<!-- - [Detalles técnicos de HStego III: Incrustación](/stego/hstego/technical-details-III-es). -->
      

<h3 class='todo'>Esteganografía en redes sociales:</h3>
- Esteganografía mediante interacciones: likes, retweets, etc.
 

### Codificación del mensaje:
- [Códigos de Hamming binarios en esteganografía](/stego/codes/binary-hamming-es/).
- [Códigos de Hamming ternarios en esteganografía](/stego/codes/ternary-hamming-es/).


<h3 class='todo'>Funciones de coste:</h3>
- Funciones de coste para imágenes bitmap.
- Funciones de coste para imágenes JPEG.
- Polarización de costes.


<br>
## Estegoanálisis
<hr style='border:1px solid #ccc'>

### Estegoanálisis práctico con Aletheia:
- [Introducción al estegoanálisis con Aletheia](/stego/aletheia/intro-es/).
- [Cómo identificar el esquema de esteganografía](/stego/aletheia/identify-es/).
- [Ataque práctico a Steghide](/stego/aletheia/steghide-attack-es/).
- [Ataque práctico a F5](/stego/aletheia/f5-attack-es/).
- [Ataque práctico a esquemas LSB replacement: OpenStego y OpenPuff](/stego/aletheia/lsbr-attack-es/).
- [Resolución de stego-puzzles con Aletheia](/stego/aletheia/stego-puzzles-es/).
- Comparación de funciones de coste para esteganografía en imágenes.

<h3 class='todo'>Ataques teóricos:</h3>
- Ataques de calibración a imágenes JPEG.
- Ataques estructurales a LSB replacement.
- JPEG Compatibility Attacks (JCA).



<hr>

<br><br>


<script>
var listItems = document.querySelectorAll('li');
listItems.forEach(function(item) {
    if (!item.querySelector('a')) {
        item.classList.add('todo');
    }
});
</script>



