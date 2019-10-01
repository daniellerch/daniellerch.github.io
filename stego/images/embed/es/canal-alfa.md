---
layout: page
title: Inserción de información en imágenes
subtitle: Oculto en el canal alfa
comments: true
image: stego/images/embed/img/groot.gif
hidden: false
---


Una técnica para ocultar información bastante sencilla consiste en ocultar información en el canal alfa de una imagen transparente. El canal alfa es el que se encarga de regular la transparencia de la imagen. Normalmente, consiste en un byte adicional a los bytes usados para el color del píxel que indica el grado de transparencia de ese píxel. 

La siguiente imagen de Homer tiene el fondo transparente.

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/homer.png"/>

Si leemos, usando Python, el píxel de la esquina superior izquierda, podemos ver como se estructura la información relativa al valor del píxel:


```python
from scipy import misc
I = misc.imread('homer.png')
print(I[0,0])
```

<br>
Que al ejecutarlo, nos da la siguiente salida:

```bash
[0, 0, 0, 0]
```

Cada píxel se representa con cuatro valores: RGBA. El primero corresponde a la cantidad de color rojo, el segundo a la cantidad de color verde, el tercero a la cantidad de azul, y finalmente, el cuarto corresponde al canal alfa, es decir, el grado de transparencia.

El valor cero del cuarto byte nos indica que el píxel es totalmente transparente, por lo que el valor de los tres bytes que especifian el color, se ignoran. Esto nos ofrece pues, una forma sencilla de ocultar información. Podemos escribir lo que queramos en los primeros tres bytes de cada píxel, siempre que el cuarto esté a cero.

El siguiente código Python lee los datos que queremos ocultar de un fichero "secret_data.txt" y los esconde en la imagen "groot_stego.png". Cada byte de información se oculta en un píxel en el que la opacidad esté a cero. Solo se sobreescriben bytes "invisibles".


```python
from scipy import ndimage, misc

f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]

I = misc.imread('homer.png')

idx=0
for i in xrange(I.shape[0]):
    for j in xrange(I.shape[1]):
        for k in xrange(3):
            if idx<len(blist) and I[i][j][3]==0:
                I[i][j][k]=blist[idx]
                idx+=1

misc.imsave('homer_stego.png', I)
```



<br>
Como resultado, obtenemos la siguiente imagen:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/homer_stego.png"/>

Efectivamente, el mensaje queda oculta a la vista. Sin embargo, de nuevo esta no es una técnica segura. Pues simplemente modificando la opacidad del píxel podemos ver que algo ocurre.


Esta operación puede realizarse usando [Aletheia](https://github.com/daniellerch/aletheia). 

```bash
$ ./aletheia.py rm-alpha homer_stego.png homer_stego.png
```


<br>
El resultado después de modificar la opacidad es el siguiente:

<img class='image-center' src="{{ site.baseurl }}/stego/images/embed/img/homer_stego_broken.png"/>


En general, el fondo de la imagen es negro. Pero existe una sección al principio en la que los píxeles tienen colores extraños. Esta sección corresponde a los datos que hemos ocultado. Un atacante, solo tiene que leerlos.




