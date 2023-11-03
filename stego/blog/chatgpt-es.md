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
3. [Algunos ejemplos](#algunos-ejemplos)
4. [Uso de contraseña](#uso-de-contraseña)


<br>
## Introducción

La esteganografía en texto está presente desde los inicios de la esteganografía.
Sin embargo, ha tardado mucho en adaptarse al mundo digital. Así como la 
esteganografía en otros medios, como las imágenes o el audio, o incluso los
protocolos de red, ha sido algo relativamente sencillo, no podemo decir
lo mismo del texto.

No es que hacer esteganografía en texto sea complicado. No lo es, ni mucho
menos, pero lo que sí que es, es tedioso y lento. Hacer esteganografía es
difícil de automatizar, puesto que si el texto se ve alterado de forma poco
natural, resulta evidente que algo ocurre. Y claro, la esteganografía pierde
su objetivo principal: pasar desapercibida. 

Sin embargo, con la aparción de los 
[LLM](https://es.wikipedia.org/wiki/LLM_\(modelo_grande_de_lenguaje\))
y de herramientas como [ChatGPT](https://chat.openai.com/) esto ha dejado
de ser un problema. 

<br>
## ChatGPT y la esteganografía en texto

Usar ChatGPT para esconder información en un texto es tan sencillo como
pedírselo con el *prompt* adecuado. En algunos casos ChatGPT puede cometer
algunos errores, por lo que es necesario pedírselo de nuevo. Aunque es de
esperar que con el tiempo vaya mejorando (Los ejemplos que se ponene a lo largo 
del artículo se han realizado con GPT-4).

Antes de entrar de lleno en materia, veamos un ejemplo sencillo. Usaremos un
[acróstico](https://es.wikipedia.org/wiki/Acr%C3%B3stico), es decir un texto
o composición poética en el que la primera letra de cada verso u oración 
forma parte del mensaje.

> **PROMPT:** Escribe un acróstico que oculte el mensaje "Hello World". 
> Marca en negrita las letras que forman parte del mensaje.
> Asegúrate de que todo el texto está en español.


![Acróstico](/stego/blog/resources/chatgpt1.png?style=centerme)


Aquí se ha tenido que añadir al *prompt* una instrucción para que escriba
todo el texto en español, puesto que ocasionalmente escribía parte del 
texto en inglés.


<br>
## Algunos ejemplos

ChatGPT no suele funcionar bien si le pedimos que inserte las letras del 
mensaje en posiciones intermedias. Por lo que una buena opción consiste en
seguir con la misma idea que los acrósticos. Veamos un ejemplo un poco 
más realista.












<br>
## Uso de una contraseña








