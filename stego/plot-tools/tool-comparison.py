#!/usr/bin/python3


import matplotlib.pyplot as plt

# Datos
meses = ['0.10', '0.20', '0.30', '0.40', '0.50']
steghide = [0.90, 0.90, 0.90, 0.90, 0.90]
outguess = [0.95, 0.95, 0.95, 0.95, 0.95]

fig, ax1 = plt.subplots(figsize=(10,6))

ax1.set_xlabel('Payload')
ax1.set_ylabel('Accuracy', color='b')
ax1.plot(meses, steghide, color='b', marker='o', linestyle='-')
ax1.tick_params(axis='y', labelcolor='b')
ax1.grid(True, which='both', axis='y', linestyle='--', linewidth=0.5)

plt.title('xxx')
plt.tight_layout()
plt.show()


