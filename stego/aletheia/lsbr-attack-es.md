---
layout: page
title: Ataque práctico a esquemas LSB replacement
subtitle: "OpenStego y OpenPuff" 
noindex: false
meta-title: "Ataque práctico a LSB replacement: OpenStego y OpenPuff"
meta-description: "Artículo sobre cómo detectar herramientas que usan la técnica LSB replacement en imágenes sin comprimir, usando la herramienta Aletheia"
meta-keywords: "esteganografía, estegoanálisis, imágenes"
lang-suffix: "-es"
comments: true
---

> En este artículo vamos a ver cómo detectar herramientas que usan de 
> LSB *replacement* en imágenes sin comprimir. Para ello, usaremos la herramienta 
> de estegoanálisis [Aletheia](https://github.com/daniellerch/aletheia).

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

1. [Cómo funciona la técnica del LSB replacement](#cómo-funciona-la-técnica-del-lsb-replacement)
2. [OpenStego](#openstego)
3. [OpenPuff](#openstego)
4. [Exploración inicial](#exploración-inicial)
5. [Estegoanálisis estructural](#estegoanálisis-estructural)
6. [Ataque de fuerza bruta a OpenStego](#ataque-de-fuerza-bruta-a-openstego)
7. [LSB *matching*: una alternativa sencilla al LSB replacement](#lsb-matching-una-alternativa-sencilla-al-lsb-replacement)


<br>
## Cómo funciona la técnica del LSB *replacement*

En imágenes sin comprimir representadas como mapas de bits (bitmap), es habitual 
que cada píxel sea 
representado mediante tres bytes: el byte **R**, que nos indica la cantidad de 
rojo, el byte **G**, que nos indica la cantidad de verde y el byte **B**, que nos 
indica la cantidad de azul. Dado que la modificación de estos bytes en unas 
pocas unidades, no es perceptible para el sistema visual humano, esto puede 
ser aprovechado para ocultar información.

Dado que cada byte está formado por 8 bits, una forma sencilla de ocultar 
información sin alterar demasiado el valor del píxel consiste en sustituir
el valor del bit menos significativo (LSB o *Least Significant Bit*), por el 
valor de un bit del mensaje que queremos ocultar.

Supongamos que los primeros tres píxeles de una imagen RGB tienen los
siguientes valores:

|   R |  G  |   B | 
| 160 | 60  |  53 | 
| 128 | 111 |  43 | 
| 84  | 125 | 125 |

Si representamos sus valores en binario, nos quedaría:

|        R |        G |        B |
| 10100000 | 00111100 | 00110101 | 
| 10000000 | 01101111 | 00101011 | 
| 01010100 | 01111101 | 01111101 |

Como ejemplo, vamos a ocultar la letra 'A' en código ASCII. Es decir, 
el valor binario **01000001**. Para ocultar esta información en los primeros 
tres píxeles, solo tendremos que sustituir el valor del LSB por el
valor del mensaje. Quedando así:

|            R |            G |            B |
| 1010000**0** | 0011110**1** | 0011010**0** |
| 1000000**0** | 0110111**0** | 0010101**0** | 
| 0101010**0** | 0111110**1** | 01111101     |


Desafortunadamente, este tipo de inserción no es muy segura y existen muchos
ataques que la explotan. Los primeros de estos ataques son de finales los 90, 
aunque evolucionaron significativamente en años posteriores. 
Actualmente, este tipo de ataques, conocidos como 
**ataques estructurales**, son suficientemente precisos como para considerar
al LSB *replacement* una técnica esteganográfica a evitar.

Por suerte o por desgracia, todavía son muchas las herramientas que implementan
LSB *replacement*. Por Ejemplo 
[OpenStego](https://www.openstego.com/) y 
[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html),
que vemos en este artículo.





<br>
## OpenStego
[OpenStego](https://www.openstego.com/) es una herramienta *open source* desarrollada en Java para ocultar mensajes en imágenes (esteganografía y *watermarking*). A continuación, vamos a estegoanalizar esta herramienta en su versión v0.8.0.


Para realizar el análisis descargaremos una imagen del repositorio de Waterloo. Concretamente la imagen "Monarch". A continuación, la convertiremos a PNG, puesto que OpenStego no soporta el formato TIFF.

```bash
wget http://links.uwaterloo.ca/Repository/TIF/monarch.tif
convert monarch.tif monarch.png
```

La imagen es la siguiente:

<center><img src="/stego/aletheia/resources/monarch.png"/></center>


Ocultaremos un mensaje de 20000 bytes. Generamos el mensaje con el siguiente comando:


```bash
dd if=/dev/urandom of=secret.txt bs=1 count=20000
20000+0 registros leídos
20000+0 registros escritos
20000 bytes (20 kB, 20 KiB) copied, 0,0451231 s, 443 kB/s
```

A continuación, usaremos OpenStego para ocultar el mensaje. 

<center><img src="/stego/aletheia/resources/openstego-1.png"/></center>


Quedando una imagen *stego* indistinguible de la original para el ojo humano.

<center><img src="/stego/aletheia/resources/monarch_openstego.png"/></center>



<br>
## OpenPuff

[OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) es una herramienta gratuita para esconder información en diferentes tipos de medios. A continuación, vamos a estegoanalizar esta herramienta en su  versión v4.0.1, cuando las imágenes en las que se esconde la información son imágenes sin comprimir.


<center><img src="/stego/aletheia/resources/openpuff-1.png"/></center>

Para realizar el análisis descargaremos una imagen del repositorio de Waterloo. Concretamente la imagen "Peppers". Y a continuación, la convertiremos a PNG, puesto que OpenPuff no soporta el formato TIFF.

```bash
wget http://links.uwaterloo.ca/Repository/TIF/peppers3.tif
convert peppers3.tif peppers3.png
```

La imagen es la siguiente:

<center><img src="/stego/aletheia/resources/peppers3.png"/></center>


Ocultaremos un mensaje de unos 5000 bytes, que es lo máximo que nos permite guardar OpenPuff cuando usamos el *payload* mínimo y más seguro (12.5%). Generamos el mensaje con el siguiente comando:




```bash
dd if=/dev/urandom of=secret.txt bs=1 count=5000
5000+0 registros leídos
5000+0 registros escritos
5000 bytes (5,0 kB, 4,9 KiB) copied, 0,0106255 s, 471 kB/s

```


A continuación, usaremos OpenPuff para ocultar el mensaje. 


<center><img src="/stego/aletheia/resources/openpuff-3.png"/></center>



Obtenemos la siguiente imagen *stego*:

<center><img src="/stego/aletheia/resources/peppers3_openpuff.png"/></center>





<br>
## Exploración inicial



Para saber qué ataques podemos realizar es necesario conocer que técnica de inserción de información usa el programa. OpenStego usa LSB *replacement* por lo que podremos usar todas las técnicas que implementa Aletheia para atacar LSB *replacement*.

Podemos ver que, efectivamente, OpenStego usa LSB *replacement* comparando una imagen original con una imagen con un mensaje oculto. Aletheia nos ofrece el comando "print-diffs" que nos muestra las diferencias entre los píxeles. Con este comando podemos ver qué ocurre al ocultar un mensaje.



```bash
$ ./aletheia.py print-diffs monarch.png monarch_openstego.png

Channel 1:
[(98, 99, 1), (108, 109, 1), (155, 154, -1), (182, 183, 1), ...]
[(157, 156, -1), (134, 135, 1), (78, 79, 1), (74, 75, 1), ...]
[(88, 89, 1), (116, 117, 1), (121, 120, -1), (128, 129, 1), ...]
[(131, 130, -1), (111, 110, -1), (96, 97, 1), (99, 98, -1), ...]
[(128, 129, 1), (139, 138, -1), (145, 144, -1), (123, 122, -1), ...]
[(208, 209, 1), (149, 148, -1), (101, 100, -1), (77, 76, -1), ...]
[(104, 105, 1), (134, 135, 1), (128, 129, 1), (131, 130, -1), ...]
[(98, 99, 1), (98, 99, 1), (107, 106, -1), (138, 139, 1), ...]
[(217, 216, -1), (174, 175, 1), (151, 150, -1), (84, 85, 1), ...]

...
```

Vemos que los píxeles suelen modificarse en una unidad. Por ejemplo, el valor el original del primer píxel modificado es 98, que se modifica pasando a ser 99, una operación de +1. El tercero, es un píxel con valor 155 que pasa a ser 154, una operación de -1. El detalle importante en el que hay que fijarse es que las operaciones no son +1 o -1 indiscriminadamente (lo que nos indicaría que se trata de LSB *matching*), sino que los píxeles impares siempre se modifican con -1 y los pares con +1. Esto nos indica que se está usando LSB *replacement*, pues es es precisamente, el efecto de reemplazar el bit menos significativo de cada píxel.


Si ejecutamos el mismo comando con las imágenes de OpenPuff, obtenemos resultados similares:

```bash
./aletheia.py print-diffs peppers3.png peppers3_openpuff.png 

Channel 1:
[(147, 146, -1), (177, 176, -1), (177, 176, -1), (169, 168, -1), ...]
[(181, 180, -1), (180, 181, 1), (179, 178, -1), (178, 179, 1), ...]
[(176, 177, 1), (175, 174, -1), (165, 164, -1), (170, 171, 1), ...]
[(184, 185, 1), (159, 158, -1), (144, 145, 1), (186, 187, 1), ...]
[(191, 190, -1), (192, 193, 1), (186, 187, 1), (187, 186, -1), ...]
[(144, 145, 1), (149, 148, -1), (199, 198, -1), (200, 201, 1), ...]
[(201, 200, -1), (198, 199, 1), (201, 200, -1), (200, 201, 1), ...]
[(180, 181, 1), (179, 178, -1), (180, 181, 1), (183, 182, -1), ...]
[(183, 182, -1), (183, 182, -1), (183, 182, -1), (209, 208, -1), ...]

...
```

<br>
## Estegoanálisis estructural

Puesto que sabemos que se está usando LSB *replacement*, podemos usar todas los ataques que implementa Aletheia para este tipo de esteganografía. Aquí Usaremos dos ataques: El ataque SPA (Sample Pairs Analysis) y el ataque WS (Weighted Stego), dos ataques eficientes y precisos. En todos los casos, como referencia, realizaremos primero un ataque sobre la imagen original y después un ataque sobre la imagen con el mensaje oculto.

### El ataque SPA (Sample Pairs Analysis)

Imágenes originales:
```bash
$ ./aletheia.py spa monarch.png 
No hidden data found

$ ./aletheia.py spa peppers3.png 
No hidden data found

```



Imágenes con  mensaje oculto.

```bash
$ ./aletheia.py spa monarch_openstego.png 
Hiden data found in channel R 0.07493448209001959
Hiden data found in channel G 0.0676341653177243
Hiden data found in channel B 0.05826279404860022

$ ../aletheia.py spa peppers3_openpuff.png 
Hidden data found in channel R 0.1464232217001414
Hidden data found in channel G 0.15585640405139609
Hidden data found in channel B 0.11567700466149547
```

### El ataque WS (Weighted Stego)

Imágenes originales:

```bash
$ ./aletheia.py ws monarch.png 
No hidden data found

$ ./aletheia.py ws stego/aletheia/resources/peppers3.png 
No hidden data found
```

Imágenes con mensaje oculto.

```bash
$ ./aletheia.py ws monarch_openstego.png 
Hiden data found in channel R 0.07295581176434245
Hiden data found in channel G 0.07493768934615823
Hiden data found in channel B 0.06355771697762562

$ ./aletheia.py ws stego/aletheia/resources/peppers3_openpuff.png 
Hidden data found in channel R 0.13275428291180907
Hidden data found in channel G 0.13427208873412433
Hidden data found in channel B 0.11806703947840881
```

<br>
## Ataque de fuerza bruta a OpenStego

Aletheia implementa ataques de fuerza bruta a diferentes herramientas
de esteganografía. Esto puede ser útil si sabemos, o sospechamos, que
se ha usado una herramienta concreta y queremos obtener la contraseña
y el mensaje oculto.


Veamos como realizar un ataque a la herramienta
[OpenStego](https://www.openstego.com/). 

Ocultamos un mensaje en una imagen PNG, protegida por contraseña:


```bash
$ openstego embed -p 123456 -mf secret.txt -cf sample_images/lena.png -sf stego.png
```

A continuación, usamos Aletheia para encontrar la contraseña y extraer el mensaje:

```bash
./aletheia.py brute-force-openstego stego.png resources/passwords.txt 
Using 16 processes
Completed: 0.0%    
Password found: 123456
```

<br>
## LSB *matching*: una alternativa sencilla a LSB replacement

Resulta curioso que todavía se desarrollen herramientas de esteganografía que
usen LSB replacement, cuando existen ataques tan potentes como los que se han mostrado.
Principalmente, teniendo en cuenta que existe una alternativa tan sencilla
como el propio LSB replacement que evita todos estos ataques. Se tratat del LSB *matching*. 

En lugar de sustutir aquellos LSBs que no coinciden con los bits del mensaje
que queremos ocultar, lo que tenemos que hacer es sumar o restar uno a esos
valores. El efecto sobre el LSB es exactamente el mismo, pero esta forma de
ocultar datos no producte las anomalías estadísticas que hacen que LSB replacement sea 
tan detectable. 


Volviendo al ejemplo con el que se ha iniciado el artículo, si disponemos de
los siguientes valores en binario:

|        R |        G |        B |
| 10100000 | 00111100 | 00110101 | 
| 10000000 | 01101111 | 00101011 | 
| 01010100 | 01111101 | 01111101 |

y queremos ocultar el byte **01000001** correspondiente a la letra 'A', podemos
hacerlo sumando o restando uno aleatoriamente, cuando sea necesario:

|            R |                 G |                 B |
| 10100000     | 0011110**1** (+1) | 001101**10** (+1) |
| 10000000     | 0110111**0** (-1) | 00101010          | 
| 01010100     | 01111101          | 01111101          |


Como se puede ver en el ejemplo, la diferencia fundamental entre LSB replacement y LSB *matching*
es que el segundo produce acarreo mientras que el primero no. De hecho, con 
LSB *replacement* nunca se le suma uno a un valor impar y nunca se le resta uno a un valor
par, lo que produce la anomalía que explotan los métodos de detección 
estructurales.






