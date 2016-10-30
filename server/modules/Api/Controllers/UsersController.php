<?php

namespace Api\Controllers;

use Auth;
use Api\Facades\MainFacade;
use Api\Controllers\BaseController;
use Api\Models\Users;
use Api\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Http\Services\Commons;
use Api\Validations\UserValidate;

class UsersController extends BaseController {

    protected $model;
    protected $modelOrder;

    public function __construct() {                  
        parent::__construct();
        
        $this->model = new Users();
        $this->modelOrder = new Orders();
    }        

    public function index(Request $request) {        
        switch ($this->checkAuth->role->name) {
            case 'admin' : $obj = $this->model->whereIn('role_id', array(2, 3, 4));
                break;
            case 'manager' : $obj = $this->model->whereIn('role_id', array(2, 3))->orWhere('id', '=', $this->checkAuth->id);
                break;
            case 'customer' : $obj = $this->model->where('id', '=', $this->checkAuth->id);
                break;
            case 'shiper' : $obj = $this->model->where('id', '=', $this->checkAuth->id);
                break;
            default : break;
        }
        
        if(in_array($this->checkAuth->role->name, array('admin', 'manager')) ) {            
            $field = $request->get('field');
            $sort = $request->get('sort');

            if (empty($field) && empty($sort)) {
                $obj = $obj->orderBy('created_at', 'desc')->paginate($this->perPage);
            } else {
                ($field == 'role') ? $col = 'role_id' : $col = $field;
                $obj = $obj->orderBy($col, $sort)->paginate($this->perPage);
            }

            $request->get('keyword') ? $keyword = $request->get('keyword') : 1 == 1;            
            if (isset($keyword)) {
                if($this->checkAuth->role->name == 'admin') {
                    $obj = $this->model->whereIn('role_id', array(2, 3, 4));
                } else {
                    $obj = $this->model->whereIn('role_id', array(3, 4));
                }

                $obj = $obj->where(function ($query) use ($keyword) {
                        $query->where('username', 'like', '%' . $keyword . '%')
                        ->orWhere('email', 'like', '%' . $keyword . '%')
                        ->orWhere('name', 'like', '%' . $keyword . '%')
                        ->orWhere('telephone', 'like', '%' . $keyword . '%');
                    })
                    ->orderBy('created_at', 'desc')
                    ->paginate($this->perPage);
            } else {
                $keyword = null;
            }
        } else {
            $field = $sort = $keyword = null;            
            $obj = $obj->orderBy('created_at', 'desc')->paginate($this->perPage);
        }        
        
        $countOrderShip = [];
        if(!empty($obj) && !$obj->isEmpty()) {
            foreach($obj as $ob) {
                if($ob->role->name == 'shiper') {                    
                    $shiperOrderAssigned = $this->modelOrder->where('shiper_id', '=', $ob->id)->where(function ($query) {
                        $query->where('updated_at', '>=', date('Y-m-d') . '00:00:00')
                            ->orWhere('updated_at', '<=', date('Y-m-d') . '23:59:59');
                    })->get();                    
                    $shiperOrderFinished = $this->modelOrder->where('shiper_id', '=', $ob->id)
                    ->where(function ($query) {
                        $query->where('updated_at', '>=', date('Y-m-d') . '00:00:00')
                            ->orWhere('updated_at', '<=', date('Y-m-d') . '23:59:59');
                    })->where(function ($query) {
                        $query->where('status', '=', 'finished')
                            ->orWhere('status', '=', 'payment');
                    })->get();
                    
                    $countOrderShip[$ob->id] = ['assigned' => count($shiperOrderAssigned), 'finished' => count($shiperOrderFinished)];
                }
            }
        }
        
        $title = 'Danh sách tài khoản';
        
        return view('Api::backend.users.index', compact('obj', 'keyword', 'field', 'sort', 'title', 'countOrderShip'));
    }        

    public function create(Request $request) {
        $result = array('status' => false, 'title' => 'Thêm mới tài khoản', 'action' => 'create', 'data' => '', 'url' => URL::action('\Api\Controllers\UsersController@create'), 'messages' => array('success' => '', 'errors' => ''));                
        
        if ($request->isMethod('POST')) {            
            $result = $this->doSave($request->all(), $result);

            if ($result['status'] !== false) {
                return redirect()->action('\Api\Controllers\UsersController@index');
            }
        }        

        $presenterList = $this->model->whereNotIn('role_id', [1, 2])->get();
        $result['presenterList'] = $presenterList;
        
        return view('Api::backend.users.form', $result);
    }

    public function update($id, Request $request) {
        if (!$id) {
            return redirect()->action('\Api\Controllers\UsersController@index');
        }                

        $obj = $this->model->find($id);
        if (!$obj) {
            return redirect()->action('\Api\Controllers\UsersController@index');
        }
        
        if(!in_array($this->checkAuth->role->name, ['admin', 'manager'])) {
            if ($this->checkAuth->id != $id) {
                return redirect()->action('\Api\Controllers\UsersController@update', array('id' => $this->checkAuth->id));
            }
        }
        
        $result = array('status' => false, 'title' => 'Cập nhật tài khoản', 'action' => 'update', 'data' => $obj, 'url' => URL::action('\Api\Controllers\UsersController@update', array('id' => $id)), 'messages' => array('success' => '', 'errors' => ''));
        
        if ($request->isMethod('POST')) {
            $data = $request->all();
            $data['id'] = $id;
            $result = $this->doSave($data, $result, $obj);

            if ($result['status'] !== false) {
                return redirect()->action('\Api\Controllers\UsersController@index');
            }
        }    
        
        $presenterList = $this->model->whereNotIn('role_id', [1, 2])->get();        
        $result['presenterList'] = $presenterList;
        
        return view('Api::backend.users.form', $result);
    }

    public function doSave($data, $result, $obj = null) {                
        if (!empty($obj)) {                  
            $validate = new UserValidate();
            $validator = $validate->validatorUpdate($data);            
            if ($validator->errors()->count() > 0) {
                $result['messages']['errors'] = $validator->errors()->getMessages();            
                return $result;
            }
            
            if(empty($data['password'])) {
                unset($data['password']);
            } else {
                $data['password'] = bcrypt($data['password']);
            } 
            
            $obj->update($data);
        } else {
            $validate = new UserValidate();
            $validator = $validate->validatorCreate($data);            
            if ($validator->errors()->count() > 0) {
                $result['messages']['errors'] = $validator->errors()->getMessages();            
                return $result;
            }
        
            $services = new Commons();

            $passNotHash = $data['password'];
            
            $data['confirmed'] = 1;
            $data['password'] = bcrypt($data['password']);
            $data['confirmation_code'] = $services->randomString(6);

            $obj = $this->model->create($data);
            
            if($obj->email) {
                $findAdmin = $this->model->whereRoleId(1)->first();            
                if($findAdmin['email']) {
                    $link = URL::action('\Api\Controllers\MainController@login');
                    $mailContent = array('subject' => 'Thông tin tài khoản', 'from' => $findAdmin['email'], 'to' => $obj->email, 'name' => $obj->username, 'link' => $link, 'password' => $passNotHash);                
                    MainFacade::sendEmail('Api::layouts.backend.emailtemplates.password', $mailContent);      
                }      
            }
        }        

        if ($obj->exists) {
            $result['data'] = $obj;
            $result['status'] = true;
            $result['messages'] = (!empty($obj)) ? array('success' => 'Bạn đã cập nhật thành công tài khoản', 'errors' => '') : array('success' => 'Bạn đã tạo thành công tài khoản', 'errors' => '');

            return $result;
        }

        $result['messages']['errors'] = array('common' => 'Có lỗi xảy ra trong quá trình xử lý dữ liệu');

        return $result;
    }

    public function delete($id) { 
        if ($id) {
            $obj = $this->model->find($id);				
			
            if ($obj) {                
                if(!empty($this->modelOrder->where('customer_id', '=', $id)->orWhere('shiper_id', '=', $id)->first())) {
                    return redirect()->action('\Api\Controllers\UsersController@index');
                }
			
                if($obj->role->name == 'shiper') {
                    if($obj->shipers) {
                        foreach($obj->shipers as $order) {
                            $order->shiper_id = null;
                            $order->save();
                        }
                    }                    
                } elseif($obj->role->name == 'customer') {
                    if($obj->customers) {
                        foreach($obj->customers as $order) {                            
                            if($order->notifications) {
                                $order->notifications->forceDelete();
                            }
                            
                            if($order->reports) {
                                foreach($order->reports as $report) {                            
                                    $report->forceDelete();
                                }
                            }
                            
                            $order->forceDelete();
                        }
                    }   
                }
                
                $obj->forceDelete();
            }
        }

        return redirect()->action('\Api\Controllers\UsersController@index');
    }

    public function status($id) {
        if ($id) {
            $obj = $this->model->find($id);
            if ($obj) {
                $obj->confirmed = 1;
                $obj->status = ($obj->status > 0) ? 0 : 1;
                $obj->save();
            }
        }

        return redirect()->action('\Api\Controllers\UsersController@index');
    }

}
