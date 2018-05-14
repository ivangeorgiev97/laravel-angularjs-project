<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Response;

class CheckCSRFToken {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        if ($request->session()->token() != $request->header('X-Csrf-Token')) {
            return response()->json('CSRF does not match', 400);
        }

        return $next($request);
    }

}
