--- 
layout: page 
title: "Sklearn: DBSCAN clustering using a custom distance function"
noindex: true 
--- 
 
 
### Description: 
- Clustering using a custom distance.
 
### References: 
- [sklearn.cluster.DBSCAN](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html) 
 
 
<br/> 
### Code: 
```python 
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.datasets import load_boston


def custom_distance(a, b):
    # TODO: implement custom distance 
    d = np.linalg.norm(a-b)
    return d


X, y = load_boston(return_X_y=True)

dbs = DBSCAN(eps=3, min_samples=2, metric=custom_distance)
clusters = dbs.fit(X)

print(dbs.labels_)
~                   
 
``` 
 
 
<br/> 
### Output: 
```bash 
[-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1  0 -1  0 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1  1 -1 -1 -1 -1 -1  1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1  2 -1  2  2 -1 -1 -1  2 -1  2 -1  2 -1 -1  3  3 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1  4  4 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1  5 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1  5 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1  6  6 -1 
  6 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1  7  7 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1  8  8 -1  9 -1 -1 
 -1 -1 -1  9 -1 -1 -1 -1 10 10 10 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 11 11 -1 
 12 13 -1 12 13 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 14 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 15 -1 -1 -1 16 17 17 
 -1 -1 18 -1 -1 15 -1 -1 -1 -1 -1 -1 19 -1 -1 -1 18 16 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 -1 -1 -1 -1 -1 -1 20 -1 20 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1 -1 21 -1 -1 21 -1 -1 -1 -1 -1 -1 -1 21 -1 -1 -1 -1 -1 19 -1 14 -1 
 -1 -1 -1 -1 -1 22 -1 22 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 
 -1 -1] 
``` 
 
