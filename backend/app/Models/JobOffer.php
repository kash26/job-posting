<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'title',
        'company',
        'location',
        'remote',
        'category',
        'level',
        'salary',
        'employment_type',
        'status',
        'description',
        'hero_image_url',
        'media_urls',
        'responsibilities',
        'requirements',
        'benefits',
        'tags',
        'posted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'remote' => 'boolean',
        'responsibilities' => 'array',
        'requirements' => 'array',
        'benefits' => 'array',
        'tags' => 'array',
        'media_urls' => 'array',
        'posted_at' => 'datetime',
    ];
}
