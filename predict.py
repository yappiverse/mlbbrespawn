from predictors.predict_linear import LinearPredictor
from predictors.predict_polynomial import PolynomialPredictor
import threading

def parse_time_to_seconds(time_str):
    try:
        menit, detik = map(int, time_str.split(":"))
        return menit * 60 + detik
    except ValueError:
        raise ValueError("Format salah! Gunakan MM:SS")

def predict_respawn():
    print("Pilih model untuk estimasi respawn:")
    print("1. Linear Regression")
    print("2. Polynomial Regression")
    print("3. Keduanya")
    choice = input("Masukkan pilihan (1/2/3): ")

    linear_pred = LinearPredictor() if choice in ["1","3"] else None
    poly_pred = PolynomialPredictor() if choice in ["2","3"] else None

    while True:
        hero_lvl_str = input("\nMasukkan level hero (atau 'q' untuk selesai): ")
        if hero_lvl_str.lower() == "q":
            print("Selesai prediksi.")
            break

        try:
            hero_lvl = int(hero_lvl_str)
        except ValueError:
            print("Level harus berupa angka!")
            continue

        waktu_mati_str = input("Masukkan waktu mati (MM:SS, contoh 12:32): ")
        try:
            total_detik_mati = parse_time_to_seconds(waktu_mati_str)
        except ValueError as e:
            print(e)
            continue

        if choice == "1":
            respawn = linear_pred.predict(hero_lvl, total_detik_mati)
            print(f"Prediksi respawn (Linear): {respawn:.2f} detik")
        elif choice == "2":
            respawn = poly_pred.predict(hero_lvl, total_detik_mati)
            print(f"Prediksi respawn (Polynomial): {respawn:.2f} detik")
        elif choice == "3":
            respawn_linear = None
            respawn_poly = None

            def predict_linear():
                nonlocal respawn_linear
                respawn_linear = linear_pred.predict(hero_lvl, total_detik_mati)

            def predict_poly():
                nonlocal respawn_poly
                respawn_poly = poly_pred.predict(hero_lvl, total_detik_mati)

            t1 = threading.Thread(target=predict_linear)
            t2 = threading.Thread(target=predict_poly)
            t1.start()
            t2.start()
            t1.join()
            t2.join()

            print(f"Prediksi respawn (Linear): {respawn_linear:.2f} detik")
            print(f"Prediksi respawn (Polynomial): {respawn_poly:.2f} detik")
        else:
            print("Pilihan tidak valid!")

if __name__ == "__main__":
    predict_respawn()
