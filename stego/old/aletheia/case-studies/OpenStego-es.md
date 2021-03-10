---
layout: page
title: Estegoanálisis de OpenStego en mapas de bits
subtitle: "" 
noindex: true
submenu: true
submenuitem1: "<a href='/aletheia/case-studies-es'>Índice</a> |"
submenuitem2: "Es |"
submenuitem3: "<a href='/aletheia/case-studies/openstego-en'>En</a>"
---


[OpenStego](https://www.openstego.com/) es una herramienta *open source* desarrollada en Java para ocultar mensajes en imágenes (esteganografía y *watermarking*). A continuación, vamos a estegoanalizar esta herramienta en su versión v0.8.0, cuando las imágenes en las que se esconde la información son mapas de bits.


<center><img src="/aletheia/resources/openstego-1.png"/></center>

### Preparación de una imagen *stego*

Para realizar el análisis descargaremos una imagen del repositorio de Waterloo. Concretamente la imagen "Monarch". Y a continuación, la convertiremos a PNG, puesto que OpenStego no soporta el formato TIFF.

```bash
wget http://links.uwaterloo.ca/Repository/TIF/monarch.tif
convert monarch.tif monarch.png
```

La imagen es la siguiente:

<center><img src="/aletheia/resources/monarch.png"/></center>


Ocultaremos un mensaje de 20000 bytes, que corresponde aproximadamente a un 14% de los píxels de la imagen. Generamos el mensaje con el siguiente comando:


```bash
dd if=/dev/urandom of=secret.txt bs=1 count=20000
20000+0 registros leídos
20000+0 registros escritos
20000 bytes (20 kB, 20 KiB) copied, 0,0451231 s, 443 kB/s
```

A continuación, usaremos OpenStego para ocultar el mensaje. 



### Analizando la técnica de inserción

Para saber qué ataques podemos realizar es necesario conocer que técnica de inserción de información usa el programa. OpenStego usa *LSB replacement* por lo que podremos usar todas las técnicas que implementa Aletheia para atacar *LSB replacement*.

Podemos ver que, efectivamente, OpenStego usa *LSB replacement* comparando una imagen original con una imagen con un mensaje oculto. Aletheia nos ofrece el comendo "print-diffs" que nos muestra las diferencias entre los píxeles. Con este comando podemos ver qué ocurre al ocultar un mensaje.



```bash
$ ./aletheia.py print-diffs monarch.png monarch_openstego.png

Channel 1:
[(98, 99, 1), (108, 109, 1), (155, 154, -1), (182, 183, 1), ...]
[(157, 156, -1), (134, 135, 1), (78, 79, 1), (74, 75, 1), ...]
[(88, 89, 1), (116, 117, 1), (121, 120, -1), (128, 129, 1), ...]
[(131, 130, -1), (111, 110, -1), (96, 97, 1), (99, 98, -1), ...]
[(128, 129, 1), (139, 138, -1), (145, 144, -1), (123, 122, -1), ...]
[(208, 209, 1), (149, 148, -1), (101, 100, -1), (77, 76, -1), ...]
[(104, 105, 1), (134, 135, 1), (128, 129, 1), (131, 130, -1), ...]
[(98, 99, 1), (98, 99, 1), (107, 106, -1), (138, 139, 1), ...]
[(217, 216, -1), (174, 175, 1), (151, 150, -1), (84, 85, 1), ...]

...
```

Vemos que los píxeles suelen modificarse en una unidad. Por ejemplo, el valor el original del primer píxel modificado es 98, que se modifica pasando a ser 99, una operación de 1. El tercero, es un píxel con valor 155 que pasa a ser 154, una operación de -1. El detalle importante en el que hay que fijarse es que las operaciones no son +1 o -1 indiscriminadamente (lo que nos indicaría que se trata de *LSB matching*), sino que los píxeles impares siempre se modifican con -1 y los pares con +1. Esto nos indica que se está usando *LSB replacement*, pues es es precisamente, el efecto de reemplazar el bit menos significativo de cada píxel.



## Detección

Puesto que sabemos que se está usando *LSB replacement*, podemos usar todas los ataques que implementa Aletheia para este tipo de esteganografía. Usaremos tres ataques: El ataque SPA (Sample Pairs Attack), El ataque WS (Weighted Stego) y el ataque TA (Triples Analysis), que son los más eficientes y que mejor funcionan. En todos los casos, como referencia, realizaremos primero un ataque sobre la imagen original, y después un ataque sobre la imagen con el mensaje oculto.



### El ataque SPA (Sample Pairs Attack)

Imagen original:
```bash
$ ./aletheia.py spa monarch.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py spa monarch_openstego.png 
Hiden data found in channel R 0.07493448209001959
Hiden data found in channel G 0.0676341653177243
Hiden data found in channel B 0.05826279404860022
```

### El ataque WS (Weighted Stego)

Imagen original:
```bash
$ ./aletheia.py ws monarch.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py ws monarch_openstego.png 
Hiden data found in channel R 0.07295581176434245
Hiden data found in channel G 0.07493768934615823
Hiden data found in channel B 0.06355771697762562
```

### El ataque TA (Triples Analysis)

Imagen original:
```bash
$ ./aletheia.py triples monarch.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py triples monarch_openstego.png 
Hiden data found in channel R 0.06708655275946951
Hiden data found in channel G 0.06567268941789678
Hiden data found in channel B 0.05540574214863747

```

Vemos que la cantidad de información que detectan las tres técnicas de estegoanálisis es similar. Sin embargo está un poco por debajo de la información que hemos ocultado (un 14%).





