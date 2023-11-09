---
layout: page
title: "Incrustación usando códigos de Trellis y detección mediante el algoritmo de Viterbi"
subtitle: "" 
noindex: false
meta-title: "Incrustación usando códigos de Trellis y detección mediante el algoritmo de Viterbi"
meta-description: "ncrustación usando códigos de Trellis y detección mediante el algoritmo de Viterbi."
meta-keywords: "watermarking, robusto, a ciegas, 8 bits, códigos de trellis o rejilla"
lang-suffix: "-es"
comments: true
---


> A continuación se presenta una técnica de incrustación a ciegas de 8 bits usando
> códigos de Trellis, para watermarking de imágenes.
> Para la extracción de los 8 bits se usa el algoritmo de Viterbi. 
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py'>
        E_TRELLIS_8
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py'>
        D_TRELLIS_8
      </a> ]
</div>





<br>
## Incrustación

Este método está basado en el **Sistema 5** presentado en [ [1](#referencias) ]. 
Se trata de un método basado similar al [E-Simple-8](/stego/lab/watermarking-methods/e-simple-8-es/), 
en el sentido de que se se incrustan 8 marcas diferentes para poder ocultar
8 bits. Sin embargo, en este caso se usan códigos de Trellis para codificar
los bits, lo que permite una descodificación mucho más fiable.

Es un método **robusto**, es decir, capaz de resistir algunas alteraciones de
la imagen.

El código del método de incrustación está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_TRELLIS_8.py'>E_TRELLIS_8</a>.

Para incrustar una marca, basta con ejecutar un comando como el siguiente:

```bash
$ python3 E_TRELLIS_8.py image.png passw123 10101010 marked.png
```


<br>
## Detección


La detección de la marca y descodificación se realiza calculando la 
**correlación lineal** entre la imagen marcada y cada una de las ocho marcas. 

La fórmula usada para la correlación lineal es la siguiente:

$Z_{lc} = \frac{1}{N} \bar{c} · \bar{w_r} = \frac{1}{N}\sum_{xy}c(x,y) w_r(x,y)$

Para la descodificación del mensaje se usa el algoritmo de [Viterbi](https://en.wikipedia.org/wiki/Viterbi_algorithm).


El código del método de detección está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_TRELLIS_8.py'>D_TRELLIS_8</a>.

Para detectar la marca y ver si se ha incrustado un 0 o un 1, basta con ejecutar 
un comando como el siguiente:

```bash
$ python3 D_TRELLIS_8.py marked.png passw123
msg: 10101010
```



<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


