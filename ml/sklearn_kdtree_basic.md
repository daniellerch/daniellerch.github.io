---
layout: page
title: Sklearn\: query for (cached) nearest neighbors
noindex: true
---


### Description: 
- Query for k-nearest neighbors, neighbors within a given radius, etc.

### References:
- [sklearn.neighbors.KDTree](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KDTree.html)


<br/>
### Code:
```python
import numpy as np 
from sklearn.neighbors import KDTree 
from sklearn.datasets import load_boston 
 
X, y = load_boston(return_X_y=True) 
 
kdt = KDTree(X, leaf_size=2, metric='euclidean') 
distances, indices = kdt.query(X[0:1], k=5) 
 
print("distances:", distances) 
print("indices:", indices) 

radius = 50
indices = kdt.query_radius(X[:1], r=radius)
print(len(indices[0]), "neighbors within distance", radius)
```


<br/>
### Output:
```bash
distances: [[ 0.         16.0970999  16.99995447 18.40100218 18.73017253]]
indices: [[  0 241  62  81  60]]
139 neighbors within distance 50
```

