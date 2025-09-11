from .predictor import Predictor
import joblib
import numpy as np
from pathlib import Path

class LinearPredictor(Predictor):
    def __init__(self, model_path=None):
        SCRIPT_DIR = Path(__file__).resolve().parent
        default_path = model_path or (SCRIPT_DIR.parent / "models" / "linear_regression" / "model.pkl")
        super().__init__(default_path)
        self.load_model()

    def load_model(self):
        self.model = joblib.load(self.model_path)

    def predict(self, hero_lvl, total_detik_mati):
        X = np.array([[hero_lvl, total_detik_mati]])
        return self.model.predict(X)[0]
