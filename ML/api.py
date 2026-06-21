import pickle
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("label_encoders.pkl", "rb") as f:
    encoders = pickle.load(f)


class PredictionInput(BaseModel):
    Terrain: str
    Threat_Type: str
    Weather: str
    Severity: str
    Civilian_Density: str
    Time_Of_Day: str
    Location_Type: str
    Target_Type: str
    Enemy_Strength: str
    Urgency: str
    Communication_Status: str
    Medical_Support: str
    Available_Air_Support: str
    Available_Naval_Support: str


def get_secondary_force(force):
    support_map = {
        "ITBP": "Indian Army",
        "BSF": "Indian Army",
        "Indian Coast Guard": "Indian Navy",
        "Indian Navy": "Indian Coast Guard",
        "Indian Air Force": "Indian Army Air Defence",
        "NSG": "CRPF",
        "CRPF": "State Police",
        "CISF": "NSG",
        "Assam Rifles": "Indian Army",
        "Indian Army": "CRPF",
    }

    return support_map.get(force, "Indian Army")


def get_risk_level(severity, urgency, enemy_strength):
    score = 0

    score += {
        "Low": 1,
        "Medium": 2,
        "High": 3,
        "Critical": 4,
    }.get(severity, 2)

    score += {
        "Low": 1,
        "Medium": 2,
        "High": 3,
        "Immediate": 4,
    }.get(urgency, 2)

    score += {
        "Small": 1,
        "Medium": 2,
        "Large": 3,
        "Unknown": 2,
    }.get(enemy_strength, 2)

    if score <= 5:
        return "Low"
    elif score <= 7:
        return "Medium"
    elif score <= 9:
        return "High"
    else:
        return "Critical"


def get_reason(force, data):
    terrain = data["Terrain"]
    threat = data["Threat_Type"]
    severity = data["Severity"]
    weather = data["Weather"]

    reason = (
        f"{force} is recommended because the model detected a strong match "
        f"between {terrain} terrain, {threat}, and {severity} severity."
    )

    if weather in ["Storm", "Snow", "Fog"]:
        reason += " Weather conditions may affect response time and operational planning."

    return reason


@app.get("/")
def home():
    return {"message": "Defence Recommendation API is running"}


@app.post("/predict")
def predict(data: PredictionInput):
    input_data = data.dict()

    encoded_input = {}

    for column, value in input_data.items():
        encoder = encoders[column]
        encoded_input[column] = encoder.transform([value])[0]

    df = pd.DataFrame([encoded_input])

    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]

    target_encoder = encoders["Recommended_Force"]

    recommended_force = target_encoder.inverse_transform([prediction])[0]
    confidence = round(max(probabilities) * 100, 2)

    secondary_force = get_secondary_force(recommended_force)
    risk_level = get_risk_level(
        input_data["Severity"],
        input_data["Urgency"],
        input_data["Enemy_Strength"],
    )
    reason = get_reason(recommended_force, input_data)

    return {
        "recommended_force": recommended_force,
        "confidence": confidence,
        "secondary_force": secondary_force,
        "risk_level": risk_level,
        "reason": reason,
    }