<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobOfferRequest;
use App\Http\Requests\UpdateJobOfferRequest;
use App\Http\Resources\JobOfferResource;
use App\Models\JobOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobOfferController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->integer('per_page', 10);
        $page = max(1, (int) $request->integer('page', 1));
        $perPage = min(max($perPage, 1), 50);
        $sortBy = $request->string('sort_by', 'created_at')->toString();
        $sortDir = strtolower($request->string('sort_dir', 'desc')->toString()) === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['created_at', 'updated_at', 'title', 'company', 'status'];
        if (! in_array($sortBy, $allowedSorts, true)) {
            $sortBy = 'created_at';
        }

        $query = JobOffer::query();

        if ($request->filled('q')) {
            $search = $request->string('q')->toString();
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->toString());
        }

        if ($request->filled('type')) {
            $query->where('employment_type', $request->string('type')->toString());
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->toString());
        }

        $query->orderBy($sortBy, $sortDir);

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => JobOfferResource::collection($paginator->items()),
            'meta' => [
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    public function store(StoreJobOfferRequest $request): JsonResponse
    {
        $payload = $request->validated();
        $slug = Str::slug($payload['title']);

        if (JobOffer::query()->where('slug', $slug)->exists()) {
            $slug = "{$slug}-".Str::lower(Str::random(5));
        }

        $offer = JobOffer::query()->create([
            'slug' => $slug,
            'title' => $payload['title'],
            'company' => $payload['company'],
            'location' => $payload['location'],
            'remote' => (bool) ($payload['remote'] ?? false),
            'category' => $payload['category'],
            'level' => $payload['level'] ?? null,
            'salary' => $payload['salary'] ?? null,
            'employment_type' => $payload['type'],
            'status' => $payload['status'] ?? 'draft',
            'description' => $payload['description'],
            'hero_image_url' => $payload['heroImageUrl'] ?? null,
            'media_urls' => $payload['mediaUrls'] ?? [],
            'responsibilities' => $payload['responsibilities'],
            'requirements' => $payload['requirements'],
            'benefits' => $payload['benefits'] ?? [],
            'tags' => $payload['tags'] ?? [],
            'posted_at' => ($payload['status'] ?? 'draft') === 'published' ? now() : null,
        ]);

        return (new JobOfferResource($offer))
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $slug): JsonResponse
    {
        $offer = JobOffer::query()->where('slug', $slug)->firstOrFail();

        return (new JobOfferResource($offer))->response();
    }

    public function update(UpdateJobOfferRequest $request, string $slug): JsonResponse
    {
        $offer = JobOffer::query()->where('slug', $slug)->firstOrFail();
        $payload = $request->validated();

        if (array_key_exists('title', $payload) && $payload['title'] !== $offer->title) {
            $nextSlug = Str::slug($payload['title']);

            if (JobOffer::query()->where('slug', $nextSlug)->where('id', '!=', $offer->id)->exists()) {
                $nextSlug = "{$nextSlug}-".Str::lower(Str::random(5));
            }

            $offer->slug = $nextSlug;
        }

        $offer->fill([
            'title' => $payload['title'] ?? $offer->title,
            'company' => $payload['company'] ?? $offer->company,
            'location' => $payload['location'] ?? $offer->location,
            'remote' => $payload['remote'] ?? $offer->remote,
            'category' => $payload['category'] ?? $offer->category,
            'level' => $payload['level'] ?? $offer->level,
            'salary' => $payload['salary'] ?? $offer->salary,
            'employment_type' => $payload['type'] ?? $offer->employment_type,
            'status' => $payload['status'] ?? $offer->status,
            'description' => $payload['description'] ?? $offer->description,
            'hero_image_url' => array_key_exists('heroImageUrl', $payload)
                ? $payload['heroImageUrl']
                : $offer->hero_image_url,
            'media_urls' => $payload['mediaUrls'] ?? $offer->media_urls,
            'responsibilities' => $payload['responsibilities'] ?? $offer->responsibilities,
            'requirements' => $payload['requirements'] ?? $offer->requirements,
            'benefits' => $payload['benefits'] ?? $offer->benefits,
            'tags' => $payload['tags'] ?? $offer->tags,
        ]);

        if (($payload['status'] ?? $offer->status) === 'published' && ! $offer->posted_at) {
            $offer->posted_at = now();
        }

        $offer->save();

        return (new JobOfferResource($offer))->response();
    }

    public function destroy(string $slug): JsonResponse
    {
        $offer = JobOffer::query()->where('slug', $slug)->firstOrFail();
        $offer->update(['status' => 'archived']);

        return response()->json([
            'message' => 'Offer archived successfully.',
            'data' => new JobOfferResource($offer),
        ]);
    }
}
