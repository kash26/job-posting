<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobOfferRequest extends FormRequest
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
            'title' => ['sometimes', 'required', 'string', 'max:180'],
            'company' => ['sometimes', 'required', 'string', 'max:180'],
            'location' => ['sometimes', 'required', 'string', 'max:180'],
            'remote' => ['sometimes', 'boolean'],
            'category' => ['sometimes', 'required', 'string', 'max:80'],
            'level' => ['nullable', 'string', 'max:80'],
            'salary' => ['nullable', 'string', 'max:120'],
            'type' => ['sometimes', 'required', 'string', 'max:80'],
            'status' => ['sometimes', 'in:draft,published,archived'],
            'description' => ['sometimes', 'required', 'string'],
            'heroImageUrl' => ['nullable', 'url', 'max:2048'],
            'mediaUrls' => ['sometimes', 'array'],
            'mediaUrls.*' => ['required', 'url', 'max:2048'],
            'responsibilities' => ['sometimes', 'required', 'array', 'min:1'],
            'responsibilities.*' => ['required', 'string'],
            'requirements' => ['sometimes', 'required', 'array', 'min:1'],
            'requirements.*' => ['required', 'string'],
            'benefits' => ['sometimes', 'array'],
            'benefits.*' => ['required', 'string'],
            'tags' => ['sometimes', 'array'],
            'tags.*' => ['required', 'string'],
        ];
    }
}
