---
layout: page
title: Métodos adaptativos en dominio espacial
subtitle: ""
noindex: false
meta-title: "Métodos adaptativos en dominio espacial — StegoRank"
meta-description: "Ficha StegoRank sobre métodos adaptativos de esteganografía en imágenes sin comprimir"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

Los métodos adaptativos en dominio espacial ocultan información en imágenes sin comprimir asignando distintos costes de incrustación a distintas regiones de la imagen. El objetivo es modificar zonas donde se espera que los cambios sean más difíciles de detectar.

<section class="stegorank-facts" markdown="1">
## Resumen rápido
<dl>
  <dt>Dominio:</dt><dd>imágenes sin comprimir.</dd>
  <dt>Tipo:</dt><dd>familia de métodos adaptativos basados en costes de incrustación.</dd>
  <dt>Métodos relacionados:</dt><dd>HILL, S-UNIWARD y otras funciones de coste en dominio espacial.</dd>
  <dt>Lectura principal:</dt><dd>son el punto de partida para entender por qué las técnicas modernas evitan modificar regiones fáciles de modelar estadísticamente.</dd>
</dl>
</section>

## Por qué importa

Los métodos adaptativos representan un salto importante respecto a la incrustación simple basada en LSB. Utilizan el contenido de la imagen para guiar la incrustación y reducir artefactos estadísticos.

Esta familia incluye métodos de investigación e implementaciones prácticas derivadas de funciones de coste como HILL o ideas relacionadas con S-UNIWARD.

## Herramientas e implementaciones típicas

La comparativa actual de StegoRank relaciona estos métodos con versiones de HStego, pero los resultados de detectabilidad a nivel de método pueden usar simuladores de Aletheia en lugar de herramientas completas de usuario final.

Las implementaciones de investigación relacionadas también pueden aparecer en StegoLab, pero deben tratarse como métodos o código de investigación, no necesariamente como herramientas de usuario final.

## Resultados de detectabilidad

En la comparativa actual, métodos adaptativos en dominio espacial como HILL y S-UNIWARD muestran menor detectabilidad que LSB replacement bajo las condiciones evaluadas.

La comparativa también muestra que los detalles de implementación importan: simuladores, implementaciones de investigación y herramientas finales pueden producir resultados de detectabilidad diferentes.

## Limitaciones

La comparativa actual está ligada a versiones concretas de HStego, cargas, detectores y condiciones de fuente de imágenes. Las evaluaciones futuras deberían separar la resultados a nivel de método de los detalles propios de cada herramienta.

## Papers clave

- [A New Cost Function for Spatial Image Steganography](https://doi.org/10.1109/ICIP.2014.7025854).
- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
