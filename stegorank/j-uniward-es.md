---
layout: page
title: J-UNIWARD
subtitle: ""
noindex: false
meta-title: "J-UNIWARD — StegoRank"
meta-description: "Ficha de StegoRank sobre esteganografía JPEG con J-UNIWARD"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

J-UNIWARD es un método de esteganografía adaptativa en dominio JPEG. Asigna costes a los cambios en los coeficientes DCT de JPEG mediante una función de distorsión diseñada para este dominio.

<section class="stegorank-facts" markdown="1">
## Resumen rápido
<dl>
  <dt>Dominio:</dt><dd>JPEG.</dd>
  <dt>Tipo:</dt><dd>método adaptativo basado en la función de distorsión UNIWARD.</dd>
  <dt>Herramientas:</dt><dd>HStego &lt; 0.4, simulador de Aletheia e implementación de investigación en StegoLab.</dd>
  <dt>Lectura principal:</dt><dd>mejora claramente frente a métodos JPEG clásicos, pero queda por debajo de J-UNIWARD + Cost Polarization en la comparativa actual.</dd>
</dl>
</section>

## Uso en herramientas

J-UNIWARD fue usado por las versiones de HStego anteriores a la 0.4 para imágenes JPEG. Esto debe leerse como un método implementado por esa versión de la herramienta, no como un algoritmo independiente llamado “HStego 0.3”.

Para los experimentos de detectabilidad, StegoRank también se apoya en el [simulador de J-UNIWARD incluido en Aletheia](/stego/aletheia/v03/intro-es/#simulators). También existe una [implementación de investigación de J-UNIWARD en StegoLab](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD).

## Resultados de detectabilidad

En el escenario evaluado, el simulador de J-UNIWARD es bastante menos detectable que herramientas JPEG clásicas como Outguess y F5, y también menos detectable que Steghide bajo las mismas condiciones.

Los resultados basados en simuladores deben interpretarse como resultados a nivel de método. Los simuladores de inserción suelen ser ligeramente más difíciles de detectar que herramientas reales de usuario final como HStego, porque incrustan cerca del límite teórico y no incluyen todas las restricciones prácticas de una herramienta completa.

## Paper original

- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
