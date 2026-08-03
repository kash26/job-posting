<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'company' => ['required', 'string', 'max:180'],
            'location' => ['required', 'string', 'max:180'],
            'remote' => ['sometimes', 'boolean'],
            'category' => ['required', 'string', 'max:80'],
            'level' => ['nullable', 'string', 'max:80'],
            'salary' => ['nullable', 'string', 'max:120'],
            'type' => ['required', 'string', 'max:80'],
            'status' => ['sometimes', 'in:draft,published,archived'],
            'description' => ['required', 'string'],
            'heroImageUrl' => ['nullable', 'url', 'max:2048'],
            'mediaUrls' => ['sometimes', 'array'],
            'mediaUrls.*' => ['required', 'url', 'max:2048'],
            'responsibilities' => ['required', 'array', 'min:1'],
            'responsibilities.*' => ['required', 'string'],
            'requirements' => ['required', 'array', 'min:1'],
            'requirements.*' => ['required', 'string'],
            'benefits' => ['sometimes', 'array'],
            'benefits.*' => ['required', 'string'],
            'tags' => ['sometimes', 'array'],
            'tags.*' => ['required', 'string'],
        ];
    }
}
