<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Tymon\JWTAuth\Facades\JWTAuth;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

//Route::get('csrf', function(Request $request) {
//    return $request->session()->token();
//});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getIndexResources', 'HomeController@getIndexResources');

// Articles
Route::get('/article/{id}', 'ArticleController@show')->name('articles.show');
Route::get('/article/byCategory/{categoryId}', 'ArticleController@getByCategory')->name('articles.getByCategory');

// Users (guest only)
Route::group(['middleware' => 'guest'], function() {
    //  Route::post('login', 'Auth\LoginController@Login');
    Route::get('/login', 'Auth\LoginController@index')->name('login.show');
    Route::get('/register', 'Auth\RegisterController@index');
    Route::post('register', 'Auth\RegisterController@registerUser')->name('registerUser');
});
//Users
Route::group([
    //  'middleware' => 'api',
    'prefix' => 'auth'
        ], function ($router) {

    Route::post('login', 'AuthenticateController@authenticate')->name('login');
    Route::get('logout', 'AuthController@logout');
    Route::get('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::get('users', 'AuthController@index');
});
Route::get('me', 'AuthenticateController@getAuthenticatedUser');
Route::get('logout', 'AuthController@logout');


Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
Route::post('authenticate', 'AuthenticateController@authenticate');
Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');



Route::get('/restricted', [
    'before' => 'jwt-auth',
    function () {
        $user = auth()->user();

        return Response::json([
                    'data' => [
                        'email' => $user->email,
                        'registered_at' => $user->created_at->toDateTimeString()
                    ]
        ]);
    }
]);

Route::post('/signin', function () {
    $credentials = Input::only('email', 'password');

    if (!$token = JWTAuth::attempt($credentials)) {
        return Response::json(false, HttpResponse::HTTP_UNAUTHORIZED);
    }

    return Response::json(compact('token'));
});


Route::post('/contact/send', 'ContactController@sendEmail')->name('contact.send');


// AdminCP
Route::group(['middleware' => ['checkIfAdmin', 'jwt.auth'], 'prefix' => 'admincp'], function() { // 'checkCSRFToken' , 'web'
    Route::get('/', 'Admin\AdminCpController@index')->name('admincp.show');

    Route::get('/categories', 'Admin\CategoriesController@index')->name('admincp.categories.show');
    Route::post('/categories/store', 'Admin\CategoriesController@store')->name('admincp.categories.store');
    Route::put('/categories/update', 'Admin\CategoriesController@update')->name('admincp.categories.update');
    Route::delete('/categories/delete/{id}', 'Admin\CategoriesController@delete')->name('admincp.categories.delete');

    Route::get('/articles', 'Admin\ArticlesController@index')->name('admincp.articles.show');
    Route::post('/articles/store', 'Admin\ArticlesController@store')->name('admincp.articles.store');
    Route::put('/articles/update/{id}', 'Admin\ArticlesController@update')->name('admincp.articles.update');
    Route::delete('/articles/delete/{id}', 'Admin\ArticlesController@delete')->name('admincp.articles.delete');
});
