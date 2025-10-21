---
layout: page
title: "Introducción al estegoanálisis con Aletheia"
subtitle: "" 
noindex: false
meta-title: "Introducción al estegoanálisis con Aletheia"
meta-description: "Artículo acerca del uso básico de la herramienta para estegoanálisis Aletheia"
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
comments: true
---

<center style='margin-bottom:30px'>Aletheia <a href='https://github.com/daniellerch/aletheia/tree/v0.3'>v0.3</a></center>


> En este artículo vamos a ver cómo usar los comandos que ofrece la herramienta 
> [Aletheia](https://github.com/daniellerch/aletheia) para el estegoanálisis de imágenes.



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

1. [Comandos de Aletheia](#comandos-de-aletheia)
2. [Herramientas automatizadas](#herramientas-automatizadas)
3. [Ataques estructurales](#ataques-estructurales)
4. [Ataques de calibración](#ataques-de-calibración)
5. [Simuladores](#simuladores)
6. [Estegoanálisis basado en *Machine/Deep Learning*](#estegoanálisis-basado-en-machinedeep-learning)
7. [Ataques de fuerza bruta](#ataques-de-fuerza-bruta)
8. [Otras herramientas](#otras-herramientas)


<br>
## Comandos de Aletheia

[Aletheia](https://github.com/daniellerch/aletheia) es una herramienta de 
estegoanálisis para imágenes basada en comandos. A continuación veremos
como usarlos.

Los detalles para la instalación de Aletheia pueden encontrarse 
[aquí](https://github.com/daniellerch/aletheia/blob/master/INSTALL.md).

Una vez instalada, la ejecución de Aletheia sin parámetros nos permite ver
un listado de los comandos disponibles.


```bash
$ ./aletheia.py

./aletheia.py <command>

COMMANDS:

  Automated tools:
  - auto:      Try different steganalysis methods.
  - dci:       Predict a set of images using DCI evaluation.

  Structural LSB detectors (Statistical attacks to LSB replacement):
  - spa:           Sample Pairs Analysis.
  - rs:            RS attack.
  - ws:            Weighted Stego Attack.
  - triples:       Triples Attack.

  Calibration attacks to JPEG steganography:
  - calibration:   Calibration attack on F5.

  Feature extractors:
  - srm:           Full Spatial Rich Models.
  - srmq1:         Spatial Rich Models with fixed quantization q=1c.
  - scrmq1:        Spatial Color Rich Models with fixed quantization q=1c.
  - gfr:           JPEG steganalysis with 2D Gabor Filters.
  - dctr:          JPEG Low complexity features extracted from DCT residuals.

  Embedding simulators:
  - lsbr-sim:             LSB replacement simulator.
  - lsbm-sim:             LSB matching simulator.
  - hugo-sim:             HUGO simulator.
  - wow-sim:              WOW simulator.
  - s-uniward-sim:        Spatial UNIWARD simulator.
  - s-uniward-color-sim:  Spatial UNIWARD color simulator.
  - j-uniward-sim:        JPEG UNIWARD simulator.
  - j-uniward-color-sim:  JPEG UNIWARD color simulator.
  - j-mipod-sim:          JPEG MiPOD simulator.
  - j-mipod-color-sim:    JPEG MiPOD color simulator.
  - hill-sim:             HILL simulator.
  - hill-color-sim:       HILL color simulator.
  - ebs-sim:              EBS simulator.
  - ebs-color-sim:        EBS color simulator.
  - ued-sim:              UED simulator.
  - ued-color-sim:        UED color simulator.
  - nsf5-sim:             nsF5 simulator.
  - nsf5-color-sim:       nsF5 color simulator.
  - steghide-sim:         Steghide simulator.
  - outguess-sim:         Outguess simulator.
  - steganogan-sim:       SteganoGAN simulator.

  ML-based steganalysis:
  - split-sets:            Prepare sets for training and testing.
  - split-sets-dci:        Prepare sets for training and testing (DCI).
  - create-actors:         Prepare actors for training and testing.
  - effnetb0:              Train a model with EfficientNet B0.
  - effnetb0-score:        Score with EfficientNet B0.
  - effnetb0-predict:      Predict with EfficientNet B0.
  - effnetb0-dci-score:    DCI Score with EfficientNet B0.
  - effnetb0-dci-predict:  DCI Prediction with EfficientNet B0.
  - e4s:                   Train Ensemble Classifiers for Steganalysis.
  - e4s-predict:           Predict using EC.
  - actor-predict-fea:     Predict features for an actor.
  - actors-predict-fea:    Predict features for a set of actors.

  Find password by brute force using a list of passwords:
  - brute-force-f5:            Brute force a password using F5
  - brute-force-steghide:      Brute force a password using StegHide
  - brute-force-outguess:      Brute force a password using Outguess
  - brute-force-openstego:     Brute force a password using OpenStego
  - brute-force-generic:       Generic tool for finding the password using a command

  Tools:
  - hpf:                   High-pass filter.
  - print-diffs:           Differences between two images.
  - print-dct-diffs:       Differences between the DCT coefficients of two JPEG images.
  - print-pixels:          Print a range of píxels.
  - print-coeffs:          Print a range of JPEG coefficients.
  - rm-alpha:              Opacity of the alpha channel to 255.
  - plot-histogram:        Plot histogram.
  - plot-histogram-diff:   Plot histogram of differences.
  - plot-dct-histogram:    Plot DCT histogram.
  - eof-extrat:            Extract the data after EOF.
  - print-metadata:        Print Exif metadata.

```


Cada comando dispone de sus propios parámetros. Para saber que parámetros 
requiere un comando solo tenemos que ejecutarlo. Por ejemplo, supongamos
que queremos realizar un ataque WS. Para ver los parámetros que requiere,
solo tenemos que ejecutar dicho comando:


```bash
$ ./aletheia.py ws
./aletheia.py ws <image>
```

Como podemos ver, este comando solo necesita recibir como parámetro
la imagen que queremos analizar. Por lo tanto, podemos efectuar el
ataque con un comando como el siguiente:

```bash
$ ./aletheia.py ws sample_images/lena_lsbr.png 
Hidden data found in channel R 0.10590840834668327
Hidden data found in channel G 0.07463418193363092
Hidden data found in channel B 0.07968467118722876
```

Como se puede ver en la salida de Aletheia, encontramos información
oculta en los tres canales.


La dinámica de uso es la misma para todos los comandos.


<br>
## Herramientas automatizadas


Aletheia dispone de diferentes comandos automatizados que simplifican
bastante algunas tareas habituales de estegoanálisis. Corresponde a
la sección:


```bash
  Automated tools:
  - auto:      Try different steganalysis methods.
  - dci:       Predict a set of images using DCI evaluation.
```

**El comando "auto"**:

El primer comando es el
comando **auto**, que realiza un análisis exploratorio intentando
identificar la técnica de estegoanálisis usada. Veamos un ejemplo:

```bash
$ ./aletheia.py auto actors/A2/

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

* Probability of steganographic content using the indicated method.
```

De lo que deducimos que el esquema de esteganografía más probable
es Steghide.


Este comando usa internamente los modelos 
[effnetb0](https://github.com/daniellerch/aletheia/tree/master/aletheia-models),
que son modelos entrenados con la base de datos de imágenes 
[Alaska2](https://github.com/daniellerch/aletheia/blob/master/aletheia-models/README.md).
Son modelos para imágenes en color, por lo que no se pueden usar con imágenes
en escala de grises. 
Por otra parte, el uso de estos modelos para predecir imágenes con características 
estadísticas diferentes a las de las imagenes de Alaska2, podría dar lugar
a resultados poco fiables. Debido a esto, conviene usar el comando **dci**
que veremos a continuación.


**El comando "dci"**:

El segundo comando es el comando **dci**, usado para detectar casos en 
los que los modelos usados por Aletheia podrían no ser apropiados para
las imágenes que estamos analizando. Este problema, conocido como 
CSM o *Cover Source Mismatch*, se trata con cierto detalle en los
siguientes artículos:

- [Ataque práctico a Steghide](/stego/aletheia/v03/steghide-attack-es/#podemos-confiar-en-el-modelo).
- [Ataque práctico a F5](/stego/aletheia/v03/f5-attack-es/#podemos-confiar-en-el-modelo).


Vamos a ver un par de ejemplos a continuación. Empezaremos continuando el
ejemplo anterior. Hemos visto que el comando **auto** nos indicaba que
el método más probable es Steghide.

Por ello, a continuación es conveniente ver si los modelos disponibles en
Aletheia son apropiados para hacer predicciones sobre estas imágenes, con
Steghide.
Para ello usamos el comando **dci** de la siguiente manera:

```bash
$ ./aletheia.py dci steghide-sim actors/A2/
Preparind the B set ...
Using 16 threads
actors/A2/2.jpg          1
actors/A2/4.jpg          1 (inc)
actors/A2/10.jpg         1 (inc)
actors/A2/6.jpg          1 (inc)
actors/A2/7.jpg          1 (inc)
actors/A2/8.jpg          1
actors/A2/9.jpg          1 (inc)
actors/A2/1.jpg          1
actors/A2/3.jpg          1
actors/A2/5.jpg          0 (inc)
DCI prediction score: 0.7
```

Como podemos ver, obtenemos una predición DCI de 0,7. Esto significa que los
modelos usados aciertan, aproximadamente, el 70% de las veces. Si consideramos
que este porcentage de aciertos es suficiente, podemos confiar en el resultado.


Vamos a ver ahora, qué ocurre cuando, debido al problema del CSM, los modelos
no son adecuados. 

Usamos el comando **auto** con el actor de prueba B4:

```bash
$ ./aletheia.py auto actors/B4

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                   0.0      0.0     [0.9]    [0.5]
4.jpg                  [0.7]    [1.0]     0.3     [0.5]
10.jpg                  0.0     [1.0]     0.1      0.3
6.jpg                   0.0      0.0      0.3     [0.9]
7.jpg                  [1.0]     0.0      0.0     [0.6]
8.jpg                   0.0      0.0      0.3     [0.5]
9.jpg                   0.0      0.0      0.1     [0.9]
1.jpg                   0.0     [1.0]     0.1     [0.6]
3.jpg                   0.0      0.0      0.3      0.4
5.jpg                   0.0      0.0     [0.9]    [0.6]

* Probability of steganographic content using the indicated method.
```

Usando el comando **auto**, vemos que el método que se predice con más 
probabilidad es **J-UNIWARD**. Ahora nos interesa saber si los modelos son 
fiables para realizar esta predicción.

Ejecutamos el comando **dci**, esta vez para J-UNIWARD:

```bash
$ ./aletheia.py dci j-uniward-color-sim actors/B4 0

Preparind the B set ...
Using 16 threads
actors/B4/2.jpg          1 (inc)
actors/B4/4.jpg          1 (inc)
actors/B4/10.jpg         0 (inc)
actors/B4/6.jpg          1
actors/B4/7.jpg          1 (inc)
actors/B4/8.jpg          1 (inc)
actors/B4/9.jpg          1 (inc)
actors/B4/1.jpg          1 (inc)
actors/B4/3.jpg          0 (inc)
actors/B4/5.jpg          1 (inc)
DCI prediction score: 0.55

```

Como podemos ver, la predicción que ser realiza es de 0,55. Un 55% de 
probabilidad de acierto es muy baja, por lo que no es conveniente confiar
en los resultados obtenidos. Se trata de un caso de CSM.

**NOTA IMPORTANTE:** Conviene tener en cuenta que el comando "dci" requiere que se analice
un actor, no una sola imagen. Es decir, que necesitamos disponer de varias
imágenes del mismo actor (con las mismas propiedades estadísticas) para poder 
aplicar este método. Unas 10 imágenes suelen ser suficientes, aunque la
precisión mejora con la cantidad de imágenes.



<br>
## Ataques estructurales

Los ataques estrucucturales estan diseñados para detectar algoritmos que 
usan la técnica de sustitución del bit menos significativo (LSB 
*replacement*). Esta técnica es usada por herramientas como 
[OpenStego](https://www.openstego.com/) o
[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html), entre muchas otras.


Corresponde a la sección:

```bash
  Structural LSB detectors (Statistical attacks to LSB replacement):
  - sp:            Sample Pairs Analysis (Octave vesion).
  - ws:            Weighted Stego Attack.
  - triples:       Triples Attack.
  - spa:           Sample Pairs Analysis.
  - rs:            RS attack.
```



Aletheia implementa ataques estructurados como el ataque RS, el ataque SPA, 
el ataque WS, etc. En el primer apartado hemos visto un ejemplo de uso del
ataque WS. Ahora, vemos un ejemplo del ataque SPA.

```bash
./aletheia.py spa sample_images/lena_lsbr.png
Hidden data found in channel R 0.09308090623358549
Hidden data found in channel G 0.09238585295279302
Hidden data found in channel B 0.11546638236749293
``` 

Como vemos, encuentra información oculta en los tres canales.

<br>
## Ataques de calibración

Los ataques de calibración son ataques que fuerzan la recompresión de una
imagen JPEG con el objetivo de obtener una nueva imagen con características
estadísticas similares a las de la imagen *cover* original. Aletheia implementa
el ataque de calibración al esquema de esteganografía F5.

Corresponde a la sección:

```bash
  Calibration attacks to JPEG steganography:
  - calibration:   Calibration attack on F5.
```

Se puede realizar dicho ataque con un comando como el siguiente:

```bash
./aletheia.py calibration sample_images/lena_f5.jpg
Hidden data found in channel 0: 0.4802783178664965
Hidden data found in channel 1: 0.46723791165593515
Hidden data found in channel 2: 0.45050276128936173
```

Más detalles sobre este ataque en el artículo:
- [Ataque práctico a F5](/stego/aletheia/v03/f5-attack-es/).





<br>
## Simuladores

Para poder realizar experimentos y para entrenar modelos
de *machine/deep learning* es necesario disponer de imágenes con
mensajes ocultos. Para ello, Aletheia proporciona múltiples simuladores
de esquemas de esteganografía, que permiten ocultar mensajes aleatorios
en todas las imágenes de una carpeta proporcionada.

Corresponde a la sección:

```bash
  Embedding simulators:
  - lsbr-sim:             LSB replacement simulator.
  - lsbm-sim:             LSB matching simulator.
  - hugo-sim:             HUGO simulator.
  - wow-sim:              WOW simulator.
  - s-uniward-sim:        Spatial UNIWARD simulator.
  - s-uniward-color-sim:  Spatial UNIWARD color simulator.
  - j-uniward-sim:        JPEG UNIWARD simulator.
  - j-uniward-color-sim:  JPEG UNIWARD color simulator.
  - j-mipod-sim:          JPEG MiPOD simulator.
  - j-mipod-color-sim:    JPEG MiPOD color simulator.
  - hill-sim:             HILL simulator.
  - hill-color-sim:       HILL color simulator.
  - ebs-sim:              EBS simulator.
  - ebs-color-sim:        EBS color simulator.
  - ued-sim:              UED simulator.
  - ued-color-sim:        UED color simulator.
  - nsf5-sim:             nsF5 simulator.
  - nsf5-color-sim:       nsF5 color simulator.
  - steghide-sim:         Steghide simulator.
  - outguess-sim:         Outguess simulator.
  - steganogan-sim:       SteganoGAN simulator.
```

En el siguiente ejemplo ocultamos mensajes aleatorios usando la 
ténica de esteganografía LSB *matching*. El tamaño de 
estos mensajes es de, aproximadamente, el 20% del número total 
de píxeles.

```bash
./aletheia.py lsbm-sim cover_image_dir/ 0.2 stego_image_dir/
```

Este comando, obtendrá todas las imágenes de la carpeta **cover_image_dir**
y les ocultará un mensaje aleatorio, guardando las imágenes *stego*
en la carpeta **stego_image_dir**.


También se puede especificar el *payload* en un rango de valores.
Por ejemplo, para ocultar mensajes de un tamaño aleatorio entre
el 5% y el 40% del tamaño de la imagen, podemos ejecutar el 
siguiente comando:

```bash
./aletheia.py lsbm-sim cover_image_dir/ 0.05-0.40 stego_image_dir/
```



<br>
## Estegoanálisis basado en *Machine/Deep Learning*

Las herramientas usadas para crear y usar modelos de 
*machine/deep learning* se encuentran en las dos secciones siguientes:




```bash
  Feature extractors:
  - srm:           Full Spatial Rich Models.
  - srmq1:         Spatial Rich Models with fixed quantization q=1c.
  - scrmq1:        Spatial Color Rich Models with fixed quantization q=1c.
  - gfr:           JPEG steganalysis with 2D Gabor Filters.
  - dctr:          JPEG Low complexity features extracted from DCT residuals.
```
   
```bash
  ML-based steganalysis:
  - split-sets:            Prepare sets for training and testing.
  - split-sets-dci:        Prepare sets for training and testing (DCI).
  - create-actors:         Prepare actors for training and testing.
  - effnetb0:              Train a model with EfficientNet B0.
  - effnetb0-score:        Score with EfficientNet B0.
  - effnetb0-predict:      Predict with EfficientNet B0.
  - effnetb0-dci-score:    DCI Score with EfficientNet B0.
  - effnetb0-dci-predict:  DCI Prediction with EfficientNet B0.
  - e4s:                   Train Ensemble Classifiers for Steganalysis.
  - e4s-predict:           Predict using EC.
  - actor-predict-fea:     Predict features for an actor.
  - actors-predict-fea:    Predict features for a set of actors.
```

El *machine learning* tradicional se realiza en dos pasos. Primero se
extraen características de las imágenes, para lo que se usan los comandos
de la seccion *Feature extractors*. A continuación se entrena un clasificador
y se usa para hacer predicciones. Sin embargo, este enfoque ha quedado atrás
respecto al *deep learning*, por lo que no entraremos en esta parte. El
lector puede explorar los comandos por si mismo, pues siguen la dinámica 
habitual de los comandos de Aletheia.

En cuanto al uso de *deep learning*, la predicción usando los modelos
pre-entrenados que proporciona Aletheia, puede verse en los siguientes
artículos:
- [Ataque práctico a Steghide](/stego/aletheia/v03/steghide-attack-es/).
- [Ataque práctico a F5](/stego/aletheia/v03/f5-attack-es/).





<br>
## Ataques de fuerza bruta

Aletheia implementa ataques de fuerza bruta a diferentes herramientas
de esteganografía. Esto puede ser útil si sabemos, o sospechamos, que
se ha usado una herramienta concreta y queremos obtener la contraseña
y el mensaje oculto.


Corresponde a la sección:

```bash
  Find password by brute force using a list of passwords:
  - brute-force-steghide:      Brute force a password using StegHide
  - brute-force-outguess:      Brute force a password using Outguess
  - brute-force-openstego:     Brute force a password using OpenStego
  - brute-force-generic:       Generic tool for finding the password using a command
```


Podemos realizar ataques a diferentes herramientas de esteganografía. 
Aquí, vamos a ver solo dos ataques, pues todos son similares.


Primero, veamos como realizar un ataque a la conocida herramienta
[OpenStego](https://www.openstego.com/). 

Ocultamos un mensaje en una imagen PNG, protegida por contraseña:


```bash
$ openstego embed -p 123456 -mf secret.txt -cf sample_images/lena.png -sf stego.png
```

A continuación, usamos Aletheia para encontrar la contraseña y extraer el mensaje:

```bash
./aletheia.py brute-force-openstego stego.png resources/passwords.txt 
Using 16 processes
Completed: 0.0%    
Password found: 123456
```




Ahora realizaremos un ataque a [Steghide](http://steghide.sourceforge.net/).
Ocultamos un mensaje usando esta herramienta, en una imagen JPEG:

```bash
$ steghide embed -cf cover.jpg -sf test.jpg -p 12345ab
Hello World!
embedding standard input in "cover.jpg"... done
writing stego file "image.jpg"... done
```

A continuación, usamos Aletheia para encontrar la contraseña y extraer el mensaje:

```bash
./aletheia.py brute-force-steghide test.jpg resources/passwords.txt 
Using 16 processes
Completed: 0.4%    
Password found: 12345ab
```





<br>
## Otras herramientas

Finalmente, existe un conjunto de comandos que pueden usarse para diferentes
tareas. Todos ellos están agrupados en la última sección:

```bash
  Tools:
  - hpf:                   High-pass filter.
  - print-diffs:           Differences between two images.
  - print-dct-diffs:       Differences between the DCT coefficients of two JPEG images.
  - rm-alpha:              Opacity of the alpha channel to 255.
  - plot-histogram:        Plot histogram.
  - plot-histogram-diff:   Plot histogram of differences.
  - plot-dct-histogram:    Plot DCT histogram.
```


No explicaremos estos comandos. Solo mencionar, que los dos comandos más
interesantes son **print-diffs** y **print-dct-diffs**. Estos nos permiten ver las
diferencias entre una imagen *cover* y la misma imagen *stego* (con un mensaje oculto).
Esto resulta muy útil cuando analizamos una herramienta de esteganografía y no sabemos
exactamente lo que hace. 


El lector puede explorar los comandos restantes, pues son sencillos y siguen la
dinámica habitual de Aletheia.








