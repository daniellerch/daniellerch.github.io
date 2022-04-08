---
layout: page
title: Ataque práctico a F5
subtitle: "" 
noindex: false
comments: true
meta-title: "Ataque práctico a F5"
meta-description: "Artículo sobre cómo detectar el esquema de esteganografía para imágenes JPEG conocido como F5, usando la herramienta Aletheia."
---

> En este artículo vamos a ver cómo detectar el esquema de esteganografía para
> imágenes JPEG conocido como F5. Para ello, usaremos la herramienta 
> de estegoanálisis [Aletheia](https://github.com/daniellerch/aletheia).

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

1. [Cómo funcionan F5 y nsF5](#como-funcionan-f5-y-nsF5)
2. [Exploración inicial](#exploración-inicial)
3. [Ataque de calibración](#ataque de calibración)
4. [Estegoanálisis con *Deep Learning*](#estegoanálisis-con-deep-learning)
5. [¿Podemos confiar en el modelo?](#podemos-confiar-en-el-modelo)
7. [Referencias](#referencias)




<br>
## Cómo funcionan F5 y nsF5


**F5** [[ 1 ](#referencias)] es un algoritmo para ocultar información en imágenes
JPEG. A diferencia de métodos anteriores, como 
[JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg),
F5 no modifica tanto el histograma de coeficientes DCT, por lo que es capaz de
evitar los ataques estadísticos que existían cuando se publicó.

Para ocultar información, F5 suma 1 a los coeficientes con valor positivo y
resta uno a los coeficientes con valor negativo. Los coeficientes
con valor cero no se modifican, pues esto alteraría la estadística de la 
imagen significativamente. 


Esta forma de ocultar información introduce un problema de comunicación. 
El receptor 
extraerá el mensaje leyendo el LSB de los coeficientes diferentes de cero,
puesto que los ceros no se usan. Pero si al modificar un coeficiente con 
valor 1 o -1, este se ha convertido en en cero, el receptor perdería ese
bit. La solución empleada por F5, cuando se producte esta situación, 
consiste en ocultar de nuevo el mismo bit en el coeficiente siguiente. 
Si bien esto resuelve el problema de comunicación, incrementa 
considerablemente el número de coeficientes modificados. Como consecuencia, 
la capacidad se ve reducida. Este problema se conoce como *shrinkage*. 

Por otra parte, F5 usa técnicas de *matrix embedding* para ocultar la 
información. Esto permite realizar menos cambios en la imagen,
para ocultar la misma cantidad de datos.

La implementación original de F5 está realizada en Java, y puede encontrarse
fácilmente por Internet, aunque no existe un repositorio oficial. Puede
descargarse una copia 
[aquí](https://github.com/daniellerch/stego-collection/tree/master/F5).

Esta implementación la usan diferentes herramientas. Quizás una de las
más populares es 
[Stegosuite](https://github.com/daniellerch/stego-collection/tree/master/stegosuite). 


Veamos un ejemplo de como usar la implementación Java de F5. Primero
descargamos una imagen de prueba:

```bash
wget http://links.uwaterloo.ca/Repository/TIF/lena3.tif
convert lena3.tif -quality 100 lena3.jpg
```

Y a continuación ocultamos un mensaje:

```bash
echo "My secret data" > secret.txt
java Embed -e secret.txt lena3.jpg lena3_f5.jpg 
```

<br>
El nombre **nsF5** [[ 2 ](#referencias)] viene de *non shrinkage F5*. Este
algoritmo usa técnicas de  **WPC** o *Wet Paper codes* para ocultar 
información. Estas técnicas permiten ocultar datos marcando ciertos 
coeficientes como "no modificables", de forma transparente para el 
receptor. De este manera se resuelve el problema del *shrinkage* sin 
penalizar la capacidad. Es decir, que aunque se generen nuevos ceros 
a partir de coeficientes con valor 1 o -1, el receptor podrá leer el mensaje.

Desde el punto de vista de las modificaciones realizadas en la imagen, 
F5 y nsF5 son equivalentes. Por lo que las mismas técnicas usadas para 
detectar nsF5 nos sirven para detectar F5, y viceversa. 
Sin embargo, para el mismo número de modificaciones, nsF5 puede ocultar 
más información que F5.


Aletheia dispone de un simulador de nsF5, por lo que podemos generar
una imagen de prueba con el siguiente comando:

```bash
./aletheia.py nsf5-color-sim lena3.jpg 0.2 nsf5 
```

> NOTA: En el comando anterior 0,2 corresponde al *payload*, es decir,
> estamos ocultando un mensaje cuyo tamaño es del 20% del número total
> de coeficientes diferentes de cero.

Con una imagen *cover* y su correspondiente imagen *stego* podemos usar
Aletheia para ver el tipo de modificaciones que se realizan. Lo hacemos
con el comando "print-dct-diffs".

> NOTA: La mayor parte de la salida del comando se ha suprimido


```bash
./aletheia.py print-dct-diffs lena3.jpg nsf5/lena3.jpg 

Channel 0:
[(-8.0, -7.0, 1.0), (1.0, 0.0, -1.0), (2.0, 1.0, -1.0), ...]
[(1.0, 0.0, -1.0), (2.0, 1.0, -1.0), (40.0, 39.0, -1.0), ...]
[(2.0, 1.0, -1.0), (1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (2.0, 1.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), ...]
[(1.0, 0.0, -1.0), (-1.0, 0.0, 1.0), (-1.0, 0.0, 1.0), ...]
[(-1.0, 0.0, 1.0), (1.0, 0.0, -1.0), (-5.0, -4.0, 1.0), ...]
[(2.0, 1.0, -1.0), (-1.0, 0.0, 1.0), (-1.0, 0.0, 1.0), ...]
[(3.0, 2.0, -1.0), (-22.0, -21.0, 1.0), (9.0, 8.0, -1.0), ...]

...

Common DCT coefficients frequency variation:

Channel 0:
-3: -52
-2: -61
-1: -435
+0: 1189
+1: -417
+2: -94
+3: -37
...
```

En la primera parte de la salida de Aletheia podemos ver como los coeficientes
se van modificando. La información se muestra en tripletas de valores.
El primer valor de la tripleta corresponde al valor original del coeficiente, 
el segundo corresponde al valor del coeficiente modificado y el tercero a la 
diferencia entre ambos.  Así, podemos ver como los valores negativos siempre
decrecen y los valores positivos siempre crecen. También podemos ver que no
hay ningún caso en el que se modifique un cero.

En la segunda parte de la salida de Aletheia vemos un resumen de la variación 
en la frecuencia de los coeficientes DCT centrales. Como podemos ver, el 
número de coeficientes con valor cero crece mientras que el número de 
coeficientes con valor 1 y -1 decrece. Este es el principal vector de ataque
en los ataques de calibración, que veremos más adelante.



<br>
## Exploración inicial

Para los siguientes experimentos usaremos las imágenes que hay en las carpetas
**actors/A1** y **actors/A3** de Aletheia. El actor A1 es un actor inocente, es 
decir, un actor que no está usando esteganografía. El actor A3 es un actor
culpable, es decir, que está usando esteganografía. Y convenientemente, usa el
algoritmo de esteganografía nsF5.

En ambos casos, podemos empezar con una exploración automática, usando el
parámetro "auto" de Aletheia. 


Para el actor A1:

```bash
aletheia.py auto actors/A1

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                   0.0      0.0      0.4      0.2   
4.jpg                   0.0      0.0      0.1      0.4   
10.jpg                  0.0      0.0      0.1      0.0   
6.jpg                   0.0      0.0      0.4      0.5   
7.jpg                   0.0      0.0     [0.7]    [0.7]  
8.jpg                   0.0      0.0      0.3      0.3   
9.jpg                   0.0      0.0      0.3      0.4   
1.jpg                   0.0      0.0      0.1      0.1   
3.jpg                   0.0      0.0      0.2      0.4   
5.jpg                   0.0      0.4      0.1     [0.5]  

* Probability of being stego using the indicated steganographic method.
```

Vemos que únicamente una imagen aparece como *stego* para nsF5. En este
caso se trata de un falso positivo. También hay algunos falsos positivos
para el algoritmo J-UNIWARD.


Para el actor A3:

```bash
./aletheia.py auto actors/A3

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                   0.0      0.0     [1.0]    [1.0]
4.jpg                   0.0      0.0     [0.6]     0.3
10.jpg                  0.0      0.0      0.1      0.3
6.jpg                   0.0      0.0     [0.9]    [1.0]
7.jpg                   0.0      0.0     [0.6]     0.5
8.jpg                   0.0      0.0     [0.9]     0.4
9.jpg                   0.0     [1.0]    [0.9]     0.4
1.jpg                   0.0      0.0     [0.6]    [0.5]
3.jpg                   0.0      0.0     [0.5]     0.1
5.jpg                   0.0      0.0     [0.9]     0.2

* Probability of being stego using the indicated steganographic method.
```

Vemos que casi todas las imágenes dan positivas para F5. Debe tenerse en 
cuenta que diferentes métodos pueden usar técnicas similares, por lo que 
es habitual obtener positivos con diferentes algoritmos de esteganografía.

El comando **auto** nos permite hacer una exploración que nos puede dar una 
idea inicial de si se está usando esteganografía y de qué algoritmo se está 
usando.





<br>
## Ataque de calibración

Cuando una imagen en formato "mapa de bits", se comprime a JPEG, la imagen
original se divide en bloques de 8x8, a los que les aplica una transformada
discreta del coseno o 
[DCT](https://es.wikipedia.org/wiki/Transformada_de_coseno_discreta).
A los coeficientes DCT obtenidos se les aplican unas matrices de cuantización
especialmente diseñadas para eliminar ciertos valores de impacto visual
reducido, lo que genera muchos coeficientes con valor cero. Esta información,
se almacena en el archivo JPEG y es usada para generar de nuevo el mapa de
bits cuando se desea visualizar la imagen.

La técnica de calibración consiste en descomprimir la imagen a mapa de bits,
eliminar algunas filas y columnas del principio (1-4) y volverla a comprimir
con JPEG. Esto obliga al proceso de compresión a elegir bloques de 8x8
diferentes a los originales, por lo que la nueva image JPEG puede disponer
de una estadística más parecida a la de una imagen original, que la de 
una imagen *stego*.

La idea de este proceso consiste en coger la imagen que queremos analizar,
crear otra imagen mediante calibración y comparar su estadística. Si es
similar, es que la imagen analizada era *cover*. Si es muy diferente, es que
la imagen original era *stego*.

Esta técnica no sirve para todo tipo de esteganografía JPEG, pero sí permite
montar un ataque muy potente contra F5. La idea de este ataque consiste en
calcular la relación entre el número de 1s y -1s respecto al número de ceros,
Que como hemos visto anteriormente, variaba significativamente. Los detalles
sobre el ataque pueden encontrarse en el artículo 
*Steganalysis of JPEG Images: Breaking the F5 Algorithm* [[ 3 ](#referencias)].

Aletheia implementa este ataque, que se puede ejecutar con un comando
como el siguiente:

```bash
./aletheia.py calibration actors/A3/2.jpg 
Hidden data found in channel 0: 0.08717203980726373
Hidden data found in channel 1: 0.05189659127411128
Hidden data found in channel 2: 0.08779451830369224
```

En el ejemplo anterior, la detección ha sido satisfactoria, aunque cuando
la cantidad de información oculta es reducida, no es muy fiable. En los
siguientes exemplos vemos qué ocurre con payloads bajos (0.75, 0.50, 0.50 y 0.30).


```bash
./aletheia.py calibration sample_images/lena_nsf5_0.75.jpg 
Hidden data found in channel 0: 0.20011387088739443
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.50.jpg 
Hidden data found in channel 0: 0.10527758055512187
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.40.jpg 
Hidden data found in channel 0: 0.07801106953467886
No hidden data found in channel 1
No hidden data found in channel 2
```

```bash
./aletheia.py calibration sample_images/lena_nsf5_0.30.jpg 
No hidden data found in channel 0
No hidden data found in channel 1
No hidden data found in channel 2
```




<br>
## Estegoanálisis con *Deep Learning*

Cuando ya tenemos una fuerte sospecha del algoritmo que se está usando
podemos usar directamente el modelo adecuado para realizar la predicción.

Aletheia dispone de múltiples modelos de *Deep Learning* ya entrenados, 
esperando a ser usados. Para F5, disponemos del modelo
**aletheia-models/effnetb0-A-alaska2-f5.h5**, que usa la red neural
EfficientNet B0 [[ 4 ](#referencias)].




Realicemos una predicción para el actor A1:

```bash
./aletheia.py effnetb0-predict actors/A1 aletheia-models/effnetb0-A-alaska2-nsf5.h5 0
...
actors/A1/1.jpg 0.086
actors/A1/10.jpg 0.143
actors/A1/2.jpg 0.418
actors/A1/3.jpg 0.226
actors/A1/4.jpg 0.11
actors/A1/5.jpg 0.074
actors/A1/6.jpg 0.393
actors/A1/7.jpg 0.668
actors/A1/8.jpg 0.256
actors/A1/9.jpg 0.282
```

Y otra para el actor A3:

```bash
./aletheia.py effnetb0-predict actors/A3 aletheia-models/effnetb0-A-alaska2-nsf5.h5 0
...
actors/A3/1.jpg 0.643
actors/A3/10.jpg 0.121
actors/A3/2.jpg 0.999
actors/A3/3.jpg 0.542
actors/A3/4.jpg 0.6
actors/A3/5.jpg 0.918
actors/A3/6.jpg 0.922
actors/A3/7.jpg 0.636
actors/A3/8.jpg 0.931
actors/A3/9.jpg 0.874
```

Como podemos ver, para esos dos actores, los resultados son bastante buenos.


En general, los modelos de *Machine Learning*, y más específicamente los 
modelos de *Deep Learning*, son mucho más precisos que los ataques 
estadísticos dedicados, como el ataque de calibración realizado anteriormente. 
Sin embargo, usar estos modelos crea un problema nuevo, que a día de 
hoy todavía no está resuelto: el **CSM** o *Cover Source Mismatch*. 
Este problema se produce cuando las imágenes que se quiere analizar 
tienen propiedades estadísticas significativamente diferentes de las
que se ha usado para entrenar el modelo. Como consecuencia, la fiabilidad
de la predicción se reduce considerablemente.

En el siguiente apartado, usaremos el método **DCI** [[ 5 ](#referencias)]
de Aletheia, que nos permite lidiar con el CSM.



<br>
## ¿Podemos confiar en el modelo?

Tal y como se ha comentado en el apartado anterior, el problema del CSM 
o *Cover Source Mismatch*  se produce cuando las imágenes que se quieren 
analizar tienen propiedades estadísticas diferentes de las que se ha usado 
para entrenar el modelo, reduciendo considerablemente la fiabilidad de
la predicción.

Aunque se intenta crear bases de datos de imágenes suficientemente 
diversas como para evitar este problema, en la práctica siempre 
aparecen conjuntos de imágenes con CSM. Con este problema en mente se creó el 
método DCI, que nos permite evaluar la fiabilidad de la predicción.

Para que el método DCI pueda ser aplicado, las imágenes a analizar deben
proceder del mismo actor. Pues si las imágenes analizadas, son una mezcla
de imágenes con diferentes propiedades estadísticas, los resultados del
DCI no serán fiables.

Se pueden consultar los resultados de algunos experimentos con CSM
[aquí](https://github.com/daniellerch/aletheia/blob/master/aletheia-models/README.md).
En ellos se puede ver como se reduce la precisión del modelo cuando hay
CSM, así como la predicción realizada por DCI.



Primero vamos a ver qué ocurre si usamos el método DCI con los actores A1
y A3, que no tienen CSM. 

Con el actor A1:

```bash
./aletheia.py dci nsf5-color-sim actors/A1
...
actors/A1/2.jpg          0
actors/A1/4.jpg          0 (inc)
actors/A1/10.jpg         0
actors/A1/6.jpg          0
actors/A1/7.jpg          1
actors/A1/8.jpg          0
actors/A1/9.jpg          0 (inc)
actors/A1/1.jpg          0 (inc)
actors/A1/3.jpg          0
actors/A1/5.jpg          0 (inc)
DCI prediction score: 0.8
```

Vemos imágenes marcadas como "inc", que son **inconsistencias** en la clasificación
detectadas por DCI, los resultados obtenidos en estas predicciones son los menos
fiables. Tenemos una predicción DCI del 80%, por lo que el modelo es bastante
fiable y, como podemos ver, casi todas las imágenes clasifican como *cover*.


Con el actor A3:

```bash
./aletheia.py dci nsf5-color-sim actors/A3
...
actors/A3/2.jpg          1 (inc)
actors/A3/4.jpg          1 (inc)
actors/A3/10.jpg         0 (inc)
actors/A3/6.jpg          1
actors/A3/7.jpg          1
actors/A3/8.jpg          1 (inc)
actors/A3/9.jpg          1
actors/A3/1.jpg          1 (inc)
actors/A3/3.jpg          1
actors/A3/5.jpg          1 (inc)
DCI prediction score: 0.7
``` 

En este caso el modelo resulta un poco menos fiable, pues tenemos una
predicción DCI del 70%. Casi todas las imágenes clasifican como *stego*.



Veamos ahora qué ocurre en casos de CSM. Ahora usaremos los actores B1 y B3, 
que proceden de la base de datos de imágenes **Imagenet**, y que como veremos, 
sufre de CSM.

Se pueden consultar los diferentes actores proporcionados para pruebas por 
Aletheia en este
[enlace](https://github.com/daniellerch/aletheia/blob/master/actors/README.md).


Empecemos con B1, un actor inocente:

```bash
./aletheia.py dci nsf5-color-sim actors/B1
...
actors/B1/2.jpg          0
actors/B1/4.jpg          1 (inc)
actors/B1/10.jpg         0
actors/B1/6.jpg          0 (inc)
actors/B1/7.jpg          0 (inc)
actors/B1/8.jpg          0 (inc)
actors/B1/9.jpg          0 (inc)
actors/B1/1.jpg          0 (inc)
actors/B1/3.jpg          1
actors/B1/5.jpg          0 (inc)
DCI prediction score: 0.65
```

Para este conjunto de imágenes el modelo no parece muy fiable y 
así nos lo indica la predicción DCI del 65%. 


Ahora veamos qué ocurre con B3, un actor culpable que usa nsF5:

```bash
./aletheia.py dci nsf5-color-sim actors/B3/
...
actors/B3/2.jpg          1 (inc)
actors/B3/4.jpg          0 (inc)
actors/B3/10.jpg         1 (inc)
actors/B3/6.jpg          1 (inc)
actors/B3/7.jpg          0
actors/B3/8.jpg          0
actors/B3/9.jpg          1 (inc)
actors/B3/1.jpg          1 (inc)
actors/B3/3.jpg          1 (inc)
actors/B3/5.jpg          0 (inc)
DCI prediction score: 0.6
```

En este caso el modelo tampoco funciona demasiado bien. La
predicción DCI es de solo el 60%.


Ante este tipo de escenario surgen dos preguntas importantes:



#### **¿Qué hacemos si DCI nos dice que el modelo no es fiable?**. 
Una forma de proceder es mejorar el modelo, es
decir, entrenar un nuevo modelo con más imágenes. Pero encontrar
suficientes imágenes del mismo tipo para mejorar la base de datos 
no es una tarea sencilla. Por este motivo el CSM es uno de los problemas
abiertos más importantes en estegoanálisis.

En cualquier caso, si sabemos que el modelo no es fiable podemos 
decidir no usarlo, que siempre es mejor que obtener resultados incorrectos
y no saberlo.

Otra opción, puede ser aplicar la técnica de calibración explicada
anteriormente, que aunque menos fiable, no tiene el problema del CSM,
pues solo usa la imagen a analizar.

Como referencia, el porcentaje de aciertos del ataque de Calibración
en la base de datos Alaska2 es de un **65%**, mientras que usando
la red EfficientNet B0 es de un **78**. Por lo que puede ser una
buena alternativa cuando el DCI nos indica que el modelo no es fiable.


#### **¿Qué pasa cuando tenemos pocas imágenes (<10) del mismo actor?**

Una opción es intentar conseguir más imágenes del mismo actor. Si no
es posible, siempre podemos usar la técnica de calibración, 
que solo necesita la imagen a analizar.


<br>
## Referencias

1. F5 - A Steganographic Algorithm. Andreas Westfeld. 4th Information Hiding
   Workshop, Pittsburgh, PA, USA, April 25-27, 2001.

2. Statistically undetectable JPEG steganography: Dead ends, challenges, 
   and opportunities. J. Fridrich, T. Pevný, and J. Kodovský. In J. Dittmann 
   and J. Fridrich, editors, Proceedings of the 9th ACM Multimedia & Security 
   Workshop, pages 3-14, Dallas, TX, September 20-21, 2007.

3. Steganalysis of JPEG Images: Breaking the F5 Algorithm, J. Fridrich, M. Goljan and 
   D. Hogea, 5th Information Hiding Workshop, Noordwijkerhout, The Netherlands, 
   7-9 October 2002, pp. 310-323.

4. EfficientNet: Rethinking model scaling for convolutional neural networks. 
   Mingxing Tan and Quoc V Le. In International Conference on Machine Learning, 2019.

5. Detection of Classifier Inconsistencies in Image Steganalysis. Daniel Lerch-Hostalot,
   David Megías. July 2019. Proceedings of the ACM Workshop on Information Hiding and 
   Multimedia Security.



<br>






