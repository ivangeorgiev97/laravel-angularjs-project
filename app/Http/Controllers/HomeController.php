<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use App\Services\CategoryService;
use App\Services\ArticleService;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Models\User;

class HomeController extends Controller {

    private $categoryService;
    private $articleService;
    private $isUserLogged;
    private $isUserAdmin;

    public function __construct(CategoryService $categoryService, ArticleService $articleService) {
        $this->categoryService = $categoryService;
        $this->articleService = $articleService;
        $this->isUserLogged = false;
        $this->isUserAdmin = false;
    }

    public function getIndex() {
        try {
            if (!$token = JWTAuth::parseToken()) {
                //throw an exception
            } else {
                $user = JWTAuth::toUser($token);
                $this->isUserLogged = true;
                if ($user->isAdmin === 1)
                    $this->isUserAdmin = true;
            }
            
        } catch (TokenExpiredException $e) {

            response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {

            response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {

            response()->json(['token_absent'], $e->getStatusCode());
        }

//        try {
//            if (!$token = JWTAuth::parseToken()) {
//                //throw an exception
//            } else {
//                $user = JWTAuth::toUser($token);
//                $this->isUserLogged = true;
//                if ($user->isAdmin === 1)
//                    $this->isUserAdmin = true;
//            }
//        } catch (Exception $e) {
//            if ($e instanceof TokenInvalidException) {
//                //throw an exception
//            } else if ($e instanceof TokenExpiredException) {
//                //throw an exception
//            } else if ($e instanceof JWTException) {
//                //throw an exception
//            } else {
//                //throw an exception
//            }
//        }


        return View::make('index')
                        ->with('isUserLogged', $this->isUserLogged)
                        ->with('isUserAdmin', $this->isUserAdmin);
    }

    public function getIndexResources() {
        $categories = $this->categoryService->getAll();

        $articles = $this->articleService->getAll();

        return response()->json(array(
                    'categories' => $categories,
                    'articles' => $articles
        ));
    }

}
