#!/usr/bin/python3

import sys
import math
import matplotlib.pyplot as plt
import numpy as np




# Binary entropy function
def H2(x):
    return -x * np.log2(x) - (1-x)*np.log2(1-x)

# Approx inverse
invH = {}
for i in range(499):
    y = float(i)/1000
    x = round(H2(y), 3)
    if math.isnan(x):
        continue
    invH[x] = y
    print(x, y)


def iH2(x):
    closest = min(invH.keys(), key=lambda y:abs(y-x))
    return invH[closest]


def get_series(n, p_range):
    payload=[]
    efficiency=[]
    print("-- n:", n, "--")
    for p in p_range:
        alpha = p*np.log2(n) / ( (n**p-1)/(n-1) )
        e = p*np.log2(n) / (1-n**(-p) )

        print(p, round(alpha,2), round(e,2))
        payload.append(alpha)
        efficiency.append(e)
    return payload, efficiency


def get_bound(n, p_range):
    payload=[]
    efficiency=[]
    print("-- n:", n, "--")
    for p in p_range:
        alpha = p*np.log2(n) / ( (n**p-1)/(n-1) )
        y = iH2(alpha)
        e = alpha/y

        if round(alpha,2) <= 0.02:
            continue

        print(p, round(alpha,2), y, round(e,2))

        payload.append(alpha)
        efficiency.append(e)


    return payload, efficiency



payload, efficiency = get_series(2, range(1,15))
plt.plot(payload, efficiency, label='n=2')

payload, efficiency = get_bound(2, range(1,15))
plt.plot(payload, efficiency, label='bound', linestyle='dashed')

#efficiency = [7, 6.2, 5.9,  4.1]
#payload =    [0.12, 0.16, 0.25, 0.5]
#plt.plot(payload, efficiency, label='binary bound')




plt.ylim(0, 10)
plt.xlim(0, 1)
plt.xlabel('Payload')
plt.ylabel('Efficiency')
plt.title('binary codes')
plt.grid(True)
plt.legend()

plt.show()



