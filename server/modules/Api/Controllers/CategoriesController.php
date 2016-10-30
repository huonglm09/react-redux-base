<?php

namespace Api\Controllers;

use Auth;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Api\Facades\MainFacade;

class CategoriesController extends Controller {

    public function __construct() {

    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function all() {
        $data = [
          ['title' => 'Life Hacks'],
          ['title' => 'Saving Money'],
          ['title' => 'Making & Doing'],
          ['title' => 'Home & Garden'],
          ['title' => 'Health & Wellbeing']
        ];

        return response()->json([
          'status' => true,
          'msg' => 'List categories',
          'data' => $data
        ]);
    }
}
