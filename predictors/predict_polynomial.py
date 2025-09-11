from .predictor import Predictor
import joblib
import numpy as np
from pathlib import Path

class PolynomialPredictor(Predictor):
    def __init__(self, model_path=None, transformer_path=None):
        SCRIPT_DIR = Path(__file__).resolve().parent
        default_model_path = model_path or (SCRIPT_DIR.parent / "models" / "polynomial_regression" / "model.pkl")
        default_transformer_path = transformer_path or (SCRIPT_DIR.parent / "models" / "polynomial_regression" / "transformer.pkl")
        
        super().__init__(default_model_path)
        self.transformer_path = Path(default_transformer_path)
        self.poly = None
        self.load_model()

    def load_model(self):
        self.model = joblib.load(self.model_path)
        self.poly = joblib.load(self.transformer_path)

    def predict(self, hero_lvl, total_detik_mati):
        X = np.array([[hero_lvl, total_detik_mati]])
        X_poly = self.poly.transform(X)
        return self.model.predict(X_poly)[0]
