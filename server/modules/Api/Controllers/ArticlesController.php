<?php

namespace Api\Controllers;

use Api\Controllers\BaseController;
use Api\Models\Categories;
use Api\Models\Articles;
use Api\Validations\ArticleValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class ArticlesController extends BaseController {

    protected $model;

    public function __construct() {
        parent::__construct();

        $this->model = new Articles();
    }

    public function getByCategory($slug) {
        if(!empty($slug)) {
            $category = Categories::where('slug', $slug)->first();
        }

        $data = [];

        if(!empty($category)) {
            $data = Articles::where('status', '1')->where('category_id', $category->id)->orderBy('order', 'ASC')->get();
        }

        return response()->json([
          'status' => true,
          'msg' => 'List article by category',
          'data' => $data
        ]);
    }

    public function getFeatureByCategory($slug) {
        if(!empty($slug)) {
            $category = Categories::where('slug', $slug)->first();
        }

        $data = [];

        if(!empty($category)) {
            $data = Articles::where('status', '1')->where('feature', '1')->where('category_id', $category->id)->orderBy('order', 'ASC')->get();
        }

        return response()->json([
          'status' => true,
          'msg' => 'List article by category',
          'data' => $data
        ]);
    }
}
