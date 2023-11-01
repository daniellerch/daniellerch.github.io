#!/usr/bin/python3


import matplotlib.pyplot as plt

# Datos
payload  =             [0.05,  0.10,  0.20,  0.30,  0.40,  0.50 ]
# ---------------------------------------------------------
outguess =             [1,     1,     1,     1,     1,     1    ]
f5       =             [0.999, 0.999, 0.999, 0.999, 0.999, 0.999]
steghide =             [0.841, 0.914, 0.956, 0.964, 0.967, 0.966]
hstego03_juniw =       [0.547, 0.598, 0.705, 0.779, 0.823, 0.842]
hstego04_juniwwiener = [0.532, 0.578, 0.671, 0.741, 0.800, 0.813]

fig, ax1 = plt.subplots(figsize=(10,6))

ax1.set_xlabel('Payload')
ax1.set_ylabel('Accuracy')

ax1.plot(payload, outguess, marker='o', linestyle='-', label='Outguess')
ax1.plot(payload, f5, marker='.', linestyle='-', label='F5')
ax1.plot(payload, steghide, marker='o', linestyle='-', label='Steghide')
ax1.plot(payload, hstego03_juniw, color='b', marker='o', linestyle='-', label='HStego 0.3')
ax1.plot(payload, hstego04_juniwwiener, color='g', marker='o', linestyle='-', label='HStego 0.4')

ax1.tick_params(axis='y')
ax1.grid(True, which='both', axis='y', linestyle='--', linewidth=0.5)

plt.text(0.2, 0.85, 'Aletheia steganalysis tool', color='#808080', fontsize=12)
plt.ylim(0.5, 1.1)
plt.title('Steganography tools (JPEG)')
plt.tight_layout()
plt.legend(loc="lower right")
#plt.show()
plt.savefig("stego/aletheia/resources/tool_comparison_jpeg.png")



