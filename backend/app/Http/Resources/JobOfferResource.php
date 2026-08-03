<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\JobOffer */
class JobOfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'company' => $this->company,
            'location' => $this->location,
            'remote' => $this->remote,
            'category' => $this->category,
            'level' => $this->level,
            'salary' => $this->salary,
            'type' => $this->employment_type,
            'status' => $this->status,
            'description' => $this->description,
            'heroImageUrl' => $this->hero_image_url,
            'mediaUrls' => $this->media_urls ?? [],
            'responsibilities' => $this->responsibilities ?? [],
            'requirements' => $this->requirements ?? [],
            'benefits' => $this->benefits ?? [],
            'tags' => $this->tags ?? [],
            'postedAt' => $this->posted_at?->toIso8601String(),
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
        ];
    }
}
