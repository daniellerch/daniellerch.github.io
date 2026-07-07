---
layout: page
title: F5
subtitle: ""
noindex: false
meta-title: "F5 — StegoRank"
meta-description: "Ficha de StegoRank sobre esteganografía JPEG con F5"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

F5 es una técnica de esteganografía en dominio JPEG que modifica coeficientes DCT cuantificados evitando algunos de los artefactos más evidentes de métodos JPEG anteriores.

<section class="stegorank-facts" markdown="1">
## Resumen rápido
<dl>
  <dt>Dominio:</dt><dd>JPEG.</dd>
  <dt>Tipo:</dt><dd>método JPEG clásico con codificación matricial y modificaciones sobre coeficientes DCT cuantificados.</dd>
  <dt>Uso:</dt><dd>familia técnica propia, útil como referencia histórica y como línea base en estegoanálisis JPEG.</dd>
  <dt>Lectura principal:</dt><dd>mejora frente a métodos JPEG más simples, pero suele quedar por detrás de métodos adaptativos modernos como J-UNIWARD.</dd>
</dl>
</section>

## Uso en herramientas

F5 se trata aquí como una familia técnica propia. Cuando una herramienta implementa F5 o una variante cercana, conviene compararla a nivel de método en lugar de agruparla únicamente dentro de métodos JPEG clásicos genéricos.

## Resultados de detectabilidad

En la comparativa actual de StegoRank, F5 debe interpretarse dentro del grupo de métodos JPEG clásicos. Su detectabilidad se espera más alta que la de métodos JPEG adaptativos como J-UNIWARD en condiciones comparables.

## Paper original

- [F5—A Steganographic Algorithm](https://doi.org/10.1007/3-540-45496-9_21).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
