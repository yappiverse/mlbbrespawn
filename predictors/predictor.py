from pathlib import Path
from abc import ABC, abstractmethod

class Predictor(ABC):
    def __init__(self, model_path=None):
        self.model_path = Path(model_path) if model_path else Path("models/default_model/model.pkl")
        if not self.model_path.exists():
            raise FileNotFoundError(f"Model tidak ditemukan di {self.model_path}")
        self.model = None
        self.transformer_path = None
        self.transformer = None

    @abstractmethod
    def load_model(self):
        """Load model dan transformer jika ada"""
        pass

    @abstractmethod
    def predict(self, hero_lvl, total_detik_mati):
        """
        Return prediksi respawn.
        hero_lvl : int
        total_detik_mati : int
        return : float
        """
        pass
