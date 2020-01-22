---
layout: page
title: "Sklearn: model persistence using Joblib"
noindex: true
---


### Description:
- How to save and load SKlearn models into and from files using Joblib.

### References:
- [joblib.dump](https://joblib.readthedocs.io/en/latest/generated/joblib.dump.html)
- [joblib.load](https://joblib.readthedocs.io/en/latest/generated/joblib.load.html)
- [sklearn.ensemble.RandomForestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)


<br/>
### Code:
```python
import numpy as np
import joblib
from sklearn import metrics
from sklearn import ensemble
from sklearn import model_selection
from sklearn.datasets import load_breast_cancer

seed = 42

X, y = load_breast_cancer(return_X_y=True)
X_train, X_valid, y_train, y_valid = \
    model_selection.train_test_split(X, y, test_size=0.10, 
                                     random_state=seed)

rf = ensemble.RandomForestClassifier(n_estimators=10, random_state=seed)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_valid)

print("Valid accuracy:", metrics.accuracy_score(y_valid, y_pred))

joblib.dump(rf, "rf.joblib")


rf2 = joblib.load("rf.joblib")
y_pred = rf.predict(X_valid)
print("Valid (load) accuracy:", metrics.accuracy_score(y_valid, y_pred))
```


<br/>
### Output:
```bash
Valid accuracy: 0.9649122807017544
Valid (load) accuracy: 0.9649122807017544
```

