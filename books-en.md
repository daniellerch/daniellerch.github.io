---
layout: page
title: Books
subtitle: "" 
noindex: false
meta-title: "Books"
meta-description: "Books on steganography and steganalysis"
lang-suffix: "-en"
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


## Steganography for Python Programmers
<hr style='border:1px solid #ccc'>

<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1; padding-right: 20px;padding-top:30px;">
    <ol>
        <li><a href='/stego/books/stegopython/intro-en/'>Introduction</a></li>
        <li><a href='/stego/books/stegopython/embed-en/'>Embedding techniques</a></li>
        <li><a href='/stego/books/stegopython/audio-en/'>Steganography in audio</a></li>
        <li><a href='/stego/books/stegopython/bitmapimages-en/'>Steganography in lossless raster images</a></li>
        <li><a href='/stego/books/stegopython/jpegimages-en/'>Steganography in JPEG images</a></li>
        <li>Steganography in AI-generated images</li>
        <li><a href='/stego/books/stegopython/video-en/'>Steganography in video</a></li>
        <li><a href='/stego/books/stegopython/network-en/'>Steganography in network protocols</a></li>
        <li>Steganography in text</li>
        <li>Real-world application development</li>
        <li><a href='/stego/books/stegopython/references-en/'>References</a></li>
    </ol>
  </div>
  <div>
    <img src="/stego/books/stegopython/cover-stegopython.png" width="220">
  </div>
</div>


<!--
<br>
## Image Steganalysis with Aletheia
<hr style='border:1px solid #ccc'>




<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1; padding-right: 20px;padding-top:50px">
    <ol>
        <li><a href='/stego/books/aletheia/intro-en/'>Introduction</a></li>
        <li><a href='/stego/books/aletheia/basic-en/'>Steganalysis of basic techniques</a></li>
        <li><a href='/stego/books/aletheia/struct-en/'>Structural attacks</a></li>
        <li><a href='/stego/books/aletheia/calib-en/'>Calibration attacks</a></li>
        <li><a href='/stego/books/aletheia/ml-en/'>Steganalysis using machine learning</a></li>
        <li><a href='/stego/books/aletheia/extract-en/'>Message extraction</a></li>
        <li><a href='/stego/books/aletheia/proc-en/'>Analysis procedure</a></li>
        <li><a href='/stego/books/aletheia/cases-en/'>Case studies</a></li>
        <li><a href='/stego/books/aletheia/references-en/'>References</a></li>
    </ol>
  </div>
  <div>
    <img src="/stego/books/aletheia/cover-aletheia.png" width="220">
  </div>
</div>
-->



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

