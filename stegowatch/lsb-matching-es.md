---
layout: page
title: LSB Matching
subtitle: ""
noindex: false
meta-title: "LSB Matching — StegoWatch"
meta-description: "Ficha StegoWatch sobre LSB matching, detectabilidad y limitaciones"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

LSB matching es una técnica de esteganografía en dominio espacial muy cercana a LSB replacement. En lugar de sustituir directamente el bit menos significativo, incrementa o decrementa el valor de la muestra cuando necesita modificarlo.

## Por qué importa

LSB matching evita el artefacto estadístico específico introducido por LSB replacement. Esto suele hacerlo más difícil de detectar mediante ataques estructurales simples diseñados para detectar la sustitución directa.

Por ello es una familia intermedia importante: sigue siendo sencilla, pero es más robusta que LSB replacement ingenuo.

## Herramientas típicas

LSB matching es menos frecuente en herramientas de usuario final que LSB replacement. Aparece más a menudo en código de investigación, implementaciones educativas y experimentos controlados.

## Resultados de detectabilidad

En la comparativa actual de StegoWatch, LSB matching aparece en la comparativa de imágenes sin comprimir. Obtiene mejores resultados que LSB replacement en varios escenarios de baja carga, pero no es indetectable.

Su detectabilidad depende de la carga, la fuente de imágenes, el detector y la implementación concreta.

## Limitaciones

La comparativa actual debe interpretarse como una comparación bajo unas condiciones concretas de comparación. No establece un nivel universal de seguridad para todas las implementaciones de LSB matching.

## Recursos relacionados

- [Artículo principal de StegoWatch](/stegowatch-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
