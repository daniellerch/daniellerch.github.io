---
layout: page
title: "Syndrome Trellis Codes en Esteganografía"
subtitle: "" 
noindex: false
meta-title: "Syndrome Trellis Codes en Esteganografía"
meta-description: "Técnica de incrustación de información de tipo matrix embedding basada en códigos de rejilla."
lang-suffix: "-es"
---



> A continuación se presenta una técnica de incrustación de información de 
> tipo *matrix embedding* basada en códigos de rejilla.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/blob/master/codes/STC.py'>
        Código en GitHub
      </a> ]
</div>





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



1. [Introducción](#introducción)
2. [STC: introducción](#stc-introducción)
3. [STC: la matriz H](#stc-la-matriz-h)
4. [STC: búsqueda de soluciones](#stc-búsqueda-de-soluciones)
5. [Eficiencia y distorsión](#eficiencia-y-distorsión)
6. [Ejemplo en Python](#ejemplo-en-python)
7. [Codificación del mensaje](#codificación-del-mensaje)
8. [Implementación completa en Python](#implementación-completa-en-python)
9. [Referencias](#referencias)


<br>
## Introducción

En el artículos previos, como el de 
[Códigos de Hamming binarios en esteganografía](/stego/lab/codes/binary-hamming-es) 
o el de
[Códigos de Hamming ternarios en esteganografía](/stego/lab/codes/ternary-hamming-es),
hemos visto como incrementar la eficiencia de la inserción de datos ocultos
mediante técnicas de *matrix embedding*. Estas técnicas, si bien nos permiten
incrementar la eficiencia, no nos permiten controlar en qué zonas no queremos
ocultar información. Esto es muy importante para reducir la probabilidad de
ser detectado, puesto que hay zonas en las que una modificacion podría ser
muy sospechosa (en imágenes, podemos pensar en zonas con intensidades de color 
uniformes, como un cielo azul). 

Podemos evitar estas zonas mediante el uso de
[Wet Paper Codes](https://github.com/daniellerch/stegolab/blob/master/codes/wet_paper_codes.py).
Esta técnica nos permite marcar toda una serie de bytes como "mojados", es 
decir, bytes que no van a ser modificados durante el proceso de inserción.
Sin embargo, únicamente nos permite decidir si vamos a ocultar información
en un derterminado byte o no. Mucho más interesante sería poder asignar
a cada byte un valor que indique cuan fácil sería detectar la modificación,
y posteriormente encontrar qué bytes modificar para ocultar el
mensaje minimizando la probabilidad de ser detectado.

Esto es precisamente lo que hacen los Syndrome Trellis Codes (STC). Esta técnica 
nos permite separar el método de esteganografía en dos partes: una primera parte
en la que asignamos un coste a cada byte y una segunda parte en la que buscamos
la forma de ocultar el mensaje de menos coste. 

Esta metodología ha supuesto un avance importante en esteganografía, puesto
que al disponer de una técnica casi óptima de incrustar el mensaje (los
STC), los investigadores pueden centrarse en el diseño
de una buena función de coste.

Aunque existen muchas funciones de coste, dos ejemplos destacados para
imágenes son
[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD) 
para imágenes JPEG y
[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)
para imágenes de mapa de bits.



<br>
## STC: introducción

El método que se describe a continuación fué presentado en el artículo
"Minimizing embedding impact in steganography using trellis-coded quantization" 
de Tomáš Filler, Jan Judas y Jessica Fridrich, que se puede encontrar en la
referencia [ <a href='#referencias'>1</a> ].

Este artículo marcó un antes y un después en el mundo de la esteganogafía,
y el método de incrustación propuesto, se ha convertido en una herramienta
indispensable para los métodos modernos de esteganografía.

Recordemos, que en *matrix embeding*, codificamos un mensaje $m$
en un bloque de bytes *cover* $c$ procedente del medio en el que queremos ocultar
la información, mediante la multiplicación de este con una matriz de paridad
$H$.

<center>$Hc = m$</center>

Se pueden refrescar estos conceptos en el artículo de 
[códigos binarios](/stego/lab/codes/binary-hamming-es) 
referenciado en la introducción.


De hecho, dado $c$ (vector *cover*), estaremos interesados en saber cómo 
obtener $s$ (vector *stego*) modificando $c$, de manera que $Hs$ dé como 
resultado $m$ (el mensaje que queremos ocultar). Así, el receptor, que dispone 
de $H$, podrá calcular $m$ con una simple multiplicación de una matriz por un vector.

En general, cuando se usan códigos de Hamming, encontrar qué bits de $c$ tenemos
que modificar para obtener un $s$ que codifique el mensaje deseado, es sencillo
(en el artículo de [códigos binarios](/stego/lab/codes/binary-hamming-es)
se explica). Sin embargo, si queremos que nuestro método soporte la posibilidad
de asignar costes a cada uno de los bytes que pueden ser modificados, 
necesariamente necesitaremos que existean multiples $s$. Pues si existen
múltiples $s$, podremos quedarnos con aquel que tenga un coste de inserción
más pequeño.

Para que un sistema de ecuaciones de tipo $Hx=m$ tenga múltiples soluciones, 
una de las cosas que necesitamos es que haya más variables que incógnitas, 
es decir, que el número de columnas de la matriz $H$ sea más pequeño que el
número de filas. Por lo tanto, a la hora de seleccionar la matriz $H$ lo 
tendremos que tener en cuenta.

Sin embargo, cuando realizamos este pequeño cambio en la matriz $H$, surge la
necesidad de disponer de un método que permita encontrar las soluciones,
así como el coste de inserción asociado a cada una de ellas. 
Esto es precisamente, lo que hacen los STC. Al valor de $x$ le llamamos
*síndrome* y el método usado para encontrar el síndrome usa un descodificador
de rejilla o *trellis*, lo que da origen al nombre del método. 



<br>
## STC: la matriz H

Una de las primeras cosas que necesitamos para empezar a codificar usando
los STC es una matriz de paridad $H$. Esta matriz de paridad tiene una
construcción especial, que veremos más adelante. Pero para comprender esta
construcción tenemos que fijarnos en como funciona la multiplicación de 
una matriz por un vector.

<center>
$ \begin{pmatrix} 
 h_{11} & h_{21} & ... & h_{n1}\\\
 h_{12} & h_{22} & ... & h_{n2}\\\
 h_{13} & h_{23} & ... & h_{n3}\\\
 ...    & ...    & ... & ... \\\
 h_{1m} & h_{2m} & ... & h_{nm}  
\end{pmatrix} $
·
$ \begin{pmatrix} 
x_{1}\\\
x_{2}\\\
x_{3}\\\
...\\\
x_{m}
\end{pmatrix} $
=
$ \begin{pmatrix} 
 h_{11}x_1 + h_{21}x_2 + ... + h_{n1}x_n\\\
 h_{12}x_1 + h_{22}x_2 + ... + h_{n2}x_n\\\
 h_{13}x_1 + h_{23}x_2 + ... + h_{n3}x_n\\\
 ...   \\\
 h_{1m}x_1 + h_{2m}x_2 + ... + h_{nm}x_n
\end{pmatrix} $
</center>


Si nos fijamos en el resultado de la multiplicación, vemos que la
modificación de cada un solo valor del síndrome supone la modificación
de todos los valores del mensaje. Esto dificulta encontrar los valores
de del síndrome que dan como resultado de la multiplicación el vector
de $m$ deseado. 

Una construcción extrema de la matriz $H$ podría ser una matriz con unos en
la diagonal. Veamos qué ocurre:


<center>
$ \begin{pmatrix} 
 1 & 0 & ... & 0\\\
 0 & 1 & ... & 0\\\
 0 & 0 & ... & 0\\\
 ...   & ... & ... & ... \\\
 0 & 0 & ... & 1  
\end{pmatrix} $
·
$ \begin{pmatrix} 
x_{1}\\\
x_{2}\\\
x_{3}\\\
...\\\
x_{m}
\end{pmatrix} $
=
$ \begin{pmatrix} 
 x_1\\\
 x_2\\\
 x_3\\\
 ...   \\\
 x_n
\end{pmatrix} $
</center>

En este caso obtener un sindrome que dé como resultado $m$ es sencillo, basta
con hacer que $x$ = $m$. Pero recordemos que el síndrome procede del medio en 
el que queremos ocultar información y que queremos modificarlo lo menos posible. 
Por lo que modificar todos sus elementos no es una buena opción. Necesitamos una
construcción de $H$ a medio camino entre la matriz completa y la matriz 
diagonal.

Esta matriz se construye usando una submatriz $\hat{H}$ y usándola para
construir la diagonal de la matriz $H$. Supongamos, por ejemplo, que usamos:

<center>
$ \hat{H} = \begin{pmatrix} 
 1 & 0\\\
 1 & 1
\end{pmatrix} $
</center>

Podremos usar $\hat{H}$ para crear $H$ concatenando en cada paso la matriz
$\hat{H}$ y desplazándola una fila hacia abajo:

<center>
$ \begin{pmatrix} 
 1 & 0 &   &   &   &   &   &    \\\
 1 & 1 & 1 & 0 &   &   &   &    \\\
   &   & 1 & 1 & 1 & 0 &   &    \\\
   &   &   &   & 1 & 1 & 1 & 0 
\end{pmatrix} $
</center>


Si ahora realizamos la multiplicación, veremos que obtenemos un resultado
más propicio:

<center>
$ \begin{pmatrix} 
 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0  \\\
 1 & 1 & 1 & 0 & 0 & 0 & 0 & 0  \\\
 0 & 0 & 1 & 1 & 1 & 0 & 0 & 0  \\\
 0 & 0 & 0 & 0 & 1 & 1 & 1 & 0 
\end{pmatrix}
\begin{pmatrix} 
x_{1}\\\
x_{2}\\\
x_{3}\\\
x_{3}\\\
x_{4}\\\
x_{5}\\\
x_{6}\\\
x_{7}\\\
x_{8}
\end{pmatrix}
=
\begin{pmatrix} 
 x_{1}\\\
 x_{1} + x_{2} + x_{3}\\\
 x_{3} + x_{4} + x_{5}\\\
 x_{5} + x_{6} + x_{7}
\end{pmatrix} $
</center>


Ahora, encontrar los valores del síndrome que dan como resultado $m$ es 
más sencillo que en el primer caso, y al mismo tiempo, continuan existiendo
múltiples soluciones que nos permitirán quedarnos con la de menor coste. 


Antes de continuar, conviene aclarar algunos puntos más sobre las matrices
$\hat{H}$ y $H$.

Cualquier matriz de unos y ceros, cuyos vectores sean linearmente 
independientes nos sirve para construir nuestra matriz $H$. Sin embargo,
el número de columnas y de filas afectan de manera importante al 
método de inserción. Por un lado, el número de filas $h$ afecta al
rendimiento del algoritmo. En el artículo se propone usar $6 \le h \le 15$
Otro parámetro importante es el número de columns $w$, pues nos permite
controlar la capacidad, y se elige de manera que $w=1/\alpha$, siendo 
$\alpha$ el *payload*. As, por ejemplo, una matriz $\hat{H}$ de dos
columnas nos permitiría ocultar información con un *payload* relativo de
$0.5$.

Cabe destacar que no todas las matrices $\hat{H}$ son igual de eficientes.
Los autores, en base a sus experimentos, recomiendan poner a unos la 
primera y última fila, y escojer aleatoriamente el resto.


Durante la construcción del matriz $H$ iremos concatenando la matriz
$\hat{H}$ y desplazándonos una fila hacia abajo hasta obtener un número
de filas igual al número de elementos que tiene el síndrome. Esto nos
permitirá realizar la multiplicación de la matriz $H$ por el syndrome.




<br>
## STC: búsqueda de soluciones

Dada una matriz $H$, un vector cover $c$ inicial y un vector de costes $\rho$,
queremos encontrar un vector $s$ tal que $Hs=m$, siendo $m$ el mensaje
que queremos ocultar.

Pongamos un ejemplo antes de entrar en materia. Supongamos que tenemos un 
bloque de 8 píxeles de una imagen, en escala de grises, con los siguientes
valores:

$c = [113, 110, 111, 115, 100, 102, 102, 103]$

que representados en módulo 2 (o quedándonos únicamente con su LSB) quedaría:

$c = [1, 0, 1, 1, 0, 0, 0, 1]$


y que hemos asignado unos costes a cada uno de los píxeles en base a lo
fácil que seria detectar una modificación en cada uno de ellos. Disponemos
del siguiente vector de costes:

$\rho = [0.2, 0.9, 0.9, 0.8, 0.1, 0.2, 0.8, 0.7] $


Supongamos que usando los STC encontramos dos soluciones que codifican
el mensaje $m$ desado:

<center>
$s = [0, 0, 1, 1, 1, 0, 0, 1]$
</center>

<center>
$s' = [0, 1, 1, 1, 1, 0, 0, 1]$
</center>


Podemos calcular el coste simplemente aplicando el coste correspondiente
del elemento que ha sido modificado. Por lo tanto, el coste de $s$ seria de
$0.2+0.1=0.3$, puesto que se ha modificado el primer valor y el quinto.
En el caso de $s'$ el coste sería de $0.9$, puesto que solo se ha modificado
el segundo valor. Vemos pues, que aunque la segunda solución modifica menos 
bits, tiene un coste más alto, por lo que nos quedaríamos con la primera.



Veamos ahora cómo usar la matriz $H$ y el vector $c$ para incrustar $m$.
Es decir, veamos como calcular las soluciones posibles a $Hs=m$. Usaremos
como ejemplo la siguiente imagen, procedente del artículo original 
[<a href='#referencias'> 1 </a>]:



![efficiency](/stego/lab/codes/trellis-1.png?style=centerme)
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from ref [<a href='#referencias'>1</a>]
</p>









<br>
## Eficiencia y distorsión

xxx



<br>
## Ejemplo en Python

xxx





<br>
## Codificación del mensaje

xxx


<br>
## Implementación completa en Python

En el [enlace](https://github.com/daniellerch/stegolab/blob/master/codes/STC.py) 
de GitHub se proporciona una implementación completa, que incluye la codificación y
descodificación del mensaje, antes y después de la inserción.

A continuación, se muestra un ejemplo en el que escondemos datos en una imagen:

xxx


<p style='color:red;font-size:25px;font-weight:bold;text-align:center;padding-top:50px'>EN DESARROLLO ...</p>



<br>
## Referencias

1. "Minimizing embedding impact in steganography using trellis-coded 
   quantization" by Tomáš Filler, Jan Judas and Jessica Fridrich.
   Proc. SPIE 7541, Media Forensics and Security II, 754105 (27 January 2010),
   doi: [10.1117/12.838002](https://doi.org/10.1117/12.838002).

2. "Minimizing additive distortion functions with non-binary embedding 
   operation in steganography" by Tomáš Filler and Jessica Fridrich.
   2010 IEEE International Workshop on Information Forensics and Security, 2010, pp. 1-6,
   doi: [10.1109/WIFS.2010.5711444](https://doi.org/10.1109/WIFS.2010.5711444).





