from predictors.predict_linear import LinearPredictor
from predictors.predict_polynomial import PolynomialPredictor
import numpy as np

def parse_time_to_seconds(time_str):
    """Ubah format MM:SS menjadi total detik"""
    try:
        menit, detik = map(int, time_str.split(":"))
        return menit * 60 + detik
    except ValueError:
        raise ValueError("Format salah! Gunakan MM:SS")

def main():
    print("Pilih model untuk estimasi respawn:")
    print("1. Linear Regression")
    print("2. Polynomial Regression")
    print("3. Keduanya")
    choice = input("Masukkan pilihan (1/2/3): ")

    try:
        hero_lvl = int(input("Masukkan level hero: "))
        waktu_mati_str = input("Masukkan waktu mati (MM:SS, contoh 12:32): ")
        total_detik_mati = parse_time_to_seconds(waktu_mati_str)
    except ValueError as e:
        print(e)
        return

    if choice == "1":
        pred = LinearPredictor()
        respawn = pred.predict(hero_lvl, total_detik_mati)
        print(f"Prediksi respawn (Linear): {respawn:.2f} detik")
    elif choice == "2":
        pred = PolynomialPredictor()
        respawn = pred.predict(hero_lvl, total_detik_mati)
        print(f"Prediksi respawn (Polynomial): {respawn:.2f} detik")
    elif choice == "3":
        linear_pred = LinearPredictor()
        poly_pred = PolynomialPredictor()
        respawn_linear = linear_pred.predict(hero_lvl, total_detik_mati)
        respawn_poly = poly_pred.predict(hero_lvl, total_detik_mati)
        print(f"Prediksi respawn (Linear): {respawn_linear:.2f} detik")
        print(f"Prediksi respawn (Polynomial): {respawn_poly:.2f} detik")
    else:
        print("Pilihan tidak valid!")

if __name__ == "__main__":
    main()
