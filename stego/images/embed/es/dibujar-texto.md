---
layout: page
title: Inserción de información en imágenes
subtitle: Dibjuar texto con colores similares
comments: true
image: stego/images/embed/img/bender.gif
hidden: false
---


Una técnica muy sencilla consiste en dibujar texto sobre la imagen usando un color similar al color del fondo. Si es suficientemente similar el ojo humano no lo percibirá. Esto resulta complicado en imágenes naturales, sin embargo en imágenes artificiales como la siguiente, funciona perfectamente. 

Aquí podemos ver la imagen original:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/bender.png"/>

Y aquí la imagen con información oculta:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/bender_stego.png"/>

No podemos percibir la diferencia, puesto que el texto oculto se ha dibujado usando un color con una diferencia de un solo píxel.

Sin embargo, está técnica no resulta difícil de detectar. Se puede hacer, por ejemplo, usando un filtro que resalte los bordes, ideal para nuestro caso, dado que queremos buscar cambios en el color. El siguiente código en Python aplica un filtro de paso alto mediante [convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)). 

Esta operación puede ser realizada usando [Aletheia](https://github.com/daniellerch/aletheia).

```bash
$ ./aletheia.py hpf bender_stego.png bender_stego_broken.png
```


A continuación podemos ver el resultado de aplicar el filtro:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/bender_stego_broken.png"/>




