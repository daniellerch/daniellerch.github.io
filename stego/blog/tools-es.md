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

## Esteganografía en texto
- [ChatGPT](#chatgpt)

## Esteganografía en imágenes

- **Mapas de bits:**
   - [OpenStego](#openstego)
   - [OpenPuff](#openpuff)
   - [SilentEye](#silenteye)
   - [SSuite Picsel](#ssuite-picsel)
   - [ImageHide](#imagehide)
   - [QuickStego](#quickstego)
   - [S-Tools](#s-tools)
   - [WBStego4](#wbstego4)

- **JPEG:**
   - [JPHS](#jphs)
   - [JSteg](#jsteg)
   - [F5](#f5)
   - [StegHide](#steghide)
   - [HStego](#hstego)
   - [SilentEye](#silenteye)
   - [SSuite-Picsel](#ssuite-picsel)


### Esteganografía en audio
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)

### Esteganografía en video
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)

### Esteganografía en protocolos de red
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)

### Esteganografía en otros medios
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx)








## Esteganografía en texto


<hr>
## Esteganografía en imágenes

### OpenStego

[OpenStego](https://www.openstego.com) es una herramienta de esteganografía
para imágenes, que permite ocultar información tanto para la transmisión de 
mensajes secretos, como para *watermarking*.


|-|-|
| **Sistema Operativo** | Multiplataforma (Java) |
| **Método de inserción** | LSB replacement |
| **Formatos soportados** | PNG |
| **Seguridad** | Baja |


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

La herramienta OpenStego dispone de una herramienta gráfica que permite
ocultar y extraer información, así como incrustar y verificar el marcado.

![OpenStego](/stego/blog/resources/tools-openstego.png?style=centerme)


<br>
**Seguridad:**

La herramienta OpenStego usa la técnica de incrustación 
[LSB replacement](/stego/blog/faq-es/#qué-es-el-lsb-replacement),
es decir, que sobreescribe el bit menos significativo de los píxeles.
Esta técnica es vulnerable a [ataques estructurales](/stego/blog/faq-es/#qué-son-los-ataques-estructurales).
También puede ser detectada usando harramientas de estegoanalisis basadas
en *deep learning* como [Aletheia](https://github.com/daniellerch/aletheia).


## Esteganografía en audio



## Esteganografía en video


## Esteganografía en protocolos de red


## Esteganografía en otros medios
-












