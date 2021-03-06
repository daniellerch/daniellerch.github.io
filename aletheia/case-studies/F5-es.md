---
layout: page
title: Ataque de calibración a F5
subtitle: "" 
noindex: true
submenu: true
submenuitem1: "<a href='/aletheia/case-studies-es'>Índice</a> |"
submenuitem2: "Es |"
submenuitem3: "<a href='/aletheia/case-studies/F5-en'>En</a>"
---

[F5](https://dl.acm.org/citation.cfm?id=731875) es un algoritmo para esconder información en imágenes JPEG. A continuación, vamos a realizar un ataque de calibración a su implementación Java, una de las más habituales. Puedes encontrar una copia de esta herramienta [aquí](https://github.com/daniellerch/stego-collection/tree/master/F5).


### Preparación de una imagen *stego*

Para realizar el ataque descargaremos una imagen del repositorio de Waterloo. Concretamente la imagen "Lena". Y a continuación, la convertiremos a JPEG, que es el formato con el que trabaja F5. Dejaremos su calidad al 100%, dado que F5 ya reduce su calidad durante la incrustación del mensaje.


```bash
wget http://links.uwaterloo.ca/Repository/TIF/lena3.tif
convert lena3.tif -quality 100 lena3.jpg
```

Para empezar, generamos un archivo de datos aleatorios para ocultarlos en la imagen. Concretamente, un archivo de 10000 bytes.

``` bash
dd if=/dev/urandom of=secret.txt bs=1 count=10000
10000+0 registros leídos
10000+0 registros escritos
10000 bytes (10 kB, 9,8 KiB) copied, 0,0204649 s, 489 kB/s
```

A continuación, usaremos F5 para ocultar el mensaje, dejando la calidad a su valor por defecto: 80%.


```bash
$ java Embed -e secret.txt lena3.jpg lena3_f5.jpg 
```


### Tećnica de inserción

F5 oculta información modificando los coeficientes 
[DCT](https://en.wikipedia.org/wiki/Discrete_cosine_transform) de las imágenes 
JPEG. Además, usa técnicas de *matrix embeding*, que le permiten realizar una 
inserción eficiente. Sin embargo, F5 altera considerablemente las propiedades 
estadísticas de la imagen, alejándolas de una imagen normal comprimida con
JPEG. Esto permite recurrir a ataques de calibración, que consisten en 
modificar ligeramente la imagen y recomprimirla con JPEG. Esto nos permite 
obtener una imagen con las propiedades estadísticas básicas de una imagen
normal. Entonces, basta con comparar algunas de estas propiedades entre la 
imagen que estamos analizando y la imagen que hemos recomprimido, para ver
si son similares (imagen sin mensaje) o si son muy diferentes (imagen con
mensaje oculto).


## Detección

Aletheia, implementa un ataque de calibración dirigido a F5, que vamos a 
usar a continuación. Primero con la imagen original, para verificar que
no detectamos información oculta:


```bash
./aletheia.py calibration lena3.jpg 
No hidden data found in channel 0
No hidden data found in channel 1
No hidden data found in channel 2
```

Ahora repetimos el ataque contra la imagen en la que hemos insertado el
mensaje:

```bash
./aletheia.py calibration lena3_F5.jpg 
Hidden data found in channel 0: 0.4566624226525799
Hidden data found in channel 1: 0.42576556822396355
Hidden data found in channel 2: 0.4326128342180544
```


Vamos a repetir ahora el ataque ocultando un mensaje mucho más pequeño:

``` bash
dd if=/dev/urandom of=secret.txt bs=1 count=500
500+0 registros leídos
500+0 registros escritos
500 bytes copied, 0,00222342 s, 225 kB/s
```


``` bash
java Embed -e secret.txt lena3.jpg lena3_f5.jpg 
```

La detección ya empieza a ser complicada.

```bash
./aletheia.py calibration lena3_F5.jpg 
No hidden data found in channel 0
Hidden data found in channel 1: 0.052189924608884365
No hidden data found in channel 2

```












