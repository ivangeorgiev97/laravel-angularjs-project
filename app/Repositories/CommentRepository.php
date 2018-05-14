<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepository extends BaseRepository {
    
    protected $model;

    public function __construct(Comment $model) {
        $this->model = $model;
    }
    
}
