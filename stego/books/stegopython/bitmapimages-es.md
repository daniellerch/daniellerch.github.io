---
layout: page
title: "Esteganografía para programadores Python"
subtitle: "Esteganografía en imágenes raster sin pérdida" 
noindex: false
meta-title: "Esteganografía para programadores Python: Esteganografía en imágenes raster sin pérdida"
meta-description: "Capítulo 'Esteganografía en imágenes raster sin pérdida' del libro 'Esteganografía para programadores Python'"
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
2. [Incrustación de datos en la imagen](#incrustación-de-datos-en-la-imagen)
    1. [Introducción](#incrustación-de-datos-en-la-imagen)
    2. [LSB matching](#lsb-matching)
    3. [matrix-embedding](#matrix-embedding)
3. [Incrustación adaptativa](#incrustación-adaptativa)
    1. [Introducción](#incrustación-adaptativa)
    2. [Cálculo de costes](#cálculo-de-costes)
    3. [Syndrome Trellis Codes](#syndrome-trellis-codes)
<br>



<br>
## Introducción

Las imágenes digitales pueden clasificarse en dos grandes categorías: imágenes *raster* y gráficos vectoriales. En este capítulo nos centraremos en las imágenes *raster* sin pérdida, aquellas que almacenan la información de cada píxel sin sufrir degradación durante la compresión o el guardado. 

Las imágenes *raster*, también conocidas como imágenes de mapa de bits, están compuestas por una matriz de píxeles organizados en filas y columnas. Cada píxel contiene información de color y brillo, lo que permite representar imágenes detalladas con una gran variedad de tonos y matices. Este tipo de imágenes es el más común en fotografía digital, diseño gráfico y almacenamiento de imágenes en medios electrónicos.

Los formatos de imagen pueden utilizar compresión con pérdida o compresión sin pérdida para reducir su tamaño en disco. La compresión con pérdida elimina detalles de la imagen de forma irreversible para reducir su tamaño. En contraste, la compresión sin pérdida permite reducir el tamaño del archivo sin alterar la calidad de la imagen, asegurando que pueda restaurarse exactamente como el original. En este capítulo, nos centraremos en los formatos *raster* sin pérdida.

Entre los formatos de imagen *raster* sin pérdida más utilizados se encuentran PNG (*Portable Network Graphics*), un formato ampliamente usado en la web y en diseño gráfico que permite transparencia y compresión sin pérdida; TIFF (*Tagged Image File Format*), popular en fotografía y escaneo profesional, que admite múltiples capas y almacenamiento sin compresión; BMP (*Bitmap Image File*), un formato sin compresión utilizado principalmente en entornos Windows; y los formatos PPM, PGM y PBM (*Portable Pixmap Formats*), empleados en entornos Unix para el procesamiento de imágenes. Estos formatos son ideales para la esteganografía, ya que cualquier modificación en los píxeles se mantiene intacta tras el guardado, evitando la degradación de la información oculta.

Un formato de imagen importante que no se incluye en este capítulo es el formato JPEG (*Joint Photographic Experts Group*). Este formato es el más extendido en fotografía digital y utiliza compresión con pérdida. Dicha compresión introduce modificaciones en los datos de la imagen, lo que puede destruir información oculta. Esto hace más complejo su uso en esteganografía. Por esta razón, trataremos la esteganografía JPEG en un capítulo aparte. 

Otro formato excluido es GIF (*Graphics Interchange Format*), que aunque permite compresión sin pérdida en imágenes de 256 colores, su paleta reducida y el uso de compresión basada en patrones limitan su aplicabilidad en esteganografía. Asimismo, los formatos vectoriales como SVG, AI, EPS y PDF no almacenan información en píxeles, sino como ecuaciones matemáticas, lo que los hace inadecuados para los métodos esteganográficos tradicionales basados en la manipulación de píxeles.

El uso de imágenes *raster* sin pérdida en esteganografía proporciona un entorno confiable para ocultar información. Al no sufrir alteraciones por compresión con pérdida, los datos insertados permanecen intactos y pueden recuperarse con precisión. En los siguientes apartados, exploraremos diversas técnicas para la inserción de información en estos formatos.

<br>
## Incrustación de datos en la imagen

### Introducción

Las imágenes *raster* están compuestas por una matriz de píxeles, donde cada píxel representa un punto de color dentro de la imagen. A diferencia de los gráficos vectoriales, que utilizan ecuaciones matemáticas para describir formas y colores, las imágenes *raster* almacenan la información de cada píxel de manera individual. 

Cada píxel de una imagen digital suele estar representado por un conjunto de valores numéricos que indican su color o intensidad. Existen tres representaciones comunes en imágenes *raster*: imágenes en escala de grises, imágenes en color RGB y aquellas que incluyen un canal alfa para la transparencia.

Las imágenes en **escala de grises** contienen un solo valor por píxel que representa la intensidad de luz, variando entre el negro y el blanco. En imágenes con una profundidad de 8 bits, cada píxel tiene un valor entre 0 y 255, donde 0 representa el negro absoluto, 255 el blanco absoluto, y los valores intermedios corresponden a diferentes tonos de gris. Algunos formatos como PNG, TIFF y BMP pueden almacenar imágenes en escala de grises con una profundidad mayor, como 16 bits por píxel, lo que permite una representación más precisa de las tonalidades.

Veamos a continuación un ejemplo en Python, en el que leemos el valor del píxel en la posición $(50,30)$ y, a continuación, lo modificamos.

```python
import imageio.v3 as iio

img = iio.imread("grayscale.png")
height, width = img.shape

x, y = 50, 30
pixel = img[y, x]  # read
img[y, x] = 128    # write

iio.imwrite("grayscale_modified.png", img)
```

Las imágenes en **color** utilizan el modelo RGB (*Red, Green, Blue*), donde cada píxel se representa mediante tres valores enteros que indican la intensidad de los colores rojo, verde y azul. En una imagen de 8 bits por canal, cada componente puede tener un valor entre 0 y 255, donde 0 representa la ausencia total de color y 255 su máxima intensidad. Un píxel con el valor $(255,0,0)$ representa un color rojo puro, mientras que un píxel $(0,255,0)$ es verde, y $(0,0,255)$ es azul. La combinación de estos tres valores permite representar una amplia gama de colores.

```python
import imageio.v3 as iio

img = iio.imread("rgb.png")
height, width, channels = img.shape

x, y = 50, 30
pixel = img[y, x]           # read
img[y, x] = [255, 0, 0]     # write

iio.imwrite("rgb_modified.png", img)
```

Algunos formatos de imagen incluyen un cuarto canal llamado canal alfa, que controla la transparencia de cada píxel. Este modelo, conocido como **RGBA** (*Red, Green, Blue, Alpha*), añade un valor adicional que indica el nivel de opacidad del píxel. Un valor de 255 en el canal alfa significa que el píxel es completamente opaco, mientras que un valor de 0 lo hace completamente transparente. Este canal es particularmente útil en imágenes con fondos semitransparentes o en composiciones gráficas.

```python
import imageio.v3 as iio

img = iio.imread("rgba.png")
height, width, channels = img.shape

x, y = 50, 30
pixel = img[y, x]               # read
img[y, x] = [255, 0, 0, 128]    # write

iio.imwrite("rgba_modified.png", img)
```

En estos ejemplos, las imágenes se cargan como arreglos de `numpy`, donde cada píxel es representado como un solo valor en escala de grises, un vector de tres valores en RGB o un vector de cuatro valores en RGBA. La indexación de los píxeles sigue el formato `img[y, x]`, donde `x` es la coordenada horizontal y `y` la coordenada vertical. Esto permite acceder directamente a cualquier píxel y modificar sus valores.

El acceso a los píxeles es fundamental en esteganografía, ya que permite alterar los valores individuales de la imagen para ocultar información sin afectar su apariencia visual. En los siguientes apartados, exploraremos técnicas específicas para incrustar datos dentro de imágenes utilizando modificaciones en los píxeles.

<br>
### LSB *matching*

En el apartado [Técnicas de incrustación: Incrustación de bits en el LSB](/stego/books/stegopython/embed-es/#incrustación-de-bits-en-el-lsb), se ha explicado el método de *LSB matching* como una técnica para modificar los bits menos significativos de un conjunto de valores con el fin de ocultar información. En este apartado, aplicaremos este método para incrustar datos dentro de una imagen en color utilizando el modelo RGB.

En una imagen RGB, cada píxel está compuesto por tres valores enteros correspondientes a los canales de color rojo, verde y azul. Cada uno de estos valores se almacena típicamente con una profundidad de 8 bits, lo que significa que cada canal puede tomar valores entre 0 y 255. La técnica de *LSB matching* se basa en modificar el bit menos significativo de estos valores para codificar la información deseada. Si el bit menos significativo de un canal de color no coincide con el bit que queremos incrustar, se suma o resta una unidad de forma aleatoria.

El siguiente código en Python muestra cómo implementar *LSB matching* para ocultar un mensaje dentro de una imagen en color.

Primero convertimos el mensaje en una secuencia de bits utilizando su representación en código binario. Luego, iteramos sobre los píxeles de la imagen y modificamos aleatoriamente el bit menos significativo de uno de sus canales de color para almacenar cada bit del mensaje. 

Nótese que la función `lsb_matching` nunca realiza operaciones de suma $+1$ sobre píxeles con valor $255$, ni operaciones de resta $-1$ sobre píxeles con valor $0$. Esto se debe a que el valor de cada píxel está almacenado en un byte, por lo que estas operaciones provocarían un *overflow*: sumar $1$ a un píxel con valor $255$ resultaría en un valor de $0$, mientras que restar $1$ a un píxel con valor $0$ produciría un valor de $255$. Estos cambios abruptos serían fácilmente detectables y, en algunos casos, incluso perceptibles visualmente.

```python
import imageio.v3 as iio
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

def embed_lsb_matching(img, message):
    shape = img.shape
    flat_pixels = img.flatten()
    message_bits = ''.join(format(ord(c), '08b') for c in message)

    if len(message_bits) > len(flat_pixels):
        raise ValueError("Message too long")

    for i, bit in enumerate(message_bits):
        flat_pixels[i] = lsb_matching(flat_pixels[i], int(bit))

    return flat_pixels.reshape(shape)

img = iio.imread("image.png")
message = "Hidden text"
stego_img = embed_lsb_matching(img, message)
iio.imwrite("stego_image.png", stego_img)
```

**Extracción del mensaje oculto**

Para recuperar el mensaje incrustado en la imagen, es necesario recorrer los píxeles en el mismo orden en que se realizó la incrustación y extraer el bit menos significativo del canal correspondiente. Luego, estos bits se agrupan en bloques de 8 para reconstruir los caracteres del mensaje original en código ASCII. El proceso finalizará cuando hayamos extraído todo el mensaje. Sin embargo, no hemos implementado ningún mecanismo para saber cuándo el mensaje ha sido extraído al completo, por lo que en el ejemplo hemos extraído $88$ bits, que es justo lo que necesitamos. Existen diferentes técnicas para lidiar con este problema, como por ejemplo introducir una cabecera al principio que nos diga la longitud del mensaje, o incrustar una marca de fin de mensaje. Lidiaremos con estos problemas más adelante.

El siguiente código en Python muestra cómo extraer el mensaje de una imagen modificada con *LSB matching* usando el código de incrustación anterior:

```python
import imageio.v3 as iio

def extract_lsb_matching(img, msglen):
    flat_pixels = img.flatten()
    bits = []
    for pixel in flat_pixels:
        bits.append(str(pixel % 2))
        if len(bits) % 8 == 0 and len(bits) >= msglen:
            break

    message_bits = ''.join(bits[:-8])
    message = ''.join(
        chr(int(message_bits[i:i+8], 2)) 
        for i in range(0, len(message_bits), 8)
    )
    return message

stego_img = iio.imread("stego_image.png")
extracted_message = extract_lsb_matching(stego_img, 88)
print(extracted_message)
```

En este código, recorremos los píxeles de la imagen extraída y recuperamos los bits ocultos en cada píxel. Finalmente, reconstruimos el mensaje original convirtiendo los grupos de 8 bits en caracteres ASCII.

<br>
### *Matrix embedding*

En el apartado sobre *matrix embedding*, se ha explicado este método como una técnica para incrustar más información con menos modificaciones. En este apartado, aplicaremos este método para incrustar datos dentro de una imagen en color utilizando el modelo RGB.

A continuación se presenta un ejemplo en Python que usa *matrix embedding* en una imagen. El código que se muestra usa las funciones de *matrix embedding* presentadas en el apartado indicado, así como la función de LSB *matching* presentada en el apartado anterior. 

Inicialmente, se calcula la representación binaria del texto que se quiere ocultar, almacenándolo en la variable `message_bits`. Se usa un código con $p=3$, por lo que en cada bloque de $2^p-1$ bits se incrustan $3$ bits de mensaje. Necesitamos, pues, que el mensaje tenga una longitud múltiple de $3$, por lo que añadimos ceros al final de la variable para cumplir este requisito (*padding*). A continuación se recorren los píxeles, bloque a bloque, calculando qué bit se tiene que modificar de cada bloque para que queden ocultos los $3$ bits de mensaje correspondientes. Una vez realizadas las modificaciones, se guardan como una nueva imagen *stego*.

```python
import imageio.v3 as iio
import numpy as np
import random

P = 3
BLOCK_LEN = 2**P - 1
M = np.array([
    [0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1]
])

def lsb_matching(value, bit, mx=255, mn=0):
    if value % 2 == bit:
        return value
    if value == 255:
        s = -1
    elif value == 0:
        s = +1
    else:
        s = random.choice([-1, 1])
    return value + s

def ME_embed(M, c, m):
    s = c.copy()
    col_to_find = (np.dot(M, c) - m) % 2
    for position, v in enumerate(M.T):
        if np.array_equal(v, col_to_find):
            s[position] = (s[position] + 1) % 2
            break
    return s

def embed(img, message):
    shape = img.shape
    flat_pixels = img.flatten()

    message_bits = [
        int(bit) for byte in message.encode() for bit in format(byte, '08b')
    ]
    padding = (-len(message_bits)) % P
    message_bits += [0] * padding
    message_bits = np.array(message_bits)

    if len(message_bits) > len(flat_pixels):
        raise ValueError("Message too long")

    num_blocks = len(message_bits) // 3

    j = 0
    for i in range(0, num_blocks * BLOCK_LEN, BLOCK_LEN):
        c = flat_pixels[i:i+BLOCK_LEN] % 2
        m = message_bits[j:j+P]
        s = ME_embed(M, c, m)
        dif_idx = np.flatnonzero(c != s)
        if dif_idx.size > 0:
            flat_pixels[i+dif_idx] = lsb_matching(flat_pixels[i+dif_idx], s[dif_idx])
        j += P

    return flat_pixels.reshape(shape)

img = iio.imread("image.png")
message = "Hidden text"
stego_img = embed(img, message)
iio.imwrite("stego_image.png", stego_img)
```

Para extraer el mensaje, tenemos que realizar justo la operación inversa. Igual que en el apartado anterior, no hemos establecido un mecanismo para saber cuándo el mensaje ha sido extraído al completo, por lo que en el ejemplo sacamos directamente los $88$ bits que sabemos que tiene el mensaje. Sin embargo, como también se comentó en el apartado anterior, la forma correcta de hacerlo sería usando una cabecera al principio que nos diga la longitud del mensaje, o incrustar una marca de fin de mensaje. 

Así, el primer paso será convertir la longitud que sabemos que tiene el mensaje en un múltiplo de $3$, puesto que estamos usando $p=3$. A continuación, tendremos que recorrer los píxeles, de bloque en bloque, extrayendo los $3$ bits correspondientes a cada bloque y guardándolos en `message_bits`, para, finalmente, agruparlos y recuperar la codificación original. 

```python
import imageio.v3 as iio
import numpy as np

P = 3
BLOCK_LEN = 2**P - 1
M = np.array([
    [0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1]
])

def ME_extract(M, s):
    return np.dot(M, s) % 2

def extract_lsb_matching(img, msglen):
    flat_pixels = img.flatten()
    l = msglen + (-msglen) % P
    num_blocks = (l // 3)

    message_bits = []
    for i in range(0, num_blocks * BLOCK_LEN, BLOCK_LEN):
        s = flat_pixels[i:i+BLOCK_LEN] % 2
        m = ME_extract(M, s)
        message_bits.extend(m.tolist())

    message_bits = ''.join(map(str, message_bits))
    message = ''.join(
        chr(int(message_bits[i:i+8], 2))
        for i in range(0, len(message_bits), 8)
    )
    return message

stego_img = iio.imread("stego_image.png")
extracted_message = extract_lsb_matching(stego_img, 88)
print(extracted_message)
```

Llegados a este punto puede ser interesante realizar algunos cálculos para ver la ventaja que nos ofrece ocultar información usando *matrix embedding* sobre el LSB *matching* tradicional. En la tabla del apartado [Técnicas de incrustación: Incrustar más bits con menos modificaciones](/stego/books/stegopython/embed-es/#incrustar-más-bits-con-menos-modificaciones) ya se ha mostrado cómo evolucionan el *payload* relativo y la eficiencia en función de $p$, por lo que podemos usar esos valores para realizar los cálculos.

Por ejemplo, supongamos que incrustamos información en una imagen de $512\times512$ en color. Puesto que incrustamos un bit en cada píxel y hay tres canales de color (R, G y B), usando LSB *matching* podríamos incrustar $512 \times 512 \times 3 = 786432$ bits. Pero esto alteraría mucho la imagen, así que vamos a suponer que solo incrustamos información en un $10\%$ de los píxeles. Esto nos daría una capacidad de $78643$ bits. Al usar LSB *matching*, la mitad de los píxeles ya tendrá un LSB que coincidirá con el del mensaje, por lo que, aproximadamente, tendremos que modificar $39322$ píxeles. 

Para almacenar una cantidad similar de información podemos usar *matrix embedding* con $p=6$. Con $p=6$ el *payload* relativo es aproximadamente $0{.}0952$. Lo que significa que nos permite ocultar aproximadamente $786432 \times 0{.}0952 = 74868$ bits. Para ello, únicamente tendremos que modificar unos $786432/(2^6-1) = 12483$ bits. Como se puede ver, la cantidad de bits modificados es sustancialmente inferior, puesto que hemos pasado de $39322$ a $12483$ bits. Además, esta mejora es cada vez más significativa a medida que se reduce el tamaño del mensaje que queremos ocultar.

<br>
## Incrustación adaptativa

### Introducción

En el apartado anterior, hemos visto cómo incrustar información utilizando *LSB matching* y cómo esta técnica puede mejorarse mediante *matrix embedding*. Esta última permite ocultar una cantidad similar de información realizando significativamente menos modificaciones, lo que representa un primer paso hacia un sistema más difícil de detectar. El siguiente paso consiste en optimizar la selección de las zonas de la imagen donde se incrusta la información, evitando aquellas en las que su presencia resultaría más sospechosa.

Consideremos, por ejemplo, la imagen de la **figura 1**.

![Árbol](/stego/books/stegopython/images/tree.png)
<center>
Figura 1. Árbol
</center>

En ella, existen zonas uniformes como el cielo y zonas más complejas, como las hojas del árbol. Veamos ahora, en la **figura 2**, un trozo de cielo de $32 \times 32$ píxeles.

<center>
<img style='width:200px' src='/stego/books/stegopython/images/tree_sky.png'/>
<br><br>
Figura 2. Trozo de $32 \times 32$ píxeles de cielo
</center>

En él podemos ver que todos los píxeles son de un color muy similar. Sin embargo, un trozo de $32 \times 32$ píxeles de la zona en la que se encuentran las hojas del árbol (**figura 3**) tiene una combinación de intensidades mucho más compleja.

<center>
<img style='width:200px' src='/stego/books/stegopython/images/tree_leaves.png'/>
<br><br>
Figura 3. Trozo de $32 \times 32$ píxeles de hojas
</center>

Esto resulta incluso más evidente cuando se ven los valores de los píxeles para esas zonas. En el caso del cielo, podemos ver los siguientes píxeles:

```python
>>> import imageio.v3 as iio
>>> I = iio.imread("tree_sky.png")
>>> I[:10, :10, 0]
array([[39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [39, 39, 39, 38, 38, 39, 39, 39, 40, 40],
       [41, 41, 40, 45, 44, 42, 41, 40, 40, 40],
       [42, 42, 42, 44, 43, 42, 41, 40, 40, 40],
       [43, 43, 42, 44, 43, 42, 40, 40, 39, 40],
       [42, 42, 41, 43, 42, 41, 40, 39, 39, 40]], 
       dtype=uint8)
```

Tal y como se puede ver, hay una gran cantidad de píxeles iguales. Alterarlos va a producir zonas con valores muy similares con diferencias pequeñas (normalmente $\pm 1$), lo que va a resultar sospechoso. 

Por otra parte, el trozo correspondiente a las hojas no dispone de un patrón aparente, por lo que resulta mucho más difícil detectar una modificación:

```python
>>> import imageio.v3 as iio
>>> I = iio.imread("tree_leaves.png")
>>> I[:10, :10, 0]
array([[131, 145, 134, 145, 146, 135, 128, 119,  90, 119],
       [234, 209,  98, 151, 155, 128,  95, 117, 109, 108],
       [225, 172, 115, 123, 132, 118, 108, 104, 108, 106],
       [179, 147, 139, 132, 112, 112,  97,  95, 109, 112],
       [144, 131, 151, 132, 114, 116,  98,  92, 106, 110],
       [135, 131, 138, 113, 127, 118, 110, 102, 101, 100],
       [120, 124, 119,  92, 107,  99, 110, 110,  98,  95],
       [107, 112, 116, 102,  86,  85, 101, 107,  98,  99],
       [134, 119, 121, 151, 132, 116, 107,  97,  96, 100],
       [180, 140, 125, 198, 207, 164, 123,  92,  92,  96]], 
       dtype=uint8)
```

Por este motivo, seleccionar aquellos píxeles más apropiados para ocultar información y evitar aquellos que no lo son, es una de las técnicas que permite una mejora más significativa en la indetectabilidad de los métodos de esteganografía. 

El desarrollo de los STC (*Syndrome Trellis Codes*) [[Filler:2011:stc](/stego/books/stegopython/references-es/#filler2011stc)], presentado en el apartado [Técnicas de incrustación: Cómo evitar zonas detectables](/stego/books/stegopython/embed-es/#cómo-evitar-zonas-detectables), marcó el inicio de una nueva forma de hacer esteganografía. Los STC permiten dividir la creación de un método esteganográfico en dos fases: la primera, destinada a calcular el coste de inserción en cada píxel, y la segunda, enfocada en incrustar el mensaje minimizando el coste total. 

En la primera fase, el objetivo es desarrollar un criterio que evalúe la facilidad con la que se podría detectar una modificación en un determinado píxel, asignándole así un coste proporcional. La segunda fase, por su parte, se encarga de incrustar el mensaje de manera que la suma de los costes de los píxeles modificados sea la menor posible.

Dado que los STC resuelven la segunda fase, la creación de un nuevo método esteganográfico basado en esta metodología se reduce exclusivamente a diseñar una función adecuada para calcular el coste de inserción en cada píxel.

<br>
### Cálculo de costes

La mayoría de los métodos para calcular costes en esteganografía son de naturaleza experimental y carecen de una base matemática sólida que indique de manera precisa qué píxeles pueden modificarse con menor riesgo de detección. Debido a esta limitación, el enfoque más común consiste en probar distintas técnicas y validarlas mediante estegoanálisis, comparándolas con otros métodos. Si el estegoanálisis tiene un peor desempeño al detectar nuestra nueva función de costes en comparación con las existentes, podríamos considerar que es más efectiva.

Sin embargo, este proceso es delicado, ya que los resultados experimentales dependen en gran medida del conjunto de imágenes utilizado. Si no disponemos de una base de datos suficientemente amplia y diversa, los resultados podrían no ser representativos, lo que llevaría al desarrollo de funciones de coste que solo funcionan bien dentro de un conjunto de imágenes específico.

Este es un problema complejo que escapa al alcance de este libro. No obstante, exploraremos cómo construir una función de coste de manera progresiva utilizando filtros, un enfoque ampliamente adoptado en la disciplina.

Un *filtro* es una función matemática que se aplica a una imagen para resaltar o atenuar ciertas características de sus píxeles. En el contexto del cálculo de costes en esteganografía, los filtros se utilizan para analizar la estructura local de la imagen y determinar qué regiones son más adecuadas para la inserción de información sin que las modificaciones resulten fácilmente detectables.

Los filtros pueden diseñarse para capturar distintos aspectos de la imagen, como la presencia de bordes, texturas o variaciones de intensidad. Por ejemplo, un filtro basado en diferencias de intensidad puede ayudar a identificar zonas homogéneas, donde una modificación podría ser más perceptible, y diferenciarlas de áreas con alta variabilidad, donde las alteraciones resultan menos evidentes.

Existen diversos filtros utilizados en el procesamiento de imágenes para detectar estructuras y patrones específicos. Entre ellos, los **filtros de detección de bordes**, como el de Sobel, permiten identificar transiciones bruscas en la imagen, resaltando estructuras alineadas con ejes específicos. Por otro lado, los **filtros de realce de textura**, como el Laplaciano o aquellos basados en el análisis de frecuencias espaciales, destacan variaciones locales en la textura, facilitando la identificación de patrones en la imagen.

Desde una perspectiva matemática, un filtro suele representarse como una operación de convolución entre la imagen y una máscara (o *kernel*). La máscara define la transformación aplicada a cada píxel en función de sus vecinos. Por ejemplo, en Python podría hacerse de la forma siguiente (para un filtro Sobel):

```python
import numpy as np
import imageio.v3 as iio
from scipy.signal import convolve2d

def apply_filter(image, kernel):
    return convolve2d(image, kernel, mode='same', 
                      boundary='fill', fillvalue=0)

image = iio.imread("tree.png", mode="L")  

sobel_x = np.array([[-1, 0, 1], 
                    [-2, 0, 2], 
                    [-1, 0, 1]])

edges_x = apply_filter(image, sobel_x)
edges_x = np.clip(edges_x, 0, 255).astype(np.uint8)
iio.imwrite("tree_sobel_x.png", edges_x)
```

Sin embargo, muchas librerías de procesamiento de imágenes ya incluyen estos filtros ya implementados, por lo que lo más común es utilizarlas directamente en lugar de programarlos desde cero.

Basándonos en lo estudiado en el apartado anterior, queda claro que debemos evitar las zonas homogéneas, como el cielo, y centrarnos en las regiones más complejas, como las hojas.  La **figura 4** muestra el resultado de aplicar el filtro Sobel que hemos implementado en Python sobre la imagen de la **figura 1**.

![Árbol con filtro Sobel horizontal](/stego/books/stegopython/images/tree_sobel_x.png)
<center>
Figura 4. Árbol con filtro Sobel horizontal
</center>

Es un filtro sencillo que nos está dando buenos resultados, puesto que diferencia claramente entre las zonas complejas (el árbol) y las zonas simples y planas (principalmente el cielo). Sin embargo, tenemos píxeles negros (valores cercanos a cero) en las zonas simples, y píxeles claros (valores cercanos a 255) en las zonas complejas. Puesto que queremos una función que nos indique el coste de modificar un píxel, necesitaremos que las zonas planas tengan costes altos y las zonas complejas costes bajos, justo lo contrario. Por ello, nos conviene invertir sus valores. Nos bastaría con calcular `1/edges_x`, pero como queremos convertirlo en una imagen para ver cómo se aplican los costes, tendremos que normalizarlo entre 0 y 255, para obtener un valor válido en bytes.

```python
import numpy as np
import imageio.v3 as iio
from scipy.signal import convolve2d

def apply_filter(image, kernel):
    return convolve2d(image, kernel, mode='same', 
                      boundary='fill', fillvalue=0)

image = iio.imread("tree.png", mode="L")  

sobel_x = np.array([[-1, 0, 1], 
                    [-2, 0, 2], 
                    [-1, 0, 1]])

edges_x = apply_filter(image, sobel_x)
edges_x = np.clip(edges_x, 0, 255).astype(np.uint8)

cost = 1 / edges_x
max_finite = np.max(cost[np.isfinite(cost)])
cost = np.nan_to_num(cost, nan=0, posinf=max_finite, neginf=0)

cost_min, cost_max = cost.min(), cost.max()
cost = np.nan_to_num(cost, nan=0, posinf=cost.max(), neginf=0)

cost_norm = 255 * (cost - cost_min) / (cost_max - cost_min)
cost_norm = cost_norm.astype(np.uint8)

iio.imwrite("tree_sobel_cost.png", cost_norm)
```

De este modo, obtenemos una función de coste como la que se muestra en la **figura 5**. En ella, se observa que ciertas áreas del cielo presentan un coste máximo (255), mientras que las regiones con mayor complejidad tienen valores de coste más bajos (próximos a 0). Esto confirma que la función de coste cumple su propósito: favorecer la incrustación de información en las zonas más complejas de la imagen.

![Costes para la imagen Árbol](/stego/books/stegopython/images/tree_sobel_cost_white.png)
<center>
Figura 5. Costes para la imagen Árbol
</center>

Si bien esta función de coste es útil desde un punto de vista didáctico, las utilizadas en aplicaciones reales suelen ser más complejas. Estas combinan múltiples filtros con diversas estrategias adicionales. Un ejemplo destacado es la función de coste HILL [[Li:2014:hill](/stego/books/stegopython/references-es/#li2014hill)], que integra varios filtros en su formulación. 

Se recomienda al lector consultar el artículo original, ya que proporciona una visión detallada del proceso experimental utilizado para seleccionar la combinación óptima de filtros. Aunque no entraremos en los detalles teóricos del funcionamiento de HILL, sí presentaremos una implementación en Python.

Al igual que en el caso anterior, normalizaremos los valores en el rango de 0 a 255 para poder representar gráficamente el resultado.

```python
import numpy as np
import imageio.v3 as iio
from scipy.signal import convolve2d

def HILL(I):
    HF1 = np.array([
        [-1,  2, -1],
        [ 2, -4,  2],
        [-1,  2, -1]
    ])
    H2 = np.ones((3, 3)).astype(np.float32) / 3**2
    HW = np.ones((15, 15)).astype(np.float32) / 15**2

    R1 = convolve2d(I, HF1, mode='same', boundary='symm')
    W1 = convolve2d(np.abs(R1), H2, mode='same', boundary='symm')
    rho = 1.0 / (W1 + 1e-10)
    cost = convolve2d(rho, HW, mode='same', boundary='symm')
    return cost

image = iio.imread("tree.png", mode="L")

cost = HILL(image)
cost = np.nan_to_num(cost, nan=0, posinf=image.max(), neginf=0)

cost_min, cost_max = cost.min(), cost.max()
cost = np.nan_to_num(cost, nan=0, posinf=cost.max(), neginf=0)

cost_norm = 255 * (cost - cost_min) / (cost_max - cost_min)
cost_norm = cost_norm.astype(np.uint8)

iio.imwrite("tree_hill_cost.png", cost_norm)
```

La **figura 6** muestra el resultado de aplicar la función de costes de HILL. Como se puede observar, este método identifica claramente el área del árbol como una región adecuada para ocultar información, mientras que en el cielo detecta múltiples zonas con alta sensibilidad a modificaciones, lo que indica que no es recomendable alterarlas.

![Costes HILL para la imagen Árbol](/stego/books/stegopython/images/tree_hill_cost.png)
<center>
Figura 6. Costes HILL para la imagen Árbol
</center>

<br>
### *Syndrome Trellis Codes*

En el apartado [Técnicas de incrustación: Cómo evitar zonas detectables](/stego/books/stegopython/embed-es/#cómo-evitar-zonas-detectables) hemos visto cómo funcionan los *Syndrome Trellis Codes* y cómo usarlos a través de la librería pySTC. Por lo tanto, aplicarlos a las imágenes es bastante directo. Basta con calcular los costes y llamar directamente a la librería para ocultar el mensaje.

A continuación se muestra un ejemplo en Python usando la función de coste HILL [[Li:2014:hill](/stego/books/stegopython/references-es/#li2014hill)] que hemos visto en el apartado anterior.

En el ejemplo vemos cómo calculamos el coste con HILL y ocultamos el mensaje `Hello World` en la imagen. 

```python
import numpy as np
import imageio.v3 as iio
from scipy.signal import convolve2d
import pystc

def HILL(I):
    HF1 = np.array([
        [-1,  2, -1],
        [ 2, -4,  2],
        [-1,  2, -1]
    ])
    H2 = np.ones((3, 3)).astype(np.float32) / 3**2
    HW = np.ones((15, 15)).astype(np.float32) / 15**2

    R1 = convolve2d(I, HF1, mode='same', boundary='symm')
    W1 = convolve2d(np.abs(R1), H2, mode='same', boundary='symm')
    rho = 1.0 / (W1 + 1e-10)
    cost = convolve2d(rho, HW, mode='same', boundary='symm')
    return cost

image = iio.imread("tree.png", mode="L")

costs = HILL(image)

seed = 32  # secret seed
message = "Hello World".encode()
stego = pystc.hide(message, image, costs, costs, seed, mx=255, mn=0)

iio.imwrite("tree_stego.png", stego)
```

A continuación vemos cómo extraer el mensaje.

```python
import pystc
import imageio.v3 as iio

stego = iio.imread("tree_stego.png", mode="L")

seed = 32  # secret seed
message_extracted = pystc.unhide(stego, seed).decode()
```

```python
>>> message_extracted
'Hello World'
```

Cabe destacar que la función HILL que hemos desarrollado opera sobre un único canal. Esto no representa un inconveniente en nuestro ejemplo, ya que estamos trabajando con una imagen en escala de grises, que contiene solo un canal. Sin embargo, para procesar imágenes en color, podríamos aplicar HILL de manera independiente en cada uno de los canales. Otra alternativa sería diseñar una función específica para el cálculo de costes en imágenes a color, que opere directamente sobre los tres canales simultáneamente.



