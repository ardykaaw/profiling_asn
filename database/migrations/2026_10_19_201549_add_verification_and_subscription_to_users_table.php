<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('verification_status')->default('pending')->after('is_active');
            $table->timestamp('verified_at')->nullable()->after('verification_status');
            $table->timestamp('expires_at')->nullable()->after('verified_at');
        });

        // Backfill existing users
        foreach (User::all() as $user) {
            if ($user->role === 'admin') {
                $user->update([
                    'is_active' => true,
                    'verification_status' => 'verified',
                    'verified_at' => $user->created_at ?? now(),
                    'expires_at' => null, // Admin never expires
                ]);
            } else {
                $verifiedAt = $user->created_at ?? now();
                $user->update([
                    'is_active' => (bool) $user->is_active,
                    'verification_status' => $user->is_active ? 'verified' : 'pending',
                    'verified_at' => $user->is_active ? $verifiedAt : null,
                    'expires_at' => $user->is_active ? $verifiedAt->copy()->addYear() : null,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['verification_status', 'verified_at', 'expires_at']);
        });
    }
};
