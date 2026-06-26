---
layout: page
title: S-UNIWARD
subtitle: ""
noindex: false
meta-title: "S-UNIWARD — StegoRank"
meta-description: "Ficha de StegoRank sobre esteganografía adaptativa S-UNIWARD en dominio espacial"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

S-UNIWARD es un método de esteganografía adaptativa en dominio espacial para imágenes sin comprimir. Forma parte de la familia de funciones de distorsión UNIWARD y utiliza el contenido de la imagen para decidir dónde conviene realizar las modificaciones.

## Uso en herramientas

S-UNIWARD es usado por HStego 0.4 para imágenes sin comprimir. Esto debe leerse como un método implementado por esa versión de la herramienta, no como un algoritmo independiente llamado “HStego 0.4”.

Para los experimentos de detectabilidad, StegoRank también se apoya en el [simulador de S-UNIWARD incluido en Aletheia](/stego/aletheia/v03/intro-es/#simulators). También existe una [implementación de investigación de S-UNIWARD en StegoLab](https://github.com/daniellerch/stegolab/tree/master/S-UNIWARD).

## Resultados de detectabilidad

En el escenario evaluado, el simulador de S-UNIWARD es mucho menos detectable que los métodos simples de sustitución LSB. Su posición relativa frente a HILL depende del rango de payload mostrado en la gráfica.

Los resultados basados en simuladores deben interpretarse como resultados a nivel de método. Los simuladores de inserción suelen ser ligeramente más difíciles de detectar que herramientas reales de usuario final como HStego, porque incrustan cerca del límite teórico y no incluyen todas las restricciones prácticas de una herramienta completa.

## Paper original

- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
