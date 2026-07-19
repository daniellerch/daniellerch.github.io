---
layout: page
title: "Incrustar imágenes con esteganografía dentro de vídeos"
subtitle: ""
noindex: true
published: false
meta-title: "Incrustar imágenes con esteganografía dentro de vídeos"
meta-description: "Cómo insertar un frame con esteganografía dentro de un vídeo, usando formatos sin pérdida para esteganografía espacial y MJPEG para frames JPEG."
meta-keywords: "esteganografía, vídeo, HStego, FFV1, MJPEG, JPEG, recompresión, ffmpeg"
lang-suffix: "-es"
comments: false
schema_type: "Article"
sitemap: false
---

> En este artículo vamos a ver cómo incrustar una imagen con esteganografía
> dentro de un vídeo. Usaremos HStego para generar la imagen estego, pero el
> objetivo principal no es estudiar HStego, sino entender qué formatos de vídeo
> permiten conservar esa imagen sin destruir la información oculta.

<div class='menu'></div>

## Contenido

1. [Idea general](#idea-general)
2. [Por qué no sirve cualquier vídeo](#por-qué-no-sirve-cualquier-vídeo)
3. [Inspeccionar el vídeo original](#inspeccionar-el-vídeo-original)
4. [Caso 1: esteganografía espacial en vídeo sin pérdida](#caso-1-esteganografía-espacial-en-vídeo-sin-pérdida)
5. [Caso 2: esteganografía JPEG en vídeo MJPEG](#caso-2-esteganografía-jpeg-en-vídeo-mjpeg)
6. [Qué ocurre si se exporta a H.264, H.265 o AV1](#qué-ocurre-si-se-exporta-a-h264-h265-o-av1)
7. [Cómo verificar que el mensaje sobrevive](#cómo-verificar-que-el-mensaje-sobrevive)
8. [Detectabilidad de esta técnica](#detectabilidad-de-esta-técnica)
9. [Limitaciones](#limitaciones)
10. [Resumen práctico](#resumen-práctico)
11. [Lecturas relacionadas](#lecturas-relacionadas)


<br>
## Idea general

Un vídeo puede verse como una secuencia de imágenes. Esto invita a una idea
sencilla:

1. extraer un frame del vídeo;
2. ocultar información dentro de ese frame usando una herramienta de
   esteganografía de imágenes;
3. volver a insertar el frame modificado en el vídeo;
4. extraer de nuevo el frame y recuperar el mensaje.

El problema está en el paso 3. Muchos formatos de vídeo no almacenan los frames
tal como los vemos, sino que los transforman, cuantizan y predicen a partir de
otros frames. Si el frame estego se recodifica con pérdida, la información oculta
puede desaparecer.

Por eso conviene distinguir dos escenarios:

| Tipo de esteganografía | Qué debe conservarse | Formato de vídeo razonable |
|---|---|---|
| Espacial, sobre píxeles | valores de píxel | FFV1, HuffYUV, rawvideo, PNG en secuencia |
| JPEG, sobre coeficientes DCT | frame JPEG comprimido | MJPEG sin recodificar el frame |

En el primer caso queremos que los píxeles sobrevivan exactamente. En el segundo
queremos que sobreviva el JPEG comprimido, porque la información está ligada a
los coeficientes DCT del JPEG.

## Por qué no sirve cualquier vídeo

Formatos habituales como H.264, H.265/HEVC, VP9 o AV1 usan compresión con
pérdida. Al codificar el vídeo, el códec puede:

- cambiar valores de píxeles;
- aplicar transformadas y cuantización;
- usar predicción entre frames;
- suavizar ruido o detalles pequeños;
- cambiar el espacio de color y la subsampling de croma;
- descartar información que considera poco perceptible.

Esto es justo lo contrario de lo que necesitamos para preservar esteganografía
en imágenes.

Si se oculta un mensaje en una imagen PNG modificando píxeles y después se
convierte el resultado a H.264, lo normal es que el mensaje se destruya. Y si se
oculta un mensaje en un JPEG modificando coeficientes DCT y después se vuelve a
codificar ese frame, lo normal es que los coeficientes cambien y la extracción
falle.

El primer paso, por tanto, no es extraer un frame. El primer paso es decidir qué
formato de trabajo necesita cada caso.

## Inspeccionar el vídeo original

Partimos de un vídeo cualquiera:

```bash
input.mp4
```

Antes de modificar nada, conviene inspeccionarlo:

```bash
ffprobe -hide_banner input.mp4
```

Este comando sirve para saber qué códec usa el vídeo, qué formato de píxel
tiene, cuál es su framerate y si contiene audio. Una salida típica podría ser:

```text
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mp4':
  Duration: 00:00:12.04, start: 0.000000, bitrate: 1824 kb/s
  Stream #0:0[0x1](und): Video: h264 (High), yuv420p(progressive),
    1920x1080, 1680 kb/s, 25 fps, 25 tbr, 12800 tbn (default)
  Stream #0:1[0x2](und): Audio: aac (LC), 48000 Hz, stereo, fltp, 128 kb/s
```

La parte importante es `Video: h264` y `yuv420p`: se trata de un vídeo con
compresión con pérdida y subsampling de color. No es un buen formato para
conservar una imagen estego. También vemos `25 fps`, que necesitaremos después
si reconstruimos el vídeo desde una secuencia de frames.

Si la salida mostrase algo como `Video: ffv1`, `Video: huffyuv` o `Video: mjpeg`,
el vídeo original ya estaría más cerca de un formato de trabajo útil. Aun así,
conviene verificarlo, porque no basta con que el contenedor sea `.avi`, `.mkv` o
`.mov`: lo que importa es el códec real de la pista de vídeo.

## Caso 1: esteganografía espacial en vídeo sin pérdida

En este caso queremos ocultar información en una imagen sin pérdida, por ejemplo
un PNG. El flujo será:

1. convertir el vídeo a FFV1;
2. extraer todos los frames como PNG;
3. modificar uno de los frames con HStego;
4. reconstruir el vídeo en FFV1;
5. extraer el frame modificado;
6. recuperar el mensaje.

Primero convertimos el vídeo original a un formato sin pérdida. Una opción
práctica es FFV1 dentro de MKV:

```bash
ffmpeg -i input.mp4 -map 0:v:0 -c:v ffv1 -level 3 -g 1 -pix_fmt bgr0 -an video-ffv1.mkv
```

Detalles importantes:

- `-c:v ffv1` usa un códec de vídeo sin pérdida;
- `-g 1` fuerza frames independientes;
- `-pix_fmt bgr0` evita pérdidas asociadas a conversiones de color con
  subsampling;
- `-an` elimina el audio para simplificar el ejemplo.

Si quieres conservar el audio, puedes añadirlo como copia:

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -c:v ffv1 -level 3 -g 1 -pix_fmt bgr0 -c:a copy video-ffv1-audio.mkv
```

Una vez tenemos `video-ffv1.mkv`, extraemos los frames:

```bash
mkdir -p frames-ffv1
ffmpeg -i video-ffv1.mkv frames-ffv1/frame_%06d.png
```

Creamos un mensaje:

```bash
printf "mensaje oculto dentro de un frame de video\n" > secret.txt
```

Elegimos un frame. Por ejemplo:

```bash
frames-ffv1/frame_000100.png
```

Ocultamos el mensaje con HStego:

```bash
hstego capacity frames-ffv1/frame_000100.png
hstego embed secret.txt frames-ffv1/frame_000100.png frames-ffv1/frame_000100_stego.png p4ssw0rd
```

Sustituimos el frame original por el frame estego:

```bash
mv frames-ffv1/frame_000100.png frames-ffv1/frame_000100_cover.png
mv frames-ffv1/frame_000100_stego.png frames-ffv1/frame_000100.png
```

Reconstruimos el vídeo, de nuevo sin pérdida:

```bash
ffmpeg -framerate 25 -i frames-ffv1/frame_%06d.png -c:v ffv1 -level 3 -g 1 -pix_fmt bgr0 video-ffv1-stego.mkv
```

El valor de `-framerate` debe coincidir con el framerate del vídeo original. Se
puede consultar con:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=nw=1:nk=1 video-ffv1.mkv
```

Ahora extraemos de nuevo el frame 100 del vídeo resultante:

```bash
mkdir -p check-ffv1
ffmpeg -i video-ffv1-stego.mkv -vf "select=eq(n\,99)" -frames:v 1 -update 1 check-ffv1/frame_000100.png
```

La numeración es fácil de confundir: `frame_000100.png` es el archivo número
100, pero en el filtro `select` el primer frame es `n=0`. Por eso usamos
`eq(n\,99)`.

Finalmente, extraemos el mensaje:

```bash
hstego extract check-ffv1/frame_000100.png recovered.txt p4ssw0rd
cat recovered.txt
```

Si todo el flujo se ha mantenido sin pérdida, el mensaje debería recuperarse.

## Caso 2: esteganografía JPEG en vídeo MJPEG

El caso JPEG es más delicado. No basta con usar un vídeo MJPEG y reconstruirlo
de cualquier manera. Si el frame se decodifica y se vuelve a codificar como
JPEG, los coeficientes DCT pueden cambiar y el mensaje puede perderse.

La idea correcta es trabajar con los frames JPEG comprimidos como unidades que
se copian, no como imágenes que se recomprimen.

El flujo será:

1. convertir el vídeo a MJPEG;
2. extraer los frames JPEG sin recodificarlos;
3. modificar uno de esos JPEG con HStego;
4. reconstruir el vídeo copiando los JPEG como frames MJPEG;
5. extraer de nuevo los JPEG del vídeo final;
6. recuperar el mensaje.

Primero convertimos el vídeo original a MJPEG. Usamos `yuvj444p` para evitar
subsampling de croma y trabajar con JPEGs de geometría más simple:

```bash
ffmpeg -i input.mp4 -map 0:v:0 -c:v mjpeg -q:v 2 -pix_fmt yuvj444p -an video-mjpeg.avi
```

MJPEG almacena cada frame como una imagen JPEG. Esto lo hace interesante para
este experimento, pero hay una condición crítica: si más adelante reconstruimos
el vídeo recodificando los frames, los coeficientes DCT cambiarán. Para
esteganografía JPEG necesitamos copiar los frames JPEG ya comprimidos siempre
que sea posible.

Extraemos los frames JPEG intentando conservar el contenido comprimido:

```bash
mkdir -p frames-mjpeg
ffmpeg -i video-mjpeg.avi -map 0:v:0 -c:v copy frames-mjpeg/frame_%06d.jpg
```

Elegimos un frame JPEG:

```bash
frames-mjpeg/frame_000100.jpg
```

Antes de ocultar información, conviene comprobar la capacidad del frame:

```bash
hstego capacity frames-mjpeg/frame_000100.jpg
```

Si la capacidad es `0 bytes`, ese frame no sirve para este mensaje. En mis
pruebas, algunos JPEG extraídos directamente de MJPEG generado por `ffmpeg`
tenían capacidad, pero HStego no podía incrustar en ellos por detalles internos
del JPEG. Si ocurre, hay que escoger otro frame o reexportar ese frame como JPEG
antes de usar HStego. Esta reexportación debe hacerse antes de incrustar el
mensaje. Una vez generado el JPEG estego, no debe volver a codificarse: debe
insertarse en el vídeo con `-c:v copy`.

Ocultamos información con HStego:

```bash
hstego embed secret.txt frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_stego.jpg p4ssw0rd
```

Sustituimos el frame:

```bash
mv frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_cover.jpg
mv frames-mjpeg/frame_000100_stego.jpg frames-mjpeg/frame_000100.jpg
```

Ahora reconstruimos el vídeo MJPEG intentando copiar los JPEG como packets, sin
recodificarlos:

```bash
ffmpeg -framerate 25 -i frames-mjpeg/frame_%06d.jpg -c:v copy video-mjpeg-stego.avi
```

Esta línea es la parte crítica. Si `ffmpeg` acepta `-c:v copy` con la secuencia
de JPEG, el vídeo resultante debería contener esos JPEG como frames MJPEG sin
recomprimirlos. Si el comando se cambia por una recodificación como esta:

```bash
ffmpeg -framerate 25 -i frames-mjpeg/frame_%06d.jpg -c:v mjpeg -q:v 2 video-mjpeg-stego.avi
```

entonces los frames se vuelven a codificar. En ese caso, una esteganografía JPEG
basada en coeficientes DCT puede romperse.

Para verificarlo, extraemos de nuevo el frame del vídeo resultante:

```bash
mkdir -p check-mjpeg
ffmpeg -i video-mjpeg-stego.avi -map 0:v:0 -c:v copy check-mjpeg/frame_%06d.jpg
```

Y probamos la extracción:

```bash
hstego extract check-mjpeg/frame_000100.jpg recovered-jpeg.txt p4ssw0rd
cat recovered-jpeg.txt
```

Si el frame JPEG se ha conservado como JPEG comprimido, el mensaje debería
sobrevivir. Si en algún punto se ha recodificado, puede fallar.

## Qué ocurre si se exporta a H.264, H.265 o AV1

Una prueba útil es tomar el vídeo con el frame estego y exportarlo a H.264:

```bash
ffmpeg -i video-ffv1-stego.mkv -c:v libx264 -crf 18 -preset slow video-h264.mp4
```

Después extraemos el frame:

```bash
mkdir -p check-h264
ffmpeg -i video-h264.mp4 -vf "select=eq(n\,99)" -frames:v 1 -update 1 check-h264/frame_000100.png
```

Y probamos la extracción:

```bash
hstego extract check-h264/frame_000100.png recovered-h264.txt p4ssw0rd
```

Lo normal es que falle. Esto no significa que HStego haya fallado, sino que el
mensaje estaba incrustado en una imagen y la imagen ha sido alterada por una
codificación con pérdida.

Lo mismo debe esperarse con H.265/HEVC, VP9 o AV1:

```bash
ffmpeg -i video-ffv1-stego.mkv -c:v libx265 -crf 24 video-h265.mp4
ffmpeg -i video-ffv1-stego.mkv -c:v libvpx-vp9 -crf 30 -b:v 0 video-vp9.webm
ffmpeg -i video-ffv1-stego.mkv -c:v libaom-av1 -crf 30 -b:v 0 video-av1.mkv
```

Estos formatos son excelentes para distribución de vídeo, pero no para conservar
una imagen estego que depende de valores exactos.

## Cómo verificar que el mensaje sobrevive

No basta con que el vídeo se reproduzca ni con que el frame parezca visualmente
igual. Hay que verificar la extracción después de reconstruir el vídeo.

Un flujo mínimo de verificación sería:

```bash
# 1. Extraer el frame después de reconstruir el vídeo
ffmpeg -i video-ffv1-stego.mkv -vf "select=eq(n\,99)" -frames:v 1 -update 1 check.png

# 2. Extraer el mensaje
hstego extract check.png recovered.txt p4ssw0rd

# 3. Comparar con el original
diff secret.txt recovered.txt
```

Si `diff` no muestra diferencias, el mensaje se ha recuperado correctamente.

En el caso MJPEG, además conviene comprobar si el frame se ha mantenido
idéntico:

```bash
sha256sum frames-mjpeg/frame_000100.jpg check-mjpeg/frame_000100.jpg
```

Si los hashes coinciden, el frame JPEG comprimido se ha preservado byte a byte.
Si no coinciden, puede que todavía se pueda extraer el mensaje, pero ya no
estamos demostrando preservación exacta del frame JPEG.

## Detectabilidad de esta técnica

Insertar una imagen estego dentro de un vídeo no hace que la esteganografía sea
automáticamente más difícil de detectar. En algunos escenarios puede ocurrir lo
contrario: el vídeo puede aportar nuevas señales de anomalía.

Hay dos niveles de detección distintos.

El primero es detectar que el vídeo tiene un formato o una estructura poco
habitual. Por ejemplo:

- un vídeo FFV1 en MKV puede ser normal en archivado o edición, pero raro como
  vídeo de distribución;
- un AVI con MJPEG puede ser legítimo, pero no es el formato habitual de una
  plataforma moderna;
- un vídeo con todos los frames intra puede tener un tamaño mucho mayor que un
  MP4 H.264 normal;
- un único frame puede tener un tamaño comprimido anómalo respecto a los frames
  vecinos;
- un frame JPEG estego puede destacar si su tamaño comprimido o sus estadísticas
  DCT se apartan de las de los frames vecinos.

El segundo nivel es detectar la esteganografía dentro del frame. Si el analista
extrae los frames y los analiza como imágenes, el problema vuelve a ser el de
estegoanálisis de imagen:

- en PNG o frames sin pérdida, se pueden aplicar detectores espaciales;
- en JPEG/MJPEG, se pueden aplicar detectores basados en coeficientes DCT;
- si solo un frame contiene payload, puede destacar frente al resto;
- si el payload es alto, la detección suele ser más fácil.

Por tanto, esta técnica debe entenderse como una forma de transportar una imagen
estego dentro de un vídeo, no como una garantía de baja detectabilidad.

Si se quisiera reducir la detectabilidad, habría que cuidar varios aspectos:

- usar payload bajo;
- repartir la información entre varios frames;
- escoger frames con suficiente textura o complejidad;
- mantener todos los frames dentro del mismo pipeline de codificación;
- evitar que el frame estego tenga tamaño o metadatos anómalos;
- comparar los frames con herramientas de estegoanálisis antes y después;
- analizar también el vídeo completo para detectar anomalías de bitrate o
  estructura.

En el caso JPEG/MJPEG, es especialmente importante comparar el frame estego con
los frames vecinos. Aunque se inserte sin recodificar, puede resultar sospechoso
si su tamaño comprimido o sus estadísticas DCT se apartan demasiado del patrón
normal del vídeo.

## Limitaciones

Este enfoque tiene varias limitaciones importantes:

- El vídeo sin pérdida ocupa mucho más espacio que un MP4 normal.
- Reinsertar un frame requiere reconstruir o remultiplexar el vídeo.
- En esteganografía espacial, cualquier recodificación con pérdida puede destruir
  el mensaje.
- En esteganografía JPEG, cualquier recodificación JPEG puede cambiar los
  coeficientes DCT.
- Plataformas como redes sociales, mensajería o servicios de vídeo suelen
  recomprimir el contenido.
- Si el objetivo es robustez frente a edición o recompresión, se necesita otro
  tipo de técnica, más cercana a watermarking robusto que a esteganografía
  clásica.

También hay una diferencia conceptual importante: insertar un frame con
esteganografía en un vídeo no convierte automáticamente el método en
"esteganografía de vídeo". En muchos casos sigue siendo esteganografía de imagen
transportada dentro de un contenedor de vídeo.

## Resumen práctico

Si quieres incrustar una imagen con esteganografía dentro de un vídeo:

1. Decide qué necesitas conservar.
2. Para esteganografía espacial, usa vídeo sin pérdida como FFV1.
3. Para esteganografía JPEG, usa MJPEG y evita recodificar el frame JPEG.
4. Extrae el frame, aplica la esteganografía y vuelve a insertarlo.
5. Extrae de nuevo el frame desde el vídeo final.
6. Verifica la extracción del mensaje.
7. No exportes a H.264, H.265, VP9 o AV1 si necesitas conservar el payload.

La idea clave es simple: el mensaje no debe sobrevivir al vídeo visual, sino al
proceso exacto de codificación. Si el proceso cambia los píxeles o los
coeficientes de los que depende el mensaje, la extracción puede fallar.

## Lecturas relacionadas

- [Preguntas frecuentes sobre esteganografía](/stego/intro/faq-es/).
- [Herramientas de esteganografía](/stego/intro/tools-es/).
- [Esteganografía LSB en imágenes y audio](/stego/intro/lsb-es/).
- [Esteganografía en imágenes raster sin pérdida](/stego/books/stegopython/bitmapimages-es/).
- [Esteganografía en imágenes JPEG](/stego/books/stegopython/jpegimages-es/).
- [Esteganografía en vídeo](/stego/books/stegopython/video-es/).
- [Comparativa de herramientas de esteganografía en imágenes](/stego/aletheia/v03/tool-comparison-es/).
