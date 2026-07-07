---
layout: page
title: LSB Replacement
subtitle: ""
noindex: false
meta-title: "LSB Replacement — StegoRank"
meta-description: "Ficha StegoRank sobre LSB replacement, herramientas, detectabilidad y limitaciones"
lang-suffix: "-es"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

LSB replacement es una técnica de esteganografía en dominio espacial que oculta información sustituyendo el bit menos significativo de las muestras de la imagen por bits del mensaje.

<section class="stegorank-facts" markdown="1">
## Resumen rápido

<dl>
  <dt>Dominio:</dt><dd>imágenes sin comprimir.</dd>
  <dt>Tipo:</dt><dd>método LSB simple basado en sustitución directa de bits.</dd>
  <dt>Herramientas:</dt><dd>OpenStego, OpenPuff y otras herramientas educativas o antiguas.</dd>
  <dt>Lectura principal:</dt><dd>es fácil de implementar, pero deja artefactos estructurales conocidos que pueden detectarse incluso sin aprendizaje profundo.</dd>
</dl>
</section>

## Por qué importa

LSB replacement es una técnica simple, muy conocida e implementada por muchas herramientas prácticas. Su simplicidad también la convierte en una buena referencia para entender la esteganografía y el estegoanálisis en imágenes.

Su principal debilidad es que la sustitución directa de bits introduce artefactos estadísticos. Estos artefactos pueden explotarse mediante métodos estructurales de estegoanálisis, como Sample Pair Analysis (SPA), que no requieren entrenamiento con un colección de imágenes.

## Herramientas típicas

Herramientas asociadas a esta familia:

- OpenStego;
- OpenPuff, en algunos modos de imagen;
- CryptoStego, en algunos modos de imagen;
- herramientas simples, educativas o antiguas de esteganografía en imágenes.

## Resultados de detectabilidad

En la comparativa actual de StegoRank, LSB replacement aparece representado en la comparativa sobre imágenes sin comprimir. Los resultados incluyen detección mediante SPA y mediante modelos basados en aprendizaje automático.

El punto importante no es sólo que LSB replacement pueda detectarse, sino que puede atacarse con métodos estructurales menos dependientes de datos de entrenamiento que los detectores basados en aprendizaje profundo.

## Limitaciones

La comparativa disponible depende de la colección de imágenes, las cargas evaluadas, los detalles de implementación y los detectores utilizados. Los resultados no deben generalizarse a cualquier fuente de imágenes o implementación.

## Recursos relacionados

- [Artículo principal de StegoRank](/stegorank-es/)
- [StegoLab](/stegolab-es/)
- [Aletheia](/stego/aletheia/v03/intro-es/)
- [Listado de herramientas de esteganografía](/stego/intro/tools-es/)
