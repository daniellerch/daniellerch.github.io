---
layout: page
title: J-UNIWARD
subtitle: ""
noindex: false
meta-title: "J-UNIWARD — StegoRank"
meta-description: "StegoRank note on J-UNIWARD JPEG steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

J-UNIWARD is an adaptive JPEG-domain steganography method. It assigns costs to changes in JPEG DCT coefficients using a distortion function designed for the JPEG domain.

## Use in tools

J-UNIWARD was used by HStego versions prior to 0.4 for JPEG images. This should be read as a method implemented by that tool version, not as a separate algorithm named “HStego 0.3”.

For detectability experiments, StegoRank also relies on the [J-UNIWARD simulator included in Aletheia](/stego/aletheia/v03/intro-en/#simulators). A separate [J-UNIWARD research implementation is available in StegoLab](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD).

## Detectability results

In the evaluated setting, the J-UNIWARD simulator is substantially less detectable than older JPEG tools such as Outguess and F5, and also less detectable than Steghide under the same conditions.

Simulator-based results should be interpreted as method-level results. Embedding simulators are usually slightly harder to detect than real end-user tools such as HStego, because they embed close to the theoretical limit and do not include all practical constraints of a complete tool.

## Original paper

- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
