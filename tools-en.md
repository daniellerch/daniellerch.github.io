---
layout: page
title: Tools and libs
subtitle: "" 
noindex: false
meta-title: "Tools"
meta-description: "Steganograpy and steganalysis tools"
lang-suffix: "-en"
comments: true
---


<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>


<center style='margin-bottom:30px'>
[ &nbsp; <a href='#aletheia'>Aletheia</a> &nbsp;
| &nbsp; <a href='#hstego'>HStego</a> &nbsp;  
| &nbsp; <a href='#stego-retweet'>Stego Retweet</a> &nbsp; 
|| &nbsp; <a href='#python-jpeg-toolbox'>Python JPEG Toolbox</a> &nbsp;
| &nbsp; <a href='#python-syndrome-trellis-codes'>pySTC</a> &nbsp; ]
</center>




> Here you can find a list of my steganography and steganalysis tools



<div style='margin-bottom:50px'></div>
## Tools
<hr style='border:1px solid #ccc'>

<div style='margin-bottom:50px'></div>
### Aletheia


**[Aletheia](https://github.com/daniellerch/aletheia)** is an open source image steganalysis tool for the detection of hidden messages in images. To achieve its objectives, Aletheia uses state-of-the-art machine learning techniques. It is capable of detecting several different steganographic methods as for example F5, Steghide, LSB replacement, LSB matching and some kind of adaptive schemes.

**Articles on practical steganalysis with Aletheia:**
- [Introduction to steganalysis using Aletheia.](/stego/aletheia/intro-en/)
- [Identifying the steganographic scheme.](/stego/aletheia/identify-en/)
- [Practical attack on Steghide.](/stego/aletheia/steghide-attack-en/)
- [Practical attack on F5.](/stego/aletheia/f5-attack-en/)
- [Practical attack on LSB replacement: OpenStego and OpenPuff.](/stego/aletheia/lsbr-attack-en/)
- [Solving Stego-Puzzles with Aletheia.](/stego/aletheia/stego-puzzles-en/)
- [Comparison of Image Steganography Tools.](/stego/aletheia/tool-comparison-en/)
- [Training models for Aletheia](/stego/aletheia/training-en/).


<div style='margin-top:40px'></div>



<div style='margin-bottom:80px'></div>
### HStego


**[HStego](https://github.com/daniellerch/hstego)** is a tool for hiding data in bitmap and JPEG images. This tool uses some of the most advanced steganography methods known today, along with an upper limit on the amount of data that can be hidden so that it cannot be reliably detected by modern steganalysis tools.

<div style='margin-bottom:80px'></div>
### Stego Retweet

**[Stego Retweet](https://github.com/daniellerch/stego-retweet)** is a tool for hiding messages in Twitter using retweets. Using a list of hashtags provided by the user, this tool finds and retweets some tweets containing especial words. This allows to hide a message that can be read by the user who has the password. The capacity is of two characters per retweet. 


<div style='margin-bottom:50px;margin-top:80px'></div>
## Libs
<hr style='border:1px solid #ccc'>



<div style='margin-bottom:50px'></div>
### Python JPEG Toolbox

**[Python JPEG Toolbox](https://github.com/daniellerch/python-jpeg-toolbox)**  is a library similar to the well-known JPEG Toolbox for Matlab. It allows reading and writing low-level information from JPEG files, such as DCT coefficients or quantization matrices.


<div style='margin-bottom:80px'></div>
### Python Syndrome Trellis Codes

**[PySTC](https://github.com/daniellerch/pySTC)** is a Python interface for Syndrome-Trellis Codes (STC), a method used in steganography to minimize embedding distortion when hiding information within digital media. STCs are linear convolutional codes represented by a parity-check matrix, which allows efficient embedding while preserving the quality of the cover medium.











