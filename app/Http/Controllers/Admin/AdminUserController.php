<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AccountVerifiedMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $status = $request->query('status', 'all');

        $query = User::where('role', 'user')->withCount('tryoutSessions');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('lynk_order_id', 'like', "%{$search}%");
            });
        }

        if ($status === 'active') {
            $query->where('is_active', true)->where('verification_status', 'verified');
        } elseif ($status === 'pending') {
            $query->where(function ($q) {
                $q->where('is_active', false)->orWhere('verification_status', 'pending');
            });
        } elseif ($status === 'expired') {
            $query->whereNotNull('expires_at')->where('expires_at', '<', now());
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        // Transform collection to include helper attributes
        $users->getCollection()->transform(function ($u) {
            $u->is_verified = $u->isVerified();
            $u->is_expired = $u->isExpired();
            $u->remaining_days = $u->remaining_days;
            $u->verified_at_formatted = $u->verified_at ? $u->verified_at->translatedFormat('d M Y, H:i') : null;
            $u->expires_at_formatted = $u->expires_at ? $u->expires_at->translatedFormat('d M Y') : null;
            return $u;
        });

        $stats = [
            'total' => User::where('role', 'user')->count(),
            'active' => User::where('role', 'user')->where('is_active', true)->where('verification_status', 'verified')->count(),
            'pending' => User::where('role', 'user')->where(function ($q) {
                $q->where('is_active', false)->orWhere('verification_status', 'pending');
            })->count(),
            'expired' => User::where('role', 'user')->whereNotNull('expires_at')->where('expires_at', '<', now())->count(),
        ];

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Verify user account and activate 1-year full subscription.
     */
    public function verify(Request $request, User $user): RedirectResponse
    {
        $now = now();
        $user->update([
            'is_active' => true,
            'verification_status' => 'verified',
            'verified_at' => $now,
            'expires_at' => $now->copy()->addYear(),
            'email_verified_at' => $now,
        ]);

        // Attempt sending automated "proASN by Ketik.in" welcome & confirmation email
        try {
            Mail::to($user->email)->send(new AccountVerifiedMail($user));
        } catch (\Throwable $e) {
            Log::error("Gagal mengirim email verifikasi ke {$user->email}: " . $e->getMessage());
        }

        $expiresFormatted = $user->expires_at->translatedFormat('d F Y');
        return back()->with('success', "Akun {$user->name} berhasil diverifikasi! Hak akses aktif selama 1 tahun penuh hingga {$expiresFormatted}. Email konfirmasi telah dikirim.");
    }

    /**
     * Extend user subscription by 1 year.
     */
    public function extend(Request $request, User $user): RedirectResponse
    {
        $base = ($user->expires_at && $user->expires_at->isFuture()) ? $user->expires_at : now();
        $newExpires = $base->copy()->addYear();

        $user->update([
            'is_active' => true,
            'verification_status' => 'verified',
            'expires_at' => $newExpires,
        ]);

        return back()->with('success', "Masa aktif akun {$user->name} berhasil diperpanjang 1 tahun hingga " . $newExpires->translatedFormat('d F Y') . ".");
    }

    public function toggleStatus(User $user): RedirectResponse
    {
        $newActive = !$user->is_active;
        $updates = ['is_active' => $newActive];

        if ($newActive && !$user->verified_at) {
            $now = now();
            $updates['verification_status'] = 'verified';
            $updates['verified_at'] = $now;
            $updates['expires_at'] = $now->copy()->addYear();
        }

        $user->update($updates);

        $statusText = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', "Akses akun {$user->name} berhasil {$statusText}.");
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'phone' => ['nullable', 'string', 'max:30'],
            'lynk_order_id' => ['nullable', 'string', 'max:100'],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['boolean'],
        ]);

        $now = now();
        $isActive = (bool) ($validated['is_active'] ?? true);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'lynk_order_id' => $validated['lynk_order_id'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => 'user',
            'is_active' => $isActive,
            'verification_status' => $isActive ? 'verified' : 'pending',
            'verified_at' => $isActive ? $now : null,
            'expires_at' => $isActive ? $now->copy()->addYear() : null,
        ]);

        if ($isActive) {
            try {
                Mail::to($user->email)->send(new AccountVerifiedMail($user));
            } catch (\Throwable $e) {
                Log::error("Gagal mengirim email aktivasi manual ke {$user->email}: " . $e->getMessage());
            }
        }

        return back()->with('success', "Pengguna {$validated['name']} berhasil ditambahkan.");
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->isAdmin()) {
            return back()->with('error', 'Akun administrator tidak dapat dihapus.');
        }

        $userName = $user->name;
        $user->delete();

        return back()->with('success', "Akun {$userName} berhasil dihapus.");
    }
}
