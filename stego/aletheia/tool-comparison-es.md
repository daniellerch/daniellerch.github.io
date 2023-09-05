---
layout: page
title: Comparativa de herramientas de esteganografía en imágenes
subtitle: "" 
noindex: false
comments: false
meta-title: "Comparativa de herramientas de esteganografía en imágenes"
meta-description: "Artículo en el que se comparan diferentes herramientas de esteganografía en imágeens para ver cuáles son más difíciles de detectar."
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
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
   4. [S-UNIWARD](#s-uniward)
   5. [HILL (HStego)](#hill-hstego)
4. [Resultados en JPEG](#resultados-en-jpeg)
   1. [Outguess](#outguess)
   2. [Steghide](#steghide)
   3. [nsF5](#nsF5)
   4. [J-MiPOD](#j-mipod)
   5. [J-UNIWARD (HStego)](#j-uniward-hstego)

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

Las dos líneas de la gráfica dedicadas al LSB *replacement* nos permiten ver
que no es la mejor técnica analizada. Esto, junto al hecho de que estas 
técnicas son susceptibles de ser atacas con métodos estructurales como SPA,
hacen que esta técnica de incrustación sea **la menos recomendable** de las
analizadas.



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
con detectar que una imagen generada por una GAN. Tendremos que diferenciar
entre imágenes generadas por una GAN con mensaje oculto y imágenes generadas
por una GAN sin mensaje oculto. Por el momento, no hay mucha investigación
al respecto.

Aún y así, actualmente no recomendaría el uso de SteganoGAN.



### S-UNIWARD

[S-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) es, junto con HILL, 
uno de los mejores de la lista. En realidad,
no se trata de una herramienta de esteganografía, sino de una función de
coste que indica en que posiciones de la imagen se tiene que ocultar la 
información. Por el momento, no parece haberse usado en ninguna herramienta
pública de esteganografía.

### HILL (HStego)

[HILL](https://doi.org/10.1109/ICIP.2014.7025854) es, junto con S-UNIWARD, 
uno de los mejores de la lista. En realidad,
no se trata de una herramienta de esteganografía, sino de una función de
coste que indica en que posiciones de la imagen se tiene que ocultar la 
información. Esta función de coste está implementada en la herramienta
de esteganografía [HStego](https://github.com/daniellerch/hstego).




<br>
## Resultados en JPEG

### Outguess

[Outguess](https://en.wikipedia.org/wiki/OutGuess) es el método de 
esteganografía más fácil de detectar de todos los analizados para JPEG.
En su momento fue un método de esteganografía que aportaba ciertas
innovaciones. Sin embargo, no podemos olvidar que se trata de un método
muy antiguo.

### Steghide

[Steghide](https://steghide.sourceforge.net/) es un método de esteganografía
muy popular, quizás el más popular para imágenes JPEG. Ha resistido bastante
bien con los años, pero actualmente existen métodos mucho mejores.

Como se puede ver en la gráfica, mejora considerablemente los resultados 
de Outguess, aunque está bastante alejado de nsF5 y J-UNIWARD.


### nsF5

[nsF5](https://dde.binghamton.edu/download/nsf5simulator/) es la versión
mejorada del conocido método de esteganografía [F5](https://www.semanticscholar.org/paper/F-5-%E2%80%94-A-Steganographic-Algorithm-High-Capacity-Westfeld/149b41d7560d7bd628da502bd3d8122a8317d472).

Tal y como se puede ver en la gráfica, nsF5 ofrece buenos resultados,
principalmente para tamaños de *payload* bajos.


### J-MiPOD

[J-MiPOD](https://doi.org/10.24433/CO.2423893.v4) es, junto con nsF5 y 
J-UNIWARD,  uno de los mejores de los analizados. Supera a nsF5 con tamaños de
*payload* grandes, aunque para tamaños de *payload* pequeños nsF5 lo supera
ligeramente. Además, ofrece resultados inferiores a J-UNIWARD en todos los casos.


### J-UNIWARD (HStego)

[J-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) es, junto con nsF5, 
el mejor de los analizados. Supera holgadamente a nsF5 con tamaños de
*payload* grandes, aunque para tamaños de *payload* pequeños nsF5 lo supera
ligeramente.

En realidad, no se trata de una herramienta de esteganografía, sino de 
una función de coste que indica en que posiciones de la imagen se tiene 
que ocultar la información. Esta función de coste está implementada en 
la herramienta de esteganografía [HStego](https://github.com/daniellerch/hstego).


