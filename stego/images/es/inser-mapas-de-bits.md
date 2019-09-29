---
layout: page
title: Inserción de información en imágenes
subtitle: Mapas de bits
comments: true
image: images/hns_lena.png
hidden: false
---

Una forma común de representar la información de una imagen es el mapa de bits. El mapa de bits consiste en una matriz o tabla en la que cada elemento es un píxel. En las imágenes en escala de grises el valor del píxel suele ser un byte. En las imágenes en color (RGB) el valor del píxel suele representarse por tres bytes, la cantidad de rojo, la cantidad de verde y la cantidad de azul.

Si usamos Python para leer el valor de un píxel


```python
from scipy import misc
I = misc.imread('hns_lena.png')
print(I[0,0])
```

<br>
Que al ejecutarlo, nos da la siguiente salida:

```bash
[0, 0, 0, 0]
```





