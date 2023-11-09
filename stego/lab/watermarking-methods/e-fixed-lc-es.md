---
layout: page
title: "Incrustación informada con correlación lineal fija y detección mediante correlación lineal"
subtitle: "" 
noindex: false
meta-title: "Incrustación informada con correlación lineal fija y detección mediante correlación lineal"
meta-description: "Incrustación informada con correlación lineal fija y detección mediante correlación lineal."
meta-keywords: "watermarking, robusto, incrustación informada"
lang-suffix: "-es"
comments: true
---


> A continuación se presenta una técnica de incrustación informada con 
> correlación lineal fija y detección mediante correlación lineal para marcado
> de imágenes.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py'>
        E_FIXED_LC
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_LC.py'>
        D_LC
      </a> ]
</div>





<br>
## Incrustación


Este método está basado en el **Sistema 2** presentado en [ [1](#referencias) ]. 
Se trata de un método que **añade un patrón** a la imagen, pero a diferencia
del método [E-Blind](/stego/lab/watermarking-methods/e-blind-es/), en este caso 
se analiza la imagen antes de incrustar la marca para poder fijar el valor
de la correlación lineal. Este tipo de inerción se conoce como **inserción informada**.

Es un método **robusto**, es decir, capaz de resistir algunas alteraciones de
la imagen.

El patrón que incrustamos es la propia marca, que generamos a partir de un 
password y que sumamos al valor de los píxeles de la imagen. Para ello usamos
un parámetro $\beta$ que nos permite indicar la fuerza con la que se realiza
la inserción. Cuanto más grande sea el valor de $\beta$, más difícil será 
eliminar la marca, aunque más distorsión introduciremos en la imagen.
En esta implementación se ha usado el valor $\beta=0.3$. Este valor puede 
modificarse fácilmente en el código fuente.

El valor de la marca puede incrustarse sumando o restando, lo que nos permite
disponer de dos tipos de marcas. Esto nos puede servir para incrustar 
información, aunque en este caso, **un solo bit**. Es decir, si sumamos la marca
estaremos incrustando un 1, mientras que si restamos la marca estaremos
incrustano un 0. 

El código del método de incrustación está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_FIXED_LC.py'>E_FIXED_LC</a>.

Para incrustar una marca, basta con ejecutar un comando como el siguiente:

```bash
$ python3 E_FIXED_LC.py image.png passw123 1 marked.png
```


<br>
## Detección

La detección de la marca se realiza calculando la **correlación lineal** entre
la imagen marcada y la marca. Es decir, que necesitamos el password para
generar la misma marca que se ha incrustado y así poder verificar que 
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
LC: 0.9705514
watermark, m=1
```

<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


