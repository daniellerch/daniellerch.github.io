---
layout: page
title: "Eines d'esteganografia"
subtitle: "" 
noindex: false
meta-title: "Eines d'esteganografia"
meta-description: "llistat d'eines d'esteganografia"
meta-keywords: "esteganografia, eines"
lang-suffix: "-es"
comments: true
---


> Aquí es proporciona un llistat d'eines d'esteganografia. Abans
> de començar pot ser recomanable llegir algunes
> [notes sobre aquesta llista](#notes-sobre-aquesta-llista).




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



## Esteganografia en imatges
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
## Esteganografia en àudio 
- [DeepSound](#deepsound) <small>[ FLAC, MP3, WAV, APE ]</small>
- [HiddenWave](#hiddenwave) <small>[ WAV ]</small> 
- [MP3Stego](#mp3stego) <small>[ MP3 ]</small>
- [OpenPuff](#openpuff) <small>[ AIFF, MP3, NEXT/SUN, WAV ]</small>
- [SilentEye](#silenteye) <small>[ WAV ]</small> 
- [StegHide](#steghide) <small>[ WAV, AU ]</small>


<div class='separator'></div>
## Esteganografia en vídeo
- [OpenPuff](#openpuff) [ 3GP, MP4, MPG, VOB ]


<div class='separator'></div>
## Esteganografia en text
- [Steg](#steg)
- [ChatGPT](#chatgpt)


<div class='separator'></div>
## Esteganografia en altres mitjans
- [OpenPuff](#openpuff) [ FLV, SWF, PDF ]




<br>
<hr>

## Notes sobre aquesta llista

Aquesta és una llista d'eines d'esteganografia que estic recopilant.
En ella s'indica un enllaç on es pot aconseguir l'eina, una breu
descripció i una taula indicant els sistemes operatius en els quals funciona,
els arxius amb els quals treballa i el mètode d'incrustació d'informació
que utilitza. Aquest últim és especialment important si es desitja realitzar
estegoanàlisi utilitzant alguna eina com [Aletheia](https://github.com/daniellerch/aletheia).

Algunes dades encara no estan disponibles, normalment perquè no he
trobat aquesta informació i encara no he tingut temps d'investigar l'eina.

Si coneixes algunes dades dels quals no es proporcionen o hi ha alguna eina
que creus que podria ser interessant afegir a la llista, pots posar-te en
contacte amb mi [aquí](/about-es).




<hr>
## CryptoStego
<!-- ((( -->

[CryptoStego](https://stego.js.org/) és una
eina d'esteganografia per a imatges que s'executa en el navegador.


|-|-|
| **Sistema Operatiu** | Multiplataforma (Navegador web) |
| **Mètode d'inserció per a imatges** | Substitució LSB |
| **Mètode d'inserció per a imatges JPG** | A mida |
| **Llicència** | MIT |


Atès que aquesta eina s'executa en el navegador, només és
necessari accedir a la pàgina i seguir les instruccions.

![CryptoStego](/stego/intro/resources/tools-cryptostego.png?style=centerme)


<!-- ))) -->

<hr>
## ChatGPT
<!-- ((( -->

[ChatGPT](https://chat.openai.com//) és un model d'intel·ligència artificial
desenvolupat per [OpenAI](https://openai.com/) per simular converses
humanes a través de text.

No es tracta d'una eina d'esteganografia, encara que la seva capacitat per
generar textos de qualitat permet utilitzar-la com a tal. Es pot trobar un
exemple a l'article [Esteganografia en text amb ChatGPT](/stego/text/chatgpt-es/).



<!-- ))) -->

<hr>
## DeepSound
<!-- ((( -->

[DeepSound](https://jpinsoft.net/deepsound/overview.aspx) és una
eina d'esteganografia que permet amagar informació
en arxius de so.


|-|-|
| **Sistema Operatiu** | Windows |
| **Formats suportats per a so** | FLAC, MP3, WAV, APE |
| **Mètode d'inserció en àudio** | ? |
| **Llicència** | Freeware |



<br>
**Interfície gràfica:**

L'eina DeepSound disposa d'una interfície gràfica que permet
amagar i extreure informació.

![DeepSound](/stego/intro/resources/tools-deepsound.png?style=centerme)


<!-- ))) -->

<hr>
## F5
<!-- ((( -->

[F5](https://github.com/daniellerch/stego-collection/tree/master/F5) és una
eina d'esteganografia per a imatges JPEG.


|-|-|
| **Sistema Operatiu** | Multiplataforma (Java) |
| **Mètode d'inserció per a imatges JPG** | A mida |
| **Llicència** | MIT |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
java Embed  -p p4ssw0rd -e secret.txt cover.jpg stego.jpg
```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
java Extract -p p4ssw0rd -e output.txt stego.jpg
```



<!-- ))) -->

<hr>
## HiddenWave
<!-- ((( -->


[HiddenWave](https://github.com/techchipnet/HiddenWave) és una
eina d'esteganografia per a àudio en arxius WAV.


|-|-|
| **Sistema Operatiu** | Multiplataforma (Python) |
| **Mètode d'inserció per a àudio WAV** | Substitució LSB |
| **Llicència** | Domini públic / Sense llicència |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un missatge en un àudio *cover* podem usar el
següent comandament:

```bash
python3 HiddenWave.py -f cover.wav -m "Secret message" -o stego.wav

```

<br>
**Extracció d'un missatge usant comandaments:**


Per extreure informació oculta en l'àudio stego podem usar el
següent comandament:

```bash
python3 ExWave.py -f stego.wav
```



<!-- ))) -->

<hr>
## HStego
<!-- ((( -->

[HStego](https://github.com/daniellerch/hstego) és una eina d'
esteganografia que permet amagar informació en imatges
PNG i JPG.
Aquesta eina té com a objectiu principal no ser detectada amb
eines modernes d'estegoanàlisi.


|-|-|
| **Sistema Operatiu** | Windows, Linux |
| **Formats suportats** | PNG, JPG |
| **Mètode d'inserció en imatges** | STC + S-UNIWARD |
| **Mètode d'inserció en imatges JPG** | STC + J-UNIWARD |
| **Llicència** | MIT |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
hstego.py embed secret.txt cover.png stego.png p4ssw0rd
```

<br>
**Extracció d'un missatge usant comandaments:**
Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
hstego.py extract stego.png content.txt p4ssw0rd
```

<br>
**Interfície gràfica:**
L'eina HStego disposa d'una interfície gràfica que permet
amagar i extreure informació, així com incrustar i verificar el marcatge.

![HStego](/stego/intro/resources/tools-hstego.png?style=centerme)



<!-- ))) -->

<hr>
## JPHS
<!-- ((( -->

[JP Hide & Seek](https://github.com/daniellerch/stego-collection/tree/master/jphs) és una
eina d'esteganografia per a imatges JPEG.


|-|-|
| **Sistema Operatiu** | Linux |
| **Mètode d'inserció per a imatges JPG** | Substitució LSB en DCT |
| **Llicència** | GPL v2 |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:
```bash
jphide cover.jpg stego.jpg secret.txt
```

<br>
**Extracció d'un missatge usant comandaments:**
Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
jpseek stego.jpg output.txt
```



<!-- ))) -->

<hr>
## JSteg
<!-- ((( -->

[JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg) és una
eina d'esteganografia per a imatges JPEG.


|-|-|
| **Sistema Operatiu** | Linux |
| **Mètode d'inserció per a imatges JPG** | Substitució LSB en DCT (ignora valors 0 i 1) |
| **Llicència** | Llicència a mida similar a la BSD |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
cjpeg -steg secret.txt cover.pgm > stego.jpg
```

<br>
**Extracció d'un missatge usant comandaments:**
Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
djpeg -steg output.txt stego.jpg > out.jpg
```



<!-- ))) -->

<hr>
## MP3Stego
<!-- ((( -->

[MP3Stego](https://www.petitcolas.net/steganography/mp3stego/) és una
eina d'esteganografia que amaga informació durant la compressió
d'un arxiu WAV a MP3.


|-|-|
| **Sistema Operatiu** | Windows |
| **Mètode d'inserció per a àudio MP3** | A mida |
| **Llicència** | ? |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un arxiu secret.txt en un àudio *cover* podem usar el
següent comandament:

```bash
encode -E secret.txt -P p4ssw0rd cover.wav stego.mp3

```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta en l'àudio stego podem usar el
següent comandament:

```bash
decode -X -P p4ssw0rd svega_stego.mp3
```



<!-- ))) -->

<hr>
## OpenPuff
<!-- ((( -->

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) és una
eina d'esteganografia que permet amagar informació
en múltiples formats.


|-|-|
| **Sistema Operatiu** | Windows, Linux |
| **Formats suportats per a imatges** | BMP, JPG, PCX, PNG, TGA |
| **Formats suportats per a àudio** | AIFF, MP3, NEXT/SUN, WAV |
| **Formats suportats per a vídeo** | 3GP, MP4, MPG, VOB |
| **Altres formats suportats** | FLV, SWF, PDF |
| **Mètode d'inserció en imatges** | Substitució LSB |
| **Mètode d'inserció en imatges JPEG** | Steghide? |
| **Mètode d'inserció en vídeo** | ? |
| **Mètode d'inserció en altres formats** | ? |
| **Llicència** | LGPL v3 + Codi parcialment tancat |



<br>
**Interfície gràfica:**

L'eina OpenPuff disposa d'una interfície gràfica que permet
amagar i extreure informació, així com incrustar i verificar el marcatge.

![OpenPuff](/stego/intro/resources/tools-openpuff.jpg?style=centerme)


<!-- ))) -->

<hr>
## OpenStego
<!-- ((( -->

[OpenStego](https://www.openstego.com) és una eina d'esteganografia
per a imatges, que permet amagar informació tant per a la transmissió de
missatges secrets, com per a *watermarking*.


|-|-|
| **Sistema Operatiu** | Multiplataforma (Java) |
| **Formats suportats** | PNG |
| **Mètode d'inserció** | Substitució LSB |
| **Llicència** | GPL v2 |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
java -jar openstego.jar embed -a randomlsb -mf secret.txt -cf cover.png -sf stego.png
```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
java -jar openstego.jar extract -a randomlsb -sf stego.png -xd output-dir
```

<br>
**Interfície gràfica:**

L'eina OpenStego disposa d'una interfície gràfica que permet
amagar i extreure informació, així com incrustar i verificar el marcatge.

![OpenStego](/stego/intro/resources/tools-openstego.png?style=centerme)



<!-- ))) -->

<hr>
## Outguess
<!-- ((( -->

[Outguess](https://github.com/daniellerch/stego-collection/tree/master/Outguess) és una
eina d'esteganografia per a imatges JPEG.


|-|-|
| **Sistema Operatiu** | Linux |
| **Mètode d'inserció per a imatges JPG** | A mida |
| **Llicència** | MIT |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
outguess -k p4ssw0rd -d secret.txt cover.jpg stego.jpg
```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
outguess -k p4ssw0rd -r stego.jpg output.txt
```



<!-- ))) -->

<hr>
## QuickStego
<!-- ((( -->

[QuickStego](http://quickcrypto.com/free-steganography-software.html)
és una eina d'esteganografia que permet amagar
informació en imatges.


|-|-|
| **Sistema Operatiu** | Windows |
| **Formats suportats** | BMP, GIF, JPG |
| **Mètode d'inserció en imatges** | ? |
| **Mètode d'inserció en imatges JPEG** | ? |
| **Llicència** | Freeware |



<br>
**Interfície gràfica:**

L'eina QuickStego disposa d'una interfície gràfica que permet
amagar i extreure informació.

![QuickStego](/stego/intro/resources/tools-quickstego.jpg?style=centerme)


<!-- ))) -->

<hr>
## SilentEye
<!-- ((( -->

[SilentEye](https://achorein.github.io/silenteye/) és una eina d'
esteganografia que permet amagar informació en imatges
i àudio.


|-|-|
| **Sistema Operatiu** | Windows, MacOS X, Linux |
| **Formats suportats** | BMP, WAV |
| **Mètode d'inserció en imatges** | Substitució LSB |
| **Mètode d'inserció en imatges JPEG** | ? |
| **Mètode d'inserció en àudio** | ? |
| **Llicència** | GPL v3 |



<br>
**Interfície gràfica:**

L'eina SilentEye disposa d'una interfície gràfica que permet
amagar i extreure informació.

![SilentEye](/stego/intro/resources/tools-silenteye.png?style=centerme)



<!-- ))) -->

<hr>
## SSuite Picsel
<!-- ((( -->

[SSuite Picsel](https://www.ssuiteoffice.com/software/ssuitepicselsecurity.htm)
és una eina d'esteganografia que permet amagar
informació en imatges.


|-|-|
| **Sistema Operatiu** | Windows, MacOS X, Linux |
| **Formats suportats** | BMP, PNG, JPG |
| **Mètode d'inserció en imatges** | ? |
| **Mètode d'inserció en imatges JPEG** | ? |
| **Llicència** | Freeware |



<br>
**Interfície gràfica:**

L'eina SSuite Picsel disposa d'una interfície gràfica que permet
amagar i extreure informació.

![SSuite Picsel](/stego/intro/resources/tools-ssuite-picsel.png?style=centerme)



<!-- ))) -->

<hr>
## Steg
<!-- ((( -->

[Steg](https://github.com/geezee/steg) és una eina d'
esteganografia que permet amagar informació en text ASCII usant diferents
codificacions per l'espai en blanc.


|-|-|
| **Sistema Operatiu** | Multiplataforma (D) |
| **Mètode d'inserció per a text** | Espais amb diferents codificacions |
| **Llicència** | GPL v3 |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un missatge en un text *cover* podem usar el
següent comandament:

```bash
steg -c cover.txt -o stego.txt "This is a message"
```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta d'un text stego podem usar el
següent comandament:

```bash
steg -d -s stego.txt
```



<!-- ))) -->

<hr>
## Steghide
<!-- ((( -->

[Steghide](https://steghide.sourceforge.net/index.php) és una eina d'
esteganografia que permet amagar informació en imatges i àudio.


|-|-|
| **Sistema Operatiu** | Windows, Linux |
| **Formats suportats per a imatges** | BMP, JPG |
| **Formats suportats per a àudio** | WAV, AU |
| **Mètode d'inserció per a imatges** | A mida |
| **Mètode d'inserció per a imatges JPG** | A mida |
| **Mètode d'inserció per a àudio** | A mida |
| **Llicència** | GPL v2 |


<br>
**Incrustació d'un missatge usant comandaments:**

Per amagar un fitxer "secret.txt" en una imatge *cover* podem usar el
següent comandament:

```bash
steghide embed -cf cover.jpg -ef secret.txt -sf stego.jpg -p p4ssw0rd
```

<br>
**Extracció d'un missatge usant comandaments:**

Per extreure informació oculta en una imatge stego podem usar el
següent comandament:

```bash
steghide extract -sf stego.jpg -xf output.txt -p p4ssw0rd -f
```



<!-- ))) -->
















