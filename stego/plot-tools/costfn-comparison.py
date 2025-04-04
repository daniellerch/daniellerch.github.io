#!/usr/bin/python3


import matplotlib.pyplot as plt

# Datos       
payload =    [0.05,  0.10,  0.20,  0.30,  0.40,  0.50]
# ----------------------------------------------------
lsbm =       [0.568, 0.748, 0.941, 0.961, 0.971, 0.971]
lsbr =       [0.571, 0.766, 0.942, 0.960, 0.964, 0.965]
lsbr_spa =   [0.709, 0.858, 0.860, 0.860, 0.860, 0.860]
steganogan = [0.993, 0.994, 0.993, 0.994, 0.993, 0.994]
uniward =    [0.534, 0.668, 0.870, 0.920, 0.934, 0.942]
hill =       [0.573, 0.773, 0.919, 0.941, 0.949, 0.952]

fig, ax1 = plt.subplots(figsize=(10,6))

ax1.set_xlabel('Payload')
ax1.set_ylabel('Accuracy')

ax1.plot(payload, lsbm, color='r', marker='o', linestyle='-', label='LSB matching')
ax1.plot(payload, lsbr, marker='o', linestyle='-', label='LSB replacement (OpenStego, OpenPuff, ...)')
ax1.plot(payload, lsbr_spa, marker='o', linestyle='-', label='LSB replacement -SPA- (OpenStego, OpenPuff, ...)')
ax1.plot(payload, steganogan, marker='o', linestyle='-', label='SteganoGAN')
ax1.plot(payload, uniward, color='b', marker='o', linestyle='-', label='S-UNIWARD')
ax1.plot(payload, hill, color='g', marker='o', linestyle='-', label='HILL (HStego)')

ax1.tick_params(axis='y')
ax1.grid(True, which='both', axis='y', linestyle='--', linewidth=0.5)

plt.text(0.2, 0.5, 'Aletheia steganalysis tool', color='#808080', fontsize=12)
plt.ylim(0, 1.1)
plt.title('Steganography tools')
plt.tight_layout()
plt.legend(loc="lower right")
plt.show()


