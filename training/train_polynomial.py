from .trainer import Trainer
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from pathlib import Path

class PolynomialTrainer(Trainer):
    def __init__(self, data_path=None, model_dir=None, degree=2):
        SCRIPT_DIR = Path(__file__).resolve().parent

        default_model_dir = model_dir or (SCRIPT_DIR.parent / "models" / "polynomial_regression")
        default_model_dir.mkdir(parents=True, exist_ok=True)

        super().__init__(data_path, default_model_dir)

        self.degree = degree
        self.poly = None

    def build_model(self):
        self.poly = PolynomialFeatures(degree=self.degree, include_bias=False)
        self.X = self.poly.fit_transform(self.X)
        self.model = LinearRegression()

    def save_model(self):
        poly_path = self.model_dir / "transformer.pkl"
        joblib.dump(self.poly, poly_path)
        joblib.dump(self.model, self.model_path)
        print(f"✅ Polynomial Regression model dan transformer berhasil disimpan di '{self.model_dir}'")
