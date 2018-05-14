<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AdminCpController extends Controller {

    public function index() {
        $links = array('categories', 'articles');

        return response()->json(array(
                    'links' => $links,
        )); 
    }

}
