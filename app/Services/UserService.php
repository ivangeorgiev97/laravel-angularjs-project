<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService implements IService {

    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function add($request) {
        $email = $request['email'];
        $name = $request['name'];
        $password = $request['password'];
        $isAdmin = $request['isAdmin'];
        
        $user = ['email' => $email, 'name' => $name, 'password' => $password, 'isAdmin' => $isAdmin];

        return response()->json($this->userRepository->add($user));
    }

    public function getAll() {
        
    }

    public function getById($id) {
        
    }

}
