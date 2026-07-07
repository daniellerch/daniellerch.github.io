---
layout: page
title: J-UNIWARD + Cost Polarization
subtitle: ""
noindex: false
meta-title: "J-UNIWARD + Cost Polarization — StegoRank"
meta-description: "StegoRank note on J-UNIWARD with cost polarization for JPEG steganography"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

J-UNIWARD + Cost Polarization is an adaptive JPEG-domain approach that extends J-UNIWARD by using estimated side information. In HStego >= 0.4 this is implemented with Wiener filtering before applying cost polarization.

<section class="stegorank-facts" markdown="1">
## Quick Summary

<dl>
  <dt>Domain:</dt><dd>JPEG.</dd>
  <dt>Type:</dt><dd>adaptive method with estimated side information.</dd>
  <dt>Tools:</dt><dd>HStego >= 0.4 and a research implementation in StegoLab.</dd>
  <dt>Main reading:</dt><dd>it is the least detectable JPEG entry in the current comparison, under the evaluated protocol.</dd>
</dl>
</section>

## Use in tools

In the current comparison, this method appears through HStego >= 0.4. This should be read as a method-level result implemented by those tool versions, not as a separate algorithm named “HStego”.

A separate [J-UNIWARD + Cost Polarization research implementation is available in StegoLab](https://github.com/daniellerch/stegolab/tree/master/J-UNIWARD/j-uniwardfast-rgbnr-wiener-color.py). Unlike plain J-UNIWARD, this entry is represented in the current comparison through HStego >= 0.4 rather than through a generic Aletheia simulator.

## Detectability results

In the evaluated setting, J-UNIWARD + Cost Polarization through HStego >= 0.4 is the least detectable JPEG method shown in the current comparison.

Results based on research implementations or simulators should be interpreted as method-level results. They can be slightly harder to detect than real end-user tools when they embed close to the theoretical limit and do not include all practical constraints of a complete tool.

## Original paper

- [JPEG Steganography With Estimated Side-Information](https://doi.org/10.1109/TIFS.2019.2918511).

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
