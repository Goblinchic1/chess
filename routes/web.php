<?php

use App\Http\Controllers\Chess\ChessController;
use Illuminate\Support\Facades\Route;


Route::controller(ChessController::class)->group(function () {
    Route::get('/', 'index');
});
