---
layout: page
title: Estegoanálisis basado en actores
subtitle: "" 
noindex: true
comments: false
meta-title: "Estegoanálisis basado en actores"
meta-description: "Artículo en el que se muestra cómo realizar estegoanálisis de imágenes basado en actores."
meta-keywords: "esteganografía, estegoanálisis, imágenes, CSM"
lang-suffix: "-es"
comments: true
---

> En este artículo vamos a ver cómo realizar estegoanálisis de 
> imágenes basado en actores. Usaremos la herramienta
> [Aletheia](https://github.com/daniellerch/aletheia).

<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

<span style='color:red'> Work in progress... </span>

1. [Motivación](#motivación)
2. [Preparación de datos](#preparación-de-datos)
3. [Estegoanálisis de actores](#Estegoanálisis-de-actores)
4. [Casos de estudio](#Casos de estudio)
   1. [Caso de estudio #1](#caso-de-estudio-1)
   2. [Caso de estudio #2](#caso-de-estudio-2)
   3. [Caso de estudio #3](#caso-de-estudio-3)
5. [Referencias](#referencias)

<br>
## Motivación

El estegoanálisis de imágenes ha sido tradicionalmente una actividad que se 
realiza de forma individual, es decir, analizando cada imagen por separado. 
Este enfoque tiene sentido en ciertos contextos, como cuando se necesita 
examinar una sola imagen en detalle o cuando se manejan imágenes que 
provienen de diferentes fuentes y carecen de una relación inherente entre 
ellas. En estos casos, el análisis uno a uno es apropiado.

Sin embargo, hay escenarios en los que este método puede no ser el más 
efectivo. Un enfoque alternativo que puede ofrecer una mejora significativa 
en la calidad del análisis es el estegoanálisis basado en actores, que implica 
examinar un conjunto de imágenes procedentes de un mismo origen o actor. 
La premisa subyacente de este enfoque es que las imágenes originadas por un 
único actor tienden a tener características comunes que pueden ser aprovechados 
para mejorar la precisión del estegoanálisis. Un ejemplo ilustrativo de esta
situación se da cuando las fotografías son capturadas usando un mismo 
dispositivo, lo que resulta en imágenes con propiedades estadísticas similares.

Adicionalmente, la fiabilidad de la detección mejora conforme se incrementa el 
número de imágenes sometidas a análisis. Esto se debe a que contar con una 
mayor cantidad de datos para evaluar fortalece la precisión del análisis 
en general.

El análisis grupal de imágenes ofrece posibilidades como la aplicación de 
técnicas de detección de inconsistencias de clasificación otécnicas DCI 
[[ 2 ](#referencias)] (Detection of Classifier Inconsistencies). 
Este enfoque permite examinar un conjunto de imágenes para determinar si la 
clasificación es consistente, permitiendo conocer la fiabilidad de los 
resultados. Este método es aplicable en el ámbito del estegoanálisis basado en 
machine learning, que es la forma habitual de realizar estegoanálisis actualmente.

En este contexto, uno de los problemas que suelen surgir es el del 
"Cover Source Mismatch" (CSM). Esta situación ocurre cuando las imágenes que se 
están analizando no comparten las mismas propiedades estadísticas que las 
imágenes utilizadas para entrenar el modelo clasificador. Esta falta de 
concordancia puede comprometer significativamente la eficacia del modelo, 
resultando en un deterioro del rendimiento en la detección de esteganografía.

De este modo, al adoptar un enfoque de estegoanálisis centrado en actores, 
buscamos cumplir con dos objetivos clave: en primer lugar, utilizar la 
información agregada de múltiples imágenes para optimizar la precisión del 
estegoanálisis; y en segundo lugar, abordar eficazmente el desafío del 
"Cover Source Mismatch" (CSM) a través de la detección de inconsistencias en 
el modelo clasificador.


<br>
## Preparación de datos

Para poder experimentar con entornos de actores necesitamos poder simular
de alguna manera estos escenarios. Para ello, Aletheia nos proporciona el 
comando "create-actors". En este apartado veremos cómo usarlo.

Si ejecutamos el comando sin parámetros, podemos ver que parámetros requiere:

```text
$ ./aletheia.py create-actors
./aletheia.py create-actors <cover-dir> <stego-dir> <output-dir> <#innocent> <#guilty> <min-max> <seed>

     cover-dir:    Directory containing cover images
     stego-dir:    Directory containing stego images
     output-dir:   Output directory where actors will be created
     #innocent     Number of innocent actors
     #guilty:      Number of guilty actors
     min-max:      Range of images for each actor
     seed:         Seed for reproducible results

```

Este comando usa un directorio que contiene imágenes cover "cover-dir)"
y un directorio que contiene imágenes stego "stego-dir" para crear actores 
inocentes y culpables. Usaremos los parámetros "#innocent" y "#guilty", 
para indicar el número de actores inocentes y el número de actores culpables 
(respectivamente) que queremos generar. En este punto, cabe destacar que
los actores culpables generados tendrán como mínimo una imagen stego, el resto
pueden ser cover (se elige aleatoriamente el número de cover y de stego). 
El parámetro "min-max" nos permite indicar el rango de imágenes que se usarán 
para cada actor. Por ejemplo, si seleccionamos como rango 10-50, cada actor 
que se genere tendrá entre 10 y 50 imagenes (un número seleccionado 
aleatoriamente). Finalmente "seed" nos permite seleccionar una semilla 
(un número) para inicializar el generador de números aleatorios. Esto nos 
permitirá poder repetir la misma selección de imágenes si en el futuro 
queremos volver a preparar el mismo experimento.

En los directorios "cover-dir" y "stego-dir" tenemos que proporcionar 
imágenes cover y imágenes stego. Por lo que tenemos que tenerlas preparadas
antes de ejecutar el comando "create-actors".

Veamos primero como preparar las imágenes cover y las imágenes stego, si no
disponemos de ellas. Para generar imágenes cover, solo tenemos que descargarlas.
Existen diferentes opciones, como por ejemplo la base de datos 
[Alaska2](https://www.kaggle.com/competitions/alaska2-image-steganalysis/data).
Para evitar fugas de información, conviene usar imágenes que no hayan sido 
usadas para entrenar los modelos de Aletheia. Para ello disponemos del
conjunto de imágenes 
[sample_images/alaska2jpg_tst](https://github.com/daniellerch/aletheia/tree/master/sample_images/alaska2jpg_tst).
Podemos usar estas imágenes como nuestro directorio "cover-dir".

Para crear las imágenes stego podemos usar cualquiera de los simuladores
que proporciona Aletheia. Para este ejemplo vamos a usar el simulador de 
"nsF5". Lo podemos hacer de la siguiente manera:

```bash
$ mkdir stego-images
$ /aletheia.py nsf5-color-sim sample_images/alaska2jpg_tst/ 0.10-0.50 stego-images/
```

De esta manera obtenemos imágenes stego a partir de las imágenes cover, i
incrustando mensajes de un tamaño seleccionado aletaroriamente entre 0.10 y 0.50.
Esto significa que el tamaño del mensaje será de entre un 10% y un 50% del 
total disponible para incrustar información.

Finalmente, ya podemos crear actores de prueba. Vamos a crear 10 actores
inocentes y 10 actores culpables. Cada uno de ellos tendrá entre 10 y 50
imágenes.

```bash
./aletheia.py create-actors sample_images/alaska2jpg_tst stego-images experiment-S0 10 10 10-50 0
```

Los datos generados tienen la siguiente estructura:

```bash
$ ls experiment-S0/
guilty  innocent
```

```bash
$ ls experiment-S0/innocent/
actor1  actor10  actor2  actor3  actor4  actor5  actor6  actor7  actor8  actor9
```

```bash
$ ls experiment-S0/guilty/
actor1       actor1.txt  actor3      actor4.txt  actor6      actor7.txt  actor9
actor10      actor2      actor3.txt  actor5      actor6.txt  actor8      actor9.txt
actor10.txt  actor2.txt  actor4      actor5.txt  actor7      actor8.txt
```

En el caso de los actores culpables, vemos que se ha generado un archivo de
texto con información adicional sobre el actor.

Por ejemplo, el actor 4 está formado por 12 imágenes, 7 de las cuales son
stego.

```text
$ cat experiment-S0/guilty/actor4.txt
1.jpg, 1
2.jpg, 1
3.jpg, 1
4.jpg, 1
5.jpg, 1
6.jpg, 0
7.jpg, 0
8.jpg, 0
9.jpg, 0
10.jpg, 1
11.jpg, 0
12.jpg, 1
```

Estos datos nos proporcionan un entorno para realizar pruebas con actores.


<br>
## Estegoanálisis de actores

Aletheia proporciona muchas herramientas para realizar estegoanálisis de 
imágenes. En el apartado siguiente vamos a ver diferentes casos de estudio,
en los que veremos como usar Aletheia en escenarios con actores. Algunas
de las herramientas que usaremos son las mismas que usamos para escenarios
no basados en actores, que ja se han visto en 
[otros artículos](/tools-es/) sobre estegoanálisis con Aletheia.

Adicionalmente, en este artículo nos centrearemos en el uso del comando "dci".

<span style='color:red'> XXX </span>

<br>
## Casos de estudio


<br>
### Caso de estudio #1


<br>
### Caso de estudio #2



<br>
### Caso de estudio #3



<br>
## Referencias


1. EfficientNet: Rethinking model scaling for convolutional neural networks. 
    Mingxing Tan and Quoc V Le. In International Conference on Machine Learning, 2019.

2. Detection of Classifier Inconsistencies in Image Steganalysis. Daniel Lerch-Hostalot,
   David Megías. July 2019. Proceedings of the ACM Workshop on Information Hiding and 
   Multimedia Security.



<br>



