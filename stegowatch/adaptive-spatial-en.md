---
layout: page
title: Adaptive Spatial Methods
subtitle: ""
noindex: false
meta-title: "Adaptive Spatial Methods — StegoWatch"
meta-description: "StegoWatch note on adaptive spatial-domain image steganography methods"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

Adaptive spatial methods hide information in uncompressed images by assigning different embedding costs to different image regions. The goal is to modify areas where changes are expected to be harder to detect.

## Why it matters

Adaptive methods represent a major step beyond simple LSB-based embedding. They use image content to guide embedding and reduce statistical artifacts.

This family includes research methods and practical implementations derived from cost functions such as HILL or S-UNIWARD-style ideas.

## Typical tools and implementations

The current StegoWatch comparison relates these methods to HStego versions, but method-level detectability results may use Aletheia simulators rather than complete end-user tools.

Related research implementations can also appear in StegoLab, but they should be treated as methods or research code rather than end-user tools.

## Detectability results

In the current comparison, adaptive spatial methods such as HILL and S-UNIWARD show lower detectability than simple LSB replacement under the evaluated conditions.

The comparison also shows that implementation details matter: different HStego versions produce different detectability results.

## Limitations

The current comparison is tied to specific HStego versions, payloads, detectors, and image-source conditions. Future evaluations should separate method-level results from tool-specific implementation details.

## Key papers

- [A New Cost Function for Spatial Image Steganography](https://doi.org/10.1109/ICIP.2014.7025854).
- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
