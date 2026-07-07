---
layout: page
title: S-UNIWARD
subtitle: ""
noindex: false
meta-title: "S-UNIWARD — StegoRank"
meta-description: "StegoRank note on S-UNIWARD adaptive spatial-domain steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

S-UNIWARD is an adaptive spatial-domain steganography method for uncompressed images. It is part of the UNIWARD family of distortion functions and uses image content to guide where embedding changes should be made.

<section class="stegorank-facts" markdown="1">
## Quick Summary

<dl>
  <dt>Domain:</dt><dd>uncompressed images.</dd>
  <dt>Type:</dt><dd>adaptive spatial-domain method.</dd>
  <dt>Tools:</dt><dd>HStego >= 0.4, the Aletheia simulator, and a research implementation in StegoLab.</dd>
  <dt>Main reading:</dt><dd>it reduces detectability compared with simple LSB methods, although results depend on payload and protocol.</dd>
</dl>
</section>

## Use in tools

S-UNIWARD is used by HStego >= 0.4 for uncompressed images. This should be read as a method implemented by those tool versions, not as a separate algorithm named “HStego”.

For detectability experiments, StegoRank also relies on the [S-UNIWARD simulator included in Aletheia](/stego/aletheia/v03/intro-en/#simulators). A separate [S-UNIWARD research implementation is available in StegoLab](https://github.com/daniellerch/stegolab/tree/master/S-UNIWARD).

## Detectability results

In the evaluated setting, the S-UNIWARD simulator is much less detectable than simple LSB replacement methods. Its relative position against HILL depends on the payload range shown in the chart.

Simulator-based results should be interpreted as method-level results. Embedding simulators are usually slightly harder to detect than real end-user tools such as HStego, because they embed close to the theoretical limit and do not include all practical constraints of a complete tool.

## Original paper

- [Universal Distortion Function for Steganography in an Arbitrary Domain](https://doi.org/10.1186/1687-417X-2014-1).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
