---
layout: page
title: "Incrustación a ciegas basada en bloques y detección mediante coeficiente de correlación"
subtitle: "" 
noindex: false
meta-title: "Incrustación a ciegas basada en bloques y detección mediante coeficiente de correlación"
meta-description: "Incrustación a ciegas basada en bloques y detección mediante coeficiente de correlación."
meta-keywords: "watermarking, robusto, en bloques, a ciegas"
lang-suffix: "-es"
comments: true
---


> A continuación se presenta una técnica de incrustación a ciegas basada en 
> bloques y detección mediante coeficiente de correlación para marcado
> de imágenes.
<div style='text-align:right;margin-top:-25px'> 
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py'>
        E_BLK_BLIND
      </a> ]
    [ <a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py'>
        D_BLK_CC
      </a> ]
</div>





<br>
## Incrustación

Este método está basado en el **Sistema 3** presentado en [ [1](#referencias) ]. 
Se trata de un método basado en [E-Blind](/stego/lab/watermarking-methods/e-blind-es/), 
aunque en este caso se agrupa la imagen en bloques para después repartir la marca
entre ellos. Al hacerlo, el sistema resulta más **robusto**. Por lo demás,
el método funciona exactamente igual que [E-Blind](/stego/lab/watermarking-methods/e-blind-es/).

El código del método de incrustación está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/E_BLK_BLIND.py'>E_BLK_BLIND</a>.

Para incrustar una marca, basta con ejecutar un comando como el siguiente:

```bash
$ python3 E_BLK_BLIND.py image.png passw123 1 marked.png
```


<br>
## Detección

A diferencia del método  [E-Blind](/stego/lab/watermarking-methods/e-blind-es/),
en el que realizamos la detección usando la correlación lineal, en este caso
usamos el **coeficiente de correlación** entre la imagen marcada y la marca.
Necesitaremos el password para generar la misma marca que se ha incrustado y 
así poder calcular el coeficiente de correlación.

La fórmula usada para el coeficiente de correlación es la siguiente:

$Z_{cc} = \frac{ \bar{v}·\bar{w_r} }{ \sqrt{(\bar{v}·\bar{v})(\bar{w_r}·\bar{w_r})}} = \sum_{x=0}^7 \sum_{y=0}^7 \bar{v}(x,y) \bar{w_r}(x,y)$


El umbral de $Z_{cc}$ usado para decidir si la marca está presento o no suele
calcularse experimentalmente para el tipo de imágenes en las que se quiere usar.
En esta implementación se ha usado un umbral de $0.55$.


El código del método de detección está disponible en el siguiente enlace:
<a href='https://github.com/daniellerch/stegolab/tree/master/watermarking/D_BLK_CC.py'>D_BLK_CC</a>.

Para detectar la marca y ver si se ha incrustado un 0 o un 1, basta con ejecutar 
un comando como el siguiente:

```bash
$ python3 D_BLK_CC.py marked.png passw123
CC: 0.9324434
watermark, m=1
```

<br>
## Referencias


1. I. J. Cox, M. L. Miller, J. A. Bloom, J. Fridrich y T. Kalker (2008). 
   Digital Watermarking and Steganography. Morgan Kaufmann. Second Edition.


