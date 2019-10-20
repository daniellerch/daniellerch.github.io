---
layout: page
title: Estegoanálisis práctico
subtitle: Ataque ATS a steghide
comments: true
hidden: false
---


[StegHide](http://steghide.sourceforge.net) es una herramienta *open source* que permite esconder información en archivos de diferentes formatos. Aunque en este caso nos ocuparemos de la inserción en imágenes JPEG. En el momento de escribir estas líneas la versión disponible es la v0.5.1


No es sencillo detectar StegHide en casos reales. Normalmente, es necesario recurrir a técnicas basadas en *machine learning* lo que introduce un problema adicional que dificulta mucho la detección: El CSM o *cover source mismatch*. Para usar *machine learning* tenemos que entrenar un modelo para que aprenda a diferenciar entre imágenes *cover* y *stego*. El CSM es el problema que surge cuando las imágenes que se usan para entrenar son muy diferentes de las que se quiere analizar. 

El problema del CSM es un problema sin resolver en estegoanálisis, aunque hay algunas técnicas que permiten lidiar con el en ciertas circunstancias. Una de ellas es el ataque ATS [Lerch2016], que vamos a usar aquí. 

Este ataque requiere disponer de varias imágenes del estegoanalista. Usa estas imágenes para generar una base de datos de entrenamiento, por lo que si hay suficientes imágenes y son del mismo tipo (misma cámara, similares filtros aplicados, etc), la base de datos artificial generada no va a tener CSM.






```bash
$ head -100 /dev/urandom | tr -dc A-Za-z0-9 > secret.txt
$ cp sample_images/lena.jpg sample_images/lena_steghide.jpg
$ steghide embed -cf sample_images/lena_steghide.jpg -ef secret.txt -p mypass
```







