---
layout: page
title: "Estegoanálisis en imágenes"
subtitle: ""
noindex: false
meta-title: "Estegoanálisis en imágenes: detectar mensajes ocultos"
meta-description: "Referencia práctica sobre estegoanálisis en imágenes: detección de mensajes ocultos, LSB, JPEG, aprendizaje automático, herramientas y limitaciones."
meta-keywords: "estegoanálisis en imágenes, estegoanálisis, detectar mensajes ocultos en imágenes, estegoanálisis JPEG, estegoanálisis LSB, Aletheia"
lang-suffix: "-es"
alternate-en: "/image-steganalysis-en/"
alternate-es: "/image-steganalysis-es/"
comments: false
schema_type: "Article"
---

El estegoanálisis en imágenes estudia cómo inferir si una imagen ha sido
modificada para ocultar información. En un caso realista no se dispone de la
imagen cover original, de modo que el análisis no consiste en comparar dos
archivos y localizar diferencias. El problema consiste en evaluar si una imagen,
o un conjunto de imágenes, conserva las propiedades esperables de una cover de
la misma fuente o si presenta trazas compatibles con una técnica
esteganográfica.

Para la parte de incrustación, consulta [esteganografía en imágenes](/image-steganography-es/).
Para definiciones breves, consulta la [FAQ de esteganografía](/stego/intro/faq-es/).

<div class='menu'></div>

## Contenido

1. [Qué intenta detectar el estegoanálisis en imágenes](#qué-intenta-detectar-el-estegoanálisis-en-imágenes)
2. [Detectar no es lo mismo que extraer](#detectar-no-es-lo-mismo-que-extraer)
3. [Primeras comprobaciones antes de usar detectores](#primeras-comprobaciones-antes-de-usar-detectores)
4. [Estegoanálisis en dominio espacial](#estegoanálisis-en-dominio-espacial)
5. [Estegoanálisis JPEG](#estegoanálisis-jpeg)
6. [Aprendizaje automático y Cover Source Mismatch](#aprendizaje-automático-y-cover-source-mismatch)
7. [Herramientas y flujos de trabajo](#herramientas-y-flujos-de-trabajo)
8. [Lecturas relacionadas](#lecturas-relacionadas)

## Qué intenta detectar el estegoanálisis en imágenes

La esteganografía modifica una imagen para incrustar un payload. El
estegoanálisis intenta detectar esas modificaciones a partir de evidencias
indirectas. Algunas evidencias son estructurales, como artefactos de formato
creados por una herramienta concreta. Otras son estadísticas, como cambios en la
paridad de píxeles, en las relaciones entre valores vecinos, en la distribución
de coeficientes DCT o en el ruido residual.

Según el contexto, el objetivo puede ser solo distinguir entre cover y stego,
identificar la familia de incrustación, estimar el payload o priorizar imágenes
sospechosas dentro de un conjunto. El resultado de un detector suele ser
probabilístico: indica si una imagen parece cover, stego o sospechosa bajo un
modelo concreto. El resultado depende del método de incrustación, el payload, la
fuente de imágenes, el formato y el detector.

## Detectar no es lo mismo que extraer

Detectar que una imagen probablemente contiene información oculta es distinto de
extraer el mensaje. La extracción normalmente requiere la herramienta, el
algoritmo, la clave, la contraseña o los parámetros correctos. Un detector puede
encontrar evidencias de esteganografía aunque el payload no pueda recuperarse.

Esta diferencia es importante en análisis forense e investigación. Una
extracción fallida no demuestra que la imagen esté limpia, y una detección
positiva no revela automáticamente el mensaje.

## Primeras comprobaciones antes de usar detectores

Un flujo práctico suele empezar con inspección básica:

- identificar el formato y si el archivo es una imagen raster sin pérdida, un
  JPEG u otro contenedor;
- revisar metadatos y miniaturas incrustadas;
- comprobar si la imagen fue recomprimida, redimensionada o exportada por una
  plataforma;
- compararla con otras imágenes de la misma fuente cuando sea posible;
- escoger detectores adecuados para el formato y la familia sospechada.

La inspección genérica ayuda, pero no basta. La esteganografía moderna puede no
dejar artefactos visuales ni marcadores simples en metadatos. Cuando el método
está diseñado para ser visualmente imperceptible, hace falta estegoanálisis
estadístico.

## Estegoanálisis en dominio espacial

El estegoanálisis espacial se dirige a métodos que modifican directamente los
valores de los píxeles. Un caso clásico es [LSB replacement](/stego/intro/lsb-es/),
que cambia bits menos significativos de las muestras.

LSB replacement simple crea un efecto de paridad: los valores pares modificados
pasan a impares, y los impares modificados pasan a pares. Esto altera relaciones
estadísticas entre pares de valores y puede detectarse con ataques
especializados. Un ejemplo práctico es el [estegoanálisis de LSB replacement con Aletheia](/stego/aletheia/v03/lsbr-attack-es/).

LSB matching y los métodos espaciales adaptativos son más difíciles de detectar
con pruebas simples de paridad. Por eso, detectores más fuertes analizan
residuos, píxeles vecinos y dependencias de orden superior.

## Estegoanálisis JPEG

El estegoanálisis JPEG se dirige a cambios en coeficientes DCT cuantizados. La
esteganografía JPEG trabaja en ese dominio transformado, por lo que mirar solo
los píxeles puede ocultar evidencias importantes.

Métodos JPEG antiguos como F5 y Steghide a menudo pueden detectarse con ataques
específicos o análisis orientado a herramientas. Consulta las guías prácticas de
Aletheia sobre [estegoanálisis de F5](/stego/aletheia/v03/f5-attack-es/) y
[estegoanálisis de Steghide](/stego/aletheia/v03/steghide-attack-es/).

El estegoanálisis JPEG moderno suele usar características extraídas de
coeficientes DCT, calibración, modelos residuales o redes neuronales. Estos
detectores son sensibles a las condiciones experimentales: fuente de imágenes,
calidad JPEG, payload y procesado previo pueden afectar a la fiabilidad.

Para la parte de incrustación, consulta [esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/)
y las entradas de StegoRank sobre [J-UNIWARD](/stegorank/j-uniward-es/) y
[J-UNIWARD con cost polarization](/stegorank/j-uniward-cost-polarization-es/).

## Aprendizaje automático y Cover Source Mismatch

Muchos detectores modernos se entrenan con aprendizaje automático. Aprenden
diferencias estadísticas entre imágenes cover y stego en un conjunto de
entrenamiento y después aplican ese modelo a imágenes nuevas.

Esto introduce una limitación importante: el **Cover Source Mismatch**. Si las
imágenes de entrenamiento proceden de una fuente y las imágenes analizadas de
otra, el rendimiento del detector puede degradarse. Cámaras, procesos de
redimensionado, calidad JPEG, software de edición y modelos generativos pueden
cambiar la distribución de las covers.

Por eso, un flujo fiable debería usar conjuntos de datos conscientes de la
fuente siempre que sea posible e interpretar las puntuaciones como evidencia
bajo un modelo concreto, no como una prueba universal.

## Herramientas y flujos de trabajo

[Aletheia](https://github.com/daniellerch/aletheia) es una herramienta libre de
estegoanálisis para detectar mensajes ocultos en imágenes. Incluye comandos y
modelos para varias familias habituales de esteganografía. La guía práctica
[estegoanálisis en imágenes con Aletheia](/stego/aletheia/v03/intro-es/) es un
buen punto de entrada.

Recursos relacionados:

- [Identificar el esquema esteganográfico con Aletheia](/stego/aletheia/v03/identify-es/)
- [Comparación de herramientas de esteganografía en imágenes](/stego/aletheia/v03/tool-comparison-es/)
- [Comparativa de detectabilidad en StegoRank](/stegorank-es/)
- [Herramientas y código de StegoLab](/stegolab-es/)
- [Herramientas de esteganografía](/stego/intro/tools-es/)

## Lecturas relacionadas

- [Esteganografía en imágenes](/image-steganography-es/)
- [FAQ de esteganografía](/stego/intro/faq-es/)
- [Esteganografía LSB en imágenes y audio](/stego/intro/lsb-es/)
- [Esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/)
- [Publicaciones sobre esteganografía y estegoanálisis](/papers-es/)
