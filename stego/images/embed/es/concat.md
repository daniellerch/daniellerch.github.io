---
layout: page
title: Inserción de información en imágenes
subtitle: Concatenar ficheros
comments: true
image: stego/images/embed/img/groot.gif
hidden: false
---

Algunos formatos de fichero permiten tener información concatenada al final sin que nada se rompa. Uno de esos formatos de fichero son las imágenes GIF. Por lo que si concatenamos, por ejemplo, un fichero en formato ZIP al final de un fichero en formato GIF, todo continuara funcionando de la forma habitual. Cualquier visor de imágenes nos mostrará la imagen GIF de la forma habitual.

En Linux/Mac podemos concatenar un fichero ZIP a un fichero GIF con el siguiente comando:


```bash
cat file.zip >> file.gif
```

Y en Windows:

```bash
copy /B file.gif+file.zip file.gif
```

Tomemos como ejemplo la siguiente imagen GIF de Groot:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/groot.gif"/>

Después de añadir un fichero ZIP al final obtenemos la siguiente imagen:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/groot_stego.gif"/>


Para extraer el fichero oculto basta con ejecutar el siguiente comando:

```bash
$ unzip groot_stego.gif
Archive:  groot_stego.gif
warning [groot_stego.gif]:  4099685 extra bytes at beginning or within zipfile
  (attempting to process anyway)
 extracting: hw.txt                  
$ cat hw.txt 
Hello World!
```

No podemos decir que sea una técnica demasiado segura. Simplemente usando el comando de extracción, veremos que hay información oculta. Quizás el mejor símil sea el de ocultar la caja fuerte detrás de un cuadro. Nadie sabrá que está ahí, a menos que mire, claro!

Este método puede ser usado en diferentes formatos, que pueden ser imágenes, o no. Algunos ejemplos comunes son los formatos de archivo PNG o JPEG, entre otros.




