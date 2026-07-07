---
layout: page
title: LSB Replacement
subtitle: ""
noindex: false
meta-title: "LSB Replacement — StegoRank"
meta-description: "StegoRank note on LSB replacement steganography, tools, detectability, and limitations"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

LSB replacement is a spatial-domain steganography technique that hides information by replacing the least significant bit of image samples with message bits.

<section class="stegorank-facts" markdown="1">
## Quick Summary

<dl>
  <dt>Domain:</dt><dd>uncompressed images.</dd>
  <dt>Type:</dt><dd>simple LSB method based on direct bit replacement.</dd>
  <dt>Tools:</dt><dd>OpenStego, OpenPuff, and other educational or legacy tools.</dd>
  <dt>Main reading:</dt><dd>it is easy to implement, but it leaves known structural artifacts that can be detected even without deep learning.</dd>
</dl>
</section>

## Why it matters

LSB replacement is simple, widely known, and implemented by many practical tools. Its simplicity also makes it a useful baseline for understanding image steganography and steganalysis.

The main weakness is that direct bit replacement introduces statistical artifacts. These artifacts can be exploited by structural steganalysis methods such as Sample Pair Analysis (SPA), which do not require training on an image collection.

## Typical tools

Tools associated with this family include:

- OpenStego;
- OpenPuff, for some image modes;
- CryptoStego, for some image modes;
- simple educational or legacy image steganography tools.

## Detectability results

In the current StegoRank comparison, LSB replacement is represented in the uncompressed-image comparison. The results include both SPA and machine-learning-based detection.

The important point is not only that LSB replacement can be detected, but that it can be attacked with structural methods that are less dependent on training data than deep-learning detectors.

## Limitations

The available comparison depends on the evaluated image collection, payloads, implementation details, and detectors. Results should not be generalized to every possible image source or implementation.

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
