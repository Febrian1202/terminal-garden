# 🪴 Terminal-Themed Digital Garden

Sebuah *website* catatan pribadi (Digital Garden) bergaya *Command Line Interface* (CLI) interaktif. Proyek ini dibangun untuk mendokumentasikan proses belajar, *snippet* kode, dan artikel teknis dalam bentuk file Markdown (MDX) yang dirender menyerupai antarmuka terminal Linux.

## ✨ Fitur Utama

* **💻 Interactive CLI Input:** Navigasi antar halaman catatan tidak hanya dengan klik, tapi bisa dengan mengetikkan perintah terminal sungguhan seperti `cd`, `ls`, `clear`, dan `help`.
* **📝 MDX Powered:** Tulis catatan menggunakan Markdown biasa namun dengan kemampuan menyisipkan komponen React di dalamnya.
* **🎨 Syntax Highlighting:** Blok kode di dalam catatan diwarnai secara otomatis menggunakan tema *Dracula* (berkat `rehype-pretty-code`).
* **⏱️ Auto Reading Time:** Otomatis menghitung estimasi waktu baca (contoh: *1 min read*) berdasarkan panjang teks di setiap catatan.
* **📂 Dynamic File System:** Halaman utama otomatis membaca struktur *folder* di dalam `src/app/` dan menampilkannya sebagai simulasi hasil dari perintah `ls -la`.
* **🚨 Custom 404 Page:** Halaman *Not Found* yang dimodifikasi menyerupai *error log* sistem operasi.

## 🛠️ Teknologi yang Digunakan

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Font:** Fira Code (Monospace)
* **Markdown Parsing:** `@next/mdx`, `gray-matter` (untuk *Frontmatter*)
* **Utilities:** `reading-time`, `shiki`

## 🚀 Cara Menjalankan di Komputer Lokal

Pastikan kamu sudah menginstal Node.js dan disarankan menggunakan `pnpm` sebagai *package manager*.

1. Kloning repositori ini:
   ```bash
   git clone <url-repo-kamu>
   cd terminal-garden
   ```
2. Install semua dependency:
    ```bash
    pnpm install
    ```
3. Jalankan development server:
    ```bash
    pnpm dev
    ```
4. Buka http://localhost:3000 di browser favoritmu: