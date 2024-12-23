<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;


Route::get('/messages', [ChatController::class, 'getMessages']);
Route::post('/send-message', [ChatController::class, 'sendMessage']);
