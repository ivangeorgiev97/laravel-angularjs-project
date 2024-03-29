<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest {

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'email' => 'required|email|max:191|unique:users,email',
            'name' => 'required|max:255|min:2',
            'password' => 'required|min:4|max:32',
            'passwordConfirmed' => 'required|same:password'
        ];
    }

}
