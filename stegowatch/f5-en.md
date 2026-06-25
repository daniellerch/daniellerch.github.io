---
layout: page
title: F5
subtitle: ""
noindex: false
meta-title: "F5 — StegoWatch"
meta-description: "StegoWatch note on F5 JPEG steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

F5 is a JPEG-domain steganography technique that modifies quantized DCT coefficients while avoiding some of the most obvious artifacts produced by earlier JPEG embedding approaches.

## Use in tools

F5 is treated here as its own technique family. When a tool implements F5 or a close variant, it should be compared at the method level rather than grouped only under generic older JPEG-domain tools.

## Detectability results

In the current StegoWatch comparison, F5 should be interpreted as part of the class of older JPEG-domain methods. Its detectability is expected to be higher than more adaptive JPEG methods such as J-UNIWARD under comparable conditions.

## Original paper

- [F5—A Steganographic Algorithm](https://doi.org/10.1007/3-540-45496-9_21).

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
