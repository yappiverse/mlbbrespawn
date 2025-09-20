from .predictor import Predictor
import json
import numpy as np
from pathlib import Path
from sklearn.preprocessing import PolynomialFeatures

class PolynomialPredictorJSON(Predictor):
    def __init__(self, json_path=None):
        SCRIPT_DIR = Path(__file__).resolve().parent
        default_json_path = json_path or (SCRIPT_DIR.parent / "models" / "polynomial_regression" / "model.json")

        super().__init__(default_json_path)
        self.degree = None
        self.coefficients = None
        self.intercept = None
        self.poly = None
        self.load_model()

    def load_model(self):
        with open(self.model_path, "r") as f:
            model_data = json.load(f)

        self.degree = int(model_data["degree"])
        self.intercept = float(model_data["intercept"])
        self.coefficients = np.array(model_data["coefficients"])

        # build polynomial transformer with the same degree
        self.poly = PolynomialFeatures(degree=self.degree, include_bias=False)

    def predict(self, hero_lvl, total_detik_mati):
        X = np.array([[hero_lvl, total_detik_mati]])
        X_poly = self.poly.fit_transform(X)  # match feature expansion
        return float(np.dot(self.coefficients, X_poly[0]) + self.intercept)
