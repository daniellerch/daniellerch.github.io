---
layout: page
title: "Técnicas de incrustación eficiente en esteganografía"
subtitle: "" 
noindex: false
meta-title: "Técnicas de incrustación eficiente"
meta-description: "Artículo acerca del uso de códigos eficientes en esteganografía. Estos códigos permiten incrustar más información con menos modificaciones."
lang-suffix: "-es"
---

> En este artículo vamos a ver diferentes técnicas que nos permiten incrustar más información 
> realizando menos modificaciones.




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

1. [Eficiencia de la incrustación](#eficiencia-de-la-incrustación)
2. [Códigos de Hamming binarios](#códigos-de-hamming-binarios)
3. [Códigos de Hamming n-arios](#códigos-de-hamming-n-arios)
4. [Referencias](#referencias)


<br>
## Eficiencia de la incrustación

En esteganografía decimos que la eficiencia de la inserción es 1 cuando 
necesitamos hacer una modificación cada vez que incrustamos un bit. Sin 
embargo, Cuando ocultamos información en el LSB 
(ver [Incrustación de información en el LSB](/stego/blog/lsb-es))
la eficiencia de la inserción es de 2. Esto es así debido a que, 
estadísticamente, la mitad de los bytes en los que queremos ocultar información
ya tendrán como valor del LSB el bit del mensaje que queremos incrustar, por 
lo que no será necesario modificarlo. Así pues, estaremos incrustando un bit
en cada byte pero solo estaremos modificando la mitad de los bytes. En
consecuencia, la eficiencia será de 2.

Esta eficiencia puede mejorarse fácilmente con un sencillo truco. Veamos como
funciona. 

Vamos a ocultar información en grupos de tres bytes:

| A | B | C |

y vamos a usar esta fórmula para ocultar el primer bit:

$ M_1 = LSB(A) \oplus LSB(B) $

y esta fórmula para ocultar el segundo:

$ M_2 = LSB(B) \oplus LSB(C) $


Aquí $LSB()$ hace referencia al bit menos significativo del píxel.


Aplicar este método es muy sencillo. Si $M_1$ y $M_2$ ya tienen los valores 
que queremos ocultar, no tenemos que hacer nada. Si ninguno de los valores de 
$M_1$ y $M_2$ coincide cambiaremos el LSB de $B$. Si $M_1$ coincide pero 
$M_2$ no, cambiaremos el LSB de $C$ y si $M_2$ coincide pero $M_1$ no, 
cambiaremos el valor de $A$. Con esta sencilla técnica podemos ocultar
dos bits modificando solo uno.

Veamos un ejemplo. Tenemos los siguientes píxeles:

| 10010100 | 10010101 | 10010111 |

Si queremos ocultar $00$ un posible resultado es:

| (+1) 1001010**1** | 10010101 | 10010111 |


Si queremos ocultar $01$ una opción será:

| 10010100 | (-1) 1001010**0** | 10010111 |


Si queremos ocultar $10$, no tenemos que realizar cambios:

| 10010100 | 10010101 | 10010111 |

Y finalmente, si queremos ocultar $11$ un posible resultado será:

| 10010100 | 10010101 | (-1) 1001011**0** |

Hay cuatro opciones $00$, $01$, $10$ y $11$. Una de cada cuatro opciones,
no será necesario realizar ninguna modificación, mientras que las otras
tres modificaremos un solo bit. Por lo tanto, modificaremos un bit cada
3/4 de los casos. Puesto que cada una de estas modificacions nos permite
incrustar dos bits, tenemos una eficiencia de $\frac{2}{3/4}=2.66$.
Una eficiencia superior a la del LSB *matching*.



<br>
## Códigos de Hamming binarios

La idea propuesta en el apartado anterior puede generalizarse usando 
[Códigos de Hamming](https://en.wikipedia.org/wiki/Hamming_code). De 
esta manera podremos ocultar $p$ bits en un bloque de $2^p-1$ bits, 
modificando un solo bit.

Lo primero que vamos a necesitar es una matriz que contenga todas las 
combinaciones de vectores binarios de $p$ elementos, excepto el vector
de ceros. Por ejemplo, si queremos usar $p=3$, una posible matriz será 
la siguiente:

$ M=\begin{pmatrix} 
 0 & 0 & 0 & 1 & 1 & 1 & 1\\\
 0 & 1 & 1 & 0 & 0 & 1 & 1 \\\
 1 & 0 & 1 & 0 & 1 & 0 & 1  
\end{pmatrix} $

Para ocultar $p$ bits necesitamos un grupo de $2^p-1$ bits. Ese grupo
lo obtendremos del medio en el que queremos ocultar la información y
lo llamaremos vector *cover*, denotado por $c$.

Podemos calcular el mensaje que oculta de forma "natural" un vector
*cover* realizando la siguiente operación:

$ m = Mc $

Aunque puede darse el caso de que el mensaje $m$ coincida con los bits
que queremos incrustar, no ocurrirá de forma habitual. En este caso,
restaremos el mensaje $m$ que queremos ocultar de $Mc$:

$ v = Mc-m $

Lo que nos permitirá saber a que vector de la matriz $M$ corresponde.
La posición de este vector en la matriz $M$ nos dirá qué bit de $c$
tenemos que modificar (obteniendo el vector *stego* $s$) para que al
realizar la operación de extracción $Ms$ obtengamos el mensaje
que queremos ocultar.

Veamos un ejemplo sencillo con $p=3$ en el que vamos a ocultar el
mensaje $m=(1,1,0)$.

Dado que $p=3$ necesitaremos ocultar nuestro mensaje en grupos de 
$2^p-1=7$ bits, por lo que para cada incrustación necesitaremos un 
vector *cover* $c$ de 7 bits. Obtendremos dicho vector del medio y 
nos quedamos con su LSB. 

Supongamos que los bytes extraídos del medio son los siguientes:

| 11011010 | 11011011 | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |

Nos quedamos con los LSB:

| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 0 |

Por lo que nuestro vector $c$ será:

$ c=(0,1,1,0,1,1,0,0) $

Calculamos el mensaje que oculta este vector:

$ m = Mc = (1, 0, 0) $

Pero este no es el mensaje que queremos ocultar, puesto que queremos ocultar 
$m=(1,1,0)$. Por lo tanto tenemos que averiguar cómo modificar $c$ de manera 
que el resultado de la operación oculte nuestro mensaje. Es decir, necesitamos 
obtener la versión *stego* $s$ de nuestro vector $c$ para que $m = Mc = (1, 1, 0)$.

Primero tendremos que realizar la operación $Mc-m$ para localizar la posición
de $c$ que tenemos que modificar para obtener $s$. 

$ Mc-m = (0, 1, 0) $

que corre corresponde a la segunda columna de $M$:

$ M=\begin{pmatrix} 
 0 & 0 & 0 & 1 & 1 & 1 & 1\\\
 0 & 1 & 1 & 0 & 0 & 1 & 1\\\
 1 & 0 & 1 & 0 & 1 & 0 & 1  
\end{pmatrix} $


Esto significa que tenemos que cambiar el segundo bit de $c$ para obtener el 
vector *stego* $s$.

$ c=(0,1,1,0,1,1,0,0) $

$ s=(0,0,1,0,1,1,0,0) $

De esta manera, la operación de extracción dará como resultado nuestro mensaje:

$ m = Ms = (1, 1, 0) $

En este punto, únicamente tenemos que trasladar esta modificación al valor
inicial de los bytes extraídos del medio. Es decir, convertimos:


| 11011010 | 11011011 | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |

en:

| 11011010 | 11011010(-1) | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |

Aunque hemos realizado una operación -1, también nos habría servido una 
operación +1, puesto que lo que nos interesa es el valor del LSB:

| 11011010 | 11011100(+1) | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |



Veamos ahora como realizar estas operaciones usando el lenguaje de 
programación Python.

Lo primero que necesitamos es la matriz $M$:


```python
import numpy as np
M = np.array([
    [0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1]
])
```

Para incrustar el mensaje $m$ en el vector *cover* $c$ únicamente tenemos
que buscar la posición de $Mc-m$ en la matriz $M$ y modificarla:

```python
def embed(M, c, m):
    s = c.copy()
    vector_to_change = (M.dot(c)-m)%2
    position = 0
    for v in M.T: 
        if np.array_equal(v, vector_to_change):
            s[position] = (s[position] + 1) % 2
            break
        position += 1
    return s
```

Para extraer el mensaje incrustado bastará con realizar la operación $Ms$:

```python
def extract(M, s):
    return M.dot(s)%2
```

Repitamos el ejemplo anterior, ahora usando Python:

```python
m = [1, 1, 0]
M = prepare_M(3)
c = [ 0b11011010, 0b11011011, 0b11011011, 0b11011010,
      0b11011011, 0b11011010, 0b11011010 ]
s = embed(M, c, m)
new_m = extract(M, s)
```

```bash
>>> new_m
array([1, 1, 0])
```

Cuanto más grande sea $p$, más información podremos ocultar con menos 
modificaciones. Pero si usamos un $p$ demasiado grande nos encontraremos 
con que los grupos son tan grandes que nos quedamos rápidamente sin bytes 
en los que esconder información. Por ejemplo, en una imagen de 512x512 píxeles 
podemos esconder 18 bits modificando un solo bit. Sin embargo, ya no podemos 
ocultar nada más. Conviene pues seleccionar un $p$ adecuado, que nos permita 
ocultar información sin modificar mucho el medio, pero que al mismo tiempo 
nos ofrezca una capacidad aceptable.

Nos interesa tener en cuenta dos parámetros. El primero es el *payload*, 
es decir, qué porcentaje de información podemos almacenar por byte modificado. 
Esto podemos calcularlo con la siguiente fórmula:

${\alpha}_p = \frac{p}{ {2^p-1} } $

Por ejemplo, si usamos $p=3$, necesitaremos grupos de $2^3-1=7$ valores. Lo 
que nos da una capacidad de $$0,429$$ bits por valor.

El siguiente parámetro que nos interesa es la eficiencia de la inserción, que 
podemos calcular como:

$e_p = \frac{p}{ 1-2^{-p} }$

Siguiendo con nuestro ejemplo, la eficiencia para $p=3$ es de 3.429.

En el siguiente gráfico podemos ver la relación entre el *payload* y la eficiencia.


![efficiency](/stego/blog/resources/binary-codes.png?style=centerme)

Como se puede ver en la gráfica, la mayor eficiencia se consigue con *payloads* 
muy pequeños. 


<br>
## Códigos de Hamming n-arios

Teniendo en cuenta que las operaciones que realizamos son de tipo $\pm 1$, 
podríamos decir que no estamos aprovechando al máximo este sistema de inserción. 
Si en lugar de reemplazar el bit menos significativo de cada byte, optamos por 
realizar una operación $\pm 1$ estamos trabajando con tres posibles valores: 
+1, -1 y 0 (dejamos el valor como estaba). Con lo que, en lugar de usar un 
código binario, podemos usar un código ternario.

La teoría detrás de los códigos de Hamming n-arios es la misma que la de los 
códigos binarios. La única diferencia es que en lugar de realizar operaciones 
módulo $2$, para quedarnos con el LSB, las haremos módulo $n$, para quedarnos
con un valor n-ario (0, 1, ..., n-1).

Por otra parte, para ocultar información en un byte necesitaremos trabajar con 
el valor del byte módulo $n$. Es decir, para un código ternario ($n=3$), un 
byte con valor 233 correspondería aun valor ternario $235\pmod 3 = 2$. 

Veamos un ejemplo de incrustación, similar al del apartado anterior, usando
códigos ternarios ($n=3$). Vamos a usar $p=3$, es decir, que queremos insertar 
un símbolo ternario por cada modificación. Para ello, trabajaremos con  
grupos de $ \frac{n^p-1}{n-1} = \frac{3^3-1}{2} = 13$ bytes.

Nótese que en lugar de usar $2^p-1$ como en los códigos binarios, estamos 
usando $\frac{3^3-1}{3-1}$. Ambos casos proceden de la siguiente fórmula
que nos permite calcular el tamaño de los grupos de bytes en los que vamos
a ocultar la información:

$ \frac{n^p-1}{n-1} $


Supongamos que después de seleccionar un grupo de 13 bytes del medio en el
que queremos incrustar el mensaje, y de realizar la operación módulo 3,
obtenemos el siguiente vector *cover*:

$c=(0,1,0,0,2,1,2,2,2,0,1,0,2)$

Recordemos que también necesitamos una matriz que contenga en sus columnas 
todas las posibles combinaciones, excepto el vector de ceros. En este caso,
además, tendremos que eliminar los vectores linealmente dependientes.

Una opción sería la siguiente:

<small>
$ M=\begin{pmatrix} 
1 & 0 & 0& 0& 1& 1& 1& 0& 2& 1& 2& 1& 1\\\
0 & 1 & 0& 1& 0& 1& 1& 1& 0& 2& 1& 2& 1\\\
0 & 0 & 1& 1& 1& 0& 1& 2& 1& 0& 1& 1& 2
\end{pmatrix} $
</small>

Y finalmente, el mensaje que queremos ocultar. Ocultemos por ejemplo:

$ m=(2, 0, 2) $

Si calculamos el mensaje oculto en nuestro vector $c$ vemos que es:

$ m = Mc = (1, 1, 0) $

Lógicamente, no es el que queremos ocultar. Buscamos pues que 
columna de M es la responsable:

$$ Mc-m = (1, 2, 2) $$

Es la columna 17 de la matriz M. Por lo que, para obtener el vector *stego*
$s$ tenemos que sumar 1 al valor de esa posición en el vector $c$:

$c=(0,1,0,0,2,1,2,2,2,0,1,0,2,0,2,1,1,2,0,1,1,1,2,2,0,2)$
$s=(0,1,0,0,2,1,2,2,2,0,1,0,2,0,2,1,2,2,0,1,1,1,2,2,0,2)$


Por lo tanto, cuando el receptor del mensaje obtenga el vector *stego* del
medio, podrá extraer el mensaje mediante:

$m=Ms=(2,0,2)$


Veamos el código Python que nos permite realizar estas operaciones. Primero
necesitamos preparar la matriz $M$:


```python
M = np.array([
    [1, 0, 0, 0, 1, 1, 1, 0, 2, 1, 2, 1, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 2, 1, 2, 1],
    [0, 0, 1, 1, 1, 0, 1, 2, 1, 0, 1, 1, 2]
])
```

Para incrustar el mensaje $m$ en el vector *cover* $c$ únicamente tenemos
que buscar la posición de $Mc-m$ en la matriz $M$ y modificarla:


```python
import numpy as np
def embed(M, c, m, n):
    s = c.copy()
    vector_to_change = (M.dot(c)-m)%n
    position = 0
    for v in M.T: 
        if np.array_equal(v, vector_to_change):
            s[position] = (s[position] + 1) % 2
            break
        position += 1
    return s
```

Para extraer el mensaje incrustado bastará con realizar la operación $Ms$:

```python
def extract(M, s, n):
    return M.dot(s)%n
```

Repitamos ahora el ejemplo usando Python:

```python
m = [2, 0, 2]
M = prepare_M(3, 3)
c = [0,1,0,0,2,1,2,2,2,0,1,0,2]
s = embed(M, c, m, 3)
new_m = extract(M, s, 3)
```

```bash
>>> new_m
array([2, 0, 2])
```



Además de usar técnicas de inserción $$\pm 1$$, podemos usar técnicas 
$$\pm k$$ siendo $k$ cualquier valor que nos interese. Sin embargo, 
cuanto mayor sea $k$ mayor será la distorsión introducida, por lo que 
puede no ser apropiado seleccionar valores demasiado grandes. 

Si hemos usado códigos ternarios para la inserción $\pm 1$, con la 
inserción $\pm 2$ tendremos que usar códigos quintarios, puesto que 
tenemos cinco operaciones posibles: -2, -1, 0, +1 y +2. 

En este caso el proceso sería es el mismo que antes, cambiando el valor del 
módulo a $n=5$. Sin embargo, si usamos $p=3$ tendríamos que usar grupos de 
$\frac{n^p-1}{n-1}=\frac{5^3-1}{4}=31$ bytes. 

La misma idea serviría para otros valores de $k$ y $n$.


En la siguiente gráfica puede verse una comparativa de diferentes códigos 
n-arios. Es necesario ajustar las fórmulas para calcular el *payload* y 
la eficiencia con el valor de $n$. Para calcular el *payload* tenemos:

${\alpha}_p = \frac{p \log_2 n}{(n^p-1)/(n-1)}$

Y para calcular la eficiencia:

$e_p = \frac{p \log_2 n}{1-n^{-p}}$

Esto nos permite dibujar una gráfica para ver la eficiencia respecto el
*payload* para diferentes valores de $p$ y $n$:

![efficiency](/stego/blog/resources/n-ary-codes.png?style=centerme)


Como se puede ver en las gráficas, cuanto mayor es $n$ mayor es la eficiencia 
del método. Sin embargo, aumentar demasiado $n$ implica trabajar con valores
de $k$ quizás demasiado grandes, que  pueden distorsionar mucho el medio y 
hacer que el método esteganográfico sea más detectable.


<br>
## Referencias

1. Fridrich, J. (2009). Steganography in Digital Media: Principles, Algorithms, 
   and Applications. Cambridge University Press.



