# ⚽ World Cup Info's

**World Cup Info's** adalah website informasi seputar **FIFA World Cup**, dibuat sebagai proyek fan-made non-komersial untuk menyajikan info turnamen dunia secara ringkas dan mudah diakses — mulai dari wallchart, countdown, hingga ranking FIFA.

> ⚠️ **Disclaimer:** Website ini adalah proyek independen/fan-made dan **tidak berafiliasi secara resmi dengan FIFA** atau organisasi sepak bola internasional manapun. Seluruh data disajikan untuk tujuan informasi semata.

---

## 🌐 Live Demo

Dihosting via **GitHub Pages** — bisa diakses langsung setelah repository diaktifkan di `Settings > Pages`.

```
https://pitchbrief.github.io/world-cup-info/
```

---

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| 🏠 **Home** | Halaman utama, landing page saat website dibuka |
| 🏆 **WC 2030 Wallchart** | Bagan/bracket turnamen World Cup 2030 (terkunci selama masa countdown) |
| ⏳ **Countdown WC 2030** | Hitung mundur menuju kick-off FIFA World Cup 2030 |
| 📊 **FIFA Ranking** | Menampilkan peringkat FIFA (Top 1–50) |
| 📄 **WC Info's Docs** | Dokumentasi & informasi tambahan seputar website ini |

---

## 🎨 Desain

- **Gaya visual:** Terinspirasi tema World Cup, FIFA, dan sepak bola internasional
- **Design language:** iOS 26 (tanpa efek *Liquid Glass*)
- **Font:** [Inter](https://fonts.google.com/specimen/Inter)
- **Grafis:** Mayoritas menggunakan format **SVG** untuk ikon, bendera, dan elemen visual lainnya

---

## 📁 Struktur Proyek

```
world-cup-info/
├── assets/
│   ├── wallchart.json      # Data bagan turnamen
│   ├── ranking.json        # Data ranking FIFA (Top 1-50)
│   ├── countdown.json      # Konfigurasi tanggal countdown
│   ├── background.png      # Background utama
│   ├── wctrophy.png        # Aset trofi World Cup
│   ├── wc30logo.png        # Logo World Cup 2030
│   └── flag-svg.js         # Data bendera negara dalam format SVG (JS object)
├── index.html               # Halaman Home
├── countdown.html           # Halaman Countdown (CSS & JS menyatu)
├── wallchart.html            # Halaman Wallchart (CSS menyatu, JS di app.js)
├── ranking.html               # Halaman FIFA Ranking (CSS & JS menyatu)
├── app.js                    # Logic khusus wallchart
├── config.json               # Konfigurasi umum website
├── style.css                  # Stylesheet global
└── README.md                   # Dokumen ini
```

---

## 🚀 Cara Menjalankan (Lokal)

Karena seluruh halaman berbasis file statis (HTML/CSS/JS murni tanpa build tool), kamu bisa langsung membukanya:

1. Clone repository ini:
   ```bash
   git clone https://github.com/pitchbrief/world-cup-info.git
   cd world-cup-info
   ```
2. Buka `index.html` langsung di browser, **atau** jalankan local server (disarankan untuk menghindari isu CORS pada file `.json`):
   ```bash
   npx serve .
   ```
   atau
   ```bash
   python3 -m http.server 8080
   ```
3. Akses via `http://localhost:8080`

---

## 🛠️ Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES5-compatible)
- SVG untuk ikon & bendera
- Tanpa framework, tanpa build step — 100% statis, siap deploy ke GitHub Pages

---

## 📌 Status Pengembangan

Proyek ini masih dalam tahap pengembangan aktif. Fitur dan data dapat berubah sewaktu-waktu menjelang FIFA World Cup 2030.

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan informasi & edukasi non-komersial. Seluruh nama, logo, dan merek terkait FIFA dan World Cup adalah hak milik dari pemegang mereknya masing-masing.

---

Dibuat dengan ⚽ oleh **[pitchbrief](https://github.com/pitchbrief)**
