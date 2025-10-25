---
layout: page
title: "Esteganografía para programadores Python"
subtitle: "Técnicas de incrustación" 
noindex: false
meta-title: "Esteganografía para programadores Python: Técnicas de incrustación"
meta-description: "Capítulo 'Técnicas de incrustación' del libro 'Esteganografía para programadores Python'"
meta-keywords: "esteganografía, Python"
lang-suffix: "-es"
comments: true
---

<center style='margin-bottom:30px'>
[ &nbsp; <a href='/books-es'>Índice</a> ]
</center>





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

1. [Incrustación de información oculta](#incrustación-de-información-oculta)
2. [Minimizando el impacto de la incrustación](#minimizando-el-impacto-de-la-incrustación)
    1. [Incrustación de bits en el LSB](#incrustación-de-bits-en-el-lsb)
    2. [Incrustar más bits con menos modificaciones](#incrustar-más-bits-con-menos-modificaciones)
    3. [Matrix Embedding](#matrix-embedding)
    4. [Cómo evitar zonas detectables](#cómo-evitar-zonas-detectables)

<br>


## Incrustación de información oculta

El principal objetivo de la esteganografía es pasar desapercibida, siendo la **indetectabilidad** su propiedad más crucial. No obstante, esta característica depende en gran medida de la cantidad de información que se oculta. Por ejemplo, modificar un solo bit en toda una imagen suele ser prácticamente imposible de detectar, mientras que alterar un bit en cada píxel de la imagen podría ser fácilmente detectable. Por lo tanto, existe un compromiso entre la cantidad de información que se puede ocultar y el grado de detectabilidad del uso de esteganografía en un medio. Este compromiso lo exploraremos detenidamente en la sección **Minimizando el impacto de la incrustación**, donde analizaremos cómo minimizar la cantidad de modificaciones necesarias para incrustar información. Cabe destacar que la indetectabilidad está también relacionada con la alteración de las propiedades estadísticas del medio, como por ejemplo las propiedades estadísticas de las imágenes, del audio, etc. Estos aspectos los estudiaremos más adelante, en los capítulos dedicados a cada uno de los medios.

En este capítulo, nos centraremos en cómo incrustar los bits de un mensaje dentro de una secuencia de números, normalmente números enteros. Nuestro enfoque será genérico, aplicable independientemente del tipo de medio al que pertenezcan estos números. En capítulos posteriores, veremos cómo estos números pueden corresponder a diferentes tipos de datos: desde los bytes que forman los píxeles de una imagen, hasta las muestras de un audio, pasando por los coeficientes usados en imágenes comprimidas en JPEG, entre otros. Si bien pueden requerirse ajustes específicos para cada medio, las técnicas de incrustación que aplicaremos serán fundamentalmente las mismas.

Durante este capítulo, trabajaremos con datos organizados como listas, o vectores unidimensionales. En capítulos futuros, abordaremos estructuras de datos más complejas. Por ejemplo, las imágenes se representan frecuentemente en formatos bidimensionales o tridimensionales, especialmente cuando se incluye el color. Sin embargo, esto no influirá en nuestro enfoque actual, ya que cualquier vector multidimensional puede transformarse en una lista unidimensional y viceversa.

En este aspecto, cabe destacar que nos referiremos a los vectores *cover* como aquellos valores extraídos directamente del medio original sin alteraciones. Mientras que los vectores *stego* serán aquellos que hayan sido modificados para incorporar la información deseada en el vector cover.

<br>
## Minimizando el impacto de la incrustación

La indetectabilidad es la propiedad más importante de la esteganografía. Cuando un método de esteganografía es detectable, su uso deja de tener sentido. Si sabemos que un atacante puede determinar con facilidad que estamos usando esteganografía, esta pierde su interés. Podríamos haber usado directamente la criptografía, que ya se encarga de evitar que un atacante lea el mensaje, ahorrándonos la complejidad técnica añadida por la esteganografía. Por ello, es necesario estudiar la forma en la que se puede detectar el uso de esteganografía. Así, podremos desarrollar técnicas que nos permitan construir métodos más difíciles de detectar.

Empezaremos estudiando cómo modificar un medio sin destruir su contenido, es decir, cómo realizar modificaciones mínimas que nos permitan incrustar información, sin que, al hacerlo, alteremos tanto el contenido como para que el usuario lo perciba.

Continuaremos estudiando diferentes técnicas de codificación que nos permitirán incrementar la cantidad de información oculta al mismo tiempo que reducimos el número de modificaciones realizadas. Estas técnicas nos resultarán muy útiles, ya que, con menos alteraciones y para la misma cantidad de información, el método será más difícil de detectar.

Finalmente, estudiaremos diferentes métodos que nos permitirán esquivar determinadas zonas del medio durante la incrustación. Estas técnicas nos permiten analizar el medio antes de ocultar el mensaje para decidir en qué partes es más seguro ocultar información y en qué partes no debemos modificar el medio porque sería muy detectable.

<br>
### Incrustación de bits en el LSB

Cuando incrustamos información en un medio, lo primero que necesitamos saber es cómo hacerlo sin destruir el contenido del medio. Por ejemplo, si modificamos los píxeles de una imagen, o las muestras de un audio, no queremos que el usuario pueda percibir dichas alteraciones. Si, debido a la incrustación de un mensaje, la imagen queda visualmente deteriorada o el audio no se escucha correctamente, el método de esteganografía no estará cumpliendo su cometido.

La modificación mínima que podemos realizar sobre un valor numérico, habitualmente un número entero, es una modificación de una unidad. Es decir, sumarle o restarle 1. En función del medio con el que estemos trabajando, quizás podríamos hacer modificaciones incluso mayores, lo que nos permitiría incrustar más información. Pero, de momento, lo que nos interesa es la indetectabilidad. Y para ello, cuanto menos modifiquemos los datos del medio, mejor.

Modificar un número entero en una unidad supone modificar su LSB, es decir, su bit menos significativo. El LSB es el bit de más a la derecha, cuando representamos el número en código binario.

Por ejemplo, el número $50$, en binario, se representa como $110010$. Podemos obtener su representación en binario fácilmente usando Python:

```python
>>> bin(50)
'0b110010'
```

En este caso, su LSB, es decir, su bit de la derecha, es $0$. Por lo tanto, si modificamos el valor en una unidad, esto va a suponer un cambio en su LSB. Podemos verlo tanto si sumamos $1$, como si restamos $1$:

```python
>>> bin(51)
'0b110011'
>>> bin(49)
'0b110001'
```

Así, para ocultar un bit en un valor numérico procedente del medio que queremos modificar, bastará con sumar o restar $1$ si el LSB no coincide con el que queremos ocultar, o dejarlo tal y como está si ya coincide.

Existen, básicamente, dos formas de realizar esta operación. La primera, y con mucha diferencia, la más usada, aunque también la más insegura, se conoce por su denominación inglesa: **LSB *replacement*** y consiste en sustituir el LSB del valor a modificar por un bit del mensaje. La segunda, menos frecuente, aunque más segura, se conoce por su denominación inglesa: **LSB *matching*** y consiste en sumar o restar $1$ del valor a modificar para hacerlo coincidir con el bit del mensaje que se quiere ocultar.

Empezaremos por ver cómo funciona el LSB *replacement*. En este caso, nuestro objetivo será sustituir el bit menos significativo del valor que queremos modificar por el bit del mensaje que queremos incrustar. Para ello, lo que haremos es poner un $0$ en el LSB del valor usando una operación AND para después poner el valor del bit que queremos incrustar, usando una operación OR:

```python
>>> bin( (51 & ~1) | 1 )
'0b110011'
>>> bin( (51 & ~1) | 0 )
'0b110010'
>>> bin( (50 & ~1) | 1 )
'0b110011'
>>> bin( (50 & ~1) | 0 )
'0b110010'
```

Esta forma de inserción es muy fácil de implementar. Podemos incrustar un bit en una sola línea de código usando operaciones a nivel de bit, que prácticamente todos los lenguajes de programación soportan. En las líneas $1$ y $5$ vemos cómo incrustar un $1$ en el valor $51$, mientras que en las líneas $3$ y $7$, vemos cómo incrustar un $0$ en el valor $50$. Sin embargo, como se ha comentado anteriormente, esta forma de inserción no es nada recomendable, puesto que existen toda una serie de ataques, conocidos como **ataques estructurales** [[Fridrich:2001:rs](/stego/books/stegopython/references-es/#fridrich2001rs), [Dumitrescu:2003:spa](/stego/books/stegopython/references-es/#dumitrescu2003spa), [Ker:2005:structural](/stego/books/stegopython/references-es/#ker2005structural), [ker:2008:structural](/stego/books/stegopython/references-es/#ker2008structural), [Fillatre:2012:structural](/stego/books/stegopython/references-es/#fillatre2012structural)], que permiten detectarla con bastante fiabilidad. No entraremos en detalle sobre qué son y cómo funcionan los ataques estructurales, baste decir que dejan herida de muerte a la técnica LSB *replacement*, por lo que, aunque es muy popular, no es conveniente usarla.

Ahora veremos cómo funciona el LSB *matching*. En este caso, queremos realizar una operación $+1$ o $-1$ para que cambie el LSB, eligiendo entre $+1$ o $-1$ aleatoriamente. El procedimiento es muy similar al anterior, primero ponemos el LSB a 0 y después sumamos o restamos $1$:

```python
>>> if 50%2 != 1:
...     bin(50+random.choice([1, -1]))
...
'0b110001'
>>> if 50%2 != 0:
...     bin(50+random.choice([1, -1]))
...
>>> if 51%2 != 1:
...     bin(50+random.choice([1, -1]))
...
>>> if 51%2 != 0:
...     bin(50+random.choice([1, -1]))
...
'0b110011'
```

Existen otras formas de realizar esta operación, pero la que hemos usado es bastante ilustrativa. Usamos la operación módulo (%), que nos da el resto de la división. Es decir, que al realizar una operación $\%2$ obtenemos el LSB. En la línea $1$ queremos incrustar un $1$ en el número $50$. Como su LSB no es $1$, se entra en el bloque `if` y entonces sumamos o restamos $1$. La selección es aleatoria, realizada con el módulo `random` de Python, cuya función `choice` nos permite elegir aleatoriamente un elemento de la lista pasado como parámetro. En la línea $5$ vemos que, dado que $50$ ya tiene el LSB a $0$, no se entra en el bloque `if`, puesto que su LSB ya es correcto. En las líneas $8$ y $11$ vemos como incrustar bits en el número $51$.

Este proceso puede parecer un poco más tedioso que el anterior. Quizás este sea el motivo por el que el LSB *replacement* goza de mucha más popularidad que el LSB *matching*. O quizás porque el primero surge en la mente de cualquier programador que quiere modificar un LSB de forma mucho más directa que el segundo. En cualquier caso, uno puede ver que existen en Internet muchísimas herramientas disponibles que usan LSB *replacement*, mientras que el LSB *matching* es poco frecuente. Cuando, en realidad, el segundo es mucho más difícil de detectar que el primero. Mientras que realizar una serie de modificaciones $\pm1$ produce una serie de cambios muy similares al ruido que ya contienen medios digitales como las imágenes o el audio, el LSB *replacement* es una operación asimétrica que introduce una gran cantidad de anomalías estadísticas que pueden ser detectadas.

<br>
### Incrustar más bits con menos modificaciones

En el apartado anterior, hemos visto cómo incrustar un bit en un valor entero modificando su LSB. La eficiencia de este tipo de inserción suele ser de dos bits por valor modificado (dos bits por píxel en imágenes, dos bits por muestra en audio, etc.). El motivo por el que la eficiencia es 2 y no 1 es porque consideramos que el LSB del medio que queremos modificar tiene un valor aleatorio. Si el LSB tiene un valor aleatorio, estadísticamente, la mitad de los valores en los que queramos incrustar información ya tendrán un LSB igual al del bit que queremos incrustar, y no tendremos que modificarlos. Como no será necesario modificar la mitad de los valores, estaremos incrustando, de media, dos bits por cada valor modificado.

En este punto, uno puede preguntarse si una eficiencia de 2 bits por valor modificado es lo mejor que podemos obtener. La respuesta es que no, ya que puede mejorarse significativamente. Podemos alcanzar eficiencias muy altas, en las que, con solo unas pocas modificaciones, incrustaremos una gran cantidad de bits. Este es el propósito de este apartado.

Empezaremos con un sencillo truco que permite ver cómo se puede incrementar la eficiencia de un método de incrustación. Necesitamos tres valores enteros en los que vamos a incrustar información modificando sus LSB. Llamaremos a estos valores A, B y C:

<table>
  <tr><td>A</td><td>B</td><td>C</td></tr>
</table>


Vamos a incrustar dos bits $m_1$ y $m_2$, y lo haremos realizando el cálculo siguiente:

$$
m_1=\text{LSB}_A \oplus \text{LSB}_B
$$
$$
m_2=\text{LSB}_B \oplus \text{LSB}_C
$$

Es decir, realizando operaciones XOR entre los LSB de los valores A, B y C.

Aplicar este método es muy sencillo. Si $m_1$ y $m_2$ ya tienen los valores que queremos ocultar, no tenemos que hacer nada. Si ni $m_1$ ni $m_2$ tienen los valores que queremos incrustar, únicamente tendremos que cambiar el LSB de B. Si el que no coincide es $m_1$ cambiaremos el LSB de A, y si el que no coincide es $m_2$ cambiaremos el LSB de B. Con esta sencilla técnica, podemos incrustar dos bits, modificando solo uno.

Recordemos, que las operaciones XOR se realizan conforme a la siguiente tabla:

| $A$ | $B$ | $A \oplus B$ |
|----:|----:|:------------:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

*Tabla de verdad de XOR*

Veamos un ejemplo con los siguientes valores:

|  A  |  B  |  C  |
|:---:|:---:|:---:|
| 148 | 149 | 151 |
|-----|-----|-----|

Cuya representación en binario es la siguiente:

| A | B | C |
|:-:|:-:|:-:|
| 10010100 | 10010101 | 10010111 |
|----------|----------|----------|

Usaremos la técnica LSB *matching*, que hemos visto anteriormente. Es decir, realizaremos las modificaciones del LSB mediante una operación $+1$ o $-1$ escogida aleatoriamente.

Vamos a ver, uno a uno, todos los posibles casos, teniendo en cuenta que los valores iniciales de $m_1$ y $m_2$ son los siguientes:

$$
m_1 = 0 \oplus 1 = 1
$$
$$
m_2 = 1 \oplus 1 = 0
$$

Los posibles casos son los siguientes:

1. **Incrustación de $m_1=0$ y $m_2=0$**:  
   Puesto que el único bit que no coincide es $m_1$, tenemos que modificar el LSB de A.

    | A | B | C |
    |:-:|:-:|:-:|
   | (+1) 10010101 | 10010101 | 10010111 |
   |---------------|----------|----------|

2. **Incrustación de $m_1=0$ y $m_2=1$**:  
   Dado que ni $m_1$ ni $m_2$ coinciden, tenemos que modificar el LSB de B.

    | A | B | C |
    |:-:|:-:|:-:|
   | 10010100 | (-1) 10010100 | 10010111 |
   |----------|---------------|----------|

3. **Incrustación de $m_1=1$ y $m_2=0$**:  
   Tanto $m_1$ como $m_2$ coinciden, por lo que no tenemos que realizar modificaciones.

    | A | B | C |
    |:-:|:-:|:-:|
   | 10010100 | 10010101 | 10010111 |
   |----------|----------|----------|

4. **Incrustación de $m_1=1$ y $m_2=1$**:  
   Puesto que el único bit que no coincide es $m_2$, tenemos que modificar el LSB de C.

    | A | B | C |
    |:-:|:-:|:-:|
   | 10010100 | 10010101 | (-1) 10010110 |
   |----------|----------|----------------|

Si ahora analizamos la eficiencia de este método, vemos que hay cuatro opciones para los bits $m_1$ y $m_2$ a incrustar: $00$, $01$, $10$ y $11$. Puesto que hay cuatro opciones y únicamente una puede coincidir con los bits que queremos ocultar, estadísticamente, una de cada cuatro veces no tendremos que realizar ningún cambio. Es decir, $\frac{3}{4}$ de las veces modificaremos un bit. Puesto que cada modificación nos permite incrustar dos bits, la eficiencia de este método es de $\frac{2}{3/4} \approx 2.66$.

Por lo tanto, este método es más eficiente que el presentado anteriormente, que solo nos ofrecía una eficiencia de $2$.

Este método se puede generalizar para construir un conjunto de técnicas conocidas como *matrix embedding*. Las veremos en detalle en el apartado siguiente.

<br>
### *Matrix Embedding*

La técnica descrita previamente puede ampliarse mediante el uso de *matrix embedding* con códigos de Hamming binarios. Esta metodología permite insertar $p$ bits de información en vectores de $2^p - 1$ bits, realizando únicamente una modificación en el vector.

Inicialmente, se construye una matriz que contiene todas las combinaciones posibles de vectores binarios de longitud $p$ como columnas, excluyendo el vector nulo. Por ejemplo, para $p = 3$, una posible matriz $M$ sería:

$$
M = \begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

Para insertar $p$ bits de información, se selecciona un bloque de $2^p - 1$ bits del medio portador, denominado vector de cobertura $c$. El mensaje que este vector *cover* representa se calcula mediante la operación matricial:

$$
m = M  c
$$

Es fundamental recordar que todas las operaciones se realizan en aritmética módulo 2.

En caso de que el mensaje $m$ no coincida con los bits que se desean insertar, se procede a ajustar el vector de cobertura $c$ para que refleje el mensaje deseado. Esto se logra calculando la diferencia entre el mensaje objetivo y el mensaje actual:

$$
v = M c - m
$$

La posición del vector $v$ en la matriz $M$ indica qué bit del vector *cover* $c$ debe modificarse para obtener el vector *stego* $s$, de modo que al aplicar la operación $M s$ se recupere el mensaje deseado.

Consideremos un ejemplo con $p = 3$, donde se desea insertar el mensaje $m = (1, 1, 0)$. Dado que $p = 3$, se trabaja con bloques de $2^p - 1 = 7$ bits. Supongamos que el vector de cobertura $c$ es $(0, 1, 0, 1, 1, 0, 1)$. Calculamos:

$$
M c =
\begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
\cdot
\begin{pmatrix}
0 \\
1 \\
0 \\
1 \\
1 \\
0 \\
1
\end{pmatrix}
=
\begin{pmatrix}
1 \\
0 \\
1
\end{pmatrix}
$$

Luego, se calcula la diferencia:

$$
v = (1, 0, 1) - (1, 1, 0) = (0, 1, 1)
$$

El vector $v = (0, 1, 1)$ corresponde a la segunda columna de la matriz $M$, lo que indica que se debe modificar el segundo bit del vector de cobertura $c$. Al hacerlo, se obtiene el vector estego $s = (0, 0, 0, 1, 1, 0, 1)$, que al aplicar $M \cdot s$ produce el mensaje deseado $(1, 1, 0)$.

Esta técnica permite una inserción eficiente de información, ya que se pueden ocultar $p$ bits modificando únicamente un bit en el bloque de $2^p - 1$ bits, mejorando significativamente la eficiencia en comparación con métodos más simples como la esteganografía LSB.

A continuación, se muestra un ejemplo práctico de implementación del método de inserción de datos utilizando códigos de Hamming binarios en Python. Se ilustra cómo generar la matriz $M$, insertar un mensaje en un vector *cover* y extraerlo posteriormente.

Recordemos que para construir la matriz $M$, se consideran todas las combinaciones posibles de vectores binarios de longitud $p$, excluyendo el vector nulo. Podemos hacerlo en Python utilizando la biblioteca `numpy`:

```python
import numpy as np

M = np.array([
    [0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1]
])
```

Para insertar un mensaje $m$ en un vector de cobertura $c$, se calcula la diferencia entre $M \cdot c$ y $m$. Luego, se identifica la columna de $M$ que coincide con esta diferencia y se modifica el bit correspondiente en $c$:

```python
def embed(M, c, m):
    s = c.copy()
    col_to_find = (np.dot(M, c) - m) % 2
    for position, v in enumerate(M.T):
        if np.array_equal(v, col_to_find):
            s[position] = (s[position] + 1) % 2
            break
    return s
```

La extracción del mensaje se realiza multiplicando la matriz $M$ por el vector estego $s$ y aplicando la operación módulo 2:

```python
def extract(M, s):
    return np.dot(M, s) % 2
```

A continuación, se muestra un caso de uso en el que se oculta el mensaje $m = [1, 1, 0]$ dentro de un vector $c$, cuyos valores se obtienen de los bits menos significativos de ciertos bytes:

```python
>>> m = np.array([1, 1, 0])
>>> c = np.array([0b11011010, 0b11011011, 0b11011011,
...               0b11011010, 0b11011011, 0b11011010,
...               0b11011010]) % 2
>>> s = embed(M, c, m)
>>> new_m = extract(M, s)
>>> m
array([1, 1, 0])
>>> new_m
array([1, 1, 0])
```

Esto demuestra que el mensaje ha sido insertado y recuperado correctamente sin errores. Todas las operaciones se realizan en aritmética módulo 2 para garantizar la coherencia en el proceso de codificación y decodificación.

Los códigos de Hamming binarios permiten ocultar $p$ bits de información en bloques de $2^p - 1$ bits, realizando únicamente una modificación por vector. Por lo tanto, la eficiencia $e_p$ se calcula como:

$$
e_p = \frac{p}{1 - 2^{-p}}
$$

Por otro lado, el *payload* representa el porcentaje de información que se puede almacenar por cada byte modificado. Para los códigos de Hamming binarios, el *payload* $\alpha_p$ se determina mediante la fórmula:

$$
\alpha_p = \frac{p}{2^p - 1}
$$

Por ejemplo, si utilizamos $p = 3$, necesitaremos grupos de $2^3 - 1 = 7$ bits, lo que nos da una capacidad de:

$$
\alpha_3 = \frac{3}{7} \approx 0.429
$$

bits por byte. La eficiencia en este caso sería:

$$
e_3 = \frac{3}{1 - 2^{-3}} = \frac{3}{0.875} \approx 3.429
$$

Esto significa que, en promedio, se pueden ocultar aproximadamente 3.429 bits de información por cada modificación realizada en el medio. Pero es importante notar que, aunque aumentar el valor de $p$ incrementa la eficiencia, también requiere vectores más grandes, lo que puede limitar la cantidad total de información que se puede ocultar en un medio dado. Por lo tanto, es crucial seleccionar un $p$ adecuado que ofrezca un equilibrio entre eficiencia y capacidad total de almacenamiento.

Si comparamos la técnica de *matrix embedding* usando códigos de Hamming binarios, con la técnica tradicional de LSB *matching*, podemos ver que la ventaja es evidente. En LSB *matching*, para incrustar un bit en un valor (píxel, muestra de audio, etc), necesitamos realizar, de media $0.5$ modificaciones. Esto es así porque, estadísticamente, la mitad de los valores ya tendrán el valor del LSB que queremos incrustar, de casualidad, mientras que la otra mitad no, y lo tendremos que modificar. Así, por cada modificación, incrustaremos dos bits. La eficiencia del método es, pues, de dos bits por valor. Sin embargo, si usamos *matrix embedding* con $p=2$, estaremos incrustando $2$ bits en cada bloque de $2^2-1=3$ bits, y para ello, estaremos modificando únicamente un bit. Por lo tanto, la eficiencia del método es de $e_p = \frac{p}{1 - 2^{-p}}=\frac{2}{1 - 2^{-2}}=2.66$. Para $p=3$, la eficiencia será de $e_p=\frac{3}{1 - 2^{-3}}=3.4286$, etc. Veamos una tabla a continuación, en la que también se muestra el tamaño del bloque y el tamaño relativo del *payload*:

| **$p$** | **block size** | **payload** | **$e_p$** |
|:-------:|:--------------:|:-----------:|:---------:|
| 2 | 3 | 0.6667 | 2.66 |
| 3 | 7 | 0.4286 | 3.4286 |
| 4 | 15 | 0.2667 | 4.2667 |
| 5 | 31 | 0.1613 | 5.1613 |
| 6 | 63 | 0.0952 | 6.0952 |
| 7 | 127 | 0.0551 | 7.0551 |
| 8 | 255 | 0.0314 | 8.0314 |
| 9 | 511 | 0.0176 | 9.0176 |

*Evolución de la capacidad en función de $p$.*

Tal y como se puede ver en la tabla, para $p=2$ el esquema ya es sustancialmente mejor que LSB *matching*, puesto que pasamos de una eficiencia de $2$ a una eficiencia de $2.66$. Pero además, a medida que incrementamos $p$ el método es cada vez más eficiente. Por ejemplo, para $p=9$, la eficiencia es de $9.0175$, lo que significa que, de media, somos capaces de incrustar más de 9 bits por cada bit modificado. Esto tiene un impacto directo en la detectabilidad del método, puesto que para la misma cantidad de información incrustada, el número de modificaciones del medio es menor, y en consecuencia, menos detectable.

Sin embargo, esto tiene un precio, que también podemos observar en la tabla. A medida que $p$ crece, el *payload* relativo baja. Es decir, que cuanto más grande es $p$ más bits necesitamos en cada bloque, lo que acaba limitando la cantidad total de información que queremos ocultar. Por lo tanto, tendremos que encontrar un equilibrio entre la cantidad de datos a ocultar y la cantidad de modificaciones que queremos realizar en el medio. Esto dependerá, de la aplicación que le queramos dar al método de esteganografía y de cuáles sean sus requisitos.

<br>
### Cómo evitar zonas detectables

Al incrustar información, hay que ser consciente de que cada medio dispone de unas propiedades estadísticas concretas y que estas van a ser alteradas durante la inserción del mensaje. Estas características estadísticas pueden cambiar a lo largo del medio, existiendo zonas donde una alteración es más evidente que en otras. Convendrá, por lo tanto, evitar alterar estas zonas.

Sin embargo, incrustar en unas zonas concretas no es algo trivial, pues ¿cómo podría saber el receptor del mensaje en qué zonas tiene que leer? Imaginemos que llegamos a un acuerdo con el receptor. Inventamos una fórmula o algún tipo de procedimiento que permita identificar si una zona del medio, o un conjunto de valores, es apropiado para incrustar el mensaje. Inevitablemente, la propia incrustación del mensaje, que modificará el medio, podrá hacer que la fórmula o procedimiento inventados varíen su resultado, generando casos en los que el receptor leerá donde el emisor no ha incrustado, o ignorará datos que debería leer. Así pues, es necesario un sistema que permita al receptor extraer el mensaje aunque no sepa dónde se ha incrustado. Este es el papel de los Wet Paper Codes o WPC [[Fridrich:2005:wpc](/stego/books/stegopython/references-es/#fridrich2005wpc)], así como de otros esquemas más sofisticados como los Syndrome Trellis Codes (STC) [[Filler:2011:stc](/stego/books/stegopython/references-es/#filler2011stc)].

El término Wet Paper Codes (códigos de papel mojado) surge de la siguiente metáfora: imaginemos una hoja de papel parcialmente mojada, en la que solo es posible escribir sobre las áreas secas, ya que intentar hacerlo en las zonas húmedas podría dañar el papel. De manera análoga, en esteganografía, buscamos incrustar información únicamente en las regiones consideradas seguras (zonas secas), evitando aquellas marcadas como vulnerables o no aptas para la modificación (zonas mojadas).

Matemáticamente, el problema de inserción se modela con la ecuación:

$$
D y = m
$$

donde:
- $D$ es una matriz compartida entre el emisor y el receptor,
- $y$ es el vector estego resultante tras la modificación del medio portador,
- $m$ es el mensaje que se desea ocultar.

El objetivo es modificar $y$ a partir de un vector de cobertura $x$ de manera que se cumpla la ecuación anterior, pero con la restricción de que ciertos valores de $x$ no pueden alterarse. Para resolver esto, se define un vector $v = y - x$, el cual indica qué posiciones han sido modificadas. Al reformular el problema, se obtiene:

$$
D v = m - D x
$$

Dado que algunas posiciones de $x$ son inalterables, se eliminan las columnas correspondientes de $D$ y las posiciones de $v$, obteniendo una nueva matriz $H$ y un nuevo vector $u$, lo que lleva a:

$$
H u = m - D x
$$

Este sistema se puede resolver utilizando técnicas de álgebra lineal, permitiendo determinar qué bits pueden modificarse sin afectar las restricciones impuestas por el medio.

**Ejemplo de Wet Paper Codes**

Supongamos que se tiene el siguiente vector de cobertura:

$$
x = (1,0,0,1,1,1,0)
$$

y que se desea ocultar el mensaje:

$$
m = (1,1,1)
$$

Emisor y receptor comparten la matriz $D$:

$$
D =
\begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

Sin embargo, supongamos que el primer bit de $x$ no puede modificarse. En este caso, la matriz $H$ se obtiene eliminando la columna correspondiente de $D$:

$$
H =
\begin{pmatrix}
0 & 0 & 1 & 1 & 1 & 1 \\
1 & 1 & 0 & 0 & 1 & 1 \\
0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

El siguiente paso es resolver la ecuación:

$$
H u = m - D x
$$

Calculando $D x$:

$$
D x =
\begin{pmatrix}
1 \\
1 \\
0
\end{pmatrix}
$$

$$
m - D x =
\begin{pmatrix}
1 \\
1 \\
1
\end{pmatrix}
-
\begin{pmatrix}
1 \\
1 \\
0
\end{pmatrix}
=
\begin{pmatrix}
0 \\
0 \\
1
\end{pmatrix}
$$

Resolviendo el sistema $H u = (0,0,1)$, obtenemos:

$$
u = (1,1,0,0,0,0)
$$

Al restaurar la posición no modificable, se obtiene el vector $v$:

$$
v = (0,1,1,0,0,0,0)
$$

Finalmente, se obtiene el vector estego $y$:

$$
y = x + v = (1,0,0,1,1,1,0) + (0,1,1,0,0,0,0) = (1,1,1,1,1,1,0)
$$

Cuando el receptor recibe $y$, puede extraer el mensaje original $m$ aplicando:

$$
D y = (1,1,1)
$$

Este ejemplo muestra cómo los Wet Paper Codes permiten ocultar información en un medio portador respetando las restricciones impuestas por ciertas posiciones no modificables, asegurando una inserción segura y adaptativa.

Un aspecto que puede presentar dificultades en la implementación de esta técnica en Python es la resolución del sistema $H u$. En el artículo original de *Wet Paper Codes* [[Fridrich:2005:wpc](/stego/books/stegopython/references-es/#fridrich2005wpc)] se presenta la técnica *LT Process*, que permite obtener una posible solución para $u$. Para quienes deseen profundizar en su implementación, se puede encontrar un código completo usando *LT Process* en:

[https://github.com/daniellerch/stegolab/tree/master/codes](https://github.com/daniellerch/stegolab/tree/master/codes)

No obstante, en este contexto no nos detendremos en esta parte, ya que nuestro interés principal radica en comprender la base teórica del método, que se ha presentado mediante las ecuaciones anteriores.

En la práctica, para aplicaciones avanzadas, se emplean técnicas más sofisticadas, como los *Syndrome Trellis Codes* (STC), que optimizan la inserción minimizando la distorsión introducida en el medio portador. Sin embargo, estos métodos son considerablemente más complejos y exceden los objetivos de este libro. En lugar de implementarlos manualmente, recurriremos a bibliotecas especializadas como pySTC, que proporcionan herramientas eficientes para la aplicación de estos algoritmos en escenarios reales. Sin embargo, quienes deseen profundizar también disponen de una implementación de STC básica en el mismo repositorio.

Veamos cómo utilizar STC a través de la librería pySTC. En este ejemplo, primero generamos una secuencia de bytes aleatorios (valores entre 0 y 255) para simular el medio en el que deseamos incrustar los datos. Luego, creamos un *array* del mismo tamaño para representar los costes de incrustación.

Estos costes determinan la dificultad de modificar cada byte: cuanto menor sea el coste asignado a un byte, mayor será la probabilidad de que se altere para insertar el mensaje. En cambio, los bytes con costes más altos tienen menos probabilidad de ser modificados, lo que nos permite proteger ciertas áreas del medio en las que los cambios serían más detectables.

Finalmente, incrustamos el mensaje en el medio y, posteriormente, lo extraemos.

```python
import pystc
import numpy as np

data = np.random.randint(0, 256, (1000,1), dtype=np.uint8)

costs = np.random.uniform(0, 1, (1000,1))

message = "Hello World".encode()
stego = pystc.hide(message, data, costs, costs, 32, mx=255, mn=0)

message_extracted = pystc.unhide(stego, 32)
```

```python
>>> message_extracted.decode()
Hello World
```

