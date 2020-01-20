---
layout: page
title: KDTree basic example
noindex: true
---



```python
import numpy as np 
from sklearn.neighbors import KDTree 
from sklearn.datasets import load_boston 
 
X, y = load_boston(return_X_y=True) 
 
kdt = KDTree(X, leaf_size=2, metric='euclidean') 
distances, indices = kdt.query(X[0:1], k=5) 
 
print("distances:", distances) 
print("indices:", indices) 
```


```bash
distances: [[ 0.         16.0970999  16.99995447 18.40100218 18.73017253]]
indices: [[  0 241  62  81  60]]
```

