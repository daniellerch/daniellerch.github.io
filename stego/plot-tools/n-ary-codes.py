#!/usr/bin/python3

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



# Ternary entropy function
def H3(x):
    q = 3
    return -x * np.log2(x) - (1-x)*np.log2(1-x) + x*np.log2(q-1)
    #return -x * np.log2(x) - (1-x)*np.log2(1-x) + x
    #q = 3
    #return x*math.log(q-1, q) - x*math.log(x, q) - (1-x)*math.log(1-x, q)


# Approx inverse
invH3 = {}
for i in range(499):
    y = float(i)/1000
    try:
        x = round(H3(y), 3)
    except:
        continue
    if math.isnan(x):
        continue
    invH3[x] = y
    print(x, y)

def iH3(x):
    closest = min(invH3.keys(), key=lambda y:abs(y-x))
    return invH3[closest]



# Pentary entropy function
def H5(x):
    q = 5
    return -x * np.log2(x) - (1-x)*np.log2(1-x) + x*np.log2(q-1)
    #return -x * np.log2(x) - (1-x)*np.log2(1-x) + x
    #return x*math.log(q-1, q) - x*math.log(x, q) - (1-x)*math.log(1-x, q)


# Approx inverse
invH5 = {}
for i in range(499):
    y = float(i)/1000
    try:
        x = round(H5(y), 3)
    except:
        continue
    if math.isnan(x):
        continue
    invH5[x] = y
    print(x, y)

def iH5(x):
    closest = min(invH5.keys(), key=lambda y:abs(y-x))
    return invH5[closest]




def get_bound_binary(n, p_range):
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


def get_bound_ternary(n, p_range):
    payload=[]
    efficiency=[]
    print("-- n:", n, "--")
    for p in p_range:
        alpha = p*np.log2(n) / ( (n**p-1)/(n-1) )
        y = iH3(alpha)
        e = alpha/y

        if round(alpha,2) <= 0.02:
            continue

        print(p, round(alpha,2), y, round(e,2))

        payload.append(alpha)
        efficiency.append(e)


    return payload, efficiency




def get_bound_pentary(n, p_range):
    payload=[]
    efficiency=[]
    print("-- n:", n, "--")
    for p in p_range:
        alpha = p*np.log2(n) / ( (n**p-1)/(n-1) )
        y = iH5(alpha)
        e = alpha/y

        if round(alpha,2) <= 0.02:
            continue

        print(p, round(alpha,2), y, round(e,2))

        payload.append(alpha)
        efficiency.append(e)


    return payload, efficiency






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


payload, efficiency = get_bound_binary(2, range(1,15))
plt.plot(payload, efficiency, label='binary bound', linestyle='dashed')

payload, efficiency = get_bound_ternary(3, range(1,15))
plt.plot(payload, efficiency, label='ternary bound', linestyle='dashed')

payload, efficiency = get_bound_pentary(5, range(1,15))
plt.plot(payload, efficiency, label='pentary bound', linestyle='dashed')


plt.xlim(0, 1)
plt.xlabel('Payload')
plt.ylabel('Efficiency')
plt.title('n-ary codes')
plt.grid(True)
plt.legend()

plt.show()
