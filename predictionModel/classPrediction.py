# %%

import pandas as pd
from sklearn import preprocessing
import pickle, requests, os
dir_path = os.path.dirname(os.path.realpath(__file__))

# %%
def predictValue(data):
    # Send a request to localhost:3100 to get data  
    # api-endpoint
    URL = "http://localhost:3100/returnCustom/"+str(data['id'])
    
    # sending get request and saving the response as response object
    r = requests.get(url = URL)
    
    # extracting data in json format
    userData = r.json()
    userData = userData['data']

    df = pd.DataFrame([[userData['creliq'], userData['idade'], userData['status_civil'], userData['ocupacao'], userData['numero_dependentes'], userData['salario'], userData['patrimonio'], data['valor_financ'], userData['cred_aberto']]], columns=['creliq', 'idade', 'status_civil', 'ocupacao', 'numero_dependentes', 'renda_mensal', 'valor_patrim', 'valor_financ', 'cred_aberto'])

    a = { 'UNIAO_ESTAVEL' : 1,
      'OUTRO' : 2,
      'CASADO' : 3,
      'VIUVO' : 4,
     'SEPARADO_JUDICIALMENTE': 5,
     'DIVORCIADO' : 6,
     'SOLTEIRO':  7
    }

    df['status_civil'] = df['status_civil'].map(a)
    min_max_scaler = preprocessing.MinMaxScaler()
    np_df = min_max_scaler.fit_transform(df)
    df_np = pd.DataFrame(np_df, columns = df.columns)
    np_df_no_transform = min_max_scaler.inverse_transform(df_np)
    df_np_no_transform = pd.DataFrame(np_df_no_transform, columns = df.columns)
    print(df_np_no_transform.head())
    
    agrupador = pickle.load(open(dir_path+'\modelo_risco_inadimplencia_4_classes', 'rb'))
    
    res = agrupador.predict(df_np_no_transform)[0]

    return res