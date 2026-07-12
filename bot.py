"""
PC Shutdown Server
-------------------
Server kecil yang jalan di PC Windows kamu. Begitu nerima request
dari HP (lewat browser atau app), PC bakal shutdown secara normal.

CARA PAKAI:
1. Install Python dulu kalau belum ada: https://www.python.org/downloads/
   (waktu install, centang "Add Python to PATH")
2. Install Flask lewat Command Prompt:
   pip install flask
3. Ganti PASSWORD di bawah ini jadi password sendiri (biar orang lain
   di WiFi yang sama gak asal shutdown PC kamu).
4. Jalankan script ini: python pc_shutdown_server.py
5. Cari IP address PC kamu: buka CMD, ketik "ipconfig", lihat
   "IPv4 Address" (contoh: 192.168.1.10)
6. Dari HP (harus di WiFi yang sama), buka browser, akses:
   http://192.168.1.10:5000/shutdown?password=PASSWORD_KAMU

   Atau kalau mau matiin timer shutdown (misal dalam 60 detik,
   supaya bisa dibatalkan kalau salah pencet):
   http://192.168.1.10:5000/shutdown?password=PASSWORD_KAMU&delay=60

7. Untuk membatalkan shutdown yang sedang delay:
   http://192.168.1.10:5000/cancel?password=PASSWORD_KAMU

TIPS:
- Biar makin gampang dari HP, install app "HTTP Shortcuts" (Android)
  atau "Shortcuts" (iOS) terus bikin tombol yang langsung hit URL di
  atas. Taruh di homescreen, tinggal tap sekali.
- Script ini otomatis jalan terus di background PC. Kalau mau auto-start
  pas PC nyala, taruh shortcut script ini di folder Startup Windows.
"""

from flask import Flask, request
import os
import subprocess

app = Flask(__name__)

# GANTI INI dengan password kamu sendiri!
PASSWORD = "GANTI_PASSWORD_INI"


def check_password(req):
    return req.args.get("password") == PASSWORD


@app.route("/shutdown")
def shutdown():
    if not check_password(request):
        return "Password salah.", 403

    delay = request.args.get("delay", default="0")
    try:
        delay = int(delay)
    except ValueError:
        delay = 0

    # Perintah shutdown Windows. /s = shutdown, /t = delay dalam detik
    subprocess.run(["shutdown", "/s", "/t", str(delay)])

    if delay > 0:
        return f"PC akan shutdown dalam {delay} detik. Kirim request ke /cancel untuk membatalkan."
    return "PC sedang shutdown sekarang."


@app.route("/cancel")
def cancel():
    if not check_password(request):
        return "Password salah.", 403

    subprocess.run(["shutdown", "/a"])
    return "Shutdown dibatalkan."


@app.route("/")
def home():
    return "PC Shutdown Server aktif. Gunakan /shutdown?password=... untuk mematikan PC."


if __name__ == "__main__":
    # host="0.0.0.0" supaya bisa diakses dari HP di jaringan yang sama
    app.run(host="0.0.0.0", port=5000)