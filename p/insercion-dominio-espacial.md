---
layout: post
title: Dominio espacial
subtitle: Inserción de información en imágenes
tags: [Esteganografía, Estegoanálisis, Imágenes]
---

En este post vamos a ver como ocultar información en el dominio espacial, es decir, en imágenes de tipo *bitmap*. Estas imágenes están representadas como una matriz de píxeles. En imágenes en escala de grises, cada píxel se suele representar por un byte (un valor entre 0 y 255) que representa la intensidad del píxel. Si la imágen es en color, cada píxel se suele representar por tres bytes, cada uno de los cuales representa la intensidad del color rojo, del verde y del azul, respectivamente.

En esteganografía en el dominio espacial es habitual esconder información modificando ligeramente el valor de los píxeles, normalmente en una unidad. A continuación veremos una técnica conocida como *LSB replacement*, de las primeras en ser usadas. Esta técnica fue rota hace muchos años aunque todavía existen muchas herramientas que lo usan. Por lo que posteriormente, veremos uno de los ataques más potentes contra esta técnica. Finalmente, veremos una técnica conocida como *LSB Matching*, igual de sencilla que la primera pero mucho más difícil de detectar.

1. [LSB replacement](#1-lsb-replacement)

2. [El ataque SPA](#2-el-ataque-spa)

3. [LSB Matching](#1-lsb-matching)
<br>

#### 1. LSB replacement

Una de las primeras técnicas de ocultación de información en imágenes de tipo *bitmap* consiste en sustituir el bit menos signigicativo de cada píxel por el bit que se desea ocultar.

Supongamos que tenemos ocho píxeles con los siguientes valores:

<center>
| 160 | 60 | 53 | 128 | 111 | 43 | 84 | 125 |
<center>

Si obtenemos su código binario, tenemos:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

Supongamos ahora que queremos ocultar la letra 'A' en código ASCII. En código binario es el número 01000001. Por lo que tendremos que sustituir el LSB de cada píxel por cada uno de los bits que queremos esconder. El resultado es el siguiente:

<center>
| 1010000**0** | 0011110**1** | 0011010**0** | 1000000**0** | 
| 0110111**0** | 0010101**0** | 0101010**0** | 0111110**1** | 
</center>

<br>
De estas manera, podemos ocultar un bit en cada píxel de la imagen, por lo que la capacidad de este método es de la octava parte de la cantidad de píxeles de la imagen.

En este ejemplo vamos a usar la imagen de Lena, una imagen usada habitualmente en ejemplos de esteganografía y *watermarking*.

![lena]({{ site.baseurl }}/images/hns_lena.png)


Vamos a ver como implementar esta técnica en Python:



```python
import sys
from scipy import ndimage, misc

bits=[]
f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]
for b in blist:
    for i in xrange(8):
        bits.append((b >> i) & 1)

I = misc.imread('hns_lena.png')

idx=0
for i in xrange(I.shape[0]):
    for j in xrange(I.shape[1]):
        for k in xrange(3):
            if idx<len(bits):
                I[i][j][k] &= 0xFE
                I[i][j][k] += bits[idx]
                idx+=1

misc.imsave('hns_lena_stego.png', I)
```

Lo primer que hacemos es leer el fichero que contiene los datos que queremos ocultar. A continuación, separamos cada caracter en bits y después los almacenamos en una lista. Estos bits, queremos ocultarlos en el LSB de los píxeles. Finalmente, leemos los píxeles y ponemos a cero el LSB para, a continuación, establecer el bit del mensaje. Lo hacemos con estas operaciones:

```python
I[i][j][k] &= 0xFE
I[i][j][k] += bits[idx]
```

Como resultado, obtenemos la siguiente imagen:

![lena-stego]({{ site.baseurl }}/images/hns_lena_stego.png)


No hay diferencia para el ojo humano. Pero, ¿podemos saber si hay un mensaje oculto?. Lo vemos en la siguiente sección.

Pero antes, estoy seguro de que quieres saber como extraer el mensaje:


```python
import sys
from scipy import ndimage, misc

I=misc.imread('hns_lena_stego.png')
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

Lo que estamos haciendo es extraer cada uno de los píxeles leyendo su LSB. Cada vez que acumulamos 8 bits guardamos el byte entero en el fichero de salida.

<br>


#### 2. El ataque SPA

LSB replacement seems a good steganographic technique. An attacker can extract and read the message but this is easy to solve. we only have to encrypt it and if the attacker extracts the message he/she will think this is garbage. Other option is to use a [PRNG](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) to choose which pixels we want to use to hide information. In this case we do not use all the pixels, we are embedding information using a bitrate smaller than one. For example, if we hide information using a 25% of the pixels we say we are using a bitrate 0.25. This reduces capacity increasing security, because less information is more difficult to detect.

So, we have a  mostly secure steganongraphic method. Isn't it? 

No!, it is not. LSB replacement is an asymmetrical operation and it can be detected. To see what it means an asymmetrical operation, let's analyze what is happening when we replace the LSB.

When we replace the LSB of a pixel with an even value this produces the same effect of adding one when we replace by one or does not produce any effect when we replace by zero. Similarly, when we replace the LSB of a pixel with an odd value this produces the same effect of subtracting one when we replace by zero or does not produce any effect when we replace by one. 

Think a litle bit about this. When we hide data, the value of the even pixels increases or remains the same and the value of odd pixels decrease or remains the same. This is the asymmetrical operation I said before and this type of operation introduces statistical anomalies into the image. This fact was exploited first by the histogram attack [[1](#references)] and later by the RS attack [[2](#references)] and the SPA attack [[3](#references)].

The Sample Pair Analysis (SPA) is detailed in [[3](#references)] so we refer the reader to the original paper for a detailed explanation and its corresponding maths. 

The following code implements the SPA attack:

```python
import sys
from scipy import ndimage, misc
from cmath import sqrt

if len(sys.argv) < 2:
    print "%s <img>\n" % sys.argv[0]
    sys.exit(1)

channel_map={0:'R', 1:'G', 2:'B'}

I3d = misc.imread(sys.argv[1])
width, height, channels = I3d.shape

for ch in range(3):
    I = I3d[:,:,ch]

    x=0; y=0; k=0
    for j in range(height):
        for i in range(width-1):
            r = I[i, j]
            s = I[i+1, j]
            if (s%2==0 and r<s) or (s%2==1 and r>s):
                x+=1
            if (s%2==0 and r>s) or (s%2==1 and r<s):
                y+=1
            if round(s/2)==round(r/2):
                k+=1

    if k==0:
        print "ERROR"
        sys.exit(0)

    a=2*k
    b=2*(2*x-width*(height-1))
    c=y-x

    bp=(-b+sqrt(b**2-4*a*c))/(2*a)
    bm=(-b-sqrt(b**2-4*a*c))/(2*a)

    beta=min(bp.real, bm.real)
    if beta > 0.05:
        print channel_map[ch]+": stego", beta
    else:
        print channel_map[ch]+": cover"

```

This SPA implementation provides the estimated embedding rate. If the predicted bit rate is too low we consider the analyzed image as cover. Otherwise we consider it as stego.

Note we analize each channel (R, G and B) separately. So we can detect if there is information only in one channel.

Let's try our program with the cover image:

```bash
$ python spa.py hns_lena.png
R: cover
G: cover
B: cover
```

And now, let's try with the stego image.

```bash
$ python spa.py hns_lena_stego.png 
R: stego 0.0930809062336
G: stego 0.0923858529528
B: stego 0.115466382367
```

That means the program detects aproximately a bitrate of 0.10. This is almost correct.

The SPA attack can detect reliably images embedded with bitrates over 0.05 but it also works fairly well witht lower bitrates (~0.03). These are very low bitrates so we can consider the LSB replacement practically broken. 


<br>
### References

[1]. Attacks on Steganographic Systems. A. Westfeld and A. Pfitzmann. Lecture Notes in Computer Science, vol.1768, Springer-Verlag, Berlin, 2000, pp. 61−75. 

[2]. Reliable Detection of LSB Steganography in Color and Grayscale Images. Jessica Fridrich, Miroslav Goljan and Rui Du.
Proc. of the ACM Workshop on Multimedia and Security, Ottawa, Canada, October 5, 2001, pp. 27-30. 

[3]. Detection of LSB steganography via sample pair analysis. S. Dumitrescu, X. Wu and Z. Wang. IEEE Transactions on Signal Processing, 51 (7), 1995-2007.



----


As we saw before, [LSB replacement is not a secure technique](http://daniellerch.me/image-stego-lsbr). Nevertheless, there is a very simple modification to the insertion technique that makes the operation simmetrical. If we do this, the method becomes a little harder to detect.

Instead of replacing the LSB of the pixel the right thing to do is to increase or to decrease randomly by 1. The effect on the LSB is the same but the operation does not introduce so evident anomalies. 

There is not easy statistical attack to detect this operation and, consequently, the security of LSB matching is significantly better than that of LSB replacement. Actually, the only way to deal with steganalysis of LSB matching based techniques is through machine learning.


<br>
#### 1. LSB Matching

Hiding information using LSB matching is very easy. If the value of LSB is the same we want to hide, we do nothing. If not, we increase or decrease by 1 randomly. 

Let's suppose whe have the following fixel values in an image:

| 160 | 60 | 53 | 128 | 111 | 43 | 84 | 125 |

If we obtain its binary code, that is:

| 10100000 | 00111100 | 00110101 | 10000000 | 
| 01101111 | 00101011 | 01010100 | 01111101 |

Let's suppose now we want to hide the 'A' letter in ASCII code. This, in the binary code, is the number 01000001. So we need to add +1 or -1 randomly if the LSB does not match the value of the pixel we want to hide. A possible result is:


| (+0) 1010000**0** | (+1) 0011110**1** | (-1) 0011010**0** | (+0) 1000000**0** | 
| (-1) 0110111**0** | (+1) 00101**100** | (+0) 0101010**0** | (+0) 0111110**1** | 

<br>



In this example we are going to use the F16 image:

![f16]({{ site.baseurl }}/images/hns_f16.png)

<br>
See an example program in Python to hide information:


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

I = misc.imread('hns_f16.png')

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

misc.imsave('hns_f16_stego.png', I)
```

<br>
The result after embedding is this:

![f16-stego]({{ site.baseurl }}/images/hns_f16_stego.png)


<br>
To extract the message we can use the same program we used with [LSB replacement](http://daniellerch.me/image-stego-lsbr):

```python
import sys
from scipy import ndimage, misc

I=misc.imread('hns_f16_stego.png')
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

<br>
As usual there is no difference for the human eye between the cover and the stego images. 

The presented program has some limitations. The first one is we are hiding information in a sequential manner and consequently we hide all the information in the beginning of the image. Second, we are hiding information in all the pixels. This is very disruptive but can be easily improved. For example, we can choose part of the pixels where we want to hide information using a key known only by the sender and the receiver. We can do this using a low bitrate because this is harder to detect than a higher bitrate. But his unfortunately decreases the capacity. We can deal with this problem thanks to different techniques that try to minimize distortion.


