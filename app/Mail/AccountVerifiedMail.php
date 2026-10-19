<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AccountVerifiedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user
    ) {}

    public function envelope(): Envelope
    {
        $fromAddress = config('mail.from.address', 'no-reply@profilingasn.com');
        $fromName = config('mail.from.name', 'proASN by Ketik.in');
        
        return new Envelope(
            from: new Address($fromAddress, $fromName),
            subject: '🎉 Selamat! Akun proASN Anda Telah Aktif Selama 1 Tahun',
        );
    }

    public function content(): Content
    {
        $baseUrl = rtrim(config('app.url', 'https://profilingasn.com'), '/');

        return new Content(
            view: 'emails.account-verified',
            with: [
                'user' => $this->user,
                'verifiedAt' => $this->user->verified_at ? $this->user->verified_at->translatedFormat('d F Y') : now()->translatedFormat('d F Y'),
                'expiresAt' => $this->user->expires_at ? $this->user->expires_at->translatedFormat('d F Y') : now()->addYear()->translatedFormat('d F Y'),
                'loginUrl' => $baseUrl . '/login',
                'dashboardUrl' => $baseUrl . '/dashboard',
            ],
        );
    }
}
