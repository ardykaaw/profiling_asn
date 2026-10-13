<?php

use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminMaterialController;
use App\Http\Controllers\Admin\AdminQuestionController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\TryoutController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Member Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('tryout', [TryoutController::class, 'index'])->name('tryout');
    Route::post('tryout', [TryoutController::class, 'store'])->name('tryout.store');
    Route::get('materi', [MateriController::class, 'index'])->name('materi');
    Route::inertia('paket', 'paket')->name('paket');
});

// Administrator Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Questions Management
    Route::get('soal', [AdminQuestionController::class, 'index'])->name('questions.index');
    Route::post('soal', [AdminQuestionController::class, 'store'])->name('questions.store');
    Route::put('soal/{question}', [AdminQuestionController::class, 'update'])->name('questions.update');
    Route::delete('soal/{question}', [AdminQuestionController::class, 'destroy'])->name('questions.destroy');
    Route::post('soal/import', [AdminQuestionController::class, 'import'])->name('questions.import');

    // Materials Management
    Route::get('materi', [AdminMaterialController::class, 'index'])->name('materials.index');
    Route::post('materi', [AdminMaterialController::class, 'store'])->name('materials.store');
    Route::put('materi/{material}', [AdminMaterialController::class, 'update'])->name('materials.update');
    Route::delete('materi/{material}', [AdminMaterialController::class, 'destroy'])->name('materials.destroy');

    // Categories Management
    Route::get('kategori', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::put('kategori/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');

    // User Verification & Management (Lynk.id)
    Route::get('users', [AdminUserController::class, 'index'])->name('users.index');
    Route::post('users', [AdminUserController::class, 'store'])->name('users.store');
    Route::post('users/{user}/toggle-status', [AdminUserController::class, 'toggleStatus'])->name('users.toggle-status');
    Route::delete('users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
