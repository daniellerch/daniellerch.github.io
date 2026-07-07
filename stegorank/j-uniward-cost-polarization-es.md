---
layout: page
title: J-UNIWARD + Cost Polarization
subtitle: ""
noindex: false
meta-title: "J-UNIWARD + Cost Polarization — StegoRank"
meta-description: "Ficha de StegoRank sobre J-UNIWARD con polarización de costes para esteganografía JPEG"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

J-UNIWARD + Cost Polarization es un enfoque adaptativo en dominio JPEG que extiende J-UNIWARD utilizando información lateral estimada. En HStego >= 0.4 se implementa con filtrado de Wiener antes de aplicar la polarización de costes.

<section class="stegorank-facts" markdown="1">
## Resumen rápido

<dl>
  <dt>Dominio:</dt><dd>JPEG.</dd>
  <dt>Tipo:</dt><dd>método adaptativo con información lateral estimada.</dd>
  <dt>Herramientas:</dt><dd>HStego >= 0.4 e implementación de investigación en StegoLab.</dd>
  <dt>Lectura principal:</dt><dd>es la entrada JPEG menos detectable de la comparativa actual, dentro del protocolo evaluado.</dd>
</dl>
</section>

## Uso en herramientas

En la comparativa actual, este método aparece a través de HStego >= 0.4. Esto debe leerse como un resultado del método implementado por esas versiones de la herramienta, no como un algoritmo independiente llamado “HStego”.

También existe una [implementación de investigación de J-UNIWARD + Cost Polarization en StegoLab](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD/j-uniwardfast-rgbnr-wiener-color.py). A diferencia de J-UNIWARD básico, esta entrada se representa en la comparativa actual mediante HStego >= 0.4 y no mediante un simulador genérico de Aletheia.

## Resultados de detectabilidad

En el escenario evaluado, J-UNIWARD + Cost Polarization mediante HStego >= 0.4 es el método JPEG menos detectable mostrado en la comparativa actual.

Los resultados basados en implementaciones de investigación o simuladores deben interpretarse como resultados a nivel de método. Pueden ser ligeramente más difíciles de detectar que herramientas reales de usuario final cuando incrustan cerca del límite teórico y no incluyen todas las restricciones prácticas de una herramienta completa.

## Paper original

- [JPEG Steganography With Estimated Side-Information](https://doi.org/10.1109/TIFS.2019.2918511).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
