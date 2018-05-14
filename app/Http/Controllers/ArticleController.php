<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\Comment;
use App\Services\ArticleService;

class ArticleController extends Controller {
    
    private $articleService;

    public function __construct(ArticleService $articleService) {
        $this->articleService = $articleService;
    }

    public function show($id) {
        $article = $this->articleService->getById($id);

        /* $comments = Comment::join('users', 'users.id', '=', 'comments.user_id')
          ->where('comments.post_id', '=', $id)
          ->select('comments.*', 'users.name as uName')->get();

          if (empty($comments)) {
          return redirect()->route('index');
          } */

        return response()->json(array(
                    // 'comments' => $comments,
                    'article' => $article
        ));
    }
    
    public function getByCategory($categoryId) {
        $articles = $this->articleService->getByCategoryId($categoryId);
        
        return response()->json(array( 
            'articles' => $articles
        ));
    }

}
