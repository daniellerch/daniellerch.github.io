---
layout: page
title: Ataques a herramientas de esteganografía en imágenes
subtitle: OpenPuff
comments: true
hidden: false
---


[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una herramienta propietaria para Windows que permite esconder información en archivos con diferentes formatos. Aunque en este caso nos ocuparemos de la inserción en imágenes. En el momento de escribir estas líneas la versión disponible es la v4.0.1.


La herramiento nos pregunta tres passwords diferentes, la imagen que queremos usar para ocultar la información (usaremos una imagen PNG) y el tamaño del *payload*. Para este último escogemos el mínimo, que es un 12%, con la intención de que el resultado sea el menos detectable que ofrece OpenPuff. Para el experimento hemous usado la imagen de [Lena](/stego/images/attacks/img/lena.png). 


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






With a simple experiment we can see that the method used for embedding is LSB replacement. That is, the tool hides the bits of the message by replacing the least significant bit (LSB) of the pixel. 

As you can see in the results, when a pixel of the cover image is even the performed operation is +1 and when a pixel of the cover image is odd the performed operation is -1. This is what happens when the embedding operation is LSB replacement. This anomaly has been exploited by several attacks [[1, 2, 3](/doc/REFERENCES.md)].

Let's try the SPA attack:

```bash
$ ./aletheia.py spa stego.png 
Hidden data found in channel R 0.15
Hidden data found in channel G 0.15
Hidden data found in channel B 0.14
```

Obviously, with the original Lena image, the tool does not detect any hidden data:

```bash
$ ./aletheia.py spa lena.png 
No hidden data found
```

