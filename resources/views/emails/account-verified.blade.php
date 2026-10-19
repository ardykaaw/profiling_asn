<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akun proASN Anda Telah Aktif</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f1f5f9;
            margin: 0;
            padding: 24px;
            color: #1e293b;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(135deg, #064e3b 0%, #047857 100%);
            padding: 36px 32px;
            text-align: center;
            color: #ffffff;
        }
        .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.35);
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            line-height: 1.3;
        }
        .content {
            padding: 32px;
            line-height: 1.6;
            font-size: 14px;
        }
        .card-info {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
        }
        .card-info table {
            width: 100%;
            border-collapse: collapse;
        }
        .card-info td {
            padding: 6px 0;
            font-size: 13px;
        }
        .card-info td.label {
            color: #64748b;
            width: 40%;
        }
        .card-info td.val {
            font-weight: 600;
            color: #0f172a;
        }
        .btn-cta {
            display: inline-block;
            background: #047857;
            color: #ffffff !important;
            padding: 14px 28px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
            margin: 8px 0;
            text-align: center;
        }
        .ketikin-promo {
            margin-top: 32px;
            padding: 20px;
            background: #eff6ff;
            border: 1px dashed #93c5fd;
            border-radius: 12px;
            text-align: center;
        }
        .ketikin-promo h3 {
            margin: 0 0 6px 0;
            font-size: 14px;
            color: #1e40af;
        }
        .ketikin-promo p {
            margin: 0;
            font-size: 12px;
            color: #3b82f6;
        }
        .footer {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 20px 32px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="badge">proASN by Ketik.in</div>
            <h1>Akun Anda Telah Aktif!</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 13px;">Selamat datang di Ruang Simulasi Asesmen & Profiling ASN</p>
        </div>

        <!-- Content -->
        <div class="content">
            <p>Halo <strong>{{ $user->name }}</strong>,</p>
            <p>
                Kabar gembira! Permintaan pendaftaran akun Anda di portal <strong>proASN</strong> telah diverifikasi dan disetujui oleh Tim Admin. Akun Anda kini resmi aktif dengan akses penuh selama <strong>1 Tahun (365 Hari)</strong>.
            </p>

            <!-- Membership Info Card -->
            <div class="card-info">
                <table>
                    <tr>
                        <td class="label">Nama Peserta:</td>
                        <td class="val">{{ $user->name }}</td>
                    </tr>
                    <tr>
                        <td class="label">Alamat Email:</td>
                        <td class="val">{{ $user->email }}</td>
                    </tr>
                    <tr>
                        <td class="label">Tanggal Verifikasi:</td>
                        <td class="val">{{ $verifiedAt }}</td>
                    </tr>
                    <tr>
                        <td class="label">Masa Berlaku Hingga:</td>
                        <td class="val" style="color: #047857;">{{ $expiresAt }} (1 Tahun Penuh)</td>
                    </tr>
                    <tr>
                        <td class="label">Status Akses:</td>
                        <td class="val" style="color: #047857;">AKTIF &amp; TERVERIFIKASI</td>
                    </tr>
                </table>
            </div>

            <p><strong>Fasilitas yang Dapat Anda Akses Sekarang:</strong></p>
            <ul style="padding-left: 20px; margin-top: 6px; font-size: 13px; color: #334155;">
                <li>Simulasi CAT 4 Dimensi Profiling BKN (Tes Potensi, Mansoskul, Literasi Digital, Preferensi Karir).</li>
                <li>Rapor Profiling Otomatis &amp; Pemetaan Matriks 9 Box SIMATA.</li>
                <li>Kunci Jawaban dan Rasionalisasi Pembahasan Lengkap.</li>
                <li>Bank Bahan Materi &amp; Kisi-kisi PermenPAN-RB.</li>
            </ul>

            <div style="text-align: center; margin: 28px 0;">
                <a href="{{ $dashboardUrl }}" class="btn-cta">
                    Masuk ke Dashboard Ujian &rarr;
                </a>
            </div>

            <!-- Promotion: proASN by Ketik.in -->
            <div class="ketikin-promo">
                <h3>💡 Diberdayakan oleh Ketik.in</h3>
                <p>
                    <strong>proASN</strong> adalah bagian dari ekosistem <strong>Ketik.in</strong> — platform asisten AI penulisan naskah dinas, administrasi kepegawaian, dan produktivitas ASN nomor 1 di Indonesia.
                </p>
                <div style="margin-top: 10px;">
                    <a href="https://ketik.in" target="_blank" style="color: #1d4ed8; font-weight: 700; font-size: 12px; text-decoration: underline;">
                        Kunjungi Ketik.in &rarr;
                    </a>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0;">&copy; {{ date('Y') }} proASN by Ketik.in. Seluruh hak cipta dilindungi undang-undang.</p>
            <p style="margin: 4px 0 0 0;">Email ini dikirim otomatis sebagai konfirmasi aktivasi akun resmi Anda.</p>
        </div>
    </div>
</body>
</html>
