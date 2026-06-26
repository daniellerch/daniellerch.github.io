---
layout: page
title: HILL
subtitle: ""
noindex: false
meta-title: "HILL — StegoRank"
meta-description: "Ficha de StegoRank sobre esteganografía adaptativa HILL en dominio espacial"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

HILL es un método de esteganografía adaptativa en dominio espacial para imágenes sin comprimir. Asigna costes de inserción a partir del contenido de la imagen, de modo que las modificaciones se dirigen hacia zonas donde se espera que sean más difíciles de detectar.

## Uso en herramientas

HILL fue usado por las versiones de HStego anteriores a la 0.4 para imágenes sin comprimir. Esto debe leerse como un método implementado por esa versión de la herramienta, no como un algoritmo independiente llamado “HStego 0.3”.

Para los experimentos de detectabilidad, StegoRank también se apoya en el [simulador de HILL incluido en Aletheia](/stego/aletheia/v03/intro-es/#simulators). También existe una [implementación de investigación de HILL en StegoLab](https://github.com/daniellerch/stegolab/tree/master/HILL).

## Resultados de detectabilidad

En el escenario evaluado, el simulador de HILL es mucho menos detectable que los métodos simples de sustitución LSB. Su posición relativa frente a S-UNIWARD depende del rango de payload mostrado en la gráfica.

Los resultados basados en simuladores deben interpretarse como resultados a nivel de método. Los simuladores de inserción suelen ser ligeramente más difíciles de detectar que herramientas reales de usuario final como HStego, porque incrustan cerca del límite teórico y no incluyen todas las restricciones prácticas de una herramienta completa.

## Paper original

- [A New Cost Function for Spatial Image Steganography](https://doi.org/10.1109/ICIP.2014.7025854).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
