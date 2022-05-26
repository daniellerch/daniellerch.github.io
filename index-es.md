---
layout: page
title: Bienvenido
subtitle: "" 
noindex: false
meta-title: "Página persona del Daniel Lerch"
meta-description: "Esteganografía y estegoanálisis en imágenes"
lang-suffix: "-es"
---

Hola, bienvenido a mi página. Mi nombre es Daniel Lerch y esta es mi página personal dedicada a la **esteganografía**, la ciencia y el antiguo arte de las comunicaciones ocultas.

<style>
#seconds{
    position:absolute;
    bottom:5px;
    left:400px;
    color:#aaa;
    text-align:center;
}
#left{
    position:absolute;
    bottom:5px;
    left:50px;
    color:#aaa;
    text-align:left;
    opacity:0;
}
#right{
    position:absolute;
    bottom:5px;
    right:50px;
    color:#aaa;
    text-align:right;
    opacity:0;
}
#bar{
    position:absolute;
    bottom:15px;
    left:50px;
    width:710px;
    border-top:1px solid #ddd;
    opacity:0;
}
#left_link{
    color: inherit;
    text-decoration: none;
}
#right_link{
    color: inherit;
    text-decoration: none;
}
.cites:hover{
    background-color:#eee;
}
</style>


<div style='height:300px' class='cites'>

<blockquote id='slide-0' style='opacity:1;position:absolute;top:120px;margin:10px'>
"Dos cómplices de un crimen han sido detenidos y están a punto de ser encerrados en celdas muy separadas. Su único medio de comunicación después de que estén encerrados será a través de los mensajes que les transmitan los guardias. (...). Los presos, (...) están dispuestos a aceptar estas condiciones (...) para poder comunicarse, ya que necesitan coordinar sus planes. Para ello tendrán que engañar a los guardias encontrando una forma de comunicarse en secreto (…)"

<div style='text-align:right;position:relative;top:10px;font-size:16px;margin:10px'>
El Problema del Prisionero y el Canal Subliminar<br>Gustavus J. Simmons (1983)
</div>
</blockquote>


<blockquote id='slide-1' style='opacity:0;position:absolute;top:120px;margin:10px'>
"[...] I have uncovered certain ways, both numerous and varied, that are not to be entirely spurned whereby I can intimate my most secret thoughts to another who knows this art, however far away I wish, securely and free from the deceit, suspicion, or detection by anyone, using writing or openly through messengers."

<div style='text-align:right;position:relative;top:10px;font-size:16px;margin:10px'>
Steganographia<br>Johanes Trithemius (1462 - 1516)
</div>
</blockquote>


<blockquote id='slide-2' style='opacity:0;position:absolute;top:120px;margin:10px'>
Histiaeus of Miletus shaved the head of a slave and tattooed a message onto the man's head. After the slave's hair grew back, Histiaeus sent him to the Greeks, who shaved the slave's head and read the secret message.

<div style='text-align:right;position:relative;top:10px;font-size:16px;margin:10px'>
Histories<br>Herodotus (430 B.C.)
</div>
</blockquote>

<hr id='bar'>
<div id='left'><a id='left_link' href='#'>&#9664;</a></div>
<div id='seconds'></div>
<div id='right'><a id='right_link' href='#'>&#9654;</a></div>
</div>


<script>


function transition(i, j) {
    var slide_i = document.getElementById('slide-'+i);
    var slide_j = document.getElementById('slide-'+j);

    var fadeout = setInterval(function () {
        if (slide_i.style.opacity > 0) {
            slide_i.style.opacity = parseFloat(slide_i.style.opacity) - 0.1;
        } else {
            clearInterval(fadeout);
        }
    }, 50);

    var fadein = setInterval(function () {
        if (slide_i.style.opacity <= 0) {
            if (slide_j.style.opacity < 1) {
                slide_j.style.opacity = parseFloat(slide_j.style.opacity) + 0.1;
            } else {
                clearInterval(fadein);
            }
        }
    }, 50);
}

document.addEventListener("DOMContentLoaded", function(event){

    var num_slides = 3;
    var duration = 5;

    var i = 0;
    var j = i+1;
    var t = duration+1;
    var locked = false;

    var bar = document.getElementById('bar');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var left_link = document.getElementById('left_link');
    var right_link = document.getElementById('right_link');
    var cites = document.querySelector(".cites");

    cites.addEventListener("mouseover", function(){
        locked = true;
        bar.style.opacity=1;
        left.style.opacity=1;
        right.style.opacity=1;
    }, false);

    cites.addEventListener("mouseout", function(){
        locked = false;
        bar.style.opacity=0;
        left.style.opacity=0;
        right.style.opacity=0;
    }, false);

    left_link.addEventListener("click", function(){
        t = duration+1;
        j = (i-1+num_slides)%num_slides;
        transition(i, j);
        i = j
        j = (j+1)%num_slides;
    }, false);

    right_link.addEventListener("click", function(){
        t = duration+1;
        transition(i, j);
        i = (i+1)%num_slides;
        j = (j+1)%num_slides;
    }, false);

    setInterval(function(){
        if(locked)
            return;

        t--;
        if(t<=0){
            transition(i, j);
            t = duration;
            i = (i+1)%num_slides;
            j = (j+1)%num_slides;
        }

        var div = document.getElementById('seconds');
        div.innerHTML = t;

    }, 1000);


});
</script>



