from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import logging

# 1. Professional Logging Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ML Model එක රඳවා තබා ගැනීමේ Dictionary එක
ml_models = {}

# 2. FastAPI Lifespan Manager (Best Practice for loading ML Models)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # API එක Start වන විට Model එක Load කිරීම
    try:
        with open("predictor04.pickle", "rb") as f:
            ml_models["laptop_predictor"] = pickle.load(f)
        logger.info("Machine Learning Model loaded successfully.")
        yield
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        yield
    finally:
        # API එක Stop වන විට Memory එක නිදහස් කිරීම
        ml_models.clear()
        logger.info("Model unloaded from memory.")

# FastAPI ඇප් එක ආරම්භ කිරීම
app = FastAPI(lifespan=lifespan)

# 3. Secure CORS Setup (Frontend URLs පමණක් ඇතුළත් කරන්න)
origins = [
    "http://localhost:5173",  # Vite React frontend (Local)
    "http://localhost:3000",  # Alternative React port
    # "https://your-production-domain.com" <- Deploy කරන විට මෙය Uncomment කරන්න
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"], # අවශ්‍ය Methods පමණක් ලබා දීම
    allow_headers=["*"],
)

# Frontend එකෙන් එවන දත්ත වල ආකෘතිය (Schema)
class LaptopInput(BaseModel):
    ram: int
    weight: float
    touchscreen: int
    ips: int
    company: str
    typename: str
    opsys: str
    cpuname: str
    gpuname: str

@app.post("/predict")
def predict_price(data: LaptopInput):
    model = ml_models.get("laptop_predictor")
    
    if not model:
        logger.error("Prediction requested but model is not loaded.")
        raise HTTPException(status_code=503, detail="Service Unavailable: Model not loaded")

    try:
        # Model එක පුහුණු කර ඇති තීරු වල අනුපිළිවෙල ලබාගැනීම
        columns = model.feature_names_in_
        
        # සියලුම අගයන් 0.0 වන පරිදි DataFrame එකක් සැකසීම
        df = pd.DataFrame(0.0, index=[0], columns=columns)
        
        # Numeric අගයන් ඇතුළත් කිරීම
        df.at[0, 'Ram'] = float(data.ram)
        df.at[0, 'Weight'] = data.weight
        df.at[0, 'Touchscreen'] = float(data.touchscreen)
        df.at[0, 'Ips'] = float(data.ips)
        
        # Category අගයන් (One-Hot Encoding) 1.0 බවට පත් කිරීම
        if f'Company_{data.company}' in columns: df.at[0, f'Company_{data.company}'] = 1.0
        if f'OpSys_{data.opsys}' in columns: df.at[0, f'OpSys_{data.opsys}'] = 1.0
        if f'TypeName_{data.typename}' in columns: df.at[0, f'TypeName_{data.typename}'] = 1.0
        if f'cpu_name_{data.cpuname}' in columns: df.at[0, f'cpu_name_{data.cpuname}'] = 1.0
        if f'gpu_name_{data.gpuname}' in columns: df.at[0, f'gpu_name_{data.gpuname}'] = 1.0
        
        # මිල අනුමාන කිරීම
        prediction = model.predict(df)[0]
        
        logger.info(f"Successful prediction for {data.company} {data.typename}: {prediction}")
        return {"predicted_price": round(float(prediction), 2)}

    except Exception as e:
        # 4. Secure Error Handling: සැබෑ දෝෂය Terminal එකට ලොග් කර, Frontend එකට Generic Message එකක් යැවීම
        logger.error(f"Prediction Error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="An internal error occurred during prediction. Please try again.")