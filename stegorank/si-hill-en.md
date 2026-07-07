---
layout: page
title: SI-HILL
subtitle: ""
noindex: false
meta-title: "SI-HILL — StegoRank"
meta-description: "StegoRank note on side-informed HILL, evaluated on Stable Diffusion generated images"
lang-suffix: "-en"
comments: false
---


<style>
    h2 {
        margin-top: 4rem;
    }
</style>

SI-HILL is a side-informed version of HILL. It is a general strategy that can be applied in different settings, such as JPEG, Stable Diffusion images, or other scenarios where useful side information is available.

In the StegoRank evaluation described here, SI-HILL is applied to images generated with Stable Diffusion. In that setting, the side information comes from the image synthesis pipeline, specifically the quantization residuals available before rounding the continuous VAE decoder output to 8-bit pixels.

<section class="stegorank-facts" markdown="1">
## Quick Summary
<dl>
  <dt>Method:</dt><dd>side-informed variant of HILL.</dd>
  <dt>Evaluated setting:</dt><dd>AI-generated images from Stable Diffusion, evaluated as uncompressed images.</dd>
  <dt>Side information:</dt><dd>quantization residuals from the synthesis pipeline in the evaluated protocol.</dd>
  <dt>Use:</dt><dd>experimental research method, not an end-user tool.</dd>
  <dt>Main reading:</dt><dd>it uses information available during generation to reduce detectability compared with conventional HILL in the evaluated protocol.</dd>
</dl>
</section>

## Use in tools

SI-HILL is currently represented in StegoRank as an experimental research method, not as an end-user tool. In the evaluated Stable Diffusion protocol, it extends the standard HILL cost function by reducing the cost of modifications whose direction is consistent with the quantization residual of the generated image.

## Detectability results

In the evaluated Stable Diffusion setting, SI-HILL substantially reduces detectability compared with conventional HILL. At 0.10 bits per pixel, the reported detection accuracy is close to chance level against both EfficientNet-B0 and SRNet under the same-source supervised steganalysis protocol.

The result should be interpreted in the context of the evaluated protocol: Stable Diffusion v2.1, 512×512 RGB images, side information from the VAE decoder output, and detectors trained and tested on images generated under the same configuration. At higher payloads, especially 0.20 and 0.40 bpp, the method becomes more detectable.

## Reference paper

- On the Effectiveness of Side-Informed Steganography in Diffusion-Generated Images. Daniel Lerch-Hostalot and David Megías. In Proceedings of the 21st International Conference on Availability, Reliability and Security (ARES '26). To appear, August 2026.

## Related resources

- [StegoRank main article](/stegorank-en/)
- [StegoLab](/stegolab-en/)
- [Aletheia](/stego/aletheia/v03/intro-en/)
- [Steganography tools list](/stego/intro/tools-en/)
