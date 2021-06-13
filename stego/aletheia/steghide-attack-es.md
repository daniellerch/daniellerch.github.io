---
layout: page
title: Ataque práctico a Steghide
noindex: false
submenu: true
submenuitem1: "<a href='/stego/aletheia/steghide-attack-en'>en</a>"
submenuitem2: "| es"
comments: true
---

> En este artículo vamos a ver cómo detectar **imagenes JPEG** en las que se
> ha ocultado información usando la herramienta **Steghide**. Para ello, 
> usaremos la herramienta de estegoanálisis 
> [Aletheia](https://github.com/daniellerch/aletheia).

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

1. [Cómo funciona Steghide](#cómo-funciona-steghide)
2. [Exploración inicial](#exploración-inicial)
3. [Estegoanálisis con *Deep Learning*](#estegoanálisis-con-deep-learning)
4. [¿Podemos confiar en el modelo?](#podemos-confiar-en-el-modelo)
5. [Ataque de fuerza bruta](#ataque-de-fuerza-bruta)
5. [Referencias](#referencias)


<br>
## Cómo funciona Steghide


[StegHide](http://steghide.sourceforge.net/) es una herramienta de 
esteganografía que permite ocultar información en diferentes tipos de
imágenes y ficheros de audio. A lo largo del artículos vamos a usar
la versión de Steghide v0.5.1 y nos vamos a centrar en el estegoanálisis
de imágenes JPEG.

Veamos primero como usar Steghide para ocultar información en una imagen.
Descargamos una imagen de prueba y ocultamos el texto "My secret data".

```bash
wget http://links.uwaterloo.ca/Repository/TIF/lena3.tif
convert lena3.tif -quality 90 lena3.jpg
echo "My secret data" > secret.txt
steghide embed -cf lena3.jpg -sf lena3_steghide.jpg -ef secret.txt -p mypass
```

Para extraer la información, podemos ejecutar un comando como el siguiente,
que guardará la información almacenada en el archivo "content.txt".


```bash
steghide extract -sf lena3_steghide.jpg -xf content.txt -p mypass          
```

Con una imagen *cover* y su correspondiente imagen *stego* podemos usar
Aletheia para ver el tipo de modificaciones que realiza Steghide. Lo hacemos
con el comando "print-dct-diffs".

> NOTA: La mayor parte de la salida del comando se ha suprimido


```bash
./aletheia.py print-dct-diffs lena3.jpg lena3_steghide.jpg 

Channel 0:
[(-11.0, -10.0, 1.0), (-1.0, -2.0, -1.0), (-2.0, -1.0, 1.0), ...]
[(4.0, 3.0, -1.0), (2.0, 1.0, -1.0), (22.0, 23.0, 1.0), ... ]
[(2.0, 1.0, -1.0), (-2.0, -1.0, 1.0), (-2.0, -1.0, 1.0), ...] 
[(1.0, 2.0, 1.0), (-2.0, -1.0, 1.0), (15.0, 16.0, 1.0), ...]
[(-2.0, -1.0, 1.0), (1.0, 2.0, 1.0), (2.0, 1.0, -1.0), ...]
[(-2.0, -3.0, -1.0), (1.0, 2.0, 1.0), (-20.0, -19.0, 1.0), ...]
[(2.0, 1.0, -1.0), (-5.0, -4.0, 1.0), (-8.0, -7.0, 1.0), ...]
[(-5.0, -4.0, 1.0), (1.0, 2.0, 1.0), (-2.0, -3.0, -1.0), ...]
[(2.0, 1.0, -1.0), (2.0, 1.0, -1.0), (2.0, 1.0, -1.0), ...]
[(-5.0, -4.0, 1.0), (1.0, 2.0, 1.0), (-2.0, -1.0, 1.0), ...]
...
Common DCT coefficients frequency variation:

Channel 0:
-3: -4
-2: 18
-1: -14
+0: 0
+1: -12
+2: 12
+3: 0
...

```

La sección del final, nos da un resumen de la variación en la frecuencia de los
coeficientes DCT centrales. Como podemos ver, apenas hay variación. Esto es 
debido a la característica más interesante de Steghide: en lugar de sustituir el
LSB de cada coeficiente, o de modificar ligeramente su valor, lo que hace es
intercambiarlo por otro coeficiente DCT que tenga el valor deseado. De esta manera
la frecuencia total de cada coeficiente apenas cambia, dificultando enormemente
la realización de ataques estadíticos de primer orden. 

Además, esta sustitución de un coeficiente por otro, se realiza siempre con 
coeficientes de valor similar (normalmente una diferencia de 1), por lo que 
el comportamiento es similar al de sumar o restar 1 al valor del coeficiente. 

Lo podemos ver en la salida de Aletheia, que nos muestra una tripleta de valores
para cada coeficiente modificado. El primer valor de la tripleta corresponde
al valor original del coeficiente, el segundo corresponde al valor del
coeficiente modificado y el tercero a la diferencia entre ambos.  Así, podemos
ver como los coeficientes con valor 2 (-2) suelen pasar a tener el valor 1 (-1), 
los que tienen valor 1 (-1) suelen pasar a tener valor 2 (-2), etc. La excepción 
son los coeficientes con valor 0, que nunca se modifican.


<br>
## Exploración inicial

Para los siguientes experimentos usaremos las imágenes que hay en las carpetas
**actors/A1** y **actors/A2** de Aletheia. El actor A1 es un actor inocente, es 
decir, un actor que no está usando esteganografía. El actor A2 es un actor
culpable, es decir, que está usando esteganografía. Y convenientemente, usa el
algoritmo de esteganografía Steghide.

En ambos casos, podemos empezar con una exploración automátima, usando el
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

Vemos que ninguna imagen aparece como *stego* para Steghide, aunque
hay algunos falsos positivos para nsF5 y J-UNIWARD.



Para el actor A2:

```bash
./aletheia.py auto actors/A2
                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                  [1.0]    [1.0]    [0.9]     0.3   
4.jpg                  [1.0]    [1.0]    [0.7]     0.3   
10.jpg                  0.0     [1.0]     0.3      0.2   
6.jpg                   0.0     [1.0]     0.1      0.0   
7.jpg                  [1.0]    [1.0]     0.3      0.1   
8.jpg                   0.0     [1.0]     0.1      0.2   
9.jpg                  [0.8]    [1.0]    [0.7]     0.1   
1.jpg                  [1.0]    [1.0]    [0.8]     0.1   
3.jpg                  [1.0]    [1.0]    [1.0]     0.3   
5.jpg                   0.0      0.1     [0.7]    [0.6]  
```

Vemos que casi todas las imágenes dan positivas para Steghide.
Debe tenerse en cuenta que diferentes métodos pueden usar técnicas 
similares, por lo que es habitual obtener positivos con diferentes 
algoritmos de esteganografía.

El comando **auto** nos permite hacer una exploración que
nos puede dar una idea inicial de si se está usando esteganografía y
de qué algoritmo se está usando.





<br>
## Estegoanálisis con *Deep Learning*

Cuando ya tenemos una fuerte sospecha del algoritmo que se está usando
podemos usar directamente el modelo adecuado para realizar la predicción.

Aletheia dispone de múltiples modelos de *Deep Learning* ya entrenados, 
esperando a ser usados. Para Steghide, disponemos del modelo
**aletheia-models/effnetb0-A-alaska2-steghide.h5**, que usa la red neural
EfficientNet B0 [[ 1 ](#referencias)].




Realicemos una predicción para el actor A1:

```bash
./aletheia.py effnetb0-predict actors/A1 aletheia-models/effnetb0-A-alaska2-steghide.h5 0
...
actors/A1/1.jpg 0.0
actors/A1/10.jpg 0.001
actors/A1/2.jpg 0.0
actors/A1/3.jpg 0.0
actors/A1/4.jpg 0.0
actors/A1/5.jpg 0.352
actors/A1/6.jpg 0.011
actors/A1/7.jpg 0.002
actors/A1/8.jpg 0.0
actors/A1/9.jpg 0.001
```

Y otra para el actor A2:

```bash
./aletheia.py effnetb0-predict actors/A2 aletheia-models/effnetb0-A-alaska2-steghide.h5 0
actors/A2/1.jpg 1.0
actors/A2/10.jpg 1.0
actors/A2/2.jpg 1.0
actors/A2/3.jpg 1.0
actors/A2/4.jpg 1.0
actors/A2/5.jpg 0.096
actors/A2/6.jpg 1.0
actors/A2/7.jpg 1.0
actors/A2/8.jpg 1.0
actors/A2/9.jpg 1.0
```

Como podemos ver, para esos dos actores, los resultados son bastante buenos.

En general, los modelos de *Machine Learning*, y más específicamente los 
modelos de *Deep Learning*, son mucho más precisos que los ataques 
estadísticos dedicados a ciertas técnicas (RS [[ 2 ](#referencias)],
SPA [[ 3 ](#referencias)], Calibration [[ 4 ](#referencias)], etc). 
Sin embargo, usar estos modelos crea un problema nuevo, que a día de 
hoy todavía no está resuelto: el **CSM** o *Cover Source Mismatch*. 
Este problema se produce cuando las imágenes que se quiere analizar 
tienen propiedades estadísticas significativamente diferentes de las
que se ha usado para entrenar el modelo. Como consecuencia, la fiabilidad
de la predicción se reduce considerablemente.

En el siguiente apartado, usaremos el método **DCI** [[ 5 ](#referencias)]
de Aletheia, que nos 
permite lidiar con el CSM.


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



Primero vamos a ver que ocurre si usamos el método DCI con los actores A1
y A2, que no tienen CSM. 

Con el actor A1:

```bash
./aletheia.py dci steghide-sim actors/A1
...
actors/A1/2.jpg          0
actors/A1/4.jpg          0
actors/A1/10.jpg         0
actors/A1/6.jpg          0
actors/A1/7.jpg          0
actors/A1/8.jpg          0
actors/A1/9.jpg          0
actors/A1/1.jpg          0
actors/A1/3.jpg          0
actors/A1/5.jpg          0
DCI prediction score: 1.0
```

Vemos que Aletheia acierta todas las predicciones y que la predicción DCI 
es del 100%, es decir, que los resultados son fiables.


Con el actor A2:

```bash
./aletheia.py dci steghide-sim actors/A2
...
actors/A2/2.jpg          1
actors/A2/4.jpg          1
actors/A2/10.jpg         1 (inc)
actors/A2/6.jpg          1 (inc)
actors/A2/7.jpg          1 (inc)
actors/A2/8.jpg          1
actors/A2/9.jpg          1 (inc)
actors/A2/1.jpg          1
actors/A2/3.jpg          1
actors/A2/5.jpg          0 (inc)
DCI prediction score: 0.75
``` 

Vemos imágenes marcadas como "inc", que son **inconsistencias** en la clasificación
detectadas por DCI. En estos casos la predicción es la menos fiables. Aletheia detecta
el casi todas las imágenes como *stego* y una predicción DCI del 75% nos dice que
la calidad del modelo es aceptable.


Veamos ahora qué ocurre en casos de CSM. Ahora usaremos los actores B1 y B2, 
que proceden de la base de datos de imágenes **Imagenet**, y que como veremos, 
sufre de CSM.

Se pueden consultar los diferentes actores proporcionados para pruebas por 
Aletheia en este
[enlace](https://github.com/daniellerch/aletheia/blob/master/actors/README.md).



Empecemos con B1, un actor inocente:

```bash
./aletheia.py dci steghide-sim actors/B1
...
actors/B1/2.jpg          0
actors/B1/4.jpg          0
actors/B1/10.jpg         0
actors/B1/6.jpg          0 (inc)
actors/B1/7.jpg          1 (inc)
actors/B1/8.jpg          0
actors/B1/9.jpg          0
actors/B1/1.jpg          0 (inc)
actors/B1/3.jpg          0 (inc)
actors/B1/5.jpg          1 (inc)
DCI prediction score: 0.75
```

Para este conjunto de imágenes la predicción DCI es del 75%.


Ahora veamos que ocurre con B2, un actor culpable que usa Steghide:

```bash
./aletheia.py dci steghide-sim actors/B2/
...
actors/B2/2.jpg          0 (inc)
actors/B2/4.jpg          0 (inc)
actors/B2/10.jpg         1 (inc)
actors/B2/6.jpg          1 (inc)
actors/B2/7.jpg          0 (inc)
actors/B2/8.jpg          0 (inc)
actors/B2/9.jpg          1 (inc)
actors/B2/1.jpg          1 (inc)
actors/B2/3.jpg          1 (inc)
actors/B2/5.jpg          1 (inc)
DCI prediction score: 0.5
```

En este caso la predicción DCI nos indica que el modelo no es fiable,
por lo que no deberíamos confiar en sus predicciones.


Ante este tipo de escenario surgen dos preguntas importantes:

#### **¿Qué hacemos si DCI nos dice que el modelo no es fiable?**. 
Desgraciadamente la única forma de proceder es mejorar el modelo, es
decir, entrenar un nuevo modelo con más imágenes. Pero encontrar
suficientes imágenes del mismo tipo para mejorar la base de datos 
no es una tarea sencilla. Por este motivo el CSM es uno de los problemas
abiertos más importantes en estegoanálisis.

En cualquier caso, si sabemos que el modelo no es fiable podemos 
decidir no usarlo, que siempre es mejor que obtener resultados incorrectos
y no saberlo.


#### **¿Qué pasa cuando tenemos pocas imágenes (<10) del mismo actor?**
Existen métodos de esteganografía para los que hay ataques estadísticos 
fiables que se pueden realizar con una sola imagen. Desgraciadamente Steghide 
no es uno dellos, por lo que con pocas imágenes no se puede realizar una 
detección fiable, pues no podemos usar DCI para saber si el modelo funciona.

En este caso, lo único que podemos hacer es intentar conseguir más imágenes
del mismo actor.

<br>
## Ataque de fuerza bruta

Aletheia nos da la posibilidad de realizar un ataque de fuerza bruta para
encontrar la contraseña que se ha usado. Si creemos que una imagen contiene
datos ocultos usando Steghide, podemos probar esta opción.

Veamos un comando de ejemplo:

```bash
./aletheia.py brute-force-steghide test.jpg resources/passwords.txt 
Using 16 processes
Completed: 0.4%    
Password found: 12345ab
```


<br>
## Referencias

1. EfficientNet: Rethinking model scaling for convolutional neural networks. 
    Mingxing Tan and Quoc V Le. In International Conference on Machine Learning, 2019.

2. Reliable Detection of LSB Steganography in Color and Grayscale Images. 
   Jessica Fridrich, Miroslav Goljan and Rui Du. Proc. of the ACM Workshop 
   on Multimedia and Security, Ottawa, Canada, October 5, 2001, pp. 27-30.

3. Detection of LSB steganography via sample pair analysis. S. Dumitrescu, 
   X. Wu and Z. Wang. IEEE Transactions on Signal Processing, 51 (7), 1995-2007.

4. Steganalysis of JPEG Images: Breaking the F5 Algorithm, with M. Goljan and 
   D. Hogea, 5th Information Hiding Workshop, Noordwijkerhout, The Netherlands, 
   7-9 October 2002, pp. 310-323.

5. Detection of Classifier Inconsistencies in Image Steganalysis. July 2019. 
   Proceedings of the ACM Workshop on Information Hiding and Multimedia Security.



<br>


