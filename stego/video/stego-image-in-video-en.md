---
layout: page
title: "Embedding steganographic images inside videos"
subtitle: ""
noindex: false
published: true
meta-title: "Embedding steganographic images inside videos"
meta-description: "How to insert a steganographic frame into a video, using lossless formats for spatial steganography and MJPEG for JPEG frames."
meta-keywords: "steganography, video, HStego, FFV1, MJPEG, JPEG, recompression, ffmpeg"
lang-suffix: "-en"
comments: false
schema_type: "Article"
sitemap: true
---

> In this article we will see how to embed a steganographic image inside a
> video. We will use HStego to generate the stego image, but the main goal is
> not to study HStego itself. The goal is to understand which video formats can
> preserve that image without destroying the hidden information.

<div class='menu'></div>

## Contents

1. [General idea](#general-idea)
2. [Required tools](#required-tools)
3. [Test video](#test-video)
4. [Why not every video format works](#why-not-every-video-format-works)
5. [Inspecting the original video](#inspecting-the-original-video)
6. [Case 1: spatial steganography in lossless video](#case-1-spatial-steganography-in-lossless-video)
7. [Case 2: JPEG steganography in MJPEG video](#case-2-jpeg-steganography-in-mjpeg-video)
8. [What happens if the video is exported to H.264, H.265 or AV1](#what-happens-if-the-video-is-exported-to-h264-h265-or-av1)
9. [Detectability of this technique](#detectability-of-this-technique)
10. [Limitations](#limitations)
11. [Practical summary](#practical-summary)
12. [Related reading](#related-reading)

## General idea

A video can be seen as a sequence of images. This suggests a simple idea:

1. extract one frame from the video;
2. hide information inside that frame using an image steganography tool;
3. insert the modified frame back into the video;
4. extract the frame again and recover the message.

The problem is step 3. Many video formats do not store frames exactly as we see
them. They transform them, quantize them and predict them from other frames. If
the stego frame is encoded with a lossy codec, the hidden information may be
destroyed.

That is why we should distinguish two scenarios:

| Type of steganography | What must be preserved | Reasonable video format |
|---|---|---|
| Spatial, over pixels | pixel values | FFV1, HuffYUV, rawvideo, PNG sequence |
| JPEG, over DCT coefficients | compressed JPEG frame | MJPEG without re-encoding the frame |

In the first case, we want the pixels to survive exactly. In the second case, we
want the compressed JPEG to survive, because the hidden information is tied to
the JPEG DCT coefficients.

## Required tools

To reproduce the commands you need `ffmpeg`, `ffprobe` and `hstego`.
`ffprobe` is normally installed together with `ffmpeg`.

On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install ffmpeg
sudo snap install hstego
```

On macOS, if you use Homebrew:

```bash
brew install ffmpeg
```

HStego can be downloaded from its repository:

[https://github.com/daniellerch/hstego](https://github.com/daniellerch/hstego)

The MJPEG case requires HStego 0.6.1 or later. Check the installed version with
`hstego --version`. If Snap's stable channel still provides an earlier version,
download the executable for your system from the [latest HStego
release](https://github.com/daniellerch/hstego/releases).

On Windows, a practical option is to install `ffmpeg` with Chocolatey or Scoop:

```powershell
choco install ffmpeg
```

```powershell
scoop install ffmpeg
```

To check that everything is available:

```bash
ffmpeg -version
ffprobe -version
hstego --help
```

## Test video

To make the example reproducible, we will always use the same video:

[Download test video](/stego/video/resources/stego-image-in-video-sample.mp4)

From the terminal:

```bash
curl -L -o input.mp4 https://daniellerch.me/stego/video/resources/stego-image-in-video-sample.mp4
```

If you are working from a local copy of this website, you can also copy it:

```bash
cp stego/video/resources/stego-image-in-video-sample.mp4 input.mp4
```

## Why not every video format works

Common distribution encodings with H.264, H.265/HEVC, VP9 or AV1 use lossy
compression. With those settings, the codec may:

- change pixel values;
- apply transforms and quantization;
- use prediction between frames;
- smooth noise or small details;
- change the color space and chroma subsampling;
- discard information considered visually irrelevant.

This is exactly the opposite of what we need to preserve image steganography.

If a message is hidden in a PNG image by modifying pixels and the result is then
converted to H.264, the message will usually be destroyed. If a message is
hidden in a JPEG by modifying DCT coefficients and that frame is encoded again,
the coefficients will usually change and extraction will fail.

The first step, therefore, is not extracting a frame. The first step is deciding
which working format is needed for each case.

## Inspecting the original video

Before modifying anything, inspect the video:

```bash
ffprobe -hide_banner input.mp4
```

This command tells us which codec the video uses, which pixel format it has,
what its framerate is and whether it contains audio. With the test video, the
output is:

```text
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'input.mp4':
  Metadata:
    major_brand     : mp42
    minor_version   : 0
    compatible_brands: mp42mp41isomavc1
    creation_time   : 2015-03-03T19:38:38.000000Z
  Duration: 00:00:09.05, start: 0.000000, bitrate: 4235 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 3974 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      creation_time   : 2015-03-03T19:38:38.000000Z
      handler_name    : L-SMASH Video Handler
      vendor_id       : [0][0][0][0]
      encoder         : AVC Coding
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 256 kb/s (default)
    Metadata:
      creation_time   : 2015-03-03T19:38:38.000000Z
      handler_name    : L-SMASH Audio Handler
      vendor_id       : [0][0][0][0]
```

The important parts are `Video: h264` and `yuv420p`: this is a lossy video with
chroma subsampling. It is not a good format for preserving a stego image. We
also see `29.97 fps`, which we will need later if we rebuild the video from a
frame sequence.

To obtain the exact value we will use with `-framerate`:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=nw=1:nk=1 input.mp4
```

The output is:

```text
30000/1001
```

If the output showed something like `Video: ffv1`, `Video: huffyuv` or
`Video: mjpeg`, the original video would already be closer to a useful working
format. Still, it should be verified, because the container is not enough. A
file can be `.avi`, `.mkv` or `.mov`; what matters is the actual codec of the
video track.

## Case 1: spatial steganography in lossless video

In this case we want to hide information in a lossless image, for example a
PNG. The workflow is:

1. convert the video to FFV1;
2. extract all frames as PNG;
3. modify one frame with HStego;
4. rebuild the video in FFV1;
5. extract the modified frame;
6. recover the message.

First we convert the original video to a lossless format. A practical option is
FFV1 inside MKV:

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -c:v ffv1 -level 3 -pix_fmt bgr0 -c:a copy video-ffv1.mkv
```

Important details:

- `-c:v ffv1` uses a lossless video codec;
- FFV1 encodes each frame without temporal prediction;
- `-pix_fmt bgr0` uses RGB values for the working frames. FFV1 preserves those
  values exactly after the initial conversion, but it does not recover chroma
  subsampling or color information already lost in the input video;
- `-map 0:a? -c:a copy` preserves the original audio when it exists.

Once we have `video-ffv1.mkv`, we extract the frames:

```bash
mkdir -p frames-ffv1
ffmpeg -i video-ffv1.mkv frames-ffv1/frame_%06d.png
```

Create a message:

```bash
printf "mensaje oculto dentro de un frame de video\n" > secret.txt
```

Choose one frame. For example:

```bash
frames-ffv1/frame_000100.png
```

Hide the message with HStego:

```bash
hstego capacity frames-ffv1/frame_000100.png
```

With the test video, the output is:

```text
Capacity: 38684 bytes
```

The message is much smaller than that capacity, so we can embed it:

```bash
hstego embed secret.txt frames-ffv1/frame_000100.png frames-ffv1/frame_000100_stego.png p4ssw0rd
```

Replace the original frame with the stego frame:

```bash
mv frames-ffv1/frame_000100.png frames-ffv1/frame_000100_cover.png
mv frames-ffv1/frame_000100_stego.png frames-ffv1/frame_000100.png
```

Rebuild the video, again losslessly:

```bash
ffmpeg -framerate 30000/1001 -i frames-ffv1/frame_%06d.png -i video-ffv1.mkv -map 0:v:0 -map 1:a? -c:v ffv1 -level 3 -pix_fmt bgr0 -c:a copy video-ffv1-stego.mkv
```

The value of `-framerate` must match the framerate of the original video. It can
be checked with:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=nw=1:nk=1 video-ffv1.mkv
```

Now extract frame 100 again from the resulting video:

```bash
mkdir -p check-ffv1
ffmpeg -i video-ffv1-stego.mkv -vf "select=eq(n\,99)" -frames:v 1 -update 1 check-ffv1/frame_000100.png
```

The numbering is easy to confuse: `frame_000100.png` is file number 100, but in
the `select` filter the first frame is `n=0`. That is why we use `eq(n\,99)`.

Finally, extract the message:

```bash
hstego extract check-ffv1/frame_000100.png recovered.txt p4ssw0rd
cat recovered.txt
```

With the test video, `cat recovered.txt` shows:

```text
mensaje oculto dentro de un frame de video
```

We can also compare the original and recovered messages:

```bash
diff secret.txt recovered.txt
```

If `diff` shows no output, both files are identical. In this test it shows no
differences.

## Case 2: JPEG steganography in MJPEG video

The JPEG case is more delicate. It is not enough to use an MJPEG video and
rebuild it in any way. If the frame is decoded and encoded again as JPEG, the
DCT coefficients may change and the message may be lost.

The correct idea is to work with compressed JPEG frames as units that are
copied, not as images that are recompressed.

The conceptual workflow would be:

1. convert the video to MJPEG;
2. extract the JPEG frames without re-encoding them;
3. modify one of those JPEGs with HStego;
4. rebuild the video by copying the JPEGs as MJPEG frames;
5. extract the JPEGs again from the final video;
6. recover the message.

First we convert the original video to MJPEG. This command preserves the test
video's resolution, frame rate, and audio; only the video codec changes.
Capacity cannot be inferred from resolution: it must be measured on the frame
that will be used.

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -c:v mjpeg -q:v 2 -c:a copy video-mjpeg.avi
```

MJPEG stores each frame as a JPEG image. This makes it interesting for this
experiment, but there is a critical condition: if we later rebuild the video by
re-encoding the frames, the DCT coefficients may change. For JPEG
steganography, we must copy the already-compressed JPEG frames: they must not
be re-encoded.

Extract the JPEG frames while preserving the compressed content:

```bash
mkdir -p frames-mjpeg
ffmpeg -i video-mjpeg.avi -map 0:v:0 -c:v copy frames-mjpeg/frame_%06d.jpg
```

Choose one JPEG frame:

```bash
frames-mjpeg/frame_000100.jpg
```

Before hiding information, check the capacity of the frame:

```bash
hstego capacity frames-mjpeg/frame_000100.jpg
```

With the downloadable test video, the output is:

```text
Capacity: 956 bytes
```

This capacity is for the encrypted content embedded by HStego, not only for the
original file size. For this example, use a short message:

```bash
printf 'JPEG message inside a video frame\n' > secret-jpeg.txt
```

You need HStego 0.6.1 or later. That version fixes handling of JPEGs whose
three components share one quantization table, as is the case for the frames
generated by this FFmpeg command.

Now embed the payload:

```bash
hstego embed secret-jpeg.txt frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_stego.jpg p4ssw0rd
```

This step can take noticeably longer than spatial embedding. HStego computes
adaptive costs over the JPEG DCT coefficients, and the work grows with frame
size; this example processes a 1920x1080 frame without scaling it.

The command finishes without errors and creates `frame_000100_stego.jpg`.
Replace the original frame while keeping it separately for comparison:

```bash
mv frames-mjpeg/frame_000100.jpg frames-mjpeg/frame_000100_cover.jpg
mv frames-mjpeg/frame_000100_stego.jpg frames-mjpeg/frame_000100.jpg
```

Rebuild the video by copying the JPEGs as packets. `-c:v copy` is critical:
FFmpeg does not decode or encode the frames again.

```bash
ffmpeg -framerate 30000/1001 -i frames-mjpeg/frame_%06d.jpg -i video-mjpeg.avi -map 0:v:0 -map 1:a? -c:v copy -c:a copy video-mjpeg-stego.avi
```

Extract the JPEGs from the final video, again without re-encoding them:

```bash
mkdir -p check-mjpeg
ffmpeg -i video-mjpeg-stego.avi -map 0:v:0 -c:v copy check-mjpeg/frame_%06d.jpg
```

Finally, recover and verify the payload:

```bash
hstego extract check-mjpeg/frame_000100.jpg recovered-jpeg.txt p4ssw0rd
diff secret-jpeg.txt recovered-jpeg.txt
cat recovered-jpeg.txt
```

`diff` produces no output and `cat` shows:

```text
JPEG message inside a video frame
```

The important property of this workflow is that the stego JPEG is inserted and
extracted again without being re-encoded. If the reconstruction command is
replaced by a re-encoding step like this:

```bash
ffmpeg -framerate 30000/1001 -i frames-mjpeg/frame_%06d.jpg -i video-mjpeg.avi -map 0:v:0 -map 1:a? -c:v mjpeg -q:v 2 -c:a copy video-mjpeg-stego.avi
```

then the frames are encoded again. In that case, JPEG steganography based on DCT
coefficients may break.

## What happens if the video is exported to H.264, H.265 or AV1

Common distribution codecs do not carry pixel values through unchanged. With
the usual H.264 settings, FFmpeg decodes the frame, normally converts it to
YCbCr 4:2:0, and the encoder applies prediction, transformation, and
quantization. Decoding the MP4 yields a visually similar frame, but some pixel
values have changed. A change of one is enough to alter a least significant
bit.

For that reason, lossy H.264 export does not preserve the spatial payload
embedded in the FFV1/PNG case. A useful test is to take the video with the
stego frame and export it to H.264:

```bash
ffmpeg -i video-ffv1-stego.mkv -c:v libx264 -crf 18 -preset slow video-h264.mp4
```

Then extract the frame:

```bash
mkdir -p check-h264
ffmpeg -i video-h264.mp4 -vf "select=eq(n\,99)" -frames:v 1 -update 1 check-h264/frame_000100.png
```

And try extraction:

```bash
hstego extract check-h264/frame_000100.png recovered-h264.txt p4ssw0rd
```

HStego's integrity check will normally fail, or the message will not be
recovered. This does not mean HStego failed: the spatial payload depended on
exact pixel values, and lossy video encoding changed some of them. A frame
looking identical is not a meaningful verification for LSB.

The effect is even more decisive for the MJPEG/JPEG case. HStego's payload is
stored in the original JPEG DCT coefficients. When MJPEG is transcoded to
H.264, H.265, or AV1, the decoder first turns those coefficients into pixels and
the new encoder creates a different internal representation. The JPEG DCT
coefficients are not carried into the new video, so the JPEG payload should not
be expected to remain extractable after that conversion, even with a lossless
video configuration.

The same should be expected with H.265/HEVC, VP9 or AV1:

```bash
ffmpeg -i video-ffv1-stego.mkv -c:v libx265 -crf 24 video-h265.mp4
ffmpeg -i video-ffv1-stego.mkv -c:v libvpx-vp9 -crf 30 -b:v 0 video-vp9.webm
ffmpeg -i video-ffv1-stego.mkv -c:v libaom-av1 -crf 30 -b:v 0 video-av1.mkv
```

The commands use lossy settings: `-crf 18`, `-crf 24`, and `-crf 30` are not
exact-preservation modes. H.264, H.265, VP9, and AV1 have lossless modes or
profiles, but that alone is insufficient: any color-space, bit-depth, or chroma
subsampling conversion must also be avoided, and extraction must be verified
from the final file. A lossless video codec can preserve a spatial payload if
it preserves pixels exactly, but it does not preserve JPEG coefficients while
converting the JPEG to another codec.

In short, the safe options for this article are specific: FFV1 for the spatial
PNG frame and MJPEG with packet copying for the JPEG frame. For both cases,
`-c:v copy` preserves compressed content when the codec is not meant to change.

## Detectability of this technique

Inserting a stego image inside a video does not automatically make
steganography harder to detect. In some scenarios, the opposite can happen: the
video may provide new anomaly signals.

There are two different detection levels.

The first level is detecting that the video has an unusual format or structure.
For example:

- an FFV1 video in MKV may be normal for archiving or editing, but unusual for
  distribution;
- an AVI with MJPEG may be legitimate, but it is not the usual format for a
  modern platform;
- a video where all frames are intra frames may be much larger than a normal
  H.264 MP4;
- a single frame may have an anomalous compressed size compared with nearby
  frames;
- a stego JPEG frame may stand out if its compressed size or DCT statistics
  differ from neighboring frames.

The second level is detecting the steganography inside the frame. If an analyst
extracts the frames and analyzes them as images, the problem becomes image
steganalysis again:

- in PNG or lossless frames, spatial detectors can be applied;
- in JPEG/MJPEG, detectors based on DCT coefficients can be applied;
- if only one frame contains payload, it may stand out compared with the rest;
- if the payload is high, detection is usually easier.

Therefore, this technique should be understood as a way to transport a stego
image inside a video, not as a guarantee of low detectability.

To reduce detectability, several aspects should be controlled:

- use a low payload;
- distribute the information across several frames;
- choose frames with enough texture or complexity;
- keep all frames within the same encoding pipeline;
- avoid making the stego frame anomalous in size or metadata;
- compare the frames with steganalysis tools before and after embedding;
- analyze the full video as well to detect bitrate or structural anomalies.

In the JPEG/MJPEG case, comparing the stego frame with neighboring frames is
especially important. Even if it is inserted without re-encoding, it may be
suspicious if its compressed size or DCT statistics differ too much from the
normal pattern of the video.

## Limitations

This approach has several important limitations:

- Lossless video is much larger than a normal MP4.
- Reinserting a frame requires rebuilding or remuxing the video.
- In spatial steganography, any lossy re-encoding may destroy the message.
- In JPEG steganography, any JPEG re-encoding may change the DCT coefficients.
- Platforms such as social networks, messaging apps and video services usually
  recompress content.
- If the goal is robustness against editing or recompression, a different kind
  of technique is needed, closer to robust watermarking than to classical
  steganography.

There is also an important conceptual distinction: inserting a steganographic
frame into a video does not automatically turn the method into "video
steganography". In many cases, it is still image steganography transported
inside a video container.

## Practical summary

If you want to embed a steganographic image inside a video:

1. Decide what must be preserved.
2. For spatial steganography, use lossless video such as FFV1.
3. For JPEG steganography, use MJPEG and avoid re-encoding the JPEG frame.
4. Extract the frame, apply steganography and insert it back.
5. Extract the frame again from the final video.
6. Verify message extraction.
7. Do not use lossy encoding, including common H.264, H.265, VP9 or AV1
   settings, if the payload must be preserved.

The key idea is simple: the message does not have to survive the visual video,
but the exact encoding process. If the process changes the pixels or
coefficients on which the message depends, extraction may fail.

## Related reading

- [Steganography FAQ](/stego/intro/faq-en/).
- [Steganography tools](/stego/intro/tools-en/).
- [Steganography in lossless raster images](/stego/books/stegopython/bitmapimages-en/).
- [Steganography in JPEG images](/stego/books/stegopython/jpegimages-en/).
- [Steganography in video](/stego/books/stegopython/video-en/).
- [Image steganography tool comparison](/stego/aletheia/v03/tool-comparison-en/).
