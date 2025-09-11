import threading
from training.train_linear import LinearTrainer
from training.train_polynomial import PolynomialTrainer

def train_model():
    print("Pilih model untuk training:")
    print("1. Linear Regression")
    print("2. Polynomial Regression")
    print("3. Keduanya")
    choice = input("Masukkan pilihan (1/2/3): ")

    if choice == "1":
        trainer = LinearTrainer()
        trainer.train()
        trainer.save_model()
    elif choice == "2":
        trainer = PolynomialTrainer()
        trainer.train()
        trainer.save_model()
    elif choice == "3":
        linear_trainer = LinearTrainer()
        poly_trainer = PolynomialTrainer()

        # Bisa paralel
        t1 = threading.Thread(target=lambda: (linear_trainer.train(), linear_trainer.save_model()))
        t2 = threading.Thread(target=lambda: (poly_trainer.train(), poly_trainer.save_model()))
        t1.start()
        t2.start()
        t1.join()
        t2.join()
    else:
        print("Pilihan tidak valid!")

if __name__ == "__main__":
    train_model()
