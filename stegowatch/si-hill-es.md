---
layout: page
title: SI-HILL
subtitle: ""
noindex: false
meta-title: "SI-HILL — StegoWatch"
meta-description: "Ficha de StegoWatch sobre SI-HILL para imágenes generadas con Stable Diffusion"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

SI-HILL es una variante side-informed de HILL para esteganografía en dominio espacial sobre imágenes sin comprimir generadas con Stable Diffusion. Utiliza información lateral procedente del proceso de síntesis de la imagen, concretamente los residuos de cuantización disponibles antes de redondear la salida continua del decodificador VAE a píxeles de 8 bits.

## Uso en herramientas

SI-HILL aparece en StegoWatch como un método experimental de investigación, no como una herramienta de usuario final. Extiende la función de costes HILL reduciendo el coste de las modificaciones cuya dirección es coherente con el residuo de cuantización de la imagen generada.

## Resultados de detectabilidad

En el escenario evaluado con Stable Diffusion, SI-HILL reduce sustancialmente la detectabilidad respecto a HILL convencional. A 0.10 bits por píxel, la accuracy de detección reportada está cerca del azar frente a EfficientNet-B0 y SRNet bajo el protocolo de estegoanálisis supervisado con la misma fuente.

El resultado debe interpretarse dentro del protocolo evaluado: Stable Diffusion v2.1, imágenes RGB de 512×512, información lateral procedente de la salida del decodificador VAE, y detectores entrenados y evaluados sobre imágenes generadas con la misma configuración. A cargas mayores, especialmente 0.20 y 0.40 bpp, el método vuelve a ser más detectable.

## Paper de referencia

- On the Effectiveness of Side-Informed Steganography in Diffusion-Generated Images. Daniel Lerch-Hostalot and David Megías. In Proceedings of the 21st International Conference on Availability, Reliability and Security (ARES '26). To appear, August 2026.

## Recursos relacionados

- [Artículo principal de StegoWatch](/stegowatch-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
