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
        <li><a href='/stego/books/stegopython/audio-es/'>Esteganografía en audio</a></li>
        <li><a href='/stego/books/stegopython/bitmapimages-es/'>Esteganografía en imágenes raster sin pérdida</a></li>
        <li><a href='/stego/books/stegopython/jpegimages-es/'>Esteganografía en imágenes JPEG</a></li>
        <li>Esteganografía en imágenes generadas con IA</li>
        <li><a href='/stego/books/stegopython/video-es/'>Esteganografía en vídeo</a></li>
        <li><a href='/stego/books/stegopython/networks-es/'>Esteganografía en protocolos de red</a></li>
        <li><a href='/stego/books/stegopython/text-es/'>Esteganografía en texto</a></li>
        <li>Desarrollo de aplicaciones reales</li>
    </ol>
  </div>
  <div>
    <img src="/stego/books/stegopython/cover-stegopython.png" width="220">
  </div>
</div>


<br>
## Estegoanálisis de imágenes con Aletheia:
<hr style='border:1px solid #ccc'>




<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1; padding-right: 20px;">
    <ol>
        <li><a href='/stego/books/aletheia/intro-es/'>Introducción</a></li>
        <li><a href='/stego/books/aletheia/basic-es/'>Estegoanálisis de técnicas básicas</a></li>
        <li><a href='/stego/books/aletheia/struct-es/'>Ataques estructurales</a></li>
        <li><a href='/stego/books/aletheia/calib-es/'>Ataques de calibración</a></li>
        <li><a href='/stego/books/aletheia/ml-es/'>Estegoanálisis usando machine learning</a></li>
        <li><a href='/stego/books/aletheia/extract-es/'>Extracción del mensaje</a></li>
        <li><a href='/stego/books/aletheia/proc-es/'>Procedimiento de análisis</a></li>
        <li><a href='/stego/books/aletheia/cases-es/'>Casos de estudio</a></li>
    </ol>
  </div>
  <div>
    <img src="/stego/books/aletheia/cover-aletheia.png" width="220">
  </div>
</div>




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



