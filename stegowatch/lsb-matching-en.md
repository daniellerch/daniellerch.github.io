---
layout: page
title: LSB Matching
subtitle: ""
noindex: false
meta-title: "LSB Matching — StegoWatch"
meta-description: "StegoWatch note on LSB matching steganography, detectability, and limitations"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

LSB matching is a spatial-domain steganography technique closely related to LSB replacement. Instead of directly replacing the least significant bit, it increments or decrements the sample value when a change is needed.

## Why it matters

LSB matching avoids the specific statistical artifact introduced by direct LSB replacement. This usually makes it harder to detect with simple structural attacks designed for replacement artifacts.

It is therefore an important intermediate family: still simple, but more robust than naïve LSB replacement.

## Typical tools

LSB matching is less common in end-user tools than LSB replacement. It appears more often in research code, educational implementations, and controlled experiments.

## Detectability results

In the current StegoWatch comparison, LSB matching appears in the uncompressed-image comparison. It performs better than LSB replacement in several low-payload settings, but it is not undetectable.

Its detectability depends on payload, image source, detector, and the exact implementation.

## Limitations

The current comparison should be interpreted as a comparison under a specific comparison setting. It does not establish a universal security level for all LSB matching implementations.

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
