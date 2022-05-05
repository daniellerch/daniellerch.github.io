#!/usr/bin/python3

import matplotlib.pyplot as plt
import numpy as np


def get_series(n, p_range):
    payload=[]
    efficiency=[]
    #print("-- n:", n, "--")
    for p in p_range:
        alpha = p*np.log2(n) / ( (n**p-1)/(n-1) )
        e = p*np.log2(n) / (1-n**(-p) )

        #print(p, round(alpha,2), round(e,2))
        payload.append(alpha)
        efficiency.append(e)
    return payload, efficiency

def get_zzw_series(p_range):
    payload=[]
    efficiency=[]

    # (R, n*2**p, m+p*R)
    # (1/2, 2**p, 1+p/2)
    for p in p_range:
        R=1/2; n=1; m=1
        alpha = (m+p*R) / (n*2**p)
        e = p + m/R
        print(p, round(alpha,2), round(e,2))
        payload.append(alpha)
        efficiency.append(e)

    return payload, efficiency


# Binary Hamming
payload, efficiency = get_series(2, range(1,15))
plt.plot(payload, efficiency, label='n=2')

# Ternary Hamming
payload, efficiency = get_series(3, range(1,10))
plt.plot(payload, efficiency, label='n=3')

# SDCS
#plt.plot([0.4], [5.0], label='SDCS')
plt.scatter([1.4320, 1.3625, 1.2405, 1.2267, 1.0785], 
            [2.5727, 2.6726, 2.9300, 2.9441, 3.1445], label='SDCS')

# Ternary repetition
plt.scatter([1.188], 
            [2.918], label='Ternary Repetition')

# ZZW construction
payload, efficiency = get_zzw_series(range(1,10))
plt.plot(payload, efficiency, label='ZZW')



plt.xlim(0, 1.5)
plt.xlabel('Payload')
plt.ylabel('Efficiency')
plt.title('SDCS codes')
plt.grid(True)
plt.legend()

plt.show()

