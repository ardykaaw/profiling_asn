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
            $table->string('title')->default('Simulasi SKD Resmi BKN');
            $table->integer('twk_score')->default(0);
            $table->integer('tiu_score')->default(0);
            $table->integer('tkp_score')->default(0);
            $table->integer('total_score')->default(0);
            $table->boolean('is_passed')->default(false);
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
