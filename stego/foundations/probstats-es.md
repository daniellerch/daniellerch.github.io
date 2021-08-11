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
$$
\begin{align}
   p(A|B) = \frac{ p(B|A)p(A) }{ p(B) }
   \label{bayes}
\end{align}
$$

Referencia $\ref{bayes}$.
</p>






<hr>
Llamamos **likelihood** a $p(X\|Y)$, **prior** a $p(Y)$ y **posterior** a $p(Y\|X)$.
<hr>

Expresaremos como $p(X=x)$ la probabilidad de que una **variable aleatoria** $X$ tome como valor $x$. Llamamos a $p()$ la **función de masa de probabilidad** (PMF), que cumple que $0 \le p(x) \le 1$ y $\sum_x p(x)=1$.








### Referencias:

1. Machine Learning. A Probabilistic Perspective. Kevin P. Murphy. MIT Press. 2012.







