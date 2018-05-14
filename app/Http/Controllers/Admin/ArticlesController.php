<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use App\Services\CategoryService;
use App\Http\Requests\StoreArticleRequest;
use App\Events\ArticlePublished;

class ArticlesController extends Controller {

    private $articleService;
    private $categoryService;

    public function __construct(ArticleService $articleService, CategoryService $categoryService) {
        $this->articleService = $articleService;
        $this->categoryService = $categoryService;
    }

    public function index() {
        $articles = $this->articleService->getAllForAdmin();
        $categories = $this->categoryService->getAll();

        return response()->json(array(
                    'articles' => $articles,
                    'categories' => $categories)
        );
    }

    public function store(StoreArticleRequest $request) {
        $validated = $request->validated();
        
        event(new ArticlePublished($validated));

        return response()->json($this->articleService->add($validated));
    }

//    public function sendLogInfo($validated) {
//        Log::info('validated', ['validated' => $validated]);
//    }

    public function update($id, StoreArticleRequest $request) {
        $validated = $request->validated();

        return response()->json($this->articleService->update($validated, $id));
    }

    public function delete($id) {
        return response()->json($this->articleService->delete($id));
    }

}
