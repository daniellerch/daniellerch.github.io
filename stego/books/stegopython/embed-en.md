---
layout: page
title: "Steganography for Python Programmers"
subtitle: "Embedding Techniques" 
noindex: false
meta-title: "Steganography for Python Programmers: Embedding Techniques"
meta-description: "Chapter 'Embedding Techniques' from the book 'Steganography for Python Programmers'"
meta-keywords: "steganography, Python"
lang-suffix: "-en"
comments: true
---

<center style='margin-bottom:30px'>
[ &nbsp; <a href='/books-en'>Index</a> ]
</center>

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

## Contents

1. [Embedding Hidden Information](#embedding-hidden-information)
2. [Minimizing the Impact of Embedding](#minimizing-the-impact-of-embedding)
    1. [Bit Embedding in the LSB](#bit-embedding-in-the-lsb)
    2. [Embedding More Bits with Fewer Modifications](#embedding-more-bits-with-fewer-modifications)
    3. [Matrix Embedding](#matrix-embedding)
    4. [How to Avoid Detectable Areas](#how-to-avoid-detectable-areas)

<br>

## Embedding Hidden Information

The main objective of steganography is to go unnoticed, with **undetectability** being its most crucial property. However, this characteristic largely depends on the amount of information that is hidden. For example, modifying a single bit across an entire image is practically impossible to detect, whereas changing one bit in every pixel of the image could be easily detectable. Therefore, there is a trade-off between the amount of information that can be hidden and the degree to which the use of steganography in a medium can be detected. We will explore this trade-off in the section **Minimizing the Impact of Embedding**, where we analyze how to minimize the number of modifications required to embed information. Note that undetectability is also related to how the statistical properties of the medium are altered—for example, the statistical properties of images, audio, etc. We will study these aspects later, in the chapters dedicated to each medium.

In this chapter, we focus on how to embed the bits of a message within a sequence of numbers, typically integers. Our approach will be generic and applicable regardless of the type of medium these numbers come from. In later chapters, we will see how these numbers may correspond to different types of data: from the bytes that form the pixels of an image, to the samples of an audio signal, or the coefficients used in JPEG-compressed images, among others. While some medium-specific adjustments may be required, the embedding techniques we apply are fundamentally the same.

Throughout this chapter we will work with data organized as lists, or one-dimensional vectors. In future chapters, we will address more complex data structures. For example, images are often represented in two-dimensional or three-dimensional formats, especially when color is included. However, this does not affect our current approach, since any multidimensional vector can be transformed into a one-dimensional list and vice versa.

In this context, we will refer to *cover* vectors as those values extracted directly from the original medium without alteration, whereas *stego* vectors are those that have been modified to incorporate the desired information into the cover vector.

<br>
## Minimizing the Impact of Embedding

Undetectability is the most important property of steganography. When a steganographic method is detectable, its use ceases to make sense. If we know that an attacker can easily determine that we are using steganography, then steganography loses its value. We might as well use cryptography, which already prevents an attacker from reading the message, sparing ourselves the added technical complexity introduced by steganography. For this reason, we must study how the use of steganography can be detected so that we can develop techniques that make our methods harder to detect.

We begin by studying how to modify a medium without destroying its content—that is, how to make minimal modifications that allow us to embed information without altering the content so much that the user perceives it.

We continue by studying different coding techniques that allow us to increase the amount of hidden information while reducing the number of modifications made. These techniques are very useful because, with fewer alterations for the same amount of information, the method will be harder to detect.

Finally, we study different methods that allow us to avoid certain areas of the medium during embedding. These techniques let us analyze the medium before hiding the message in order to decide which parts are safer for embedding information and which parts should not be modified because doing so would be too detectable.

<br>
### Bit Embedding in the LSB

When we embed information in a medium, the first thing we need to know is how to do it without destroying the content of the medium. For example, if we modify the pixels of an image or the samples of an audio signal, we do not want the user to perceive those alterations. If, due to embedding a message, the image is visually degraded or the audio sounds wrong, the steganography method is not doing its job.

The smallest modification we can make to a numerical value—usually an integer—is a change by one unit, that is, adding or subtracting 1. Depending on the medium we are working with, we might be able to make larger modifications, which would allow us to embed more information. But for now, we are interested in undetectability. And for that, the less we modify the data of the medium, the better.

Modifying an integer by one unit amounts to changing its LSB, i.e., its least significant bit. The LSB is the rightmost bit when the number is represented in binary.

For example, the number $50$, in binary, is represented as $110010$. We can obtain its binary representation easily using Python:

```python
>>> bin(50)
'0b110010'
```

In this case, its LSB—the rightmost bit—is $0$. Therefore, if we modify the value by one unit, this will change its LSB. We can see this both if we add $1$ and if we subtract $1$:

```python
>>> bin(51)
'0b110011'
>>> bin(49)
'0b110001'
```

Thus, to hide a bit in a numerical value taken from the medium we want to modify, it suffices to add or subtract $1$ if the LSB does not match the bit we want to hide, or leave it as is if it already matches.

There are basically two ways to perform this operation. The first, and by far the most widely used—although also the least secure—is known as **LSB *replacement*** and consists of replacing the LSB of the value to be modified with a bit from the message. The second, less common but more secure, is known as **LSB *matching*** and consists of adding or subtracting $1$ from the value to be modified to make it match the bit of the message we wish to hide.

We start by seeing how LSB *replacement* works. In this case, our goal is to replace the least significant bit of the value we want to modify with the message bit we want to embed. To do this, we first set the value’s LSB to $0$ using an AND operation and then set the value of the bit we want to embed using an OR operation:

```python
>>> bin( (51 & ~1) | 1 )
'0b110011'
>>> bin( (51 & ~1) | 0 )
'0b110010'
>>> bin( (50 & ~1) | 1 )
'0b110011'
>>> bin( (50 & ~1) | 0 )
'0b110010'
```

This form of insertion is very easy to implement. We can embed a bit in a single line of code using bit-level operations, which virtually all programming languages support. In lines 1 and 5 we see how to embed a $1$ in the value $51$, while in lines 3 and 7 we see how to embed a $0$ in the value $50$. However, as mentioned earlier, this form of insertion is not advisable because there exists a whole family of attacks known as **structural attacks** ([Fridrich:2001:rs](/stego/books/stegopython/references-en/#fridrich2001rs), [Dumitrescu:2003:spa](/stego/books/stegopython/references-en/#dumitrescu2003spa), [Ker:2005:structural](/stego/books/stegopython/references-en/#ker2005structural), [Ker:2008:structural](/stego/books/stegopython/references-en/#ker2008structural), [Fillatre:2012:structural](/stego/books/stegopython/references-en/#fillatre2012structural)) that can detect it with considerable reliability. We will not go into detail about what structural attacks are and how they work; suffice it to say that they effectively mortally wound LSB *replacement*, so although it is very popular, it is not advisable to use it.

Now let us see how LSB *matching* works. In this case, we want to perform a $+1$ or $-1$ operation so that the LSB changes, choosing between $+1$ or $-1$ at random. The procedure is very similar to the previous one: first we set the LSB to $0$ and then we add or subtract $1$:

```python
>>> if 50%2 != 1:
...     bin(50+random.choice([1, -1]))
...
'0b110001'
>>> if 50%2 != 0:
...     bin(50+random.choice([1, -1]))
...
>>> if 51%2 != 1:
...     bin(50+random.choice([1, -1]))
...
>>> if 51%2 != 0:
...     bin(50+random.choice([1, -1]))
...
'0b110011'
```

There are other ways to perform this operation, but the one we have used is quite illustrative. We use the modulo operation (%), which gives the remainder of the division. That is, by performing a `% 2` operation we obtain the LSB. In line 1 we want to embed a $1$ in the number $50$. Since its LSB is not $1$, we enter the `if` block and then add or subtract $1$. The selection is random, performed with Python’s `random` module, whose `choice` function lets us choose randomly an element from the list passed as a parameter. In line 5 we see that since $50$ already has the LSB at $0$, we do not enter the `if` block, since its LSB is already correct. In lines 8 and 11 we see how to embed bits into the number $51$.

This process may seem a bit more tedious than the previous one. Perhaps this is why LSB *replacement* is much more popular than LSB *matching*—or perhaps because the former comes more naturally to mind to any programmer who wants to modify an LSB in a more direct way. In any case, you can find many tools on the Internet that use LSB *replacement*, whereas LSB *matching* is uncommon. In reality, however, the latter is much harder to detect than the former. While performing a series of $\pm 1$ modifications produces changes that are very similar to the noise already present in digital media such as images or audio, LSB *replacement* is an asymmetric operation that introduces a large number of statistical anomalies that can be detected.

<br>
### Embedding More Bits with Fewer Modifications

In the previous section, we saw how to embed a bit into an integer by modifying its LSB. The efficiency of this type of insertion is usually two bits per modified value (two bits per pixel in images, two bits per sample in audio, etc.). The reason the efficiency is 2 and not 1 is that we consider the LSB of the medium we want to modify to have a random value. If the LSB has a random value, statistically half of the values in which we want to embed information will already have an LSB equal to the bit we want to embed, and we will not have to modify them. Since it will not be necessary to modify half of the values, on average we will be embedding two bits for each modified value.

At this point, one may wonder whether an efficiency of 2 bits per modified value is the best we can achieve. The answer is no; it can be improved significantly. We can reach very high efficiencies where, with only a few modifications, we embed a large number of bits. That is the purpose of this section.

We begin with a simple trick that shows how the efficiency of an embedding method can be increased. We need three integers in which we will embed information by modifying their LSBs. We will call these values A, B, and C:

<table>
  <tr><td>A</td><td>B</td><td>C</td></tr>
</table>

We are going to embed two bits $m_1$ and $m_2$, and we will do it by performing the following calculation:

$$
m_1=	ext{LSB}_A \oplus 	ext{LSB}_B
$$
$$
m_2=	ext{LSB}_B \oplus 	ext{LSB}_C
$$

That is, by performing XOR operations between the LSBs of the values A, B, and C.

Applying this method is very simple. If $m_1$ and $m_2$ already have the values we want to hide, we do not have to do anything. If neither $m_1$ nor $m_2$ has the value we want to embed, we only need to change the LSB of B. If the one that does not match is $m_1$ we will change the LSB of A, and if the one that does not match is $m_2$ we will change the LSB of C. With this simple technique we can embed two bits by modifying only one.

Recall that XOR operations follow the following table:

| $A$ | $B$ | $A \oplus B$ |
|----:|----:|:------------:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

*XOR truth table*

Let us look at an example with the following values:

|  A  |  B  |  C  |
|:---:|:---:|:---:|
| 148 | 149 | 151 |
|-----|-----|-----|

Whose binary representation is as follows:

| A | B | C |
|:-:|:-:|:-:|
| 10010100 | 10010101 | 10010111 |
|----------|----------|----------|

We will use the LSB *matching* technique that we saw earlier. That is, we will modify the LSB by performing a $+1$ or $-1$ operation chosen at random.

Let us consider, one by one, all possible cases, bearing in mind that the initial values of $m_1$ and $m_2$ are the following:

$$
m_1 = 0 \oplus 1 = 1
$$
$$
m_2 = 1 \oplus 1 = 0
$$

The possible cases are as follows:

1. **Embedding $m_1=0$ and $m_2=0$**:  
   Since the only bit that does not match is $m_1$, we must modify the LSB of A.

    | A | B | C |
    |:-:|:-:|:-:|
    | (+1) 10010101 | 10010101 | 10010111 |
    |---------------|----------|----------|

2. **Embedding $m_1=0$ and $m_2=1$**:  
   Since neither $m_1$ nor $m_2$ matches, we must modify the LSB of B.

    | A | B | C |
    |:-:|:-:|:-:|
    | 10010100 | (-1) 10010100 | 10010111 |
    |----------|---------------|----------|

3. **Embedding $m_1=1$ and $m_2=0$**:  
   Both $m_1$ and $m_2$ match, so we do not have to make any modifications.

    | A | B | C |
    |:-:|:-:|:-:|
    | 10010100 | 10010101 | 10010111 |
    |----------|----------|----------|

4. **Embedding $m_1=1$ and $m_2=1$**:  
   Since the only bit that does not match is $m_2$, we must modify the LSB of C.

    | A | B | C |
    |:-:|:-:|:-:|
    | 10010100 | 10010101 | (-1) 10010110 |
    |----------|----------|----------------|

If we now analyze the efficiency of this method, we see that there are four options for the bits $m_1$ and $m_2$ to be embedded: $00$, $01$, $10$, and $11$. Since there are four options and only one can match the bits we want to hide, statistically one out of every four times we will not have to make any change. That is, $\frac{3}{4}$ of the time we will modify one bit. Since each modification allows us to embed two bits, the efficiency of this method is $\frac{2}{3/4} \approx 2.66$.

Therefore, this method is more efficient than the one presented earlier, which offered an efficiency of only $2$.

This method can be generalized to construct a collection of techniques known as *matrix embedding*. We will look at them in detail in the next section.

<br>
### Matrix Embedding

The technique described above can be extended using *matrix embedding* with binary Hamming codes. This methodology allows $p$ bits of information to be inserted into vectors of $2^p - 1$ bits by making only a single modification to the vector.

We first construct a matrix that contains, as columns, all possible combinations of binary vectors of length $p$, excluding the zero vector. For example, for $p = 3$, a possible matrix $M$ would be:

$$
M = \begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

To insert $p$ bits of information, we select a block of $2^p - 1$ bits from the carrier medium, called the cover vector $c$. The message that this cover vector represents is calculated through the matrix operation:

$$
m = M  c
$$

It is essential to remember that all operations are carried out in modulo-2 arithmetic.

If the message $m$ does not match the bits we want to insert, we adjust the cover vector $c$ so that it reflects the desired message. This is achieved by computing the difference between the target message and the current message:

$$
v = M c - m
$$

The position of the vector $v$ among the columns of $M$ indicates which bit of the cover vector $c$ must be modified to obtain the stego vector $s$, such that applying $M s$ recovers the desired message.

Consider an example with $p = 3$, where we want to insert the message $m = (1, 1, 0)$. Since $p = 3$, we work with blocks of $2^p - 1 = 7$ bits. Suppose the cover vector $c$ is $(0, 1, 0, 1, 1, 0, 1)$. We compute:

$$
M c =
\begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
\cdot
\begin{pmatrix}
0 \\
1 \\
0 \\
1 \\
1 \\
0 \\
1
\end{pmatrix}
=
\begin{pmatrix}
1 \\
0 \\
1
\end{pmatrix}
$$

Then we compute the difference:

$$
v = (1, 0, 1) - (1, 1, 0) = (0, 1, 1)
$$

The vector $v = (0, 1, 1)$ corresponds to the second column of matrix $M$, which indicates that we must modify the second bit of the cover vector $c$. Doing so yields the stego vector $s = (0, 0, 0, 1, 1, 0, 1)$, which, when $M \cdot s$ is applied, produces the desired message $(1, 1, 0)$.

This technique enables efficient insertion of information because we can hide $p$ bits by modifying only one bit in the $2^p - 1$-bit block—significantly improving efficiency compared to simpler methods such as LSB steganography.

Below is a practical example of implementing the embedding method using binary Hamming codes in Python. It illustrates how to build matrix $M$, insert a message into a cover vector, and extract it later.

Recall that to build matrix $M$, we consider all possible combinations of binary vectors of length $p$, excluding the zero vector. We can do this in Python using the `numpy` library:

```python
import numpy as np

M = np.array([
    [0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1]
])
```

To insert a message $m$ into a cover vector $c$, compute the difference between $M \cdot c$ and $m$. Then identify the column of $M$ that matches this difference and modify the corresponding bit in $c$:

```python
def embed(M, c, m):
    s = c.copy()
    col_to_find = (np.dot(M, c) - m) % 2
    for position, v in enumerate(M.T):
        if np.array_equal(v, col_to_find):
            s[position] = (s[position] + 1) % 2
            break
    return s
```

Message extraction is performed by multiplying matrix $M$ by the stego vector $s$ and applying modulo 2:

```python
def extract(M, s):
    return np.dot(M, s) % 2
```

Here is a use case in which we hide the message $m = [1, 1, 0]$ within a vector $c$ whose values are obtained from the least significant bits of certain bytes:

```python
>>> m = np.array([1, 1, 0])
>>> c = np.array([0b11011010, 0b11011011, 0b11011011,
...               0b11011010, 0b11011011, 0b11011010,
...               0b11011010]) % 2
>>> s = embed(M, c, m)
>>> new_m = extract(M, s)
>>> m
array([1, 1, 0])
>>> new_m
array([1, 1, 0])
```

This demonstrates that the message has been inserted and recovered correctly without errors. All operations are carried out in modulo-2 arithmetic to guarantee consistency in the encoding and decoding process.

Binary Hamming codes allow $p$ bits of information to be hidden in blocks of $2^p - 1$ bits by making only a single modification per vector. Therefore, the efficiency $e_p$ is calculated as:

$$
e_p = \frac{p}{1 - 2^{-p}}
$$

On the other hand, the *payload* represents the percentage of information that can be stored per modified byte. For binary Hamming codes, the *payload* $\alpha_p$ is determined by the formula:

$$
\alpha_p = \frac{p}{2^p - 1}
$$

For example, if we use $p = 3$, we will need groups of $2^3 - 1 = 7$ bits, which gives a capacity of:

$$
\alpha_3 = \frac{3}{7} \approx 0.429
$$

bits per byte. The efficiency in this case would be:

$$
e_3 = \frac{3}{1 - 2^{-3}} = \frac{3}{0.875} \approx 3.429
$$

This means that, on average, we can hide approximately 3.429 bits of information for each modification made to the medium. It is important to note that although increasing the value of $p$ increases efficiency, it also requires larger vectors, which may limit the total amount of information that can be hidden in a given medium. Therefore, it is crucial to select an appropriate $p$ that offers a balance between efficiency and total storage capacity.

If we compare the *matrix embedding* technique using binary Hamming codes with the traditional LSB *matching* technique, the advantage is evident. In LSB *matching*, to embed one bit into a value (pixel, audio sample, etc.), we need to make, on average, $0.5$ modifications. This is because, statistically, half of the values will already have the LSB we want to embed, by chance, while the other half will not, and we will have to modify them. Thus, for each modification we embed two bits, and the efficiency of the method is two bits per modified value. However, if we use *matrix embedding* with $p=2$, we will be embedding $2$ bits in each block of $2^2-1=3$ bits, and to that end, we will be modifying only one bit. Therefore, the efficiency of the method is $e_p = \frac{p}{1 - 2^{-p}}=\frac{2}{1 - 2^{-2}}=2.66$. For $p=3$, the efficiency is $e_p=\frac{3}{1 - 2^{-3}}=3.4286$, etc. See the table below, which also shows the block size and the relative payload:

| **$p$** | **block size** | **payload** | **$e_p$** |
|:-------:|:--------------:|:-----------:|:---------:|
| 2 | 3 | 0.6667 | 2.66 |
| 3 | 7 | 0.4286 | 3.4286 |
| 4 | 15 | 0.2667 | 4.2667 |
| 5 | 31 | 0.1613 | 5.1613 |
| 6 | 63 | 0.0952 | 6.0952 |
| 7 | 127 | 0.0551 | 7.0551 |
| 8 | 255 | 0.0314 | 8.0314 |
| 9 | 511 | 0.0176 | 9.0176 |

*Capacity evolution as a function of $p$.*

As can be seen in the table, for $p=2$ the scheme is already substantially better than LSB *matching*, since we go from an efficiency of 2 to an efficiency of 2.66. Moreover, as we increase $p$, the method becomes more and more efficient. For example, for $p=9$, the efficiency is 9.0176, which means that on average we can embed more than 9 bits per bit modified. This has a direct impact on the detectability of the method, because for the same amount of embedded information, the number of modifications to the medium is smaller and, consequently, less detectable.

However, there is a price to pay, which we can also see in the table. As $p$ grows, the relative payload decreases. That is, the larger $p$ is, the more bits we need in each block, which ends up limiting the total amount of information we can hide. Therefore, we must strike a balance between the amount of data to hide and the number of modifications we want to make to the medium. This will depend on the application we have in mind for the steganography method and its specific requirements.

<br>
### How to Avoid Detectable Areas

When embedding information, we must be aware that each medium has specific statistical properties and that these will be altered during message insertion. These statistical characteristics can vary across the medium, with areas where alterations are more evident than others. It is therefore advisable to avoid altering those areas.

However, embedding only in certain areas is not trivial, because how could the recipient know in which areas to read? Imagine we agree with the recipient on a formula or some kind of procedure that allows us to identify whether an area of the medium—or a set of values—is appropriate for embedding the message. Inevitably, the embedding itself will modify the medium, and the invented formula or procedure may change its output, generating cases where the recipient will read where the sender has not embedded, or will ignore data that should be read. Therefore, we need a system that allows the recipient to extract the message even though they do not know where it was embedded. This is the role of **Wet Paper Codes (WPC)** ([Fridrich:2005:wpc](/stego/books/stegopython/references-en/#fridrich2005wpc)), as well as other more sophisticated schemes such as **Syndrome Trellis Codes (STC)** ([Filler:2011:stc](/stego/books/stegopython/references-en/#filler2011stc)).

The term *Wet Paper Codes* comes from the following metaphor: imagine a sheet of paper that is partially wet, where it is only possible to write on the dry areas, since trying to do so in the wet areas could damage the paper. Analogously, in steganography we seek to embed information only in regions considered safe (*dry* zones), avoiding those marked as vulnerable or unsuitable for modification (*wet* zones).

Mathematically, the embedding problem is modeled by the equation:

$$
D y = m
$$

where:
- $D$ is a matrix shared between the sender and the receiver,
- $y$ is the stego vector resulting from modifying the carrier medium,
- $m$ is the message to be hidden.

The objective is to modify $y$ from a cover vector $x$ such that the above equation holds, but with the restriction that certain values in $x$ cannot be altered. To resolve this, we define a vector $v = y - x$, which indicates which positions have been modified. Rewriting the problem yields:

$$
D v = m - D x
$$

Since some positions of $x$ are unchangeable, the corresponding columns of $D$ and positions of $v$ are removed, obtaining a new matrix $H$ and a new vector $u$, which leads to:

$$
H u = m - D x
$$

This system can be solved using linear algebra techniques, allowing us to determine which bits can be modified without violating the constraints imposed by the medium.

**Wet Paper Codes Example**

Suppose we have the following cover vector:

$$
x = (1,0,0,1,1,1,0)
$$

and we wish to hide the message:

$$
m = (1,1,1)
$$

The sender and receiver share the matrix $D$:

$$
D =
\begin{pmatrix}
0 & 0 & 0 & 1 & 1 & 1 & 1 \\
0 & 1 & 1 & 0 & 0 & 1 & 1 \\
1 & 0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

However, suppose that the first bit of $x$ cannot be modified. In this case, the matrix $H$ is obtained by removing the corresponding column from $D$:

$$
H =
\begin{pmatrix}
0 & 0 & 1 & 1 & 1 & 1 \\
1 & 1 & 0 & 0 & 1 & 1 \\
0 & 1 & 0 & 1 & 0 & 1
\end{pmatrix}
$$

The next step is to solve the equation:

$$
H u = m - D x
$$

Computing $D x$:

$$
D x =
\begin{pmatrix}
1 \\
1 \\
0
\end{pmatrix}
$$

$$
m - D x =
\begin{pmatrix}
1 \\
1 \\
1
\end{pmatrix}
-
\begin{pmatrix}
1 \\
1 \\
0
\end{pmatrix}
=
\begin{pmatrix}
0 \\
0 \\
1
\end{pmatrix}
$$

Solving the system $H u = (0,0,1)$, we obtain:

$$
u = (1,1,0,0,0,0)
$$

Restoring the unmodifiable position, we obtain the vector $v$:

$$
v = (0,1,1,0,0,0,0)
$$

Finally, we obtain the stego vector $y$:

$$
y = x + v = (1,0,0,1,1,1,0) + (0,1,1,0,0,0,0) = (1,1,1,1,1,1,0)
$$

When the receiver gets $y$, they can extract the original message $m$ by applying:

$$
D y = (1,1,1)
$$

This example shows how Wet Paper Codes allow information to be hidden in a carrier medium while respecting constraints imposed by certain non-modifiable positions, ensuring safe and adaptive embedding.

One aspect that can be challenging when implementing this technique in Python is solving the system $H u$. In the original *Wet Paper Codes* paper ([Fridrich:2005:wpc](/stego/books/stegopython/references-en/#fridrich2005wpc)), the *LT Process* technique is presented, which provides a possible solution for $u$. For those who wish to delve deeper into its implementation, a complete code using the *LT Process* can be found at:

[https://github.com/daniellerch/stegolab/tree/master/codes](https://github.com/daniellerch/stegolab/tree/master/codes)

However, we will not dwell on this part here, since our main interest lies in understanding the theoretical basis of the method, which has been presented through the equations above.

In practice, for advanced applications, more sophisticated techniques are used, such as *Syndrome Trellis Codes* (STC), which optimize embedding by minimizing the distortion introduced into the carrier medium. These methods are considerably more complex and go beyond the goals of this book. Rather than implementing them manually, we will rely on specialized libraries such as pySTC, which provide efficient tools for applying these algorithms in real scenarios. For those who wish to explore further, a basic STC implementation is also available in the same repository.

Let us see how to use STC through the pySTC library. In this example, we first generate a sequence of random bytes (values between 0 and 255) to simulate the medium in which we want to embed the data. We then create an array of the same size to represent the embedding costs.

These costs determine how difficult it is to modify each byte: the lower the cost assigned to a byte, the greater the likelihood that it will be altered to insert the message. Conversely, bytes with higher costs are less likely to be modified, allowing us to protect certain areas of the medium where changes would be more detectable.

Finally, we embed the message in the medium and then extract it.

```python
import pystc
import numpy as np

data = np.random.randint(0, 256, (1000,1), dtype=np.uint8)

costs = np.random.uniform(0, 1, (1000,1))

message = "Hello World".encode()
stego = pystc.hide(message, data, costs, costs, 32, mx=255, mn=0)

message_extracted = pystc.unhide(stego, 32)
```

```python
>>> message_extracted.decode()
Hello World
```
