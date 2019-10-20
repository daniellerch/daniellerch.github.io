---
layout: page
title: Estegoanálisis práctico
subtitle: Ataque a OpenPuff (mapas de bits)
comments: true
hidden: false
---


[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una herramienta propietaria para Windows que permite esconder información en archivos de diferentes formatos. Aunque en este caso nos ocuparemos de la inserción en imágenes de tipo *bitmap*. En el momento de escribir estas líneas la versión disponible es la v4.0.1.


La herramienta nos pregunta tres passwords diferentes, la imagen que queremos usar para ocultar la información (usaremos una imagen PNG) y el tamaño del *payload*. Para este último escogemos el mínimo, que es un 12%, con la intención de que el resultado sea el menos detectable que ofrece OpenPuff. Para el experimento hemous usado la imagen de [Lena](/stego/images/attacks/img/lena.png). 


Una vez guardada la imagen *stego* podemos proceder a su análisis. Dado que se trata de un algoritmo "secreto", necesitamos observar los cambios realizados en la imagen *stego* para saber cómo se oculta la información. En un escenario real, esto lo tendremos que hacer con una imagen propia, puesto que para la imagen que queremos estegoanalizar no disponemos de su versión original para comparar cambios.

Usaremos la herramienta [Aletheia](https://github.com/daniellerch/aletheia), con la opción "print-diffs" que nos permite ver los píxels diferentes y qué cambios se han realizado.


```bash
$ ./aletheia.py print-diffs lena.png stego.png

Channel 1:                                                                                                                            
[(226, 227, 1), (228, 229, 1), (223, 222, -1), (226, 227, 1)] 
[(229, 228, -1), (231, 230, -1), (235, 234, -1), (203, 202, -1)] 
[(170, 171, 1), (174, 175, 1), (175, 174, -1), (178, 179, 1)]
[(182, 183, 1), (194, 195, 1), (203, 202, -1), (197, 196, -1)]
...

Channel 2:
[(134, 135, 1), (127, 126, -1), (129, 128, -1), (130, 131, 1)]
[(150, 151, 1), (143, 142, -1), (145, 144, -1), (142, 143, 1)]
[(86, 87, 1), (65, 64, -1), (75, 74, -1), (78, 79, 1)]
[(92, 93, 1), (100, 101, 1), (103, 102, -1), (103, 102, -1)]
...

Channel 3:
[(133, 132, -1), (116, 117, 1), (119, 118, -1), (121, 120, -1)]
[(121, 120, -1), (98, 99, 1), (82, 83, 1), (90, 91, 1)]
[(87, 86, -1), (86, 87, 1), (92, 93, 1), (93, 92, -1)]
[(95, 94, -1), (93, 92, -1), (98, 99, 1), (93, 92, -1)]
...
```


Existen dos técnicas principales para incrustar información en un mapa de bits: LSB *matching* y LSB *replacement*. La primera oculta información sumando o restando uno, mientras la segunda sustituye el bit menos significativo del píxel. La segunda es tremendamente insegura y puede ser explotada usando, entre otros, los ataques RS [[Fridrich2001](/stego/references)] y SPA [[Dumitrescu2003](/stego/references)].


Si nos fijamos bien en las diferencias que nos muestra Aletheia, vemos que los valores impares modificados siempre decrecen, mientras que los valores pares siempre crecen. Esto es una consecuencia de la sustitución del bit menos significativo. Veamos algunos ejemplos de valores pares que crecen:


```bash
$ ./aletheia.py print-diffs lena.png stego.png
(226, 227, 1) 
(228, 229, 1)
(226, 227, 1)
(170, 171, 1)
```

Y algunos ejemplos de valores impares que decrecen:

```bash
(229, 228, -1)
(231, 230, -1)
(235, 234, -1)
(203, 202, -1)
```


Vamos ahora a probar el ataque SPA a través de la herramienta Aletheia:


```bash
$ ./aletheia.py spa stego.png 
Hidden data found in channel R 0.15
Hidden data found in channel G 0.15
Hidden data found in channel B 0.14
```
Vemos que detectamos un *payload* aproximado del 15%, cercano al 12% usado.



Lógicamente, si usamos la imagen Lena origina, Aletheia no encuentra información oculta:

```bash
$ ./aletheia.py spa lena.png 
No hidden data found
```



