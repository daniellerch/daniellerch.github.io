---
layout: page
title: "Herramientas de esteganografía"
subtitle: "" 
noindex: false
meta-title: "Herramientas esteganografía"
meta-description: "Listado de herramientas esteganografía"
meta-keywords: "esteganografía, herramientas"
lang-suffix: "-es"
---


> Aquí se proporciona un listado de herramientas de esteganografía. Antes 
> de empezar puede ser recomendable leer algunas
> [notas sobre esta lista](#notas-sobre-esta-lista).




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



## Esteganografía en imágenes
- [F5](#f5) <small>[ JPG ]</small>
- [HStego](#hstego) <small>[ PNG, JPG ]</small>
- [JPHS](#jphs) <small>[ JPG ]</small>
- [JSteg](#jsteg) <small>[ JPG ]</small>
- [OpenPuff](#openpuff) <small>[ BMP, JPG, PCX, PNG, TGA ]</small>
- [OpenStego](#openstego) <small>[ PNG ]</small>
- [Outguess](#outguess) <small>[ JPG ]</small>
- [SilentEye](#silenteye) <small>[ BMP, JPG ]</small>
- [StegHide](#steghide) <small>[ BMP, JPG ]</small> 
- [SSuite Picsel](#ssuite-picsel) <------
- [ImageHide](#imagehide) XXX
- [QuickStego](#quickstego) XXX
- [S-Tools](#s-tools) XXX
- [WBStego4](#wbstego4) XXX 
- [JPHS](#jphs) <small>[ JPG ]</small> XXX
- [JSteg](#jsteg) <small>[ JPG ]</small> XXX
- [Xiao Steganography](#xiao-steganography) XXX https://xiao-steganography.en.uptodown.com/windows
- [YASS](#yass) XXX



### Esteganografía en audio   
- [OpenPuff](#openpuff) <small>[ AIFF, MP3, NEXT/SUN, WAV ]</small>
- [SilentEye](#silenteye) <small>[ WAV ]</small> 
- [StegHide](#steghide) <small>[ WAV, AU ]</small> <------
- [MP3Stego](#mp3stego) <small>[ MP3 ]</small> XXX https://www.petitcolas.net/steganography/mp3stego/
- [MP3 Steganography Lib](#mp3-steganography-lib) <small>[ MP3 ]</small> XXX https://github.com/tomershay100/mp3-steganography-lib
- [DeepSound](#deepsound) <small>[ WAV, FLAC, WMA, APE ]</small> XXX https://jpinsoft.net/deepsound/overview.aspx
- [HiddenWave](#hiddenwave) <small>[ WAV ]</small> XXX https://github.com/techchipnet/HiddenWave
- [Stegonaut](#stegonaut) <small>[ MP3 ] XXX https://github.com/knez/stegonaut</small>



### Esteganografía en video
- [OpenPuff](#openpuff) [ 3GP, MP4, MPG, VOB ]



### Esteganografía en protocolos de red
- [xxx](#xxx)



## Esteganografía concatenando archivos
- [xxx](#xxx)



## Esteganografía en texto
- [Steg](#steg) XXX https://github.com/geezee/steg
- [ChatGPT](#chatgpt) XXX



### Esteganografía en otros medios
- [OpenPuff](#openpuff) [ FLV, SWF, PDF ]




## Notas sobre esta lista

Esta es una lista de herramientas de esteganografía que estoy recopilando. 
En ella se indica un enlace donde se puede conseguir la herramienta, una breve 
descripción y una tabla indicando los sistemas operativos en los que funciona, 
los archivos con los que trabaja y el método de incrustación de información
que usa. Este último es especialmente importante si se desea realizar 
estegoanálisis usando alguna herramienta como [Aletheia](https://github.com/daniellerch/aletheia).

Algunos datos todavía no están disponibles, normalmente porque no he 
econtrado esta información y aún no he tenido tiempo de investigar la 
herramienta.

Si conoces algunos datos de los que no se proporcionan o hay alguna herramienta 
que crees que se podría ser interesante añadir a la lista, puedes ponerte en 
contacto conmigo conmigo [aquí](/about-es).





<hr>
### F5
<!-- ((( -->

[F5](https://github.com/daniellerch/stego-collection/tree/master/F5) es una 
herramienta de esteganografía para imágenes JPEG.


|-|-|
| **Sistema Operativo** | Multiplataforma (Java) |
| **Método de inserción para imágenes JPG** | A medida |
| **Licencia** | MIT |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
java Embed  -p p4ssw0rd -e secret.txt cover.jpg stego.jpg
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
java Extract -p p4ssw0rd -e output.txt stego.jpg
```



<!-- ))) -->

<hr>
### HStego
<!-- ((( -->

[HStego](https://github.com/daniellerch/hstego) es una herramienta de 
esteganografía para imágenes, que permite ocultar información en imágenes 
PNG y JPG. 
Esta herramienta tiene como objetivo principal no ser detectada con 
herramientas modernas de estegoanálisis.


|-|-|
| **Sistema Operativo** | Windows, Linux |
| **Formatos soportados** | PNG, JPG |
| **Método de inserción en imágenes** | STC + S-UNIWARD |
| **Método de inserción en imágenes JPG** | STC + J-UNIWARD |
| **Licencia** | MIT |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
hstego.py embed secret.txt cover.png stego.png p4ssw0rd
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
hstego.py extract stego.png content.txt p4ssw0rd
```

<br>
**Interfaz gráfica:**

La herramienta HStego dispone de una interfaz gráfica que permite
ocultar y extraer información, así como incrustar y verificar el marcado.

![HStego](/stego/blog/resources/tools-hstego.png?style=centerme)



<!-- ))) -->

<hr>
### JPHS
<!-- ((( -->

[JP Hide & Seek](https://github.com/daniellerch/stego-collection/tree/master/jphs) es una 
herramienta de esteganografía para imágenes JPEG.


|-|-|
| **Sistema Operativo** | Linux |
| **Método de inserción para imágenes JPG** | ? |
| **Licencia** | GPL v2 |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
jphide cover.jpg stego.jpg secret.txt
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
jpseek stego.jpg output.txt
```



<!-- ))) -->

<hr>
### JSteg
<!-- ((( -->

[JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg) es una 
herramienta de esteganografía para imágenes JPEG.


|-|-|
| **Sistema Operativo** | Linux |
| **Método de inserción para imágenes JPG** | DCT LSB replacement (ignora valores 0 y 1) |
| **Licencia** | Licencia a medida similar a la BSD |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
cjpeg -steg secret.txt cover.pgm > stego.jpg
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
djpeg -steg output.txt stego.jpg > out.jpg
```



<!-- ))) -->

<hr>
### OpenPuff
<!-- ((( -->

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una 
herramienta de esteganografía para imágenes, que permite ocultar información 
n múltiples formatos.


|-|-|
| **Sistema Operativo** | Windows, Linux |
| **Formatos soportados para imágenes** | BMP, JPG, PCX, PNG, TGA |
| **Formatos soportados para audio** | AIFF, MP3, NEXT/SUN, WAV |
| **Formatos soportados para video** | 3GP, MP4, MPG, VOB |
| **Otros formatos soportados** | FLV, SWF, PDF |
| **Método de inserción en imágenes** | LSB replacement |
| **Método de inserción en imágenes JPEG** | Steghide? |
| **Método de inserción en video** | ? |
| **Método de inserción en otros formatos** | ? |
| **Licencia** | LGPL v3 + Código parcialmente cerrado |



<br>
**Interfaz gráfica:**

La herramienta OpenPuff dispone de una interfaz gráfica que permite
ocultar y extraer información, así como incrustar y verificar el marcado.

![OpenPuff](/stego/blog/resources/tools-openpuff.jpg?style=centerme)


<!-- ))) -->

<hr>
### OpenStego
<!-- ((( -->

[OpenStego](https://www.openstego.com) es una herramienta de esteganografía
para imágenes, que permite ocultar información tanto para la transmisión de 
mensajes secretos, como para *watermarking*.


|-|-|
| **Sistema Operativo** | Multiplataforma (Java) |
| **Formatos soportados** | PNG |
| **Método de inserción** | LSB replacement |
| **Licencia** | GPL v2 |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
java -jar openstego.jar embed -a randomlsb -mf secret.txt -cf cover.png -sf stego.png
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
java -jar openstego.jar extract -a randomlsb -sf stego.png -xd output-dir
```

<br>
**Interfaz gráfica:**

La herramienta OpenStego dispone de una interfaz gráfica que permite
ocultar y extraer información, así como incrustar y verificar el marcado.

![OpenStego](/stego/blog/resources/tools-openstego.png?style=centerme)



<!-- ))) -->

<hr>
### Outguess
<!-- ((( -->

[Outguess](https://github.com/daniellerch/stego-collection/tree/master/Outguess) es una 
herramienta de esteganografía para imágenes JPEG.


|-|-|
| **Sistema Operativo** | Linux |
| **Método de inserción para imágenes JPG** | A medida |
| **Licencia** | MIT |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
outguess -k p4ssw0rd -d secret.txt cover.jpg stego.jpg
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
outguess -k p4ssw0rd -r stego.jpg output.txt
```



<!-- ))) -->

<hr>
### SilentEye
<!-- ((( -->

[SilentEye](https://achorein.github.io/silenteye/) es una herramienta de 
esteganografía para imágenes, que permite ocultar información en imágenes
y audio.


|-|-|
| **Sistema Operativo** | Windows, MacOS X, Linux |
| **Formatos soportados** | BMP, WAV |
| **Método de inserción en imágenes** | LSB replacement |
| **Método de inserción en imágenes JPEG** | ? |
| **Método de inserción en audio** | ? |
| **Licencia** | GPL v3 |



<br>
**Interfaz gráfica:**

La herramienta SilentEye dispone de una interfaz gráfica que permite
ocultar y extraer información.

![SilentEye](/stego/blog/resources/tools-silenteye.png?style=centerme)



<!-- ))) -->

<hr>
### Steghide
<!-- ((( -->

[Steghide](https://steghide.sourceforge.net/index.php) es una herramienta de 
esteganografía que permite ocultar información en imágenes y audio.


|-|-|
| **Sistema Operativo** | Windows, Linux |
| **Formatos soportados para imágenes** | BMP, JPG |
| **Formatos soportados para audio** | WAV, AU |
| **Método de inserción para imágenes** | A medida |
| **Método de inserción para imágenes JPG** | A medida |
| **Método de inserción para audio** | A medida |
| **Licencia** | GPL v2 |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un fichero "secret.txt" en una imagen *cover* podemos usar el
siguiente comando:

```bash
steghide embed -cf cover.jpg -ef secret.txt -sf stego.jpg -p p4ssw0rd
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en una imagen *stego* podemos usar el
siguiente comando:

```bash
steghide extract -sf stego.jpg -xf output.txt -p p4ssw0rd -f
```



<!-- ))) -->













