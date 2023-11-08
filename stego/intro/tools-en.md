---
layout: page
title: "Steganography Tools"
subtitle: "" 
noindex: false
meta-title: "Steganography Tools"
meta-description: "List of steganography tools"
meta-keywords: "steganography, tools"
lang-suffix: "-en"
---

> Here you'll find a list of steganography tools. Before 
> starting, it may be advisable to read some
> [notes about this list](#notes-about-this-list).




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


## Steganography in Images
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
## Steganography in Audio   
- [DeepSound](#deepsound) <small>[ FLAC, MP3, WAV, APE ]</small>
- [HiddenWave](#hiddenwave) <small>[ WAV ]</small> 
- [MP3Stego](#mp3stego) <small>[ MP3 ]</small>
- [OpenPuff](#openpuff) <small>[ AIFF, MP3, NEXT/SUN, WAV ]</small>
- [SilentEye](#silenteye) <small>[ WAV ]</small> 
- [StegHide](#steghide) <small>[ WAV, AU ]</small>

<div class='separator'></div>
## Steganography in Video
- [OpenPuff](#openpuff) [ 3GP, MP4, MPG, VOB ]

<div class='separator'></div>
## Steganography in Text
- [Steg](#steg)
- [ChatGPT](#chatgpt)

<div class='separator'></div>
## Steganography in Other Media
- [OpenPuff](#openpuff) [ FLV, SWF, PDF ]






<br>
<hr>

## Notes About This List

This is a list of steganography tools that I am compiling.
It includes a link where the tool can be obtained, a brief
description, and a table indicating the operating systems it works on,
the file types it works with, and the data embedding method
it uses. The latter is especially important if you want to perform
steganalysis using a tool like [Aletheia](https://github.com/daniellerch/aletheia).

Some data is still not available, usually because I have
not found this information and have not yet had time to investigate the
tool.

If you know some data that is not provided, or there is a tool
that you think would be interesting to add to the list, you can get in touch
with me [here](/about-en).



<hr>
## CryptoStego
<!-- ((( -->

[CryptoStego](https://stego.js.org/) is a 
steganography tool for images that runs in the browser.

|-|-|
| **Operating System** | Cross-platform (Web browser) |
| **Image insertion method** | LSB Replacement |
| **Image insertion method for JPG** | Custom |
| **License** | MIT |

Since this tool runs in the browser, it is only
necessary to access the page and follow the instructions.

![CryptoStego](/stego/intro/resources/tools-cryptostego.png?style=centerme)


<!-- ))) -->

<hr>
## ChatGPT
<!-- ((( -->

[ChatGPT](https://chat.openai.com//) is an artificial intelligence model 
developed by [OpenAI](https://openai.com/) to simulate human conversations 
through text.

It is not a steganography tool per se, although its ability to
generate high-quality texts allows it to be used as such. An example can be found in the article [Text Steganography with ChatGPT](/stego/text/chatgpt-en/).




<!-- ))) -->

<hr>
## DeepSound
<!-- ((( -->

[DeepSound](https://jpinsoft.net/deepsound/overview.aspx) is a 
steganography tool that allows hiding information 
within audio files.


|-|-|
| **Operating System** | Windows |
| **Supported Audio Formats** | FLAC, MP3, WAV, APE |
| **Audio Insertion Method** | ? |
| **License** | Freeware |



<br>
**Graphical Interface:**

DeepSound has a graphical interface that facilitates
the hiding and extracting of information.

![DeepSound](/stego/intro/resources/tools-deepsound.png?style=centerme)


<!-- ))) -->

<hr>
## F5
<!-- ((( -->

[F5](https://github.com/daniellerch/stego-collection/tree/master/F5) is a 
steganography tool for JPEG images.


|-|-|
| **Operating System** | Cross-platform (Java) |
| **JPG Image Insertion Method** | Custom |
| **License** | MIT |


<br>
**Embedding a message using commands:**

To hide a "secret.txt" file in a *cover* image, we can use the
following command:

```bash
java -jar f5.jar e -p p4ssw0rd -e secret.txt cover.jpg stego.jpg
```


<br>
**Extracting a message using commands:**

To extract hidden information from a stego image, we can use the
following command:

```bash
java -jar f5.jar x -p p4ssw0rd -xf output.txt stego.jpg
```



<!-- ))) -->

<hr>
## HiddenWave
<!-- ((( -->

[HiddenWave](https://github.com/techchipnet/HiddenWave) is a 
steganography tool for audio in WAV files.


|-|-|
| **Operating System** | Cross-platform (Python) |
| **WAV Audio Insertion Method** | LSB replacement |
| **License** | Public Domain / Unlicensed |


<br>
**Embedding a message using commands:**

To hide a message in a *cover* audio we can use the
following command:

```bash
python3 HiddenWave.py -f cover.wav -m "Secret message" -o stego.wav

```

**Extracting a message using commands:**

To extract hidden information from the stego audio we can use the
following command:

```bash
python3 ExWave.py -f stego.wav
```



<!-- ))) -->

<hr>
## HStego
<!-- ((( -->

[HStego](https://github.com/daniellerch/hstego) is a steganography tool 
that allows hiding information in PNG and JPG images. 
The main objective of this tool is to go undetected by modern 
steganalysis tools.


|-|-|
| **Operating System** | Windows, Linux |
| **Supported Formats** | PNG, JPG |
| **Image Insertion Method** | STC + S-UNIWARD |
| **JPG Image Insertion Method** | STC + J-UNIWARD |
| **License** | MIT |


<br>
**Embedding a message using commands:**

To hide a "secret.txt" file in a *cover* image, we can use the
following command:

```bash
hstego.py embed secret.txt cover.png stego.png p4ssw0rd
```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image, we can use the
following command:

```bash
hstego.py extract stego.png content.txt p4ssw0rd
```

<br>
**Graphical Interface:**

The HStego tool has a graphical interface that allows
hiding and extracting information, as well as embedding and verifying watermarks.

![HStego](/stego/intro/resources/tools-hstego.png?style=centerme)



<!-- ))) -->

<hr>
## JPHS
<!-- ((( -->

[JP Hide & Seek](https://github.com/daniellerch/stego-collection/tree/master/jphs) is a 
steganography tool for JPEG images.


|-|-|
| **Operating System** | Linux |
| **JPG Image Insertion Method** | DCT LSB replacement |
| **License** | GPL v2 |


<br>
**Embedding a message using commands:**

To hide a "secret.txt" file in a *cover* image, we can use the
following command:

```bash
jphide cover.jpg stego.jpg secret.txt
```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image, we can use the
following command:

```bash
jpseek stego.jpg output.txt
```



<!-- ))) -->

<hr>
## JSteg
<!-- ((( -->

[JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg) is a 
steganography tool for JPEG images.


|-|-|
| **Operating System** | Linux |
| **JPG Image Insertion Method** | DCT LSB replacement (ignores values 0 and 1) |
| **License** | Custom license similar to BSD |


<br>
**Embedding a message using commands:**

To hide a "secret.txt" file in a *cover* image, we can use the
following command:

```bash
cjpeg -steg secret.txt cover.pgm > stego.jpg
```

<br>
**Extraction of a message using commands:**

To extract hidden information in a *stego* image, we can use the
following command:

```bash
djpeg -steg output.txt stego.jpg > out.jpg
```



<!-- ))) -->

<hr>
## MP3Stego
<!-- ((( -->

[MP3Stego](https://www.petitcolas.net/steganography/mp3stego/) is a 
steganography tool that hides information during the compression
of a WAV file to MP3.


|-|-|
| **Operating System** | Windows |
| **Insertion Method for MP3 Audio** | Custom |
| **License** | ? |


<br>
**Embedding a message using commands:**

To hide a "secret.txt" file in a *cover* audio file, we can use the
following command:

```bash
encode -E secret.txt -P p4ssw0rd cover.wav stego.mp3
```

<br>
**Extracting a Message Using Commands:**

To extract hidden information from the stego audio, we can use the following command:



```bash
decode -X -P p4ssw0rd svega_stego.mp3
```



<!-- ))) -->

<hr>
## OpenPuff
<!-- ((( -->

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) is a 
steganography tool that allows the hiding of information 
in multiple formats.


|-|-|
| **Operating System** | Windows, Linux |
| **Supported Image Formats** | BMP, JPG, PCX, PNG, TGA |
| **Supported Audio Formats** | AIFF, MP3, NEXT/SUN, WAV |
| **Supported Video Formats** | 3GP, MP4, MPG, VOB |
| **Other Supported Formats** | FLV, SWF, PDF |
| **Image Insertion Method** | LSB replacement |
| **JPEG Image Insertion Method** | Steghide? |
| **Video Insertion Method** | ? |
| **Other Formats Insertion Method** | ? |
| **License** | LGPL v3 + Partially closed code |



<br>
**Graphical Interface:**

The OpenPuff tool has a graphical interface that allows
hiding and extracting information, as well as embedding and verifying the watermark.

![OpenPuff](/stego/intro/resources/tools-openpuff.jpg?style=centerme)



<!-- ))) -->

<hr>
## OpenStego
<!-- ((( -->

[OpenStego](https://www.openstego.com) is a steganography tool
for images, which allows the hiding of information both for the transmission of
secret messages and for *watermarking*.


|-|-|
| **Operating System** | Cross-platform (Java) |
| **Supported Formats** | PNG |
| **Insertion Method** | LSB replacement |
| **License** | GPL v2 |


<br>
**Embedding a message using commands:**

To hide a file "secret.txt" inside a *cover* image we can use the
following command:

```bash
java -jar openstego.jar embed -a randomlsb -mf secret.txt -cf cover.png -sf stego.png
```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image we can use the
following command:

```bash
java -jar openstego.jar extract -a randomlsb -sf stego.png -xd output-dir
```

<br>
**Graphical Interface:**

The OpenStego tool has a graphical interface that allows
hiding and extracting information, as well as embedding and verifying the watermark.

![OpenStego](/stego/intro/resources/tools-openstego.png?style=centerme)



<!-- ))) -->

<hr>
## Outguess
<!-- ((( -->

[Outguess](https://github.com/daniellerch/stego-collection/tree/master/outguess) is a 
steganography tool for JPEG images.


|-|-|
| **Operating System** | Linux |
| **JPEG Images Insertion Method** | Custom |
| **License** | MIT |


<br>
**Embedding a message using commands:**

To hide a file "secret.txt" inside a *cover* image we can use the
following command:

```bash
outguess -k p4ssw0rd -d secret.txt cover.jpg stego.jpg

```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image we can use the
following command:

```bash
outguess -k p4ssw0rd -r stego.jpg output.txt
```



<!-- ))) -->

<hr>
## QuickStego
<!-- ((( -->

[QuickStego](http://quickcrypto.com/free-steganography-software.html) 
is a steganography tool that allows hiding 
information in images.


|-|-|
| **Operating System** | Windows |
| **Supported Formats** | BMP, GIF, JPG |
| **Image Insertion Method** | ? |
| **JPEG Image Insertion Method** | ? |
| **License** | Freeware |



<br>
**Graphical Interface:**

The QuickStego tool has a graphical interface that allows
hiding and extracting information.

![QuickStego](/stego/intro/resources/tools-quickstego.jpg?style=centerme)


<!-- ))) -->

<hr>
## SilentEye
<!-- ((( -->

[SilentEye](https://achorein.github.io/silenteye/) is a steganography tool 
that allows hiding information in images
and audio.


|-|-|
| **Operating System** | Windows, MacOS X, Linux |
| **Supported Formats** | BMP, WAV |
| **Image Insertion Method** | LSB replacement |
| **JPEG Image Insertion Method** | ? |
| **Audio Insertion Method** | ? |
| **License** | GPL v3 |



<br>
**Graphical Interface:**

The SilentEye tool has a graphical interface that allows
hiding and extracting information.

![SilentEye](/stego/intro/resources/tools-silenteye.png?style=centerme)



<!-- ))) -->

<hr>
## SSuite Picsel
<!-- ((( -->

[SSuite Picsel](https://www.ssuiteoffice.com/software/ssuitepicselsecurity.htm) 
is a steganography tool that allows hiding 
information in images.


|-|-|
| **Operating System** | Windows, MacOS X, Linux |
| **Supported Formats** | BMP, PNG, JPG |
| **Image Insertion Method** | ? |
| **JPEG Image Insertion Method** | ? |
| **License** | Freeware |



<br>
**Graphical Interface:**

The SSuite Picsel tool has a graphical interface that allows
hiding and extracting information.

![SSuite Picsel](/stego/intro/resources/tools-ssuite-picsel.png?style=centerme)



<!-- ))) -->

<hr>
## Steg
<!-- ((( -->

[Steg](https://github.com/geezee/steg) is a steganography tool 
that allows hiding information in ASCII text using different
encodings for whitespace.


|-|-|
| **Operating System** | Cross-platform (D) |
| **Insertion Method for Text** | Spaces with different encodings |
| **License** | GPL v3 |


<br>
**Embedding a message using commands:**

To hide a file "secret.txt" inside a *cover* image we can use the
following command:


```bash
steghide embed -cf cover.jpg -ef secret.txt -sf stego.jpg -p p4ssw0rd
```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image we can use the
following command:

```bash
steghide extract -sf stego.jpg -xf output.txt -p p4ssw0rd -f
```



<!-- ))) -->

<hr>
## Steghide
<!-- ((( -->

[Steghide](https://steghide.sourceforge.net/index.php) is a steganography tool 
that allows hiding information in images and audio.


|-|-|
| **Operating System** | Windows, Linux |
| **Supported Formats for Images** | BMP, JPG |
| **Supported Formats for Audio** | WAV, AU |
| **Insertion Method for Images** | Custom |
| **Insertion Method for JPG Images** | Custom |
| **Insertion Method for Audio** | Custom |
| **License** | GPL v2 |


<br>
**Embedding a message using commands:**

To hide a file "secret.txt" inside a *cover* image we can use the
following command:

```bash
steghide embed -cf cover.jpg -ef secret.txt -sf stego.jpg -p p4ssw0rd
```

<br>
**Extracting a message using commands:**

To extract hidden information from a stego image we can use the
following command:

```bash
steghide extract -sf stego.jpg -xf output.txt -p p4ssw0rd -f
```



<!-- ))) -->
















