<?php

namespace Api\Controllers;

use Auth;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Api\Facades\MainFacade;
use Api\Models\Categories;

class CategoriesController extends Controller {

    public function __construct() {

    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function all() {
        $data = Categories::where('status', '1')->orderBy('order', 'ASC')->get();

        return response()->json([
          'status' => true,
          'msg' => 'List categories',
          'data' => $data
        ]);
    }
}
