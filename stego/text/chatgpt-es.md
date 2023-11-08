---
layout: page
title: "Esteganografía en texto con ChatGPT"
subtitle: "" 
noindex: false
meta-title: "Esteganografía en texto con ChatGPT"
meta-description: "Artículo acerca del uso de ChatGPT para realizar esteganografía en texto"
meta-keywords: "esteganografía, texto, ChatGPT"
lang-suffix: "-es"
---



> En este artículo vamos a ver cómo usar ChatGPT para realizar esteganografía
> en texto.

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

1. [Introducción](#introducción)
2. [ChatGPT y la esteganografía en texto](#chatgpt-y-la-esteganografía-en-texto)
3. [Ejemplo 1: una letra por frase](#ejemplo-1-una-letra-por-frase)
4. [Ejemplo 2: una letra por palabra](#ejemplo-2-una-letra-por-palabra)
5. [Ejemplo 3: uso de contraseña](#ejemplo-3-uso-de-contraseña)
5. [Conclusiones](#conclusiones)


<br>
## Introducción

La esteganografía en texto está presente desde los inicios de la esteganografía.
Sin embargo, ha tardado mucho en adaptarse al mundo digital. Así como la 
esteganografía en otros medios, como las imágenes o el audio, o incluso los
protocolos de red, ha sido algo relativamente sencillo, no podemos decir
lo mismo del texto.

No es que hacer esteganografía en texto sea complicado. No lo es, ni mucho
menos, pero lo que sí que es, es tedioso y lento. Hacer esteganografía es
difícil de automatizar, puesto que si el texto se ve alterado de forma poco
natural, resulta evidente que algo ocurre. Y claro, la esteganografía pierde
su objetivo principal: pasar desapercibida. 

Sin embargo, con la aparición de los 
[LLM](https://es.wikipedia.org/wiki/LLM_\(modelo_grande_de_lenguaje\))
y de herramientas como [ChatGPT](https://chat.openai.com/) esto ha dejado
de ser un problema. 

<br>
## ChatGPT y la esteganografía en texto

Usar ChatGPT para esconder información en un texto es tan sencillo como
pedírselo con el *prompt* adecuado. En algunos casos ChatGPT puede cometer
algunos errores, por lo que es necesario pedírselo de nuevo. Aunque es de
esperar que con el tiempo vaya mejorando (Los ejemplos que se ponen a lo largo 
del artículo se han realizado con GPT-4).

Vamos a empezar con un ejemplo sencillo: un texto
[acróstico](https://es.wikipedia.org/wiki/Acr%C3%B3stico), es decir, un texto
o composición poética en el que la primera letra de cada verso u oración 
forma parte del mensaje.

> **PROMPT:** Escribe un acróstico que oculte el mensaje "Hello World". 
> Marca en negrita las letras que forman parte del mensaje.
> Asegúrate de que todo el texto está en español.


![Acróstico](/stego/blog/resources/chatgpt1.png?style=centerme)


Aquí se ha tenido que añadir al *prompt* una instrucción para que escriba
todo el texto en español, puesto que ocasionalmente escribía parte del 
texto en inglés.

A continuación, vamos a ver algunos ejemplos en los que pediremos a ChatGPT
que oculte mensajes en los textos generados.


<br>
## Ejemplo 1: una letra por frase

ChatGPT no suele funcionar bien si le pedimos que inserte las letras del 
mensaje en posiciones intermedias. Por lo que una buena opción consiste en
seguir con la misma idea que los acrósticos. Veamos un ejemplo un poco 
más realista.


> **PROMPT**:
> Escribe un texto explicando como funciona un motor de combustión.
> Escribe texto de manera que cada frase empiece con una letra del mensaje 
> secreto: "ATAQUE AL AMANECER". 
> Escribe el texto en un solo párrafo, sin puntos y aparte.
> Marca en negrita las letras del mensaje secreto.


![Ejemplo 1](/stego/blog/resources/chatgpt2.png?style=centerme)


Como se puede ver, ChatGPT hace perfectamente lo que se le ha pedido.
A continuación, veremos un ejemplo más complicado.


<br>
## Ejemplo 2: una letra por palabra


En este punto puede ser interesante intentar aumentar la capacidad, de manera
que aumente el ratio de letras ocultas por palabra o por frase. Podemos,
por ejemplo, pedir a ChatGPT que use todas las palabras. 

Esto no suele funcionar muy bien, de hecho ChatGPT ya nos informa de que es
todo un desafío. Veamos un ejemplo:

> **PROMPT**:
> Escribe un texto explicando como funciona un motor de combustión.
> Escribe texto de manera que cada palabra empiece con una letra del mensaje 
> secreto: "ATAQUE AL AMANECER". 
> Escribe el texto en un solo párrafo, sin puntos y aparte.
> Marca en negrita las letras del mensaje secreto.


![Ejemplo 2](/stego/blog/resources/chatgpt3.png?style=centerme)


Si bien el resultado es el esperado, la frase se ve muy forzada y resulta 
poco natural. Se podrían buscar soluciones intermedias, que oculten
dos o tres letras por frase, pero resulta complicado con la versión
actual de ChatGPT, pues no es capaz de contar letras o palabras 
correctamente. Quizás versiones futuras puedan hacer este tipo de tareas.


<br>
## Ejemplo 3: uso de contraseña

No texto esteganográfico en el que cada frase empieza con una letra del
mensaje es fácil de detectar. Por ello, es interesante cifrar el mensaje
que ocultamos. Como trabajamos con texto, necesitamos un cifrado que nos
dé como resultado letras que podamos ocultar. 

Existen múltiples formas de hacer esto. Una podría ser usar una clave 
compartida entre emisor y receptor formada por caracteres del abecedario
español y sumarlos módulo 27.

Por ejemplo, si la clave compartida es "AXGUYPLÑOTGJKRWP" haríamos el 
cifrado de la siguiente manera:


**Primero representamos las letras con números:** 
A=0, B=1, ..., Ñ=14, ..., Z=26.

**Hacemos lo mismo con el mensaje:**
A(0) T(20) A(0) Q(17) U(21) E(4) A(0) L(11) A(0) M(12) A(0) N(13) E(4) C(2) E(4) R(18)


**Hacemos lo mismo con la clave:**
A(0) X(24) G(6) U(21) Y(25) P(16) L(11) Ñ(14) O(15) T(20) G(6) J(9) K(10) R(18) W(23) P(16)

**Sumamos el mensaje con la clave módulo 27:**
A(0) Q(17) G(6) L(11) S(19) T(20) L(11) Y(25) O(15) F(5) G(6) V(22) Ñ(14) T(20) A(0) H(7)

El mensaje cifrado es: AQGLSTLYOFGVÑTAH


**Vemos un resumen en la tabla siguiente:**

| MENSAJE EN CLARO | ATAQUEALAMANECER |
| CLAVE | AXGUYPLÑOTGJKRWP |
| MENSAJE CIFRADO | AQGLSTLYOFGVÑTAH|


Ahora ya podemos pedir a ChatGPT que genere el nuevo texto, ahora usando
el mensaje cifrado.

> **PROMPT**:
> Escribe un texto explicando como funciona un motor de combustión.
> Escribe texto de manera que cada frase empiece con una letra del mensaje 
> secreto: "AQGLSTLYOFGVNTAH". 
> Escribe el texto en un solo párrafo, sin puntos y aparte.
> Marca en negrita las letras del mensaje secreto.



![Ejemplo 3](/stego/blog/resources/chatgpt4.png?style=centerme)

Cabe destacar que he sustituido la Ñ por una N, pues resulta complicado
encontrar una palabra que empiece por Ñ. Para el cifrado podría ser 
interesante usar mensajes y alfabetos sin Ñ.

Ahora, como se puede observar, ya no es posible obtener el mensaje oculto
si no se dispone de la clave. Ni siquiera parece posible detectar el uso de 
esteganografía.


<br>
## Conclusiones

Con plataformas avanzadas como ChatGPT, ahora podemos crear métodos 
de esteganografía en texto de calidad. Aunque aún hay un largo camino por 
recorrer, especialmente en cuanto a ampliar la capacidad, lo presentado es 
una muestra prometedora de lo que está por venir. Sin duda, la esteganografía 
en texto va a dar de qué hablar, pues no parece que vaya a ser fácil de 
detectar.











