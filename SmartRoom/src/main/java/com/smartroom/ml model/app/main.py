from fastapi import FastAPI
from pydantic import BaseModel
from app.model.model import predict_pipeline as prediction

app = FastAPI()

class Params(BaseModel):
    sex: str
    age: int
    address: str
    famsize: str
    Pstatus: str
    Medu: int
    Fedu: int
    Mjob: str
    Fjob: str
    traveltime: int
    studytime: int
    failures: int
    schoolsup: str
    famsup: str
    paid: str
    activities: str
    nursery: str
    higher: str
    internet: str
    famrel: int
    freetime: int
    health: int
    absences: int
    G1: int
    G2: int


class ParamsIn(BaseModel):
    params: Params

class PredScore(BaseModel):
        score: int

@app.get("/")
def home():
    return {"health_check": "OK"}

@app.post("/predict" )
def predict(payload: ParamsIn):
    payload.params = vars(payload.params)
    score = prediction(payload.params)
    response = {"Predicted Score": score}
    return response