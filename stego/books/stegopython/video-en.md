---
layout: page
title: "Steganography for Python Programmers"
subtitle: "Steganography in Video" 
noindex: false
meta-title: "Steganography for Python Programmers: Steganography in Video"
meta-description: "Chapter 'Steganography in Video' from the book 'Steganography for Python Programmers'"
meta-keywords: "steganography, Python"
lang-suffix: "-en"
comments: true
---

<center style='margin-bottom:30px'>
[ &nbsp; <a href='/books-en'>Index</a> ]
</center>





<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

## Contents

1. [Introduction](#introduction)
2. [Embedding in lossless video](#embedding-in-lossless-video)
    1. [Introduction](#embedding-in-lossless-video)
    2. [Embedding in frames](#embedding-in-frames)
    3. [Embedding in audio](#embedding-in-audio)
    4. [Embedding and re-encoding](#embedding-and-re-encoding)
    5. [Message extraction](#message-extraction)
3. [Video with lossy compression](#video-with-lossy-compression)
 
<br>



<br>
## Introduction

Digital video essentially consists of two types of data: a sequence of images (frames) and an audio track. To apply steganography to video, it is essential to understand how these data are stored and how different formats and compression methods affect information‑hiding techniques.

With respect to frames, some video formats store each image independently and without any loss of information. This is the case for formats such as FFV1, HuffYUV, Apple ProRes 4444 (in its lossless variants), or UT Video. These formats are particularly suitable for steganography because they allow direct pixel‑level modification of each frame using techniques similar to those used on uncompressed images, such as inserting bits in the LSB.

By contrast, most popular video formats use lossy compression to reduce file size. This is the case with H.264, H.265/HEVC, VP9, AV1, and other codecs widely used on streaming platforms and social networks. These compression algorithms apply complex transforms (such as DCT, quantization, and inter‑frame prediction) that significantly alter the original data. Consequently, steganographic techniques that rely on preserving exact pixel values—like least significant bit modification—become more challenging, because pixel‑domain hidden data would be lost during compression.

A similar situation occurs with audio. Some video formats include audio tracks in uncompressed or lossless formats such as PCM, WAV, or FLAC. These allow LSB techniques to be applied without risking the hidden information. However, other formats such as AAC, MP3, or Opus apply lossy compression and discard parts of the audio spectrum considered imperceptible. This implies an irreversible loss of data, which also affects any embedded message.

In summary, the feasibility of applying techniques like LSB to video depends on the type of compression used in both the video and audio tracks. Lossless formats provide a much more controlled and reliable environment for data hiding, whereas lossy formats require more sophisticated approaches.

<br>
## Embedding in lossless video

### Introduction

This section addresses hiding information in lossless videos, which means working with files in which the video and/or audio track is stored without lossy compression. This is fundamental for applying steganography techniques such as least significant bit (LSB) modification, because lossy compression processes remove or alter significant parts of the original data, destroying any hidden information in the process.

For video, you must use a codec that stores frames losslessly, such as FFV1, HuffYUV, or lossless variants of Apple ProRes or UT Video. For audio, you should use codecs such as PCM (typically stored as WAV) or FLAC, which preserve the fidelity of the original samples and are therefore suitable for LSB‑based embedding.

Fortunately, ffmpeg—a powerful and versatile tool—allows you to transcode any video file to a lossless format by explicitly selecting the desired video and audio codecs. Below are some ffmpeg examples for generating files compatible with LSB‑based steganography:

**Video with FFV1 codec and PCM audio (AVI container):**
```bash
ffmpeg -i input.mp4 -c:v ffv1 -c:a pcm_s16le output.avi
```

**Video with HuffYUV codec and PCM audio (AVI container):**
```bash
ffmpeg -i input.mp4 -c:v huffyuv -c:a pcm_s16le output.avi
```

**Video with FFV1 and FLAC audio (MKV container):**
```bash
ffmpeg -i input.mp4 -c:v ffv1 -c:a flac output.mkv
```

**Uncompressed video and PCM audio (MOV container):**
```bash
ffmpeg -i input.mp4 -c:v rawvideo -pix_fmt rgb24 -c:a pcm_s16le output.mov
```

A fundamental aspect of working with video is understanding the difference between *codecs* and *containers*. While codecs (such as ffv1, h264, aac, etc.) are responsible for encoding and compressing audio and video streams, containers (such as .avi, .mov, .mkv, etc.) define how those streams are grouped, organized, and synchronized within a single file.

The container determines the file extension, not the codec itself. For example, the same video compressed with the ffv1 codec can be stored in an .avi, .mov, or .mkv container, and the internal video stream remains exactly the same. However, some containers offer better compatibility with certain codecs or better support for features such as multiple audio tracks, subtitles, or metadata.

**Table 1** shows the most common containers, their extensions, and typically compatible codecs.


| **Ext.** | **Container** | **Video**                    | **Audio**                    |
|---|---|---|---|
| .avi | AVI        | ffv1, huffyuv               | pcm_s16le |
| .mov | QuickTime  | rawvideo, prores            | pcm |
| .mkv | Matroska   | ffv1, h264, vp9             | pcm, flac, opus |
| .mp4 | MP4        | h264, mpeg4                 | aac, mp3 |

<center>
<br>
Table 1. Common containers and compatible codecs
</center>

**Table 1** lists some of the most common containers along with the video and audio codecs they typically use. For steganography, the .avi, .mov, and .mkv containers are especially useful because they allow lossless codecs like ffv1, huffyuv, or pcm_s16le. Conversely, containers like .mp4, while very popular, are oriented toward lossy compression and are not recommended when working with LSB steganography.

Note that lossless formats generate significantly larger files. However, they are essential when applying LSB‑based techniques, such as LSB *matching*, to preserve the integrity of hidden data and ensure it can be extracted.

In the following sections, we will see how to embed information in video by altering both the images and the audio. We will address them separately, though of course both can be done at the same time.

<br>
### Embedding in frames

This section shows how to hide information in the frames of a video that uses a lossless compression codec. When working with lossless video, each frame can be treated as an independent image that preserves all its original pixel values. This allows us to apply techniques similar to those used with uncompressed images, such as least significant bit (LSB) modification.

To access video frames and manipulate them directly from Python, we will use the PyAV library. PyAV provides a high‑level interface for working with video and audio streams based on the popular ffmpeg tool. With PyAV, we can decode the video, extract frames one by one, modify their pixels, and re‑encode them if we want to generate a new file with hidden information.

The key to this approach is that, by keeping compression lossless, the changes made to the frame pixels will not be altered by encoding, ensuring that the embedded information can be accurately recovered.

In the following example, we use PyAV to extract the video’s frames sequentially. As an example of how to insert information, we modify the pixel at position $(0,0)$ by increasing it by one (avoiding overflow using `min`). We use the first color channel—i.e., red.

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
video_stream = container.streams.video[0]

for frame in container.decode(video_stream):
    img = frame.to_ndarray(format='rgb24')
    img[0, 0, 0] = min(img[0, 0, 0] + 1, 255)
```

However, the RGB image is a conversion from the YUV format used by the FFV1 codec. This is undesirable, since the YUV‑to‑RGB conversion will affect the byte LSBs and destroy the message. Therefore, we will not work with RGB but with YUV.

Although many tools and libraries (such as FFmpeg or PyAV) use the term YUV to refer to formats like yuv444p or yuv420p, these names actually refer to a digital color encoding based on the YCbCr color space, which we described earlier. The term YUV comes from the analog world and was defined as a color encoding model used in television. In practice, when we manipulate data in formats like yuv444p, we are working with Y (luminance), Cb (blue difference), and Cr (red difference) components, but using the traditional YUV nomenclature for historical convenience. Thus, we can use YUV as a practical synonym for YCbCr since that is the common term in digital video libraries and formats.

The change to work with YUV is minimal:

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
video_stream = container.streams.video[0]

for frame in container.decode(video_stream):
    yuv = frame.to_ndarray(format='yuv444p')
    yuv[0][0, 0] = min(yuv[0][0, 0] + 1, 255) 
```

Although we have modified the video sample, we still need to store it. This implies not only re‑encoding the video but also the audio, as we do not want to lose it in the process. In the next section we will see how to embed information in the audio channel, and afterwards we will perform the complete process.

<br>
### Embedding in audio

This section shows how to hide information in the audio of a video that uses a lossless compression codec. When working with lossless audio, each sample is stored exactly, which allows direct manipulation of its values without them being altered by encoding. This enables techniques similar to those used in uncompressed audio files (e.g., .wav), including least significant bit (LSB) modification.

To access the audio samples of a video from Python, we will use the PyAV library. PyAV provides a high‑level interface for working with video and audio streams based on ffmpeg. With PyAV, we can decode the audio stream, access the samples as NumPy arrays, modify them, and re‑encode them to generate a new file with hidden information.

The key to this approach is that, by keeping compression lossless, the changes made to audio samples will not be altered by encoding, ensuring that the embedded information can be accurately recovered.

In the following example, we use PyAV to access a video’s audio samples. As an example of how to insert information, we modify the first sample of the first channel by increasing its value by one. Note that we bound the maximum sample value to avoid overflow.

```python
import av
import numpy as np

container = av.open('video_ffv1_pcm.avi')
audio_stream = container.streams.audio[0]

for frame in container.decode(audio_stream):
    samples = frame.to_ndarray() 
    max_val = np.iinfo(samples.dtype).max
    samples[0,0] = min(samples[0,0]+1, max_val)
```

As in the previous section, we still need to save the result. To do so, we must not only re‑encode the audio but also copy the video. We will see the complete process in the next section.

<br>
### Embedding and re-encoding

In the previous sections we saw how to modify the images and the audio samples that make up a video to hide information. However, we have not yet re‑encoded the video to save the result. To store the changes, we need to create an output container into which we will insert the images and audio samples.

The following code implements message embedding in both the video frames and the audio stream using the LSB *matching* technique. The implementation is based on the PyAV library, which allows access to uncompressed frame and audio data.

The process begins by opening the input and output containers with the `open_containers` function, which initializes the objects needed to read and write multimedia data. Next, `setup_streams` configures the output container’s video and audio streams, copying essential parameters such as video resolution, number of audio channels, and channel layout. The video stream is encoded with the lossless FFV1 codec, while the audio is kept as uncompressed PCM.

The message to hide is converted into a bit sequence by `message_to_bits`, which turns each character into its 8‑bit binary representation, thereby generating a list of zeros and ones. The `process_video_frame` and `process_audio_frame` functions then iterate through the video frames and audio sample blocks, respectively. In each iteration, one bit of the message is embedded into the *least significant bit* (LSB) of the corresponding datum: a pixel in the Y channel for video or an audio sample.

Value changes are made using the *LSB matching* technique implemented in `lsb_matching`. This function checks whether the current value already contains the desired bit. If not, it adjusts the value by one unit up or down. When both directions are possible, the adjustment direction is chosen randomly; if the value is at one of the range extremes, the modification is forced inward.

Throughout the embedding process, explicit counters track the current position within the bit sequence for both video and audio. Once all message bits have been inserted, the remaining data are processed without alteration.

Finally, the modified frames and blocks are encoded and written to the output container using PyAV’s encoding and multiplexing functions. Temporal synchronization is preserved by assigning `pts` and `time_base`, ensuring that the resulting file is perfectly playable.

This approach makes it possible to embed complete messages in both the visual and audio components of a media file effectively and with minimal detectability.

```python
import av
import numpy as np
import random

def lsb_matching(value, bit, mx=255, mn=0):
    if value % 2 == bit:
        return value
    if value == mx:
        s = -1
    elif value == mn:
        s = +1
    else:
        s = random.choice([-1, 1])
    return value + s

def message_to_bits(msg):
    return [int(bit) for char in msg.encode('utf-8') 
        for bit in f'{char:08b}']

def open_containers(input_path, output_path):
    in_container = av.open(input_path)
    out_container = av.open(output_path, mode='w')
    return in_container, out_container

def setup_streams(in_container, out_container):
    video_stream = in_container.streams.video[0]
    audio_stream = in_container.streams.audio[0]

    out_video_stream = out_container.add_stream('ffv1', 
                            rate=video_stream.average_rate)
    out_video_stream.width = video_stream.width
    out_video_stream.height = video_stream.height
    out_video_stream.pix_fmt = 'yuv444p'

    out_audio_stream = out_container.add_stream('pcm_s16le', 
                            rate=audio_stream.rate)
    out_audio_stream.channels = audio_stream.channels
    out_audio_stream.layout = audio_stream.layout.name

    return video_stream, audio_stream, out_video_stream, out_audio_stream

def process_video_frame(frame, video_bits, bit_index):
    yuv = frame.to_ndarray(format='yuv444p')
    height, width = yuv.shape[1], yuv.shape[2]

    for y in range(height):
        for x in range(width):
            if bit_index >= len(video_bits):
                break
            bit = video_bits[bit_index]
            yuv[0][y, x] = lsb_matching(yuv[0][y, x], bit)
            bit_index += 1
        else:
            continue
        break

    new_frame = av.VideoFrame.from_ndarray(yuv, 
                               format='yuv444p')
    new_frame.pts = frame.pts
    new_frame.time_base = frame.time_base
    return new_frame, bit_index

def process_audio_frame(frame, audio_bits, bit_index):
    samples = frame.to_ndarray()
    flat = samples.flatten()

    for i in range(len(flat)):
        if bit_index >= len(audio_bits):
            break
        bit = audio_bits[bit_index]
        flat[i] = lsb_matching(flat[i], bit, 
            mx=np.iinfo(flat.dtype).max, 
                mn=np.iinfo(flat.dtype).min)
        bit_index += 1

    samples = flat.reshape(samples.shape)
    new_audio = av.AudioFrame.from_ndarray(samples, 
                                layout=frame.layout.name)
    new_audio.sample_rate = frame.sample_rate
    new_audio.pts = frame.pts
    new_audio.time_base = frame.time_base
    return new_audio, bit_index

def hide(input_path, output_path, message_video, message_audio):
    in_container, out_container =         open_containers(input_path, output_path)
    video_stream, audio_stream, out_video_stream, out_audio_stream =         setup_streams(in_container, out_container)

    video_bits = message_to_bits(message_video)
    audio_bits = message_to_bits(message_audio)
    video_bit_index = 0
    audio_bit_index = 0

    for packet in         in_container.demux((video_stream, audio_stream)):
        for frame in packet.decode():
            if packet.stream.type == 'video':
                new_frame, video_bit_index =                     process_video_frame(frame, 
                        video_bits, video_bit_index)
                for out_packet in                     out_video_stream.encode(new_frame):
                    out_container.mux(out_packet)
            elif packet.stream.type == 'audio':
                new_audio, audio_bit_index =                     process_audio_frame(frame, 
                        audio_bits, audio_bit_index)
                for out_packet in                     out_audio_stream.encode(new_audio):
                    out_container.mux(out_packet)

    for packet in out_video_stream.encode():
        out_container.mux(packet)
    for packet in out_audio_stream.encode():
        out_container.mux(packet)

    out_container.close()
    in_container.close()

message_video = "Hidden in video"
message_audio = "Hidden in audio"
hide('video_ffv1_pcm.avi', 'video_stego_ffv1_pcm.avi', 
     message_video, message_audio)
```

This code provides the tools needed to modify frame LSBs and embed messages that will not be lost when saving the video.

<br>
### Message extraction

In the previous section we saw how to hide information in a video’s image frames and audio samples. Next we show how to extract this information.

The following code implements the extraction of hidden messages from the video and audio channels embedded with the code from the previous section.

The main function, `extract`, coordinates the extraction process. Based on the expected number of bytes in the hidden message, it computes the total number of bits to recover from both video and audio. The input file is processed twice—once for each stream—by the functions `extract_bits_from_video` and `extract_bits_from_audio`.

`extract_bits_from_video` opens the file and accesses the first video stream. It then decodes the frames and converts each into a yuv444p representation. It iterates over the pixels of the luminance (Y) channel, extracting the least significant bit of each value and accumulating it in a list until the desired number of bits is reached.

Similarly, `extract_bits_from_audio` accesses the audio stream of the same file. As it decodes the blocks of samples, it flattens them into a one‑dimensional array and extracts each sample’s LSB, storing these bits in a list until the specified length is reached.

Once both bit sequences have been obtained, `bits_to_message` decodes them. It groups the bits into chunks of 8 and converts them to their corresponding decimal values, thereby reconstructing the original message bytes. The result is interpreted as a UTF‑8 string, ignoring any incomplete trailing bytes.

This approach reliably recovers messages previously hidden in the visual and audio data of the file. To extract precisely, it is essential to know the exact message length in bytes. In more advanced applications, this length could be embedded as a header at the beginning of the message, as described in the image and video chapters.

```python
import av
import numpy as np

def extract_bits_from_video(input_path, num_bits):
    container = av.open(input_path)
    video_stream = container.streams.video[0]
    bits = []

    for frame in container.decode(video_stream):
        yuv = frame.to_ndarray(format='yuv444p')
        height, width = yuv.shape[1], yuv.shape[2]

        for y in range(height):
            for x in range(width):
                if len(bits) >= num_bits:
                    container.close()
                    return bits
                lsb = yuv[0][y, x] & 1
                bits.append(lsb)

    container.close()
    return bits

def extract_bits_from_audio(input_path, num_bits):
    container = av.open(input_path)
    audio_stream = container.streams.audio[0]
    bits = []

    for frame in container.decode(audio_stream):
        samples = frame.to_ndarray().flatten()

        for sample in samples:
            if len(bits) >= num_bits:
                container.close()
                return bits
            lsb = sample & 1
            bits.append(lsb)

    container.close()
    return bits

def bits_to_message(bits):
    chars = []
    for i in range(0, len(bits), 8):
        byte = bits[i:i+8]
        if len(byte) < 8:
            break
        value = int("".join(str(b) for b in byte), 2)
        chars.append(value)
    return bytes(chars).decode('utf-8', errors='ignore')

def extract(input_path, n_bytes_video, n_bytes_audio):
    n_bits_video = n_bytes_video * 8
    n_bits_audio = n_bytes_audio * 8

    bits_video = extract_bits_from_video(input_path, n_bits_video)
    bits_audio = extract_bits_from_audio(input_path, n_bits_audio)

    msg_video = bits_to_message(bits_video)
    msg_audio = bits_to_message(bits_audio)

    return msg_video, msg_audio

msg_video, msg_audio = extract('video_stego_ffv1_pcm.avi', 
                        n_bytes_video=16, n_bytes_audio=16)

print("Video message:", msg_video)
print("Audio message:", msg_audio)
```

<br>
## Video with lossy compression

Up to now we have seen how it is possible to embed information in videos that use lossless compression codecs, since the original data—both images and audio—are preserved intact. This allows working directly with pixel and sample values without risking that the encoding process will destroy the hidden information.

However, when working with videos encoded with lossy compression—such as those using H.264, H.265/HEVC, VP9, or AV1—the situation changes dramatically. These algorithms apply transforms such as the Discrete Cosine Transform (DCT) on pixel blocks followed by quantization processes that remove information considered irrelevant from a perceptual standpoint. For audio, codecs such as MP3, AAC, or Opus use transforms like the MDCT (Modified Discrete Cosine Transform) to achieve compression, again with irreversible information loss.

From a steganographic point of view, the ideal would be to access the transformed coefficients (DCT or MDCT) before quantization—or even after it—to directly modify those values that will be retained in the encoded file. This would allow techniques similar to those used in JPEG steganography, where messages are embedded in the frequency domain.

Unfortunately, within the Python ecosystem there are currently no libraries that provide straightforward, direct access to these coefficients in lossy‑compressed video or audio. Unlike JPEG images—where tools such as python‑jpeg‑toolbox allow working with DCT coefficients—there are no equivalent tools for video streams encoded with H.264 or for MP3/AAC audio tracks.

Although the PyAV library is very powerful, it operates at a higher level and exposes already decoded data—that is, after transforms and quantization have been applied. As a result, any modification you make to PCM or RGB data will be discarded if you subsequently re‑encode using a lossy codec, destroying the hidden message.

This is a significant limitation for those who wish to apply robust steganography directly to compressed videos. To access the transformed coefficients, one would need to modify FFmpeg’s source code or use specific C/C++ libraries that interact with the codecs’ internal decoders—beyond the scope of this book.

In conclusion, while Python lacks tools for directly manipulating DCT or MDCT coefficients in lossy‑compressed streams, robust video steganographic techniques should be applied to lossless media, or developed in languages and environments closer to the codec’s encoding level. This remains an open and relevant research direction for future work on hiding and analyzing information in compressed audiovisual content.
