from pathlib import Path
from abc import ABC, abstractmethod

class Predictor(ABC):
    def __init__(self, model_path=None):
        self.model_path = Path(model_path) if model_path else Path("models/default_model/model.pkl")
        self.model = None

    @abstractmethod
    def load_model(self):
        """Load model spesifik"""
        pass

    @abstractmethod
    def predict(self, hero_lvl, total_detik_mati):
        """Return prediksi respawn"""
        pass
