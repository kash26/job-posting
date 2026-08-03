<?php

use App\Http\Controllers\Api\JobOfferController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/job-offers', [JobOfferController::class, 'index']);
    Route::get('/job-offers/{slug}', [JobOfferController::class, 'show']);

    Route::middleware('role.admin_or_recruiter')->group(function (): void {
        Route::post('/job-offers', [JobOfferController::class, 'store']);
        Route::put('/job-offers/{slug}', [JobOfferController::class, 'update']);
        Route::patch('/job-offers/{slug}', [JobOfferController::class, 'update']);
        Route::delete('/job-offers/{slug}', [JobOfferController::class, 'destroy']);
    });
});
