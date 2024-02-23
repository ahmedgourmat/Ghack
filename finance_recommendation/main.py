from fastapi import FastAPI , HTTPException
from pydantic import BaseModel
from finance_recommendation import model


app = FastAPI()


class TextIn(BaseModel):
    objective: str
    budget: str


class RecomOut(BaseModel):
    recommendation: str


@app.get("/")
def home():
    return {"health_check": "OK"}


@app.post("/recommendation", response_model=RecomOut)
async def recommendation(payload: TextIn):
    recommendations = model.generate_recommendations(payload.objective,payload.budget)
    if recommendations:
        return {"recommendation": recommendations}
    else:
        raise HTTPException(status_code=404, detail="No recommendations generated")
    




