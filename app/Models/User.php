<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property string $role
 * @property string|null $phone
 * @property string|null $lynk_order_id
 * @property bool $is_active
 * @property string $verification_status
 * @property Carbon|null $verified_at
 * @property Carbon|null $expires_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name', 
    'email', 
    'password', 
    'role', 
    'phone', 
    'lynk_order_id', 
    'is_active', 
    'verification_status', 
    'verified_at', 
    'expires_at'
])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isActive(): bool
    {
        return (bool) ($this->is_active ?? true);
    }

    public function isVerified(): bool
    {
        if ($this->isAdmin()) {
            return true;
        }
        return (bool) $this->is_active && 
               $this->verification_status === 'verified' && 
               (!$this->expires_at || $this->expires_at->isFuture());
    }

    public function isExpired(): bool
    {
        if ($this->isAdmin()) {
            return false;
        }
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function getRemainingDaysAttribute(): ?int
    {
        if (!$this->expires_at) {
            return null;
        }
        return max(0, (int) now()->diffInDays($this->expires_at, false));
    }

    public function tryoutSessions()
    {
        return $this->hasMany(TryoutSession::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_active' => 'boolean',
            'verified_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }
}
