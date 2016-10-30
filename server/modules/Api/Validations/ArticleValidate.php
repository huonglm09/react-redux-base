<?php

namespace Api\Validations;

use Validator;

class ArticleValidate {
    public function validatorCreate(array $data) {
        return Validator::make($data, [
            'title' => 'required|min:6|unique:articles',   
            'order' => 'required|integer'   
        ]);
    }
    
    public function validatorUpdate(array $data) {
        return Validator::make($data, [                    
            'title' => 'required|min:6|unique:articles,title,'.$data['id'],  
            'order' => 'required|integer'
        ]);
    }
}
