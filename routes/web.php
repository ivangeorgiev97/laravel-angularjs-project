<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::filter('csrfInHeader', function($route, $request) {
//
//    if (Session::token() !== (string) $request->header('X-CSRF-TOKEN') ) {
//
//        throw new Illuminate\Session\TokenMismatchException;
//
//    }
//});
//Route::get('csrf', function() {
//    return Session::token();
//});


Route::get('/', 'HomeController@getIndex')->name('index');

//
//Route::filter('api.csrf', function($route, $request)
//{
//if (Session::token() != $request->header('X-Csrf-Token') )
//{
//    return Response::json('CSRF does not match', 400);
//}
//});
// AdminCP
Route::group(['middleware' => ['checkIfAdmin'], 'prefix'=>'admincp'], function() {
    Route::get('/', 'Admin\AdminCpController@index')->name('admincp.show');
});


//Route::get('/article/{id}', 'ArticleController@show')->name('articles.show');