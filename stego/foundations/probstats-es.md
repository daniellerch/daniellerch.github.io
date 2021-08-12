---
layout: page
title: Fundamentos de Probabilidad y Estadística
subtitle: "" 
noindex: true
submenu: true
submenuitem1: "<a href='/stego/aletheia/probstats-en'>en</a>"
submenuitem2: "| es"
meta-title: "Fundamentos de Probabilidad y Estadística"
meta-description: "Artículo que explica algunos conceptos básicos de probabilidad y estadística útiles para la esteganografía"
---

> En este artículo vamos a ver algunos conceptos básicos de probabilidad y 
> estadística útiles para la esteganografía.


<p style='color:red;font-weight:bold'>
    Este artículo está en desarrollo. Vuelve otro día ;)
</p>


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
2. [Teorema de Bayes](#teorema-de-bayes)
3. [Referencias](#referencias)


<br>
## Introducción

Usaremos la la expresión $p(A)$ para indicar la probabilidad de que un evento $A$ sea cierto. Se cumplirá que $0 \le p(A) \le1$, por lo que $p(A)=0$ indicará que el evento no ocurrirá y $p(A)=1$ indicará que el evento ocurrirá seguro. 


### Probabilidad conjunta

Definimos la **probabilidad conjunta** de dos eventos $A$ y $B$ como:

<p>
$$p(A,B)=p(A \land B) = p(A|B)p(B) \label{joint-probability}$$
</p>

También se conoce a (\ref{joint-probability}) como **la regla del producto**.


### Probabilidad marginal

Dada una distribución conjunta de dos eventos $A$ y $B$, definimos la **probabilidad marginal** como:

<p>
$$p(A) = \sum_b p(A,B) = \sum_b p(A|B=b)p(B=b) \label{marginal-probability}$$
</p>


También se conoce a (\ref{marginal-probability}) como **la regla de la suma** o **la regla de la probabilidad total**.


### Probabilidad condicional 

Definimos **probabilidad condicional** de un evento $A$, para un evento $B$ cierto como:

<p>
$$p(A|B) = \frac{ p(A,B) }{ p(B) } \label{conditional-probability}$$
</p>


### Teorema de Bayes

Partiendo de la definición de **probabilidad condicional** y de la **probabilidad conjunta**, obtenemos:

<p>
$$p(A|B) = \frac{ p(B|A)p(A) }{ p(B) } \label{bayes}$$
</p>

Llamaremos **posterior** a $p(A\|B)$, **likelihood** a $(B\|A)$ y **prior** a $p(B)$.



Expresaremos como $p(X=x)$ la probabilidad de que una **variable aleatoria** $X$ tome como valor $x$. Llamando a $p()$ la **función de masa de probabilidad** (PMF), que cumple que $0 \le p(x) \le 1$ y $\sum_x p(x)=1$. Por lo que, dadas dos variables aleatorias $X$ e $Y$, podemos reescribir el teorema de Bayes como:

<p>
$$p(Y=y|X=x) = \frac{ p(X=x|Y=y)p(Y=y) }{ p(X=x) } \label{bayes2}$$
</p>






### Ejemplo de clasificación

Supongamos que tenemos los siguientes datos, en los que $X$ representa las muestras de una variable unidimensional e $Y$ su etiqueta o clase a la que pertenece.

| **X** | 0 | 1 | 2 | 0 | 0 | 1 | 2 | 2 | 0 | 2 | 0 | 1 | 1 | 2 |
| **Y** | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 |


Si queremos saber la probabilidad de que una nueva muestra $x=0$ tenga $y=1$, es decir $p(Y=1\|X=0)$, podemos usar el teorema de Bayes:

<p>
$$p(Y=1|X=0) = \frac{ p(X=0|Y=1) p(Y=1) }{ p(X=0) } \nonumber $$
</p>

Tal y como vemos en la tabla de datos, de los 14 casos hay 5 casos en los que $X=0$. Por lo tanto $p(X=0)=5/14=0.3571$.

De forma similar, calculamos el *prior* sabiendo que de los 14 casos, hay 9 en los que $Y=1$: $p(Y=1)=9/14=6428$.

Para calcular el *likelihood*, vemos que hay 9 casos en los que $Y=1$. De ellos, hay 3 casos en los que $X=0$. Por lo tanto $p(X=0\|Y=1)=3/9=0.3333$.

Finalmente, podemos calcular la probabilidad de que $p(Y=1\|X=0)$ usando el teorema de Bayes: 

<p>$$p(Y=1|X=0)=\frac{0.3333 \times 0.6428}{0.3571}=0.5998 \nonumber$$</p>






### Referencias:

1. Machine Learning. A Probabilistic Perspective. Kevin P. Murphy. MIT Press. 2012.







