from .trainer import Trainer
from sklearn.linear_model import LinearRegression
from pathlib import Path

class LinearTrainer(Trainer):
    def __init__(self, data_path=None, model_dir=None):
        default_model_dir = Path("models/linear_regression")
        super().__init__(data_path, model_dir or default_model_dir)

    def build_model(self):
        self.model = LinearRegression()
