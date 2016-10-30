<?php

namespace Api\Controllers;

use Auth;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Api\Facades\MainFacade;
use Api\Controllers\MainController;
use Api\Models\Users;
use App\Http\Services\Commons;

class AuthController extends Controller {

    protected $mainController;
    protected $modelUser;

    public function __construct() {
        $this->mainController = new MainController();
        $this->modelUser = new Users();
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function accessToken($username) {
        $result = array('status' => false, 'data' => '', 'messages' => array('success' => '', 'errors' => ''));

        $checkUser = Users::where('username', '=', $username)->first();
        if (!empty($checkUser)) {
            $result['status'] = true;
            $result['accessToken'] = csrf_token();
        } else {
            $result['messages']['errors'] = "Tài khoản không tồn tại trong hệ thống";
        }

        return $result;
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function login(Request $request) {
        $result = array('status' => false, 'data' => $request->all(), 'messages' => array('success' => '', 'errors' => ''));

        return ($request->isMethod('POST')) ? $this->mainController->doLogin($request->all()) : $result;
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function loginFacebook(Request $request) {
        $result = array('status' => false, 'data' => $request->all(), 'messages' => array('success' => '', 'errors' => ''));
        if ($request->isMethod('POST')) {
            $data = $request->all();
            $data['username'] = str_slug($data['name'], "_") . '_' . $data['id'];
            $data['password'] = $data['id'];

            $result = $this->mainController->doLogin(['username' => $data['username'], 'password' => $data['password']]);
            if ($result['status'] !== true) {
                $check = $this->modelUser->where('username', '=', str_slug($data['name'], "_") . '_' . $data['id'])->first();
                if (!$check) {
                    $data['password_confirmation'] = $data['id'];
                    $data['telephone'] = '0982888888';
                    $data['role_id'] = 2;
                    $data['provider'] = 'facebook';

                    unset($data['id']);

                    $result = $this->doSave($data, $result);

                    if($result['status'] !== false) {
                        $this->loginFacebook($request);
                    }
                }
            } else {
                $result['status'] = $result['finished'] = true;
            }
        }

        return $result;
    }

    public function doSave($data, $result, $obj = null) {
        if (!empty($obj)) {
            $obj->update($data);
        } else {
            $services = new Commons();

            $passNotHash = $data['password'];

            $data['confirmed'] = 1;
            $data['password'] = bcrypt($data['password']);
            $data['confirmation_code'] = $services->randomString(6);

            $obj = $this->modelUser->create($data);

            if ($obj->email) {
                $findAdmin = $this->modelUser->whereRoleId(1)->first();
                if ($findAdmin['email']) {
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

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function register(Request $request) {
        $result = array('status' => false, 'data' => $request->all(), 'messages' => array('success' => '', 'errors' => ''));

        return ($request->isMethod('POST')) ? $this->mainController->doRegister($request->all()) : $result;
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function verify($id) {
        return $this->mainController->doVerify($id);
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function setGpsUser(Request $request) {
        $result = array('status' => false, 'data' => $request->all(), 'messages' => array('success' => '', 'errors' => ''));

        if (!Auth::check()) {
            $result['messages']['errors'] = 'Yêu cầu đăng nhập trước khi sử dụng tính năng này';

            return $result;
        }

        if ($request->isMethod('POST')) {
            $data = $request->all();

            if (empty($data['lat'])) {
                $result['messages']['errors'] = 'Vĩ độ không được để trống';

                return $result;
            }

            if (empty($data['long'])) {
                $result['messages']['errors'] = 'Kinh độ không được để trống';

                return $result;
            }

            $user = Auth::user();
            $user->lat_long = json_encode(array('lat' => $data['lat'], 'lng' => $data['long'], 'icon' => URL::action('\Api\Controllers\MainController@index').'/backend/images/shipper.png'));
            $user->save();

            $result['status'] = true;
            $result['messages']['success'] = 'Cập nhật thành công toạ độ';
        }

        return $result;
    }

    /**
     * Get handled conver data.
     *
     * @return array
     */
    public function getGpsShiper(Request $request) {
        $result = array('status' => false, 'data' => $request->all(), 'messages' => array('success' => '', 'errors' => ''));

        if (!Auth::check()) {
            $result['messages']['errors'] = 'Yêu cầu đăng nhập trước khi sử dụng tính năng này';

            return $result;
        }

        if ($request->isMethod('POST')) {
            $data = $request->all();

            if (empty($data['user_id'])) {
                $result['messages']['errors'] = 'User id không được để trống';

                return $result;
            }

            $user = Users::find($data['user_id']);
            if (empty($user)) {
                $result['messages']['errors'] = 'Tài khoản cần tìm không tồn tại trong hệ thống';

                return $result;
            }

            $result['status'] = true;
            $result['data'] = $user;
            $result['messages']['success'] = 'Cung cấp thành công thông tin tài khoản';
        }

        return $result;
    }

    public function logout() {
        Auth::logout();

        $result = array('status' => true);
    }
}
