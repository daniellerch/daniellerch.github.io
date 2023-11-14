---
layout: page
title: "Herramientas de esteganografía"
subtitle: "" 
noindex: false
meta-title: "Herramientas de esteganografía"
meta-description: "Listado de herramientas esteganografía"
meta-keywords: "esteganografía, herramientas"
lang-suffix: "-es"
comments: true
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
    .separator {
        height: 10px;
    } 
    hr {
      margin-top: 80px;
    }
</style>

<div class='menu' style='margin-top:50px'></div>



## Esteganografía en imágenes
- [CryptoStego](#cryptostego) <small>[ PNG, JPG ]</small>
- [F5](#f5) <small>[ JPG ]</small>
- [HStego](#hstego) <small>[ PNG, JPG ]</small>
- [JPHS](#jphs) <small>[ JPG ]</small>
- [JSteg](#jsteg) <small>[ JPG ]</small>
- [OpenPuff](#openpuff) <small>[ BMP, JPG, PCX, PNG, TGA ]</small>
- [OpenStego](#openstego) <small>[ PNG ]</small>
- [Outguess](#outguess) <small>[ JPG ]</small>
- [SilentEye](#silenteye) <small>[ BMP, JPG ]</small>
- [SSuite Picsel](#ssuite-picsel) <small>[ BMP, PNG, JPG ]</small>
- [StegHide](#steghide) <small>[ BMP, JPG ]</small> 
- [QuickStego](#quickstego) <small>[ BMP, GIF, JPG ]</small> 


<div class='separator'></div>
## Esteganografía en audio   
- [DeepSound](#deepsound) <small>[ FLAC, MP3, WAV, APE ]</small>
- [HiddenWave](#hiddenwave) <small>[ WAV ]</small> 
- [MP3Stego](#mp3stego) <small>[ MP3 ]</small>
- [OpenPuff](#openpuff) <small>[ AIFF, MP3, NEXT/SUN, WAV ]</small>
- [SilentEye](#silenteye) <small>[ WAV ]</small> 
- [StegHide](#steghide) <small>[ WAV, AU ]</small>


<div class='separator'></div>
## Esteganografía en video
- [OpenPuff](#openpuff) [ 3GP, MP4, MPG, VOB ]


<div class='separator'></div>
## Esteganografía en texto
- [Steg](#steg)
- [ChatGPT](#chatgpt)


<div class='separator'></div>
## Esteganografía en otros medios
- [OpenPuff](#openpuff) [ FLV, SWF, PDF ]



<!--
PENDING:
- [stegosuite](#stegosuite) <small>[ MP3 ] https://github.com/knez/stegonaut</small>
- [Stegonaut](#stegonaut) <small>[ MP3 ] https://github.com/knez/stegonaut</small>
- XXX [MP3 Steganography Lib](#mp3-steganography-lib) <small>[ MP3 ]</small> https://github.com/tomershay100/mp3-steganography-lib
## Esteganografía en protocolos de red
- ...
-->

<br>
<hr>

## Notas sobre esta lista

Esta es una lista de herramientas de esteganografía que estoy recopilando. 
En ella se indica un enlace donde se puede conseguir la herramienta, una breve 
descripción y una tabla indicando los sistemas operativos en los que funciona, 
los archivos con los que trabaja y el método de incrustación de información
que usa. Este último es especialmente importante si se desea realizar 
estegoanálisis usando alguna herramienta como [Aletheia](https://github.com/daniellerch/aletheia).

Algunos datos todavía no están disponibles, normalmente porque no he 
encontrado esta información y aún no he tenido tiempo de investigar la 
herramienta.

Si conoces algunos datos de los que no se proporcionan o hay alguna herramienta 
que crees que se podría ser interesante añadir a la lista, puedes ponerte en 
contacto conmigo [aquí](/about-es).



<hr>
## CryptoStego
<!-- ((( -->

[CryptoStego](https://stego.js.org/) es una 
herramienta de esteganografía para imágenes que se ejecuta en el navegador.


|-|-|
| **Sistema Operativo** | Multiplataforma (Navegador web) |
| **Método de inserción para imágenes** | LSB Replacement |
| **Método de inserción para imágenes JPG** | A medida |
| **Licencia** | MIT |


Dado que esta herramienta se ejecuta en el navegador, únicamente es
necesario acceder a la página y seguir las instrucciones.

![CryptoStego](/stego/intro/resources/tools-cryptostego.png?style=centerme)


<!-- ))) -->

<hr>
## ChatGPT
<!-- ((( -->

[ChatGPT](https://chat.openai.com//) es un modelo de inteligencia artificial 
desarrollado por [OpenAI](https://openai.com/) para simular conversaciones 
humanas a través de texto. 

No se trata de una herramienta de esteganografía, aunque su capacidad para
generar textos de calidad permite usarla como tal. Puede encontrarse un 
ejemplo en el artículo [Esteganografía en texto con ChatGPT](/stego/text/chatgpt-es/).



<!-- ))) -->

<hr>
## DeepSound
<!-- ((( -->

[DeepSound](https://jpinsoft.net/deepsound/overview.aspx) es una 
herramienta de esteganografía que permite ocultar información 
en archivos de sonido.


|-|-|
| **Sistema Operativo** | Windows |
| **Formatos soportados para sonido** | FLAC, MP3, WAV, APE |
| **Método de inserción en audio** | ? |
| **Licencia** | Freeware |



<br>
**Interfaz gráfica:**

La herramienta DeepSound dispone de una interfaz gráfica que permite
ocultar y extraer información.

![DeepSound](/stego/intro/resources/tools-deepsound.png?style=centerme)


<!-- ))) -->

<hr>
## F5
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
## HiddenWave
<!-- ((( -->

[HiddenWave](https://github.com/techchipnet/HiddenWave) es una 
herramienta de esteganografía para audio en archivos WAV.


|-|-|
| **Sistema Operativo** | Multiplataforma (Python) |
| **Método de inserción para audio WAV** | LSB replacement |
| **Licencia** | Dominio público / Sin licencia |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un mensaje en un audio *cover* podemos usar el
siguiente comando:

```bash
python3 HiddenWave.py -f cover.wav -m "Secret message" -o stego.wav

```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en el audio  *stego* podemos usar el
siguiente comando:

```bash
python3 ExWave.py -f stego.wav
```



<!-- ))) -->

<hr>
## HStego
<!-- ((( -->

[HStego](https://github.com/daniellerch/hstego) es una herramienta de 
esteganografía que permite ocultar información en imágenes 
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

![HStego](/stego/intro/resources/tools-hstego.png?style=centerme)



<!-- ))) -->

<hr>
## JPHS
<!-- ((( -->

[JP Hide & Seek](https://github.com/daniellerch/stego-collection/tree/master/jphs) es una 
herramienta de esteganografía para imágenes JPEG.


|-|-|
| **Sistema Operativo** | Linux |
| **Método de inserción para imágenes JPG** | DCT LSB replacement |
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
## JSteg
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
## MP3Stego
<!-- ((( -->

[MP3Stego](https://www.petitcolas.net/steganography/mp3stego/) es una 
herramienta de esteganografía que oculta información durante la compresión
de un archivo WAV a MP3.


|-|-|
| **Sistema Operativo** | Windows |
| **Método de inserción para audio MP3** | A medida |
| **Licencia** | ? |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un archivo secret.txt en un audio *cover* podemos usar el
siguiente comando:

```bash
encode -E secret.txt -P p4ssw0rd cover.wav stego.mp3

```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta en el audio  *stego* podemos usar el
siguiente comando:

```bash
decode -X -P p4ssw0rd svega_stego.mp3
```



<!-- ))) -->

<hr>
## OpenPuff
<!-- ((( -->

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una 
herramienta de esteganografía que permite ocultar información 
en múltiples formatos.


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

![OpenPuff](/stego/intro/resources/tools-openpuff.jpg?style=centerme)


<!-- ))) -->

<hr>
## OpenStego
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

![OpenStego](/stego/intro/resources/tools-openstego.png?style=centerme)



<!-- ))) -->

<hr>
## Outguess
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
## QuickStego
<!-- ((( -->

[QuickStego](http://quickcrypto.com/free-steganography-software.html) 
es una herramienta de esteganografía que permite ocultar 
información en imágenes.


|-|-|
| **Sistema Operativo** | Windows |
| **Formatos soportados** | BMP, GIF, JPG |
| **Método de inserción en imágenes** | ? |
| **Método de inserción en imágenes JPEG** | ? |
| **Licencia** | Freeware |



<br>
**Interfaz gráfica:**

La herramienta QuickStego dispone de una interfaz gráfica que permite
ocultar y extraer información.

![QuickStego](/stego/intro/resources/tools-quickstego.jpg?style=centerme)



<!-- ))) -->

<hr>
## SilentEye
<!-- ((( -->

[SilentEye](https://achorein.github.io/silenteye/) es una herramienta de 
esteganografía que permite ocultar información en imágenes
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

![SilentEye](/stego/intro/resources/tools-silenteye.png?style=centerme)



<!-- ))) -->

<hr>
## SSuite Picsel
<!-- ((( -->

[SSuite Picsel](https://www.ssuiteoffice.com/software/ssuitepicselsecurity.htm) 
es una herramienta de esteganografía que permite ocultar 
información en imágenes.


|-|-|
| **Sistema Operativo** | Windows, MacOS X, Linux |
| **Formatos soportados** | BMP, PNG, JPG |
| **Método de inserción en imágenes** | ? |
| **Método de inserción en imágenes JPEG** | ? |
| **Licencia** | Freeware |



<br>
**Interfaz gráfica:**

La herramienta SSuite Picsel dispone de una interfaz gráfica que permite
ocultar y extraer información.

![SSuite Picsel](/stego/intro/resources/tools-ssuite-picsel.png?style=centerme)



<!-- ))) -->

<hr>
## Steg
<!-- ((( -->

[Steg](https://github.com/geezee/steg) es una herramienta de 
esteganografía que permite ocultar información en texto ASCII usando diferentes
codificaciones para el espacio en blanco.


|-|-|
| **Sistema Operativo** | Multiplataforma (D) |
| **Método de inserción para texto** | Espacios con diferentes codificaciones |
| **Licencia** | GPL v3 |


<br>
**Incrustación de un mensaje usando comandos:**

Para ocultar un mensaje en un texto *cover* podemos usar el
siguiente comando:

```bash
steg -c cover.txt -o stego.txt "This is a message"
```

<br>
**Extracción de un mensaje usando  comandos:**

Para extraer información oculta de un texto *stego* podemos usar el
siguiente comando:

```bash
steg -d -s stego.txt
```



<!-- ))) -->

<hr>
## Steghide
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
















