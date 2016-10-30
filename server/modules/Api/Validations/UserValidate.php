<?php

namespace Api\Validations;

use Validator;

class UserValidate {

    public function validatorCreate(array $data) {
        return Validator::make($data, [
                    'email' => 'required|email|max:255|unique:users',
                    'username' => 'required|min:4|max:255|unique:users',
                    'password' => 'required|min:6|max:255',
                    'password_confirmation' => 'required|same:password',
                    'telephone' => 'required|min:10|max:15',
        ]);
    }
    
    public function validatorUpdate(array $data) {
        return Validator::make($data, [                    
                    'email' => 'required|email|max:255|unique:users,email,'.$data['id'],
                    'username' => 'required|min:4|max:255|unique:users,username,'.$data['id'],
                    'password' => 'min:6|max:255',
                    'password_confirmation' => 'same:password',
                    'telephone' => 'required|min:10|max:15',
        ]);
    }

}
