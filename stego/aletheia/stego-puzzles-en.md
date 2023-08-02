---
layout: page
title: "Solving Stego-Puzzles with Aletheia"
subtitle: ""
noindex: false
meta-title: "Solving Stego-Puzzles with Aletheia"
meta-description: "Article about the use of the Aletheia tool for solving stego-puzzles"
meta-keywords: "steganography, stegoanalysis, images, stego-puzzles"
lang-suffix: "-en"
---

> In this article, we will see how to use the commands offered by
> [Aletheia](https://github.com/daniellerch/aletheia) to solve stego-puzzles.



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

## Content

1. [Introduction](#introduction)
2. [Text Drawn in Images](#text-drawn-in-images)
3. [Information Hidden in the Alpha Channel](#information-hidden-in-the-alpha-channel)
4. [EOF Techniques](#eof-techniques)
5. [Metadata](#metadata)
6. [Conclusion](#conclusion)

<br>
## Introduction

In this article, we will explore a series of steganography methods
commonly used in stego-puzzles and hacking challenges, and analyze
how they can be detected with the help of the Aletheia tool.

Although the methods used in these types of tests are not the most secure or
sophisticated, their popularity lies in their simplicity and the educational value that
they offer to the participants.

<br>
## Text Drawn in Images

This form of steganography is based on the use of text with colors
similar to those of the target image. That is, a fragment of the
text that is to be hidden is selected and drawn with carefully chosen colors
to blend perfectly with the visual content of the image.
At first glance, the resulting file appears to be just a common
and ordinary image, but in reality, it contains hidden information in the form of text.

To hide the text in the image, it is essential to choose colors that blend
harmoniously and do not attract attention, avoiding harsh contrasts that
could betray the presence of hidden text. This process can be easily
carried out with any graphic editing tool.

Once the text has been camouflaged in the image, the recipient of the
information must use a specific tool or technique to extract
the hidden content and reveal the original message.

This form of steganography represents an interesting and creative way to
hide information in plain sight and is quite common in stego-puzzles or
hacking challenges.

Let's see an example below:


<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/bender_stego.png"/>


At first glance, we cannot perceive the hidden message, as the text
has been drawn using a color with only a one-pixel difference from the
original color.

This technique is not hard to detect. It can be done, for example,
using a filter that highlights the edges, ideal for our case, since we
want to look for changes in color. The following Python code applies a
high-pass filter through
[convolution](https://en.wikipedia.org/wiki/Kernel_(image_processing)).

This operation can be performed using the following Aletheia command:

```bash
$ ./aletheia.py hpf bender_stego.png bender_stego_broken.png
```

Below, we can see the result of applying the filter:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/bender_stego_broken.png"/>


<br>
## Information Hidden in the Alpha Channel

A clever form of image steganography involves hiding
data in an image's alpha channel. The alpha channel, also known as the
transparency channel, is a component found in images that support transparency, such as PNG formats. This channel stores the
opacity or transparency information of each pixel in the image.
Usually, this information is used to define which parts of the image
are visible and which are transparent.

In images with an alpha channel, 4 bytes are typically used for each pixel. The first three bytes represent the R, G, and B values,
meaning the amount of red, green, and blue that encode the pixel's color.
The fourth byte is used to indicate the pixel's transparency level.
Thus, a value of 0 will indicate that the pixel is completely transparent,
while a value of 255 will indicate that the pixel is opaque. All intermediate values
allow us to adjust the pixel's transparency degree.

The following image of Homer has a transparent background.

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer.png"/>

If we read, using Python, the pixel in the top left corner, we can
see how the information related to the pixel value is structured:


```python
from imageio import imread
I = misc.imread('homer.png')
print(I[0,0])
```

<br>
Upon execution, it gives us the following output:


```bash
[0, 0, 0, 0]
```

Each pixel is represented in a Python list with four values (RGBA):
amount of red, amount of green, amount of blue, and transparency level, as we mentioned earlier.

The zero value of the fourth byte tells us that the pixel is completely
transparent, so the values of the three bytes that specify the color
are ignored. This offers us a simple way to hide information.
We can write whatever we want in the first three bytes of each pixel,
as long as the fourth one is zero.

The following Python code reads the data we want to hide from a file
"secret_data.txt" and hides it in the image "homer_stego.png." Each byte
of information is hidden in a pixel where the opacity is zero.
Only "invisible" bytes are overwritten.


```python
from imageio import imread, imsave

f=open('secret_data.txt', 'r')
blist = [ord(b) for b in f.read()]

I = imread('homer.png')

idx=0
for i in range(I.shape[0]):
    for j in range(I.shape[1]):
        for k in range(3):
            if idx<len(blist) and I[i][j][3]==0:
                I[i][j][k] = blist[idx]
                idx += 1

imsave('homer_stego.png', I)
```



<br>
As a result, we obtain the following image:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer_stego.png"/>

The message is hidden from view. But it's not a very secure technique, as it's enough to remove the alpha channel to see that something strange is happening.

This operation can be performed using the following Aletheia command:


```bash
$ ./aletheia.py rm-alpha homer_stego.png homer_stego.png
```

<br>
The result after modifying the opacity is as follows:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/homer_stego_broken.png"/>

As we can see, the background of the image is black. But there is a section at the beginning where the pixels have strange colors. This section corresponds to the data we have hidden. In this case, an attacker would only have to read them, although this technique could have been combined with encryption to keep the information secure.


<br>
## EOF Techniques

EOF (End-of-File) steganography techniques are commonly used to hide information in digital files, such as images, audio, or video. These techniques take advantage of the field known as "EOF" or "End-of-File," found in many formats, which marks the end of the file.

It's common for the programs that use these file formats not to read beyond the "EOF" field, as it's assumed that there is no more data. This allows writing data afterward that, not being read by the software, will not alter its behavior.

To extract the hidden information, it's only necessary to read the information that comes after the "EOF" field and save it to a file.

It's important to note that although EOF steganography techniques are relatively simple, they are insecure. If someone suspects the presence of hidden information, they just need to look if there's information after the "EOF" field.

One of the file formats that allows hiding information at the end, without breaking anything, is the GIF. So if we concatenate, for example, a ZIP file to the end of a GIF image, everything will continue to work as usual. Most image viewers will display the GIF image without any problem.

On Linux/Mac, we can concatenate a ZIP file to a GIF file with the following command:




```bash
cat file.zip >> file.gif
```

And on Windows:

```bash
copy /B file.gif+file.zip file.gif
```

Take the following GIF image of Groot as an example:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/groot.gif"/>

After adding a ZIP file at the end we get the following image:

<img class='image-center' src="{{ site.baseurl }}/stego/aletheia/resources/groot_stego.gif"/>

To extract the hidden file, just execute the following command:

```bash
$ unzip groot_stego.gif
Archive:  groot_stego.gif
warning [groot_stego.gif]:  4099685 extra bytes at beginning or within zipfile
  (attempting to process anyway)
 extracting: hw.txt                  
$ cat hw.txt 
Hello World!
```

This method can be used in different file formats (not necessarily images). Some popular examples, besides GIF, are file formats like PNG or JPEG, among others.

If the file is not a ZIP, as in this case, the extraction process can be a bit more complicated. In this instance, and also as a stegoanalysis tool, we have a command available in Aletheia:


```
./aletheia.py eof-extract groot_stego.gif data.out

Data extracted from groot_stego.gif to data.out (application/zip)

```

As we can see, Aletheia not only extracts the information, but also indicates the type of file that has been extracted. This will allow us to quickly identify whether it is a ZIP, an image, an audio, a video, etc.

Aletheia can extract files from GIF, JPEG, and PNG images.

<br>
## Metadata

Metadata is a set of data that describes and provides information about
other data. In the context of images, metadata offers information about
the structure, origin, and technical characteristics of an image,
without altering the image itself. This can include details such as the brand and the
camera model, the date and time the photograph was taken, the
geographical location, resolution, and color depth, among others.

These auxiliary data have found multiple applications in the organization,
cataloging, and analysis of images. However, they can also be used to
conceal information. Although in this aspect, it must be mentioned that it is not
a very secure method, since anyone who consults the metadata will see
the hidden information.

There are many ways to write information in the image's metadata.
A simple way is to use the "exiftool" tool:


```bash
exiftool -artist="Hello World" image.jpg
```

We can read the metadata using the Aletheia tool with the following command:

```bash
./aletheia.py print-metadata image.jpg
ResolutionUnit           : 1
YResolution              : (1, 1)
YCbCrPositioning         : 1
XResolution              : (1, 1)
Artist                   : Hello World
```




<br>
## Conclusion

Solving stego-puzzles encompasses a fascinating range of techniques and methods, as we have explored in this article. Using Aletheia, we have seen how hidden messages in images can be detected through drawn texts, information hidden in the alpha channel, using EOF techniques, and hiding data as metadata. Despite the security limitations of these techniques, their application in hacking challenges and stego-puzzles offers a valuable and educational perspective in the field of steganography.




