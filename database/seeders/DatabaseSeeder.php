<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database for Profiling ASN.
     */
    public function run(): void
    {
        // 1. Clean Demo Users & Seed Official Admin Accounts
        User::whereIn('email', ['admin@example.com', 'user@example.com', 'dewi.lestari@example.com'])->delete();

        // Admin 1: Ardika
        User::updateOrCreate(
            ['email' => 'ardykaaw26@gmail.com'],
            [
                'name' => 'Ardika',
                'password' => bcrypt('ProfilingASN@123@2026'),
                'role' => 'admin',
                'phone' => '081234567890',
                'is_active' => true,
                'verification_status' => 'verified',
                'verified_at' => now(),
                'email_verified_at' => now(),
            ]
        );

        // Admin 2: Ibu Wa Ode Rahmatia, SP
        User::updateOrCreate(
            ['email' => 'waoderahmatia@gmail.com'],
            [
                'name' => 'Wa Ode Rahmatia, SP',
                'password' => bcrypt('ProfilingASN@123@2026'),
                'role' => 'admin',
                'phone' => '085394553435',
                'is_active' => true,
                'verification_status' => 'verified',
                'verified_at' => now(),
                'email_verified_at' => now(),
            ]
        );

        // 2. Call Full Official Profiling ASN Question & Material Seeders
        $this->call([
            ProfilingAsnSeeder::class,
            FiguralQuestionsSeeder::class,
            ReplaceNumerikQuestionsSeeder::class,
            ReplaceSubtest3And4Seeder::class,
            ReplaceSubtest5Seeder::class,
            CleanManajerialQuestionsSeeder::class,
            ReplaceKarirQuestionsAndMaterialsSeeder::class,
            RealMaterialsSeeder::class,
        ]);
    }
}
