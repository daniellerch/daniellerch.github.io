---
layout: page
title: "Incrustación a ciegas y detección mediante correlación lineal"
subtitle: "" 
noindex: false
meta-title: "Incrustación a ciegas y detección mediante correlación lineal"
meta-description: "Incrustación a ciegas y detección mediante correlación lineal."
meta-keywords: "watermarking, robusto, a ciegas"
lang-suffix: "-es"
---


> A continuación se presenta una técnica de incrustación de información 
> a ciegas y de detección mediante correlación lineal para marcado
> de imágenes.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py'>
        E_BLIND
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>
        D_LC
      </a> ]
</div>





<br>
## Incrustación

Este método está basado en el **Sistema 1** presentado en [ [1](#referencias) ]. 
Se trata de un método básico que, simplemente, **añade un patrón** a la imagen.
Es un método **robusto**, es decir, capaz de resistir algunas alteraciones de
la imagen.

El patrón que incrustamos es la propia marca, que generamos a partir de un 
password y que sumamos al valor de los píxeles de la imagen. Para ello usamos
un parámetro $\alpha$ que nos permite indicar la fuerza con la que se realiza
la inserción. Cuanto más grande sea el valor de $\alpha$, más difícil será 
eliminar la marca, aunque más distorsión introduciremos en la imagen.
En esta implementación se ha usado el valor $\alpha=1$. Este valor puede 
modificarse fácilmente en el código fuente.

El valor de la marca puede incrustarse sumando o restando, lo que nos permite
disponer de dos tipos de marcas. Esto nos puede servir para incrustar 
información, aunque en este caso, **un solo bit**. Es decir, si sumamos la marca
estaremos incrustando un 1, mientras que si restamos la marca estaremos
incrustano un 0. 

El código del método de incrustación está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLIND.py'>E_BLIND</a>.

Para incrustar una marca, basta con ejecutar un comando como el siguiente:

```bash
$ python3 E_BLIND.py image.png passw123 1 marked.png
```


<br>
## Detección

La detección de la marca se realiza calculando la **correlación lineal** entre
la imagen marcada y la marca. Es decir, que necesitamos el password para
generar la misma marca que se ha incrustado y así podever verificar que 
existe correlación lineal.

La fórmula usada para la correlación lineal es la siguiente:

$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$


El umbral de $Z_{lc}$ usado para decidir si la marca está presento o no suele
calcularse experimentalmente para el tipo de imágenes en las que se quiere usar.
En esta implementación se ha usado un umbral de $0.7$.


El código del método de detección está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>D_LC</a>.

Para detectar la marca y ver si se ha incrustado un 0 o un 1, basta con ejecutar 
un comando como el siguiente:

```bash
$ python3 D_LC.py marked.png passw123
LC: 0.92543936
watermark, m=1
```

<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


