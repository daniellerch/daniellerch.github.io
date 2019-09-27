---
layout: page
title: Introducción
subtitle: Algunos métodos sencillos
comments: true
image: images/hns_groot.gif
hidden: false
---

Existen multitud de técnicas para ocultar información en imágenes. Aunque algunas de ellas resultan demasiado sencillas para ser tomadas en serio. Sin embargo, no por ello son menos usadas. Existen diferentes herramientas en Internet que usan este tipo de técnicas, lo que lleva inevitablemente a que haya quien las use. Llama la atención, por ejemplo, que algunas de estas técnicas sean usadas por *malware*, para ocultar parte de su código. Conviene pues, conocerlas.

Vamos a ver las siguientes:

1. [Dibujar texto con colores similares](#1-dibujar-texto-con-colores-similares)
2. [Concatenar ficheros](#2-concatenar-ficheros)  
3. [Uso del canal alfa](#3-uso-del-canal-alfa)




<br>
#### 1. Dibujar texto con colores similares

Una técnica muy sencilla consiste en dibujar texto sobre la imagen usando un color similar al color del fondo. Si es suficientemente similar el ojo humano no lo percibirá. Esto resulta complicado en imágenes naturales, sin embargo en imágenes artificiales como la siguiente, funciona perfectamente. 

Aquí podemos ver la imagen original:

![bender]({{ site.baseurl }}/images/hns_bender.png)

Y aquí la imagen con información oculta:

![bender]({{ site.baseurl }}/images/hns_bender_stego.png)

No podemos percibir la diferencia, puesto que el texto oculto se ha dibujado usando un color con una diferencia de un solo píxel.

Sin embargo, está técnica no resulta difícil de detectar. Se puede hacer, por ejemplo, usando un filtro que resalte los bordes, ideal para nuestro caso, dado que queremos buscar cambios en el color. El siguiente código en Python aplica un filtro de paso alto mediante [convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)). 



```python
import numpy as np
from scipy import ndimage, misc

I = misc.imread('hns_bender_stego.png')
kernel = np.array([[[-1, -1, -1],
                    [-1,  8, -1],
                    [-1, -1, -1]],
                   [[-1, -1, -1],
                    [-1,  8, -1],
                    [-1, -1, -1]],
                   [[-1, -1, -1],
                    [-1,  8, -1],
                    [-1, -1, -1]]])

highpass_3x3 = ndimage.convolve(I, kernel)
misc.imsave('hns_bender_stego_broken.png', highpass_3x3)
```

A continuación podemos ver el resultado de aplicar el filtro:

![bender]({{ site.baseurl }}/images/hns_bender_stego_broken.png)

La misma operación puede ser realizada usando [Aletheia](https://github.com/daniellerch/aletheia).

```bash
$ ./aletheia.py hpf hns_bender_stego.png hns_bender_stego_broken.png
```





<br>
#### 2. Concatenar ficheros

Algunos formatos de fichero permiten tener información concatenada al final sin que nada se rompa. Uno de esos formatos de fichero son las imágenes GIF. Por lo que si concatenamos, por ejemplo, un fichero en formato ZIP al final de un fichero en formato GIF, todo continuara funcionando de la forma habitual. Cualquier visor de imágenes nos mostrará la imagen GIF de la forma habitual.

En Linux/Mac podemos concatenar un fichero ZIP a un fichero GIF con el siguiente comando:


```bash
cat file.zip >> file.gif
```

Y en Windows:

```bash
copy /B file.gif+file.zip file.gif
```

Tomemos como ejemplo la siguiente imagen GIF de Groot:

![groot]({{ site.baseurl }}/images/hns_groot.gif)

Después de añadir un fichero ZIP al final obtenemos la siguiente imagen:

![groot-stego]({{ site.baseurl }}/images/hns_groot_stego.gif)


Para extraer el fichero oculto basta con ejecutar el siguiente comando:

```bash
$ unzip hns_groot_stego.gif
Archive:  hns_groot_stego.gif
warning [hns_groot_stego.gif]:  4099685 extra bytes at beginning or within zipfile
  (attempting to process anyway)
 extracting: hw.txt                  
$ cat hw.txt 
Hello World!
```

De nuevo, no es una técnica demasiado segura. Simplemente usando el comando de extracción, veremos que hay información oculta. Quizás el mejor símil sea el de ocultar la caja fuerte detrás de un cuadro. Nadie sabrá que está ahí, a menos que mire, claro!

Este método puede ser usado en diferentes formatos, que pueden ser imágenes, o no. Algunos ejemplos comunes son los formatos de archivo PNG o JPEG, entre otros.




<br>
#### 3. Uso del canal alfa

Otra técnica bastante sencilla consiste en ocultar información en el canal alfa. El canal alfa es el que se encarga de regular la transparencia de la imagen. Normalmente, consiste en un byte adicional a los bytes usados para el color del píxel que indica el grado de transparencia de ese píxel. 

La siguiente imagen de Homer tiene el fondo transparente.

![bender]({{ site.baseurl }}/images/hns_homer.png)

Si leemos, usando Python, el píxel de la esquina superior izquierda, podemos ver como se estructura la información relativa al valor del píxel:


```python
from scipy import misc
I = misc.imread('hns_homer.png')
print I[0,0]
```

<br>
Que al ejecutarlo, nos da la siguiente salida:

```bash
[0, 0, 0, 0]
```

Cada píxel se representa con cuatro valores: RGBA. El primero corresponde a la cantidad de color rojo, el segundo a la cantidad de color verde, el tercero a la cantidad de azul, y finalmente, el cuarto corresponde al canal alfa, es decir, el grado de transparencia.

El valor cero del cuarto byte nos indica que el píxel es totalmente transparente, por lo que el valor de los tres bytes que especifian el color, se ignoran. Esto nos ofrece pues, una forma sencilla de ocultar información. Podemos escribir lo que queramos en los primeros tres bytes de cada píxel, siempre que el cuarto esté a cero.

El siguiente código Python lee los datos que queremos ocultar de un fichero "secret_data.txt" y los esconde en la imagen "hns_groot_stego.png". Cada byte de información se oculta en un píxel en el que la opacidad esté a cero. Solo se sobreescriben bytes "invisibles".


```python
from scipy import ndimage, misc

f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]

I = misc.imread('hns_homer.png')

idx=0
for i in xrange(I.shape[0]):
    for j in xrange(I.shape[1]):
        for k in xrange(3):
            if idx<len(blist) and I[i][j][3]==0:
                I[i][j][k]=blist[idx]
                idx+=1

misc.imsave('hns_homer_stego.png', I)
```



<br>
Como resultado, obtenemos la siguiente imagen:

<p class='image-center'>

![bender]({{ site.baseurl }}/images/hns_homer_stego.png)

</p>

Efectivamente, el mensaje queda oculta a la vista. Sin embargo, de nuevo esta no es una técnica segura. Pues simplemente modificando la opacidad del píxel podemos ver que algo ocurre.


```python
from scipy import ndimage, misc
I = misc.imread('hns_homer_stego.png')
I[:,:,3] = 255;
misc.imsave('hns_homer_stego_broken.png', I)
```

La misma operación puede realizarse usando [Aletheia](https://github.com/daniellerch/aletheia). 

```bash
$ ./aletheia.py rm-alpha hns_homer_stego.png hns_homer_stego.png
```


<br>
El resultado después de modificar la opacidad es el siguiente:

<p class='image-center'>
[bender]({{ site.baseurl }}/images/hns_homer_stego_broken.png)
</p>

En general, el fondo de la imagen es negro. Pero existe una sección al principio en la que los píxeles tienen colores extraños. Esta sección corresponde a los datos que hemos ocultado. Un atacante, solo tiene que leerlos.




