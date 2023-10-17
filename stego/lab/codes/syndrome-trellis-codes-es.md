---
layout: page
title: "Syndrome Trellis Codes en Esteganografía"
subtitle: "" 
noindex: false
meta-title: "Syndrome Trellis Codes en Esteganografía"
meta-description: "Técnica de incrustación de información de tipo matrix embedding basada en códigos de rejilla."
meta-keywords: "esteganografía, imágenes, códigos"
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
   - [Ejemplo básico](#ejemplo-básico)
   - [Codificación (I)](#codificación-i)
   - [Algunas aclaraciones](#algunas-aclaraciones)
   - [Codificación (II)](#codificación-ii)
5. [STC: Descodificación](#stc-descodificación)
6. [Eficiencia y distorsión](#eficiencia-y-distorsión)
7. [Implementación vectorizada en Python](#implementación-vectorizada-en-python)
   - [Vector mensaje ($M$)](#vector-mensaje-m)
   - [Vector *cover* ($X$)](#vector-cover-x)
   - [Vector de costes ($\rho$ o *rho*)](#vector-de-costes-rho-o-rho)
   - [Variables de trabajo](#variables-de-trabajo)
   - [Cálculo de costes y caminos](#cálculo-de-costes-y-caminos)
   - [Búsqueda del camino óptimo](#búsqueda-del-camino-óptimo)
8. [Implementación completa en Python](#implementación-completa-en-python)
9. [Referencias](#referencias)


<br>
## Introducción

En los artículos 
"[Códigos de Hamming binarios en esteganografía](/stego/lab/codes/binary-hamming-es/)"
y 
"[Códigos de Hamming ternarios en esteganografía](/stego/lab/codes/ternary-hamming-es/)"
hemos visto cómo incrementar la eficiencia de la inserción de datos ocultos
mediante técnicas de *matrix embedding*. Estas técnicas, si bien nos permiten
incrementar la eficiencia, no nos permiten controlar en qué zonas no queremos
ocultar información. Esto es muy importante para reducir la probabilidad de
ser detectado, puesto que hay zonas en las que una modificación podría ser
muy sospechosa (en imágenes, podemos pensar en zonas con intensidades de color 
uniformes, como un cielo azul). 

Podemos evitar estas zonas mediante el uso de
[Wet Paper Codes](https://github.com/daniellerch/stegolab/blob/master/codes/wet_paper_codes.py).
Esta técnica nos permite marcar toda una serie de bytes como "mojados", es 
decir, bytes que no van a ser modificados durante el proceso de inserción.
Sin embargo, únicamente nos permite decidir si vamos a ocultar información
en un determinado byte o no. Mucho más interesante sería poder asignar
a cada byte un valor que indique cuan fácil sería detectar la modificación,
y posteriormente encontrar qué bytes modificar para ocultar el
mensaje minimizando la probabilidad de ser detectado.

Esto es precisamente lo que hacen los Syndrome Trellis Codes (STC). Esta técnica 
nos permite separar el método de esteganografía en dos partes: una primera parte
en la que asignamos un coste a cada byte y una segunda parte en la que buscamos
la forma de ocultar el mensaje de menos coste. De esta segunda parte se 
encargan los STC.

Esta metodología ha supuesto un avance importante en esteganografía, puesto
que al disponer de una técnica casi óptima de incrustar el mensaje (los
STC), los investigadores pueden centrarse en el diseño de una buena función 
de coste.

Aunque existen muchas funciones de coste, dos ejemplos destacados para
imágenes son
[J-UNIWARD](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD) 
para imágenes JPEG y
[HILL](https://github.com/daniellerch/stegolab/tree/master/HILL)
para imágenes de mapa de bits.


<br>
## STC: introducción

El método que se describe a continuación fue presentado en el artículo
"Minimizing embedding impact in steganography using trellis-coded quantization" 
de Tomáš Filler, Jan Judas y Jessica Fridrich, que se puede encontrar en la
referencia [ <a href='#referencias'>1</a> ].

Este artículo supuso un avance signigicativo en el mundo de la esteganogafía,
y la técnica propuesta, se ha convertido en una herramienta
indispensable para los métodos modernos de esteganografía.

Recordemos, que en *matrix embeding*, codificamos un mensaje $m$
en un bloque de bytes *cover* $c$ procedente del medio en el que queremos ocultar
la información, mediante la multiplicación de este con una matriz de paridad
$H$.

<center>$Hc = m$</center>

Se pueden refrescar estos conceptos en el artículo de 
[códigos binarios](/stego/lab/codes/binary-hamming-es/) 
referenciado en la introducción.


De hecho, dado $c$ (vector *cover*), estaremos interesados en saber cómo 
obtener $s$ (vector *stego*) modificando $c$, de manera que $Hs$ dé como 
resultado $m$ (el mensaje que queremos ocultar). Así, el receptor, que dispone 
de $H$, podrá calcular $m$ con una simple multiplicación de una matriz por un vector.

En general, cuando se usan códigos de Hamming, encontrar qué bits de $c$ tenemos
que modificar para obtener un $s$ que codifique el mensaje deseado, es sencillo
(en el artículo de [códigos binarios](/stego/lab/codes/binary-hamming-es/)
se explica). Sin embargo, si queremos que nuestro método soporte la posibilidad
de asignar costes a cada uno de los bytes que pueden ser modificados, 
necesariamente necesitaremos que existean múltiples $s$. Pues si existen
múltiples $s$, podremos quedarnos con aquel que tenga un coste de inserción
más pequeño.


Recordemos que $Hx=m$ es un sistema de ecuaciones como el siguiente:

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

Y para que un sistema de ecuaciones de tipo $Hx=m$ tenga múltiples soluciones, 
una de las cosas que necesitamos es que haya más variables que incógnitas, 
es decir, que el número de columnas de la matriz $H$ sea más pequeño que el
número de filas. Por lo tanto, a la hora de seleccionar el tamaño de la matriz 
$H$ y de los vectores $x$ y $m$, lo tendremos que tener en cuenta.

Sin embargo, cuando queremos resolver un sistema de ecuaciones que tiene
múltiples soluciones, surge la necesidad de disponer de un método que permita 
encontrar dichas soluciones.
Esto es precisamente lo que hacen los STC. Al valor de $x$ le llamamos
*síndrome* y el método usado para encontrar el síndrome usa un descodificador
de rejilla o *trellis*, lo que da origen al nombre del método. 


<br>
## STC: la matriz H


Una de las primeras cosas que necesitamos para empezar a codificar usando
los STC es una matriz de paridad $H$. Esta matriz de paridad tiene una
construcción especial, que veremos más adelante. Pero para comprender esta
construcción tenemos que fijarnos en como funciona la multiplicación de 
una matriz por un vector ($Hx=m$).

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
modificación de un solo valor del síndrome supone la modificación
de todos los valores del mensaje. Esto dificulta encontrar los valores
del síndrome que dan como resultado de la multiplicación el vector
$m$ deseado. 

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

En este caso obtener un síndrome que dé como resultado $m$ es sencillo, basta
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
más sencillo que en el primer caso, y al mismo tiempo, continúan existiendo
múltiples soluciones que nos permitirán quedarnos con la de menor coste. 


Antes de continuar, conviene aclarar algunos puntos más sobre las matrices
$\hat{H}$ y $H$.

Cualquier matriz de unos y ceros, cuyos vectores sean linealmente 
independientes nos sirve para construir nuestra matriz $H$. Sin embargo,
el número de columnas y de filas afectan de manera importante al 
método de inserción. Por un lado, el número de filas ($h$) afecta al
rendimiento del algoritmo. En el artículo se propone usar $6 \le h \le 15$.
Otro parámetro importante es el número de columnas ($w$), pues nos permite
controlar la capacidad, y se elige de manera que $w=1/\alpha$, siendo 
$\alpha$ el *payload*. Así, por ejemplo, una matriz $\hat{H}$ de dos
columnas nos permitiría ocultar información con un *payload* relativo de
$0.5$, puesto que $\alpha=1/w=1/2=0.5$.


Cabe destacar que no todas las matrices $\hat{H}$ son igual de eficientes.
Los autores, en base a sus experimentos, recomiendan poner a unos la 
primera y última fila, y escoger aleatoriamente el resto.


Durante la construcción del matriz $H$ iremos concatenando la matriz
$\hat{H}$ y desplazándonos una fila hacia abajo hasta obtener un número
de filas igual al número de elementos que tiene el síndrome. Esto nos
permitirá realizar la multiplicación de la matriz $H$ por el síndrome.



<br>
## STC: búsqueda de soluciones

### Ejemplo básico

Dada una matriz $H$, un vector *cover* $c$ inicial y un vector de costes $\rho$,
queremos encontrar un vector $s$ tal que $Hs=m$, siendo $m$ el mensaje
que queremos ocultar.

Pongamos un ejemplo antes de entrar en materia. Supongamos que tenemos un 
bloque de 8 píxeles de una imagen (en escala de grises) con los siguientes
valores:

$c = [113, 110, 111, 115, 100, 102, 102, 103]$

que representados en módulo 2 (o quedándonos únicamente con su LSB) quedaría:

$c = [1, 0, 1, 1, 0, 0, 0, 1]$


y que hemos asignado unos costes a cada uno de los píxeles en base a lo
fácil que seria detectar una modificación en cada uno de ellos. Disponemos
del siguiente vector de costes:

$\rho = [0.2, 0.9, 0.9, 0.8, 0.1, 0.2, 0.8, 0.7] $


Supongamos que usando los STC encontramos dos soluciones que codifican
el mensaje $m$ deseado:

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
el segundo valor. Vemos pues que, aunque la segunda solución modifica menos 
bits, tiene un coste más alto, por lo que nos quedaríamos con la primera.



Veamos ahora cómo usar la matriz $H$ y el vector $c$ para incrustar $m$.
Es decir, veamos cómo buscar las soluciones de menor coste de $Hs=m$. 
Usaremos como ejemplo la siguiente imagen, procedente del artículo original 
[<a href='#referencias'> 1 </a>]:



![trellis-1](/stego/lab/codes/resources/trellis-1.png?style=centerme)
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from ref [<a href='#referencias'>1</a>]
</p>



Como vemos, se ha elegido una matriz con $h=2$ y $w=2$, por lo que estaremos
ocultando información con $\alpha=0.5$. El vector *cover* inicial es:

$c = [1, 0, 1, 1, 0, 0, 0, 1]$

El mensaje que se quiere ocultar es:

$m = [0, 1, 1, 1]$

Y la submatriz usada para generar $H$ es:

<center>
$ \hat{H} = \begin{pmatrix} 
 1 & 0\\\
 1 & 1
\end{pmatrix} $
</center>


El diagrama que vemos en la figura es un gráfico de rejilla formado por
diferentes bloques (un bloque para cada matriz $\hat{H}$ contenida en $H$).
Cada uno de estos bloques tiene $w+1$ columnas y $2^h$ filas. Cada una
de las filas representa un estado, indicados en binario ($00$, $01$, $10$, $11$).


Siempre partiremos del estado $00$ e iremos construyendo la ruta por la
rejilla, de manera que una ruta válida represente una solución al sistema
de ecuaciones $Hs=m$. Al finalizar, calcularemos el coste de cada una de 
las rutas válidas y nos quedaremos con la de menor coste.


Antes de empezar con la codificación, conviene recordar que lo que estamos
haciendo es buscar un vector $s$ que cumpla $Hs=m$. Para una matriz $\hat{H}$
de $w=2$ y $h=2$, esto implica encontrar una solución al sistema de ecuaciones:

<center style='font-size:14px'>
$ \begin{equation}
\begin{pmatrix} 
 h_{11} & h_{21} & 0 & 0 & 0 & 0 & 0 & 0  \\\
 h_{12} & h_{22} & h_{11} & h_{21} & 0 & 0 & 0 & 0  \\\
 0 & 0 & h_{12} & h_{22} & h_{11} & h_{21} & 0 & 0  \\\
 0 & 0 & 0 & 0 & h_{12} & h_{22} & h_{11} & h_{21} 
\end{pmatrix}
\begin{pmatrix} 
s_{1}\\\
s_{2}\\\
s_{3}\\\
s_{3}\\\
s_{4}\\\
s_{5}\\\
s_{6}\\\
s_{7}\\\
s_{8}
\end{pmatrix}
=
\begin{pmatrix} 
 h_{11} s_1 + h_{21} s_2\\\
 h_{12} s_1 + h_{22} s_2 + h_{11} s_3 + h_{21} s_4\\\
 h_{12} s_3 + h_{22} s_4 + h_{11} s_5 + h_{21} s_6\\\
 h_{12} s_5 + h_{22} s_6 + h_{11} s_7 + h_{21} s_8
\end{pmatrix}
\end{equation}$
</center>

que para la matriz escogida corresponde a:

<center style='font-size:14px'>
$ \begin{equation}
\begin{pmatrix} 
 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0  \\\
 1 & 1 & 1 & 0 & 0 & 0 & 0 & 0  \\\
 0 & 0 & 1 & 1 & 1 & 0 & 0 & 0  \\\
 0 & 0 & 0 & 0 & 1 & 1 & 1 & 0 
\end{pmatrix}
\begin{pmatrix} 
s_{1}\\\
s_{2}\\\
s_{3}\\\
s_{3}\\\
s_{4}\\\
s_{5}\\\
s_{6}\\\
s_{7}\\\
s_{8}
\end{pmatrix}
=
\begin{pmatrix} 
 s_{1}\\\
 s_{1} + s_{2} + s_{3}\\\
 s_{3} + s_{4} + s_{5}\\\
 s_{5} + s_{6} + s_{7}
\end{pmatrix}  
=
\begin{pmatrix} 
 0\\\
 1\\\
 1\\\
 1
\end{pmatrix} 
\end{equation}$
</center>






Es decir, que durante la búsqueda del vector $s$ estaremos buscando valores
que cumplan $s_1=0$, $s_1+s_2+s_3=1$, $s_3+s_4+s_5=1$ y $s_5+s_6+s_7=1$.
Es importante no perder esto de vista para entender la motivación de los
diferentes pasos que sigue el algoritmo de codificación.



<br>
### Codificación (I)

Para empezar, veamos cómo construir el camino que recorre la rejilla. 
Empezaremos por el primer bloque:

![trellis-3](/stego/lab/codes/resources/trellis-3.png?style=centerme)


Empezamos en el estado $00$, en la columna $p_0$. Se abren dos caminos: 
el primer camino consiste en permanecer en el mismo estado y el segundo camino 
consiste en cambiar de estado. Para cambiar de estado realizaremos una operación 
$\oplus$ ([XOR](https://en.wikipedia.org/wiki/Exclusive_or)) del valor del estado
actual con el valor de la columna $\hat{H}$ correspondiente (en este caso 
la primera columna) leída de abajo a arriba. En este caso, dado que estamos en 
el estado $00$, haremos $00 \oplus 11 = 11$. Es decir, que pasaremos al estado
$11$.

En este punto (columna 1) disponemos de dos caminos, uno en el estado $00$ y 
otro en el estado $11$. De nuevo, en ambos tenemos la opción de continuar en 
el mismo estado o de cambiar de estado. Para cambiar de estado, esta vez 
realizaremos la operación $\oplus$ con la segunda columna de la matriz 
$\hat{H}$, que es $10$ (recordemos que se lee de abajo a arriba). Así, el 
camino en el estado $00$ pasa al estado $00 \oplus 10 = 10$, mientras que el 
camino en el estado $11$ pasa al estado $11 \oplus 10 = 01$

Además de calcular el camino, también tenemos que calcular el coste de dicho
camino. El coste de cada opción está marcado con un círculo rojo en la 
siguiente imagen:

![trellis-4](/stego/lab/codes/resources/trellis-4.png?style=centerme)



Para ello hay que tener en cuenta que cuando nos mantenemos en el
mismo estado, estamos estableciendo el valor correspondiente del vector $s$ 
(vector *stego*) resultante a $0$, mientras que cuando cambiamos de estado, 
estamos estableciendo el valor a $1$ (el coste de cada camino se indica en rojo 
en la imagen). Vemos pues que al pasar del estado $00$ 
de la columna $p_0$, al estado $00$ de la columna $1$ estamos estableciendo 
$s_1$ a $0$, y dado que este valía $1$ tenemos un coste que añadir. En el ejemplo 
se usa un coste fijo de $1$ para todas las modificaciones, pero si tuviésemos un 
vector de costes, usaríamos el valor correspondiente. Por otra parte, al pasar 
del estado $00$ de la columna $p_0$ al estado $11$ de la columna $1$, vemos en 
la imagen que se le ha asignado un coste $0$, debido a que corresponde a 
establecer el valor $s_1$ a $0$, que es el valor que ya tenía. Es decir, que 
siguiendo este camino, no es necesario modificar $s_1$.

De forma similar se establecen los costes al pasar de la columna $1$ a la
columna $2$. Mantenerse en el estado $00$ supone codificar un $0$, dado que
el $c_2$ vale cero y no hay que modificar $s_2$ el coste es $0$, pero como el
coste del nodo anterior era $1$, el coste acumulado es de $1$. Cambiar del
estado $00$ al estado $10$ supone codificar un $1$ y dado que $c_2$ vale $0$,
esto supone realizar otro cambio, es decir sumar $1$ al coste. Puesto que el 
coste ya era de $1$, el coste total acumulado es de $2$. Lo misma idea se
puede aplicar para pasar del estado $11$ a los estados $01$ y $11$, 
obteniendo un coste total acumulado de $1$ y $0$, respectivamente.


Ya hemos terminado con el primer bloque, así que es momento de eliminar los
caminos que no nos sirven. Para ello, es necesario tener en cuenta que el 
mensaje lo codificamos con el bit de la derecha (LSB) del estado. Es decir,
que los caminos que terminan en los estados $00$ y $10$ están incrustando el
bit de mensaje $0$, mientras que los caminos que terminan en los estados 
$01$ y $11$ están incrustando el bit del mensaje $1$. Puesto que queremos
incrustar $m_1=0$, sabemos que los caminos que terminan en los estados $01$
y $11$ nunca podrán codificar nuestro mensaje, por lo que podemos eliminarlos.


Una vez procesado el bloque, volvemos a empezar desde los estados iniciales. 
Es decir, simplemente movemos los estados finales del bloque al principio. 



<br>
### Algunas aclaraciones


Volvamos un momento a la ecuación 1, de la cual mostramos a continuación 
una parte:

<center style='font-size:14px'>
$
\begin{pmatrix} 
 h_{11} s_1 + h_{21} s_2\\\
 h_{12} s_1 + h_{22} s_2 + h_{11} s_3 + h_{21} s_4\\\
 h_{12} s_3 + h_{22} s_4 + h_{11} s_5 + h_{21} s_6\\\
 h_{12} s_5 + h_{22} s_6 + h_{11} s_7 + h_{21} s_8
\end{pmatrix}
=
\begin{pmatrix} 
 0\\\
 1\\\
 1\\\
 1
\end{pmatrix} 
= m
$
</center>

Nótese, que las bifurcaciones correspondientes a mantenerse en el mismo estado,
corresponden a la codificación de un 0 en el vector $s$ resultante. Poner un
cero en una posición del vector $s$ equivale a multiplicar por cero (ignorar) 
el valor de la matriz $\hat{H}$ correspondiente. Sin embargo, cambiar de estado 
codifica un 1 en una posición de $s$, lo que implica multiplicar por 1 (tener 
en cuenta) el valor de $\hat{H}$ correspondiente. Nótese también, que la decisión 
de codificar un 0 o un 1 en una posición de $s$, afecta a toda la columna 
correspondiente de $\hat{H}$.
Esta es la motivación de realizar los cambios de estado como se indica, pues nos 
permite no recorrer caminos imposibles. Así, cada uno de los caminos prueba una 
de las posibles soluciones.


Los estados nos indican el bit de $m$ que estamos incrustando. Recordemos que
este no es más que el resultado de la suma de cada valor de $s$ multiplicado
por el valor de $\hat{H}$ correspondiente, tal y como se ve en la imagen anterior.
Esto lo calculamos con el cambio de estado. En cada cambio, si nos mantenemos en 
el mismo estado, el bit de mensaje no cambiará. Pero si cambiamos de estado sí 
lo hará. De esta manera, en cada cambio de estado decidimos si cambiamos el bit 
de $m$ que estamos incrustando o no. El estado final de cada bloque decidirá que 
bit queda incrustado. Como empezamos en el estado $00$, y cada vez que cambiamos 
de estado (a un estado diferente) cambiamos el LSB, al final, el LSB del estado 
nos indicará el bit de $m$ incrustado. Al finalizar el bloque y descartar los 
caminos con el LSB del estado que no se corresponde con el mensaje, estamos 
descartando las soluciones parciales que ya no pueden llevar a un $s$ que 
cumpla $Hs=m$. 



Dado que cada cambio de 
estado implica sumar 1, y dado que empezamos en el estado $00$, los estados
con un valor par (LSB con valor 0) codificarán un 0 en el bit correspondiente
de $m$, mientras que los estados con un valor impar (LSB con valor 1) 
codificarán un 1 en el bit de $m$ correspondiente.



<br>
### Codificación (II)


El proceso del siguiente bloque es similar, aunque existen algunas 
particularidades que vale la pena mencionar.

![trellis-5](/stego/lab/codes/resources/trellis-5.png?style=centerme)

Calculamos el coste de los diferentes caminos de la misma forma que en el
primer bloque y vamos acumulando el coste. Cuando llegamos al cambio de
la columna $3$ a la $4$ nos encontramos con diferentes caminos que terminan
en el mismo estado. Cuando esto ocurre, nos quedamos con el camino de menor
coste y eliminamos el otro. En la imagen, el camino eliminado aparece en
linea discontinua. Pasar del estado $00$ al estado $00$ supone codificar un $0$
y dado que $c_4=1$ el coste total será de $3$. Sin embargo, pasar del estado 
$10$ al estado $00$ supone codificar un $1$, que coincide con $c_4$ y acumula
un coste total de $2$. Así, esta última opción permanece y la anterior se
elimina. Lo mismo ocurre con el resto de los estados.



Una vez tenemos todos los bloques procesados, podemos recorrer hacia tras
la rejilla para obtener el valor del vector $s$ óptimo.

![trellis-7](/stego/lab/codes/resources/trellis-7.png?style=centerme)


Es importante darse cuenta de que el último bit del vector *cover* no afecta
al mensaje, debido a que la matriz $H$ tiene todo ceros en la última columna.
Por lo tanto, aunque en la imagen se muestra una linea horizontal
(no hay cambio de estado) entre la columna $7$ y la $8$, que debería codificar
un cero, codifica igualmente un $1$ (consultar ecuación 2).


<br>
## STC: Descodificación

Cuando el receptor del mensaje (que dispone de la matriz $H$), extrae el vector 
$s$ del medio *stego*, puede extraer $m$ realizando la multiplicación $m=Hs$.







<br>
## Eficiencia y distorsión

xxx



<br>
## Implementación vectorizada en Python

En cada columna, el algoritmo necesita realizar un máximo de $2^h$ operaciones,
donde $h$ es la altura de la matrix $\hat{H}$. Por ello, implementar el 
algoritmo usando bucles en Python daría lugar a un programa demasiado lento.
Habría que implementarlo en un lenguaje de bajo nivel como C o C++. Sin
embargo, podemos usar [Numpy](https://numpy.org/) para vectorizar el programa. 
Es decir, realizar siempre que sea posible operaciones con arrays implementadas 
por la librería Numpy. De esta manera, se puede conseguir una eficiencia aceptable. Aunque
cabe mencionar que esta forma de programar, en ocasiones, dificulta enormemente
seguir el algoritmo. Por ello, vamos a detallar cada paso a continuación.

Partiremos de las siguientes variables:



### Vector mensaje ($M$)

$X$ es un array de dos dimensiones que contiene unos y ceros. La primera
dimensión indica el número de bloques en los que se ha divido el mensaje 
y la segunda, la longitud de cada bloque.

Contiene los bits que forman el mensaje (unos y ceros). 

A continuación vemos un ejemplo de $M$ en el que hay 11200 bloques de 
5 bits cada uno. Es decir, que estamos unsando un código que nos permite
ocultar $5$ bits en cada bloque del vector $cover$, que veremos después.

```python
>>> M.shape
(11200, 5)
>>> M
[[1 0 1 1 0]
 [0 1 0 1 0]
 [0 1 1 0 1]
 ...
 [1 1 0 0 0]
 [1 0 0 1 0]
 [1 1 0 1 0]]
```



### Vector *cover* ($X$)

$X$ es un array de dos dimensiones que contiene unos y ceros. La primera
dimensión indica el número de bloques y la segunda, la longitud de cada bloque.

Es una representación del vector $cover$, es decir, que podría contener 
por ejemplo, los LSB de los píxeles de una imagen o de las muestra de audio.

A continuación vemos un ejemplo de $X$ en el que hay 11200 bloques de 
20 bits cada uno. Es decir, que estamos unsando un código que nos permite
ocultar $5$ bits en cada bloque de $20$ bits.

```python
>>> X.shape
(11200, 20)
>>> X
[[1 1 1 ... 0 1 0]
 [1 0 1 ... 0 1 1]
 [0 1 0 ... 1 1 1]
 ...
 [1 0 0 ... 0 0 0]
 [0 1 1 ... 1 0 0]
 [1 1 1 ... 0 1 1]]
```




### Vector de costes ($\rho$ o *rho*)

$\rho$ es un array de dos dimensiones que contiene el coste de ocultar
información en cada posición del bit correspondiente. Igual que en el
caso anterior, la primera dimensión corresponde al número de bloques 
y la segunda a la longitud de cada bloque.

Veamos un ejemplo:

```python
>>> rho.shape
(11200, 20)
>>> rho
[[0.12285315 0.12869447 0.07671703 ... 0.09957111 0.09522195 0.53469276]
 [0.54047088 0.43969172 0.10222969 ... 0.40612536 0.11569894 0.49387093]
 [0.07055812 0.28936677 0.22440558 ... 0.10338494 0.26619512 0.33683038]
 ...
 [0.38567256 0.10401772 0.06888007 ... 0.04226346 0.11083836 0.0957425 ]
 [0.15387796 0.26243051 0.16229406 ... 0.10800338 0.35959262 0.3779376 ]
 [0.40139949 0.23998674 0.69433262 ... 0.07365008 0.0405597  0.09663148]]
```


### Variables de trabajo

Vamos a trabajar, principalmente, con dos variables: la variable *costs* en
la que guardaremos los costes de los diferentes caminos del Trellis y la
variable *paths* en la que guardaremos las diferentes transiciones que
realizamos en cada estado.

Definimos e inicializamos la variable *costs* de la siguiente manera:

```python
costs = np.infty * np.ones((dim, 2**self.h))
costs[:,0] = 0
```
```python
>>> costs.shape
(11200, 1024)
```


y la variable *paths*, como vemos a continuación:


```python
paths = np.zeros((dim, 2**self.h, self.n)) 
```

```python
>>> paths.shape
(11200, 1024, 20)
```

De esta manera, podemos guardar en *costs* el coste para cada uno de los 
$2^h$ estados posibles (en este ejemplo $h=10$. Mientras que en *paths*
podemos guardar el cambio de estado que se produce para cada bloque, 
para cada estado y para cada uno de los bits que forma cada bloque.

Una vez que la parte inicial del algoritmo rellene estas dos variables, 
tendremos la información suficiente como para construir el camino de menor coste.



### Cálculo de costes y caminos

El algoritmo tiene dos partes, una primera parte en la que calculamos los
costes de las transiciones y los cambios de estado, y una segunda parte en
la que usamos estos datos para reconstruir el caminio de menor coste.

La primera parte usa el siguiente código:


```python
for i in range(self.n):
   previous_cost = costs.copy()
   hi = self.Hcols[i]
   for j in range(2**self.h):
      c1 = previous_cost[:,j] + X[:,i]*rho[:,i]
      c2 = previous_cost[:,j^hi] + (1-X[:,i])*rho[:,i]

      if np.sum(c1<c2)>0:
         costs[c1<c2, j] = c1[c1<c2]
         paths[c1<c2, j, i] = j
      if np.sum(c1>=c2)>0:
         costs[c1>=c2, j] = c2[c1>=c2]
         paths[c1>=c2, j, i] = j^hi

      if self.shift[i] == 1:  
         tail = np.infty* np.ones((dim, 2**(self.h-1)))   
         costs_0 = np.concatenate((costs[:, 0::2], tail), axis=1) 
         costs_1 = np.concatenate((costs[:, 1::2], tail), axis=1) 
         costs = costs_0.copy()   
         costs[M[:,m_id]==1] = costs_1[M[:,m_id]==1]  
         m_id = m_id + 1  
```


Vemos que se recorren los $n$ bits de cada bloque, y para cada uno de ellos, 
se recorren los $2^h$ estados. En cada paso, calculamos el cotes mínimo y
el camino seguido. Veámoslo paso a paso:

```python
c1 = previous_cost[:,j] + X[:,i]*rho[:,i]
c2 = previous_cost[:,j^hi] + (1-X[:,i])*rho[:,i]
```

En el vector $c_1$ se guarda el coste de los casos en los que el estado $j$ 
continua en el mismo estado. Es decir, los costes de los casos en los que no 
hay cambio de estado. Recordemos que cuando no hay cambio de estado estamos 
codificando un $0$ en el vector $stego$. Por lo tanto, si $X$ (para cada bloque 
y en la posición $i$)  vale $0$, no habrá incremento de coste, pues estaremos 
codificando un $0$ y el vector $X$ en esa posición ya vale $0$ (no es necesario 
cambiar ese bit en el vector $stego$). Sin embargo, si $X$ en esa posición vale 
$1$, al estar codificando un 0, habrá que cambiar el bit  correspondiente de $X$, 
por lo que habrá que imputar el coste según indique el  vector $\rho$.

En el vector $c_2$ se guarda el coste de los casos en los que $j$ es el resultado
de un cambio de estado desde $j \oplus hi$. Es decir, que el estado anterior
era $j \oplus hi$ y el nuevo estado pasa a ser $j$. La idea es similar a la 
del caso  anterior, sin embargo, dado que el cambio de estado codifica un $1$
en el vector $stego$, solo imputaremos el coste del vector $\rho$ cuando el 
valor de $X$ sea $0$.

Nótese que la posición $j$ representa el estado al que pasamos, y no el estado
del que partimos. Hacerlo así nos permite guardar únicamente el que coste
mínimo para llegar a este estado. Sin embargo, en *paths* vamos a guardar el
estado origen que nos ha permitido llegar hasta allí, que lo podemos calcular
mediante $j^hi$.

Nótese también que las operaciones son vectorizadas. Es decir, que Numpy está 
procesando todo el vector a la vez, y está calculando los cambios de estado
para la posición $i$ de todos los bloques.


A continuación, para el cambio de estado de menor coste, guardamos el
cambio de estado y el coste.

```python
if np.sum(c1<c2)>0:
   costs[c1<c2, j] = c1[c1<c2]
   paths[c1<c2, j, i] = j
if np.sum(c1>=c2)>0:
   costs[c1>=c2, j] = c2[c1>=c2]
   paths[c1>=c2, j, i] = j^hi
```

Los *ifs* los usamos únicamente para no realizar la operación si no se cumple
el caso. La idea de las sentencias anteriores es, simplemente, guardar $c_1$ o
$c_2$ en $costs$, el que tenga un valor inferior. Hacemos lo mismo con $paths$,
pero esta vez guardando el cambio de transición: $j$ si no hay cambio de estado,
lo que ocurre si $c_1$ es el coste mínimo, o $j \oplus hi$ si hay cambio de
estado, lo que ocurre si $c_2$ es el coste mínimo.


Cada vez que procesamos una matriz $\hat{H}$ entera paramos para "podar" las
transiciones de estado imposibles. La variable "shift" se prepara para que
contenga unos en las posiciones en las que se terminan las columnas de la
matriz $\hat{H}$, de manera que el *if* nos permite realizar esta parte solo
cuando es necesario.


```python
      if self.shift[i] == 1:  
         tail = np.infty* np.ones((dim, 2**(self.h-1)))   
         costs_0 = np.concatenate((costs[:, 0::2], tail), axis=1) 
         costs_1 = np.concatenate((costs[:, 1::2], tail), axis=1) 
         costs = costs_0.copy()   
         costs[M[:,m_id]==1] = costs_1[M[:,m_id]==1]  
         m_id = m_id + 1  
```

Cuando esto ocurre, la parte del mensaje correspondiente ya ha sido codificada.
Los bits del mensaje coinciden con los LSB del estado, por lo que los estados
con LSB de valor 0, codifican un 0 en el mensaje, mientras que los estado con
LSB de valor 1, codifican un 1.
Por lo tanto, la sección anterior de código se queda con los costes que
permiten codificar el mensaje, eliminando el resto (coste infinito). 




### Búsqueda del camino óptimo

Una vez tenemos almacenados los costes y los cambios de estado, ya podemos
reconstruir la ruta de menor coste. Usaremos el siguiente código:

```python
ind = np.argmin(costs, axis=1)
m_id -= 1
for i in range(self.n-1, -1, -1):                                                                                
   if self.shift[i] == 1:
       ind = 2*ind + M[:,m_id]
       m_id = m_id - 1
   Y[:, i] = paths[range(dim), ind, i] != ind
   ind = paths[range(dim), ind, i].astype('uint16')
```

Lo que estamos haciendo es recorrer el *trellis* hacia atrás, calculando
el vector *stego*.

Empezamos calculando los indices de los estados de menor coste. Cabe destacar
que el vector "costs" contiene el coste final para cada estado, por lo tanto,
el estado de menor coste es aquel que termina el camino de menor coste.
Así, $argmin$ nos dará el índice en el que termina el camino óptimo para cada
uno de los bloques $cover$.

Partiendo de dicho índice, podemos usar el vector $paths$ para saber cual
era el estado anterior, recorriendo así el *trellis* hacia atrás.
Una excepción a esto se produce al final de cada bloque del *trellis*. 
Recordemos que en la sección anterior hemos realizado una "poda" en la que 
eliminábamos la mitad de los estados al final de cada bloque. Así pues,
para recuperar el estado anterior en el final de los bloques, tenemos que
multiplicar el índice por $2$ para obtener el estado anterior, aplicando
como ofset el valor del bit del mensaje.

Durante el recorrido hacia atrás del *trellis* aprovechamos para calcular
el vector $stego$. Recordemos que un cambio de estado codificaba un $1$, 
mientras que mantenerse en el mismo estado codificaba un $0$. Así pues,
únicamnte tenemos que consultar si el estado anterior y el siguiente son
iguales o no para saber el valor del vector *stego* en cada posición.





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





