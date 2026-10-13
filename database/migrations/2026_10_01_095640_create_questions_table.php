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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('sub_category'); // e.g. Pilar Negara (Pancasila), Silogisme, Integritas
            $table->longText('question');
            $table->string('image_path')->nullable();
            $table->json('options'); // ['opsi A', 'opsi B', 'opsi C', 'opsi D', 'opsi E']
            $table->integer('correct_answer')->default(0); // 0 = A, 1 = B, 2 = C, 3 = D, 4 = E
            $table->json('scores')->nullable(); // [5, 4, 3, 2, 1] khusus untuk TKP
            $table->longText('explanation')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
