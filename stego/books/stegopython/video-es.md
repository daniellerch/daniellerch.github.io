---
layout: page
title: "Esteganografía para programadores Python"
subtitle: "Esteganografía en vídeo" 
noindex: false
meta-title: "Esteganografía para programadores Python: Esteganografía en vídeo"
meta-description: "Capítulo 'Esteganografía en vídeo' del libro 'Esteganografía para programadores Python'"
meta-keywords: "esteganografía, Python"
lang-suffix: "-es"
comments: true
---

<center style='margin-bottom:30px'>
[ &nbsp; <a href='/books-es'>Índice</a> ]
</center>





<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

## Contenido

1. [Introducción](#introducción)
2. [Incrustación en vídeo sin pérdida](#incrustación-en-vídeo-sin-pérdida)
    1. [Introducción](#incrustación-en-vídeo-sin-pérdida)
    2. [Incrustación en las imágenes](#incrustación-en-las-imágenes)
    3. [Incrustación en el audio](#incrustación-en-el-audio)
    4. [Incrustación y recodificación](#incrustación-y-recodificación)
    5. [Extracción del mensaje](#extracción-del-mensaje)
3. [Vídeo con compresión con pérdida](#vídeo-con-compresión-con-pérdida)
 
<br>




<br>
## Introducción

El vídeo digital está compuesto, en esencia, por dos tipos de datos: una secuencia de imágenes (fotogramas) y una pista de audio. Para aplicar esteganografía en vídeo, es fundamental entender cómo se almacenan estos datos y qué implicaciones tienen los distintos formatos y métodos de compresión sobre las técnicas de ocultación de información.

En lo que respecta a los fotogramas, algunos formatos de vídeo almacenan cada imagen de forma independiente y sin pérdida de información. Este es el caso de formatos como FFV1, HuffYUV, Apple ProRes 4444 (en sus variantes sin pérdida) o UT Video. Estos formatos son especialmente adecuados para la esteganografía, ya que permiten modificar directamente los píxeles de cada fotograma utilizando técnicas similares a las empleadas en imágenes sin comprimir, como la inserción de bits en el LSB.

Por otro lado, la mayoría de los formatos populares de vídeo utilizan compresión con pérdida para reducir el tamaño del archivo. Este es el caso de H.264, H.265/HEVC, VP9, AV1 y otros códecs ampliamente utilizados en plataformas de transmisión y redes sociales. Estos algoritmos de compresión aplican transformaciones complejas (como DCT, cuantificación y predicción inter-frame) que alteran significativamente los datos originales. Como consecuencia, las técnicas de esteganografía que dependen de la preservación exacta de los valores de píxeles, como la modificación del bit menos significativo, resultan más complejas, ya que la información oculta en píxeles se perdería durante la compresión.

Una situación similar ocurre con el audio. Algunos formatos de vídeo incorporan pistas de audio en formatos sin compresión o con compresión sin pérdida, como PCM, WAV o FLAC. Estos permiten aplicar técnicas LSB sin riesgo de perder la información oculta. Sin embargo, otros formatos como AAC, MP3 o Opus, que aplican compresión con pérdida, descartan partes del espectro de audio consideradas no perceptibles. Esto implica una pérdida irreversible de datos, lo que también afecta a cualquier mensaje que se haya incrustado.

En resumen, la posibilidad de aplicar técnicas de esteganografía como LSB en vídeo depende del tipo de compresión utilizada tanto en la pista de vídeo como en la de audio. Los formatos sin pérdida ofrecen un entorno mucho más controlado y fiable para la ocultación de datos, mientras que los formatos con pérdida requieren enfoques más complejos.

<br>
## Incrustación en vídeo sin pérdida

### Introducción

En este apartado se aborda la ocultación de información en vídeos sin pérdida, lo que implica trabajar con archivos en los que la pista de vídeo y/o la de audio se almacenan sin compresión con pérdida. Esto es fundamental para aplicar técnicas de esteganografía como la modificación del bit menos significativo (LSB), ya que los procesos de compresión con pérdida eliminan o alteran partes significativas de los datos originales, destruyendo cualquier información oculta en el proceso.

En el caso del vídeo, es necesario utilizar un códec que almacene los fotogramas sin pérdida, como FFV1, HuffYUV o versiones sin compresión de Apple ProRes o UT Video. Para el audio, se deben emplear códecs como PCM (típicamente almacenado como WAV) o FLAC, que permiten mantener la fidelidad de las muestras originales y, por tanto, son adecuados para la incrustación de datos mediante técnicas LSB.

Afortunadamente, ffmpeg, una herramienta muy potente y versátil, permite recodificar cualquier archivo de vídeo a un formato sin pérdida, seleccionando de forma explícita los códecs de vídeo y audio que se deseen. A continuación, se presentan algunos ejemplos de uso de ffmpeg para generar archivos compatibles con esteganografía basada en LSB:

**Vídeo con códec FFV1 y audio PCM (formato AVI):**
```bash
ffmpeg -i input.mp4 -c:v ffv1 -c:a pcm_s16le output.avi
```

**Vídeo con códec HuffYUV y audio PCM (formato AVI):**
```bash
ffmpeg -i input.mp4 -c:v huffyuv -c:a pcm_s16le output.avi
```

**Vídeo con FFV1 y audio FLAC (formato MKV):**
```bash
ffmpeg -i input.mp4 -c:v ffv1 -c:a flac output.mkv
```

**Vídeo sin compresión y audio PCM (formato MOV):**
```bash
ffmpeg -i input.mp4 -c:v rawvideo -pix_fmt rgb24 -c:a pcm_s16le output.mov
```

Un aspecto fundamental al trabajar con vídeo es entender la diferencia entre los *códecs* y los *contenedores*. Mientras que los códecs (como ffv1, h264, aac, etc.) son responsables de la codificación y compresión de los flujos de audio y vídeo, los contenedores (como .avi, .mov, .mkv, etc.) definen cómo se agrupan, organizan y sincronizan estos flujos dentro de un mismo archivo.

El contenedor es el que determina la extensión del archivo, y no el códec en sí. Por ejemplo, un mismo vídeo comprimido con el códec ffv1 puede almacenarse en un contenedor .avi, .mov o .mkv, y seguirá teniendo exactamente el mismo flujo de vídeo internamente. No obstante, algunos contenedores ofrecen mayor compatibilidad con ciertos códecs o soportan mejor características como múltiples pistas de audio, subtítulos, o metadatos.

En la **Tabla 1** se muestra una tabla con los contenedores más comunes, sus extensiones y los códecs típicamente compatibles.


| **Ext.** | **Contenedor** | **Vídeo**                    | **Audio**                    |
|---|---|---|---|
| .avi | AVI        | ffv1, huffyuv               | pcm_s16le |
| .mov | QuickTime  | rawvideo, prores            | pcm |
| .mkv | Matroska   | ffv1, h264, vp9             | pcm, flac, opus |
| .mp4 | MP4        | h264, mpeg4                 | aac, mp3 |

<center>
<br>
Tabla 1. Contenedores comunes y códecs compatibles
</center>

La **Tabla 1** muestra algunos de los contenedores más habituales, junto con los códecs de vídeo y audio que suelen utilizar. Para aplicaciones de esteganografía, los contenedores .avi, .mov y .mkv son especialmente útiles, ya que permiten emplear códecs sin pérdida como ffv1, huffyuv o pcm_s16le. Por el contrario, contenedores como .mp4, aunque muy populares, están orientados a la compresión con pérdida y no son recomendables cuando se desea trabajar con esteganografía LSB.

Es importante tener en cuenta que los formatos sin pérdida generan archivos considerablemente más grandes. Sin embargo, su uso es esencial cuando se quiere usar técnicas que trabajen con el LSB, como LSB *matching*, para preservar la integridad de los datos ocultos y garantizar la posibilidad de extraerlos.

En los siguientes apartados vamos a ver como incrustar información en vídeos alterando las imágenes y el audio. Lo veremos por separado, aunque por supuesto, se pueden hacer ambas cosas a la vez.

<br>
### Incrustación en las imágenes

En este apartado veremos cómo realizar la incrustación de información en los fotogramas de un vídeo que utiliza un códec de compresión sin pérdida. Al trabajar con vídeo sin pérdida, cada fotograma puede tratarse como una imagen independiente, preservando todos sus valores de píxeles originales. Esto nos permite aplicar técnicas similares a las utilizadas en imágenes sin comprimir, como la modificación del bit menos significativo (LSB).

Para acceder a los fotogramas del vídeo y manipularlos directamente desde Python, utilizaremos la librería PyAV. Esta librería proporciona una interfaz de alto nivel para trabajar con flujos de vídeo y audio, basada en la popular herramienta ffmpeg. Gracias a PyAV, podemos decodificar el vídeo, extraer fotogramas uno a uno, modificar sus píxeles y, si se desea, volver a codificarlos para generar un nuevo archivo con la información oculta.

La clave de este enfoque es que, al mantener la compresión sin pérdida, los cambios realizados en los píxeles de los fotogramas no se verán alterados por el proceso de codificación, garantizando así que la información incrustada pueda recuperarse de forma precisa.

En el siguiente ejemplo vemos cómo usar la librería PyAV para extraer las diferentes imágenes que forman el vídeo, de forma secuencial. Como ejemplo de cómo insertar información, modificaremos el valor del pixel en la posición $(0,0)$ incrementándolo en una unidad (evitamos el *overflow* usando la función `min`). Usaremos el primer canal de color, es decir, el que corresponde al rojo.

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
video_stream = container.streams.video[0]

for frame in container.decode(video_stream):
    img = frame.to_ndarray(format='rgb24')
    img[0, 0, 0] = min(img[0, 0, 0] + 1, 255)
```

Sin embargo, la imagen en RGB es una conversión del formato YUV usado por el códec FFV1. Esto es algo que no nos conviene, puesto que la conversión de YUV a RGB afectará al LSB de los bytes y destruirá el mensaje. Por lo tanto, no vamos a trabajar con RGB si no que lo vamos a hacer con YUV.

Aunque en muchas herramientas y librerías (como FFmpeg o PyAV) se utiliza el término YUV para referirse a formatos como yuv444p o yuv420p, en realidad estos nombres hacen referencia a una codificación digital del color basada en el espacio YCbCr, que ya hemos explicado anteriormente. El término YUV proviene del mundo analógico, donde se definía como un modelo de codificación de color utilizado en televisión. En la práctica actual, cuando manipulamos datos en formatos como yuv444p, estamos trabajando con componentes Y (luminancia), Cb (diferencia con el azul) y Cr (diferencia con el rojo), pero usando la nomenclatura tradicional YUV por conveniencia histórica. Por tanto, podemos usar el término YUV como sinónimo práctico de YCbCr, ya que es el nombre comúnmente utilizado en librerías y formatos de vídeo digitales.

El cambio para trabajar con YUV es mínimo:

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
video_stream = container.streams.video[0]

for frame in container.decode(video_stream):
    yuv = frame.to_ndarray(format='yuv444p')
    yuv[0][0, 0] = min(yuv[0][0, 0] + 1, 255) 
```

Si bien hemos modificado la muestra de vídeo, faltaría almacenarlo. Esto implica no solo recodificar el vídeo, si no también el audio, pues no queremos perderlo en el proceso. En el siguiente apartado veremos cómo incrustar información en el canal de audio, posteriormente, veremos cómo realizar el proceso completo.

<br>
### Incrustación en el audio

En este apartado veremos cómo realizar la incrustación de información en el audio de un vídeo que utiliza un códec de compresión sin pérdida. Al trabajar con audio sin pérdida, cada muestra se almacena de forma exacta, lo que permite manipular directamente sus valores sin que se vean alterados por el proceso de codificación. Esto nos permite aplicar técnicas similares a las utilizadas en archivos de audio sin comprimir, como los ficheros .wav, incluyendo la modificación del bit menos significativo (LSB).

Para acceder a las muestras de audio de un vídeo desde Python, utilizaremos la librería PyAV. Esta librería proporciona una interfaz de alto nivel para trabajar con flujos de vídeo y audio, basada en la popular herramienta ffmpeg. Gracias a PyAV, podemos decodificar el flujo de audio, acceder a las muestras como matrices NumPy, modificarlas, y volver a codificarlas si se desea generar un nuevo archivo con la información oculta.

La clave de este enfoque es que, al mantener la compresión sin pérdida, los cambios realizados en las muestras de audio no se verán alterados por el proceso de codificación, garantizando así que la información incrustada pueda recuperarse de forma precisa.

En el siguiente ejemplo vemos cómo usar la librería PyAV para acceder a las muestras de audio de un vídeo. Como ejemplo de cómo insertar información, modificaremos el valor de la primera muestra del primer canal, incrementando su valor en una unidad. Nótese que controlamos el tamaño máximo de la muestra para no producir un *overflow*.

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
audio_stream = container.streams.audio[0]

for frame in container.decode(audio_stream):
    samples = frame.to_ndarray() 
    max_val = np.iinfo(samples.dtype).max
    samples[0,0] = min(samples[0,0]+1, max_val)
```

Igual que en el apartado anterior, falta guardar el resultado. Para ello, no solo tenemos que recodificar el audio, también tenemos que copiar el vídeo. Veremos el proceso completo en el apartado siguiente.

<br>
### Incrustación y recodificación

En los apartados anteriores hemos visto cómo modificar las imágenes y las muestras de  audio que forman el vídeo para ocultar información. Sin embargo no hemos visto cómo recodificar el vídeo para guardar el resultado. Para poder almacenar los cambios realizados es necesario crear un contenedor de salida en el que vamos a tener que insertar las imágenes y las muestras de audio.

El siguiente código implementa la incrustación de un mensaje en vídeo, tanto en el flujo de imágenes como en el de audio, utilizando la técnica LSB *matching*. La implementación se basa en la librería PyAV, que permite el acceso a los datos sin comprimir de los fotogramas y las muestras de audio.

El proceso comienza con la apertura de los contenedores de entrada y salida mediante la función `open_containers`, que se encarga de inicializar los objetos necesarios para leer y escribir los datos multimedia. A continuación, la función `setup_streams` configura los *streams* de vídeo y audio en el contenedor de salida, replicando parámetros fundamentales como la resolución del vídeo, el número de canales de audio y el diseño del canal. El flujo de vídeo se codifica utilizando el códec sin pérdida FFV1, mientras que el audio se mantiene en formato PCM sin compresión.

El mensaje a ocultar se convierte a una secuencia de bits en la función `message_to_bits`, que transforma cada carácter del mensaje en su representación binaria de 8 bits, generando así una lista de ceros y unos. Posteriormente, las funciones `process_video_frame` y `process_audio_frame` recorren, respectivamente, los fotogramas de vídeo y los bloques de muestras de audio. En cada iteración, se incrusta un bit del mensaje en el *bit menos significativo* (LSB) del dato correspondiente: un píxel del canal Y en el caso del vídeo, o una muestra de audio.

La modificación de los valores se realiza utilizando la técnica de *LSB matching*, implementada en la función `lsb_matching`. Esta función comprueba si el valor actual ya contiene el bit deseado. Si no es así, ajusta el valor en una unidad hacia arriba o hacia abajo. Cuando ambas opciones son posibles, la dirección del ajuste se elige aleatoriamente; si el valor se encuentra en uno de los extremos del rango permitido, la modificación se realiza forzadamente hacia el interior del rango.

Durante todo el proceso de incrustación, se mantiene el seguimiento de la posición actual dentro de la secuencia de bits mediante contadores explícitos para vídeo y audio. Una vez insertados todos los bits del mensaje, los datos restantes se procesan sin alteraciones.

Finalmente, los fotogramas y bloques modificados se codifican y se escriben en el contenedor de salida, utilizando las funciones de codificación y multiplexado de PyAV. La sincronización temporal se preserva mediante la asignación de los campos `pts` y `time_base`, garantizando así que el archivo resultante sea perfectamente reproducible.

Este enfoque, permite incrustar mensajes completos tanto en el componente visual como en el auditivo de un archivo multimedia, de manera eficaz y prácticamente indetectable.

```python
import av
import numpy as np
import random

def lsb_matching(value, bit, mx=255, mn=0):
    if value % 2 == bit:
        return value
    if value == mx:
        s = -1
    elif value == mn:
        s = +1
    else:
        s = random.choice([-1, 1])
    return value + s

def message_to_bits(msg):
    return [int(bit) for char in msg.encode('utf-8') 
        for bit in f'{char:08b}']

def open_containers(input_path, output_path):
    in_container = av.open(input_path)
    out_container = av.open(output_path, mode='w')
    return in_container, out_container

def setup_streams(in_container, out_container):
    video_stream = in_container.streams.video[0]
    audio_stream = in_container.streams.audio[0]

    out_video_stream = out_container.add_stream('ffv1', 
                            rate=video_stream.average_rate)
    out_video_stream.width = video_stream.width
    out_video_stream.height = video_stream.height
    out_video_stream.pix_fmt = 'yuv444p'

    out_audio_stream = out_container.add_stream('pcm_s16le', 
                            rate=audio_stream.rate)
    out_audio_stream.channels = audio_stream.channels
    out_audio_stream.layout = audio_stream.layout.name

    return video_stream, audio_stream, out_video_stream, out_audio_stream

def process_video_frame(frame, video_bits, bit_index):
    yuv = frame.to_ndarray(format='yuv444p')
    height, width = yuv.shape[1], yuv.shape[2]

    for y in range(height):
        for x in range(width):
            if bit_index >= len(video_bits):
                break
            bit = video_bits[bit_index]
            yuv[0][y, x] = lsb_matching(yuv[0][y, x], bit)
            bit_index += 1
        else:
            continue
        break

    new_frame = av.VideoFrame.from_ndarray(yuv, 
                               format='yuv444p')
    new_frame.pts = frame.pts
    new_frame.time_base = frame.time_base
    return new_frame, bit_index

def process_audio_frame(frame, audio_bits, bit_index):
    samples = frame.to_ndarray()
    flat = samples.flatten()

    for i in range(len(flat)):
        if bit_index >= len(audio_bits):
            break
        bit = audio_bits[bit_index]
        flat[i] = lsb_matching(flat[i], bit, 
            mx=np.iinfo(flat.dtype).max, 
                mn=np.iinfo(flat.dtype).min)
        bit_index += 1

    samples = flat.reshape(samples.shape)
    new_audio = av.AudioFrame.from_ndarray(samples, 
                                layout=frame.layout.name)
    new_audio.sample_rate = frame.sample_rate
    new_audio.pts = frame.pts
    new_audio.time_base = frame.time_base
    return new_audio, bit_index

def hide(input_path, output_path, message_video, message_audio):
    in_container, out_container = \
        open_containers(input_path, output_path)
    video_stream, audio_stream, out_video_stream, out_audio_stream = \
        setup_streams(in_container, out_container)

    video_bits = message_to_bits(message_video)
    audio_bits = message_to_bits(message_audio)
    video_bit_index = 0
    audio_bit_index = 0

    for packet in \
        in_container.demux((video_stream, audio_stream)):
        for frame in packet.decode():
            if packet.stream.type == 'video':
                new_frame, video_bit_index = \
                    process_video_frame(frame, 
                        video_bits, video_bit_index)
                for out_packet in \
                    out_video_stream.encode(new_frame):
                    out_container.mux(out_packet)
            elif packet.stream.type == 'audio':
                new_audio, audio_bit_index = \
                    process_audio_frame(frame, 
                        audio_bits, audio_bit_index)
                for out_packet in \
                    out_audio_stream.encode(new_audio):
                    out_container.mux(out_packet)

    for packet in out_video_stream.encode():
        out_container.mux(packet)
    for packet in out_audio_stream.encode():
        out_container.mux(packet)

    out_container.close()
    in_container.close()

message_video = "Hidden in video"
message_audio = "Hidden in audio"
hide('video_ffv1_pcm.avi', 'video_stego_ffv1_pcm.avi', 
     message_video, message_audio)
```

Este código nos da las herramientas necesarias para modificar los LSB de las imágenes e incrustar mensajes que no se perderán al guardar el vídeo.

<br>
### Extracción del mensaje

En el apartado anterior hemos visto cómo ocultar información en los flujos de imágenes y en las muestras de audio de un vídeo. A continuación vamos a ver cómo extraer esta información.

El siguiente código implementa el proceso de extracción de mensajes ocultos en los canales de vídeo y audio incrustados con el código del apartado anterior.

La función principal `extract` coordina el proceso de extracción. A partir del número de bytes esperados en el mensaje oculto, se calcula la cantidad total de bits que deben recuperarse tanto del vídeo como del audio. El archivo de entrada es procesado dos veces, una por cada tipo de flujo, utilizando las funciones `extract_bits_from_video` y `extract_bits_from_audio`.

La función `extract_bits_from_video` abre el archivo y accede al primer *stream* de vídeo. Luego, decodifica los fotogramas y convierte cada uno a una representación en el espacio de color yuv444p. A continuación, recorre los píxeles del canal de luminancia (Y), extrayendo el bit menos significativo de cada valor y acumulándolo en una lista hasta completar el número de bits deseado.

De forma análoga, la función `extract_bits_from_audio` accede al *stream* de audio del mismo archivo. A medida que decodifica los bloques de muestras, convierte cada una en un array unidimensional, del que extrae el LSB de cada muestra. Estos bits también se almacenan en una lista, hasta alcanzar la longitud especificada.

Una vez obtenidas ambas secuencias de bits, se procede a su decodificación mediante la función `bits_to_message`. Esta función agrupa los bits en bloques de 8 y los convierte a su valor decimal correspondiente, reconstruyendo así los bytes originales del mensaje. El resultado es finalmente interpretado como una cadena de texto en codificación UTF-8, ignorando cualquier error en los bytes incompletos al final.

Este enfoque permite recuperar de forma fiable los mensajes previamente ocultos en los datos visuales y sonoros del archivo. Para que la extracción sea precisa, es fundamental conocer con exactitud la longitud del mensaje en bytes. En aplicaciones más avanzadas, esta longitud podría estar incrustada como cabecera del propio mensaje, como se ha descrito en los capítulos de imágenes y vídeo. 

```python
import av
import numpy as np

def extract_bits_from_video(input_path, num_bits):
    container = av.open(input_path)
    video_stream = container.streams.video[0]
    bits = []

    for frame in container.decode(video_stream):
        yuv = frame.to_ndarray(format='yuv444p')
        height, width = yuv.shape[1], yuv.shape[2]

        for y in range(height):
            for x in range(width):
                if len(bits) >= num_bits:
                    container.close()
                    return bits
                lsb = yuv[0][y, x] & 1
                bits.append(lsb)

    container.close()
    return bits

def extract_bits_from_audio(input_path, num_bits):
    container = av.open(input_path)
    audio_stream = container.streams.audio[0]
    bits = []

    for frame in container.decode(audio_stream):
        samples = frame.to_ndarray().flatten()

        for sample in samples:
            if len(bits) >= num_bits:
                container.close()
                return bits
            lsb = sample & 1
            bits.append(lsb)

    container.close()
    return bits

def bits_to_message(bits):
    chars = []
    for i in range(0, len(bits), 8):
        byte = bits[i:i+8]
        if len(byte) < 8:
            break
        value = int("".join(str(b) for b in byte), 2)
        chars.append(value)
    return bytes(chars).decode('utf-8', errors='ignore')

def extract(input_path, n_bytes_video, n_bytes_audio):
    n_bits_video = n_bytes_video * 8
    n_bits_audio = n_bytes_audio * 8

    bits_video = extract_bits_from_video(input_path, n_bits_video)
    bits_audio = extract_bits_from_audio(input_path, n_bits_audio)

    msg_video = bits_to_message(bits_video)
    msg_audio = bits_to_message(bits_audio)

    return msg_video, msg_audio

msg_video, msg_audio = extract('video_stego_ffv1_pcm.avi', 
                        n_bytes_video=16, n_bytes_audio=16)

print("Video message:", msg_video)
print("Audio message:", msg_audio)
```

<br>
## Vídeo con compresión con pérdida

Hasta ahora hemos visto cómo es posible incrustar información en vídeos que utilizan códecs de compresión sin pérdida, gracias a que los datos originales —tanto imágenes como audio— se conservan íntegramente. Esto permite trabajar directamente con los valores de los píxeles y de las muestras, sin riesgo de que el proceso de codificación destruya la información oculta.

Sin embargo, cuando trabajamos con vídeos codificados con compresión con pérdida, como los que utilizan los códecs H.264, H.265/HEVC, VP9 o AV1, la situación cambia radicalmente. Estos algoritmos aplican transformadas como la Transformada Discreta del Coseno (DCT) sobre bloques de píxeles, seguidas de procesos de cuantificación que eliminan información considerada irrelevante desde el punto de vista perceptual. En el caso del audio, códecs como MP3, AAC u Opus emplean transformadas como la MDCT (Modified Discrete Cosine Transform) para lograr compresión, también con pérdidas de información irreversibles.

Desde un punto de vista esteganográfico, lo ideal sería poder acceder a los coeficientes transformados (DCT o MDCT) antes de la cuantificación, o incluso después de esta, para modificar directamente aquellos valores que se mantendrán en el archivo codificado. Esto permitiría implementar técnicas similares a las utilizadas en esteganografía JPEG, donde los mensajes se incrustan en el dominio de la frecuencia.

Lamentablemente, en el ecosistema de Python no existen actualmente librerías que proporcionen acceso directo y sencillo a estos coeficientes en vídeos o audios comprimidos con pérdida. A diferencia del caso de imágenes JPEG, donde herramientas como python-jpeg-toolbox permiten trabajar con los coeficientes DCT, no disponemos de herramientas equivalentes para los flujos de vídeo codificados con H.264 o para pistas de audio MP3 o AAC.

La librería PyAV, aunque muy potente, trabaja a un nivel más alto y expone los datos ya decodificados, es decir, después de la aplicación de la transformada y la cuantificación. Como resultado, cualquier modificación que se realice sobre estos datos en formato PCM o RGB será descartada si posteriormente se vuelve a codificar usando un códec con pérdida, destruyendo así el mensaje oculto.

Esto representa una limitación importante para quienes deseen aplicar técnicas de esteganografía robusta directamente en vídeos comprimidos. Para acceder a los coeficientes transformados, sería necesario modificar el código fuente de FFmpeg o utilizar librerías específicas escritas en C/C++ que interactúen con los decodificadores internos de los códecs, lo cual escapa del alcance de este libro.

En conclusión, mientras no existan herramientas en Python que permitan manipular directamente los coeficientes DCT o MDCT en flujos comprimidos con pérdida, las técnicas esteganográficas robustas en vídeo deberán aplicarse sobre medios sin pérdida, o bien desarrollarse en lenguajes y entornos más cercanos al nivel de codificación del códec. Esta es una línea de investigación abierta y relevante para el futuro del análisis y la ocultación de información en contenidos audiovisuales comprimidos.




