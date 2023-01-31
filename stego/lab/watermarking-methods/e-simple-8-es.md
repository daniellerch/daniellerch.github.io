---
layout: page
title: "Incrustación a ciegas de 8 bits y detección/extracción de 8 bits"
subtitle: "" 
noindex: false
meta-title: "Incrustación a ciegas de 8 bits y detección/extracción de 8 bits"
meta-description: "Incrustación a ciegas de 8 bits y detección/extracción de 8 bits."
meta-keywords: "watermarking, robusto, a ciegas, 8 bits"
lang-suffix: "-es"
---


> A continuación se presenta una técnica de incrustación a ciegas de 8 bits y de 
> detección/extracción de esos 8 bits para watermarking de imágenes.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py'>
        E_SIMPLE_8
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py'>
        D_SIMPLE_8
      </a> ]
</div>





<br>
## Incrustación

Este método está basado en el **Sistema 4** presentado en [ [1](#referencias) ]. 
Se trata de un método basado en [E-Blind](/stego/lab/watermarking-methods/e-blind-es/), 
aunque en este caso se incrustan 8 marcas diferentes. Esto permite incrustar 
8 bits, dado que cada marca se puede insertar sumandola (1) o restándola (0).

A medida que se insertan más y más marcas, con el objetivo de incrustar más
bits de información, la fiabilidad decrece. Por lo tanto, no podemos usar esta
metodología para incrustar grandes cantidades de información.


Es un método **robusto**, es decir, capaz de resistir algunas alteraciones de
la imagen.

El código del método de incrustación está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_SIMPLE_8.py'>E_SIMPLE_8</a>.

Para incrustar una marca, basta con ejecutar un comando como el siguiente:

```bash
$ python3 E_SIMPLE_8.py image.png passw123 10101010 marked.png
```


<br>
## Detección


La detección de la marca se realiza calculando la **correlación lineal** entre
la imagen marcada y cada una de las ocho marcas. De esta manera, para cada una
de las ocho marcas extraemos uno de los ocho bits.

La fórmula usada para la correlación lineal es la siguiente:

$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$


En este caso el umbral de $Z_{lc}$ usado para la extracción de cada uno de los 
bits es $0$. Por lo que no consideramos la opción de que una de las marcas no
esté presente. Así, siempre se extraerán ocho bits, aunque no haya ninguna
marca presente.


El código del método de detección está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_SIMPLE_8.py'>D_SIMPLE_8</a>.

Para detectar la marca y ver si se ha incrustado un 0 o un 1, basta con ejecutar 
un comando como el siguiente:

```bash
$ python3 D_SIMPLE_8.py marked.png passw123
msg: 10101010
```



<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


