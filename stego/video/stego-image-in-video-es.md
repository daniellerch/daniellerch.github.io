---
layout: page
title: "Incrustar imágenes con esteganografía dentro de vídeos"
subtitle: ""
noindex: false
published: true
meta-title: "Incrustar imágenes con esteganografía dentro de vídeos"
meta-description: "Cómo insertar un frame con esteganografía dentro de un vídeo, usando formatos sin pérdida para esteganografía espacial y MJPEG para frames JPEG."
meta-keywords: "esteganografía, vídeo, HStego, FFV1, MJPEG, JPEG, recompresión, ffmpeg"
lang-suffix: "-es"
comments: false
schema_type: "Article"
sitemap: true
---

> En este artículo vamos a ver cómo incrustar una imagen con esteganografía
> dentro de un vídeo. Usaremos HStego para generar la imagen estego, pero el
> objetivo principal no es estudiar HStego, sino entender qué formatos de vídeo
> permiten conservar esa imagen sin destruir la información oculta.

<div class='menu'></div>

## Contenido

1. [Idea general](#idea-general)
2. [Herramientas necesarias](#herramientas-necesarias)
3. [Vídeo de prueba](#vídeo-de-prueba)
4. [Por qué no sirve cualquier vídeo](#por-qué-no-sirve-cualquier-vídeo)
5. [Inspeccionar el vídeo original](#inspeccionar-el-vídeo-original)
6. [Caso 1: esteganografía espacial en vídeo sin pérdida](#caso-1-esteganografía-espacial-en-vídeo-sin-pérdida)
7. [Caso 2: esteganografía JPEG en vídeo MJPEG](#caso-2-esteganografía-jpeg-en-vídeo-mjpeg)
8. [Qué ocurre si se exporta a H.264, H.265 o AV1](#qué-ocurre-si-se-exporta-a-h264-h265-o-av1)
9. [Detectabilidad de esta técnica](#detectabilidad-de-esta-técnica)
10. [Limitaciones](#limitaciones)
11. [Resumen práctico](#resumen-práctico)
12. [Lecturas relacionadas](#lecturas-relacionadas)


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

## Herramientas necesarias

Para reproducir los comandos hacen falta `ffmpeg`, `ffprobe` y `hstego`.
`ffprobe` se instala normalmente junto con `ffmpeg`.

En Debian/Ubuntu:

```bash
sudo apt update
sudo apt install ffmpeg
sudo snap install hstego
```

En macOS, si usas Homebrew:

```bash
brew install ffmpeg
```

HStego puede descargarse desde su repositorio:

[https://github.com/daniellerch/hstego](https://github.com/daniellerch/hstego)

Para el caso MJPEG necesitas HStego 0.6.1 o posterior. Comprueba la versión
instalada con `hstego --version`. Si el canal estable de Snap todavía ofrece una
versión anterior, descarga el ejecutable de la [última release de
HStego](https://github.com/daniellerch/hstego/releases) para tu sistema.

En Windows, una opción práctica es instalar `ffmpeg` con Chocolatey o Scoop:

```powershell
choco install ffmpeg
```

```powershell
scoop install ffmpeg
```

Para comprobar que todo está disponible:

```bash
ffmpeg -version
ffprobe -version
hstego --help
```

## Vídeo de prueba

Para que el ejemplo sea reproducible, usaremos siempre el mismo vídeo:

[Descargar vídeo de prueba](/stego/video/resources/stego-image-in-video-sample.mp4)

Desde la terminal:

```bash
curl -L -o input.mp4 https://daniellerch.me/stego/video/resources/stego-image-in-video-sample.mp4
```

Si estás trabajando desde una copia local de esta web, también puedes copiarlo:

```bash
cp stego/video/resources/stego-image-in-video-sample.mp4 input.mp4
```

## Por qué no sirve cualquier vídeo

Las codificaciones habituales con H.264, H.265/HEVC, VP9 o AV1 para distribuir
vídeo usan compresión con pérdida. Con esos ajustes, el códec puede:

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

Antes de modificar nada, conviene inspeccionarlo:

```bash
ffprobe -hide_banner input.mp4
```

Este comando sirve para saber qué códec usa el vídeo, qué formato de píxel
tiene, cuál es su framerate y si contiene audio. Con el vídeo de prueba, la
salida es:

```text
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mp4':
  Metadata:
    major_brand     : mp42
    minor_version   : 0
    compatible_brands: mp42mp41isomavc1
    creation_time   : 2015-03-03T19:38:38.000000Z
  Duration: 00:00:09.05, start: 0.000000, bitrate: 4235 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 3974 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      creation_time   : 2015-03-03T19:38:38.000000Z
      handler_name    : L-SMASH Video Handler
      vendor_id       : [0][0][0][0]
      encoder         : AVC Coding
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 256 kb/s (default)
    Metadata:
      creation_time   : 2015-03-03T19:38:38.000000Z
      handler_name    : L-SMASH Audio Handler
      vendor_id       : [0][0][0][0]
```

La parte importante es `Video: h264` y `yuv420p`: se trata de un vídeo con
compresión con pérdida y subsampling de color. No es un buen formato para
conservar una imagen estego. También vemos `29.97 fps`, que necesitaremos
después si reconstruimos el vídeo desde una secuencia de frames.

Para obtener el valor exacto que usaremos con `-framerate`:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=nw=1:nk=1 input.mp4
```

La salida es:

```text
30000/1001
```

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
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -c:v ffv1 -level 3 -pix_fmt bgr0 -c:a copy video-ffv1.mkv
```

Detalles importantes:

- `-c:v ffv1` usa un códec de vídeo sin pérdida;
- FFV1 codifica cada frame sin predicción temporal;
- `-pix_fmt bgr0` usa valores RGB para los frames de trabajo. FFV1 conserva
  exactamente esos valores después de la conversión inicial, aunque no recupera
  el subsampling ni la información de color ya perdidos en el vídeo de entrada;
- `-map 0:a? -c:a copy` conserva el audio original cuando existe.

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
```

Con el vídeo de prueba, la salida es:

```text
Capacity: 38684 bytes
```

El mensaje ocupa mucho menos que esa capacidad, así que podemos incrustarlo:

```bash
hstego embed secret.txt frames-ffv1/frame_000100.png frames-ffv1/frame_000100_stego.png p4ssw0rd
```

Sustituimos el frame original por el frame estego:

```bash
mv frames-ffv1/frame_000100.png frames-ffv1/frame_000100_cover.png
mv frames-ffv1/frame_000100_stego.png frames-ffv1/frame_000100.png
```

Reconstruimos el vídeo, de nuevo sin pérdida:

```bash
ffmpeg -framerate 30000/1001 -i frames-ffv1/frame_%06d.png -i video-ffv1.mkv -map 0:v:0 -map 1:a? -c:v ffv1 -level 3 -pix_fmt bgr0 -c:a copy video-ffv1-stego.mkv
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

Con el vídeo de prueba, `cat recovered.txt` muestra:

```text
mensaje oculto dentro de un frame de video
```

También podemos comparar el mensaje original y el recuperado:

```bash
diff secret.txt recovered.txt
```

Si `diff` no muestra ninguna salida, los dos archivos son idénticos. En esta
prueba no muestra diferencias.

## Caso 2: esteganografía JPEG en vídeo MJPEG

El caso JPEG es más delicado. No basta con usar un vídeo MJPEG y reconstruirlo
de cualquier manera. Si el frame se decodifica y se vuelve a codificar como
JPEG, los coeficientes DCT pueden cambiar y el mensaje puede perderse.

La idea correcta es trabajar con los frames JPEG comprimidos como unidades que
se copian, no como imágenes que se recomprimen.

El flujo conceptual sería:

1. convertir el vídeo a MJPEG;
2. extraer los frames JPEG sin recodificarlos;
3. modificar uno de esos JPEG con HStego;
4. reconstruir el vídeo copiando los JPEG como frames MJPEG;
5. extraer de nuevo los JPEG del vídeo final;
6. recuperar el mensaje.

Primero convertimos el vídeo original a MJPEG. Este comando conserva la
resolución, la cadencia y el audio del vídeo de prueba; en la pista de vídeo
solo cambia el códec. La capacidad no se puede deducir de la resolución: hay
que medirla en el frame que se vaya a usar.

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -c:v mjpeg -q:v 2 -c:a copy video-mjpeg.avi
```

MJPEG almacena cada frame como una imagen JPEG. Esto lo hace interesante para
este experimento, pero hay una condición crítica: si más adelante reconstruimos
el vídeo recodificando los frames, los coeficientes DCT pueden cambiar. Para
esteganografía JPEG debemos copiar los frames JPEG ya comprimidos: no deben
recodificarse.

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

Con el vídeo de prueba descargable, la salida es:

```text
Capacity: 956 bytes
```

Esta capacidad corresponde al contenido cifrado que HStego incrusta, no solo al
tamaño del archivo original. Para este ejemplo usamos un mensaje corto:

```bash
printf 'mensaje JPEG dentro de un frame de video\n' > secret-jpeg.txt
```

Necesitas HStego 0.6.1 o posterior: esa versión corrige el manejo de JPEG cuyos
tres componentes comparten una sola tabla de cuantización, como los frames que
genera este comando de FFmpeg.

Ahora incrustamos el payload:

```bash
hstego embed secret-jpeg.txt frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_stego.jpg p4ssw0rd
```

Este paso puede tardar apreciablemente más que la inserción espacial. HStego
calcula costes adaptativos sobre los coeficientes DCT del JPEG y el trabajo
crece con el tamaño del frame; en este ejemplo se procesa un frame de
1920x1080 sin reducirlo.

El comando termina sin errores y crea `frame_000100_stego.jpg`. Sustituimos el
frame original, conservándolo aparte para poder comparar:

```bash
mv frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_cover.jpg
mv frames-mjpeg/frame_000100_stego.jpg frames-mjpeg/frame_000100.jpg
```

Reconstruimos el vídeo copiando los JPEG como packets. `-c:v copy` es la parte
crítica: FFmpeg no decodifica ni vuelve a codificar los frames.

```bash
ffmpeg -framerate 30000/1001 -i frames-mjpeg/frame_%06d.jpg -i video-mjpeg.avi -map 0:v:0 -map 1:a? -c:v copy -c:a copy video-mjpeg-stego.avi
```

Extraemos de nuevo los JPEG del vídeo final, también sin recodificarlos:

```bash
mkdir -p check-mjpeg
ffmpeg -i video-mjpeg-stego.avi -map 0:v:0 -c:v copy check-mjpeg/frame_%06d.jpg
```

Finalmente, recuperamos y verificamos el payload:

```bash
hstego extract check-mjpeg/frame_000100.jpg recovered-jpeg.txt p4ssw0rd
diff secret-jpeg.txt recovered-jpeg.txt
cat recovered-jpeg.txt
```

`diff` no muestra salida y `cat` muestra:

```text
mensaje JPEG dentro de un frame de video
```

La propiedad importante de este flujo es que el JPEG estego se inserta y se
vuelve a extraer sin recodificarlo. Si la línea de reconstrucción se cambia por
una recodificación como esta:

```bash
ffmpeg -framerate 30000/1001 -i frames-mjpeg/frame_%06d.jpg -i video-mjpeg.avi -map 0:v:0 -map 1:a? -c:v mjpeg -q:v 2 -c:a copy video-mjpeg-stego.avi
```

entonces los frames se vuelven a codificar. En ese caso, una esteganografía JPEG
basada en coeficientes DCT puede romperse.

## Qué ocurre si se exporta a H.264, H.265 o AV1

Los códecs de distribución habituales no transportan los valores de los píxeles
tal como entran. Para codificar H.264 con los ajustes habituales, FFmpeg
decodifica el frame, lo convierte normalmente a YCbCr 4:2:0 y el codificador
aplica predicción, transformación y cuantización. Al decodificar el MP4 se
obtiene un frame visualmente muy parecido, pero algunos valores de píxel han
cambiado. Un cambio de una unidad basta para modificar un bit menos
significativo.

Por eso, una exportación H.264 con pérdidas no conserva el payload espacial
incrustado en el caso FFV1/PNG. Una prueba útil consiste en tomar el vídeo con
el frame estego y exportarlo a H.264:

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

Lo normal es que falle la comprobación de integridad de HStego o que no se
recupere el mensaje. Esto no significa que HStego haya fallado: el payload
espacial dependía de valores exactos de píxel y la codificación con pérdidas
modificó parte de ellos. Que el frame se vea igual no es una verificación útil
para LSB.

El efecto es aún más tajante para el caso MJPEG/JPEG. El payload de HStego está
en coeficientes DCT del JPEG original. Al transcodificar MJPEG a H.264, H.265 o
AV1, el decodificador primero convierte esos coeficientes en píxeles y el nuevo
codificador calcula otra representación interna. Los coeficientes DCT del JPEG
no viajan al nuevo vídeo, por lo que no debe esperarse poder extraer el payload
JPEG después de esa conversión, aunque se eligiera una configuración de vídeo
sin pérdidas.

Lo mismo debe esperarse con H.265/HEVC, VP9 o AV1:

```bash
ffmpeg -i video-ffv1-stego.mkv -c:v libx265 -crf 24 video-h265.mp4
ffmpeg -i video-ffv1-stego.mkv -c:v libvpx-vp9 -crf 30 -b:v 0 video-vp9.webm
ffmpeg -i video-ffv1-stego.mkv -c:v libaom-av1 -crf 30 -b:v 0 video-av1.mkv
```

Los comandos usan ajustes con pérdidas: `-crf 18`, `-crf 24` y `-crf 30` no son
modos de preservación exacta. H.264, H.265, VP9 y AV1 tienen modos o perfiles
sin pérdidas, pero eso no basta por sí solo: habría que evitar también cualquier
conversión de espacio de color, profundidad o subsampling y comprobar la
extracción con el archivo final. Además, un códec de vídeo sin pérdidas puede
conservar un payload espacial si preserva exactamente los píxeles, pero no
conserva los coeficientes de un JPEG al convertirlo a otro códec.

En resumen, para este artículo las opciones seguras son concretas: FFV1 para
el frame PNG espacial y MJPEG con copia de packets para el frame JPEG. Para
ambas, `-c:v copy` es la forma de conservar el contenido comprimido cuando no
se pretende cambiar de códec.

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
7. No uses una codificación con pérdida, incluidos los ajustes habituales de
   H.264, H.265, VP9 o AV1, si necesitas conservar el payload.

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
