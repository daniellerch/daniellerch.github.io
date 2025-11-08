---
layout: page
title: "Steganography for Python Programmers"
subtitle: "Steganography in Network Protocols" 
noindex: false
meta-title: "Steganography for Python Programmers: Steganography in Network Protocols"
meta-description: "Chapter 'Steganography in Network Protocols' from the book 'Steganography for Python Programmers'"
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
2. [Structure of the covert channel](#structure-of-the-covert-channel)  
3. [Scapy and Netfilter](#scapy-and-netfilter)  
   1. [Basic example with PING](#basic-example-with-ping)  
   2. [BPF filters in Scapy](#bpf-filters-in-scapy)  
4. [Real-time traffic modification](#real-time-traffic-modification)  
   1. [Introduction](#real-time-traffic-modification)  
   2. [Intercepting and modifying network traffic](#intercepting-and-modifying-network-traffic)  
   3. [Redirecting to the Netfilter queue](#redirecting-to-the-netfilter-queue)  
   4. [IPTABLES rules](#iptables-rules)  
   5. [Rule removal](#rule-removal)  
   6. [Sending messages by modifying traffic](#sending-messages-by-modifying-traffic)  
   7. [Message reception](#message-reception)  
5. [Packet modification](#packet-modification)  
   1. [The balance of modification](#the-balance-of-modification)  
   2. [Altering TCP timestamps](#altering-tcp-timestamps)  
   3. [Practical example: insertion into TSval](#practical-example-insertion-into-tsval)  
   4. [Message extraction at the receiver](#message-extraction-at-the-receiver)  
   5. [How to conduct a practical test](#how-to-conduct-a-practical-test)  
   6. [Considerations and possible improvements](#considerations-and-possible-improvements)  
   7. [Other modification possibilities](#other-modification-possibilities)  
6. [Transmission delays](#transmission-delays)  
   1. [Delays as a communication channel](#delays-as-a-communication-channel)  
   2. [Delays in ICMP](#delays-in-icmp)  
   3. [Message extraction at the receiver](#message-extraction-at-the-receiver-1)  
   4. [How to test the timing channel](#how-to-test-the-timing-channel)  
   5. [Aspects to consider](#aspects-to-consider)  
7. [Datagram reordering](#datagram-reordering)  
   1. [Reordering instead of modifying](#reordering-instead-of-modifying)  
   2. [Practical example: sender of reordered datagrams](#practical-example-sender-of-reordered-datagrams)  
   3. [Message extraction at the receiver](#message-extraction-at-the-receiver-2)  
   4. [How to run the test](#how-to-run-the-test)  
   5. [Analysis and possible improvements](#analysis-and-possible-improvements)  
8. [Implications and challenges](#implications-and-challenges)



<br>

## Introduction

Steganography in network protocols is one of the least explored areas of information hiding. Unlike traditional steganography—which operates on multimedia files such as images, audio, or video—this approach is based on modifying, manipulating, or exploiting the communication protocols that govern network traffic in order to insert hidden messages without perceptibly altering normal communications.

Network protocols define how data are transmitted between devices, specifying aspects such as packet structure, delivery order, retransmission timing, and other elements essential to the functioning of the Internet. This complexity, together with the enormous volume of legitimate traffic in constant motion, makes protocols a potentially ideal channel for hiding information. Indeed, a subtle alteration of certain fields in an IP packet or an intentional delay between two requests can go unnoticed in a sea of seemingly normal data.

There are multiple steganographic vectors within the world of protocols. Some of the most common include:

- **Modifying header fields** in protocols, such as identification fields in IP, sequence numbers in TCP, or control flags.
- **Manipulating inter‑packet timing**, where the message is encoded in the timing of sent packets.
- **Encapsulating data inside seemingly innocent payloads**, such as HTTP requests, DNS packets, or even redundant headers.
- **Altering the order of packet transmission**, encoding information by changing sequence order covertly.

While the raw capacity of protocol‑based steganography is limited in volume, its ability to blend into controlled or monitored environments is notable. 

<br>
## Structure of the covert channel

Network steganography consists of subtly altering legitimate traffic to insert hidden messages **without interrupting or modifying protocol behavior** or the apparent content of the transmitted information. When a technique is implemented on top of a protocol to transmit extra information covertly, it is known as a **covert channel**.

The effectiveness of a network steganographic communication hinges on the alterations being completely unnoticed both by human observers and by automated traffic‑analysis tools such as Intrusion Detection Systems (IDS). Changes that are too evident may reveal the existence of the covert channel and defeat the purpose of steganography.

Two key actors participate in a covert channel: the **sender** and the **receiver**. The sender introduces the hidden message into the data flow, using steganographic techniques on protocol parameters that allow it. Modifications may range from using reserved or unused bits in protocol headers to more complex strategies such as manipulating inter‑packet timing. The main goal is to make these alterations indistinguishable from normal traffic behavior to any unauthorized observer.

The receiver, in turn, does not modify the traffic but observes it and extracts the hidden message. To do this, it must know the embedding method used and, in many cases, have keys, algorithms, or specific synchronization to correctly decode the hidden information. This process may involve header analysis, timing, statistical patterns, or other indicators previously agreed by both parties.

Ideally, the covert channel should not require creating a brand‑new communication. Instead, the optimal approach is to slightly modify an already legitimate communication, which maximizes undetectability. However, this strategy imposes technical requirements: the sender must have access to—and permission to manipulate—the target network traffic. In the absence of these conditions, the covert channel can be built by initiating an apparently innocent communication onto which hidden messages are later introduced.

For example, a user could open a standard HTTP connection to a legitimate website, generating traffic that appears completely normal to any monitoring system. However, through slight alterations in HTTP header fields—such as cookie values, session identifiers, or custom headers—steganographic information can be transmitted without raising suspicion.

<br>
## Scapy and Netfilter

The techniques covered in this chapter require low‑level access to network traffic. For that purpose, we will use two fundamental tools: the **Scapy** library, which allows constructing and modifying network packets, and the **Netfilter** subsystem, which enables intercepting packets in real time and redirecting them to a user‑space processing queue through the **NetfilterQueue** library.

Scapy is a very versatile tool written in Python that can create, send, capture, and analyze network packets across multiple protocols. It is cross‑platform and can be used on different operating systems. However, its full functionality depends on the underlying OS.

Netfilter is a Linux kernel component that enables filtering, redirecting, and manipulating network traffic. It is the foundation of the well‑known iptables rule system and can redirect packets to a special queue for inspection and modification in user space. This capability is key for steganography on live traffic because it lets us intervene directly in active communications without originating them.

The NetfilterQueue library acts as an interface between the Linux kernel and the Python program that will process the packets. It allows access to packets redirected from iptables, to modify them in real time, and to decide whether to accept, drop, or replace them.

Therefore, to follow the practical examples in this chapter—especially those requiring interception and modification of legitimate traffic—you need a Linux distribution. This can be on physical hardware, a virtual machine, or a containerized environment, provided the system supports iptables, the **nf_netlink_queue** module, and has sufficient privileges to perform low‑level networking operations.

<br>
### Basic example with PING

To illustrate how a covert channel can be built using a simple network protocol, we will examine an example with the **ping** command, widely known for connectivity diagnostics. This command generates an ICMP Echo Request packet sent to a destination; if the host is alive and reachable, it responds with an ICMP Echo Reply.

The **Internet Control Message Protocol (ICMP)** is a fundamental component of the TCP/IP suite. Its main function is to send control and diagnostic messages about the state of the network, enabling detection of transmission errors or remote host availability. Two of the best‑known ICMP message types are Echo Request and Echo Reply.

These two message types are used by the ping tool to check whether a remote host is reachable and to measure round‑trip time. Internally, ping sends an ICMP Echo Request to the destination, and if it responds, an ICMP Echo Reply is received. This mechanism is widely used for basic connectivity tests in computer networks.

Because ICMP packets allow including a payload, we can take advantage of this feature to include a hidden message. Below is a Python example using the Scapy library, which allows constructing and sending network packets easily:

```python
from scapy.all import *

dest = "192.168.0.2"
paquete = IP(dst=dest) / ICMP() / "hello world"

send(paquete)
```

In this example, a destination IP address (192.168.0.2) is defined; it should be replaced with the receiver’s IP address. The constructed packet consists of three parts: an IP header, an ICMP header, and a payload with the text message ``hello world''. The `/` operator concatenates layers in Scapy, creating nested structures.

This method is simple but has important limitations. The hidden information is embedded directly in plaintext in the packets, making it trivially detectable with traffic‑analysis tools. Even so, the example serves as an introduction to key concepts in network steganography.

To recover the message, the receiver does not need to generate traffic or modify packets; it only needs to observe the network. The following code shows how to capture incoming ICMP Echo messages and extract their contents:

```python
from scapy.all import *

def capture(packet):               
    if packet.haslayer(Raw):
        msg = packet[Raw].load
        print(f"Message: {msg}")

sniff(filter="icmp and icmp[icmptype] == icmp-echo", 
      prn=capture) 
```

This script captures ICMP Echo Request (type 8) packets using a **BPF** (Berkeley Packet Filter) in the `sniff` function. Only packets containing a `Raw` layer—i.e., with additional data such as our message—are processed.

**Running the test**

To try this basic covert channel, run the receiver script in one terminal (e.g., in a container or VM), and then run the sender script from another terminal or a different machine on the same network. Be sure to set the `dest` variable correctly in the sender so it points to the receiver’s IP address.

While running, the sender will display something like:

```bash
root@host1$ python3 sender.py 
.
Sent 1 packets.
```

Meanwhile, the receiver will print the hidden message payload:

```bash
root@host2$ python3 receiver.py 
Message: b'hello world'
```

This simple example shows how to build a covert channel on standard protocols like ICMP. Although easily detectable, it provides a useful basis for developing more sophisticated systems in which modifications are less evident or better camouflaged within legitimate traffic.

<br>
### BPF filters in Scapy

To capture only relevant packets on a network, Scapy supports **BPF (Berkeley Packet Filter)** filters—widely used in tools like tcpdump or Wireshark.

BPF filters allow specifying logical conditions that packets must satisfy to be processed by the program. This functionality is essential for reducing processing load and focusing only on packets that may contain useful information for our covert channel.

A BPF filter is a string that defines selection criteria. Some basic examples:

- `icmp`: captures all ICMP packets.
- `tcp port 80`: captures TCP traffic with source or destination port 80.
- `udp and port 53`: selects UDP packets using port 53 (typically DNS).
- `ip src 192.168.0.1`: filters IP packets whose source is `192.168.0.1`.

In the previous example, the filter used was:

```python
filter="icmp and icmp[icmptype] == icmp-echo"
```

This filter selects only ICMP packets whose type (`icmptype`) is `8`, corresponding to Echo Request. The syntax `icmp[icmptype]` enables direct access to fields within the ICMP header using byte offsets. This ability to reference internal fields makes BPF an extremely efficient and powerful filtering system.

Combining BPF with Scapy allows building lightweight monitoring or covert‑message extraction systems without having to analyze large volumes of irrelevant data. Proper use is especially important in network steganography, where efficiency and discretion are essential.

For a complete reference on BPF filters, consult the tcpdump documentation:

[https://www.tcpdump.org/manpages/pcap-filter.7.html](https://www.tcpdump.org/manpages/pcap-filter.7.html)

<br>
## Real-time traffic modification

<br>
### Introduction

One of the most sophisticated and effective techniques in network steganography is hiding information within already‑established legitimate communications. Unlike methods that generate artificial traffic from scratch, this strategy piggybacks on real data flows between devices, inserting hidden messages without disrupting normal protocol behavior so as not to arouse suspicion. The main challenge is to ensure these modifications go unnoticed by both the legitimate receiver and analysis/detection systems such as IDS (Intrusion Detection Systems).

This approach offers important advantages for undetectability. By camouflaging itself within active communications, the covert channel inherits the legitimacy of the original traffic, making identification by steganalysis techniques more difficult. However, it also implies more complex technical challenges: it is not enough to craft and send packets from scratch; you need the ability to intercept, modify, and forward packets in **real time**, all without invalidating the structures or semantics of the underlying protocol.

On Linux systems, this kind of manipulation is possible thanks to **Netfilter**, a powerful kernel subsystem that enables filtering, redirection, and modification of packets in transit. Through rules defined with **iptables**, you can capture certain network packets and divert them to a **processing queue** (Netfilter Queue), where a user‑space program can analyze and manipulate them.

From Python, this functionality can be implemented with the **NetfilterQueue** library, which provides a direct interface to Netfilter queues. Combined with the power of **Scapy**, a packet manipulation tool, it becomes possible to intercept specific packets, modify their contents, and return them to the kernel for forwarding—transparently to the devices involved in the original communication.

<br>
### Intercepting and modifying network traffic

The Netfilter subsystem, integrated into the Linux kernel, provides a powerful infrastructure for filtering and manipulating network packets. It powers tools like **iptables** or **nftables** and allows intercepting packets that enter, leave, or traverse the system, applying decisions such as accept, drop, forward, or redirect.

A particularly relevant component of Netfilter for steganography applications is the ability to divert packets to a **user‑space processing queue** known as **Netfilter Queue**. Instead of taking a decision directly in the kernel, the packet can be sent to this special queue, where a user‑mode application can inspect it, modify it, and even decide its final fate (accept, drop, modify, etc.).

Using this feature requires:

1. Creating an iptables rule that redirects certain traffic to a specific queue.
2. Writing a Python program that reads the packets from that queue, processes them, and forwards them.

The **NetfilterQueue** library provides this user‑space interaction. Combined with **Scapy**, it allows detailed work with network packets, decoding them, accessing their fields, and modifying them easily.

Below is a basic example in which we capture all ICMP packets (like those generated by ping) and simply accept them without modification. This code illustrates the use of NetfilterQueue with Python:

```python
from netfilterqueue import NetfilterQueue

def process_packet(packet):
    packet.accept()

nfqueue = NetfilterQueue()
nfqueue.bind(1, process_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
```

For this code to work, we must redirect the traffic we want to intercept to queue number 1 (as indicated by `nfqueue.bind(1, ...)`). This is done with the following iptables command:

```bash
iptables -A OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

This rule sends all outgoing ICMP packets to queue 1. When we run the Python script, any time an ICMP packet is generated (e.g., using the ping command), it is intercepted and sent to our `process_packet` function.

From there, we can inspect the packet contents, modify fields, or even drop the packet (with `packet.drop()`). In this example we simply accept it so it continues on its way.

This mechanism gives us very fine‑grained control over real‑time network traffic, making it an ideal tool for implementing **active** steganography techniques, where hidden information is inserted directly into an existing communication.

<br>
### Redirecting to the Netfilter queue

To manipulate packets in real time from a Python program, we first need to redirect them to a Netfilter queue. This operation is performed with **iptables**, which allows defining filtering and packet‑handling rules within the OS kernel. When a packet matches a rule, we can indicate that it be diverted to a numbered queue, making it available for capture, analysis, or modification by a user‑space program (such as Python using the NetfilterQueue library).

<br>
### IPTABLES rules

A basic rule that sends packets to a Netfilter queue has the following structure:

```bash
iptables -I <CHAIN> -p <PROTOCOL> [FILTERS]     -j NFQUEUE --queue-num <NUM>
```

The main elements of this rule are:

- `-I <CHAIN>`: Inserts the rule at the beginning of the indicated chain. The most common chains are `INPUT` (incoming traffic), `OUTPUT` (outgoing traffic), and `FORWARD` (traffic traversing the system toward another destination).
- `-p <PROTOCOL>`: Specifies the protocol to filter. Common values are `icmp`, `tcp`, and `udp`.
- `[FILTERS]` (optional): Additional filters such as source/destination IP addresses, ports, interfaces, etc.
- `-j NFQUEUE --queue-num <NUMBER>`: Sends packets to the specified Netfilter queue number.

**Redirection examples**

Below are examples showing how to redirect different types of traffic to queue number 1:

- Redirect outgoing ICMP traffic (e.g., generated by ping):

```bash
iptables -I OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

- Redirect outgoing TCP traffic to port 80 (HTTP):

```bash
iptables -I OUTPUT -p tcp --dport 80     -j NFQUEUE --queue-num 1
```

- Redirect incoming UDP traffic from port 53 (typically DNS):

```bash
iptables -I INPUT -p udp --sport 53     -j NFQUEUE --queue-num 1
```

- Redirect incoming TCP traffic destined for port 22 (SSH):

```bash
iptables -I INPUT -p tcp --dport 22     -j NFQUEUE --queue-num 1
```

- Redirect all outgoing UDP traffic:

```bash
iptables -I OUTPUT -p udp -j NFQUEUE --queue-num 1
```

- Redirect traffic between two specific IP addresses:

```bash
iptables -I FORWARD -p tcp     -s 192.168.1.100 -d 192.168.1.200     -j NFQUEUE --queue-num 1
```

In the context of network steganography, choosing the appropriate iptables chain—`INPUT`, `OUTPUT`, or `FORWARD`—depends on the system’s role in the communication. If the system acts as the **destination** (i.e., the **receiver**), use rules in the `INPUT` chain to capture inbound packets. If the system is the **sender**, generating the packets to be modified, use the `OUTPUT` chain to handle outbound traffic. The `FORWARD` chain should be used when the system is an **intermediary**, routing traffic between two networks. In this case, the system is neither the sender nor the final receiver, but a transit node that can intercept and modify through traffic—especially useful in steganography scenarios like **man‑in‑the‑middle** attacks or when you have access to a router.

All these commands must be executed with superuser privileges because they modify system configuration. 

<br>
### Rule removal

Once the program has finished, it is important to remove the inserted rules to restore the system’s original configuration. This can be done in several ways:

- Delete a specific rule using the same instruction used to create it, but replacing `-I` with `-D`:

```bash
iptables -D OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

- List all rules with their line numbers:

```bash
iptables -L -n --line-numbers
```

  Then delete the rule by indicating its number in the corresponding chain:

```bash
iptables -D OUTPUT 1
```

In any case, it is good practice for the Python program to clean up the rules it created—even if an error occurs or execution is interrupted—e.g., using a `try/finally` block.

<br>
### Sending messages by modifying traffic

Once we know how to redirect traffic to a Netfilter queue, we can implement a system that intercepts real packets in a legitimate communication and **modifies them in real time** to include hidden information.

This kind of steganography is particularly interesting because it does not require the sender to create a new channel; instead, it exploits an **existing channel**, reducing the likelihood of detection. To achieve this, the sender must have access to the traffic they want to modify (e.g., because they generate it or act as an intermediary).

The sending process consists of three basic steps:

1. Create an iptables rule that redirects the desired traffic (in this case, ICMP) to a Netfilter queue.
2. Intercept these packets in Python using NetfilterQueue.
3. Modify the packet payload or certain fields and forward it after recalculating checksums.

In the following example, the payload of ICMP packets is modified before they leave the system. The iptables rule intercepts outgoing ICMP packets to a specific address, and the program inserts the message `"Hello world"` into the packet content.

```python
import subprocess
from netfilterqueue import NetfilterQueue
import scapy.all as scapy

QUEUE = 1
TARGET_IP = "192.168.1.100"

def handle_packet(packet):
    pkt = scapy.IP(packet.get_payload())
    if pkt.haslayer(scapy.ICMP):
        pkt[scapy.Raw].load = b"hello world"
        del pkt[scapy.IP].chksum
        del pkt[scapy.ICMP].chksum
        packet.set_payload(bytes(pkt))
    packet.accept()

def iptables_rule(enable, dst_ip):
    action = "-I" if enable else "-D"
    cmd = [
        "iptables", action, "OUTPUT",
        "-p", "icmp", "-d", dst_ip,
        "-j", "NFQUEUE", "--queue-num", str(QUEUE)
    ]
    subprocess.call(cmd)

def run_queue():
    nfq = NetfilterQueue()
    nfq.bind(QUEUE, handle_packet)
    try:
        nfq.run()
    except KeyboardInterrupt:
        nfq.unbind()

iptables_rule(True, TARGET_IP)
try:
    run_queue()
finally:
    iptables_rule(False, TARGET_IP)
```

This program redirects all outgoing ICMP traffic to the IP specified in `TARGET_IP`, intercepts it, inserts a message, and then lets it continue. The modified packet preserves its structure and the checksums are recalculated to avoid errors on the receiving system.

**Important**: In this example we are modifying the payload generated by the **ping** tool, so in many implementations ping will stop working properly. Keep in mind this is purely illustrative—its purpose is to show how packet interception and modification is performed.

<br>
### Message reception

The receiver does not need to intercept or modify traffic. Its task is to observe incoming traffic and extract hidden messages. In this example, the receiver watches ICMP traffic and extracts the payload to recover the message.

This can be done easily with `scapy` and the `sniff()` function to capture traffic in real time. Here, we filter only ICMP packets of type `echo-request` (the ones modified by the sender) and extract the `Raw` field:

```python
from scapy.all import *

def capture(packet):
    if packet.haslayer(Raw):
        msg = packet[Raw].load
        print(f"Message: {msg}")

sniff(filter="icmp and icmp[icmptype] == icmp-echo", 
      prn=capture)
```

This program can be executed directly on the receiving system. It listens for ICMP packets arriving at the machine and, if any contain a payload, it prints it. In the example above, when the sender inserts the string `"Hello world"`, the receiver will see it in its standard output.

To test the program, simply run the ping tool and the packet interception/embedding program on one host, and run the receiver code on another. If the interception/embedding program is not running, the receiver will print something like the following:

```bash
Message: b'/\xe2\xe3g\x00\x00\x00\x00\xd4\xf2\t\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&\'()*+,-./01234567'
Message: b'0\xe2\xe3g\x00\x00\x00\x00\x8aP\n\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&\'()*+,-./01234567'
Message: b'1\xe2\xe3g\x00\x00\x00\x00T\xae\n\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&\'()*+,-./01234567'
...
```

However, as soon as we start the interception/embedding program, the receiver will show the following:

```bash
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
...
```

Note that once the traffic‑modifying program starts, the ping tool may stop responding, since—as noted—many implementations validate the payload contents.

<br>
## Packet modification

<br>
### The balance of modification

In earlier chapters we saw that it is possible to add hidden information to network packets. However, this can be dangerous: if done incorrectly, the alteration can be obvious or even break the protocol.

Protocols are carefully defined—often through RFC documents. This means any deviation can be easily detected by automated network‑analysis tools. To keep the covert communication free of suspicion, you must respect the expected structure and behavior of each protocol.

Therefore, instead of **adding** information, we can take advantage of **existing fields** in certain protocols that allow minimal change without visible consequences. In other words, we hide information in values that should change naturally anyway.

<br>
### Altering TCP timestamps

**TCP**, the basis of most network communication, allows additional options. One of them is the **Timestamp** option, defined by two 32‑bit values: `TSval` and `TSecr`.

- **TSval**: the current time value sent by the sender.
- **TSecr**: the most recent `TSval` received, echoed back by the receiver.

These fields are useful for computing round‑trip time, optimizing congestion control, and more. The interesting observation is that small changes in `TSval` do not negatively affect the connection and are not easily noticed. This makes them an excellent opportunity to insert information without raising suspicion.

<br>
### Practical example: insertion into TSval

In this example we will hide a binary message inside an SSH connection (TCP port 22), intercepting outgoing packets and modifying the least significant bit of `TSval` according to the message to be sent.

The script uses iptables to redirect packets to a Netfilter queue, which will be processed from Python with Scapy.

```python
import subprocess
from netfilterqueue import NetfilterQueue
import scapy.all as scapy

QUEUE = 1
TARGET_IP = "192.168.1.2"
TARGET_PORT = "22"
TEXT = "hello world"

def encode_message(text):
    bits = [int(b) for c in text.encode()         for b in format(c, '08b')]
    return [1]*8 + bits + [0]*8

bitstream = encode_message(TEXT)
bit_index = 0

def embed_data(packet):
    global bit_index
    pkt = scapy.IP(packet.get_payload())

    if (pkt.haslayer(scapy.TCP) and 
        pkt[scapy.IP].dst == TARGET_IP and 
        pkt[scapy.TCP].dport == int(TARGET_PORT) ):
        options = []
        for opt in pkt[scapy.TCP].options:
            if ( opt[0] == 'Timestamp' and 
                 bit_index < len(bitstream) ):
                tsval, tsecr = opt[1]
                bit = bitstream[bit_index]
                if tsval % 2 != bit:
                    tsval += 1
                options.append(('Timestamp', (tsval,tsecr)))
                print("sent:", bit)
                bit_index += 1
            else:
                options.append(opt)

        pkt[scapy.TCP].options = options
        del pkt[scapy.IP].chksum
        del pkt[scapy.TCP].chksum
        packet.set_payload(bytes(pkt))

    packet.accept()

def set_iptables(enable):
    action = "-I" if enable else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "tcp", "-d", TARGET_IP,
        "--dport", TARGET_PORT,
        "-j", "NFQUEUE",
        "--queue-num", str(QUEUE)
    ])


set_iptables(True)
queue = NetfilterQueue()
queue.bind(QUEUE, embed_data)
try:
    queue.run()
except KeyboardInterrupt:
    pass
finally:
    queue.unbind()
    set_iptables(False)
```

<br>
### Message extraction at the receiver

The receiver simply inspects the least significant bit of each `TSval` received to reconstruct the message.

```python
from scapy.all import sniff, TCP

START = [1]*8
END = [0]*8

def extract_bit(tsval):
    return tsval % 2

def decode_bits(bits):
    chars = [chr(int(''.join(str(b) for b in bits[i:i+8]), 2))             for i in range(0, len(bits), 8)]
    return ''.join(chars)

def process(packet):
    if packet.haslayer(TCP):
        options = packet[TCP].options
        for opt in options:
            if opt[0] == 'Timestamp':
                tsval = opt[1][0]
                bit = extract_bit(tsval)
                process.bit_buffer.append(bit)
                print("Received:", bit)

                if not process.sync:
                    if process.bit_buffer[-8:] == START:
                        print("[+] START")
                        process.sync = True
                        process.msg_bits = []
                else:
                    if process.bit_buffer[-8:] == END:
                        print("[+] END")
                        message =                             decode_bits(process.msg_bits)
                        print("Message:", message)
                        process.sync = False
                        process.msg_bits = []
                    else:
                        process.msg_bits.append(bit)
process.bit_buffer = []
process.sync = False
process.msg_bits = []

sniff(filter="tcp and dst port 22", prn=process)
```

<br>
### How to conduct a practical test

To test this covert channel, you need a machine running an SSH server, since this is the traffic used as the message carrier.

First run both programs: the sender (which intercepts and modifies traffic in real time) and the receiver (which analyzes packets to extract the hidden message). Once running, start an SSH connection to the target machine. This connection will generate traffic that the sender will intercept and modify, embedding the message bits into the TCP option fields.

On the sender’s terminal you will see output similar to:

```bash
sent: 1                                       
sent: 1                                       
sent: 1                                       
sent: 1                                       
...                                      
sent: 0                                       
sent: 0                                       
sent: 0                                       
sent: 0 
```

While on the receiver you will see something like:

```bash
...
Received: 1                                     
Received: 1                                     
[+] START                                      
...                                      
Received: 0
Received: 0
Received: 0
[+] END
Message: hello world
Received: 0
Received: 0
Received: 1
...
```

<br>
### Considerations and possible improvements

Although this method is simple and effective, it may pose certain risks:

- The legitimate receiver (e.g., SSH) might notice discrepancies between `TSval` and `TSecr` values.
- Traffic analysis tools could detect inconsistent values.

An obvious improvement would be to intercept the return packets as well, adjusting `TSecr` to match the modified `TSval`, thereby closing the detection channel.

You could also explore embedding multiple bits using the two (or more) least significant bits of `TSval`, though this increases the risk of detection.

Modifying existing fields in standard protocols is a very effective avenue for network steganography, provided you stay within the protocol’s natural variability and act cautiously.

<br>
### Other modification possibilities

Using the TCP `TSval` field as a channel for hiding information is just one of many possibilities in header‑based network steganography. Other fields exist at both the IP and TCP levels that can be used for similar purposes, provided their modification does not affect normal communication.

In the IP protocol, a frequent candidate is the **Identification** (ID) field—traditionally used for fragment reassembly. In connections where fragmentation is not used (common in modern networks), this field may take arbitrary values without visible consequences, allowing its use as a carrier of hidden bits.

Within TCP, beyond `TSval`, you can explore other header elements such as sequence numbers or the receive window field. Although these fields are more closely tied to flow control and internal protocol behavior, small, carefully selected variations may pass unnoticed in certain contexts.

In short, modifying header fields is a viable and effective strategy for network steganography, provided you have a deep understanding of the protocol in question and respect its tolerance margins. Success depends on keeping changes within expected values for the applications and systems processing the packets, avoiding drops or suspicion.

<br>
## Transmission delays

<br>
### Delays as a communication channel

Directly modifying network packets to hide information can be effective, but it also entails significant risks. Network protocols are defined with a high degree of precision and their fields serve specific purposes. As such, any anomalous alteration can be easily detected by monitoring tools or security systems.

As an alternative, a more subtle approach is to **leave packet contents untouched** and modify **only the time they are sent**. This strategy introduces carefully designed delays between consecutive packets. Those intervals can encode bits of information—for example, a short interval represents a ‘0’, and a long one represents a ‘1’.

The key advantage of this technique is that it does not alter packet structure or payload. The covert channel resides entirely in transmission timing, making detection by direct content inspection more difficult.

However, there are challenges. Delays must be small enough not to affect communication quality, yet different enough to be distinguishable by the receiver. Additionally, the network introduces its own timing variability, which may interfere with bit precision.

<br>
### Delays in ICMP

To illustrate this technique, we use the ping command, which generates ICMP packets periodically. Our goal is to modify the **send time** of those packets to insert a binary message.

The idea is simple: to send a ‘1’, introduce a delay before allowing a packet to leave; to send a ‘0’, introduce no delay. The receiver distinguishes between the two values by measuring inter‑arrival times.

```python
import os
import time
import subprocess
from netfilterqueue import NetfilterQueue

QUEUE = 1
TARGET_IP = "192.168.1.100"
TEXT = "hello world"

def encode_message(text):
    bits = [int(b) for c in text.encode() for b in format(c, '08b')]
    return [1]*8 + bits + [0]*8

bitstream = encode_message(TEXT)
bit_index = 0

def handle_packet(packet):
    global bit_index
    if bit_index < len(bitstream):
        bit = bitstream[bit_index]
        print("sent:", bit)
        if bit == 1:
            time.sleep(2)
        bit_index += 1
    packet.accept()

def set_iptables(enable):
    action = "-I" if enable else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "icmp", "-d", TARGET_IP,
        "-j", "NFQUEUE", "--queue-num", str(QUEUE)
    ])

set_iptables(True)
nfqueue = NetfilterQueue()
nfqueue.bind(QUEUE, handle_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
finally:
    set_iptables(False)
```

The code is almost identical to earlier examples. The key is the lines where we pause for two seconds if the bit to send is ‘1’.

<br>
### Message extraction at the receiver

On the receiver, we simply measure the time between packet arrivals. If the difference between one and the next is greater than 1.5 seconds, we consider a ‘1’ was transmitted; if it is less, we interpret a ‘0’. The receiver code is shown below:

```python
import time
from scapy.all import sniff, Raw

START_MARK = [1]*8
END_MARK = [0]*8
THRESHOLD = 1.5

last_time = None
bit_buffer = []
sync = False
message_bits = []

def extract_bit(current_time):
    global last_time
    delta = current_time - last_time
    return 1 if delta > THRESHOLD else 0

def decode_bits(bits):
    chars = [
        chr(int(''.join(map(str, bits[i:i+8])), 2))
        for i in range(0, len(bits), 8)
    ]
    return ''.join(chars)

def handle_packet(packet):
    global last_time, bit_buffer, sync, message_bits
    now = time.time()
    if last_time is None:
        last_time = now
        return
    bit = extract_bit(now)
    bit_buffer.append(bit)
    print("recv:", bit)
    last_time = now

    if not sync:
        if bit_buffer[-8:] == START_MARK:
            print("[+] START")
            sync = True
            message_bits = []
    else:
        if bit_buffer[-8:] == END_MARK:
            print("[+] END")
            message = decode_bits(message_bits)
            print("Message:", message)
            sync = False
            message_bits = []
        else:
            message_bits.append(bit)

sniff(
    filter="icmp and icmp[icmptype] == icmp-echo and dst 192.168.1.100",
    prn=handle_packet
)
```

<br>
### How to test the timing channel

To perform a practical test, you need two instances or containers (sender and receiver) and two terminals on the sender. In the first terminal, run the ping command; in the second, run the script that intercepts packets and decides whether to introduce delays.

```bash
sent: 1                                       
sent: 1                                       
sent: 1                                       
sent: 1                                       
...                                      
sent: 0                                       
sent: 0                                       
sent: 0                                       
sent: 0 
```

```bash
recv: 1                                      
recv: 1                                      
recv: 1                                      
recv: 1                                      
[+] START                                    
recv: 0                                      
recv: 1                                      
recv: 1                                      
recv: 0            
...
recv: 0
recv: 0
recv: 0
[+] END
Message: hello world
recv: 0
recv: 0
recv: 0
recv: 0
...
```

If we stop the delay‑insertion script, all extracted bits will be zeros, confirming that the covert channel depends exclusively on timing control.

<br>
### Aspects to consider

This technique may seem very subtle but it is not infallible. Although it does not alter packets directly, timing patterns can be detected by tools analyzing network flows—especially if delays are large or suspiciously periodic.

One way to reduce risk is to shorten waiting times and use more subtle differences. However, this makes the channel more vulnerable to network noise, hindering message recovery.

**Conclusion:** manipulating inter‑packet timing is a powerful technique, but it must be used with care. An appropriate balance between delay, transmission capacity, and noise resilience is key to keeping the channel useful and discreet.

<br>
## Datagram reordering

<br>
### Reordering instead of modifying

Unlike TCP, the **UDP** protocol does **not** guarantee delivery or order. What may be a limitation elsewhere becomes an opportunity for steganography.

Here, the technique consists of intentionally altering the send order of UDP datagrams to encode bits of information. The sender and receiver must agree on the coding scheme in advance: for example, sending two packets in order indicates a ‘0’, while sending them in reverse order indicates a ‘1’.

This method has the advantage of not modifying packet contents, making detection by content analysis more difficult. However, it is also more error‑prone: if the network introduces additional reordering or a packet is lost, information may be corrupted.

Moreover, the resulting traffic patterns may be unusual and attract attention from a detection system if not used carefully.

<br>
### Practical example: sender of reordered datagrams

To encode a message, we intercept datagrams sent from the sender to UDP port 5000 using iptables and NetfilterQueue. We process packets in pairs: if the bit to encode is 0, we leave them in original order; if it is 1, we reverse the pair before forwarding.

Many streaming protocols use UDP, prioritizing speed over reliability. This makes UDP a good candidate for techniques like this.

In our case, we use **netcat** to send sequences of UDP datagrams and include an identifier in the payload to verify the order at the receiver.

```bash
root@sender:/toi# for i in `seq 10`; do
> echo $i | nc -q 1 -u 172.17.0.3 5000
> done
```

Sender code:

```python
import os
import subprocess
from netfilterqueue import NetfilterQueue
from scapy.all import IP, UDP

target_ip = "172.17.0.3"
target_port = "5000"
message = [0, 0, 0, 1]
message_idx = 0
packets = []

def release_packets():
    global message_idx
    if packets:
        if message[message_idx % len(message)] == 1:
            packets.reverse()
            print("send 1")
        else:
            print("send 0")

        message_idx += 1
        for pkt in packets:
            pkt.accept()

def process_packet(packet):
    global packets
    scapy_packet = IP(packet.get_payload())
    if scapy_packet.haslayer(UDP):
        packets.append(packet)
        if len(packets) == 2:
            release_packets()
            packets = []

def modify_iptables(add, target_ip):
    action = "-I" if add else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "udp",
        "-d", target_ip,
        "--dport", target_port,
        "-j", "NFQUEUE",
        "--queue-num", "1"
    ])

modify_iptables(True, target_ip)
nfqueue = NetfilterQueue()
nfqueue.bind(1, process_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
finally:
    modify_iptables(False, target_ip)
```

<br>
### Message extraction at the receiver

The receiver processes packets two by two and compares the order of their identifiers. If the second packet has a larger number, interpret it as ‘0’; if it is smaller, as ‘1’. The corresponding code is:

```python
from scapy.all import *

last_payload = None

def process_packet(packet):
    global last_payload
    if packet.haslayer(UDP):
        payload = packet[Raw].load.decode('utf-8', 'ignore').strip()
        print(f"{packet[IP].src}:{packet[UDP].sport} -> "
              f"{packet[IP].dst}:{packet[UDP].dport} {payload}")

        if last_payload:
            if int(last_payload) > int(payload):
                print("bit 1")
            else:
                print("bit 0")
            last_payload = None
        else:
            last_payload = payload

sniff(filter="udp and port 5000", prn=process_packet)
```

<br>
### How to run the test

To test this technique, you need three terminals: two on the sender and one on the receiver.

- **Sender terminal 1:** Run the hiding script.

```bash
root@sender:/toi# python3 shared/sender.py
send 0
send 0
send 0
send 1
```

- **Sender terminal 2:** Send the datagrams with netcat.

```bash
root@sender:/toi# for i in `seq 8`; do echo $i | nc -q 1 -u 172.17.0.3 5000; done
```

- **Receiver terminal:** Run the receiver script.

```bash
root@receiver:/toi# python3 shared/receiver.py
172.17.0.2:53421 -> 172.17.0.3:5000  1
172.17.0.2:43061 -> 172.17.0.3:5000  2
bit 0
...
172.17.0.2:39040 -> 172.17.0.3:5000  8
172.17.0.2:46846 -> 172.17.0.3:5000  7
bit 1
```

Important: packets are not processed until they are sent from terminal 2, so this must be executed last.

<br>
### Analysis and possible improvements

An interesting question is **how much information** can be hidden per group of packets. The answer is given by **entropy**: if we use $n$ packets, there are $n!$ ways to order them, so we can hide up to $\log_2(n!)$ bits per group.

- With 2 packets: $2! = 2$ combinations $\Rightarrow \log_2(2) = 1$ bit.
- With 3 packets: $3! = 6$ combinations $\Rightarrow \log_2(6) \approx 2.58$ bits.
- With 4 packets: $4! = 24$ combinations $\Rightarrow \log_2(24) \approx 4.58$ bits.

This shows that channel capacity can be increased by grouping more packets—at the cost of higher complexity, latency, and detectability.

On real networks, UDP packets may arrive out of order due to the network’s own dynamics, which may interfere with correct message reception. Error‑correction or redundant coding can be implemented to mitigate these issues.

**Conclusion:** UDP datagram reordering is an effective and discreet technique for hiding information, provided the network environment is controlled and it is used sparingly.

<br>
## Implications and challenges

Network‑protocol steganography opens an interesting and powerful avenue for covert communication—especially in environments where the use of multimedia files might raise suspicion or be restricted. However, using these techniques is not without technical, operational, and security implications that must be carefully considered.

On the one hand, we have seen that it is possible to insert information into legitimate traffic using minimal modifications to low‑sensitivity fields (such as TCP timestamps), controlling transmission timing (ICMP delays), or manipulating packet send order (UDP reordering). When applied subtly and with protocol knowledge, these methods can be highly effective and difficult to detect.

Nevertheless, each technique entails its own challenges:

- **Compatibility and stability**: many strategies require privileged OS access and a precise understanding of the underlying protocol. An improper change can break communication or be easily detected.
- **Risk of detection**: although these techniques avoid modifying visible content, anomalous traffic behavior (e.g., unnatural timing variations or inconsistent packet sequences) can be detected by Deep Packet Inspection (DPI) or statistical analysis.
- **Network environment**: the reliability of these covert channels depends heavily on the type of network. High latency, jitter, or frequent packet loss (as on wireless links or the Internet) may interfere with hidden message transmission—especially for time‑ or order‑based techniques.
- **Capacity vs. undetectability**: the more content you try to transmit, the higher the exposure risk. Finding the right balance between data rate and discretion is a core challenge in network steganography.

Practically speaking, tools like Scapy and NetfilterQueue demonstrate that it is technically feasible to intercept and modify packets in real time—opening possibilities not only for data hiding but also for experimenting with defensive and offensive techniques in controlled network environments.

Ultimately, steganography in network protocols is not just a collection of isolated techniques; it is a field that requires a deep understanding of traffic behavior, its normal variations, and how to insert changes that go unnoticed. As analysis and detection tools evolve, so too must steganographic strategies.
