---
layout: page
title: SI-HILL
subtitle: ""
noindex: false
meta-title: "SI-HILL — StegoRank"
meta-description: "Ficha de StegoRank sobre SI-HILL, evaluado en imágenes generadas con Stable Diffusion"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

SI-HILL es una versión side-informed de HILL. Es una estrategia general que puede aplicarse en distintos escenarios, como JPEG, imágenes de Stable Diffusion u otros casos donde exista información lateral útil.

En la evaluación de StegoRank descrita aquí, SI-HILL se aplica a imágenes generadas con Stable Diffusion. En ese escenario, la información lateral procede del proceso de síntesis de la imagen, concretamente de los residuos de cuantización disponibles antes de redondear la salida continua del decodificador VAE a píxeles de 8 bits.

<section class="stegorank-facts" markdown="1">
## Resumen rápido
<dl>
  <dt>Método:</dt><dd>variante side-informed de HILL.</dd>
  <dt>Escenario evaluado:</dt><dd>imágenes generadas con Stable Diffusion, evaluadas como imágenes sin comprimir.</dd>
  <dt>Información lateral:</dt><dd>residuos de cuantización del proceso de síntesis en el protocolo evaluado.</dd>
  <dt>Uso:</dt><dd>método experimental de investigación, no herramienta de usuario final.</dd>
  <dt>Lectura principal:</dt><dd>aprovecha información disponible durante la generación para reducir la detectabilidad frente a HILL convencional en el protocolo evaluado.</dd>
</dl>
</section>

## Uso en herramientas

SI-HILL aparece en StegoRank como un método experimental de investigación, no como una herramienta de usuario final. En el protocolo evaluado con Stable Diffusion, extiende la función de costes HILL reduciendo el coste de las modificaciones cuya dirección es coherente con el residuo de cuantización de la imagen generada.

## Resultados de detectabilidad

En el escenario evaluado con Stable Diffusion, SI-HILL reduce sustancialmente la detectabilidad respecto a HILL convencional. A 0.10 bits por píxel, la accuracy de detección reportada está cerca del azar frente a EfficientNet-B0 y SRNet bajo el protocolo de estegoanálisis supervisado con la misma fuente.

El resultado debe interpretarse dentro del protocolo evaluado: Stable Diffusion v2.1, imágenes RGB de 512×512, información lateral procedente de la salida del decodificador VAE, y detectores entrenados y evaluados sobre imágenes generadas con la misma configuración. A cargas mayores, especialmente 0.20 y 0.40 bpp, el método vuelve a ser más detectable.

## Paper de referencia

- On the Effectiveness of Side-Informed Steganography in Diffusion-Generated Images. Daniel Lerch-Hostalot and David Megías. In Proceedings of the 21st International Conference on Availability, Reliability and Security (ARES '26). To appear, August 2026.

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
