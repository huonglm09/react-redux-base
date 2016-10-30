<?php

namespace Api\Controllers;

use Illuminate\Routing\Controller;

class ErrorsController extends Controller {
    
    public function __construct() {  
        
    }
    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function crsfToken() {        
        return view('Api::layouts.errors.crsf', array('crsfToken' => 'Token is not null'));
    }   

}
