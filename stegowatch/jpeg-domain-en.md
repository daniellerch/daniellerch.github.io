---
layout: page
title: Outguess and Older JPEG Methods
subtitle: ""
noindex: false
meta-title: "Outguess and Older JPEG Methods — StegoWatch"
meta-description: "StegoWatch note on Outguess, JSteg, JPHS and older JPEG-domain steganography tools"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

This family groups older JPEG-domain steganography tools that hide information by modifying elements of the JPEG representation, usually DCT coefficients. In the current StegoWatch table, this entry is represented mainly by Outguess and related older tools.

## Why it matters

JPEG remains one of the most relevant formats for practical image steganography. Older JPEG tools are still useful as historical references and as practical baselines for steganalysis, because their artifacts are usually easier to detect than those produced by modern adaptive methods.

## Typical tools

Tools associated with this family include:

- [Outguess](https://github.com/daniellerch/stego-collection/tree/master/outguess);
- [JSteg](https://github.com/daniellerch/stego-collection/tree/master/jsteg);
- [JP Hide & Seek / JPHS](https://github.com/daniellerch/stego-collection/tree/master/jphs).


## Detectability results

In the current StegoWatch comparison, Outguess represents this family and is very easy to detect in the evaluated setting. This should not be generalized automatically to every older JPEG tool, but it is consistent with the fact that non-adaptive JPEG methods tend to leave stronger statistical artifacts than adaptive approaches.

## Limitations

This is a broad family rather than a single algorithm. Detectability depends on the specific tool, payload, JPEG quality, image source, implementation details and detector training.

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
