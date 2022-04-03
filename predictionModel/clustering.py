import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, date
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler
import plotly.express as px
from sklearn.metrics import plot_confusion_matrix
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_curve, roc_auc_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV

df = pd.read_csv('outputCustom_10000.csv', delimiter =';', thousands=".")
df.isnull().sum()
df1 = df.drop(columns = ['Id'])
df1.isna().sum()
atributos = df1.columns
a = { 'UNIAO_ESTAVEL' : 1,
      'OUTRO' : 2,
      'CASADO' : 3,
      'VIUVO' : 4,
     'SEPARADO_JUDICIALMENTE': 5,
     'DIVORCIADO' : 6,
     'SOLTEIRO':  7
    }
df1['status_civil'] = df1['status_civil'].map(a)
from sklearn import preprocessing
min_max_scaler = preprocessing.MinMaxScaler()
np_df = min_max_scaler.fit_transform(df1)
df_np = pd.DataFrame(np_df, columns = df1.columns)
#  desnormalização

np_df = min_max_scaler.inverse_transform(np_df)
def group(number):
    s = '%d' % number
    groups = []
    while s and s[-1].isdigit():
        groups.append(s[-3:])
        s = s[:-3]
    return s + '.'.join(reversed(groups))

for i in range (df1.shape[0]): 
    df1['valor_patrim'][i] = group(df1['valor_patrim'][i])
    df1['renda_mensal'][i] = group(df1['renda_mensal'][i])
    df1['valor_financ'][i] = group(df1['valor_financ'][i])

for i in range (df1.shape[0]): 
    df1['valor_patrim'][i] = float(df1['valor_patrim'][i].replace('.', ''))
    df1['renda_mensal'][i] = float(df1['renda_mensal'][i].replace('.', ''))
    df1['valor_financ'][i]  = float(df1['valor_financ'][i].replace('.', ''))

for i in range (df1.shape[0]): 
    df1['valor_patrim'] = df1['valor_patrim'].astype(float, '{0:,.0f}'.format)
    df1['renda_mensal'] = df1['renda_mensal'].astype(float, '{0:,.0f}'.format)
    df1['valor_financ'] = df1['valor_financ'].astype(float, '{0:,.0f}'.format)

labelsCo = [1,2,3,4,5,6,7,8]
labelsPa = [1,2,3,4]
labelsSa = [1,2,3,4,5,6]
df1['valor_patrim'] = pd.cut(df1['valor_patrim'], bins=8, labels=labelsCo)
df1['renda_mensal'] = pd.cut(df1['renda_mensal'], bins=4, labels=labelsPa)
df1['valor_financ'] = pd.cut(df1['valor_financ'], bins=6, labels=labelsSa)

classes = [df1['cred_aberto'].min(), 5, 10, df1['cred_aberto'].max()]
labels = [1,2,3]
df1['idade'] = pd.cut(df1['idade'], bins=classes, labels=labels, include_lowest = True)

classes = [df1.idade.min(), 35, 52, df1.idade.max()]
labels = [1,2,3]
df1['cred_aberto'] = pd.cut(df1['cred_aberto'], bins=6, labels=labelsSa, include_lowest = True)

df1 = df1.astype({'cred_aberto':'float',
                'idade':'float',
                'renda_mensal':'float',
                'valor_patrim':'float',
                'cred_aberto':'float'
               })

from sklearn.cluster import KMeans
agrupador = KMeans(n_clusters=7)
agrupador.fit(df_np)

labels = agrupador.labels_

from sklearn.cluster import KMeans, MeanShift, DBSCAN, estimate_bandwidth
from sklearn.metrics import silhouette_score
labels = agrupador.labels_

from sklearn.cluster import KMeans
valores_silhueta = []
faixa_n_clusters = [i for i in range(2,10)]

for k in faixa_n_clusters:
    agrupador = KMeans(n_clusters=k)
    labels = agrupador.fit_predict(df_np)
    media_silhueta = silhouette_score(df_np, labels)
    valores_silhueta.append(media_silhueta)

agrupador = KMeans(n_clusters=4, random_state = 22)
labels = agrupador.fit_predict(df_np)
media_silhueta = silhouette_score(df_np, labels)
valores_silhueta.append(media_silhueta)

df_np.iloc[25,:]

plis = pd.DataFrame(agrupador.predict(df_np))
plis

from collections import Counter
Counter(labels).values()

Counter(labels).keys()

import pickle
filename = 'modelo_risco_inadimplencia_4_classes'
pickle.dump(agrupador, open(filename, 'wb'))