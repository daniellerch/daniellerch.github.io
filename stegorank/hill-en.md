---
layout: page
title: HILL
subtitle: ""
noindex: false
meta-title: "HILL — StegoRank"
meta-description: "StegoRank note on HILL adaptive spatial-domain steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

HILL is an adaptive spatial-domain steganography method for uncompressed images. It assigns embedding costs from the image content, so modifications are directed towards areas where they are expected to be harder to detect.

## Use in tools

HILL was used by HStego versions prior to 0.4 for uncompressed images. This should be read as a method implemented by that tool version, not as a separate algorithm named “HStego 0.3”.

For detectability experiments, StegoRank also relies on the [HILL simulator included in Aletheia](/stego/aletheia/v03/intro-en/#simulators). A separate [HILL research implementation is available in StegoLab](https://github.com/daniellerch/stegolab/tree/master/HILL).

## Detectability results

In the evaluated setting, the HILL simulator is much less detectable than simple LSB replacement methods. Its relative position against S-UNIWARD depends on the payload range shown in the chart.

Simulator-based results should be interpreted as method-level results. Embedding simulators are usually slightly harder to detect than real end-user tools such as HStego, because they embed close to the theoretical limit and do not include all practical constraints of a complete tool.

## Original paper

- [A New Cost Function for Spatial Image Steganography](https://doi.org/10.1109/ICIP.2014.7025854).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
