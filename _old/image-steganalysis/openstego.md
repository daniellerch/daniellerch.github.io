---
layout: page
title: Attack to OpenStego
subtitle: Image Steganalysis of OpenStego
tags: [steganography, steganalysis, images]
---



[OpenStego](https://www.openstego.com/) is a Java tool for hiding information in the spatial domain (steganography and watermarking). At the moment of writing these lines the las version available is v0.7.3.

The analysis this tool was performed using [Aletheia](https://github.com/daniellerch/aletheia).

With a simple experiment we can see that the method used for embedding is LSB replacement. That is, we hide the bits of the message by replacing the least significant bit (LSB) of the pixel. Actually, the tool supports using several pixels per channel, but this is even more detectable.

First we download a copy of the Lena image, then we prepare a file with some secret data and finally we hide the message:

```bash
$ wget http://daniellerch.me/images/lena.png
$ head -500 /dev/urandom | tr -dc A-Za-z0-9 > secret.txt
$ openstego embed -mf secret.txt -cf lena.png -sf stego.png
```

With Aletheia we can check the modifications performed by OpenStego in the stego image:


```bash
$ ./aletheia.py print-diffs lena.png stego.png

Channel 1:
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)]
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...


Channel 2:                                                                                                                            
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)] 
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...

Channel 3:                                                                                                                            
[(226, 227, 1), (223, 222, -1), (221, 220, -1), (223, 222, -1)]
[(229, 228, -1), (234, 235, 1), (174, 175, 1), (180, 181, 1)]
[(190, 191, 1), (204, 205, 1), (202, 203, 1), (204, 205, 1)]
[(210, 211, 1), (208, 209, 1), (207, 206, -1), (204, 205, 1)]
...
```

As you can see in the results, when a pixel of the cover image is even the performed operation is +1 and when a pixel of the cover image is odd the performed operation is -1. This is what happens when the embedding operation is LSB replacement. This anomaly has been exploited by several attacks [[1, 2, 3](#references)].

Let's try a RS attack:

```bash
$ ./aletheia.py rs stego.png 
Hiden data found in channel R 0.25
Hiden data found in channel G 0.24
Hiden data found in channel B 0.27
```

Let's try now with less data:

```bash
$ head -100 /dev/urandom | tr -dc A-Za-z0-9 > secret.txt
$ openstego embed -mf secret.txt -cf lena.png -sf stego.png
$ ./aletheia.py rs stego.png 
Hiden data found in channel R 0.06
Hiden data found in channel G 0.06
Hiden data found in channel B 0.07
```

Obviously, with the original Lena image, the tool does not detect any hidden data:

```bash
$ ./aletheia.py rs lena.png 
No hiden data found
```



## References
[1]. Attacks on Steganographic Systems. A. Westfeld and A. Pfitzmann. Lecture Notes in Computer Science, vol.1768, Springer-Verlag, Berlin, 2000, pp. 61−75. 

[2]. Reliable Detection of LSB Steganography in Color and Grayscale Images. Jessica Fridrich, Miroslav Goljan and Rui Du.
Proc. of the ACM Workshop on Multimedia and Security, Ottawa, Canada, October 5, 2001, pp. 27-30. 

[3]. Detection of LSB steganography via sample pair analysis. S. Dumitrescu, X. Wu and Z. Wang. IEEE Transactions on Signal Processing, 51 (7), 1995-2007.






