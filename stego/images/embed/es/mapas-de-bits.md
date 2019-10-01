---
layout: page
title: Inserción de información en imágenes
subtitle: Mapas de bits
comments: true
image: images/embed/img/f16.png
hidden: false
---

Una forma común de representar la información de una imagen es el mapa de bits. El mapa de bits consiste en una matriz o tabla en la que cada elemento es un píxel. En las imágenes en escala de grises el valor del píxel suele ser un byte. En las imágenes en color (RGB) el valor del píxel suele representarse por tres bytes, la cantidad de rojo, la cantidad de verde y la cantidad de azul.

Si usamos Python para leer el valor de un píxel:

```python
from scipy import misc
I = misc.imread('lena.png')
print(I[0,0])
```

<br>
Al ejecutarlo, nos da la siguiente salida:

```bash
[226 137 125]
```

Es decir, 226 nos indica la cantidad de rojo, 137 la cantidad de verde y 125 la cantidad de azul.

Para ocultar información sin que se note podemos modificar ligeramente estos valores. Si los modificamos únicamente en una unidad, el ojo humano no podrá detectarlo. Por ejemplo, si en lugar de [226 137 125] ponemos [227 136 124] no vamos a notar la diferencia visualmente y sin embargo estaremos modificando el bit menos significativo del píxel (el de la derecha).

Supongamos que disponemos de los siguientes valores de píxeles obtenidos del canal de rojo, es decir, del primer byte de ocho píxeles diferentes de la imagen.

| 160 | 60 | 53 | 128 | 111 | 43 | 84 | 125 |

Si obtenemos su valor en binario tenemos:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

supongamos ahora que queremos ocultar un byte, por ejemplo el correspondiente al valor de la letra 'A' en codificación ASCII. Este valor corresponde al número binario 01000001. Podemos hacerlo sustituyendo el valor del bit menos significativo de cada píxel:


| 1010000**0** | 0011110**1** | 0011010**0** | 1000000**0** | 
| 0110111**0** | 0010101**0** | 0101010**0** | 0111110**1** | 

De manera que nos quedarán los siguientes valores de píxeles:

| 160 | 61 | 52 | 128 | 110 | 42 | 84 | 125 |


En los inicios de la esteganografía en imágenes digitales se pensó (erróneamente) que esta era la forma más apropiada de esconder información en los píxeles: modificando únicamente el bit menos significativo. Desde un punto de vista intuitivo tiene mucho sentido, puesto que esta técnica nos permite insertar un bit de información modificando el valor del píxel lo mínimo posible. Sin embargo esta operación introduce cambios significativos en la distribución estadística de los píxeles de la imagen, lo que la hace muy detectable. 

Existe, por otra parte, una operación parecida que no introduce estas anomalías estadísticas. Esta operación consiste en sumar o restar uno. El efecto sobre el bit menos significativo es exactamente el mismo, pero en este caso la técnica es mucho más difícil de detectar. Esta técnica se conoce como *LSB matching* o $$\pm 1$$.

Volvamos al ejemplo anterior, en código binario:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

Ahora, sumemos o restemos 1 aleatoriamente a aquellos píxeles en los que el valor del bit menos significativo no coincide con el bit del mensaje que queremos ocultar:

| (+0) 1010000**0** | (+1) 0011110**1** | (-1) 0011010**0** | (+0) 1000000**0** | 
| (-1) 0110111**0** | (+1) 00101**100** | (+0) 0101010**0** | (+0) 0111110**1** | 

En este caso, el resultado es:

| 160 | 61 | 52 | 128 | 110 | 44 | 84 | 125 |


<br>

Con esta técnica estamos ocultando un bit en cada píxel, por lo que la capacidad de este método corresponde a la octava parte del número total de píxeles de la imagen. Para extraer el mensaje, el receptor solo tendrá que leer el bit menos significativo de cada píxel y volver a agrupar los bits de 8 en 8 para obtener el valor original de los bytes escondidos.


Vamos a ver como ocultar información usando Python en la siguiente imagen:

![f16]({{ site.baseurl }}/stego/images/img/f16.png)

El siguiente código lee un archivo "secret_data.txt" que contiene los datos a ocultar y esconde su contenido bit a bit en la imagen:

```python
#!/usr/bin/python

import sys
from scipy import ndimage, misc
import random

bits=[]
f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]
for b in blist:
    for i in xrange(8):
        bits.append((b >> i) & 1)

I = misc.imread('f16.png')

sign=[1,-1]
idx=0
for i in xrange(I.shape[0]):
    for j in xrange(I.shape[1]):
        for k in xrange(3):
            if idx<len(bits):
                if I[i][j][k]%2 != bits[idx]:
                    s=sign[random.randint(0, 1)]
                    if I[i][j][k]==0: s=1
                    if I[i][j][k]==255: s=-1
                    I[i][j][k]+=s
                idx+=1

misc.imsave('f16_stego.png', I)
```

El resultado es el siguiente:

![f16]({{ site.baseurl }}/stego/images/img/stego_f16.png)


Para leer el mensaje, el código Python necesario únicamente tiene que recopilar los bits menos significativos y agruparlos en bytes. El resultado lo almacena en el fichero "output_secret_data.txt".


```python
import sys
from scipy import ndimage, misc

I=misc.imread('f16_stego.png')
f = open('output_secret_data.txt', 'w')

idx=0
bitidx=0
bitval=0
for i in xrange(I.shape[0]):
    for j in xrange(I.shape[1]):
        for k in xrange(3):
            if bitidx==8:
                f.write(chr(bitval))
                bitidx=0
                bitval=0
            bitval |= (I[i, j, k]%2)<<bitidx
            bitidx+=1

f.close()
```

Esconder información en todos los píxeles de la imagen no es muy buena idea. Un atacante podría obtener el mensaje fácilmente, pues solo tendría que leer todos los bits menos significativos. Por otra parte, alterar todos los píxeles de la imagen altera enormemente las propiedades estadísticas de la imagen lo que facilita su detección. Es más interesante seleccionar solo un subconjunto de los píxeles de la imagen, en base a una clave compartida por emisor y receptor. Así se reduce la alteración de las propiedades estadísticas de la imagen y se evita que un atacante sepa que píxeles tiene que leer. Lógicamente, menos píxels modificados supone menos capacidad, aunque se puede lidiar con este problema usando otras técnicas.



