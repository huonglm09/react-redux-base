<?php

namespace Api\Controllers;

use Auth;
use Illuminate\Routing\Controller;
use Route as Route;

class BaseController extends Controller {

    //============= variable ==============
    protected $moduleName = 'Api';
    protected $perPage = 20;
    protected $requireDataForm = array();
    protected $checkAuth;
    protected $user;
    protected $role;

    public function __construct() {
        if (!Auth::check()) {
            return response()->json(['status' => false, 'msg' => 'Đăng nhập tài khoản để sử dụng tính năng này']);
        } else {
            $this->checkAuth = Auth::user();
            $this->user = $this->checkAuth;
            $this->role = $this->user->role->name;
        }
    }
}
