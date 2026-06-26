#!/usr/bin/python3

import matplotlib.pyplot as plt


payload = [0.10, 0.20, 0.40]

# Mean accuracy over EfficientNet-B0 and SRNet.
hill = [0.8395, 0.8810, 0.9550]
uniward = [0.7410, 0.8510, 0.9350]
si_hill = [0.4995, 0.6605, 0.8915]
si_uniward = [0.5030, 0.6200, 0.8420]

fig, ax1 = plt.subplots(figsize=(10, 6))

ax1.set_xlabel("Payload (bpp)")
ax1.set_ylabel("Accuracy")

ax1.plot(payload, hill, marker="o", linestyle="-", label="HILL")
ax1.plot(payload, uniward, marker="o", linestyle="-", label="UNIWARD")
ax1.plot(payload, si_hill, marker="o", linestyle="-", label="SI-HILL")
ax1.plot(payload, si_uniward, marker="o", linestyle="-", label="SI-UNIWARD")

ax1.tick_params(axis="y")
ax1.grid(True, which="both", axis="y", linestyle="--", linewidth=0.5)
ax1.text(
    0.5,
    0.5,
    "Stable Diffusion experiment",
    transform=ax1.transAxes,
    ha="center",
    va="center",
    color="#9a9a9a",
    fontsize=26,
    alpha=0.32,
)

plt.ylim(0.45, 1.0)
plt.title("Side-informed steganography in Stable Diffusion images")
plt.tight_layout()
plt.legend(loc="lower right")
plt.savefig("stego/aletheia/v03/resources/stable_diffusion_side_informed.png")
