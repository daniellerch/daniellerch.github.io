---
layout: page
title: "¿Qué es la esteganografía?"
subtitle: "" 
noindex: false
meta-title: "¿Qué es la esteganografía?"
meta-description: "Introducción a la esteganografía, conceptos básicos, ejemplos y un poco de historia"
lang-suffix: "-es"
---

> En este artículo vamos a ver qué es la esteganografía y sus usos más comunes.
> También vamos a estudiar algunos conceptos básicos y a conocer un poco 
> de su historia.



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

1. [¿Qué es la esteganografía?](#qué-es-la-esteganografía)
2. [Aplicaciones prácticas](#aplicaciones-prácticas)
3. [Esteganografía a lo largo de la historia](#esteganografía-a-lo-largo-de-la-historia)
4. [Esteganografía en texto](#esteganografía-en-texto)
5. [Esteganografía en imágenes, audio y vídeo](#esteganografía-en-imágenes-audio-y-vídeo)
6. [Esteganografía en protocolos de red](#esteganografía-en-protocolos-de-red)
7. [Esteganografía en redes sociales](#esteganografía-en-redes-sociales)
8. [Algunas herramientas de esteganografía](#algunas-herramientas-de-esteganografía)




<br>
## ¿Qué es la esteganografía?

La **esteganografía** es la ciencia que estudia la inserción de 
**mensajes ocultos** en otros medios (portadores o cubierta) de manera que no 
se perciba su existencia. La palabra esteganografía procede del griego 
*στεγανος* *steganos* ("cubierto" u "oculto") y *γραφος* *graphos* 
("escritura"), por lo que se podría traducir como "escritura oculta".

El objetivo principal de la esteganografía es, por lo tanto, 
**no ser detectado**. Resulta ilustrativo compararla con la criptografía,
cuyo objetivo principal que un agente externo pueda leer el mensaje. La
esteganografía podría considerarse una capa adicional de seguridad, mediante
la cual, no solo ocultamos el mensaje, sino que además ocultamos incluso el
hecho de que la comunicación está teniendo lugar.

Por otra parte, el **estegoanálisis** estudia diferentes técnicas y algoritmos
para la detección del uso de esteganografía. Es conveniente tener en cuenta,
que cuando un método de esteganografía es **detectable** mediante técnicas de
**estegoanálisis**, se considera que el método está roto y que, por lo tanto,
**no es seguro**. Sin embargo, esto no supone tener acceso al contenido del 
mensaje. De ello se ocupa la **esteganografía forense**. Y si la esteganografía
forense tiene éxito y es capaz de extraer el mensaje, es probable que
esté cifrado. Lo que nos llevaría al terreno del criptoanálisis. 


<br>
## Aplicaciones prácticas

El principal uso de la esteganografía consiste en evitar que alguien pueda
saber que se está comunicando un mensaje. Puede ser usado por activistas de 
derechos humanos o disidentes políticos en un país totalitario en el que
se **monitorizan las comunicaciones**, para comunicar al exterior la situación 
del país. También puede ser usada por delincuentes para transmitir información
sensible, como para extraer secretos en **espionaje industrial**, para compartir
los detalles de un **ataque terrorista**, etc. Otra aplicación destacable es la
de ocultar parte del código y/o la configuración de un *malware*. Este tipo
de *malware* suele conocerse como **stegomalware**.

En esteganografía, el medio usado más frecuentemente como cubierta son las
**imágenes**. El motivo por el que son tan populares es que contienen una gran
cantidad de información aparentemente aleatoria entre la que se pueden
ocultar la información. Por ello, otros medios similares, también muy 
interesantes para ocultar información son el **audio** y el **vídeo**.

Pero estos nos son los únicos medios cubierta usados. Un de los medios más
antiguos es el **texto**, y existen multitud de técnicas que permiten ocultar un
mensaje secreto en un texto aparentemente inocuo. 

Otro medio popular son los **protocolos de red**. En ocasiones, es posible 
aprovechar el protocolo de comunicaciones implementado por un software para,
realizar pequeñas alteraciones que permiten comunicar información adicional
sin ser detectado. Este tipo de canal de comunicación suele conocerse como
**canal encubierto**.

Recientemente, con el auge de las **redes sociales**, han aparecido nuevas 
formas de ocultar información en ellas. Por ejemplo, mediante el sudo de
*retweets*, *likes*, etc.


<br>
## Esteganografía a lo largo de la historia

La esteganografía es posiblemente la rama más antigua de
**Seguridad de la Información**. Los primeros casos de esteganografía de los que 
se tiene constancia proceden de la Antigua China, donde para enviar un mensaje 
secreto se escribía en seda o en un papel extremadamente delgado y se hacía una 
bolita con el, recubríendolo a continuación de cera. El mensajero escondía la 
bolita en algún lugar de su cuerpo: a veces se lo tragaba o se lo introducía 
en el recto. De esta manera se podía viajar transportando el mensaje sin 
levantar sospechas.

En las [historias de Herodoto](https://en.wikipedia.org/wiki/Histories_(Herodotus)) 
(430 a.C.)
podemos encontrar diferentes casos de esteganografía. Se cuenta que Demarato,
hijo de Aristón, estando exiliado en Persia, se enteró de que Jerjes había
decidido invadir Grecia. Decidió transmitir esta información a Esparta, pero
tenía que evitar ser descubierto. Para ello usó unas tablas de madera cubiertas
de cera, que se usaban para escribir. Raspó la cera, escribió el mensaje en la 
madera y cubrio la madera de nuevo con cera, como si fuese una tablilla sin usar.

<img style='display:block;margin:0 auto;width:60%' 
     src='/stego/lab/intro/resources/wax_tablet.jpg'/>
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from <a href='https://commons.wikimedia.org/wiki/File:Table_with_was_and_stylus_Roman_times.jpg'>Wikipedia</a>
</p>


Otra historia popular de Herodoto cuenta que Histieo, para enviar un mensaje
desde la corete persa a su yerno el tirano Aristágoras de Mileno, afeitó la
cabeza de un esclavo de confianza, tatuó el mensaje secreto en ella y 
espero a que le creciese de nuevo el cabello. A continuación, envió al 
esclavo a su yerno. Al afeitar la cabeza del esclavo, Aristágoras pudo leer
el mensaje, en el que se le instaba a rebelarse contra Persia.



<hr>


Una de las formas más simples de esteganografía, para la que hay muchos ejemplos antiguos, son los textos acrósticos, en los que se usa la primera letra de cada frase para formar un texto oculto. 

Un acróstico célebre de la lengua española está formado por los versos que aparecen en el prólogo de [La Celestina](http://es.wikipedia.org/wiki/La_Celestina) (1499), de [Fernando de Rojas](http://es.wikipedia.org/wiki/Fernando_de_Rojas). 

> **E**l silencio escuda y suele encubrir<br/>
> **L**as faltas de ingenio en las torpes lenguas;<br/>
> **B**lasón que es contrario publica sus menguas<br/>
> **A**l que mucho habla sin mucho sentir.<br/>
> **C**omo la hormiga que deja de ir<br/>
> **H**olgando por tierra con la provisión,<br/>
> **I**actóse con alas de su perdición:<br/>
> **L**Leváronla en alto, no sabe dónde ir.<br/>
> **E**l aire gozando, ajeno y extraño,<br/>
> **r**apiña es ya hecha de aves que vuelan;<br/>

A partir de este inocente pasatiempo, el abad alemán Johannes Trithemius 
(1462 - 1516) creó una completa disciplina que plasmó en su libro 
[Steganographia](https://en.wikipedia.org/wiki/Steganographia)
en el año 1499. Sin embargo, no lo hizo de una forma clara e instructiva, sino 
que ocultó sus conocimientos dentro de un texto en forma de tratado para la 
invocación de espíritus. Tal fue el desconcierto entre sus contemporáneos que
en 1609 su manuscrito fue incluido en el *Index Librorum Prohibitorum*, una 
lista de publicaciones que la iglesia católica catalogó como libros perniciosos 
para la fe y que los católicos no estaban autorizados a leer. Una consecuencia 
de esto fue que la Steganographia de Tritemio no se tradujo a idiomas modernos 
hasta recientemente y no recibió el análisis histórico merecido. De hecho, 
todavía hoy es considerado por muchos un libro de espiritismo.
*Steganographia* estuvo en el *Index Librorum Prohibitorum* hasta el 1900.

<img style='display:block;margin:0 auto;width:50%' 
     src='/stego/lab/intro/resources/steganographia.jpg'/>
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from <a href='https://commons.wikimedia.org/wiki/File:Trithemius-Johannes-Steganographia-Johannes-Saurius,-1608.-Digitized-photographic-reproduction-provided-by-the-Herzog-August-Bibliothek.jpg'>Wikipedia</a>
</p>


Veamos un extracto del primer capítulo, titulado "Operación y clave realizadas 
por el espíritu principal Parmesiel". En este capítulo se nos introduce al uso 
de espíritus para la realización de comunicaciones a distancia:


> **la clave y la operación está en manos del príncipe espiritual 
> *Pamersyel, anoyr madriel*, con la ayuda de 
> *ebra sothean abrulges itrasbiel*. Y *nadres ormenu itules rablion 
> hamorphiel*. Al principio se les hace una propuesta con un exorcismo.**


> La operación de este primer capítulo es muy difícil y llena de peligro 
> debido a la arrogancia y la rebelión de sus espíritus que no obedecen a 
> nadie, salvo a él, que es el más hábil en este arte. Porque no solo 
> desobedecen a los novatos y a los menos probados en este arte, sino que 
> a menudo molestan y atacan con diversas ilusiones a quienes los presionan 
> demasiado. Son maliciosos e indignos de confianza sobre todos los demás 
> espíritus aéreos y no obedecen a nadie por completo a menos que se vean 
> obligados por los ritos más poderosos. A menudo revelan infielmente a 
> otros el secreto que se les ha confiado, ya que tan pronto como han sido 
> enviados con sus cartas, vuelan y se precipitan sobre él a quien fueron 
> enviados, completamente sin orden, como una mafia que huye de un país. 
> batalla sin ningún líder. Enojados, se apresuran y, al llenar el aire con 
> sus gritos, a menudo revelan los secretos del remitente a todos los que lo 
> rodean. [...] A continuación, [...] mirando hacia el Este, que convoque 
> a los espíritus así:


> *Pamerſiel oshurmy delmuſon Thafloyn peano charuſtea melany, lyaminto colchan, paroys, 
> madyn, moerlay, bulre † atloor don melcoue peloin, ibutſyl meon mysbreath alini driaco 
> perſon. Criſolnay, lemon aſosle mydar, icoriel pean thalmō, aſophiel il notreon banyel ocrimos 
> eſteuor naelma beſrona thulaomor fronian beldodrayn bon otalmeſgo mero fas elnathyn 
> boſramothdiv.*



No cabe duda, que un lector despistado que se encuentre con este texto, va a 
tomarlo irremediablemente por un libro de magia, espiritismo, brujería o similar. 
Un libro orientado, como en él se explica, al uso del poder de los espíritus 
para comunicar mensajes de forma secreta. 

Sin embargo, como veremos a continuación, el libro de Trithemius contiene mucho 
más que conjuros y espíritus.


Veamos el supuesto conjuro que nos permite convocar a los espíritus. Si tomamos 
únicamente la segunda de cada par de palabras, y de esas palabras, tomamos 
únicamente la segunda letra de cada par, encontramos un mensaje oculto: 


> Pamerſiel o**s**h**u**r**m**y delmuſon **T**h**a**f**l**o**y**n peano **c**h**a**r**u**ſ**t**e**a** melany, **l**y**a**m**i**n**t**o colchan, **p**a**r**o**y**s, 
> madyn, **m**o**e**r**l**a**y**, bulre † a**t**l**o**o**r** don m**e**l**c**o**u**e peloin, **i**b**u**t**ſ**y**l** meon m**y**s**b**r**e**a**t**h alini **d**r**i**a**c**o 
> perſon. **C**r**i**ſ**o**l**n**a**y**, lemon a**ſ**o**s**l**e** mydar, i**c**o**r**i**e**l pean **t**h**a**l**m**ō, aſophiel **i**l **n**o**t**r**e**o**n** banyel o**c**r**i**m**o**s 
> eſteuor **n**a**e**l**m**a beſrona **t**h**u**l**a**o**m**o**r** fronian b**e**l**d**o**d**r**a**y**n** bon o**t**a**l**m**e**ſ**g**o mero fas **e**l**n**a**t**h**y**n 
> boſramothdiv. 

El mensaje, en latín, es el siguiente:

> sum taly cautala it pryme lytore cuiuslybet diccionys secretam intencionem tuam reddant legenty

Que significa:

> Ten cuidado las primeras letras de cada palabra le devuelven al lector el significado secreto.


Es decir, el conjuro es una clave que deben conocer emisor y receptor, y que 
nos indica qué letras del mensaje cubierta debemos tener en cuenta para leer
el mensaje oculto. En el libro se proponen diferentes conjuros que dan lugar
a diferentes tipos de claves, que nos permitirán saber que letras del texto
cubierta se han usado. Así, la clave anterior nos indica que en el texto 
cubierta que se envíe, la primera letra de cada palabra formará el mensaje 
oculto.

Sin embargo, en ninguna parte del libro se explica como extraer el mensaje
oculto en los conjuros. Por lo que hasta que el lector no lo averigua por
si mismo, no puede empezar a entender el libro de Trithemius.


<hr>

Un método de esteganografía mucho más sencillo y práctico fue el propuesto
por [Girolamo Cardano](https://en.wikipedia.org/wiki/Gerolamo_Cardano) 
(1501 - 1576). Este método, conocido como la
[rejilla de Cardano](https://en.wikipedia.org/wiki/Cardan_grille)
consiste en una lámina o tabla en la que se realizan una serie de agujeros
rectanculares, a intervalos irregulares. El emisor, coloca la rejilla
sobre un papel y escribe el mensaje secreto a través de los agujeros.
A continuación, retira la rejilla y rellena el papel con un mensaje inocuo,
haciendo que las letras del mensaje oculto formen parte de el. El receptor,
que deberá tener una rejilla igual que la del emisor, solo tiene que colocarla
sobre el texto cubierta para poder leer el mensaje secreto a través de los 
agujeros.


<img style='display:block;margin:0 auto;width:60%' 
     src='/stego/lab/intro/resources/cardano_grille.png'/>
<p style='text-align:center;font-size:12px;font-weight:bold;margin-top:-10px'>
   Image from <a href='https://commons.wikimedia.org/wiki/File:CardanGrille.png'>Wikipedia</a>
</p>

<hr>

A lo largo de la historia se han usado multitud de métodos de esteganografía,
a cuál más imaginativo. Pero si hay uno que ha sido usado extensivamente
a lo largo de los años, y que ha ido evolucionando con la ciencia, sin duda
es la **tinta invisible**. Uno de los primeros casos documentados procede de 
Filón de Bizancio (280 BC - 220 BC) usando agallas de roble y vitriolo.
Uno de los ingredientes permití escribir de forma invisible, mientras que el
otro hacía aparecer la escritura. Son muchas las fórmulas inventadas a lo largo
de los años para la escritura invisible. Algunas, incluso matenidas en secreto
por agencias gubernamentales y usadas extensivamente por servicios de 
espionaje. 

Otra técnica usada extensivamente y mejorada a lo largo de los años son los
**micropuntos**. Un micropunto es un texto o una imagen reducida en tamaño para
evitar su detección. Los micropuntos pueden tener difernetes formas y tamaños,
y estar hechos de diferentes materiales. El nombre procede de que el tamaño
de un micropunto suele ser como el de un punto tipográfico.
En 1925, Emanuel Goldberg, presentó un método para producir micropuntos que
permitía representar una página de texto de forma legible en una superficie
aproximada de 0,01 mm². Desde entonces, este tipo de técnicas no ha hecho
más que mejorar. Durante la Primera y la Segunda Guerra Mundial, los micropuntos
fueron usados habitualmente en espionaje.


Actualmente, en la era digital, la esteganografía es capaz de ocultar
información en casi cualquier tipo de archivo. Sin embargo, los preferidos
son aquellos que además de permitir ocultar información, permiten hacerlo
de la manera más segura posible. A continuación, vamos a ver algunos
ejemplos comunes de esteganografía.




<br>
## Esteganografía en texto


<br>
## Esteganografía en imágenes, audio y vídeo



<br>
## Esteganografía en protocolos de red


<br>
## Esteganografía en redes sociales


<br>
## Algunas herramientas de esteganografía








