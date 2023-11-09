---
layout: page
title: Comparativa de funciones de coste para esteganografía en imágenes
subtitle: "" 
noindex: false
comments: false
meta-title: "Comparativa de funciones de coste para esteganografía en imágenes"
meta-description: "Artículo en el que se comparan diferentes funciones de coste para esteganografía en imágenes."
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
comments: true
---

> En este artículo vamos a ver una comparativa de funciones de coste para
>  esteganografía en imágenes. Usaremos 
> [Aletheia](https://github.com/daniellerch/aletheia) para ver qué funciones
> de coste son más difíciles de detectar.

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

1. [Gráfica comparativa](#gráfica-comparativa)
2. [Descripción del experimento](#descripcción del experimento)
3. [Resultados en mapas de bits](#resultados-en-mapas-de-bits)
   1. [Mismo coste](#mismo-coste)
   2. [HILL](#hill)
   3. [S-UNIWARD](#s-uniward)
4. [Resultados en JPEG](#resultados-en-jpeg)
   1. [Mismo coste](#mismo-coste)
   2. [nsF5](#nsF5)
   3. [J-MiPOD](#j-mipod)
   4. [J-UNIWARD](#j-uniward)
   5. [J-UNIWARD + Wiener](#j-uniward--wiener)

<br>
## Gráfica cómparativa

En este artículo comparamos diferentes funciones de coste para esteganografía 
en imágenes, con el objetivo de ver cuáles son más difíciles de detectar.

Las funciones de coste son funciones que asignan un coste a cada uno de los
píxeles de la imagen (o de los coeficientes DCT en el caso de imágenes JPEG).
Son muy útiles en esteganografía debido a que pueden ser combinadas con los 
Syndrome Trellis Codes (STC), un framework que permite incrustar un mensaje 
minimizando el coste total de la inserción. 

Separamos la comparativa en imágenes de tipo mapa de bits y imágenes JPEG. 
Vemos, primero, las gráficas comparativas.


<center><b>
Comparativa de esteganografía en imágenes de tipo mapa de bits (PNG, TIF, BMP, etc):
</b></center>

![efficiency](/stego/aletheia/resources/cosfn_comparison.png?style=centerme)


<center><b>
Comparativa de esteganografía en imágenes JPEG:
</b></center>

![efficiency](/stego/aletheia/resources/costfn_comparison_jpeg.png?style=centerme)


<br>
## Descripción del experimento

Para dibujar las gráficas presentadas en el apartado anterior se han empleado
múltiples funciones de coste usando la base de datos de imágenes
[Alaska 2](https://www.kaggle.com/c/alaska2-image-steganalysis). 
Esta base de datos es la que ha utilizado 
[Aletheia](https://github.com/daniellerch/aletheia) 
para entrenar sus modelos. 

Las imágenes usadas en el experimento proceden del conjunto de test utilizado
por Aletheia, es decir, que las imágenes no han sido utilizadas ni para el
entrenamiento de los modelos ni para su validación.

Para cada uno de los métodos se han usado 500 imágenes *cover* (sin ningún
mensaje oculto) y 500 imágenes *stego* (con información oculta, conforme al
*payload* indicado en la gráfica).

Cabe destacar, que la incrustación de los mensajes para generar los datos
del exeperimento usan un simulador que permite incrustar en el límite 
teórico, en lugar de incrustar un mensaje real. Por lo que el resultado
obtenido corresponde a imágenes ligeramente más difíciles de detecar.

<br>
## Resultados en mapas de bits

### Mismo coste

xxx


### HILL

[HILL](https://doi.org/10.1109/ICIP.2014.7025854) 




### S-UNIWARD

[S-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) 



<br>
## Resultados en JPEG

### Mismo coste

xxx


### nsF5

[nsF5](https://dde.binghamton.edu/download/nsf5simulator/) es la versión
mejorada del conocido método de esteganografía [F5](https://www.semanticscholar.org/paper/F-5-%E2%80%94-A-Steganographic-Algorithm-High-Capacity-Westfeld/149b41d7560d7bd628da502bd3d8122a8317d472).

No se trata de una función de coste como las anteriores, puesto que lo único que
hace es asignar dos costes: un coste alto para los coeficientes DCT con valor
cero y un coste bajo al resto. Concrematemente se trata de un esquema de 
Wet Paper codes (WPC), en el que los coeficientes que no queremos mojar 


### J-MiPOD

[J-MiPOD](https://doi.org/10.1109/tifs.2021.3111713) 



### J-UNIWARD

[J-UNIWARD](https://doi.org/10.1186/1687-417X-2014-1) 


