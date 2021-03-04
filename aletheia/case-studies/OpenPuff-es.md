---
layout: page
title: Estegoanálisis de OpenPuff en mapas de bits
subtitle: "" 
noindex: true
submenu: true
submenuitem1: "<a href='/aletheia/case-studies-es'>Índice</a> |"
submenuitem2: "Es |"
submenuitem3: "<a href='/aletheia/case-studies/openpuff-en'>En</a>"
---

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una herramienta gratuita para esconder información en diferentes tipos de medios. A continuación, vamos a estegoanalizar esta herramienta en su  versión v4.0.1, cuando las imágenes en las que se esconde la información son mapas de bits.


<center><img src="/aletheia/resources/openpuff-1.png"/></center>

### Preparación de una imagen *stego*

Para realizar el análisis descargaremos una imagen del repositorio de Waterloo. Concretamente la imagen "Peppers". Y a continuación, la convertiremos a PNG, puesto que OpenPuff no soporta el formato TIFF.

```bash
wget http://links.uwaterloo.ca/Repository/TIF/peppers3.tif
convert peppers3.tif peppers3.png
```

La imagen es la siguiente:

<center><img src="/aletheia/resources/peppers3.png"/></center>


Ocultaremos un mensaje de unos 5000 bytes, que es lo máximo que nos permite guardar OpenPuff cuando usamos el *payload* mínimo y más seguro (12.5%). Generamos el mensaje con el siguiente comando:


```bash
dd if=/dev/urandom of=secret.txt bs=1 count=5000
5000+0 registros leídos
5000+0 registros escritos
5000 bytes (5,0 kB, 4,9 KiB) copied, 0,0106255 s, 471 kB/s

```


A continuación, usaremos OpenPuff para ocultar el mensaje. 


<center><img src="/aletheia/resources/openpuff-3.png"/></center>



### Analizando la técnica de inserción

Para saber qué ataques podemos realizar es necesario conocer que técnica de inserción de información usa el programa. OpenPuff usa *LSB replacement* por lo que podremos usar todas las técnicas que implementa Aletheia para atacar *LSB replacement*.

Podemos ver que, efectivamente, OpenPuff usa *LSB replacement* comparando una imagen original con una imagen con un mensaje oculto. Aletheia nos ofrece el comendo "print-diffs" que nos muestra las diferencias entre los píxeles. Con este comando podemos ver qué ocurre al ocultar un mensaje.



```bash
$ ./aletheia.py print-diffs peppers3.png peppers2_openpuff.png

Channel 1:

[(179, 178, -1), (176, 177, 1), (177, 176, -1), (169, 168, -1), ...]
[(179, 178, -1), (176, 177, 1), (173, 172, -1), (172, 173, 1), ...]
[(166, 167, 1), (138, 139, 1), (149, 148, -1), (181, 180, -1), ...]
[(187, 186, -1), (190, 191, 1), (189, 188, -1), (191, 190, -1), ...]
[(188, 189, 1), (186, 187, 1), (152, 153, 1), (144, 145, 1), ...]
[(201, 200, -1), (193, 192, -1), (192, 193, 1), (187, 186, -1), ...]
[(167, 166, -1), (179, 178, -1), (181, 180, -1), (181, 180, -1), ...]
[(189, 188, -1), (209, 208, -1), (94, 95, 1), (121, 120, -1), ...]
[(164, 165, 1), (188, 189, 1), (181, 180, -1), (159, 158, -1), ...]
[(132, 133, 1), (163, 162, -1), (169, 168, -1), (118, 119, 1), ...]
[(128, 129, 1), (164, 165, 1), (165, 164, -1), (162, 163, 1), ...]
[(169, 168, -1), (159, 158, -1), (183, 182, -1), (168, 169, 1), ...] 
[(113, 112, -1), (115, 114, -1), (113, 112, -1), (111, 110, -1), ...]
[(155, 154, -1), (157, 156, -1), (153, 152, -1), (152, 153, 1), ...]
...
```

Vemos que los píxeles suelen modificarse en una unidad. Por ejemplo, el valor el original del primer píxel modificado es 179, que se modifica pasando a ser 178, una operación de -1. El siguiente, es un píxel con valor 176 que pasa a ser 177, una operación de +1. El detalle importante en el que hay que fijarse es que las operaciones no son +1 o -1 indiscriminadamente (lo que nos indicaría que se trata de *LSB matching*), sino que los píxeles impares siempre se modifican con -1 y los pares con +1. Esto nos indica que se está usando *LSB replacement*, pues es es precisamente, el efecto de reemplazar el bit menos significativo de cada píxel.



## Detección

Puesto que sabemos que se está usando *LSB replacement*, podemos usar todas los ataques que implementa Aletheia para este tipo de esteganografía. Usaremos tres ataques: El ataque SPA (Sample Pairs Attack), El ataque WS (Weighted Stego) y el ataque TA (Triples Analysis), que son los más eficientes y que mejor funcionan. En todos los casos, como referencia, realizaremos primero un ataque sobre la imagen original, y después un ataque sobre la imagen con el mensaje oculto.



### El ataque SPA (Sample Pairs Attack)

Imagen original:
```bash
$ ./aletheia.py spa peppers.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py spa peppers_openpuff.png 
Hiden data found in channel R 0.1464232217001414
Hiden data found in channel G 0.15585640405139609
Hiden data found in channel B 0.11567700466149547
```

### El ataque WS (Weighted Stego)

Imagen original:
```bash
$ ./aletheia.py ws peppers.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py ws peppers_openpuff.png 
Hiden data found in channel R 0.13275428291180907
Hiden data found in channel G 0.13427208873412433
Hiden data found in channel B 0.11806703947840881
```

### El ataque TA (Triples Analysis)

Imagen original:
```bash
$ ./aletheia.py triples peppers.png 
No hidden data found
```

Imagen con  mensaje oculto.

```bash
$ ./aletheia.py triples peppers_openpuff.png 
Hiden data found in channel R 0.12669643244231743
Hiden data found in channel G 0.11352462091415255
Hiden data found in channel B 0.0546027642495332
```

Vemos que la cantidad de información que detectan las tres técnicas de estegoanálisis varia entre un 8% y un 15%. Aunque no está claro como gestiona estos aspectos OpenPuff, sabemos que la imagen original dispone de 512x512x3 píxeles y que OpenPuff solo nos ha permitido ocultar unos 5300 bytes. Sabemos que la imagen original dispone de 512x512x3 píxeles y que hemos ocultado 5000 bytes. Considerando un bit por pixel, estaríamos en alrededor de un 5%, que está bastante por debajo de lo que detectan las herramientas. Aunque puede ser que OpenPuff añada información adicional para corregir errores, seguimiento de versiones, etc. 





