from .trainer import Trainer
from sklearn.linear_model import LinearRegression
from pathlib import Path

class LinearTrainer(Trainer):
    def __init__(self, data_path=None, model_dir=None):
        SCRIPT_DIR = Path(__file__).resolve().parent
        default_data_path = data_path

        # Folder model default: models/linear_regression
        default_model_dir = model_dir or (SCRIPT_DIR.parent / "models" / "linear_regression")
        default_model_dir.mkdir(parents=True, exist_ok=True)

        super().__init__(data_path=default_data_path, model_dir=default_model_dir)

    def build_model(self):
        self.model = LinearRegression()
