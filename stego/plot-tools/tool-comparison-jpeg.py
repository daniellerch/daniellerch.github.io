#!/usr/bin/python3


import matplotlib.pyplot as plt

# Datos
payload =  [0,   0.05, 0.10, 0.20, 0.30, 0.40, 0.50]
steghide = [0,   0.841, 0.914, 0.956, 0.964, 0.967, 0.966]
outguess = [0,   1,     1,     1,     1,     1,     1]
nsf5 =     [0,   0.515, 0.561, 0.709, 0.847, 0.912, 0.934]
jmipod =   [0,   0.609, 0.720, 0.818, 0.860, 0.891, 0.901]
juniw =    [0,   0.547, 0.598, 0.705, 0.779, 0.823, 0.842]

fig, ax1 = plt.subplots(figsize=(10,6))

ax1.set_xlabel('Payload')
ax1.set_ylabel('Accuracy')

ax1.plot(payload, outguess, color='r', marker='o', linestyle='-', label='Outguess')
ax1.plot(payload, steghide, color='b', marker='o', linestyle='-', label='Steghide')
ax1.plot(payload, nsf5, color='g', marker='o', linestyle='-', label='nsF5')
ax1.plot(payload, jmipod, linestyle='-', label='J-MiPOD')
ax1.plot(payload, juniw, marker='o', linestyle='-', label='J-UNIWARD (HStego)')

ax1.tick_params(axis='y')
ax1.grid(True, which='both', axis='y', linestyle='--', linewidth=0.5)

plt.text(0.2, 0.5, 'Aletheia steganalysis tool', color='#808080', fontsize=12)
plt.ylim(0, 1.1)
plt.title('Steganography tools (JPEG)')
plt.tight_layout()
plt.legend(loc="lower right")
plt.show()


