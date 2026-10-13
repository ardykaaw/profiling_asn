<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TryoutSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'twk_score',
        'tiu_score',
        'tkp_score',
        'total_score',
        'is_passed',
        'answers',
        'time_spent_seconds',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'answers' => 'array',
            'is_passed' => 'boolean',
            'completed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
