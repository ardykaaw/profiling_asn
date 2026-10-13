<?php

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
        Schema::create('tryout_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title')->default('Simulasi Uji Asesmen & Profiling ASN');
            $table->integer('twk_score')->default(0); // Alias for compatibility
            $table->integer('tiu_score')->default(0); // Alias for compatibility
            $table->integer('tkp_score')->default(0); // Alias for compatibility
            $table->integer('total_score')->default(0);
            $table->json('category_scores')->nullable(); // detailed scores per category {POTENSI: 85, MANAJERIAL: 90, ...}
            $table->json('competency_levels')->nullable(); // level analysis
            $table->string('talent_quadrant')->default('Memenuhi Syarat (Optimum)'); // Box 9 talent pool
            $table->boolean('is_passed')->default(true);
            $table->json('answers')->nullable(); // user selected answers
            $table->integer('time_spent_seconds')->default(0);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tryout_sessions');
    }
};
