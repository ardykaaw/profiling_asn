<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akun proASN Anda Telah Aktif</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px 12px; color: #1e293b; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        <!-- Header -->
        <tr>
            <td style="background: #047857; background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 36px 24px; text-align: center; color: #ffffff;">
                <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.35); padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 12px; color: #ffffff;">
                    proASN by Ketik.in
                </div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.3; color: #ffffff;">Akun Anda Telah Aktif!</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 13px; color: #d1fae5;">Ruang Simulasi Asesmen &amp; Pemetaan Profiling ASN Resmi</p>
            </td>
        </tr>

        <!-- Content -->
        <tr>
            <td style="padding: 32px 24px; line-height: 1.6; font-size: 14px; color: #1e293b;">
                <p style="margin: 0 0 14px 0; font-size: 15px;">Halo <strong>{{ $user->name }}</strong>,</p>
                <p style="margin: 0 0 18px 0; color: #334155;">
                    Kabar gembira! Permintaan pendaftaran akun Anda di portal <strong>proASN</strong> telah diverifikasi dan disetujui oleh Tim Admin. Akun Anda kini resmi aktif dengan akses penuh selama <strong>1 Tahun (365 Hari)</strong>.
                </p>

                <!-- Membership Info Card -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 40%;">Nama Peserta:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">{{ $user->name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Alamat Email:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">{{ $user->email }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Tanggal Verifikasi:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0f172a;">{{ $verifiedAt }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Masa Berlaku Hingga:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #047857;">{{ $expiresAt }} (1 Tahun Penuh)</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Status Akses:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #047857;">AKTIF &amp; TERVERIFIKASI</td>
                    </tr>
                </table>

                <p style="margin: 20px 0 8px 0; font-weight: 700; color: #0f172a;">Fasilitas yang Dapat Anda Akses Sekarang:</p>
                <ul style="padding-left: 20px; margin: 0 0 24px 0; font-size: 13px; color: #334155; line-height: 1.7;">
                    <li>Simulasi CAT 4 Dimensi Profiling BKN (Tes Potensi, Mansoskul, Literasi Digital, Preferensi Karir).</li>
                    <li>Rapor Profiling Otomatis &amp; Pemetaan Matriks 9 Box SIMATA.</li>
                    <li>Kunci Jawaban dan Rasionalisasi Pembahasan Lengkap.</li>
                    <li>Bank Bahan Materi &amp; Kisi-kisi PermenPAN-RB.</li>
                </ul>

                <!-- Bulletproof CTA Button -->
                <div style="margin: 30px 0 16px 0; text-align: center;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: separate;">
                        <tr>
                            <td align="center" style="border-radius: 10px; background-color: #047857; text-align: center;">
                                <a href="{{ $dashboardUrl }}" target="_blank" rel="noopener noreferrer" style="background-color: #047857; border: 1px solid #047857; border-radius: 10px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 700; padding: 14px 32px; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; mso-padding-alt: 0;">
                                    <span style="color: #ffffff; text-decoration: none;">Masuk ke Dashboard Ujian &rarr;</span>
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Fallback Direct Links for All Email Clients -->
                <div style="margin: 20px 0; padding: 14px 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; line-height: 1.6;">
                    <p style="margin: 0 0 6px 0;">Jika tombol di atas tidak dapat diklik di aplikasi email Anda, klik atau salin tautan langsung di bawah ini:</p>
                    <a href="{{ $dashboardUrl }}" target="_blank" rel="noopener noreferrer" style="color: #047857; font-weight: 600; text-decoration: underline; word-break: break-all;">{{ $dashboardUrl }}</a>
                    <div style="margin-top: 8px; font-size: 11px; color: #94a3b8;">
                        Atau masuk melalui halaman login: <a href="{{ $loginUrl }}" target="_blank" rel="noopener noreferrer" style="color: #047857; font-weight: 600; text-decoration: underline;">{{ $loginUrl }}</a>
                    </div>
                </div>

                <!-- Promotion: proASN by Ketik.in -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px; padding: 18px; background-color: #eff6ff; border: 1px dashed #93c5fd; border-radius: 12px; text-align: center;">
                    <tr>
                        <td>
                            <h3 style="margin: 0 0 6px 0; font-size: 13px; color: #1e40af; font-weight: 700;">💡 Diberdayakan oleh Ketik.in</h3>
                            <p style="margin: 0; font-size: 12px; color: #2563eb; line-height: 1.5;">
                                <strong>proASN</strong> adalah bagian dari ekosistem <strong>Ketik.in</strong> — platform asisten AI penulisan naskah dinas, administrasi kepegawaian, dan produktivitas ASN nomor 1 di Indonesia.
                            </p>
                            <div style="margin-top: 10px;">
                                <a href="https://ketik.in" target="_blank" rel="noopener noreferrer" style="color: #1d4ed8; font-weight: 700; font-size: 12px; text-decoration: underline;">
                                    Kunjungi Ketik.in &rarr;
                                </a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                <p style="margin: 0;">&copy; {{ date('Y') }} proASN by Ketik.in. Seluruh hak cipta dilindungi undang-undang.</p>
                <p style="margin: 4px 0 0 0;">Email ini dikirim otomatis sebagai konfirmasi aktivasi akun resmi Anda.</p>
            </td>
        </tr>
    </table>
</body>
</html>
