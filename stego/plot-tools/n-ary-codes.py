#!/usr/bin/python3

import matplotlib.pyplot as plt
import numpy as np


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

payload, efficiency = get_series(2, range(1,15))
plt.plot(payload, efficiency, label='n=2')

payload, efficiency = get_series(3, range(1,10))
plt.plot(payload, efficiency, label='n=3')

payload, efficiency = get_series(5, range(1,7))
plt.plot(payload, efficiency, label='n=5')

payload, efficiency = get_series(7, range(1,6))
plt.plot(payload, efficiency, label='n=7')


plt.xlim(0, 1)
plt.xlabel('Payload')
plt.ylabel('Efficiency')
plt.title('n-ary codes')
plt.grid(True)
plt.legend()

plt.show()
