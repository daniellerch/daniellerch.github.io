---
layout: page
title: StegoWatch
subtitle: ""
noindex: false
meta-title: "StegoWatch — Daniel Lerch"
meta-description: "Comparison of image steganography techniques and tools"
lang-suffix: "-en"
comments: false
---

<style>
    [id]::before {
        content: '';
        display: block;
        height: 70px;
        margin-top: -70px;
        visibility: hidden;
    }

    .stegowatch-updated {
        margin: 1.5rem 0 2rem;
        padding: 0.85rem 1rem;
        border-left: 4px solid #0074D9;
        background: #f7f9fb;
        color: #555;
    }

    .stegowatch-updated p {
        margin-bottom: 0;
    }


    h2 {
        margin-top: 4rem;
    }

    .stegowatch-figure {
        margin: 2.5rem 0;
        text-align: center;
    }

    .stegowatch-figure img {
        max-width: 100%;
        height: auto;
    }

    .stegowatch-figure .caption {
        margin-top: 0.85rem;
        color: #333;
        font-size: 1.3rem;
        font-weight: 500;
    }


    .stegowatch-rating {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
        white-space: nowrap;
    }

    .stegowatch-rating-bars {
        display: inline-flex;
        gap: 4px;
        vertical-align: middle;
    }

    .stegowatch-rating-bars span {
        display: inline-block;
        width: 18px;
        height: 12px;
        border-radius: 2px;
        background: #e1e1e1;
    }

    .stegowatch-rating-1 .stegowatch-rating-bars span:nth-child(-n+1) { background: #e60000; }
    .stegowatch-rating-2 .stegowatch-rating-bars span:nth-child(-n+2) { background: #e67e22; }
    .stegowatch-rating-3 .stegowatch-rating-bars span:nth-child(-n+3) { background: #d6a500; }
    .stegowatch-rating-4 .stegowatch-rating-bars span:nth-child(-n+4) { background: #4f9d69; }
    .stegowatch-rating-5 .stegowatch-rating-bars span:nth-child(-n+5) { background: #00d15f; }

    .stegowatch-rating-label {
        color: #444;
        font-size: 1rem;
        line-height: 1.2;
    }
</style>


StegoWatch tracks the current state of image steganography techniques and tools, with a particular focus on how detectable they are under practical steganalysis.

The comparison is organized around the underlying embedding techniques, because many tools implement the same or closely related methods. This makes it easier to understand what is actually being evaluated: the tool, the technique behind it, the payload, and the detector used to analyze it.

<div class="stegowatch-updated">
  <p><strong>Last updated:</strong> 25 June 2026. This is a living section: results and classifications may change as tools, detectors, and comparison protocols are updated.</p>
</div>

<div class='menu' style='margin-top:50px'></div>

1. [Comparison charts](#comparison-charts)
2. [Techniques and tools](#techniques-and-tools)
3. [How to read these results](#how-to-read-these-results)

## Comparison charts

The charts below are the quickest way to read the current comparison. They show how detectable different image steganography techniques and tools are under the evaluated conditions.

<div class="stegowatch-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison.png" alt="Comparison of steganography methods in uncompressed images">
  <div class="caption">Comparison of steganography in uncompressed images such as PNG, TIF, and BMP.</div>
</div>

<div class="stegowatch-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison_jpeg.png" alt="Comparison of steganography methods in JPEG">
  <div class="caption">Comparison of steganography in JPEG.</div>
</div>

## Techniques and tools

Many tools implement the same or closely related techniques. The table links each family to its note and gives a compact reading of the tools represented in the comparison. For a broader catalogue, see the [steganography tools list](/stego/intro/tools-en/).

| Technique family | Software using this technique | Domain | Detection resistance |
|---|---|---|---|
| [Generative steganography](/stegowatch/generative-steganography-en/) | [SteganoGAN](https://github.com/DAI-Lab/SteganoGAN) | Uncompressed | <span class="stegowatch-rating stegowatch-rating-1" title="Very easy to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Very easy to detect</span></span> |
| [LSB replacement](/stegowatch/lsb-replacement-en/) | [OpenStego](https://www.openstego.com), [OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) | Uncompressed | <span class="stegowatch-rating stegowatch-rating-4" title="Partially detectable"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Partially detectable</span></span> |
| [LSB matching](/stegowatch/lsb-matching-en/) | Research / experimental implementations | Uncompressed | <span class="stegowatch-rating stegowatch-rating-4" title="Partially detectable"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Partially detectable</span></span> |
| [HILL](/stegowatch/hill-en/) | [HStego < 0.4](https://github.com/daniellerch/hstego) | Uncompressed | <span class="stegowatch-rating stegowatch-rating-4" title="Partially detectable"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Partially detectable</span></span> |
| [S-UNIWARD](/stegowatch/s-uniward-en/) | [HStego 0.4](https://github.com/daniellerch/hstego) | Uncompressed | <span class="stegowatch-rating stegowatch-rating-5" title="Hard to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Hard to detect</span></span> |
| [Older JPEG-domain methods](/stegowatch/jpeg-domain-en/) | [Outguess](https://github.com/daniellerch/stego-collection/tree/master/outguess) and others | JPEG | <span class="stegowatch-rating stegowatch-rating-1" title="Very easy to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Very easy to detect</span></span> |
| [F5](/stegowatch/f5-en/) | [F5](https://github.com/daniellerch/stego-collection/tree/master/F5) | JPEG | <span class="stegowatch-rating stegowatch-rating-1" title="Very easy to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Very easy to detect</span></span> |
| [Steghide](/stegowatch/steghide-en/) | [Steghide](https://steghide.sourceforge.net/index.php) | JPEG | <span class="stegowatch-rating stegowatch-rating-2" title="Easy to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Easy to detect</span></span> |
| [J-UNIWARD](/stegowatch/j-uniward-en/) | [HStego < 0.4](https://github.com/daniellerch/hstego) | JPEG | <span class="stegowatch-rating stegowatch-rating-4" title="Partially detectable"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Partially detectable</span></span> |
| [J-UNIWARD + Cost Polarization](/stegowatch/j-uniward-cost-polarization-en/) | [HStego 0.4](https://github.com/daniellerch/hstego) | JPEG | <span class="stegowatch-rating stegowatch-rating-5" title="Hard to detect"><span class="stegowatch-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegowatch-rating-label">Hard to detect</span></span> |

## How to read these results

The rating summarizes resistance to detection in the evaluated setting. It is computed separately for each domain from the mean detector accuracy across the payloads shown in the charts: within each domain, the highest mean accuracy maps to one red rectangle and the lowest mean accuracy maps to five green rectangles. It should not be read as a universal ranking of tools, and it does not imply undetectability. Detectability depends on several factors:

- payload;
- image source;
- image format and embedding domain;
- implementation details;
- detector and training data;
- whether evaluation is performed within the same source or across different sources.

For this reason, StegoWatch treats tools as practical entry points, but organizes the comparison around techniques and evaluation conditions.
