---
layout: page
title: S-UNIWARD
subtitle: ""
noindex: false
meta-title: "S-UNIWARD — StegoWatch"
meta-description: "StegoWatch note on S-UNIWARD adaptive spatial-domain steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

S-UNIWARD is an adaptive spatial-domain steganography method for uncompressed images. It is part of the UNIWARD family of distortion functions and uses image content to guide where embedding changes should be made.

## Use in tools

S-UNIWARD is used by HStego 0.4 for uncompressed images. This should be read as a method implemented by that tool version, not as a separate algorithm named “HStego 0.4”.

For detectability experiments, StegoWatch also relies on the [S-UNIWARD simulator included in Aletheia](/stego/aletheia/v03/intro-en/#simulators). A separate [S-UNIWARD research implementation is available in StegoLab](https://github.com/daniellerch/stegolab/tree/master/S-UNIWARD).

## Detectability results

In the evaluated setting, the S-UNIWARD simulator is much less detectable than simple LSB replacement methods. Its relative position against HILL depends on the payload range shown in the chart.

Simulator-based results should be interpreted as method-level results. Embedding simulators are usually slightly harder to detect than real end-user tools such as HStego, because they embed close to the theoretical limit and do not include all practical constraints of a complete tool.

## Original paper

- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Related resources

- [StegoWatch main article](/stegowatch-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
