<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'sub_category',
        'question',
        'image_path',
        'options',
        'correct_answer',
        'scores',
        'explanation',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'scores' => 'array',
            'correct_answer' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
