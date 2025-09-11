import csv
from pathlib import Path

# Tentukan folder dan file data
SCRIPT_DIR = Path(__file__).resolve().parent
DATA_DIR = SCRIPT_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
DATA_FILE = DATA_DIR / "data_respawn.csv"

# Cek apakah file sudah ada
file_baru = not DATA_FILE.exists()

# Buat file dan header jika baru
with DATA_FILE.open(mode="a", newline="") as f:
    writer = csv.writer(f)
    if file_baru:
        writer.writerow(["Level Hero", "Waktu Mati (MM:SS)", "Total Detik Mati", "Lama Respawn (detik)"])

# Input data
while True:
    hero_lvl_str = input("Masukkan level hero (contoh 12, atau 'q' untuk selesai): ")

    if hero_lvl_str.lower() == "q":
        print("Input selesai. Data disimpan di", DATA_FILE)
        break

    try:
        hero_lvl = int(hero_lvl_str)
    except ValueError:
        print("Level harus berupa angka!")
        continue

    menit_mati_str = input("Masukkan menit:detik mati (contoh 01:23): ")
    try:
        menit, detik = map(int, menit_mati_str.split(":"))
        total_detik_mati = menit * 60 + detik
    except ValueError:
        print("Format salah! Gunakan MM:SS")
        continue

    try:
        lama_respawn = int(input("Masukkan lama respawn (contoh 12): "))
    except ValueError:
        print("Respawn harus berupa angka!")
        continue

    with DATA_FILE.open(mode="a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([hero_lvl, f"{menit:02d}:{detik:02d}", total_detik_mati, lama_respawn])

    print(f"Data level {hero_lvl} berhasil disimpan!\n")
