---
layout: page
title: Outguess y métodos JPEG clásicos
subtitle: ""
noindex: false
meta-title: "Outguess y métodos JPEG clásicos — StegoRank"
meta-description: "Ficha de StegoRank sobre Outguess, JSteg, JPHS y herramientas clásicas de esteganografía en dominio JPEG"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

Esta familia agrupa herramientas clásicas de esteganografía en dominio JPEG que ocultan información modificando elementos de la representación JPEG, normalmente coeficientes DCT. En la tabla actual de StegoRank, esta entrada está representada principalmente por Outguess y herramientas antiguas relacionadas.

## Por qué importa

JPEG sigue siendo uno de los formatos más relevantes para la esteganografía práctica en imágenes. Las herramientas JPEG clásicas siguen siendo útiles como referencia histórica y como línea base práctica para estegoanálisis, porque sus artefactos suelen ser más fáciles de detectar que los producidos por métodos adaptativos modernos.

## Herramientas típicas

Herramientas asociadas a esta familia:

- [Outguess](https://github.com/daniellerch/stego-collection/tree/master/Outguess);
- [JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg);
- [JP Hide & Seek / JPHS](https://github.com/daniellerch/stego-collection/tree/master/jphs).


## Resultados de detectabilidad

En la comparativa actual de StegoRank, Outguess representa esta familia y resulta muy fácil de detectar en el escenario evaluado. Esto no debe generalizarse automáticamente a todas las herramientas JPEG clásicas, pero es coherente con el hecho de que los métodos JPEG no adaptativos tienden a dejar artefactos estadísticos más fuertes que los enfoques adaptativos.

## Limitaciones

Esta es una familia amplia, no un único algoritmo. La detectabilidad depende de la herramienta concreta, la carga, la calidad JPEG, la fuente de imágenes, los detalles de implementación y el entrenamiento del detector.

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
