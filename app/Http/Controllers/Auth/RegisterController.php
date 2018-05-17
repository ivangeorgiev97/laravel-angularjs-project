<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\Requests\StoreUserRequest;
use App\Services\UserService;

class RegisterController extends Controller {

    private $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    public function index() {
        $links = array('auth');

        return response()->json(array(
                    'links' => $links,
        ));
    }

    public function registerUser(StoreUserRequest $request) {
        $validated = $request->validated();

        $user = new User();
        $user->email = $validated['email'];
        $user->password = bcrypt($validated['password']);
        $user->name = $validated['name'];
        $user->isAdmin = 0;

        return response()->json($this->userService->add($user));
    }

}
