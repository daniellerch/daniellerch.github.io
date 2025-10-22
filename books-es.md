---
layout: page
title: Libros
subtitle: "" 
noindex: false
meta-title: "Blog"
meta-description: "Libros sobre esteganografía y estegoanálisis"
lang-suffix: "-es"
---

<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
    }
   .todo {
        display: none;
   }
</style>



<div style='margin-bottom:50px'></div>


## Esteganografía para programadores Python
<hr style='border:1px solid #ccc'>

<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1; padding-right: 20px;">
    <ol>
        <li><a href='/stego/books/stegopython/intro-es/'>Introducción</a></li>
        <li><a href='/stego/books/stegopython/embed-es/'>Técnicas de incrustación</a></li>
        <li><a href='Esteganografía en audio'>/stego/books/stegopython/audio-es/</a></li>
        <li><a href='Esteganografía en imágenes raster sin pérdida'>/stego/books/stegopython/bitmapimages-es/</a></li>
        <li><a href='Esteganografía en imágenes JPEG'>/stego/books/stegopython/jpegimages-es/</a></li>
        <li>Esteganografía en imágenes generadas con IA'</li>
        <li><a href='Esteganografía en vídeo'>/stego/books/stegopython/video-es/</a></li>
        <li><a href='Esteganografía en protocolos de red'>/stego/books/stegopython/networks-es/</a></li>
        <li><a href='Esteganografía en texto'>/stego/books/stegopython/text-es/</a></li>
        <li>Desarrollo de aplicaciones reales</li>
    </ol>
  </div>
  <div>
    <img src="/stego/books/stegopython/cover-stegopython.png" width="250">
  </div>
</div>


<br>
## Estegoanálisis de imágenes con Aletheia:
<hr style='border:1px solid #ccc'>
1. [Introducción](/stego/books/aletheia/intro-es/).
2. [Estegoanálisis de técnicas básicas](/stego/books/aletheia/basic-es/).
3. [Ataques estructurales](/stego/books/aletheia/struct-es/).
4. [Ataques de calibración](/stego/books/aletheia/calib-es/).
5. [Estegoanálisis usando machine learning](/stego/books/aletheia/ml-es/).
6. [Extracción del mensaje](/stego/books/aletheia/extract-es/).
7. [Procedimiento de análisis](/stego/books/aletheia/proc-es/).
8. [Casos de estudio](/stego/books/aletheia/cases-es/).



<hr>

<br><br>


<script>
var listItems = document.querySelectorAll('li');
listItems.forEach(function(item) {
    if (!item.querySelector('a')) {
        item.classList.add('todo_');
    }
});
</script>



