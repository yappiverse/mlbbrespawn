from .trainer import Trainer
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from pathlib import Path
import numpy as np

class PolynomialTrainer(Trainer):
    def __init__(self, data_path=None, model_dir=None, max_degree=20, test_size=0.2, random_state=42):
        """
        max_degree: maksimal derajat polinomial yang dicoba
        test_size: proporsi data untuk validation
        random_state: untuk reproducibility
        """
        SCRIPT_DIR = Path(__file__).resolve().parent
        default_model_dir = model_dir or (SCRIPT_DIR.parent / "models" / "polynomial_regression")
        default_model_dir.mkdir(parents=True, exist_ok=True)

        super().__init__(data_path, default_model_dir)

        self.degree = None
        self.max_degree = max_degree
        self.poly = None
        self.model = None
        self.test_size = test_size
        self.random_state = random_state

    def find_best_degree(self):
        """Mencari derajat polinomial terbaik menggunakan validation set"""
        X_train, X_val, y_train, y_val = train_test_split(
            self.X, self.y, test_size=self.test_size, random_state=self.random_state
        )

        best_degree = 1
        best_score = float('inf')

        for d in range(1, self.max_degree + 1):
            poly = PolynomialFeatures(degree=d, include_bias=False)
            X_train_poly = poly.fit_transform(X_train)
            X_val_poly = poly.transform(X_val)

            model = LinearRegression()
            model.fit(X_train_poly, y_train)
            y_pred = model.predict(X_val_poly)
            score = mean_squared_error(y_val, y_pred)

            print(f"Degree {d}, Validation MSE: {score:.4f}")

            if score < best_score:
                best_score = score
                best_degree = d

        print(f"✅ Best degree found: {best_degree} with Validation MSE: {best_score:.4f}")
        return best_degree

    def build_model(self):
        # Tentukan degree terbaik otomatis
        self.degree = self.find_best_degree()
        self.poly = PolynomialFeatures(degree=self.degree, include_bias=False)
        self.X = self.poly.fit_transform(self.X)
        self.model = LinearRegression()
        self.model.fit(self.X, self.y)

    def save_model(self):
        poly_path = self.model_dir / "transformer.pkl"
        joblib.dump(self.poly, poly_path)
        joblib.dump(self.model, self.model_path)
        print(f"✅ Polynomial Regression model dan transformer berhasil disimpan di '{self.model_dir}'")
