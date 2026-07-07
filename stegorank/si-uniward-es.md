---
layout: page
title: SI-UNIWARD
subtitle: ""
noindex: false
meta-title: "SI-UNIWARD — StegoRank"
meta-description: "Ficha de StegoRank sobre SI-UNIWARD, evaluado en imágenes generadas con Stable Diffusion"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

SI-UNIWARD es una versión side-informed de UNIWARD. Es una estrategia general que puede aplicarse en distintos escenarios, como JPEG, imágenes de Stable Diffusion u otros casos donde exista información lateral útil.

En la evaluación de StegoRank descrita aquí, SI-UNIWARD se aplica a imágenes generadas con Stable Diffusion. En ese escenario, utiliza residuos de cuantización del proceso de síntesis de imagen como información lateral para guiar las modificaciones de incrustación.

<section class="stegorank-facts" markdown="1">
## Resumen rápido
<dl>
  <dt>Método:</dt><dd>variante side-informed de UNIWARD.</dd>
  <dt>Escenario evaluado:</dt><dd>imágenes generadas con Stable Diffusion, evaluadas como imágenes sin comprimir.</dd>
  <dt>Información lateral:</dt><dd>residuos de cuantización del proceso de síntesis en el protocolo evaluado.</dd>
  <dt>Uso:</dt><dd>método experimental de investigación, no herramienta de usuario final.</dd>
  <dt>Lectura principal:</dt><dd>reduce la detectabilidad de UNIWARD convencional aprovechando la información lateral disponible antes del redondeo a 8 bits.</dd>
</dl>
</section>

## Uso en herramientas

SI-UNIWARD aparece en StegoRank como un método experimental de investigación, no como una herramienta de usuario final. En el protocolo evaluado con Stable Diffusion, extiende la función de costes UNIWARD reduciendo el coste de las modificaciones cuya dirección coincide con el residuo entre la salida continua del decodificador VAE y la imagen redondeada a 8 bits.

## Resultados de detectabilidad

En el escenario evaluado con Stable Diffusion, SI-UNIWARD reduce sustancialmente la detectabilidad respecto a UNIWARD convencional. A 0.10 bits por píxel, la accuracy de detección reportada está cerca del azar frente a EfficientNet-B0 y SRNet bajo el protocolo de estegoanálisis supervisado con la misma fuente.

El resultado debe interpretarse dentro del protocolo evaluado: Stable Diffusion v2.1, imágenes RGB de 512×512, información lateral procedente de la salida del decodificador VAE, y detectores entrenados y evaluados sobre imágenes generadas con la misma configuración. A cargas mayores, especialmente 0.20 y 0.40 bpp, el método vuelve a ser más detectable.

## Paper de referencia

- On the Effectiveness of Side-Informed Steganography in Diffusion-Generated Images. Daniel Lerch-Hostalot and David Megías. In Proceedings of the 21st International Conference on Availability, Reliability and Security (ARES '26). To appear, August 2026.

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
