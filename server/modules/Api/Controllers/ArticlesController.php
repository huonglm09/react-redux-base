<?php

namespace Api\Controllers;

use Api\Controllers\BaseController;
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

    public function index(Request $request) {
        $title = 'Danh sách bài viết';
        
        $field = $request->get('field');
        $sort = $request->get('sort');

        $obj = $this->model;

        if (empty($field) && empty($sort)) {
            $obj = $obj->orderBy('order', 'asc')->orderBy('created_at', 'desc')->paginate($this->perPage);
        } else {            
            $obj = $obj->orderBy($field, $sort)->paginate($this->perPage);
        }

        $request->get('keyword') ? $keyword = $request->get('keyword') : 1 == 1;
        if (isset($keyword)) {
            $obj = $this->model->where(function ($query) use ($keyword) {
                        $query->where('title', 'like', '%' . $keyword . '%');
                    })
                    ->orderBy('order', 'asc')
                    ->orderBy('created_at', 'desc')
                    ->paginate($this->perPage);
        } else {
            $keyword = null;
        }               

        return view('Api::backend.articles.index', compact('obj', 'keyword', 'field', 'sort', 'title'));
    }

    public function create(Request $request) {
        $result = array('status' => false, 'title' => 'Thêm mới bài viết', 'action' => 'create', 'data' => '', 'url' => URL::action('\Api\Controllers\ArticlesController@create'), 'messages' => array('success' => '', 'errors' => ''));

        if ($request->isMethod('POST')) {
            $result = $this->doSave($request->all(), $result);

            if ($result['status'] !== false) {
                return redirect()->action('\Api\Controllers\ArticlesController@index');
            }
        }

        return view('Api::backend.articles.form', $result);
    }

    public function update($id, Request $request) {
        if (!$id) {
            return redirect()->action('\Api\Controllers\ArticlesController@index');
        }

        $obj = $this->model->find($id);
        if (!$obj) {
            return redirect()->action('\Api\Controllers\ArticlesController@index');
        }

        $result = array('status' => false, 'title' => 'Cập nhật bài viết', 'action' => 'update', 'data' => $obj, 'url' => URL::action('\Api\Controllers\ArticlesController@update', array('id' => $id)), 'messages' => array('success' => '', 'errors' => ''));
        if ($request->isMethod('POST')) {
            $data = $request->all();
            $data['id'] = $id;
            $result = $this->doSave($data, $result, $obj);

            if ($result['status'] !== false) {
                return redirect()->action('\Api\Controllers\ArticlesController@index');
            }
        }

        return view('Api::backend.articles.form', $result);
    }

    public function doSave($data, $result, $obj = null) {                
        $data['slug'] = str_slug($data['title'], "-");
        $data['order'] = (empty($data['order']) ? 1 : $data['order']);
        
        if (!empty($obj)) {                
            $validate = new ArticleValidate();
            $validator = $validate->validatorUpdate($data);            
            if ($validator->errors()->count() > 0) {
                $result['messages']['errors'] = $validator->errors()->getMessages();            
                return $result;
            }
            
            $obj->update($data);
        } else {    
            $validate = new ArticleValidate();
            $validator = $validate->validatorCreate($data);            
            if ($validator->errors()->count() > 0) {
                $result['messages']['errors'] = $validator->errors()->getMessages();            
                return $result;
            }
            
            $data['type'] = 'static';
            
            $obj = $this->model->create($data);
        }

        if ($obj->exists) {
            $result['data'] = $obj;
            $result['status'] = true;
            $result['messages'] = (!empty($obj)) ? array('success' => 'Bạn đã cập nhật thành công bài viết', 'errors' => '') : array('success' => 'Bạn đã tạo thành công bài viết', 'errors' => '');

            return $result;
        }

        $result['messages']['errors'] = array('common' => 'Có lỗi xảy ra trong quá trình xử lý dữ liệu');

        return $result;
    }

    public function delete($id) {
        if ($id) {
            $obj = $this->model->find($id);
            if ($obj) {
                if($obj->type !== 'config') {
                    $obj->forceDelete();    
                }                          
            }
        }

        return redirect()->action('\Api\Controllers\ArticlesController@index');
    }

    public function status($id) {
        if ($id) {
            $obj = $this->model->find($id);
            if ($obj) {
                if($obj->type !== 'config') {
                    $obj->status = ($obj->status > 0) ? 0 : 1;
                    $obj->save();
                }
            }
        }

        return redirect()->action('\Api\Controllers\ArticlesController@index');
    }

}
