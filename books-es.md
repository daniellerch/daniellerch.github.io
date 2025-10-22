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

1. [Introducción](/stego/books/stegopython/intro-es/).
2. [Técnicas de incrustación](/stego/books/stegopython/embed-es/).
3. [Esteganografía en audio](/stego/books/stegopython/audio-es/).
4. [Esteganografía en imágenes raster sin pérdida](/stego/books/stegopython/bitmapimages-es/).
5. [Esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/).
6. Esteganografía en imágenes generadas con IA.
7. [Esteganografía en vídeo](/stego/books/stegopython/video-es/).
8. [Esteganografía en protocolos de red](/stego/books/stegopython/networks-es/).
9. [Esteganografía en texto](/stego/books/stegopython/text-es/).
10. Desarrollo de aplicaciones reales.

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



