---
layout: page
title: "Image Steganography"
subtitle: ""
noindex: false
meta-title: "Image Steganography: Techniques, Tools and Detectability"
meta-description: "A practical reference on image steganography: spatial methods, JPEG methods, adaptive embedding, tools, payload, and detectability."
meta-keywords: "image steganography, steganography, LSB steganography, JPEG steganography, adaptive steganography, HStego, StegoRank"
lang-suffix: "-en"
alternate-en: "/image-steganography-en/"
alternate-es: "/image-steganography-es/"
comments: false
schema_type: "Article"
---

Image steganography hides information inside an image while trying to keep the
result visually and statistically plausible. The original image is the
**cover**, the modified image is the **stego image**, and the hidden data is the
**payload**.

The practical question is not only whether a message can be embedded and
extracted. A useful image steganography method must also consider how detectable
the changes are, what image format is being used, how much payload is embedded,
and whether the image will later be resized, recompressed, or uploaded to a
platform that modifies it.

For short definitions, see the [steganography FAQ](/stego/intro/faq-en/). For
the detection side of the same problem, see [image steganalysis](/image-steganalysis-en/).

<div class='menu'></div>

## Contents

1. [What image steganography tries to achieve](#what-image-steganography-tries-to-achieve)
2. [Why the image format matters](#why-the-image-format-matters)
3. [Spatial-domain image steganography](#spatial-domain-image-steganography)
4. [JPEG-domain image steganography](#jpeg-domain-image-steganography)
5. [Adaptive embedding and cost functions](#adaptive-embedding-and-cost-functions)
6. [Capacity and detectability](#capacity-and-detectability)
7. [Tools and practical resources](#tools-and-practical-resources)
8. [Related reading](#related-reading)

## What image steganography tries to achieve

Image steganography is different from encryption. Encryption protects the
content of a message, but it does not hide the fact that a protected message
exists. Steganography tries to hide the existence of the communication itself by
embedding the message inside an apparently ordinary image.

In practice, many systems combine both ideas: the message is encrypted first and
then embedded into the image. If the stego image is discovered, encryption still
protects the content; if the stego image is not detected, the communication
remains hidden.

The main constraint is detectability. A method that changes many pixels or DCT
coefficients may preserve visual quality but still leave statistical traces that
an image steganalysis detector can find.

## Why the image format matters

The embedding domain depends on the image format:

- In lossless raster images such as PNG or BMP, methods usually modify pixel
  values directly. This is often called **spatial-domain steganography**.
- In JPEG images, methods usually modify quantized DCT coefficients, because
  JPEG stores the image in a transformed and compressed representation.
- In AI-generated images, the distribution of the image source may differ from
  camera images or edited images, which can affect both embedding and detection.

This distinction is essential. If a spatial steganography method is applied to a
PNG and the image is later saved as JPEG, the hidden message may be destroyed.
If a JPEG-domain method is used, recompressing the JPEG can also modify the DCT
coefficients and break extraction.

For more detail, see the chapters on [steganography in lossless raster images](/stego/books/stegopython/bitmapimages-en/)
and [steganography in JPEG images](/stego/books/stegopython/jpegimages-en/).

## Spatial-domain image steganography

Spatial-domain methods modify pixel values directly. The classic example is
[LSB steganography](/stego/intro/lsb-en/), where the least significant bits of
pixel samples are used to store message bits.

With **LSB replacement**, a pixel value is changed only when its least
significant bit does not match the message bit. If a modified value is even, it
can only become odd; if it is odd, it can only become even. This parity behavior
is useful for understanding why simple LSB replacement can be detected
statistically.

With **LSB matching**, the pixel value is randomly increased or decreased when a
change is needed. This avoids the same parity artifact, but it still changes the
distribution of neighboring values and can be detected by stronger methods.

Modern spatial steganography usually avoids modifying pixels uniformly. Instead,
it tries to place changes in textured or noisy regions where they are less
detectable. Examples include adaptive methods based on distortion functions such
as HILL or S-UNIWARD.

## JPEG-domain image steganography

JPEG steganography works directly with the JPEG transformed domain. The image is
split into blocks, transformed with the DCT, quantized, and stored as
coefficients. JPEG-domain steganography modifies selected quantized DCT
coefficients rather than editing RGB pixels directly.

Older JPEG methods include F5 and nsF5. They introduced ideas such as matrix
encoding and shrinkage handling, but they are no longer strong against modern
steganalysis in many practical settings.

More modern JPEG methods use adaptive embedding. [J-UNIWARD](/stegorank/j-uniward-en/)
is a representative example: it assigns different costs to possible coefficient
changes and tries to embed the message where the estimated distortion is lower.
Variants such as [J-UNIWARD with cost polarization](/stegorank/j-uniward-cost-polarization-en/)
try to further reduce detectability under specific conditions.

## Adaptive embedding and cost functions

Adaptive steganography assigns a cost to possible modifications and tries to
avoid changes that are likely to be detected. In spatial images, low-cost
locations are often textured or noisy regions. In JPEG images, low-cost
locations are selected among DCT coefficients according to the distortion model.

The payload is then embedded using coding methods such as
[syndrome-trellis codes](/stego/intro/faq-en/#what-are-syndrome-trellis-codes-stc),
which reduce the number and impact of modifications needed to hide a given
message.

Adaptive methods do not make steganography undetectable. They reduce
detectability under a particular model, payload, image source, and detector.
Changing any of those conditions can change the result.

## Capacity and detectability

Capacity is the amount of data that can be hidden. It is often expressed as bits
per pixel in spatial images or bits per non-zero AC coefficient in JPEG images.

Higher payload usually means higher detectability. A small payload spread across
many suitable locations can be difficult to detect, while a large payload forces
more changes and usually leaves stronger traces. This is why practical tools
should not only report whether a file has enough space, but also warn about
payload levels that are likely to be easier to detect.

For a comparison of methods by practical detectability, see
[StegoRank](/stegorank-en/), including [LSB replacement](/stegorank/lsb-replacement-en/),
[adaptive spatial methods](/stegorank/adaptive-spatial-en/), and
[generative steganography](/stegorank/generative-steganography-en/).

## Tools and practical resources

[HStego](https://github.com/daniellerch/hstego) is a practical tool for hiding
data in bitmap and JPEG images. It is listed in [StegoLab](/stegolab-en/#hstego)
and is designed around payload limits intended to reduce detectability in the
supported scenarios.

For broader practical context, see:

- [Steganography tools](/stego/intro/tools-en/)
- [Comparison of image steganography tools](/stego/aletheia/v03/tool-comparison-en/)
- [StegoLab tools and research code](/stegolab-en/)
- [StegoRank image steganography comparison](/stegorank-en/)

## Related reading

- [Image steganalysis](/image-steganalysis-en/)
- [Steganography FAQ](/stego/intro/faq-en/)
- [LSB steganography in images and audio](/stego/intro/lsb-en/)
- [Steganography in lossless raster images](/stego/books/stegopython/bitmapimages-en/)
- [Steganography in JPEG images](/stego/books/stegopython/jpegimages-en/)
- [Publications on steganography and steganalysis](/papers-en/)
