---
layout: page
title: Comparativa de herramientas de esteganografía en imágenes
subtitle: "" 
noindex: false
comments: false
meta-title: "Comparativa de herramientas de esteganografía en imágenes"
meta-description: "Artículo en el que se comparan diferentes herramientas de esteganografía en imágenes para ver cuáles son más difíciles de detectar."
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
comments: true
---

> En este artículo vamos a ver una comparativa de herramientas de esteganografía
> en imágenes. Usaremos 
> [Aletheia](https://github.com/daniellerch/aletheia) para ver qué herramientas
> son más difíciles de detectar.

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

1. [Gráfica comparativa](#gráfica-comparativa)
2. [Descripción del experimento](#descripcción del experimento)
3. [Resultados en mapas de bits](#resultados-en-mapas-de-bits)
   1. [LSB replacement (OpenStego, OpenPuff)](#lsb-replacement-openstego-openpuff)
   2. [LSB matching](#lsb-matching)
   3. [SteganoGAN](#steganogan)
   4. [HStego](#hstego)
4. [Resultados en JPEG](#resultados-en-jpeg)
   1. [Outguess](#outguess)
   2. [F5](#F5)
   3. [Steghide](#steghide)
   4. [HStego](#hstego)

<br>
## Gráfica cómparativa

En este artículo comparamos diferentes métodos de esteganografía en imágenes
para ver cuáles son más difíciles de detectar. Separamos la comparativa en
imágenes de tipo mapa de bits y imágenes JPEG. Vemos, primero, las gráficas
comparativas.


<center><b>
Comparativa de esteganografía en imágenes de tipo mapa de bits (PNG, TIF, BMP, etc):
</b></center>

![efficiency](/stego/aletheia/resources/tool_comparison.png?style=centerme)


<center><b>
Comparativa de esteganografía en imágenes JPEG:
</b></center>

![efficiency](/stego/aletheia/resources/tool_comparison_jpeg.png?style=centerme)


<br>
## Descripción del experimento

Para dibujar las gráficas presentadas en el apartado anterior se han empleado
múltiples métodos de esteganografía usando la base de datos de imágenes
[Alaska 2](https://www.kaggle.com/c/alaska2-image-steganalysis). 
Esta base de datos es la que ha utilizado 
[Aletheia](https://github.com/daniellerch/aletheia) 
para entrenar sus modelos. 

Las imágenes usadas en el experimento proceden del conjunto de test utilizado
por Aletheia, es decir, que las imágenes no han sido utilizadas ni para el
entrenamiento de los modelos ni para su validación.

Para cada uno de los métodos se han usado 500 imágenes *cover* (sin ningún
mensaje oculto) y 500 imágenes *stego* (con información oculta, conforme al
*payload* indicado en la gráfica).

Aquí, tentendemos por *payload* el tamaño del mensaje respecto al total 
disponible para ocultar incrustando un solo bit por elemento. Por ejemplo,
en mapas de bits, un payload de 0.4 nos indicaría que el tamaño del mensaje
(en bits) es del 40% del total de píxeles. En imágenes JPEG nos indicaría que
el tamaño del mensaje es del 40% del total de coeficientes DCT que no son cero.


<br>
## Resultados en mapas de bits

### LSB replacement (OpenStego, OpenPuff)

La técnica de inserción de datos 
[LSB *replacement*](/stego/lab/intro/lsb-es/#incrustación-de-la-información-con-lsb-replacement)
es, sin duda, la técnica más popular para incrustar datos en imágenes y audio.
Esta técnica es utilizada por las muchas herramientas de esteganografía
en imágenes, algunas muy populares, como [OpenStego](https://www.openstego.com/) 
u [OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html).

En la gráfica podemos ver dos líneas para esta técnica. Una de ellas, etiquetada
como "SPA", indica los resultados de realizar un ataque SPA o Sample Pair
Analysis. La otra usa un modelo de *deep learning*. Cabe destacar que la
técnica LSB replacement introduce [anomalías estadísticas que la hacen
especialmente vulnerable](/stego/lab/intro/lsb-es/#los-peligros-del-lsb-replacement),
usando los conocidos como "métodos estructurales". Uno de estos métodos es el
ataque SPA. Si bien los resultados que vemos en la gráfica para el caso SPA
no son de los peores, es importante tener en cuenta que los métodos estructurales
solo necesitan la imagen que se está analizando, a diferencia de los métodos
basados en *deep learning* que necesitan ser entrenados con una base de datos
de imágenes. Por ello, los métodos basados en *deep learning* tienen un gran
inconveniente: el problema del CSM. Este problema introduce importantes 
dificultades en el estegoanálisis, por lo que disponer de un método que no
tiene este problema (como ocurre con SPA) facilita mucho la tarea.

Las dos líneas de la gráfica dedicadas al LSB replacement nos permiten ver que 
no es una buena técnica de ocultación de información. Dado que esta técnica es 
susceptible de ser atacada con métodos estructurales como SPA, la hace 
**poco recomendable**. Pero además, podemos ver que al atacarla mediante 
*deep learning* es una de las técnicas más fáciles de detectar, únicamente 
superada por SteganoGAN.


### LSB matching

La técnica de inserción de datos 
[LSB *matching*](/stego/lab/intro/lsb-es/#incrustación-de-la-información-con-lsb-matching)
es muy similar al LSB *replacement*. La única diferencia es que, en lugar
de sustituir el bit menos significativo, cambiamos su valor sumando uno 
o restando uno al valor del byte. De esta manera, conseguimos el mismo 
resultado sin introducir la anomalía estadística que lleva a LSB *replacement*
a ser vulnerable a los métodos estructurales.

Sin embargo, es sorprendente ver lo poco que se usa esta técnica en herramientas
de esteganografía, que suelen decantarse hacia la vulnerable LSB *replacement*. 

En la gráfica podemos ver como esta técnica, aún y no ser de las mejores,
puede resultar competitiva con *payloads* bajos.


### SteganoGAN

La herramienta [SteganoGAN](https://github.com/DAI-Lab/SteganoGAN)
crea imágenes esteganográficas usando *adversarial training*.

Tal y como se puede ver en la gráfica, este es el método más fácil de 
detectar de todos los analizados. Destaca el hecho de que puede ser detectado
independientemente del payload. 

Sin embargo, esto no puede ser tomado como que es el método menos seguro. 
Lo que ocurre con las imágenes generadas por una red GAN 
(Generative Adversarial Network) es que tienen
unas propiedades estadísticas diferentes a las de una imagen normal, por lo
que resulta sencillo diferenciarlas. Es por ello, que el tamaño del mensaje
oculto no afecta a la detectabilidad, pues basta con que sea una imagen
generada por SteganoGAN, para que la podamos detectar. Actualmente, esto
puede servir para detectar esta herramienta. Sin embargo, es de esperar que
el número de imágenes generadas por redes GAN vaya creciendo hasta convertirse
en algo habitual, lo que nos llevará a un escenario en el que no bastará
con detectar que una imagen ha sido generada por una determinada GAN. 
Tendremos que diferenciar entre imágenes generadas por una GAN con mensaje 
oculto y imágenes generadas por una GAN sin mensaje oculto. Por el momento, 
no hay mucha investigación al respecto.

A pesar de ello y debido a las circunstancias señaladas, actualmente no se 
recomienda el uso de SteganoGAN.


### HStego

HStego es una herramienta para ocultar datos en imágenes de mapa de bits y 
JPEG. Esta herramienta utiliza algunos de los métodos de esteganografía más 
avanzados conocidos en la actualidad, junto con un límite superior en la 
cantidad de datos que se pueden ocultar para que las herramientas de 
esteganografía modernas no puedan detectarlos de manera confiable.

Sin embargo, en este análisis no se ha usado el límite en la cantidad de
información para poder comparar HStego con las otras herramientas, a medida
que varía el *payload*.

En la gráfica se presentan dos versiones diferentes de HStego, la 0.3 y la
0.4. La versión 0.4 introduce diferentes mejoras que la hacen más difícil de
detectar.



<br>
## Resultados en JPEG

### Outguess

[Outguess](https://en.wikipedia.org/wiki/OutGuess) es el método de 
esteganografía más fácil de detectar de todos los analizados para JPEG.
En su momento fue un método de esteganografía que aportaba ciertas
innovaciones. Sin embargo, no podemos olvidar que se trata de un método
muy antiguo.


### F5
[F5](https://github.com/daniellerch/stego-collection/tree/master/F5) es un 
método de esteganografía muy popular, que ha dado lugar a una variación
avanzada conocida com [nsF5](https://dde.binghamton.edu/download/nsf5simulator/), 
mucho más difícil de detectar, aunque no implementada en ninguna herramienta pública.

Como se puede ver en la gráfica, es una herramienta de puede ser detectada
de forma bastante fiable con técnicas de estegoanálisis actuales.

### Steghide

[Steghide](https://steghide.sourceforge.net/) es un método de esteganografía
muy popular, quizás el más popular para imágenes JPEG. 

Ha resistido bastante bien con los años, aunque actualmente puede ser
detectado con bastante fiabilidad. Sin embargo, como se puede ver en la
gráfica, ofrece resultados mucho mejores que los de F5 y Outguess.


### HStego

Como ya se ha mencionado en la sección de mapas de bits, HStego es una 
herramienta para ocultar datos en imágenes de mapa de bits y 
JPEG. Esta herramienta utiliza algunos de los métodos de esteganografía más 
avanzados conocidos en la actualidad, junto con un límite superior en la 
cantidad de datos que se pueden ocultar para que las herramientas de 
esteganografía modernas no puedan detectarlos de manera confiable.

En este análisis no se ha usado el límite en la cantidad de
información para poder comparar HStego con las otras herramientas, a medida
que varía el *payload*.

En la gráfica se presentan dos versiones diferentes de HStego, la 0.3 y la
0.4. La versión 0.4 introduce diferentes mejoras que la hacen más difícil de
detectar.






