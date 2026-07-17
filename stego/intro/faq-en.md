---
layout: page
title: "Steganography FAQ"
subtitle: ""
noindex: false
meta-title: "Steganography FAQ"
meta-description: "FAQ about steganography"
meta-keywords: "steganography, faq, frequently asked questions"
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
</style>

<div class='menu' style='margin-top:50px'></div>

## Content

### First concepts
- [What is steganography?](#what-is-steganography)
- [What is steganalysis?](#what-is-steganalysis)
- [What are cover, stego, and payload?](#what-are-cover-stego-and-payload)
- [What are embedding and extraction?](#what-are-embedding-and-extraction)
- [What is a steganographic key?](#what-is-a-steganographic-key)
- [What is the difference between cryptography and steganography?](#what-is-the-difference-between-cryptography-and-steganography)
- [What is the difference between watermarking and steganography?](#what-is-the-difference-between-watermarking-and-steganography)

### Hiding Information
- [In what media can steganography be used?](#in-what-media-can-steganography-be-used)
- [What is the difference between spatial and JPEG steganography?](#what-is-the-difference-between-spatial-and-jpeg-steganography)
- [What is the DCT?](#what-is-the-dct)
- [What is the LSB? / What is LSB steganography?](#what-is-the-lsb--what-is-lsb-steganography)
- [What is LSB replacement?](#what-is-lsb-replacement)
- [What is LSB matching?](#what-is-lsb-matching)
- [What is F5 steganography?](#what-is-f5-steganography)
- [What is StegHide?](#what-is-steghide)
- [What is adaptive steganography?](#what-is-adaptive-steganography)
- [What is a cost function?](#what-is-a-cost-function)
- [What is distortion?](#what-is-distortion)
- [What is the trade-off between capacity and detectability?](#what-is-the-trade-off-between-capacity-and-detectability)
- [What is cover selection?](#what-is-cover-selection)
- [What is the difference between robust and fragile steganography?](#what-is-the-difference-between-robust-and-fragile-steganography)
- [Why can recompression or resizing break a hidden message?](#why-can-recompression-or-resizing-break-a-hidden-message)

### Detection and Steganalysis
- [What is detectability?](#what-is-detectability)
- [What does low detectability mean?](#what-does-low-detectability-mean)
- [What are structural attacks?](#what-are-structural-attacks)
- [What is a known-cover attack?](#what-is-a-known-cover-attack)
- [What is the Cover Source Mismatch?](#what-is-the-cover-source-mismatch)
- [What are rich models?](#what-are-rich-models)
- [What is CNN-based steganalysis?](#what-is-cnn-based-steganalysis)
- [What is calibration in JPEG steganalysis?](#what-is-calibration-in-jpeg-steganalysis)
- [What is batch steganalysis?](#what-is-batch-steganalysis)

### Modern Methods
- [What is matrix encoding?](#what-is-matrix-encoding)
- [What are wet paper codes?](#what-are-wet-paper-codes)
- [What are syndrome-trellis codes (STC)?](#what-are-syndrome-trellis-codes-stc)
- [What is generative steganography?](#what-is-generative-steganography)

### Evaluation Metrics
- [What are false positives and false negatives?](#what-are-false-positives-and-false-negatives)
- [What are ROC and AUC?](#what-are-roc-and-auc)
- [What is the difference between accuracy and balanced accuracy?](#what-is-the-difference-between-accuracy-and-balanced-accuracy)
- [What is payload estimation?](#what-is-payload-estimation)
- [What is multi-class steganalysis?](#what-is-multi-class-steganalysis)

### Tools
- [What is Aletheia?](#what-is-aletheia)
- [What is StegoRank?](#what-is-stegorank)

<br>
## What is steganography?

The term "steganography" comes from the Greek words "steganos" (hidden) and "graphos" (to write), and it literally translates as "hidden writing." This discipline refers to the art and science of hiding a message or information within other information in such a way that it is not noticeable.

Unlike cryptography, where a message is encoded so that it cannot be read without the appropriate key, steganography aims to hide the message itself, so its existence cannot be detected.

A classic example of steganography is writing with invisible ink on a letter. While a casual observer would only see the visible message written with regular ink, someone in the know could reveal the hidden message, for instance, by heating the paper.

In the digital realm, steganography often involves embedding information within multimedia files, such as images, audios, or videos. For example, one could hide a text message within an image by slightly altering the image's pixel values in a way that's imperceptible to the naked eye. Only someone who knows there's a hidden message and how to extract it would be able to access it.

It's important to note that while cryptography focuses on protecting the integrity and confidentiality of a message, steganography focuses on keeping the existence of the message secret. On some occasions, both techniques can be combined to provide an additional layer of security.

## What is steganalysis?

Steganalysis is the process of detecting and possibly extracting information hidden using steganographic techniques within a medium. While steganography focuses on hiding the existence of a message within another medium (like an image, audio, or video), steganalysis aims to identify and extract these hidden messages.

In other words, if steganography is the art of hiding, steganalysis is the art of uncovering the hidden. Experts in steganalysis use various techniques and tools to detect anomalies or unusual patterns in a file that might indicate the presence of a steganographic message.

The primary reason for conducting steganalysis is usually security. For instance, someone might be covertly transmitting confidential or malicious information using steganographic techniques. This also underscores the significance of steganalysis in combating "stegomalware," which is malware concealed within seemingly benign files using steganographic methods. Through steganalysis, it is possible to detect and counter such threats, thereby preventing potential system compromises or data leaks.

In summary, steganalysis is essentially the countermeasure to steganography, allowing for the detection and potential extraction of hidden data in mediums that, at first glance, would seem normal or unaltered.

## What are cover, stego, and payload?

In steganography, the **cover** is the original object used as the carrier: for
example, an image, audio file, or document with no hidden information. The
**stego** object is the result after embedding the secret message.

The **payload** is the amount of information being hidden. It is often measured
as bits per pixel, bits per coefficient, or as a percentage of the medium's
capacity. In general, the larger the payload, the easier it becomes to detect
that the file has been modified.

## What are embedding and extraction?

**Embedding** is the process of inserting a secret message into a cover to
produce a stego object. **Extraction** is the reverse process: recovering the
hidden message from the stego object.

Some methods require a key, password, or specific parameters during extraction.
Without that information, the message may not be recoverable even if one knows
that the file contains hidden data.

## What is a steganographic key?

A steganographic key is a secret value that controls how the message is embedded
or extracted. For example, it may determine which pixels, coefficients, or
positions are used to hide the information.

It should not be confused with a cryptographic key, although both can be
combined. A common approach is to encrypt the message first and then embed it
using a steganographic method controlled by a key.

## What is the difference between cryptography and steganography?

Cryptography protects the content of the message: it transforms the information
so that it cannot be read without the appropriate key. However, it usually does
not hide the fact that encrypted communication exists.

Steganography tries to hide the existence of the message. Both techniques can be
combined: first the message is encrypted, and then it is embedded into a cover
using steganography.

## What is the difference between watermarking and steganography?

**Watermarking** aims to insert a mark associated with the content, usually to
identify authorship, ownership, provenance, or integrity. The mark may be visible
or invisible, and it is often designed to survive certain transformations.

**Steganography** aims to hide the existence of a communication. The main goal is
not to prove ownership of the file, but to prevent an observer from easily
distinguishing whether it contains a hidden message.

## In what media can steganography be used?


Steganography can be applied in a variety of digital media or carriers. 
Below are some of the most common media in which steganography can be used:

- **Images**: One of the most popular mediums for steganography. 
Techniques can range from simple methods based on the replacement of 
the least significant bit (LSB) to more complex methods involving 
frequency domain transformations, such as the Discrete Cosine 
Transform (DCT) in JPEG images.

- **Audio**: Secret information can be hidden in audio files in 
ways that are inaudible to the human ear. This can be done, for example, 
by modifying the LSB of audio samples.

- **Video**: Since a video file is essentially a series of 
images, image steganography techniques can be applied to each 
frame. Additionally, specific techniques for video can be used, such as modifying 
motion data between frames.

- **Text**: Although less common due to the smaller amount of 
redundant data in text compared to other media, it's possible to hide 
information in texts using additional spaces, tabs, or changes in the character sequence. It's also possible to substitute words or groups of words with synonyms, thereby encoding a different message.

- **Network protocols**: Steganography can be used to hide information 
in data packets transmitted over networks, by manipulating certain fields or 
deliberately introducing anomalies that contain hidden data, as well as 
altering transmission times.

- **File systems**: Some file systems have areas that aren't commonly 
used (like slack blocks or metadata) where information can be hidden.

- **Digital documents**: In formats like PDF or Word, it's possible to hide 
information in metadata, white spaces, or by using nearly invisible text colors.

## What is the difference between spatial and JPEG steganography?

Spatial steganography directly modifies pixel values, as in LSB techniques
applied to lossless BMP or PNG images.

JPEG steganography works on the Discrete Cosine Transform (DCT) coefficients
used by the JPEG format. This distinction matters because JPEG is lossy:
recompressing the image can alter or destroy the hidden information.

## What is the DCT?

The DCT, or Discrete Cosine Transform, is a mathematical transform that
represents a signal or image in terms of frequencies. JPEG uses the DCT to
separate visual information into low- and high-frequency components.

In JPEG steganography, many methods modify DCT coefficients instead of pixels.
Techniques such as F5, nsF5, J-UNIWARD, or StegHide embed the message directly
in the transformed domain.

## What is the LSB? / What is LSB steganography?


LSB refers to "Least Significant Bit." It is the bit with the least weight 
in a binary representation of a number. Put simply, in a byte (which consists of 8 bits), 
the LSB is the bit farthest to the right.

The LSB technique is widely used in steganography, especially in 
image steganography. It involves altering the least significant bit 
of an image's pixels to embed a secret message. Since the LSB 
has a minimal impact on the total numeric value of each pixel, changes 
made to the image are usually imperceptible to the human eye, making it 
an effective technique for hiding information.

For example, consider the following byte that represents a pixel value 
in a grayscale image: 10010101. If you wanted to hide the bit 
"1" using the LSB technique, the byte would remain the same since the LSB is already "1".
But if you wanted to hide the bit "0", you could change the LSB from "1" to "0",
resulting in 10010100. Even though there has been a change, the difference in the pixel's 
value is minimal and, therefore, hardly noticeable in the image.

There are two common ways to modify the LSB of a value: 
[LSB replacement](#what-is-lsb-replacement) and 
[LSB matching](#what-is-lsb-matching).

## What is LSB replacement?

LSB replacement (or "Least Significant Bit Replacement") is a technique of 
[LSB steganography](#what-is-the-lsb--what-is-lsb-steganography) 
that involves substituting the LSB with the bit of the message you wish to hide.

It's important to note that although LSB Replacement is an effective and 
easy-to-implement technique, it's not the safest. Modern steganalysis tools 
can detect the presence of steganography done using this method.

## What is LSB matching?

LSB Matching is a form of 
[LSB steganography](#what-is-the-lsb--what-is-lsb-steganography).
Like
[LSB Replacement](#what-is-lsb-replacement), it is used to conceal information within the least significant bits of 
multimedia files, such as images.

However, there's a key difference in the way the secret information is introduced. While "LSB Replacement" simply replaces the LSB of a pixel with a bit from the secret message, "LSB Matching" adopts a slightly more sophisticated approach: if the secret message bit matches the pixel's LSB, the pixel remains unchanged. If they don't match, the pixel value is randomly adjusted by either adding or subtracting one from its value.

This method has the advantage of introducing less systematic changes in the 
image, which can make detecting the steganography a bit 
more challenging compared to straightforward LSB replacement. By introducing 
random changes, "LSB Matching" can decrease the statistical anomalies 
introduced by "LSB replacement", which can be detected by 
steganalysis tools.

## What is F5 steganography?

F5 steganography is a steganographic technique designed to hide 
information in JPEG format images. This technique was developed by 
Andreas Westfeld in 2001.

Instead of working with pixels directly, F5 steganography focuses 
on the coefficients of an image's Discrete Cosine Transform (DCT), 
which represent the image's frequency information.

To enhance efficiency and reduce the number of required changes to the 
coefficients, F5 uses a technique called "matrix encoding."

## What is StegHide?

StegHide is a free steganography tool developed by 
Stefan Hetzl in 2003. Its main objective is to hide information, like 
text messages or files, within images or audio files without causing 
perceptible loss or noticeable alterations to the carrier file. 
StegHide works with JPEG format images and audio files.

StegHide utilizes Graph Theory to find pairs of values that can 
be swapped, embedding a message, yet maintaining the 
global statistics of the file. This allows it to evade some steganalysis attacks.

## What is adaptive steganography?

Adaptive steganography tries to hide information in the parts of the cover where
changes are less detectable. In images, this often means preferring textured
areas, edges, or noise, and avoiding smooth regions where small changes may be
more statistically visible.

Modern adaptive methods usually assign a cost to each possible change and then
embed the message while minimizing the total cost.

## What is a cost function?

A cost function assigns a value to each possible modification of the cover. A
low cost means that the change appears less detectable; a high cost means that
the change may leave a clearer statistical trace.

Methods such as HILL, S-UNIWARD, or J-UNIWARD rely on cost functions to decide
where the image should be modified. The quality of the cost function directly
affects the detectability of the method.

## What is distortion?

Distortion is the change introduced into the cover when embedding a message. In
an image, it can be measured as differences in pixels, JPEG coefficients,
histograms, or other statistical features.

Modern methods do not simply try to minimize the number of changes. They try to
place those changes where they are less detectable, which is why distortion is
often modeled using cost functions.

## What is the trade-off between capacity and detectability?

Capacity indicates how much information can be hidden in a cover. Detectability
indicates how easy or difficult it is to detect that information has been hidden.
There is usually a tension between the two: as the payload increases, the number
of changes increases, and so does the probability of detection.

For this reason, practical steganography is not only about asking how much fits
inside an image. It is also about asking how much can be hidden before the
result becomes easy to detect.

## What is cover selection?

**Cover selection** means carefully choosing which files will be used as covers.
Instead of embedding data into any available image, the sender selects files
that are better suited to hiding information with lower detection risk.

For example, an image with a lot of texture may be a better candidate than an
image with large smooth regions, because some changes are less visible in
complex areas.

## What is the difference between robust and fragile steganography?

**Robust** steganography tries to make the message survive transformations such
as recompression, resizing, noise, or cropping. It is closer to some watermarking
scenarios, where the mark should remain present even after the file changes.

**Fragile** steganography may lose the message after small changes to the file.
Many methods designed for low detectability are fragile because they depend on
specific pixel values or coefficients.

## Why can recompression or resizing break a hidden message?

Many steganographic techniques depend on specific pixel values or coefficients.
If a platform recompresses, resizes, or strips metadata from a file, those values
may change and the hidden message may become corrupted or disappear.

This is especially important for social networks, messaging services, and
platforms that automatically optimize images. Being able to extract a message
locally does not guarantee that it will survive after uploading the file to an
external service.

## What is detectability?

Detectability is how easily a steganalyst or tool can distinguish between covers
and stego files. If a method produces statistically visible changes, its
detectability will be high.

Detectability does not depend only on the algorithm. It is also affected by the
message size, image type, compression, cover source, and the dataset used to
train or evaluate the detector.

## What does low detectability mean?

A method has low detectability when it hides the existence of the message
without leaving clear statistical traces in the stego file. It is not enough for
the message to be extracted correctly; the resulting file should also look like
a normal cover.

In practice, detectability depends on the method, the payload, the type of
cover, the key being used, and the detector it is facing. This is why it is
clearer to talk about low or high detectability than security in a generic
sense.

## What are structural attacks?

Although steganography tries to hide information imperceptibly, the data 
embedding process can introduce changes to the structural characteristics of 
the carrier object. These changes, although they might be invisible or 
inaudible to the human observer, can be detected through statistical analysis.

When using LSB (Least Significant Bit) replacement techniques, significant 
statistical anomalies appear. Direct LSB replacement can only turn an even
value into the following odd value, or an odd value into the preceding even
value. As a result, it tends to equalize the frequencies within pairs of
consecutive values (for example, 0/1, 2/3, 4/5), altering the natural
distribution of pixel values.

These anomalies are exploited by a whole family of attacks known as 
"structural attacks", among which the SPA attack, RS attack, and WS attack 
stand out.

## What is a known-cover attack?

A **known-cover** attack occurs when the attacker has both the original cover
and the stego file. By comparing them, the attacker can see exactly which
positions have changed.

This is not the normal setting for practical steganalysis, because the original
cover is usually unavailable. It is mainly useful as an experimental or forensic
scenario for studying how an algorithm modifies the cover and what patterns it
leaves behind.

## What is the Cover Source Mismatch?

The Cover Source Mismatch (CSM) is a significant problem in steganalysis that 
occurs when using machine learning to create models for detecting images that 
use steganography. The problem arises because the models learn from data, 
so a model trained with one image database may not function correctly with 
images from another image database, possibly due to different statistical 
characteristics.

For example, a detector trained with images from a specific camera, development
pipeline, or compression level may degrade when analyzing images from another
device or processed in another way. This is why detectors should be evaluated
with data that is as close as possible to the real target scenario.

## What are rich models?

**Rich models** are steganalysis models based on extracting many statistical
features from the file and using them to train a classifier. For spatial images,
the classic example is SRM (*Spatial Rich Model*); for JPEG images, related
models include JRM.

These models were one of the foundations of modern steganalysis for years and
remain important for understanding how small statistical changes introduced by
steganography can be detected.

## What is CNN-based steganalysis?

**CNN-based steganalysis** uses convolutional neural networks to learn patterns
that distinguish covers from stegos. Instead of manually designing all
statistical features, the model learns useful representations from training
data.

These methods can be powerful, but they depend heavily on the quality and
representativeness of the data. Problems such as Cover Source Mismatch can
strongly affect their performance.

## What is calibration in JPEG steganalysis?

Calibration is a classical JPEG steganalysis technique that tries to estimate
what an image may have looked like before embedding. A common approach is to
decompress the image, crop it slightly, and recompress it to obtain a reference
version.

By comparing features from the suspicious image with features from the
calibrated version, some attacks can detect anomalies introduced by JPEG
steganography methods.

## What is batch steganalysis?

Batch steganalysis analyzes a large set of files instead of studying a single
image in isolation. It can be used to prioritize cases, search for repeated
patterns, or estimate whether a collection contains an unusual proportion of
stego files.

This approach is useful in forensic and monitoring contexts, but false positives
must be controlled carefully: even a small error rate can produce many alerts
when thousands or millions of files are analyzed.

## What is matrix encoding?

**Matrix encoding** is a technique that embeds several message bits while
requiring fewer changes in the cover. Instead of modifying one element for each
bit, it uses an algebraic structure to choose a change that encodes several bits
at once.

F5 uses matrix encoding to reduce the number of required modifications in JPEG
coefficients, improving efficiency and making some types of detection harder.

## What are wet paper codes?

**Wet paper codes** are codes used in steganography when the sender can choose
which positions may be modified, but the receiver does not need to know which
positions were modifiable. The metaphor is writing on paper with "dry" and
"wet" spots: only some positions can be touched.

This concept is useful in adaptive steganography because it allows delicate
positions in the cover to be avoided while concentrating changes in safer areas.

## What are syndrome-trellis codes (STC)?

**Syndrome-trellis codes** (STC) are practical codes for embedding a message
while minimizing a cost function. They are widely used in modern steganography
because they provide an efficient approximation to a low-distortion solution.

In simple terms, STC help decide which changes should be made to encode the
message while producing the smallest statistical trace according to the chosen
cost model.

## What is generative steganography?

Generative steganography hides information during the content generation process,
instead of starting from an existing cover and modifying it. For example, a
system may generate an image, text, or audio conditioned on a secret message, so
that the produced content encodes that information.

The main difference from cover-modification steganography is that there may be no
original file to compare with the result. This changes the detection problem:
steganalysis must look for traces of coding or distributional anomalies in the
generated content, not only for evidence that a previous cover was altered.

## What are false positives and false negatives?

In steganalysis, a **false positive** occurs when a tool classifies a file as
stego even though it does not contain hidden information. A **false negative**
occurs when a stego file goes undetected and is classified as cover.

Both errors matter. A very aggressive detector may produce many false positives,
whereas a very conservative detector may allow too many false negatives.

## What are ROC and AUC?

The **ROC** curve shows the relationship between the true positive rate and the
false positive rate as the decision threshold of a detector changes. It is useful
because it shows how the detector behaves at different operating points.

The **AUC** is the area under the ROC curve. An AUC close to 1 indicates good
separation between covers and stegos; an AUC close to 0.5 indicates performance
similar to random guessing.

## What is the difference between accuracy and balanced accuracy?

**Accuracy** measures the overall percentage of correct decisions made by a
detector. It can be misleading when the classes are imbalanced, for example when
there are many more cover images than stego images.

**Balanced accuracy** measures performance while giving both classes a more equal
weight. In steganalysis, it is often more informative when the number of covers
and stegos is not similar.

## What is payload estimation?

Payload estimation tries to estimate how much information has been hidden in a
stego file. It is different from binary detection, where the goal is only to
decide whether hidden information is present or not.

Estimating the payload is harder because it requires relating the strength of
statistical traces to the amount of embedded message. Even so, it can be useful
for forensic analysis or for comparing the detectability of different methods.

## What is multi-class steganalysis?

Multi-class steganalysis tries to identify not only whether a file contains
steganography, but also which method or family of methods may have been used.

This problem is more complex than binary detection because different techniques
can produce similar traces, and a detector trained on some methods may not
recognize other methods that were not seen during training.

## What is Aletheia?

**Aletheia** is a steganalysis tool developed to detect and analyze image
steganography techniques. It includes attacks against classical methods and
features for training or applying detection models.

It is especially useful as a practical environment for experimenting with cover
and stego images, evaluating detectability, and studying how different attacks
work.

## What is StegoRank?

**StegoRank** is a ranking of steganographic methods and tools focused on their
practical detectability. Its goal is to help compare techniques not only by
whether they can hide information, but by how easy or difficult they are to
detect with steganalysis.

The main idea is that a steganographic tool should not be evaluated only by its
capacity or ease of use, but also by the statistical trace it leaves in the
files it produces.
