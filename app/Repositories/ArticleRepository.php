<?php

namespace App\Repositories;

use App\Models\Article;
use Illuminate\Support\Facades\DB;

class ArticleRepository extends BaseRepository {

    protected $model;

    public function __construct(Article $model) {
        $this->model = $model;
    }

    public function getAllForAdmin() {
        return DB::table('articles')
                        ->join('categories', 'articles.category_id', '=', 'categories.id')
                        ->join('users', 'users.id', '=', 'articles.user_id')
                        ->select('articles.*', 'users.name as uName', 'categories.category_name as cName')
                        ->get();
    }

    public function getByIdA($id) {
        return DB::table('articles')
                        ->join('categories', 'articles.category_id', '=', 'categories.id')
                        ->join('users', 'users.id', '=', 'articles.user_id')
                        ->select('articles.*', 'users.name as uName', 'categories.category_name as cName')
                        ->where('articles.id', '=', $id)->first();
    }

    public function getByCategoryId($categoryId) {
        return DB::table('articles')
                        ->join('categories', 'articles.category_id', '=', 'categories.id')
                        ->join('users', 'users.id', '=', 'articles.user_id')
                        ->select('articles.*', 'users.name as uName', 'categories.category_name as cName')
                        ->where('articles.category_id', '=', $categoryId)->get();
    }

//    public function update($resource) {
//        return response()->json($resource->save());
//    }
//
//    public function delete($resource) {
//        return response()->json($resource->delete());
//    }

}
