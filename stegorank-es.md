---
layout: page
title: StegoRank
subtitle: ""
noindex: false
meta-title: "StegoRank — Daniel Lerch"
meta-description: "Comparativa de técnicas y herramientas de esteganografía en imágenes"
lang-suffix: "-es"
comments: false
---

<style>
    [id]::before {
        content: '';
        display: block;
        height: 70px;
        margin-top: -70px;
        visibility: hidden;
    }

    .stegorank-updated {
        margin: 1.5rem 0 2rem;
        padding: 0.85rem 1rem;
        border-left: 4px solid #0074D9;
        background: #f7f9fb;
        color: #555;
    }

    .stegorank-updated p {
        margin-bottom: 0;
    }


    h2 {
        margin-top: 4rem;
    }

    .stegorank-figure {
        margin: 2.5rem 0;
        text-align: center;
    }

    .stegorank-figure img {
        max-width: 100%;
        height: auto;
    }

    .stegorank-figure .caption {
        margin-top: 0.85rem;
        color: #333;
        font-size: 1.3rem;
        font-weight: 500;
    }


    .stegorank-rating {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
        white-space: nowrap;
    }

    .stegorank-rating-bars {
        display: inline-flex;
        gap: 4px;
        vertical-align: middle;
    }

    .stegorank-rating-bars span {
        display: inline-block;
        width: 18px;
        height: 12px;
        border-radius: 2px;
        background: #e1e1e1;
    }

    .stegorank-rating-1 .stegorank-rating-bars span:nth-child(-n+1) { background: #e60000; }
    .stegorank-rating-2 .stegorank-rating-bars span:nth-child(-n+2) { background: #e67e22; }
    .stegorank-rating-3 .stegorank-rating-bars span:nth-child(-n+3) { background: #d6a500; }
    .stegorank-rating-4 .stegorank-rating-bars span:nth-child(-n+4) { background: #4f9d69; }
    .stegorank-rating-5 .stegorank-rating-bars span:nth-child(-n+5) { background: #00d15f; }

    .stegorank-rating-label {
        color: #444;
        font-size: 1rem;
        line-height: 1.2;
    }
</style>


StegoRank sigue el estado actual de las técnicas y herramientas de esteganografía en imágenes, con especial atención a cómo de detectables son frente al estegoanálisis práctico.

La comparación se organiza alrededor de las técnicas de incrustación subyacentes, porque muchas herramientas implementan los mismos métodos, o métodos muy cercanos. Esto facilita entender qué se está evaluando realmente: la herramienta, la técnica que utiliza, la carga insertada y el detector empleado para analizarla.

<div class="stegorank-updated">
  <p><strong>Última actualización:</strong> 26 de junio de 2026. Esta es una sección viva: los resultados y clasificaciones pueden cambiar a medida que se actualicen herramientas, detectores y protocolos de comparación.</p>
</div>

<div class='menu' style='margin-top:50px'></div>

1. [Gráficas comparativas](#gráficas-comparativas)
2. [Técnicas y herramientas](#técnicas-y-herramientas)
3. [Cómo leer estos resultados](#cómo-leer-estos-resultados)

## Gráficas comparativas

Las gráficas siguientes son la forma más rápida de leer la comparativa actual. Muestran cómo de detectables son distintas técnicas y herramientas de esteganografía en imágenes bajo las condiciones evaluadas.

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison.png" alt="Comparativa de métodos de esteganografía en imágenes sin comprimir">
  <div class="caption">Comparativa de esteganografía en imágenes sin comprimir, como PNG, TIF o BMP.</div>
</div>

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison_jpeg.png" alt="Comparativa de métodos de esteganografía en imágenes JPEG">
  <div class="caption">Comparativa de esteganografía en imágenes JPEG.</div>
</div>

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/stable_diffusion_side_informed.png" alt="Comparativa de esteganografía convencional y side-informed en imágenes de Stable Diffusion">
  <div class="caption">Comparativa de métodos de esteganografía evaluados en imágenes generadas con Stable Diffusion. La accuracy de HILL, UNIWARD, SI-HILL y SI-UNIWARD está promediada entre EfficientNet-B0 y SRNet; el punto generativo con Stable Diffusion se muestra en 0.02 bpp con detección a nivel de azar.</div>
</div>

## Técnicas y herramientas

Muchas herramientas implementan las mismas técnicas, o técnicas muy cercanas. La tabla enlaza cada familia con su ficha y resume las herramientas representadas en la comparativa. Para un catálogo más amplio, consulta el [listado de herramientas de esteganografía](/stego/intro/tools-es/).

| Familia técnica | Dominio | Software que usa esta técnica | Resistencia a detección |
|---|---|---|---|
|  [Esteganografía generativa](/stegorank/generative-steganography-es/) | Sin comprimir | [SteganoGAN](https://github.com/DAI-Lab/SteganoGAN)<br>[mas_GRDH](https://ieeexplore.ieee.org/abstract/document/10637346) | <span class="stegorank-rating stegorank-rating-1" title="Muy fácil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Muy fácil de detectar</span></span><br><span class="stegorank-rating stegorank-rating-5" title="Difícil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Difícil de detectar</span></span>  |
|  [LSB replacement](/stegorank/lsb-replacement-es/) | Sin comprimir | [OpenStego](https://www.openstego.com), [OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) | <span class="stegorank-rating stegorank-rating-4" title="Parcialmente detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Parcialmente detectable</span></span>  |
|  [LSB matching](/stegorank/lsb-matching-es/) | Sin comprimir | Implementaciones de investigación / experimentales | <span class="stegorank-rating stegorank-rating-4" title="Parcialmente detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Parcialmente detectable</span></span>  |
|  [HILL](/stegorank/hill-es/) | Sin comprimir | [HStego < 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-4" title="Parcialmente detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Parcialmente detectable</span></span>  |
|  [S-UNIWARD](/stegorank/s-uniward-es/) | Sin comprimir | [HStego 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-5" title="Difícil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Difícil de detectar</span></span>  |
|  [SI-HILL](/stegorank/si-hill-es/) | Sin comprimir (Stable Diffusion) | Implementación experimental | <span class="stegorank-rating stegorank-rating-5" title="Difícil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Difícil de detectar</span></span>  |
|  [SI-UNIWARD](/stegorank/si-uniward-es/) | Sin comprimir (Stable Diffusion) | Implementación experimental | <span class="stegorank-rating stegorank-rating-5" title="Difícil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Difícil de detectar</span></span>  |
|  [Métodos clásicos en dominio JPEG](/stegorank/jpeg-domain-es/) | JPEG | [Outguess](https://github.com/daniellerch/stego-collection/tree/master/Outguess) y otros | <span class="stegorank-rating stegorank-rating-1" title="Muy fácil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Muy fácil de detectar</span></span>  |
|  [F5](/stegorank/f5-es/) | JPEG | [F5](https://github.com/daniellerch/stego-collection/tree/master/F5) | <span class="stegorank-rating stegorank-rating-1" title="Muy fácil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Muy fácil de detectar</span></span>  |
|  [Steghide](/stegorank/steghide-es/) | JPEG | [Steghide](https://steghide.sourceforge.net/index.php) | <span class="stegorank-rating stegorank-rating-2" title="Fácil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Fácil de detectar</span></span>  |
|  [J-UNIWARD](/stegorank/j-uniward-es/) | JPEG | [HStego < 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-4" title="Parcialmente detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Parcialmente detectable</span></span>  |
|  [J-UNIWARD + Cost Polarization](/stegorank/j-uniward-cost-polarization-es/) | JPEG | [HStego 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-5" title="Difícil de detectar"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Difícil de detectar</span></span>  |

## Cómo leer estos resultados

El nivel resume la resistencia a detección en el escenario evaluado. Para las filas de la comparativa de Aletheia, se calcula por separado para cada dominio a partir de la accuracy media del detector en los payloads mostrados en las gráficas: dentro de cada dominio, la accuracy media más alta se representa con un rectángulo rojo y la accuracy media más baja con cinco rectángulos verdes. Las filas basadas en imágenes de Stable Diffusion siguen el protocolo descrito en sus fichas correspondientes. No debe leerse como un ranking universal de herramientas, y no implica indetectabilidad. La detectabilidad depende de varios factores:

- *payload*;
- fuente de imágenes;
- formato y dominio de incrustación;
- detalles de implementación;
- detector y datos de entrenamiento;
- si la evaluación se realiza dentro de la misma fuente o entre fuentes distintas.

Por este motivo, StegoRank trata las herramientas como puntos de entrada prácticos, pero organiza la comparación alrededor de técnicas y condiciones de evaluación.
