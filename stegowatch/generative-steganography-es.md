---
layout: page
title: Esteganografía generativa
subtitle: ""
noindex: false
meta-title: "Esteganografía generativa — StegoWatch"
meta-description: "Ficha StegoWatch sobre esteganografía generativa y detectabilidad de SteganoGAN"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

La esteganografía generativa utiliza modelos generativos para crear imágenes que contienen información oculta. SteganoGAN es el ejemplo representado en la comparativa actual de StegoWatch.

## Por qué importa

Los enfoques generativos son conceptualmente distintos de los métodos clásicos de incrustación. En lugar de modificar una imagen portadora existente, pueden generar una imagen como parte del proceso de ocultación.

Esto cambia el problema de detección. Un detector puede aprender diferencias entre imágenes generadas e imágenes naturales, y no únicamente trazas causadas por el mensaje oculto.

## Herramientas típicas

La comparativa actual incluye:

- SteganoGAN.

## Resultados de detectabilidad

En la comparativa actual, SteganoGAN resulta altamente detectable en las cargas evaluadas.

Este resultado debe leerse con cuidado. La alta detectabilidad puede reflejar artefactos del propio proceso de generación, no sólo la presencia de información incrustada.

## Limitaciones

La resultados no responde por completo a la cuestión más general de detectar mensajes ocultos en imágenes generadas. Principalmente muestra que las salidas evaluadas de SteganoGAN eran distinguibles en el escenario probado.

## Paper de referencia

- [SteganoGAN: High Capacity Image Steganography with GANs](https://arxiv.org/abs/1901.03892).

## Recursos relacionados

- [Artículo principal de StegoWatch](/stegowatch-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
