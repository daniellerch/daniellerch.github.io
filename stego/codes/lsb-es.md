---
layout: page
title: "Incrustación de información en el LSB"
subtitle: "" 
noindex: false
meta-title: "Incrustación de información en el LSB"
meta-description: "Artículo acerca del uso de esteganografía incrustando información en el LSB"
---

> En este artículo vamos a ver cómo incrustar información en el bit menos significativo (LSB)
> de un byte. 

Este artículo pertenece al bloque: [Técnicas de codificación en esteganografía](/blog-es).


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

1. [Información en el bit menos significativo](#información-en-el-bit-menos-significativo)
2. [Dos técnicas habituales](#dos-tecnicas-habituales)
3. [Incrustación de la información con LSB *replacement*](#incrustación-de-la-información-con-lsb-replacement)
4. [Incrustación de la información con LSB *matching*](#incrustación-de-la-información-con-lsb-matching)
5. [Extracción de la información](#extraccion-de-la-información)
6. [Los peligros del LSB *replacement*](#los-peligros-del-lsb-replacement)
7. [Hacia una incrustación más eficiente](#hacia-una-incrustación-más-eficiente)



<br>
## Información en el bit menos significativo

El objetivo principal de la esteganografía es el de no ser detectado. Es por
ello que siempre se intentará modificar la información del medio de forma que
la modificación pase desapercibida. Además, será necesario modificar valores
que un estegoanalista no pueda predecir de forma sencilla. Dado que si se
puede conocer el valor original, cuando este no coincida con el valor del medio
se sabrá que ha sido modificado, lanzando fuertes sospechas del uso de 
esteganografía. Por ello, aquellos medios que contienen información cuyo valor
es difícil de modelar estadísticamente son especialmente aptos para esconder
información. Algunos medios de uso habitual en esteganografía son la
imágenes, el audio o el vídeo.
Incluso disponiendo de un medio con valores difíciles de modelar, conviene
realizar las mínimas modificaciones posibles. Y la modificación mínima que
podemos realizar sobre un byte es una modificación en una unidad.

Tomemos como ejemplo un byte con valor 160. Su representación en binario es 
la siguiente:

| 1 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |

Se ha marcado en negrita el bit menos significativo (LSB), que en este caso
tiene el valor 0. Es decir, que este byte, representa el valor del mensaje 0. 
Si este es el valor que queremos incrustar, no será necesario realizar
ninguna operación. Pero si el valor del mensaje que queremos incrustar es
el 1, tendremos que realizar una operación sobre el valor del byte que 
cambie el LSB.



<br>
## Dos técnicas habituales

Cuando se trata de incrustar información en el bit menos significativo de 
un byte existen dos técnicas habituales: el LSB *replacement* y el LSB
*matching*. La primera de ellas y más frecuente es una técnica **insegura**,
para la que existen múltiples ataques y consiste, simplemente, en sustituir 
el valor del LSB por el valor del mensaje.

Continuando con el ejemplo anterior, para incrustar un 1 en un byte con
valor 160:

| 1 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |

Lo único que tendremos que hacer es sustituir el LSB por 1:

| 1 | 0 | 1 | 0 | 0 | 0 | 0 | **1** |

Esta técnica se conoce como **LSB replacement** y no se recomienda su uso por
ser detectable. En el apartado "[Los peligros del LSB *replacement*](#los-peligros-del-lsb-replacement)" se explica qué hace a esta técnica insegura.

Otra forma de modificar el LSB consisten sumar 1 o restar 1 al valor del byte.
Por ejemplo, sumar 1 a:

| 1 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |

Nos dará como resultado:

| 1 | 0 | 1 | 0 | 0 | 0 | 0 | **1** |

Mientras que al restar uno obtendremos:

| 1 | 0 | 0 | **1** | **1** | **1** | **1** | **1** |

En ambos casos hemos modificado el LSB, por lo que ambos casos llevan 
incrustado un 1 como valore del mensaje. El segundo caso, sin embargo,
ha supuesto modificar 5 bits. Pero esto no debe considerarse más inseguro,
puesto que en ambos casos hemos modificado en valor del byte en una unidad.

Esta técnica se conoce como **LSB matching** o como incrustación &#177;1.



<br>
## Incrustación de la información con LSB *replacement*

Supongamos que disponemos de los siguientes valores, correspondientes a un 
grupo de bytes obtenidos del medio en el que queremos ocultar el mensaje:

| 160 | 60 | 53 | 128 | 111 | 43 | 84 | 125 |

Si obtenemos su valor en binario tenemos:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

Supongamos ahora que queremos ocultar un byte, por ejemplo el correspondiente 
al valor de la letra 'A' en codificación ASCII. Este valor corresponde al 
número 65, cuya representación en binario es la siguiente:

| 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 

Lo haremos sustituyendo el valor del bit menos significativo de cada valor:


| 1010000**0** | 0011110**1** | 0011010**0** | 1000000**0** | 
| 0110111**0** | 0010101**0** | 0101010**0** | 0111110**1** | 

De manera que nos quedarán los siguientes valores:

| 160 | 61 | 52 | 128 | 110 | 42 | 84 | 125 |


En los inicios de la esteganografía en imágenes digitales se pensó 
(erróneamente) que esta era la forma más apropiada de esconder información 
puesto que modificaba únicamente un bit. Desde un punto de vista intuitivo 
tiene mucho sentido, puesto que esta técnica nos permite insertar un bit de 
información modificando el valor del byte lo mínimo posible. Sin embargo 
esta operación introduce cambios significativos en la distribución estadística 
de los bytes, lo que la hace muy detectable. 

Veamos cómo incrustar un mensaje usando el lenguaje de programación Python. 
La primero que tenemos que hacer es convertir el mensaje en una lista de 
unos y ceros. Supongamos para este ejemplo, que ya disponemos de una lista
de los valores enteres que representan a los bytes:


```python
message_bits = []
message = [ord('A')] # data = [65]
for m in message:
    message_bits += [ (m>>i)&1 for i in range(8) ]
```

Si queremos obtener los datos de, por ejemplo, un archivo de texto, bastaría
con:

```python
f = open('secret_data.txt', 'r')
message = [ord(b) for b in f.read()]
```

Una vez disponemos de los bits del mensaje que queremos incrustar, solo
tenemos que recorrer los bytes correspondientes al medio en el que queremos
incrustar el mensaje (imagen, audio, vídeo, ...) e ir modificando su LSB
con el bit correspondiente al mensaje. 

Supongamos una variable ```cover``` que contiene los valores de los bytes
leídos del medio (suficientes bytes como para incrustar todo el mensaje) y
una variable ```stego``` de la misma longitud que ```cover```, en la que
guardaremos el estado del medio después de ocultar el mensaje. Entonces:


```python
cover = [ 160, 60, 53, 128, 111, 43, 84, 125 ]
stego = cover.copy()
for i in range(len(message_bits)):
    stego[i] = (cover[i] & ~1) | message_bits[i]
```


```bash
>> cover
[160, 60, 53, 128, 111, 43, 84, 125]
>>> stego
[160, 61, 52, 128, 110, 42, 84, 125]
```


El contenido de la variable ```cover``` procederá del medio en el que 
queremos incrustar información, que podrá ser una imagen, un archivo
de audio, un vídeo, etc. Se puede ampliar esta parte en las secciones
de [Esteganografía en imágenes](/blog-es) o de [Esteganografía en audio](/blog-es).




<br>
## Incrustación de la información con LSB *matching*

El LSB *matching* es una técnica que, desde el punto de vista del valor del
LSB, ofrece los mismos resultados que el LSB *replacement*. Sin embargo
esta ténica no introduce las anomalías estadísticas que introduce 
el LSB *replacement*, por lo que es la forma recomendada de incrustar 
información en el LSB.

Retomemos el ejemplo anterior para ver como se incrustaría información usando
LSB *matching*. Recordemos que usábamos los siguientes valores:


| 160 | 60 | 53 | 128 | 111 | 43 | 84 | 125 |

que en binario corresponden a:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

Para incrustar el mensaje sumemos o restemos 1 aleatoriamente a aquellos 
píxeles en los que el valor del LSB no coincide con el bit del mensaje que 
queremos ocultar:

| (+0) 1010000**0** | (+1) 0011110**1** | (-1) 0011010**0** | (+0) 1000000**0** | 
| (-1) 0110111**0** | (+1) 00101**100** | (+0) 0101010**0** | (+0) 0111110**1** | 

En este caso, el resultado es:

| 160 | 61 | 52 | 128 | 110 | 44 | 84 | 125 |

Con esta técnica estamos ocultando un bit en cada byte. 

En esteganografía, se toma como referencia el número total de bytes que tiene el
medio y la ocultación de un bit en cada byte como una capacidad del 100%. Por
lo tanto, diremos que una técnica tiene una capacidad o un *payload* del 100% 
si esconde un bit en cada valor. Así, un método que incruste un bit en cada cuatro
bytes tendrá una capacidad del 25%, mientras que un método que incruste dos bits
en cada byte tendrà una capacidad del 200%. Sin embargo, lo habitual será
trabajar con capacidad pequeñas, dado que cuanto más alta es la capacidad mas
inseguro (detectable) es el método.


Veamos ahora cómo incrustar un mensaje usando el lenguaje de programación Python. 
De la misma forma que en el apartado anterior, empezaremos conviertiendo los
valores que representan el mensaje en unos y ceros:


```python
message_bits = []
message = [ord('A')] # message = [65]
for m in message:
    message_bits += [ (m>>i)&1 for i in range(8) ]
```

A continuación los incrustaremos en los valores ```cover```. Aunque esta vez
lo haremos usando LSB *matching*, es decir, sumando o restando 1 aleatoriamente:


```python
import random
cover = [ 160, 60, 53, 128, 111, 43, 84, 125 ]
stego = cover.copy()
for i in range(len(message_bits)):
    if cover[i]%2 != message_bits[i]:
        stego[i] = cover[i] + random.choice([-1, +1])
```


```bash
>>> cover
[160, 60, 53, 128, 111, 43, 84, 125]
>>> stego
[160, 61, 54, 128, 110, 44, 84, 125]
```


Es importante tener en cuenta que se podría dar el caso de que la suma de 1 o -1
genere un resultado fuera de rango. Los bytes van de 0 a 255 por lo que no podemos
usar valores negativos o positivos mayores que 255. Es decir, que al incrustar un 
mensaje tendremos que controlar que nunca se resta 1 de los valores 0 y que nunca 
se suma 1 a los valores 255.



<br>
## Extracción de la información

Para extraer el mensaje únicamente tenemos que leer el LSB de los valores de 
los bytes correspondientes al medio que contiene el mensaje. El mismo procedimiento
es válido para leer datos incrustados con LSB *replacement* y con LSB *matching*.

Veamos como realizar esta operacion usando Python. Primero extraemos los bits:

```python
message_bits = [ s%2 for s in stego ]
```

En este caso, la variable ```stego``` contiene los valores de los bytes extraídos
del medio. 

Ahora tenemos que agrupar los bits de 8 en 8 para formar el valor de los bytes 
del mensaje original:


```python
message_ex = []
value = 0
for i in range(len(message_bits)):
    if i%8==0 and i!=0:
        message_ex.append(value)
        value = 0
    value |= message_bits[i] << i%8

```


<br>
## Los peligros del LSB *replacement*

Hemos comentado que el LSB *replacement* es inseguro, lo que en esteganografía
significa que es detectable. Esto es debido a que la incrustación se realizad
de una forma asimétrica, es decir, que no existe la misma probabilidad de 
incrementar un valor que de decrementarlo. 

Cuando sustituimos el LSB de un valor par (un LSB con valor 0) por un bit del 
mensaje con valor 1, el efecto que se produce es el mismo que el de añadir uno 
a ese valor. De la misma manera, cuando sustituimos el LSB de un píxel con valor 
impar (un LSB con valor 1) por un bit del mensaje con valor 0, el efecto que se 
produce es el mismo que el de restar uno a ese valor. Esto es una operación
asimétrica, en el sentido de que nunca se suma 1 a un valor impar y nunca se
resta uno a un valor par.

Para ver qué implica incrustar información de esta manera es muy ilustrativo
dibujar un histograma de valores. Es decir, un gráfico de barras en el que cada
barra representa la cantidad de valores iguales.

La siguiente grafica corresponde a una imagen que no ha sido alterada usando
LSB *replacement*. 

![cover](/stego/codes/resources/cover_hist.png?style=centerme)


En cambio, la siguiente grafica corresponde a una imagen a la que se le ha 
incrustado un mensaje usando LBB *replacement*. 

![stego](/stego/codes/resources/stego_hist.png?style=centerme)


En el histograma se puede apreciar que los pares de barras consecutivos tienden
a obtener una altura similar. 

Al sumar uno a las barras pares, estas ceden parte de sus valores a la barra
posterior, mientra que al restar uno a las barras impares, estas ceden parte
de sus valores a la barra anterior. Por ello, los pares de barras consecutivas
par-impar tienen a tomar una altura similar.

Existe toda una familia de ataques dedicados a explotar esta anomalía 
estadística introducida por el LSB *replacement*. Estos ataques se conocen como
**ataques estructurales** y pueden ser explotados con herramientas de 
estegoanálisis como [Aletheia](https://github.com/daniellerch/aletheia). 
En [Ataque práctico a esquemas LSB-R] se explica como usar esta herramienta
para detectar este tipo de esquemas de esteganografía, usados por muchas 
herramientas populares como [OpenStego](https://www.openstego.com/) y 
[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html).


<br>
## Hacia una incrustación más eficiente

Un concepto muy importante en esteganografía es el de **eficiencia** de la 
incrustación. Una eficiencia de 1 correspondería a una tècnica de inserción 
que modificase todos los  bytes en los que incrusta un bit. Es decir, una 
modificación por cada bit insertado. 

Sin embargo, las dos técnicas que hemos descrito son más eficientes. Pues, 
estadísticamente, la mitad de los bytes en los que queremos ocultar información
ya tendrán como valor del LSB el bit del mensaje que queremos incrustar, por 
lo que no será necesario modificarlo. Así pues, estaremos incrustando un bit
en cada byte pero solo estaremos modificando la mitad de los bytes. En
consecuencia, la eficiencia de estas técnicas es de 2.

Aunque pueda sorprender, existen técnicas todavía más eficientes. Técnicas que
nos permiten incrustar información con eficiencias muy superiores. Por ejemplo,
una incrustación basada en códigos de Hamming nos permite incrustar $p$ bits
en $2^p-1$ bytes realizando una sola modificación. Si usásemos, por ejemplo,
$p=3$ podríamos incrustar 3 bits en cada bloque de 7 bytes con una sola 
modificación. Nuestra eficiencia sería en este caso de 3.429.

Existen muchas famílias de códigos que nos permiten realizar este tipo de
incrustaciones eficientes. Estos temas se tratan con cierto detalle en
[Técnicas de incrustación eficiente](/stego/codes/efficient-es).
































