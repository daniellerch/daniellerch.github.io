---
layout: page
title: Cómo identificar el esquema de esteganografía
subtitle: "" 
noindex: false
meta-title: "Cómo identificar el esquema de esteganografía"
meta-description: "Artículo acerca de cómo identificar el esquema de esteganografía que se ha usado para ocultar información, usando la herramienta Aletheia"
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
---

> En este artículo vamos a ver cómo identificar el esquema de esteganografía 
> que se ha usado para ocultar información. Para ello, usaremos la herramienta 
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

1. [Opciones a considerar](#opciones-a-considerar)
2. [Imágenes JPEG](#imágenes-jpeg)
3. [Mapas de bits](#mapas-de-bits)


<br>
## Opciones a considerar

Muchas veces podemos tener sospechas de que se ha usado un esquema de 
esteganografía concreto, lo que facilita bastante el análisis. Pero muchas
otras tendremos que identificar qué esquema se ha usado, si es que se ha
usado alguno.

Para hacerlo, usaremos la herramienta de estegoanálisis
[Aletheia](https://github.com/daniellerch/aletheia) , por lo que nos basaremos
en los métodos de detección que incorpora esta herramienta. Es decir, no
intentaremos identificar esquemas de esteganografía para los que no disponemos
de métodos de detección.

Por otra parte, supondremos que ya se han verificado métodos de esteganografía
triviales como el concatenado de archivos, que permiten algunos formatos de 
imagen, el dibujado de letras usando colores difíciles de ver, datos en un
canal alfa totalmente transparente y trucos similares.

Cabe destacar que lo que vamos a hacer es una **exploración inicial**, y que
por lo tanto, únicamente nos sirve para hacernos una primera idea de cuáles 
son los métodos de esteganografía que es más probable que se estén usando.
Normalmente, será necesario continuar con un análisis más profundo, como el
que se muestra en otros artículos:

- [Ataque práctico a Steghide](/stego/aletheia/steghide-attack-es).
- [Ataque práctico a F5](/stego/aletheia/f5-attack-es).
- [Ataque práctico a esquemas LSB-R: OpenStego y OpenPuff](/stego/aletheia/lsb-attack-es).


Dado que las técnicas de esteganografía suelen ser muy diferentes en función
de si tratamos con una imagen JPEG o una imagen de tipo mapa de bits (PNG,
TIF, BMP, etc), realizaremos el análisis por separado.

<br>
## Imágenes JPEG

Los mejores métodos de detección de los que dispone Aletheia para imágenes 
JPEG están basados en modelos de *deep learning*, que son los que utiliza 
el comando **auto**. Por lo tanto, para imágenes JPEG, nuestra mejor opción 
es usar este comando.

Veamos un ejemplo en el que el esquema más probable parece ser Steghide.

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

Veamos ahora otro ejemplo en el que el esquema más probable parece ser nsF5:

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

Y finalmente, veamos un ejemplo para Outguess:

```bash
./aletheia.py auto actors/A5

                     Outguess  Steghide   nsF5  J-UNIWARD *
-----------------------------------------------------------
2.jpg                  [1.0]    [1.0]    [0.7]    [1.0]  
4.jpg                  [1.0]    [1.0]     0.4     [0.8]  
10.jpg                 [1.0]    [1.0]     0.3     [1.0]  
6.jpg                  [1.0]    [1.0]     0.4     [1.0]  
7.jpg                  [1.0]     0.0     [0.8]    [1.0]  
8.jpg                  [1.0]    [1.0]    [1.0]    [1.0]  
9.jpg                  [1.0]    [1.0]     0.4     [0.7]  
1.jpg                  [1.0]    [1.0]    [1.0]    [0.9]  
3.jpg                  [1.0]    [1.0]    [0.9]    [1.0]  
5.jpg                  [1.0]    [1.0]    [0.8]    [1.0]  

* Probability of being stego using the indicated steganographic method.
```

Aunque en este último caso es un poco más complicado saber qué método se usa,
puesto que otros modelos lo detectan con bastante fiabilidad.


<br>
## Mapas de bits

En mapas de bits, existe la posibilidad de que se haya usado la técnica
LSB-R o LSB *replacement*. Para esta técnica existe una familia de 
ataques muy fiables, conocidos como ataques estructurales. Por ello, lo
más apropiado es empezar con un par de ataques estructurales.

Veamos un ejemplo en el que encontramos información oculta:

```bash
$ ./aletheia.py spa sample_images/lena_lsbr.png
Hidden data found in channel R 0.09308090623358549
Hidden data found in channel G 0.09238585295279302
Hidden data found in channel B 0.11546638236749293

$ ./aletheia.py ws sample_images/lena_lsbr.png
Hidden data found in channel R 0.10590840834668327
Hidden data found in channel G 0.07463418193363092
Hidden data found in channel B 0.07968467118722876
```

Aunque podríamos no haber encontrado nada:

```bash
$ ./aletheia.py spa sample_images/lena.png
No hidden data found

$ ./aletheia.py ws sample_images/lena.png
No hidden data found
```

Si no encontramos nada, es el momento de intentarlo con modelos de 
*deep learning*, usando el comando **auto**. Sin embargo, para un estegoanálisis
fiable usando *deep learning* necesitamos más imágenes, debido al problema del 
CSM, que describimos con más detalle en otros artículos:

- [Ataque práctico a Steghide](/stego/aletheia/steghide-attack-es).
- [Ataque práctico a F5](/stego/aletheia/f5-attack-es).
- [Ataque práctico a esquemas LSB-R: OpenStego y OpenPuff](/stego/aletheia/lsb-attack-es).

Veamos un ejemplo en el que detectamos diferentes esquemas de esteganografía:

```bash
$ ./aletheia.py auto sample_images/alaska2

                       LSBR      LSBM  SteganoGAN  HILL *
---------------------------------------------------------
25422.png               0.0       0.0      0.0      0.0   
27693_steganogan.png   [0.9]     [1.0]    [1.0]    [0.9]  
74051_hill.png          0.0       0.0      0.0     [0.9]  
36466_steganogan.png   [0.9]     [1.0]    [1.0]    [1.0]  
04686.png               0.0       0.0      0.0      0.0   
37831_lsbm.png         [1.0]     [1.0]     0.0     [0.7]  
34962_hill.png          0.0       0.0      0.0     [0.5]  
00839_hill.png          0.0      [0.8]     0.0     [1.0]  
74648_lsbm.png         [1.0]     [1.0]     0.0     [0.6]  
74664.png               0.0       0.0      0.0      0.0   
55453_lsbm.png         [0.6]     [0.9]     0.0     [0.9]  
67104_steganogan.png   [0.9]     [0.9]    [1.0]    [0.8]  

* Probability of being stego using the indicated steganographic method.

```












