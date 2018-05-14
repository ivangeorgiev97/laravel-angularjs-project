<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use App\Http\Requests\StoreArticleRequest;
use Illuminate\Support\Facades\Auth;

class ArticleService implements IService {

    private $articleRepository;

//    private $userId;

    public function __construct(ArticleRepository $articleRepository) {
        $this->articleRepository = $articleRepository;
    }

    public function getAll() {
        return $this->articleRepository->getAll();
    }

    public function getAllForAdmin() {
        return $this->articleRepository->getAllForAdmin();
    }

    public function getById($id) {
        $article = $this->articleRepository->getByIdA($id);

        if (empty($article))
            return redirect()->route('index');
        else
            return $article;
    }

    public function getByCategoryId($categoryId) {
        $articles = $this->articleRepository->getByCategoryId($categoryId);

        if (empty($articles))
            return redirect()->route('index');
        else
            return $articles;
    }

    public function add($request) {
        $title = $request['title'];
        $content = $request['content'];
        // $article_image = $request['aritcle_image'];
        $category_id = $request['category_id'];

        $user = Auth::user();

        if ($user['isAdmin'] === 1) {
            $userId = Auth::id();
        } else {
            return response()->json(['message' => 'Nice try']);
        }


        $article = ['title' => $title, 'content' => $content, 'category_id' => $category_id, 'user_id' => $userId];

        return response()->json($this->articleRepository->add($article));
    }

    public function update($request, $id) {
        if (empty($id)) {
            $errorDescription = "Empty";

            return response()->json(array('errorDescription' => $errorDescription));
        }

        $article = $this->articleRepository->getById($id);

        $article->title = $request['title'];
        $article->content = $request['content'];
        // $article->article_image = $request['aritcle_image'];
        $article->category_id = $request['category_id'];

        $user = Auth::user();

        if ($user['isAdmin'] === 1) {
            $userId = Auth::id();
        } else {
            return response()->json(['message' => 'Nice try']);
        }

        $article->user_id = $userId;


        return response()->json($this->articleRepository->update($article));
    }

    public function delete($id) {
        if (empty($id)) {
            $errorDescription = "Empty";

            return response()->json(array('errorDescription' => $errorDescription));
        }

        $user = Auth::user();

        if ($user['isAdmin'] === 1) {
            $userId = Auth::id();
        } else {
            return response()->json(['message' => 'Nice try']);
        }

        $article = $this->articleRepository->getById($id);

        return response()->json($this->articleRepository->delete($article));
    }

}
