---
layout: page
title: "Esteganografía en imágenes"
subtitle: ""
noindex: false
meta-title: "Esteganografía en imágenes: técnicas, herramientas y detectabilidad"
meta-description: "Referencia práctica sobre esteganografía en imágenes: métodos espaciales, JPEG, incrustación adaptativa, herramientas, capacidad y detectabilidad."
meta-keywords: "esteganografía en imágenes, esteganografía, esteganografía LSB, esteganografía JPEG, esteganografía adaptativa, HStego, StegoRank"
lang-suffix: "-es"
alternate-en: "/image-steganography-en/"
alternate-es: "/image-steganography-es/"
comments: false
schema_type: "Article"
---

La esteganografía en imágenes consiste en ocultar información dentro de una
imagen intentando que el resultado siga siendo visual y estadísticamente
plausible. La imagen original es la **cover**, la imagen modificada es la
**stego**, y los datos ocultos forman el **payload**.

La cuestión práctica no es solo si el mensaje puede incrustarse y extraerse. Un
método útil también debe considerar la detectabilidad de los cambios, el formato
de la imagen, la cantidad de información incrustada y si la imagen será
redimensionada, recomprimida o subida a una plataforma que la modifique.

Para definiciones breves, consulta la [FAQ de esteganografía](/stego/intro/faq-es/).
Para la parte de detección, consulta [estegoanálisis en imágenes](/image-steganalysis-es/).

<div class='menu'></div>

## Contenido

1. [Qué intenta conseguir la esteganografía en imágenes](#qué-intenta-conseguir-la-esteganografía-en-imágenes)
2. [Por qué importa el formato de imagen](#por-qué-importa-el-formato-de-imagen)
3. [Esteganografía en dominio espacial](#esteganografía-en-dominio-espacial)
4. [Esteganografía en dominio JPEG](#esteganografía-en-dominio-jpeg)
5. [Incrustación adaptativa y funciones de coste](#incrustación-adaptativa-y-funciones-de-coste)
6. [Capacidad y detectabilidad](#capacidad-y-detectabilidad)
7. [Herramientas y recursos prácticos](#herramientas-y-recursos-prácticos)
8. [Lecturas relacionadas](#lecturas-relacionadas)

## Qué intenta conseguir la esteganografía en imágenes

La esteganografía es distinta de la criptografía. La criptografía protege el
contenido del mensaje, pero normalmente no oculta que existe una comunicación
protegida. La esteganografía intenta ocultar la existencia misma de la
comunicación incrustando el mensaje dentro de una imagen aparentemente normal.

En la práctica, ambos enfoques suelen combinarse: primero se cifra el mensaje y
después se incrusta en la imagen. Si se descubre la imagen stego, el cifrado
sigue protegiendo el contenido; si no se detecta, la comunicación permanece
oculta.

La restricción principal es la detectabilidad. Un método puede conservar la
calidad visual y aun así dejar trazas estadísticas que un detector de
estegoanálisis pueda encontrar.

## Por qué importa el formato de imagen

El dominio de incrustación depende del formato:

- En imágenes raster sin pérdida, como PNG o BMP, los métodos suelen modificar
  directamente los valores de los píxeles. Esto se conoce como **esteganografía
  en dominio espacial**.
- En imágenes JPEG, los métodos suelen modificar coeficientes DCT cuantizados,
  porque JPEG almacena la imagen en una representación transformada y comprimida.
- En imágenes generadas con IA, la distribución de la fuente puede ser distinta
  de la de imágenes de cámara o editadas, lo que puede afectar tanto a la
  incrustación como a la detección.

Esta distinción es esencial. Si se aplica un método espacial sobre un PNG y
después la imagen se guarda como JPEG, el mensaje oculto puede destruirse. Si se
usa un método en dominio JPEG, una recomresión posterior también puede modificar
los coeficientes DCT y romper la extracción.

Para más detalle, consulta los capítulos sobre [esteganografía en imágenes raster sin pérdida](/stego/books/stegopython/bitmapimages-es/)
y [esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/).

## Esteganografía en dominio espacial

Los métodos espaciales modifican directamente valores de píxeles. El ejemplo
clásico es la [esteganografía LSB](/stego/intro/lsb-es/), donde los bits menos
significativos de las muestras se usan para guardar bits del mensaje.

Con **LSB replacement**, un valor se modifica solo cuando su bit menos
significativo no coincide con el bit del mensaje. Si se modifica un valor par,
solo puede pasar a impar; si se modifica un valor impar, solo puede pasar a par.
Este comportamiento de paridad ayuda a entender por qué LSB replacement simple
puede detectarse estadísticamente.

Con **LSB matching**, el valor se incrementa o decrementa aleatoriamente cuando
hace falta cambiarlo. Esto evita el mismo artefacto de paridad, pero sigue
alterando la distribución de valores vecinos y puede detectarse con métodos más
fuertes.

La esteganografía espacial moderna suele evitar modificar píxeles de forma
uniforme. En su lugar, intenta colocar cambios en regiones con textura o ruido,
donde son menos detectables. Ejemplos de este enfoque son métodos adaptativos
basados en funciones de distorsión como HILL o S-UNIWARD.

## Esteganografía en dominio JPEG

La esteganografía JPEG trabaja directamente en el dominio transformado de JPEG.
La imagen se divide en bloques, se transforma con la DCT, se cuantiza y se
almacena como coeficientes. Por tanto, la esteganografía JPEG modifica
coeficientes DCT cuantizados, no píxeles RGB directamente.

Métodos JPEG antiguos como F5 y nsF5 introdujeron ideas importantes, como la
codificación matricial y el tratamiento del shrinkage, pero ya no son fuertes
frente al estegoanálisis moderno en muchos escenarios prácticos.

Los métodos JPEG más modernos usan incrustación adaptativa. [J-UNIWARD](/stegorank/j-uniward-es/)
es un ejemplo representativo: asigna costes diferentes a posibles cambios de
coeficientes e intenta incrustar el mensaje donde la distorsión estimada es
menor.

## Incrustación adaptativa y funciones de coste

La esteganografía adaptativa asigna un coste a las modificaciones posibles y
trata de evitar los cambios que probablemente serán más detectables. En imágenes
espaciales, las posiciones de bajo coste suelen estar en zonas con textura o
ruido. En JPEG, las posiciones de bajo coste se seleccionan entre coeficientes
DCT según el modelo de distorsión.

El payload suele incrustarse con métodos de codificación como los
[syndrome-trellis codes](/stego/intro/faq-es/#que-son-los-syndrome-trellis-codes-stc),
que reducen el número y el impacto de las modificaciones necesarias para ocultar
un mensaje.

Los métodos adaptativos no hacen que la esteganografía sea indetectable.
Reducen la detectabilidad bajo un modelo, payload, fuente de imágenes y detector
concretos.

## Capacidad y detectabilidad

La capacidad es la cantidad de datos que puede ocultarse. Suele expresarse como
bits por píxel en imágenes espaciales o bits por coeficiente AC no nulo en JPEG.

Cuanto mayor es el payload, mayor suele ser la detectabilidad. Un payload
pequeño distribuido en posiciones adecuadas puede ser difícil de detectar; un
payload grande fuerza más cambios y normalmente deja trazas más claras.

Para una comparación de métodos por detectabilidad práctica, consulta
[StegoRank](/stegorank-es/), incluyendo [LSB replacement](/stegorank/lsb-replacement-es/),
[métodos espaciales adaptativos](/stegorank/adaptive-spatial-es/) y
[esteganografía generativa](/stegorank/generative-steganography-es/).

## Herramientas y recursos prácticos

[HStego](https://github.com/daniellerch/hstego) es una herramienta práctica para
ocultar datos en imágenes de mapa de bits y JPEG. Está incluida en
[StegoLab](/stegolab-es/#hstego) y usa límites de payload pensados para reducir
la detectabilidad en los escenarios soportados.

Recursos relacionados:

- [Herramientas de esteganografía](/stego/intro/tools-es/)
- [Comparación de herramientas de esteganografía en imágenes](/stego/aletheia/v03/tool-comparison-es/)
- [Herramientas y código de StegoLab](/stegolab-es/)
- [Comparativa de esteganografía en imágenes en StegoRank](/stegorank-es/)

## Lecturas relacionadas

- [Estegoanálisis en imágenes](/image-steganalysis-es/)
- [FAQ de esteganografía](/stego/intro/faq-es/)
- [Esteganografía LSB en imágenes y audio](/stego/intro/lsb-es/)
- [Esteganografía en imágenes raster sin pérdida](/stego/books/stegopython/bitmapimages-es/)
- [Esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/)
- [Publicaciones sobre esteganografía y estegoanálisis](/papers-es/)
