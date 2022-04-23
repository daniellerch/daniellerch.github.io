#!/usr/bin/python3

import matplotlib.pyplot as plt
import numpy as np


def binary_entropy_nats(prob): 
    return -prob*np.log(prob) - (1-prob)*np.log(1-prob) 
 
def binary_entropy_nats_prime(prob): 
    return np.log((1-prob)/prob) 
 
def iH2_(entropy_val, num_iter=3): 
    guess = (np.arcsin((entropy_val/np.log(2))**(1/.645)))/np.pi 
    for i in range(num_iter): 
        guess = guess + np.nan_to_num((entropy_val-binary_entropy_nats(guess))/binary_entropy_nats_prime(guess)) 
    return guess 


# Binary entropy function
def H2(x):
    return -x * np.log2(x) - (1-x)*np.log2(1-x)

# Inverse binary entropy function approximation
def iH2(x):
    #return x/(2*np.log2(6/x))
    return x/(np.log2(1/x))

def iH2_2(x):
    return 1/2 * (1-np.sqrt(1-x**(4/3))) 



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
        e = alpha / iH2_2(alpha)

        print(p, round(alpha,2), round(e,2))
        payload.append(alpha)
        efficiency.append(e)


    return payload, efficiency



payload, efficiency = get_series(2, range(1,15))
plt.plot(payload, efficiency, label='n=2')

payload, efficiency = get_bound(3, range(1,15))
plt.plot(payload, efficiency, label='bound')

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



