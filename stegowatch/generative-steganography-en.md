---
layout: page
title: Generative Steganography
subtitle: ""
noindex: false
meta-title: "Generative Steganography — StegoWatch"
meta-description: "StegoWatch note on generative image steganography and SteganoGAN detectability"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

Generative steganography uses generative models to create images that carry hidden information. SteganoGAN is the representative example in the current StegoWatch comparison.

## Why it matters

Generative approaches are conceptually different from classical embedding methods. Instead of modifying an existing cover image, they can generate an image as part of the hiding process.

This changes the detection problem. A detector may learn differences between generated and natural images rather than traces caused only by the hidden message.

## Typical tools

The current comparison includes:

- SteganoGAN.

## Detectability results

In the current comparison, SteganoGAN is highly detectable across the evaluated payloads.

This result should be read carefully. High detectability may reflect artifacts of the generation process itself, not only the presence of embedded information.

## Limitations

The results does not fully answer the broader question of detecting hidden messages in generated images. It mainly shows that the evaluated SteganoGAN outputs were distinguishable in the tested setting.

## Reference paper

- [SteganoGAN: High Capacity Image Steganography with GANs](https://arxiv.org/abs/1901.03892).

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
