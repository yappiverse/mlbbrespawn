import input_data
import train
import predict

def main():
    while True:
        print("\n=== MENU UTAMA ===")
        print("1. Input Data Respawn")
        print("2. Train Model")
        print("3. Predict Respawn")
        print("q. Keluar")

        choice = input("Masukkan pilihan: ")

        if choice == "1":
            input_data.input_data()
        elif choice == "2":
            train.train_model()
        elif choice == "3":
            predict.predict_respawn()
        elif choice.lower() == "q":
            print("Terima kasih, program selesai.")
            break
        else:
            print("Pilihan tidak valid!")

if __name__ == "__main__":
    main()
