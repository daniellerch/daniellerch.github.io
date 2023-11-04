---
layout: page
title: "Text steganography with ChatGPT"
subtitle: "" 
noindex: false
meta-title: "Text steganography with ChatGPT"
meta-description: "Article about using ChatGPT to perform text steganography"
meta-keywords: "steganography, text, ChatGPT"
lang-suffix: "-en"
---



> In this article we are going to see how to use ChatGPT to perform 
> steganography on text.


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


1. [Introduction](#introduction)
2. [ChatGPT and text steganography](#chatgpt-and-text-steganography)
3. [Example 1: one letter per sentence](#example-1-one-letter-per-sentence)
4. [Example 2: one letter per word](#example-2-one-letter-per-word)
5. [Example 3: use of a password](#example-3-use-of-a-password)
6. [Conclusions](#conclusions)

<br>
## Introduction

Text steganography has been present since the beginnings of steganography.
However, it took a long time to adapt to the digital world. Just as
steganography in other media, such as images or audio, or even network
protocols, has been relatively easy, the same cannot be said about text.

It's not that doing steganography in text is complicated. It's not, not at all,
but what it is, is tedious and slow. Doing steganography is
hard to automate, since if the text looks unnaturally altered,
it's obvious that something is going on. And of course, steganography loses
its main objective: to go unnoticed.

However, with the appearance of
[LLM](https://en.wikipedia.org/wiki/LLM_(large_language_model))
and tools like [ChatGPT](https://chat.openai.com/) this has ceased
to be a problem.



<br>
## ChatGPT and Text Steganography

Using ChatGPT to hide information in a text is as simple as
asking it with the appropriate *prompt*. In some cases, ChatGPT might make
some mistakes, so it's necessary to ask again. However, it's
expected to improve over time (The examples provided throughout
this article were done with GPT-4).

Let's start with a simple example: an [acrostic](https://en.wikipedia.org/wiki/Acrostic) text, which is a text
or poetic composition in which the first letter of each verse or sentence
is part of the message.

> **PROMPT:** Write an acrostic that hides the message "Hello World".
> Highlight the letters that are part of the message in bold.

![Acrostic](/stego/blog/resources/chatgpt1en.png?style=centerme)

Next, we will look at some examples where we will ask ChatGPT
to hide messages in the generated texts.



<br>
## Example 1: One letter per sentence

ChatGPT doesn't typically work well if we ask it to insert the message letters at intermediate positions. So, a good approach is to continue with the same idea as the acrostics. Let's see a more realistic example.

> **PROMPT**: 
> Write a text explaining how a combustion engine works.
> Structure the text such that each sentence begins with a letter from the secret message: "ATTACK AT DAWN".
> Write the text in a single paragraph, without any new paragraphs.
> Highlight the letters of the secret message in bold.

![Example 1](/stego/blog/resources/chatgpt2en.png?style=centerme)

As can be seen, ChatGPT does exactly what is asked of it. 
Next, we will look at a more complicated example.




<br>
## Example 2: One letter per word

At this point, it might be interesting to try to increase the capacity, so as to increase the ratio of hidden letters per word or per sentence. For instance, we can ask ChatGPT to use every word.

This doesn't usually work very well, in fact, ChatGPT chatgpt can't get it right.
Let's see an example:


> **PROMPT**: 
> Write a text explaining how a combustion engine works.
> Structure the text such that each word begins with a letter from the secret message: "ATTACK AT DAWN". All words must have a letter from the message.
> Write the text in a single paragraph, without any new paragraphs.
> Highlight the letters of the secret message in bold.

![Example 2](/stego/blog/resources/chatgpt3en.png?style=centerme)

It is really difficult to fit the letters of the message into all the words. ChatGPT tries, and does it pretty well, but not good enough. Although, with other messages or different conversation topics, ChatGPT might be able to handle it.



<br>
## Example 3: Use of a password

A steganographic text in which each sentence begins with a letter from the message is easy to detect. Therefore, it's interesting to encrypt the message we're hiding. Since we're working with text, we need an encryption that results in letters we can hide.

There are multiple ways to do this. One could be using a shared key between the sender and the receiver composed of characters from the alphabet and adding them modulo 26.

For example, if the shared key is "AXGUYPLNOTGJ", we would perform the encryption as follows:

**First, we represent letters with numbers:**  
A=0, B=1, ..., Z=25.

**We do the same with the message:**  
A(0) T(19) T(19) A(0) C(2) K(10) A(0) T(19) D(3) A(0) W(22) N(13)

**We do the same with the key:**  
A(0) X(23) G(6) U(20) Y(24) P(15) L(11) N(13) O(14) T(19) G(6) J(9)

**Add the message to the key modulo 26:**  
A(0) Q(16) Z(25) U(20) A(0) Z(25) L(11) G(6) R(17) T(19) C(2) W(22)

The encrypted message is: AQZUAZLGRTCW

**We see a summary in the table below:**

| PLAIN MESSAGE | ATTACKATDAWN |
| KEY | AXGUYPLNOTGJ |
| ENCRYPTED MESSAGE | AQZUAZLGRTCW |



<br>
Now we can ask ChatGPT to generate the new text, now using the encrypted message.

> **PROMPT**:                                                                                                            
> Write a text explaining how a combustion engine works.
> Write the text in such a way that each sentence begins with a letter from the encrypted message: "AQZUAZLGRTCW".
> Write the text in a single paragraph, without separate sentences.
> Highlight the letters of the encrypted message in **bold**.

![Example 3](/stego/blog/resources/chatgpt4en.png?style=centerme)


Now, as you can see, it's not possible to read the hidden message without the key. 
It doesn't even seem possible to detect the use of steganography.



<br>
## Conclusions

With advanced platforms like ChatGPT, we can now create high-quality text steganography methods. Although there's still a long way to go, especially in terms of increasing capacity, what's been presented is a promising glimpse of what's to come. Without a doubt, text steganography will become a topic of discussion, as it doesn't seem it will be easily detectable.










