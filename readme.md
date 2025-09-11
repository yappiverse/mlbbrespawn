# MLBB Respawn Time Predictor 🕹️⏱️

Sistem prediksi **lama respawn hero Mobile Legends** menggunakan **Linear Regression** dan **Polynomial Regression**.  
Data respawn dikumpulkan secara manual, dilatih, dan digunakan untuk prediksi secara interaktif.

## ⚙️ Instalasi

1. Clone repo:

```bash
git clone https://github.com/yappiverse/mlbbrespawn.git
cd mlbbrespawn
```

2. Install dependency:

```bash
pip install -r requirements.txt
```

---

## 📝 Cara Penggunaan

1. Jalankan menu utama:

```bash
python main.py
```

2. Pilihan menu:

| Pilihan | Deskripsi                                                  |
| ------- | ---------------------------------------------------------- |
| 1       | Input data respawn hero (level, waktu mati, lama respawn)  |
| 2       | Train model Linear / Polynomial / Keduanya                 |
| 3       | Prediksi respawn hero menggunakan model yang sudah dilatih |
| q       | Keluar dari program                                        |

3. Format waktu mati: **MM\:SS** (misal: 12:32)
4. Model akan disimpan di folder `models/` secara otomatis.
5. Prediksi Linear & Polynomial bisa dijalankan **paralel**.

---

## 🖥️ Contoh Penggunaan

**Input Data:**

```
Masukkan level hero: 12
Masukkan waktu mati (MM:SS): 01:45
Masukkan lama respawn: 15
```

**Train Model:**

```
Pilih model untuk training: 3
✅ Linear Regression model berhasil disimpan di 'models/linear_regression/model.pkl'
✅ Polynomial Regression model dan transformer berhasil disimpan di 'models/polynomial_regression/'
```

**Predict Respawn:**

```
Masukkan level hero: 12
Masukkan waktu mati (MM:SS): 01:45
Prediksi respawn (Linear): 14.87 detik
Prediksi respawn (Polynomial): 15.12 detik
```
