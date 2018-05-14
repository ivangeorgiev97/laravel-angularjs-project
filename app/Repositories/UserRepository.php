<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository {

    protected $model;

    public function __construct(User $model) {
        $this->model = $model;
    }
    
    public function getByEmail($email) {
        
    }
    
    public function checkPassword($password) {
        
    }

}
