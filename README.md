# Presence - Employee Attendance Management System

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_Vite-blue)

**Presence** adalah aplikasi manajemen sumber daya manusia (HRIS) sederhana yang berfokus pada pencatatan absensi, pengelolaan data karyawan, serta manajemen departemen dan hari libur.

Aplikasi ini menggunakan *Mock Data* untuk menyimulasikan interaksi backend, sehingga dapat dijalankan sepenuhnya di sisi klien (client-side).

---

## 🚀 Live Demo

Anda dapat mencoba aplikasi yang sudah dideploy melalui tautan berikut:

🔗 **[Buka Aplikasi (Vercel)](https://presence-checkin-out.vercel.app/login)**

---

## 🔑 Akun Demo (Login Credentials)

Gunakan akun berikut untuk masuk dan menguji fitur-fitur di dalam aplikasi:

| Role | Username | Password | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `super_admin` | `superadmin123` | Akses penuh ke seluruh sistem tanpa batasan perusahaan. |
| **Admin** | `admin_user` | `admin123` | Akses manajemen untuk satu perusahaan spesifik. |

---

## ✨ Fitur Utama

Aplikasi ini mencakup fitur-fitur esensial untuk manajemen adminstrasi perkantoran:

* **Authentication**: Halaman login aman dengan validasi role (Admin vs Superadmin).
* **Dashboard Statistik**: Ringkasan visual jumlah karyawan, departemen, dan kehadiran.
* **Manajemen Karyawan**: Melihat daftar karyawan, detail profil, dan status.
* **Manajemen Departemen**: Pengelompokan struktur organisasi perusahaan.
* **Pencatatan Absensi (Presence)**: Simulasi data *check-in* dan *check-out*.
* **Manajemen Hari Libur**: Pengaturan kalender libur perusahaan.

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan *tech stack* modern untuk memastikan performa yang cepat dan kode yang mudah dipelihara:

* **Core**: [React.js](https://reactjs.org/)
* **Build Tool**: [Vite](https://vitejs.dev/) (untuk hot-reload yang super cepat)
* **Styling**: CSS Modules / Modern CSS
* **Routing**: React Router
* **Data Handling**: Mock Data & Local State Management
* **Version Control**: Git & GitHub

---

## 💻 Cara Menjalankan di Lokal

Jika Anda ingin menjalankan project ini di komputer Anda sendiri, ikuti langkah-langkah berikut:

1.  **Clone repository ini**
    ```bash
    git clone [https://github.com/VicoTriansyahNasril/presence-checkin-out.git](https://github.com/VicoTriansyahNasril/presence-checkin-out.git)
    cd presence-checkin-out
    ```

2.  **Install dependencies**
    Pastikan Anda sudah menginstall NodeJS.
    ```bash
    npm install
    ```

3.  **Jalankan server development**
    ```bash
    npm run dev
    ```

4.  **Buka di browser**
    Buka `http://localhost:5173` (atau port lain yang muncul di terminal).

---
