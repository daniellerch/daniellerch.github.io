---
layout: page
title: "Resolución de stego-puzzles con Aletheia"
subtitle: "" 
noindex: false
meta-title: "Resolución de stego-puzzles con Aletheia"
meta-description: "Artículo acerca del usode la herramienta Aletheia para la resolución de stego-puzzles"
meta-keywords: "esteganografía, estegoanálisis, imágenes, stego-puzzles"
lang-suffix: "-es"
comments: true
---

<center style='margin-bottom:30px'>Aletheia <a href='https://github.com/daniellerch/aletheia/tree/v0.3'>v0.3</a></center>

> En este artículo vamos a ver cómo usar los comandos que ofrece 
> [Aletheia](https://github.com/daniellerch/aletheia) para la resolución de stego-puzzles.



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

## Contenido

1. [Introducción](#introduccion)
2. [Texto dibujado en imágenes](#texto-dibujado-en-imágenes)
3. [Información oculta en el canal alfa](#información-oculta-en-el-canal-alfa)
4. [Técnicas EOF](#técnicas-eof)
5. [Metadatos](#metadatos)
6. [Conclusión](#conclusión)


<br>
## Introducción

En este artículo, exploraremos una serie de métodos de esteganografía 
comúnmente utilizados en stego-puzzles y retos de hacking, y analizaremos 
cómo pueden ser detectados con la ayuda de la herramienta Aletheia.

Aunque los métodos empleados en este tipo de pruebas no son los más seguros o 
sofisticados, su popularidad radica en su simplicidad y el valor educativo que 
ofrecen a los participantes.


<br>
## Texto dibujado en imágenes

Esta forma de esteganografía se basa en la utilización de texto con colores 
similares a los de la imagen objetivo. Es decir, se selecciona un fragmento del 
texto que se desea ocultar y se dibuja con colores cuidadosamente escogidos 
para que se integren perfectamente con el contenido visual de la imagen. 
A simple vista, el archivo resultante parece ser simplemente una imagen común 
y corriente, pero en realidad, contiene información oculta en forma de texto.

Para ocultar el texto en la imagen es esencial elegir colores que se mezclen 
armoniosamente y que no llamen la atención, evitando contrastes bruscos que 
pudieran delatar la presencia del texto oculto. Este proceso puede realizarse
fácilmente con cualquier herramienta de edición gráfica.

Una vez que el texto ha sido camuflado en la imagen, el receptor de la 
información debe utilizar una herramienta o técnica específica para extraer 
el contenido oculto y revelar el mensaje original. 


Esta forma de esteganografía representa una interesante y creativa manera de 
ocultar información a simple vista y es bastante común en stego-puzzles o 
retos de hacking.


Veamos un ejemplo a continuación:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/bender_stego.png"/>

A simple vista no podemos percibir el mensaje oculto, puesto que el texto 
se ha dibujado usando un color con una diferencia de un solo píxel con el
color original.

Esta técnica no resulta difícil de detectar. Se puede hacer, por ejemplo, 
usando un filtro que resalte los bordes, ideal para nuestro caso, dado que 
queremos buscar cambios en el color. El siguiente código en Python aplica un 
filtro de paso alto mediante 
[convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)). 

Esta operación puede ser realizada usando el siguiente comando de Aletheia:

```bash
$ ./aletheia.py hpf bender_stego.png bender_stego_broken.png
```

A continuación podemos ver el resultado de aplicar el filtro:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/bender_stego_broken.png"/>




<br>
## Información oculta en el canal alfa

Una forma ingeniosa de esteganografía en imágenes consiste en la ocultación 
de datos en el canal alpha de una imagen. El canal alpha, también conocido como 
canal de transparencia, es un componente que se encuentra en las imágenes con 
soporte para transparencia, como los formatos PNG. Este canal almacena la 
información de opacidad o transparencia de cada píxel en la imagen. 
Normalmente, esta información se utiliza para definir qué partes de la imagen 
son visibles y cuáles son transparentes.

En las imágenes con canal alfa, normalmente se utilizan 4 bytes para cada uno de 
los píxeles. Los tres primeros bytes representan los valores de R, G y B, 
es decir, la cantidad de rojo, verde y azul que codifican el color del píxel. 
El cuarto byte se emplea para indicar el nivel de transparencia del píxel.
Así, un valor de 0 indicará que el píxel es totalmente transparente, mientras 
que un valor de 255 indicará que el píxel es opaco. Todos los valores 
intermedios nos permitirán ajustar el grado de transparencia del píxel.


La siguiente imagen de Homer tiene el fondo transparente.

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer.png"/>

Si leemos, usando Python, el píxel de la esquina superior izquierda, podemos 
ver cómo se estructura la información relativa al valor del píxel:


```python
from imageio import imread
I = misc.imread('homer.png')
print(I[0,0])
```

<br>
Que al ejecutarlo, nos da la siguiente salida:

```bash
[0, 0, 0, 0]
```

Cada píxel se representa en una lista de Python con cuatro valores (RGBA): 
cantidad de color rojo, cantidad de verde, cantidad de azul y nivel de 
transparencia, como hemos comentado anteriormente.

El valor cero del cuarto byte nos indica que el píxel es totalmente 
transparente, por lo que el valor de los tres bytes que especifican el color, 
se ignoran. Esto nos ofrece, pues, una forma sencilla de ocultar información. 
Podemos escribir lo que queramos en los primeros tres bytes de cada píxel, 
siempre que el cuarto esté a cero.

El siguiente código Python lee los datos que queremos ocultar de un fichero 
"secret_data.txt" y los esconde en la imagen "homer_stego.png". Cada byte 
de información se oculta en un píxel en el que la opacidad esté a cero. 
Solo se sobreescriben bytes "invisibles".


```python
from imageio import imread, imsave

f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]

I = imread('homer.png')

idx=0
for i in range(I.shape[0]):
    for j in range(I.shape[1]):
        for k in range(3):
            if idx<len(blist) and I[i][j][3]==0:
                I[i][j][k] = blist[idx]
                idx += 1

imsave('homer_stego.png', I)
```



<br>
Como resultado, obtenemos la siguiente imagen:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer_stego.png"/>

El mensaje queda oculto a la vista. Pero no es una técnica muy segura, puesto
que basta con eliminar el canal alfa para ver que algo extraño está ocurriendo.

Esta operación puede realizarse usando el siguiente comando de Aletheia:

```bash
$ ./aletheia.py rm-alpha homer_stego.png homer_stego.png
```


<br>
El resultado después de modificar la opacidad es el siguiente:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer_stego_broken.png"/>


Como podemos ver, el fondo de la imagen es negro. Pero existe una sección al 
principio en la que los píxeles tienen colores extraños. Esta sección 
corresponde a los datos que hemos ocultado. En este caso, un atacante solo
tendría que leerlos, aunque esta técnica podría haberse combinado con un 
cifrado para mantener la información segura.


<br>
## Técnicas EOF

Las técnicas de esteganografía basadas en EOF (End-of-File) son comúnmente 
empleadas para ocultar información en archivos digitales, como imágenes, audio 
o video. Estas técnicas aprovechan el campo conocido como "EOF" o "End-of-File", 
presente en muchos formatos, que señala el final del archivo.

Es habitual que los programas que usan estos formatos de archivo no lean más
allá del campo "EOF", puesto que se supone que ya no hay más datos. Esto 
permite escribir datos a continuación que, al no ser leídos por dicho software,
no alterarán su comportamiento.


Para extraer la información oculta, solo es necesario leer la información que
hay después del campo "EOF" y guardarla en un archivo.

Es importante destacar que aunque las técnicas EOF de Esteganografía son 
relativamente sencillas, también son poco seguras. Si alguien sospecha de la 
presencia de información oculta, solo tiene que mirar si hay información 
después del campo "EOF".


Uno de los formatos de fichero que permite ocultar información al final, sin 
que nada se rompa, es el GIF. Por lo que si concatenamos, por ejemplo, 
un fichero en formato ZIP al final de una imagen en formato GIF, todo 
continuara funcionando de la forma habitual. La mayoría de visores de imágenes 
nos mostrará la imagen GIF sin ningún problema.

En Linux/Mac podemos concatenar un fichero ZIP a un fichero GIF con el 
siguiente comando:


```bash
cat file.zip >> file.gif
```

Y en Windows:

```bash
copy /B file.gif+file.zip file.gif
```

Tomemos como ejemplo la siguiente imagen GIF de Groot:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/groot.gif"/>

Después de añadir un fichero ZIP al final obtenemos la siguiente imagen:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/groot_stego.gif"/>


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

Este método puede ser usado en diferentes formatos de ficheros (no tienen
necesariamente imágenes). Algunos ejemplos populares, además del
GIF, son los formatos de archivo PNG o JPEG, entre otros.


Si el archivo no es un ZIP como en este caso, el proceso de extracción puede
ser un poco más complicado. En este caso, y también como herramienta de 
estegoanálisis, disponemos de un comando en Aletheia:

```
./aletheia.py eof-extract groot_stego.gif data.out

Data extracted from groot_stego.gif to data.out (application/zip)

```

Como podemos ver, Aletheia no solo extrae la información, sino que nos
indica el tipo de archivo que se ha extraído. Esto nos permitirá identificar
rápidamente si se trata de un ZIP, una imagen, un audio, un vídeo, etc.

Aletheia puede extraer archivos de imágenes GIF, JPEG y PNG.


<br>
## Metadatos

Los metadatos son un conjunto de datos que describen y dan información sobre 
otros datos. En el contexto de las imágenes, los metadatos ofrecen información 
sobre la estructura, el origen y las características técnicas de una imagen, 
sin alterar la imagen en sí. Esto puede incluir detalles como la marca y el 
modelo de la cámara, la fecha y hora en que se tomó la fotografía, la 
ubicación geográfica, la resolución y la profundidad de color, entre otros. 

Estos datos auxiliares han encontrado múltiples aplicaciones en la organización, 
catalogación y análisis de imágenes. Sin embargo, también pueden ser usados para
ocultar información. Aunque en este aspecto, es necesario mencionar que no es 
un método muy seguro, puesto que cualquiera que consulte los metadatos verá
la información oculta.

Existen muchas formas de escribir información en los metadatos de la imagen.
Una forma sencilla consiste en usar la herramienta "exiftool":

```bash
exiftool -artist="Hello World" image.jpg
```

Podemos leer los metadatos usando la herramienta Aletheia con el siguiente
comando:

```bash
./aletheia.py print-metadata image.jpg
ResolutionUnit           : 1
YResolution              : (1, 1)
YCbCrPositioning         : 1
XResolution              : (1, 1)
Artist                   : Hello World
```




<br>
## Conclusión

La resolución de stego-puzzles abarca una gama fascinante de técnicas y 
métodos, como hemos explorado en este artículo. Utilizando Aletheia, hemos 
visto cómo se pueden detectar mensajes ocultos en imágenes mediante textos 
dibujados, información oculta en el canal alfa, usando técnicas EOF y 
ocultando datos como metadatos. 
A pesar de las limitaciones de seguridad de estas técnicas, su aplicación en 
retos de hacking y stego-puzzles ofrece una perspectiva valiosa y educativa 
en el campo de la esteganografía.






