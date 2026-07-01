---
layout: page
title: Esteganografía generativa
subtitle: ""
noindex: false
meta-title: "Esteganografía generativa — StegoRank"
meta-description: "Ficha StegoRank sobre esteganografía generativa, SteganoGAN y métodos basados en Stable Diffusion"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

La esteganografía generativa utiliza modelos generativos para crear imágenes que contienen información oculta. En StegoRank, esta familia incluye tanto enfoques anteriores basados en GAN, como SteganoGAN, como métodos más recientes basados en modelos de difusión.

## Por qué importa

Los enfoques generativos son conceptualmente distintos de los métodos clásicos de incrustación. En lugar de modificar una imagen portadora existente, pueden generar una imagen como parte del proceso de ocultación.

Esto cambia el problema de detección. Un detector puede aprender diferencias entre imágenes generadas e imágenes naturales, y no únicamente trazas causadas por el mensaje oculto. Los enfoques basados en difusión son especialmente relevantes porque pueden utilizar generadores de alta calidad como Stable Diffusion.

## Generadores esteganográficos frente a generadores de propósito general

SteganoGAN y Stable Diffusion representan escenarios de detección muy distintos. SteganoGAN es un generador esteganográfico: su propósito práctico es generar imágenes que transportan información oculta. En ese contexto, detectar que una imagen procede de SteganoGAN puede ser suficiente para marcarla como stego, porque el propio generador está ligado al proceso de ocultación.

Stable Diffusion es diferente. Es un generador de imágenes de propósito general, usado para crear imágenes de muchos tipos, la mayoría sin relación con la esteganografía. En este caso, detectar que una imagen ha sido generada por Stable Diffusion no es suficiente. La pregunta relevante es si una imagen de Stable Diffusion es una imagen cover o una imagen stego.

Esta distinción es importante al leer los resultados. Detectar un generador esteganográfico especializado y detectar un mensaje oculto dentro de imágenes procedentes de un generador de imágenes ampliamente usado no son el mismo problema.

## Herramientas y métodos típicos

La comparativa actual incluye:

- SteganoGAN;
- mas_GRDH, un método de esteganografía generativa basado en Stable Diffusion descrito en el paper de IEEE enlazado más abajo.

## Resultados de detectabilidad

En la comparativa de Aletheia, SteganoGAN resulta altamente detectable en las cargas evaluadas. Este resultado debe leerse con cuidado: en SteganoGAN, la alta detectabilidad puede reflejar que la imagen procede de un generador esteganográfico especializado, no sólo trazas dejadas por el mensaje oculto.

mas_GRDH se representa por separado en la gráfica de Stable Diffusion con un punto en 0.02 bpp y accuracy 0.50, correspondiente a detección a nivel de azar en el escenario reportado.

## Limitaciones

Los resultados no responden por completo a la cuestión más general de detectar mensajes ocultos en imágenes generadas. Describen métodos, cargas, generadores y protocolos de evaluación concretos.

## Papers de referencia

- [SteganoGAN: High Capacity Image Steganography with GANs](https://arxiv.org/abs/1901.03892).
- [IEEE Xplore: mas_GRDH](https://ieeexplore.ieee.org/abstract/document/10637346).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
