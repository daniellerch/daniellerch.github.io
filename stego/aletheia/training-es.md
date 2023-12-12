---
layout: page
title: "Entrenamiento de modelos para Aletheia"
subtitle: "" 
noindex: false
meta-title: "Entrenamiento de modelos EfficientNet-b0 para Aletheia"
meta-description: "Artículo acerca del entrenamiento de modelos para Aletheia"
meta-keywords: "esteganografía, estegoanálisis, imágenes, DCI"
lang-suffix: "-es"
comments: true
---

> En este artículo vamos a ver cómo usar los comandos que ofrece 
> [Aletheia](https://github.com/daniellerch/aletheia) para entrenar modelos
> EfficientNet-b0



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

1. [Introducción](#introduccion)
2. [Bases de datos de imágenes](#bases-de-datos-de-imágenes)
3. [Preparación de conjuntos de datos](#preparación-de-conjuntos-de-datos)
4. [Entrenamiento de modelos](#entrenamiento-de-modelos)
5. [Probando los modelos](#probando-los-modelos)
6. [Haciendo predicciones](#haciendo-predicciones)


<br>
## Introducción


Este artículo explora el entrenamiento de modelos EfficientNet-B0 para el 
análisis esteganográfico de imágenes utilizando Aletheia. Iniciaremos con 
una colección de imágenes 'cover', que son aquellas sin mensajes ocultos. 
Esta colección se utilizará para generar un conjunto de imágenes 'stego', 
es decir, imágenes que contienen mensajes ocultos. 

Usaremos las imágenes cover y las stego para preparar un conjunto de datos de 
entrenamiento, que incluirá subconjuntos específicos para entrenamiento, 
validación y pruebas. Las imágenes de entrenamiento se emplearán para 
entrenar el modelo, mientras que las de validación ayudarán a determinar el 
punto óptimo para concluir el entrenamiento. Finalmente, evaluaremos el 
rendimiento del modelo con el conjunto de imágenes de prueba para determinar 
la eficacia del proceso de entrenamiento implementado.


<br>
## Bases de datos de imágenes

La mayoría de los modelos que proporciona Aletheia están entrenados usando 
la base de datos [Alaska2](https://www.kaggle.com/c/alaska2-image-steganalysis),
por lo que usaremos la misma base de datos para nuestros ejemplos.

El primer paso en la creación de nuestro conjunto de datos consiste en 
crear imágenes *stego*. Ya disponemos de imágenes *cover*, así que ahora
usaremos Aletheia para crear imágenes *stego*. Esto tendremos que hacerlo
incrustando información usando el método de esteganografía para el cual 
queremos crear el modelo. 

En este ejemplo usaremos Steghide, por lo que necesitaremos el siguiente
comando para crear las imágenes stego.

```bash
./aletheia.py steghide-sim cover 0.05-0.50 stego
```

Los parámetros usados son los siguientes:
- **steghide-sim**: Vamos a usar el simulador de Steghide
- **cover**: Directorio en el que se encuentran las imágenes *cover*.
- **0.05-0.50**: Indicamos que se incrustará usando un ratio de inserción por píxel 
(o en imágenes JPG, por coeficiente DCT diferente de cero) elegido 
aleatoriamente entre el 0.04 y 0.50 del total
- **stego**: Directorio en el que vamos a guardar las imágenes *stego*.


Al finalizar el proceso, dispondremos de todas las imágenes con un mensaje
aleatorio incrustado. 


Si queremos preparar modelos DCI, necesitaremos también crear imagenes con
una doble inserción. Es decir, imágenes en las que se ha incrustado dos 
mensajes. Estas imágenes son necesarias para los modelos DCI, que se usan
para detectar casos de [CSM](/stego/intro/faq-es#qué-es-el-cover-source-mismatch).

Para ello, necesitarems una segunda incrustación sobre las imágenes que
ya tienen una incrustación:

```bash
./aletheia.py steghide-sim stego 0.05-0.50 double
```

Al finalizar el proceso, dispondremos de todas las imágenes con dos mensajes
de tamaño aleatorio incrustados. Por lo que ya podremos proceder a preparar el conjunto
de datos de entrenamiento.



<br>
## Preparación de conjuntos de datos

A continuación vamos a crear un conjunto de datos para entrenamiento. Para
ello vamos a necesitar las imágenes *cover* de la base de datos de imágenes
que estamos usando y las imágenes *stego* que hemos preparado en el apartado
anterior.

Usaremos el comando **split-sets** de Aletheia, que nos creara un directorio
con las imágenes separadas en tres conjuntos: el de entrenamient, el de
validación y el de prueba.

```bash
./aletheia.py split-sets cover stego trset-s0 1000 1000 0
```

Los parámetros usados son los siguientes:
- **cover**: Directorio en el que se encuentran las imágenes *cover*
- **stego**: Directorio en el que se encuentran las imágenes *stego*
- **trset-s0**: Directorio en el que se guardará el conjunto de datos
- **1000**: Número de imágenes que queremos en el conjunto de validación
- **1000**: Número de imágenes que queremos en el conjunto de test
- **0**: Semilla usada, para que podamos generar de nuevo el mismo conjunto de datos


Como resultado, obtenemos tres directorios:

```bash
$ ls trset-s0
test train valid
```

Cada uno de ellos con las carpetas **cover** y **stego**:

```bash
$ ls trset-s0/train
cover stego
$ ls trset-s0/valid
cover stego
$ ls trset-s0/test
cover stego
```

Este conjunto de datos únicamente nos sirve para entrenar modelos simples,
no nos sirve para modelos DCI. Para generar un conjunto de datos que nos
sirva para los dos tipos de modelos, usaremos el comando siguiente:



```bash
./aletheia.py split-sets-dci cover stego double trset-dci-s0 1000 1000 0
```

Los parámetros son los mismos que en la ejecución anterior, con la única
diferencia de que ahora tenemos que proporcionar tambien el directorio **double**.


En este caso, como resultado obtenemos los siguientes directorios:

```bash
$ ls trset-dci-s0
A_test  A_train  A_valid  B_test  B_train  B_valid
```

Los directorios **A_** son los mismos que en la ejecución inicial, para modelos
normales, y contienen, cada uno, un directorio *cover* y un directorio *stego*:

```bash
$ ls trset-dci-s0/A_train
cover stego
$ ls trset-dci-s0/A_valid
cover stego
$ ls trset-dci-s0/A_test
cover stego
```

Pero en este caso tenemos, adicionalmente, los directorios **B_**, que contienen
directorios **stego** y **double**:

```bash
$ ls trset-dci-s0/B_train
stego double
$ ls trset-dci-s0/B_valid
stego double
$ ls trset-dci-s0/B_test
stego double
```

Con los conjuntos de datos preparados ya podemos proceder al entrenamiento.

<br>
## Entrenamiento de modelos

Para entrenar los modelos, diferenciaremos entre dos tipos: los modelos A y
los modelos B. Los modelos A, son los modelos simples, que permiten predecir
si una imagen es *cover* o *stego*. Estos modelos se pueden entrenar con
el conjunto de datos simple, que no contiene imágenes double, pero también
con el conjunto de datos para DCI. Los modelos B, son modelos que permiten
predecir si una imagen es *stego* o *double*. Estos modelos solo son necesarios
para el método DCI. 

El método DCI, usa los modelos A y los modelos B, para determinar si existen
inconsistencias en la clasificación, lo que permite predecir el porcentage
de aciertos que tendrá el modelo A para un determinado conjunto de imágenes
con características estadísticas similares. Es decir, permite saber si 
un modelo es apropiado para la predicción de un conjunto de imágenes, o si
no lo es, debido al problema [CSM](/stego/intro/faq-es#qué-es-el-cover-source-mismatch).


Podemos entrenar un modelo de tipo A con el siguiente comando, usando el
conjunto de datos básico:

```bash
./aletheia.py effnetb0 trset-s0/train/cover trset-s0/train/stego \
        trset-s0/valid/cover trset-s0/valid/stego A-model 0 100 32
```


Los parámetros usados son los siguientes:
- **trset-s0/train/cover**: Directorio que contiene las imágenes *cover* de entrenamiento
- **trset-s0/train/stego**: Directorio que contiene las imágenes *stego* de entrenamiento
- **trset-s0/valid/cover**: Directorio que contiene las imágenes *cover* de validación
- **trset-s0/valid/stego**: Directorio que contiene las imágenes *stego* de validación
- **A-mymodel**: Nombre que va atener el archivo en el que se guarda el modelo
- **0**: Identificador de la GPU a usar
- **100**: Parar después de 100000 x BS sin mejora.
- **32**: Tamaño del *batch*.


Si estamos usando un conjunto de datos para DCI, simplemente tenemos que 
cambiar algunos directorios: 

```bash
./aletheia.py effnetb0 trset-s0/A_train/cover trset-s0/A_train/stego \
        trset-s0/A_valid/cover trset-s0/A_valid/stego A-model 0 100 32
```


El entrenamiento de modelos B es muy similar, aunque en este caso es necesario
disponer de conjuntos de datos para DCI. La única diferencia es que tenemos
que usar imágens *stego* y *double*. El comando es el siguiente:


```bash
./aletheia.py effnetb0 trset-s0/B_train/stego trset-s0/B_train/double \
                       trset-s0/B_valid/stego trset-s0/B_valid/double B-model 0 100 32
```

Una vez terminado el proceso, ya disponemos de modelos preparados para ser usados.


<br>
## Probando los modelos

Para ver que resultados obtenemos con los modelos disponemos del comando
*effnetb0-score*. Podemos usarlo de la siguiente manera:


```bash
$ ./aletheia.py effnetb0-score trset-s0/test/cover/ trset-s0/test/stego A-model.h5 0
0.945
```

O usando el conjunto de datos DCI:

```bash
$ ./aletheia.py effnetb0-score trset-s0/A_test/cover/ trset-s0/A_test/stego A-model.h5 0
0.945
```

Como se puede observar, los resultados son bastante altos. Aunque, en este caso,
no sabemos si hay CSM, por lo que los resultados podrían no ser correctos.


<br>
## Haciendo predicciones

Si queremos hacer predicciones directamente, por ejemplo, de imágenes que no
sabemos si son *cover* o *stego*, podemos usar el comando **effnetb0-predict**:

```bash
$ ./aletheia.py effnetb0-predict trset-s0/A_test/stego A-model.h5 0
trset-s0/test/stego/75896.jpg 1.0
trset-s0/test/stego/76067.jpg 0.005
trset-s0/test/stego/76146.jpg 1.0
trset-s0/test/stego/76217.jpg 1.0
trset-s0/test/stego/76331.jpg 1.0
trset-s0/test/stego/76345.jpg 1.0
trset-s0/test/stego/76396.jpg 1.0
trset-s0/test/stego/76399.jpg 1.0
trset-s0/test/stego/76454.jpg 1.0
trset-s0/test/stego/76502.jpg 1.0
trset-s0/test/stego/76538.jpg 0.982
trset-s0/test/stego/76811.jpg 1.0
trset-s0/test/stego/76953.jpg 1.0
trset-s0/test/stego/77314.jpg 1.0
trset-s0/test/stego/77439.jpg 0.998
trset-s0/test/stego/78686.jpg 1.0
trset-s0/test/stego/78703.jpg 1.0
trset-s0/test/stego/78839.jpg 1.0
trset-s0/test/stego/78888.jpg 1.0
trset-s0/test/stego/78934.jpg 0.999
...
```

Aunque, de nuevo, no sabemos si hay CSM, por lo que los resultados podrían
no ser fiables. 

Si estamos analizando un conjunto de imágenes que proceden del mismo actor,
y que consideramos que pueden tener características estadísticas similares,
podemos usar el comando **effnetb0-dci-predict**.

Para hacerlo preparamos imágenes de otra base de datos diferente, para ver
en qué medida hay CSM y si podemos aprovechar el modelo entrenado. Usamos
la base de datos [Bossbase](http://agents.fel.cvut.cz/stegodata/BossBase-1.01-cover.tar.bz2).
Preparamos 1000 imágenes JPEG con calidad 80 y incrustamos la mitad usando
Steghide como se ha explicado anteriormente, por lo que nos quedan 500 imágenes
*cover* y 500 imágenes *stego*. Las guardamos en un directorio llamado
**testset-A**. A continuación, incrustamos sobre todas las imágenes de **testset-A**,
guardando el resultado en un directorio llamado **testset-B**.

Hemos preparado un conjunto de prueba con CSM, veamos los resultados:


```bash
$ ./aletheia.py effnetb0-dci-predict testset-A testset-B A-mode.h5 B-model.h5 0
...
testset-A/971.jpg 0
testset-A/9711.jpg 0
testset-A/9719.jpg INC
testset-A/9723.jpg 0
testset-A/9724.jpg 1
testset-A/9741.jpg INC
testset-A/9744.jpg 0
testset-A/9750.jpg INC
testset-A/9767.jpg INC
testset-A/9773.jpg INC
testset-A/9912.jpg 0
testset-A/9919.jpg 0
testset-A/9930.jpg INC
testset-A/9933.jpg INC
testset-A/9936.jpg INC
testset-A/9939.jpg INC
testset-A/9944.jpg INC
testset-A/9954.jpg 0
testset-A/9958.jpg INC
testset-A/9964.jpg INC
testset-A/9967.jpg INC
testset-A/9976.jpg INC
testset-A/9982.jpg 0
testset-A/9986.jpg 0
#inc: 370 #incF1: 337 #incF2: 36 #incF2C 32 #incF2S: 4
#no_inc: 630
--
dci-prediction-score: 0.815
```

Como podemos observar, el método DCI nos dice que usando estos modelos
acertaremos, aproximadament, el 81.5% de las veces. Son unos buenos resultados,
por lo que con este CSM, podemos confiar en el modelo.

Como referencia, los resultados reales al predecir imágenes de este conjunto
de prueba son del 98%, un poco alejado de la predicción hecha por DCI.


Veamos ahora un ejemplo con CSM alto. Usaremos la base de datos 
[LFW-FACES](https://paperswithcode.com/dataset/lfw).
Procederemos igual que en el ejemplo anteior, obteniendo un conjunto de 500
imágenes *cover* y 500 imágenes *stego*. Estos son los resultados:

```bash
$ ./aletheia.py effnetb0-dci-predict testset-A testset-B A-mode.h5 B-model.h5 0
...
A/Wang_Yingfan_0002.jpg INC
A/Wang_Yingfan_0003.jpg INC
A/Wayne_Ferreira_0002.jpg INC
A/Wen_Ho_Lee_0001.jpg 0
A/Wes_Craven_0001.jpg INC
A/Wilbert_Elki_Meza_Majino_0001.jpg 0
A/William_Delahunt_0001.jpg 0
A/William_Genego_0001.jpg INC
A/William_Hyde_0001.jpg INC
A/William_Nessen_0001.jpg INC
A/Wolfgang_Schuessel_0004.jpg INC
A/Xavier_Malisse_0003.jpg INC
A/Yasar_Yakis_0003.jpg INC
A/Yasser_Arafat_0002.jpg INC
A/Yasser_Arafat_0005.jpg 0
A/Yoriko_Kawaguchi_0012.jpg INC
A/Yuri_Malenchenko_0002.jpg INC
A/Zalmay_Khalilzad_0001.jpg INC
A/Zavad_Zarif_0001.jpg 0
A/Zico_0001.jpg INC
A/Zinedine_Zidane_0005.jpg INC
#inc: 722 #incF1: 209 #incF2: 583 #incF2C 582 #incF2S: 1
#no_inc: 278
--
dci-prediction-score: 0.639
```

En este caso, el método DCI nos dice que usando estos modelos
acertaremos, aproximadament, el 63.9% de las veces. No son resultados buenoss,
por lo que con este CSM tan alto es preferible no usar estos modelos para
realizar predicciones con estas imágenes. Sería más apropiado intentarlo
con otro modelo entrenado con imágenes más similares estadísticamente a estas.

Como referencia, los resultados reales al predecir imágenes de este conjunto
de prueba son del 66.5%%, muy cercano a la predicción hecha por DCI.


Las predicciones DCI están automatizadas usando los modelos proporcionados
por Aletheia usando el [comando "dci"](/stego/aletheia/intro-es/#herramientas-automatizadas).



