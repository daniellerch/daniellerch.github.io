---
layout: page
title: "Preguntas frecuentes sobre esteganografía"
subtitle: "" 
noindex: false
meta-title: "Preguntas frecuentes sobre esteganografía"
meta-description: "FAQ sobre esteganografía"
meta-keywords: "esteganografía, faq, preguntas frecuentes"
lang-suffix: "-es"
comments: false
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

## Contenido

- [¿Qué es la esteganografía?](#qué-es-la-esteganografía)
- [¿Qué es el estegoanálisis?](#qué-es-el-estegoanálisis)
- [¿Qué es el LSB? / ¿Qué es la esteganografía LSB?](#qué-es-el-lsb--qué-es-la-esteganografía-lsb)
- [¿Qué es el LSB replacement?](#qué-es-el-lsb-replacement)
- [¿Qué es el LSB matching?](#qué-es-el-lsb-matching)
- [¿Qué es la esteganografía F5?](#qué-es-la-esteganografía-f5)
- [¿Qué es StegHide?](#qué-es-steghide)
- [¿En qué medios se puede usar esteganografía?](#en-qué-medios-se-puede-usar-esteganografía)
- [¿Qué son los ataques estructurales?](#qué-son-los-ataques-estructurales)
- [¿Qué es el Cover Source Mismatch?](#qué-es-el-cover-source-mismatch)
- [¿Qué son cover, stego y payload?](#qué-son-cover-stego-y-payload)
- [¿Qué son embedding y extraction?](#qué-son-embedding-y-extraction)
- [¿Qué es una clave esteganográfica?](#qué-es-una-clave-esteganográfica)
- [¿Qué diferencia hay entre esteganografía espacial y esteganografía JPEG?](#qué-diferencia-hay-entre-esteganografía-espacial-y-esteganografía-jpeg)
- [¿Qué es la DCT?](#qué-es-la-dct)
- [¿Qué es la esteganografía adaptativa?](#qué-es-la-esteganografía-adaptativa)
- [¿Qué es una función de coste?](#qué-es-una-función-de-coste)
- [¿Qué es matrix encoding?](#qué-es-matrix-encoding)
- [¿Qué son los wet paper codes?](#qué-son-los-wet-paper-codes)
- [¿Qué son los syndrome-trellis codes (STC)?](#qué-son-los-syndrome-trellis-codes-stc)
- [¿Qué son los falsos positivos y falsos negativos?](#qué-son-los-falsos-positivos-y-falsos-negativos)
- [¿Qué es Aletheia?](#qué-es-aletheia)
- [¿Qué es StegoRank?](#qué-es-stegorank)

<br>
## ¿Qué es la esteganografía?

El término esteganografía proviene del griego "steganos" (oculto) y 
"graphos" (escritura) y se traduce literalmente como "escritura oculta". 
Esta disciplina se refiere al arte y ciencia de esconder un mensaje o 
información dentro de otra información, de tal manera que no sea perceptible.

A diferencia de la criptografía, donde se codifica un mensaje para que no pueda 
ser leído sin la clave adecuada, la esteganografía busca esconder el mensaje en 
sí, de modo que no se pueda saber de su existencia.

Un ejemplo clásico de esteganografía es escribir con tinta invisible en una 
carta. Mientras que un observador casual solo vería el mensaje visible escrito 
con tinta normal, una persona que supiera del mensaje oculto podría revelarlo, 
por ejemplo, calentando el papel.

En el ámbito digital, la esteganografía a menudo implica incrustar información 
dentro de archivos multimedia, como imágenes, audios o videos. Por ejemplo, 
se podría esconder un mensaje de texto dentro de una imagen alterando, 
ligeramente los valores de los píxeles de la imagen, de manera que no sea 
perceptible a simple vista. Solo alguien que sepa que hay un mensaje oculto 
y cómo extraerlo podría acceder a él.

Es importante notar que, mientras la criptografía se centra en proteger la 
integridad y confidencialidad de un mensaje, la esteganografía se enfoca en 
mantener en secreto la existencia del mensaje. En algunas ocasiones, ambas 
técnicas se pueden combinar para proporcionar una capa adicional de seguridad.


## ¿Qué es el estegoanálisis?

El estegoanálisis es el proceso de detectar y, posiblemente, extraer 
información oculta mediante técnicas de esteganografía en un medio. Mientras 
que la esteganografía se centra en ocultar la existencia de un mensaje dentro 
de otro medio (como una imagen, audio o video), el estegoanálisis busca 
identificar y extraer esos mensajes ocultos.

En otras palabras, si la esteganografía es el arte de esconder, el 
estegoanálisis es el arte de descubrir lo escondido. Los expertos en 
estegoanálisis utilizan diversas técnicas y herramientas para detectar 
anomalías o patrones inusuales en un archivo que puedan indicar la 
presencia de un mensaje esteganográfico.

La razón principal para llevar a cabo estegoanálisis suele ser la seguridad. 
Por ejemplo, alguien podría estar transmitiendo información confidencial o 
maliciosa de manera encubierta utilizando técnicas de esteganografía. 
Aquí, surge también la importancia del estegoanálisis en la lucha contra el 
"stegomalware", que es un malware oculto dentro de archivos aparentemente 
benignos usando técnicas esteganográficas. A través del estegoanálisis, 
es posible detectar y contrarrestar tales amenazas, evitando así posibles 
compromisos de sistemas o filtraciones de datos.

En resumen, el estegoanálisis es esencialmente la contramedida a la 
esteganografía, permitiendo la detección y potencial extracción de datos 
ocultos en medios que, a simple vista, parecerían normales o no alterados.


## ¿Qué es el LSB? / ¿Qué es la esteganografía LSB?

LSB se refiere a "Least Significant Bit", que en español se traduce como 
"Bit Menos Significativo". Es el bit de menor peso en una representación 
binaria de un número. En términos simples, en un byte (que consta de 8 bits), 
el LSB es el bit más a la derecha.

La técnica LSB es ampliamente utilizada en esteganografía, especialmente en 
la esteganografía de imágenes. Consiste en modificar el bit menos significativo 
de los píxeles de una imagen para insertar un mensaje secreto. Dado que el LSB 
tiene un impacto mínimo en el valor numérico total de cada píxel, los cambios 
realizados en la imagen suelen ser imperceptibles al ojo humano, lo que la 
convierte en una técnica efectiva para ocultar información.

Por ejemplo, considera el siguiente byte que representa un valor de un píxel 
en una imagen en escala de grises: 10010101. Si quisieras esconder el bit 
"1" usando la técnica LSB, el byte quedaría igual, ya que el LSB ya es "1".
Pero si quisieras esconder el bit "0", se podría cambiar el LSB de "1" a "0",
resultando en 10010100. Aunque ha habido un cambio, la diferencia en el valor 
del píxel es mínima y, por lo tanto, difícilmente perceptible en la imagen.

Existen dos formas comunes de modificar el LSB de un valor: el 
[LSB replacement](#qué-es-el-lsb-replacement) y el 
[LSB matching](#qué-es-el-lsb-matching).

## ¿Qué es el LSB replacement?

El LSB replacement (o "Reemplazo de Bit Menos Significativo") es una técnica de 
[esteganografía LSB](#qué-es-el-lsb--qué-es-la-esteganografía-lsb)
que consiste en sustituir el LSB por el bit del mensaje que se desea ocultar.

Es importante destacar que, aunque el LSB Replacement es una técnica efectiva y 
fácil de implementar, no es la más segura. Las herramientas modernas de 
estegoanálisis pueden detectar la presencia de esteganografía realizada con 
este método.


## ¿Qué es el LSB matching?

El LSB Matching es una técnica de
[esteganografía LSB](#qué-es-el-lsb--qué-es-la-esteganografía-lsb)
que, al igual que el 
[LSB Replacement](#qué-es-el-lsb-replacement), 
se utiliza para ocultar información en los bits menos significativos de un 
archivo multimedia, como una imagen. 

Sin embargo, hay una diferencia clave en la forma en que se introduce la 
información secreta. Mientras que el "LSB Replacement" simplemente reemplaza 
el LSB de un píxel con un bit del mensaje secreto, el "LSB Matching" adopta 
un enfoque un poco más sofisticado: si el bit del mensaje secreto coincide con 
el LSB del píxel, el píxel permanece sin cambios. Si no coinciden, el valor del 
píxel se ajusta aleatoriamente sumando o restando uno a su valor.

Este método tiene la ventaja de introducir cambios menos sistemáticos en la 
imagen, lo que puede hacer que la detección de la esteganografía sea un poco 
más difícil en comparación con el simple reemplazo de LSB. Al introducir 
cambios aleatorios, el "LSB Matching" puede reducir las anomalías estadísticas 
introducidas por "LSB replacement", que pueden ser detectadas por 
herramientas de estegoanálisis.


## ¿Qué es la esteganografía F5?

La esteganografía F5 es una técnica de esteganografía diseñada para ocultar 
información en imágenes en formato JPEG. Esta técnica fue desarrollada por 
Andreas Westfeld en 2001.

En lugar de trabajar con píxeles directamente, la esteganografía F5 se centra 
en los coeficientes de la Transformada Discreta de Coseno (DCT) de una imagen 
JPEG, que representan la información de frecuencia de la imagen. 

Para mejorar la eficiencia y reducir la cantidad de cambios requeridos en los 
coeficientes, F5 utiliza una técnica llamada "matrix encoding" o codificación 
matricial. 

## ¿Qué es StegHide?

StegHide es una herramienta libre de esteganografía desarrollada por 
Stefan Hetzl en 2003. Su principal objetivo es ocultar información, como 
mensajes de texto o archivos, dentro de imágenes o archivos de audio sin causar 
una pérdida perceptible o alteraciones evidentes en el archivo portador. 
StegHide trabaja con imágenes en formato JPEG y archivos de audio.

StegHide usa la Teoría de Grafos para encontrar pares de valores que se 
pueden intercambiar, incrustando un mensaje, pero manteniendo la estadística
global del archivo. Esto le permite eludir algunos ataques de estegoanálisis.

## ¿En qué medios se puede usar esteganografía?

La esteganografía puede aplicarse en una variedad de medios o soportes 
digitales. A continuación, se presentan algunos de los medios más comunes en 
los que se puede utilizar la esteganografía:

- **Imágenes**: Uno de los medios más populares para la esteganografía. 
Las técnicas pueden variar desde simples métodos basados en el reemplazo del 
bit menos significativo (LSB) hasta métodos más complejos que involucran 
transformaciones de dominio de frecuencia, como la Transformada Discreta de 
Coseno (DCT) en imágenes JPEG.

- **Audio**: La información secreta puede ocultarse en archivos de audio en 
formas que son inaudibles para el oído humano. Esto puede hacerse, por ejemplo, 
modificando el LSB de las muestras de audio.

- **Video**: Dado que un archivo de video es esencialmente una serie de 
imágenes, las técnicas de esteganografía de imágenes pueden aplicarse a cada 
*frame*. Además, se pueden usar técnicas específicas para video, como modificar 
los datos de movimiento entre *frames*.

- **Texto**: Aunque es menos común debido a la menor cantidad de datos 
redundantes en el texto en comparación con otros medios, es posible ocultar 
información en textos mediante el uso de espacios adicionales, tabulaciones 
o cambios en la secuencia de caracteres. También es posible sustituir palabras
o grupos de palabras por sinónimos, de manera que codifiquen un mensaje diferente.

- **Protocolos de red**: La esteganografía puede usarse para ocultar información 
en paquetes de datos transmitidos por redes, manipulando ciertos campos o 
introduciendo deliberadamente anomalías que contienen datos ocultos, así como
alterando los tiempos de transmisión.

- **Archivos de sistema**: Algunos sistemas de archivos tienen áreas que no se 
utilizan comúnmente (como bloques de slack o metadatos) donde se puede ocultar 
información.

- **Documentos digitales**: En formatos como PDF o Word, es posible ocultar 
información en metadatos, espacios en blanco, o mediante el uso de colores de 
texto casi invisibles.


## ¿Qué son los ataques estructurales?

Aunque la esteganografía intenta ocultar información de manera imperceptible, 
el proceso de incrustación de datos puede introducir cambios en las 
características estructurales del objeto portador. Estos cambios, aunque pueden 
ser invisibles o inaudibles para el observador humano, pueden ser detectados 
mediante análisis estadístico.

Cuando se usan técnicas de [LSB replacement](/stego/intro/faq-es/#qué-es-el-lsb-replacement),
aparecen anomalías estadísticas importantes. La sustitución directa del LSB
solo puede convertir un valor par en el impar consecutivo, o un valor impar en
el par consecutivo. Por eso tiende a igualar las frecuencias dentro de pares de
valores consecutivos (por ejemplo, 0/1, 2/3, 4/5), alterando la distribución
natural de los píxeles.

Estas anomalías son aprovechadas por toda una familia de ataques conocidos
como "ataques estructurales", entre los que destacan el ataque SPA, el ataque RS
o el ataque WS.


## ¿Qué es el Cover Source Mismatch?

El Cover Source Mismatch (CSM) es un problema muy importante en estegoanálisis
que se produce al usar *machine learning* para crear modelos de detección 
de imágenes que usan esteganografía.  El problema se produce debido a que los 
modelos aprenden de los datos, por lo que un modelo entrenado con una base de 
datos de imágenes puede no funcionar correctamente con imágenes que proceden de
otra base de datos de imágenes, posiblemente, con unas características
estadísticas diferentes.

## ¿Qué son cover, stego y payload?

En esteganografía, el **cover** es el objeto original que se usa como portador:
por ejemplo, una imagen, un audio o un documento sin información oculta. El
**stego** es el objeto resultante después de incrustar el mensaje secreto.

El **payload** es la cantidad de información que se oculta. Suele medirse como
bits por píxel, bits por coeficiente, o como porcentaje de la capacidad del
medio. En general, cuanto mayor es el payload, más fácil es detectar que el
archivo ha sido modificado.

## ¿Qué son embedding y extraction?

**Embedding** es el proceso de incrustar un mensaje secreto dentro de un cover
para obtener un objeto stego. **Extraction** es el proceso inverso: recuperar el
mensaje oculto a partir del objeto stego.

En algunos métodos la extracción requiere conocer una clave, una contraseña o
parámetros específicos. Sin esa información, el mensaje puede no ser recuperable
aunque se sepa que el archivo contiene datos ocultos.

## ¿Qué es una clave esteganográfica?

Una clave esteganográfica es un valor secreto que controla cómo se incrusta o se
extrae el mensaje. Por ejemplo, puede determinar qué píxeles, coeficientes o
posiciones se usan para ocultar la información.

La clave no debe confundirse con una clave criptográfica, aunque ambas pueden
combinarse. Es habitual cifrar primero el mensaje y después incrustarlo mediante
un método esteganográfico controlado por una clave.

## ¿Qué diferencia hay entre esteganografía espacial y esteganografía JPEG?

La esteganografía espacial modifica directamente los valores de los píxeles de
una imagen, como ocurre con técnicas LSB sobre imágenes BMP o PNG sin pérdida.

La esteganografía JPEG trabaja sobre los coeficientes de la Transformada
Discreta de Coseno (DCT) que usa el formato JPEG. Esta diferencia es importante
porque JPEG es un formato con pérdida: recomprimir la imagen puede alterar o
destruir la información oculta.

## ¿Qué es la DCT?

La DCT, o Transformada Discreta de Coseno, es una transformación matemática que
representa una señal o imagen en términos de frecuencias. JPEG usa la DCT para
separar la información visual en componentes de baja y alta frecuencia.

En esteganografía JPEG, muchos métodos modifican coeficientes DCT en lugar de
píxeles. Técnicas como F5, nsF5, J-UNIWARD o StegHide incrustan directamente el
mensaje en el dominio transformado.

## ¿Qué es la esteganografía adaptativa?

La esteganografía adaptativa intenta ocultar información en las partes del cover
donde las modificaciones son menos detectables. En imágenes, esto suele implicar
preferir zonas con textura, bordes o ruido, y evitar regiones lisas donde un
cambio pequeño puede ser más evidente estadísticamente.

Los métodos adaptativos modernos suelen asignar un coste a cada posible cambio y
después incrustan el mensaje minimizando el coste total.

## ¿Qué es una función de coste?

Una función de coste asigna un valor a cada posible modificación del cover. Un
coste bajo indica que el cambio parece poco detectable; un coste alto indica que
el cambio podría dejar una huella estadística más clara.

Métodos como HILL, S-UNIWARD o J-UNIWARD se basan en funciones de coste para
decidir dónde conviene modificar la imagen. La calidad de esa función influye
directamente en la seguridad esteganográfica del método.

## ¿Qué es matrix encoding?

**Matrix encoding** es una técnica que permite incrustar varios bits de mensaje
realizando menos cambios en el cover. En lugar de modificar un elemento por cada
bit, se usa una estructura algebraica para elegir un cambio que codifique varios
bits a la vez.

F5 utiliza matrix encoding para reducir el número de modificaciones necesarias
en los coeficientes JPEG, lo que mejora su eficiencia y dificulta algunos tipos
de detección.

## ¿Qué son los wet paper codes?

Los **wet paper codes** son códigos usados en esteganografía cuando el emisor
puede elegir qué posiciones modificar, pero el receptor no necesita saber cuáles
eran modificables. La metáfora es la de escribir sobre un papel con zonas
"secas" y "mojadas": solo algunas posiciones pueden tocarse.

Este concepto es útil en esteganografía adaptativa, porque permite evitar
posiciones delicadas del cover y concentrar los cambios en zonas más seguras.

## ¿Qué son los syndrome-trellis codes (STC)?

Los **syndrome-trellis codes** (STC) son códigos prácticos para incrustar un
mensaje minimizando una función de coste. Se usan ampliamente en métodos
modernos de esteganografía porque permiten aproximarse de forma eficiente a una
solución de baja distorsión.

En términos simples, los STC ayudan a decidir qué cambios realizar para codificar
el mensaje produciendo la menor huella estadística posible según el modelo de
costes elegido.

## ¿Qué son los falsos positivos y falsos negativos?

En estegoanálisis, un **falso positivo** ocurre cuando una herramienta clasifica
como stego un archivo que en realidad no contiene información oculta. Un
**falso negativo** ocurre cuando un archivo stego pasa desapercibido y se
clasifica como cover.

Ambos errores son importantes. Un detector muy agresivo puede producir muchos
falsos positivos, mientras que un detector demasiado conservador puede dejar
pasar demasiados falsos negativos.

## ¿Qué es Aletheia?

**Aletheia** es una herramienta de estegoanálisis desarrollada para detectar y
analizar técnicas de esteganografía en imágenes. Incluye ataques contra métodos
clásicos y funciones para entrenar o aplicar modelos de detección.

Es especialmente útil como entorno práctico para experimentar con imágenes cover
y stego, evaluar detectabilidad y estudiar cómo funcionan distintos ataques.

## ¿Qué es StegoRank?

**StegoRank** es una clasificación de métodos y herramientas de esteganografía
centrada en su detectabilidad práctica. Su objetivo es ayudar a comparar técnicas
no solo por si permiten ocultar información, sino por lo fáciles o difíciles que
son de detectar con estegoanálisis.

La idea principal es que una herramienta esteganográfica no debería evaluarse
solo por su capacidad o facilidad de uso, sino también por la huella estadística
que deja en los archivos generados.





