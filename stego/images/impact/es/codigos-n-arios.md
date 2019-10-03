---
layout: page
title: Minimizando el impacto de la inserción
subtitle: Códigos n-arios
comments: true
hidden: false
---

Teniendo en cuenta que, como hemos explicado en "[Inserción de información en imágenes: Mapas de bits](/stego/embed/es/mapas-de-bits)", las operaciones que realizaremos para ocultar información en los píxeles son de tipo $$\pm 1$$, podríamos decir que no estamos aprovechando al máximo este sistema de inserción. Si en lugar de reemplazar el bit menos significativo de cada píxel, optamos por realizar una operación $$\pm 1$$ estamos trabajando con tres posibles valores: +1, -1 y 0 (dejamos el píxel como estaba). Con lo que, en lugar de usar un [código binario](/stego/images/impact/es/codigos-binarios), podemos usar un código ternario.

La teoría detrás de los códigos n-arios es la misma que para los códigos binarios, por lo que no vamos a volver a explicarla. Puede encontrar la explicación completa en  "[Minimizando el impacto de la inserción: Códigos binarios](/stego/images/impact/es/codigos-binarios)". La única diferencia es que en lugar de realizar operaciones módulo $$2$$ las haremos módulo $$n$$.


Por otra parte, para ocultar información en un píxel necesitaremos trabajar con el valor del píxel módulo $n$. Es decir, para un código ternario ($$n=3$$), un píxel con valor 233 pasaría a ser un píxel con valor $$235 (mod 3) = 2$$. 

Veamos un ejemplo de códigos ternarios ($$n=3$$). Vamos a usar $$p=3$$, es decir, que queremos insertar un símbolo ternario por cada modificación. Para ello, necesitaremos trabajar con bloques de $$n^p-1 = 3^3-1 = 26$$ píxeles.

Supongamos que después de seleccionar un bloque de 26 píxels de la imagen, donde vamos a ocultar la información, y realizar la operación módulo 3 del valor de los píxeles, obtenemos el siguiente vector:

$$,c=(0,1,0,0,2,1,2,2,2,0,1,0,2,0,2,1,1,2,0,1,1,1,2,2,0,2),$$

Recordemos que también necesitamos una matriz que contenga en sus columnas todas las posibles combinaciones, excepto el cero. Sería la siguiente:

$$ M=\begin{pmatrix} 
0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2\\
0 0 1 1 1 2 2 2 0 0 0 1 1 1 2 2 2 0 0 0 1 1 1 2 2 2\\
1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 0 1 2 
\end{pmatrix} $$

Y finalmente, el mensaje que queremos ocultar. Ocultemos por ejemplo:

$$ m=(2,0,2) $$

Si calculamos el mensaje que se esconde en nuestro vector $c$ vemos que es:

$$ m = Mc = 110 $$

que, cómo es lógico, no es el que queremos ocultar. Buscamos pues que columna de M es la responsable:

$$ m-Mc = (1, 2, 2) $$

Que es la columna 17 de la matriz M. Por lo que tenemos que sumar 1 a dicha columna.

$$,s=(0,1,0,0,2,1,2,2,2,0,1,0,2,0,2,1,2,2,0,1,1,1,2,2,0,2),$$

Veamos el código Python que nos permite realizar estas operaciones:

```python
import sys
import random
import numpy as np

def nary(p, n):
    if p == 0:
        return '0'
    nums = []
    while p:
        p, r = divmod(p, n)
        nums.append(str(r))
    return ''.join(reversed(nums))

def prepare_M(p, n):
    M=[]
    l=len(nary(n**p-1, n))
    for i in range(1, n**p):
        string=nary(i, n).zfill(l)
        V=[]
        for c in string:
            V.append(int(c))
        M.append(V)
    M=np.array(M).T

    return M

def ME_hide_block(M, c, m, n):
    r=m-M.dot(c)
    r=r%n

    idx=0
    found=False
    for i in M.T:
        if np.array_equal(i, r):
            found=True
            break
        idx+=1

    if not found:
        return c

    s=np.array(c)
    s[idx]+=1

    return s

def ME_unhide_block(M, s, n):
    m=M.dot(s)
    m=m%n
    return m

```


Para usarlo con nuestro ejemplo, hacemos lo siguiente:

```python
n = 3
p = 3
m = [2, 0, 2]
c = [0, 1, 0, 0, 2, 1, 2, 2, 2, 0, 1, 0, 2, 0, 2, 1, 1, 2, 0, 1, 1, 1, 2, 2, 0, 2]
M=prepare_M(p, n)
s=ME_hide_block(M, c, m, n)
m_recovered=ME_unhide_block(M, s, n)
print("recovered=", m_recovered)
```

que nos mostrará:

```bash
recovered= [2 0 2]
```



Además de usar técnicas de inserción $$\pm 1$$, podemos usar técnicas $$\pm k$$ siendo $$k$$ cualquier valor que nos interese. Sin embargo, cuanto mayor sea $$k$$ mayor será la distorsión introducida, por lo que puede no ser apropiado seleccionar valores demasiado grandes. 

Si hemos usado códigos ternarios para la inserción $$\pm 1$$, con la inserción $$\pm 2$$ tendremos que usar códigos quintarios, puesto que tenemos cinco estados posibles: -2, -1, 0, +1 y +2. 

Puesto que el proceso es el mismo que antes, cambiando el valor del módulo, veamos directamente un ejemplo en Python. Usaremos $$p=3$$, que supone usar bloques de $$n^p-1=5^3-1=124$$



```python
n = 5
p = 3
m = [3, 0, 4]
c=[0,1,3,0,3,3,3,0,3,4,3,1,1,2,3,3,1,4,2,4,0,2,2,1,2,
   3,4,0,1,2,1,4,2,2,3,0,2,4,3,0,3,2,3,1,2,1,1,0,4,2,
   1,0,3,4,3,3,0,0,3,4,4,1,1,1,1,1,1,0,4,1,3,2,4,2,2,
   0,3,2,1,2,4,2,4,1,3,4,2,1,3,2,3,3,4,2,3,3,0,1,1,0,
   4,4,4,0,1,4,4,4,0,2,4,1,3,0,0,0,0,2,3,2,0,3,2,4]
M=prepare_M(p, n)
s=ME_hide_block(M, c, m, n)
m_recovered=ME_unhide_block(M, s, n)
print("recovered=", m_recovered)
```

que nos mostrará:

```bash
recovered= [3 0 4]
```


El mismo proceso puede seguirse con diferentes valores para $$n$$ y de $$p$$. No está claro hasta que punto incrementar el valor de $$\pm k$$ afecta a la detectabilidad, aunque conviene mantener un valor pequeño. Por otra parte, dado que con el aumente de $$k$$ aumenta también la capacidad, podremos ocultar la misma información realizando menos cambios en la imagen. Por lo que habrá que elegir con cuidado los parámetros para minimizar la probabilidad de detección de la inserción realizada.

En la siguiente gráfica puede verse una comparativa de diferentes códigos n-arios. Es necesario ajustar las fórmulas para calcular el *payload* y la eficiencia con el valor de $$n$$. Para calcular el *payload* tenemos:

$${\alpha}_p = \frac{p \log_2 n}{(n^p-1)/(n-1)}$$


Y para calcular la eficiencia:

$$e_p = \frac{p \log_2 n}{1-n^{-p}}$$




<img class='image-center' style='width:100%' src="/stego/images/impact/img/n-ary-codes.png"/>


Como se puede ver en las gráficas, cuanto mayor es $$n$$ mayor es la eficiencia del método. 

Es importante tener en cuenta que para poder usar códigos n-arios tenemos que representar la información en base n. Ocultar bytes usando códigos binarios es directo, puesto que ocultamos bits y los bytes pueden separarse en bits. Pero con los códigos n-arios tendremos que transformar los bytes en símbolos n-arios.







