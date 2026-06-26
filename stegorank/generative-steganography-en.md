---
layout: page
title: Generative Steganography
subtitle: ""
noindex: false
meta-title: "Generative Steganography — StegoRank"
meta-description: "StegoRank note on generative image steganography, SteganoGAN, and Stable Diffusion based methods"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

Generative steganography uses generative models to create images that carry hidden information. In StegoRank, this family includes both earlier GAN-based approaches, such as SteganoGAN, and more recent methods based on diffusion models.

## Why it matters

Generative approaches are conceptually different from classical embedding methods. Instead of modifying an existing cover image, they can generate an image as part of the hiding process.

This changes the detection problem. A detector may learn differences between generated and natural images rather than traces caused only by the hidden message. Diffusion-based approaches are especially relevant because they can use high-quality image generators such as Stable Diffusion.

## Typical tools and methods

The current comparison includes:

- SteganoGAN;
- mas_GRDH, a Stable Diffusion based generative steganography method described in the IEEE paper linked below.

## Detectability results

In the Aletheia comparison, SteganoGAN is highly detectable across the evaluated payloads. This result should be read carefully: for SteganoGAN, high detectability may reflect artifacts of the generation process itself, not only the presence of embedded information.

mas_GRDH is represented separately in the Stable Diffusion chart with one point at 0.02 bpp and accuracy 0.50, corresponding to chance-level detection in the reported setting.

## Limitations

The results do not fully answer the broader question of detecting hidden messages in generated images. They describe specific methods, payloads, generators, and evaluation protocols.

## Reference papers

- [SteganoGAN: High Capacity Image Steganography with GANs](https://arxiv.org/abs/1901.03892).
- [IEEE Xplore: mas_GRDH](https://ieeexplore.ieee.org/abstract/document/10637346).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
