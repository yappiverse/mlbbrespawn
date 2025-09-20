from predictors.predict_polynomial_json import PolynomialPredictorJSON

def parse_time_to_seconds(time_str):
    try:
        menit, detik = map(int, time_str.split(":"))
        return menit * 60 + detik
    except ValueError:
        raise ValueError("Format salah! Gunakan MM:SS")

def predict_respawn():
    poly_pred = PolynomialPredictorJSON()  # load from models/polynomial_regression/model.json by default

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

        respawn = poly_pred.predict(hero_lvl, total_detik_mati)
        print(f"Prediksi respawn (Polynomial JSON): {respawn:.2f} detik")

if __name__ == "__main__":
    predict_respawn()
