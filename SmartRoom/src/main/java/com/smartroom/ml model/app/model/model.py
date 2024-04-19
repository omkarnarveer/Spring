import pickle
import pandas as pd
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent

with open(f"{BASE_DIR}/trained_RFregsr.pkl", "rb") as f:
    model = pickle.load(f)


def predict_pipeline(params):
    print("inside model.py")
    params = pd.DataFrame([params.values()], columns= params.keys())
    pred = model.predict(params)
    pred =  np.round(pred,0)
    pred=pred*5
    return int(pred)
