from training.train_linear import LinearTrainer
from training.train_polynomial import PolynomialTrainer


print("Pilih model yang ingin di-train:")
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
    linear_trainer.train()
    linear_trainer.save_model()

    poly_trainer = PolynomialTrainer()
    poly_trainer.train()
    poly_trainer.save_model()
else:
    print("Pilihan tidak valid! Silakan pilih 1, 2, atau 3.")
