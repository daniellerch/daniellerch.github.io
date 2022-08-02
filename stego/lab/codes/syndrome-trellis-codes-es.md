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



![trellis-1](/stego/lab/codes/resources/trellis-1.png?style=centerme)
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from ref [<a href='#referencias'>1</a>]
</p>


Como vemos, se ha elegido una matriz con $h=2$ y $w=2$, por lo que estaremos
ocultando información con $\alpha=0.5$. El vector cover inicial es:

$c = [1, 0, 1, 1, 0, 0, 0, 1]$

el mensaje que se quiere ocultar es:

$m = [0, 1, 1, 1]$

y la submatriz usada para generar $H$ es:

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


Veamos como construir el camino que recorre la rejilla. Empezaremos por el
primer bloque:

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
camino. Resaltados con un círculo rojo en la siguiente imagen:

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
establecer el valodr $s_1$ a $0$, que es el valor que ya tenía. Es decir, que 
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
que los caminos que terminan en los estados $00$ y $10$ estan incrustando el
bit de mensaje $0$, mientras que los caminos que terminan en los estados 
$01$ y $11$ estan incrustando el bit del mensaje $1$. Puesto que queremos
incrustar $m_1=0$, sabemos que los caminos que terminan en los estados $01$
y $11$ nunca podrán codificar nuestro mensaje, por lo que podemos eliminarlos.


Una vez procesado el bloque, volvemos a empezar de los estados iniciales. 
Es decir, simplemente movemos los estados finales del bloque hacia arriba. 
<p style='color:red'> ????</p>



El proceso del siguiente bloque es similar, aunque existen alguinas 
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


Es importante darse cuenta de que el último bit del vector cover no afecta
al mensaje, por lo que aunque en la imagen se muestra una linea horizental
(no ha cambio de estado) entre la columna $7$ y la $8$, que debería codificar
un cero, codifica igualmente un $1$. Recordemos pues que:


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
\end{pmatrix}
=
\begin{pmatrix} 
 m_{1}\\\
 m_{2}\\\
 m_{3}\\\
 m_{4}
\end{pmatrix} $ 

</center>






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





