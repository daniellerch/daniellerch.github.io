---
layout: page
title: Tools
subtitle: "" 
noindex: false
meta-title: "Tools"
meta-description: "Steganograpy and steganalysis tools"
lang-suffix: "-en"
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
| &nbsp; <a href='#stego-retweet'>Stego Retweet</a> &nbsp; ]
</center>

> Here you can find a list of my steganography and steganalysis tools

<div style='margin-bottom:50px'></div>
## Aletheia
<hr style='border:1px solid #ccc'>



**[Aletheia](https://github.com/daniellerch/aletheia)** is an open source image steganalysis tool for the detection of hidden messages in images. To achieve its objectives, Aletheia uses state-of-the-art machine learning techniques. It is capable of detecting several different steganographic methods as for example F5, Steghide, LSB replacement, LSB matching and some kind of adaptive schemes.

**Articles on practical steganalysis with Aletheia:**
- [Introduction to steganalysis using Aletheia.](/stego/aletheia/intro-en/)
- [Identifying the steganographic scheme.](/stego/aletheia/identify-en/)
- [Practical attack on Steghide.](/stego/aletheia/steghide-attack-en/)
- [Practical attack on F5.](/stego/aletheia/f5-attack-en/)
- [Practical attack on LSB replacement: OpenStego and OpenPuff.](/stego/aletheia/lsbr-attack-en/)
- [Solving Stego-Puzzles with Aletheia.](/stego/aletheia/stego-puzzles-en/)
- [Comparison of Image Steganography Tools.](/stego/aletheia/tool-comparison-en/)


<div style='margin-top:40px'></div>



<div style='margin-bottom:80px'></div>
## HStego
<hr style='border:1px solid #ccc'>



**[HStego](https://github.com/daniellerch/hstego)** is a tool for hiding data in bitmap and JPEG images. This tool uses some of the most advanced steganography methods known today, along with an upper limit on the amount of data that can be hidden so that it cannot be reliably detected by modern steganalysis tools.

<div style='margin-bottom:80px'></div>
## Stego Retweet
<hr style='border:1px solid #ccc'>

**[Stego Retweet](https://github.com/daniellerch/stego-retweet)** is a tool for hiding messages in Twitter using retweets. Using a list of hashtags provided by the user, this tool finds and retweets some tweets containing especial words. This allows to hide a message that can be read by the user who has the password. The capacity is of two characters per retweet. 


