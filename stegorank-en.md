---
layout: page
title: StegoRank
subtitle: ""
noindex: false
meta-title: "StegoRank — Daniel Lerch"
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

    .stegorank-updated {
        margin: 1.5rem 0 2rem;
        padding: 0.85rem 1rem;
        border-left: 4px solid #0074D9;
        background: #f7f9fb;
        color: #555;
    }

    .stegorank-updated p {
        margin-bottom: 0;
    }

    .stegorank-paths {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 2rem 0 2.5rem;
    }

    .stegorank-path {
        border-left: 3px solid #0074D9;
        background: #fafafa;
        padding: 1rem 1.1rem;
    }

    .stegorank-path h3 {
        font-size: 1.25rem;
        margin: 0 0 0.55rem;
    }

    .stegorank-path p {
        color: #555;
        font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 1.1rem;
        line-height: 1.55;
        margin: 0;
    }

    .stegorank-path a {
        font-weight: 700;
    }

    @media only screen and (max-width: 700px) {
        .stegorank-paths {
            grid-template-columns: 1fr;
        }
    }


    h2 {
        margin-top: 4rem;
    }

    .stegorank-figure {
        margin: 2.5rem 0;
        text-align: center;
    }

    .stegorank-figure img {
        max-width: 100%;
        height: auto;
    }

    .stegorank-figure .caption {
        margin-top: 0.85rem;
        color: #333;
        font-size: 1.3rem;
        font-weight: 500;
    }


    .stegorank-rating {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
        white-space: nowrap;
    }

    .stegorank-rating-bars {
        display: inline-flex;
        gap: 4px;
        vertical-align: middle;
    }

    .stegorank-rating-bars span {
        display: inline-block;
        width: 18px;
        height: 12px;
        border-radius: 2px;
        background: #e1e1e1;
    }

    .stegorank-rating-1 .stegorank-rating-bars span:nth-child(-n+1) { background: #e60000; }
    .stegorank-rating-2 .stegorank-rating-bars span:nth-child(-n+2) { background: #e67e22; }
    .stegorank-rating-3 .stegorank-rating-bars span:nth-child(-n+3) { background: #d6a500; }
    .stegorank-rating-4 .stegorank-rating-bars span:nth-child(-n+4) { background: #4f9d69; }
    .stegorank-rating-5 .stegorank-rating-bars span:nth-child(-n+5) { background: #00d15f; }

    .stegorank-rating-label {
        color: #444;
        font-size: 1rem;
        line-height: 1.2;
    }
</style>


StegoRank tracks the current state of image steganography techniques and tools, with a particular focus on how detectable they are under practical steganalysis.

The comparison is organized around the underlying embedding techniques, because many tools implement the same or closely related methods. This makes it easier to understand what is actually being evaluated: the tool, the technique behind it, the payload, and the detector used to analyze it.

<div class="stegorank-updated">
  <p><strong>Last updated:</strong> 26 June 2026. This is a living section: results and classifications may change as tools, detectors, and comparison protocols are updated.</p>
</div>

<div class="stegorank-paths">
  <div class="stegorank-path">
    <h3><a href="#comparison-charts">See the comparison</a></h3>
    <p>Quick access to the charts comparing detectability in uncompressed images, JPEG images, and AI-generated images.</p>
  </div>
  <div class="stegorank-path">
    <h3><a href="#techniques-and-tools">Find a technique</a></h3>
    <p>A compact list of families, embedding domains, represented tools, and resistance to detection.</p>
  </div>
  <div class="stegorank-path">
    <h3><a href="/stegorank/adaptive-spatial-en/">Understand adaptive methods</a></h3>
    <p>A recommended entry point for HILL, S-UNIWARD, and other techniques that select less detectable regions.</p>
  </div>
  <div class="stegorank-path">
    <h3><a href="#how-to-read-these-results">Interpret the results</a></h3>
    <p>Notes on payload, image source, detectors, and why the ranking should not be read as a universal guarantee.</p>
  </div>
</div>

<div class='menu' style='margin-top:50px'></div>

1. [Comparison charts](#comparison-charts)
2. [Techniques and tools](#techniques-and-tools)
3. [How to read these results](#how-to-read-these-results)

## Comparison charts

The charts below are the quickest way to read the current comparison. They show how detectable different image steganography techniques and tools are under the evaluated conditions.

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison.png" alt="Comparison of steganography methods in uncompressed images">
  <div class="caption">Comparison of steganography in uncompressed images such as PNG, TIF, and BMP.</div>
</div>

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/tool_comparison_jpeg.png" alt="Comparison of steganography methods in JPEG">
  <div class="caption">Comparison of steganography in JPEG.</div>
</div>

<div class="stegorank-figure">
  <img src="/stego/aletheia/v03/resources/stable_diffusion_side_informed.png" alt="Comparison of conventional and side-informed steganography in Stable Diffusion images">
  <div class="caption">Comparison of steganography methods evaluated on Stable Diffusion generated images. HILL, UNIWARD, SI-HILL and SI-UNIWARD accuracy is averaged over EfficientNet-B0 and SRNet; the generative Stable Diffusion point is shown at 0.02 bpp with chance-level detection.</div>
</div>

## Techniques and tools

Many tools implement the same or closely related techniques. The tables below link each family to its note and give a compact reading of the tools represented in the comparison. For a broader catalogue, see the [steganography tools list](/stego/intro/tools-en/).

### Uncompressed Images

Methods applied to pixels or samples in images without lossy compression, such as PNG, TIF, or BMP. This includes simple LSB-based techniques and modern adaptive methods.

| Technique family | Software using this technique | Detection resistance |
|---|---|---|
| [LSB replacement](/stegorank/lsb-replacement-en/) | [OpenStego](https://www.openstego.com), [OpenPuff](https://embeddedsw.net/OpenPuff_Steganography_Home.html) | <span class="stegorank-rating stegorank-rating-4" title="Partially detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Partially detectable</span></span> |
| [LSB matching](/stegorank/lsb-matching-en/) | Research / experimental implementations | <span class="stegorank-rating stegorank-rating-4" title="Partially detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Partially detectable</span></span> |
| [HILL](/stegorank/hill-en/) | [HStego < 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-4" title="Partially detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Partially detectable</span></span> |
| [S-UNIWARD](/stegorank/s-uniward-en/) | [HStego 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-5" title="Hard to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Hard to detect</span></span> |

### AI-Generated Images

In this block, the image source is part of the problem. Detecting that an image comes from a generator is not enough for general-purpose generators such as Stable Diffusion: the relevant setting is distinguishing cover and stego images produced by the same source.

| Technique family | Software using this technique | Detection resistance |
|---|---|---|
| [Generative steganography](/stegorank/generative-steganography-en/) | [SteganoGAN](https://github.com/DAI-Lab/SteganoGAN)<br>[mas_GRDH](https://ieeexplore.ieee.org/abstract/document/10637346) | <span class="stegorank-rating stegorank-rating-1" title="Very easy to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Very easy to detect</span></span><br><span class="stegorank-rating stegorank-rating-5" title="Hard to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Hard to detect</span></span> |
| [SI-HILL](/stegorank/si-hill-en/) | Experimental implementation | <span class="stegorank-rating stegorank-rating-5" title="Hard to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Hard to detect</span></span> |
| [SI-UNIWARD](/stegorank/si-uniward-en/) | Experimental implementation | <span class="stegorank-rating stegorank-rating-5" title="Hard to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Hard to detect</span></span> |

### JPEG Images

Methods that operate on JPEG coefficients or tools designed for this format. The comparison separates older techniques, practical end-user tools, and more recent adaptive methods.

| Technique family | Software using this technique | Detection resistance |
|---|---|---|
| [Older JPEG-domain methods](/stegorank/jpeg-domain-en/) | [Outguess](https://github.com/daniellerch/stego-collection/tree/master/outguess) and others | <span class="stegorank-rating stegorank-rating-1" title="Very easy to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Very easy to detect</span></span> |
| [F5](/stegorank/f5-en/) | [F5](https://github.com/daniellerch/stego-collection/tree/master/F5) | <span class="stegorank-rating stegorank-rating-1" title="Very easy to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Very easy to detect</span></span> |
| [Steghide](/stegorank/steghide-en/) | [Steghide](https://steghide.sourceforge.net/index.php) | <span class="stegorank-rating stegorank-rating-2" title="Easy to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Easy to detect</span></span> |
| [J-UNIWARD](/stegorank/j-uniward-en/) | [HStego < 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-4" title="Partially detectable"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Partially detectable</span></span> |
| [J-UNIWARD + Cost Polarization](/stegorank/j-uniward-cost-polarization-en/) | [HStego 0.4](https://github.com/daniellerch/hstego) | <span class="stegorank-rating stegorank-rating-5" title="Hard to detect"><span class="stegorank-rating-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span><span class="stegorank-rating-label">Hard to detect</span></span> |

## How to read these results

The rating summarizes resistance to detection in the evaluated setting. For the Aletheia comparison rows, it is computed separately for each domain from the mean detector accuracy across the payloads shown in the charts: within each domain, the highest mean accuracy maps to one red rectangle and the lowest mean accuracy maps to five green rectangles. Rows based on Stable Diffusion images follow the protocol reported in their corresponding method notes. The rating should not be read as a universal ranking of tools, and it does not imply undetectability. Detectability depends on several factors:

- payload;
- image source;
- image format and embedding domain;
- implementation details;
- detector and training data;
- whether evaluation is performed within the same source or across different sources.

For this reason, StegoRank treats tools as practical entry points, but organizes the comparison around techniques and evaluation conditions.
