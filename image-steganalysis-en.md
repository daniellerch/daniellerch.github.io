---
layout: page
title: "Image Steganalysis"
subtitle: ""
noindex: false
meta-title: "Image Steganalysis: Detecting Hidden Messages in Images"
meta-description: "A practical reference on image steganalysis: detecting hidden messages in images, spatial and JPEG steganalysis, tools, workflows, and limitations."
meta-keywords: "image steganalysis, steganalysis, detect hidden messages in images, JPEG steganalysis, LSB replacement steganalysis, Aletheia"
lang-suffix: "-en"
alternate-en: "/image-steganalysis-en/"
alternate-es: "/image-steganalysis-es/"
comments: false
schema_type: "Article"
---

Image steganalysis is the study of inferring whether an image has been modified
to hide information. In a realistic case, the analyst does not have the original
cover image, so the analysis is not a direct comparison between two files. The
problem is to evaluate whether a single image, or a set of images, preserves the
expected properties of covers from the same source or shows traces compatible
with a steganographic technique.

For the embedding side of the problem, see [image steganography](/image-steganography-en/).
For short definitions, see the [steganography FAQ](/stego/intro/faq-en/).

<div class='menu'></div>

## Contents

1. [What image steganalysis tries to detect](#what-image-steganalysis-tries-to-detect)
2. [Detection is not the same as extraction](#detection-is-not-the-same-as-extraction)
3. [First checks before running detectors](#first-checks-before-running-detectors)
4. [Spatial-domain steganalysis](#spatial-domain-steganalysis)
5. [JPEG steganalysis](#jpeg-steganalysis)
6. [Machine learning and cover source mismatch](#machine-learning-and-cover-source-mismatch)
7. [Tools and workflows](#tools-and-workflows)
8. [Related reading](#related-reading)

## What image steganalysis tries to detect

Image steganography modifies an image to embed a payload. Image steganalysis
tries to detect those modifications from indirect evidence. Some evidence is
structural, such as file-format artifacts created by a specific tool. Other
evidence is statistical, such as changes in pixel parity, neighboring pixel
relationships, DCT coefficient distributions, or residual noise.

Depending on the context, the goal may be to distinguish cover from stego,
identify the embedding family, estimate the payload, or prioritize suspicious
images in a collection. A steganalysis result is usually probabilistic: a
detector may report that an image is likely to be stego, likely to be cover, or
suspicious under a given model. The result depends on the embedding method,
payload, image source, image format, and detector.

## Detection is not the same as extraction

Detecting that an image probably contains hidden data is different from
extracting the hidden message. Extraction normally requires the correct tool,
algorithm, key, password, or embedding parameters. A detector can find evidence
of steganography even when the payload cannot be recovered.

This distinction matters in forensic and research workflows. A failed extraction
does not prove that an image is clean, and a positive detection does not
automatically reveal the message.

## First checks before running detectors

A practical workflow usually starts with basic file inspection:

- identify the format and whether the file is a lossless raster image, a JPEG,
  or another container;
- inspect metadata and embedded thumbnails;
- check whether the file was recompressed, resized, or exported by a platform;
- compare the image with other images from the same source when possible;
- select detectors that match the format and suspected embedding family.

Generic file inspection is useful, but it is not enough. Modern steganography
often leaves no obvious visual artifact and no simple metadata marker.
Statistical steganalysis is needed when the method is designed to be visually
imperceptible.

## Spatial-domain steganalysis

Spatial-domain steganalysis targets methods that modify pixel values directly.
A classic case is [LSB replacement](/stego/intro/lsb-en/), which changes the
least significant bits of pixel samples.

Simple LSB replacement creates a parity effect: modified even values become odd,
and modified odd values become even. This disturbs statistical relationships
between pairs of values and can be detected by specialized attacks. Practical
examples include [LSB replacement steganalysis with Aletheia](/stego/aletheia/v03/lsbr-attack-en/).

LSB matching and adaptive spatial methods are harder to detect with simple
parity tests, so stronger detectors usually analyze residuals, neighboring
pixels, and higher-order dependencies. Adaptive methods such as HILL or
S-UNIWARD try to minimize detectable distortion, but their performance still
depends on payload and image source.

## JPEG steganalysis

JPEG steganalysis targets changes in quantized DCT coefficients. JPEG
steganography works in this transformed domain, so pixel inspection alone can
miss important evidence.

Older JPEG steganography methods such as F5 and Steghide can often be detected
with targeted attacks or tool-specific analysis. See the practical Aletheia
guides for [F5 steganalysis](/stego/aletheia/v03/f5-attack-en/) and
[Steghide steganalysis](/stego/aletheia/v03/steghide-attack-en/).

Modern JPEG steganalysis often uses features extracted from DCT coefficients,
calibration, residual models, or neural networks. These detectors are sensitive
to experimental conditions: image source, JPEG quality, payload, and previous
processing can all affect reliability.

For the embedding side, see [steganography in JPEG images](/stego/books/stegopython/jpegimages-en/)
and the StegoRank entries for [J-UNIWARD](/stegorank/j-uniward-en/) and
[J-UNIWARD with cost polarization](/stegorank/j-uniward-cost-polarization-en/).

## Machine learning and cover source mismatch

Many modern detectors are trained with machine learning. They learn statistical
differences between cover and stego images from a training set, then apply that
model to new images.

This creates a major limitation: **Cover Source Mismatch**. If the training
images come from one source and the analyzed images come from another, detector
performance can degrade. Cameras, resizing pipelines, JPEG quality factors,
editing software, and generative image models can all change the cover
distribution.

For this reason, a reliable steganalysis workflow should use source-aware
datasets whenever possible and should interpret scores as evidence under a
specific model, not as universal proof.

## Tools and workflows

[Aletheia](https://github.com/daniellerch/aletheia) is an open source image
steganalysis tool for detecting hidden messages in images. It includes commands
and models for several common steganography families. The practical guide
[image steganalysis with Aletheia](/stego/aletheia/v03/intro-en/) is a good
entry point.

Useful related resources:

- [Identifying the steganographic scheme with Aletheia](/stego/aletheia/v03/identify-en/)
- [Comparison of image steganography tools](/stego/aletheia/v03/tool-comparison-en/)
- [StegoRank image steganography detectability comparison](/stegorank-en/)
- [StegoLab tools and research code](/stegolab-en/)
- [Steganography tools](/stego/intro/tools-en/)

## Related reading

- [Image steganography](/image-steganography-en/)
- [Steganography FAQ](/stego/intro/faq-en/)
- [LSB steganography in images and audio](/stego/intro/lsb-en/)
- [Steganography in JPEG images](/stego/books/stegopython/jpegimages-en/)
- [Image steganography and steganalysis publications](/papers-en/)
