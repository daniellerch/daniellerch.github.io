---
layout: page
title: F5
subtitle: ""
noindex: false
meta-title: "F5 — StegoRank"
meta-description: "StegoRank note on F5 JPEG steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

F5 is a JPEG-domain steganography technique that modifies quantized DCT coefficients while avoiding some of the most obvious artifacts produced by earlier JPEG embedding approaches.

<section class="stegorank-facts" markdown="1">
## Quick Summary
<dl>
  <dt>Domain:</dt><dd>JPEG.</dd>
  <dt>Type:</dt><dd>older JPEG method with matrix encoding and modifications over quantized DCT coefficients.</dd>
  <dt>Use:</dt><dd>its own technical family, useful as a historical reference and as a JPEG steganalysis baseline.</dd>
  <dt>Main reading:</dt><dd>it improves on simpler JPEG methods, but is usually behind modern adaptive methods such as J-UNIWARD.</dd>
</dl>
</section>

## Use in tools

F5 is treated here as its own technique family. When a tool implements F5 or a close variant, it should be compared at the method level rather than grouped only under generic older JPEG-domain tools.

## Detectability results

In the current StegoRank comparison, F5 should be interpreted as part of the class of older JPEG-domain methods. Its detectability is expected to be higher than more adaptive JPEG methods such as J-UNIWARD under comparable conditions.

## Original paper

- [F5—A Steganographic Algorithm](https://doi.org/10.1007/3-540-45496-9_21).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
