---
layout: page
title: Estegoanálisis práctico
subtitle: Ataque ATS a steghide
comments: true
hidden: false
---



[OpenStego](https://www.openstego.com/) es una herramienta *open source* escrita en Java para ocultar información en imágenes de tipo *bitmap*. En el momento de escribir estas lineas la última versión dispoible es la v0.7.3.

Para el experimento hemous usado la imagen de [Lena](/stego/images/attacks/img/lena.png). 


Una vez instalado OpenStego, generamos un mensaje aleatorio y lo ocultamos en la imagen Lena. Loa hacemos (en Linux) de la forma siguiente:

```bash
$ head -500 /dev/urandom | tr -dc A-Za-z0-9 > secret.txt
$ openstego embed -mf secret.txt -cf lena.png -sf stego.png
```

Dado que OpenStego es una herramienta libre, podríamos descargar y analizar el código para ver como maneja la inserción de datos en la imagen. Sin embargo, en ocasiones puede resultar más rápido y sencillo comparar dos imágenes, una sin información oculta y otra con un mensaje oculto. Lo podemos hacer con la herramienta [Aletheia](https://github.com/daniellerch/aletheia), con la opción "print-diffs" que nos permite ver los píxels diferentes y qué cambios se han realizado.


```bash
$ ./aletheia.py print-diffs lena.png stego.png

Channel 1:
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)]
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...


Channel 2:                                                                                                                            
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)] 
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...

Channel 3:                                                                                                                            
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)]
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...
```


Existen dos técnicas principales para incrustar información en un mapa de bits: LSB *matching* y LSB *replacement*. La primera oculta información sumando o restando uno, mientras la segunda sustituye el bit menos significativo del píxel. La segunda es tremendamente insegura y puede ser explotada usando, entre otros, los ataques RS [[Fridrich2001](/stego/references)] y SPA [[Dumitrescu2003](/stego/references)].


Si nos fijamos bien en las diferencias que nos muestra Aletheia, vemos que los valores impares modificados siempre decrecen, mientras que los valores pares siempre crecen. Esto es una consecuencia de la sustitución del bit menos significativo. Veamos algunos ejemplos de valores pares que crecen:


```bash
$ ./aletheia.py print-diffs lena.png stego.png
(226, 227, 1)
(234, 235, 1)
(174, 175, 1)
(180, 181, 1)
```

Y algunos ejemplos de valores impares que decrecen:

```bash
(223, 222, -1)
(221, 220, -1)
(223, 222, -1)
(229, 228, -1)

```


Vamos ahora a probar el ataque RS a través de la herramienta Aletheia:


```bash
$ ./aletheia.py rs stego.png 
Hidden data found in channel R 0.25
Hidden data found in channel G 0.24
Hidden data found in channel B 0.27
```

Probamos ahora con un poco menos de datos escondidios:

```bash
$ head -100 /dev/urandom | tr -dc A-Za-z0-9 > secret.txt
$ openstego embed -mf secret.txt -cf lena.png -sf stego.png
$ ./aletheia.py rs stego.png 
Hidden data found in channel R 0.06
Hidden data found in channel G 0.06
Hidden data found in channel B 0.07
```

En ambos casos hemos podido detectar la esteganografía de OpenStego sin problemas.


Lógicamente, si usamos la imagen Lena origina, Aletheia no encuentra información oculta:

```bash
$ ./aletheia.py spa lena.png 
No hidden data found
```






