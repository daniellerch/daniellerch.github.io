---
layout: page
title: Welcome
subtitle: ""
noindex: true
meta-title: "Daniel Lerch — Image steganography and steganalysis"
meta-description: "Researcher in image steganography and steganalysis"
lang-suffix: "-en"
canonical: "/"
sitemap: false
redirect: "/"
---

<section class="home-intro">
  <p>Welcome! My name is Daniel Lerch, and this site is dedicated to steganography and steganalysis—the study of hiding information and detecting its presence.</p>

  <figure class="home-stego-demo">
    <div class="home-image-pair">
      <div>
        <img src="/images/hns_peppers.jpg" alt="Image A: peppers">
        <span>Cover image</span>
      </div>
      <div>
        <img src="/images/hns_peppers_stego.jpg" alt="Image B: peppers containing hidden data">
        <span>Stego image</span>
      </div>
    </div>
  </figure>

  <p>The images above look identical, but one contains hidden information. This illustrates the central problem behind image steganography and steganalysis: how to conceal information without revealing its presence, and how to detect the traces it may leave behind.</p>

  <p>Start with the reference pages on <a href="/image-steganography-en/">image steganography</a> and <a href="/image-steganalysis-en/">image steganalysis</a> for an overview of techniques, tools, payload, formats and detectability.</p>
</section>

<section class="home-work" aria-labelledby="explore">
  <h2 id="explore">Explore</h2>

  <article class="home-work-item">
    <h3>Image steganography</h3>
    <p>A practical overview of spatial methods, JPEG-domain embedding, adaptive steganography, payload limits and tools for hiding information in images.</p>
    <a href="/image-steganography-en/">Read the guide <span aria-hidden="true">→</span></a>
  </article>

  <article class="home-work-item">
    <h3>Image steganalysis</h3>
    <p>A reference on detecting hidden messages in images, from simple LSB attacks to JPEG steganalysis, machine learning and Cover Source Mismatch.</p>
    <a href="/image-steganalysis-en/">Read the guide <span aria-hidden="true">→</span></a>
  </article>

  <article class="home-work-item">
    <h3>StegoRank</h3>
    <p>Tracks the current state of image steganography techniques and tools, with a particular focus on how detectable they are under practical steganalysis.</p>
    <a href="/stegorank-en/">Explore StegoRank <span aria-hidden="true">→</span></a>
  </article>

  <article class="home-work-item">
    <h3>StegoLab</h3>
    <p>Research implementations and practical tools for steganography, steganalysis and watermarking. It includes <a href="https://github.com/daniellerch/aletheia">Aletheia</a>, an open source tool for detecting hidden messages in images, and <a href="https://github.com/daniellerch/hstego">HStego</a>, a tool for hiding data in bitmap and JPEG images.</p>
    <a href="/stegolab-en/">Explore StegoLab <span aria-hidden="true">→</span></a>
  </article>

  <article class="home-work-item">
    <h3>Publications</h3>
    <p>My research papers, preprints and related materials on steganography, steganalysis, watermarking and information security.</p>
    <a href="/papers-en/">View publications <span aria-hidden="true">→</span></a>
  </article>
</section>
