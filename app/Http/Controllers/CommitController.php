<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Commit;

class CommitController extends Controller
{
    public function showCommits($page = 1, $per_page = 10)
    {
        return response()->json([
            'lists' => Commit::getCommits($page, $per_page)
        ]);
    }
}
