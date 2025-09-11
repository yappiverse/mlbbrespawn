from abc import ABC, abstractmethod
from pathlib import Path
import joblib
import csv
import numpy as np

class Trainer(ABC):
    def __init__(self, data_path=None, model_dir=None):
        SCRIPT_DIR = Path(__file__).resolve().parent

        self.data_path = Path(data_path) if data_path else SCRIPT_DIR.parent / "data" / "data_respawn.csv"

        self.model_dir = Path(model_dir) if model_dir else SCRIPT_DIR.parent / "models" / "default_model"
        self.model_dir.mkdir(parents=True, exist_ok=True)

        self.model_path = self.model_dir / "model.pkl"

        self.X = None
        self.y = None
        self.model = None

    @abstractmethod
    def build_model(self):
        """Buat instance model spesifik"""
        pass

    def load_data(self):
        """Load data dari CSV"""
        if not self.data_path.exists():
            raise FileNotFoundError(f"Data file tidak ditemukan di {self.data_path}")
        
        data = []
        with self.data_path.open(newline="") as f:
            reader = csv.reader(f)
            next(reader)  # skip header
            for row in reader:
                hero_lvl = int(row[0])
                total_detik_mati = int(row[2])
                lama_respawn = int(row[3])
                data.append([hero_lvl, total_detik_mati, lama_respawn])
        
        self.X = np.array([[d[0], d[1]] for d in data])
        self.y = np.array([d[2] for d in data])

    def train(self):
        """Load data, build model, dan fit"""
        if self.X is None or self.y is None:
            self.load_data()
        self.build_model()
        self.model.fit(self.X, self.y)

    def save_model(self):
        """Simpan model ke file"""
        joblib.dump(self.model, self.model_path)
        print(f"Model berhasil disimpan di '{self.model_path}'")
