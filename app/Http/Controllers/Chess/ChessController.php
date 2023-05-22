<?php

namespace App\Http\Controllers\Chess;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ChessController extends Controller
{
    public function index(): View
    {
        return view('chess.index');
    }


    public function getBoard(): JsonResponse
    {
        return Response::json('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    }
}
