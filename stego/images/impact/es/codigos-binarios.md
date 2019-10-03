---
layout: page
title: Minimizando el impacto de la inserción
subtitle: Códigos binarios
comments: true
hidden: false
---


Cuanto menos modifiquemos la imagen durante la inserción de información más difícil será que seamos detectados. Es por ello, que una estrategia común a la hora de crear un método de inserción consiste en intentar minimizar la cantidad de modificaciones a realizar. En este punto entran en juego diferentes técnicas de codificación que nos permiten incrementar el número de bits ocultos reduciendo el número de bits modificados. Uno de estos métodos son los **códigos binarios**.

Antes de entrar de lleno en la teoría que nos permite realizar esta proeza, veamos un sencillo truco. 

Usando inserción $$\pm 1$$ tenemos que modificar el píxel el 50% de las veces, dado que el otro 50% de las veces el bit menos significativo del píxel ya tendrá el valor que queremos ocultar. Sin embargo, podemos hacerlo un poco mejor. Supongamos que queremos ocultar dos bits en grupos de tres píxeles:

| P1 | P2 | P3 |

y que usamos esta fórmula para ocultar el primer bit:

$$ M_1 = LSB(P_1) \oplus LSB(P_2) 1$$

y esta fórmula para ocultar el segundo:

$$ M_2 = LSB(P_2) \oplus LSB(P_3) 1$$


Aquí $$LSB()$$ hace referencia al bit menos significativo del píxel.


###This means the effectiveness of our method is 1/2.


Este método es muy sencillo de aplicar. Si $$M_1$$ y $$M_2$$ ya tienen los valores que queremos ocultar, no tenemos que hacer nada. Si ninguno de los valores de $$M_1$$ y $$M_2$$ coincide cambiaremos el valor de $$P_2$$. Si $$M_1$$ coincide pero $$M_2$$ no, cambiaremos el valor de $$P_3$$ y si $$M_2$$ coincide per $$M_1$$ no, cambiaremos el valor de $$P_1$$. Con esta sencilla técnica, somos capaces de ocultar dos bits modificando solo uno.

Veamos un ejemplo. Tenemos los siguientes píxeles:

| 10010100 | 10010101 | 10010111 |

Si queremos ocultar $$00$$ un posible resultado es:

| (+1) 1001010**1** | 10010101 | 10010111 |


Si queremos ocultar $$01$$ una opción será:

| 10010100 | (-1) 1001010**0** | 10010111 |


Si queremos ocultar $$10$$, no tenemos que realizar cambios:

| 10010100 | 10010101 | 10010111 |

Y finalmente, si queremos ocultar $$11$$ un posible resultado será:

| 10010100 | 10010101 | (-1) 1001011**0** |

<br>
Esta interesante idea puede generalizarse usando códigos de [Códigos de Hamming](https://en.wikipedia.org/wiki/Hamming_code) y nos permitirá ocultar $$p$$ bits en un bloque de $$2^p-1$$ bits, modificando un solo bit.

Lo primero que vamos a necesitar es una matriz que contenga todas las combinaciones de vectores binarios de $$p$$ elementos, excepto el cero. Por ejemplo, si queremos ocultar información en bloques de tres píxeles, una posible matriz es la siguiente:

$$ M=\begin{pmatrix} 0001111\\0110011\\1010101 \end{pmatrix} $$

Nótese que cada una de las columnas tiene todas las posibles combinaciones de ceros y unos, excepto el cero.

A continuación podemos ver un ejemplo en Python para generar matrices en función del tamaño de bloque que queramos usar:


```python
import numpy as np
import sys

def prepare_M(n_bits):
    M=[]
    l=len(bin(2**n_bits-1)[2:])
    for i in range(1, 2**n_bits):
        string=bin(i)[2:].zfill(l)
        V=[]
        for c in string:
            V.append(int(c))
        M.append(V)
    M=np.array(M).T
    return M
 ```

Para generar la matriz con $$p=3$$:


```bash
>>> prepare_M(3)
array([[0, 0, 0, 1, 1, 1, 1],
       [0, 1, 1, 0, 0, 1, 1],
       [1, 0, 1, 0, 1, 0, 1]])
```

El número de píxels necesarios será $$2^p-1$$. Siguiendo nuestro ejemplo, si $$p==3$$ necesitaremos 7 píxeles.

Para calcular el mensaje oculto usaremos la siguiente fórmula:

$$ m = Mc $$

Donde $$c$$ es un vector que contiene los bits de la imagen *cover*. 

Continuemos con nuestro ejemplo. Vamos a ocultar el mensaje m=(1,1,0) en el siguiente bloque de 7 píxeles:

| 11011010 | 11011011 | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |

Nos quedamos con los bits menos significativos:

| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 0 |

Por lo que nuestro vector $$c$$ será:

$$ c=(0,1,1,0,1,1,0,0) $$

Aplicamos la fórmula para leer el mensaje oculto:

$$ m = Mc = (1, 0, 0) $$

Pero este no es el mensaje que queremos ocultar, puesto que queremos ocultar m=(1,1,0). Por lo tanto tenemos que averiguar cómo modificar $$c$$ de manera que el resultado de la operación oculte nuestro mensaje. Es decir, necesitamos obtener la versión *stego* de nuestro vector $c$ para que $$ m = Mc = (1, 1, 0) $$.

Necesitamos pues, encontrar la columna de M que es diferente. Podemos hacerlo con una simple resta: $$ m-Mc $$. A continuación, solo tendremos que cambiar el valor del píxel correspondiente.

Siguiendo con el ejemplo:

$$ m-Mc = (0, 1, 0) $$

que corre corresponde a la segunda columna de $$M$$:

$$ M=\begin{pmatrix} 0001111\\0110011\\1010101 \end{pmatrix} $$

Esto significa que tenemos que cambiar el segundo píxel de $$c$$ para obtener el vector *stego* $$s$$.

$$ c=(0,1,1,0,1,1,0,0) $$

$$ s=(0,0,1,0,1,1,0,0) $$


Ahora sí, nuestra fórmula funciona:

$$ m = Ms = (1, 1, 0) $$

Obtenemos el mensaje que queremos ocultar, por lo que ahora nuestros píxeles stego quedan como:


| 11011010 | 11011010(-1) | 11011011 | 11011010 | 
| 11011011 | 11011010 | 11011010 |


Como podemos ver, hemos sido capaces de ocultar 3 bits, modificando uno solo. Para ello, hemos necesitado un bloque de 7 píxeles.

Todo este proceso puede ser automatizado fácilmente en Python:


```python
import numpy as np

def ME_hide_block(M, c, m):
    r=m-M.dot(c)
    r=r%2

    idx=0
    found=False
    for i in M.T:
        if np.array_equal(i, r):
            found=True
            break
        idx+=1

    # the block does not need to be modified
    if not found:
        return c

    s=np.array(c)
    if s[idx]==0: s[idx]=1
    else: s[idx]=0

    return s
    
 def ME_unhide_block(M, s):
    m=M.dot(s)
    m=m%2
    return m
 ```

Por ejemplo, si queremos esconder 4 bits, modificando un solo bit, necesitaremos bloques de $$2^4-1=15$$ píxels. Supongamos que queremos esconder el mensaje $$m=(1, 1, 0, 0)$$ en el vector de bits menos significativos $$c=(0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0)$$. Haremos lo siguiente:

```python
n_bits=4
M=prepare_M(n_bits)
m=np.array([1, 1, 0, 0])
c=np.array([0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0])
s=ME_hide_block(M, c, m)
print(s)
m_recovered=ME_unhide_block(M, s)
print(m_recovered)
```

Cuanto más grande sea $$p$$, más información podremos ocultar con menos modificaciones. Pero si usamos un $$p$$ demasiado grande nos encontraremos con que los bloques son tan grandes que nos quedamos rápidamente sin píxeles en la imagen. Por ejemplo, en una imagen de 512x512 píxeles podemos esconder 18 bits modificando un solo bit. Sin embargo, ya no podemos ocultar nada más. Conviene pues seleccionar una tamaño de bloque adecuado, que nos permita ocultar información sin modificar mucho la imagen pero que al mismo tiempo nos ofrezca una capacidad aceptable.

Nos interesa tener en cuenta dos parámetros. El primero es el *payload*, es decir, que porcentaje de información podemos almacenar por píxel. Esto podemos calcularlo con la siguiente fórmula:

$${\alpha}_p = \frac{p}{ {2^p-1} }$$

Por ejemplo, si usamos $$p=3$$, necesitaremos bloques de $$2^3-1=7$$ píxels. Lo que nos da una capacidad de $$0,429$$ bits por píxel.

El siguiente parámetro que nos interesa es la eficiencia de la inserción, que podemos calcularla como:

$$e_p = \frac{p}{ 1-2^{-p} }$$

Siguiendo con nuestro ejemplo, la eficiencia para $$p=3$$ es de 3.429.

En el siguiente gráfico podemos ver la relación entre el *payload* y la eficiencia.




<img class='image-center' style='width:100%' src="/stego/images/impact/img/binary-codes.png"/>


Como se puede ver en la gráfica, la mayor eficiencia se consigue con *payloads* demasiado pequeños. 





