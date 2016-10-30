<?php

namespace Api\Facades;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Mail;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\URL;
use Api\Models\Articles;

class MainFacade extends Facade {

    public static function navigation() {
        $articles = Articles::where('type', '=', 'static')->where('status', '>', '0')->orderBy('order', 'asc')->get();
        
        return $articles;
    }
    
    public static function percentShipper() {
        $articles = Articles::where('type', '=', 'config')->where('status', '>', '0')->first();
        
        return $articles->description;
    }
    
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    public static function sendEmail($template, $data) {
        if (empty($data)) {
            return false;
        }

        $mailContent = new \StdClass();
        $mailContent->subject = '[SHIP] ' . $data['subject'];
        $mailContent->from = $data['from'];
        $mailContent->to = $data['to'];
        $mailContent->name = $data['name'];
        $mailContent->link = $data['link'];

        !empty($data['password']) ? $mailContent->password = $data['password'] : 1 == 1;        
        $params = ['message' => $mailContent, 'link' => $mailContent->link, 'name' => $mailContent->name];
        !empty($data['password']) ? $params['password'] = $data['password'] : 1 == 1;
        
        Mail::send($template, $params, function ($m) use ($mailContent) {
            $m->from($mailContent->from, '[SHIP]');
            $m->to($mailContent->to, $mailContent->name)->subject($mailContent->subject);
        });

        return true;
    }
    
    /**
     * Generate link sort using in list view backend
     *
     * @return string
     */
    public static function generateSort($data) {        
        $sort = ($data['field'] === $data['field_vs']) ? (($data['sort'] == 'desc' || $data['sort'] == null) ? 'asc' : 'desc') : 'asc';                
        $url = URL::action($data['link'], array('field' => $data['field'], 'sort' => $sort));        
        $link = '<a href="'. $url .'"><i class="fa fa-sort-amount-'.$sort.'"></i></a>';
                                            
        return $link;       
    }
    
    public static function slugTranslation($keyword) {
        $keyword = str_slug($keyword, '_');        
        $arrs = array(
            'username' => 'Tên tài khoản',
            'password' => 'Mật khẩu',
            'password_confirmation' => 'Mật khẩu xác nhận',
            'telephone' => 'Số điện thoại'
        );
        
        if(array_key_exists($keyword, $arrs)) {
            return $arrs[$keyword];
        }
        
        return $keyword;
    }
    
    public static function slugReplace($str, $keyword) {
        $keywordConvert = str_slug($keyword, '_');        
        $arrs = array(
            'email' => 'Email',
            'username' => 'Tên tài khoản',
            'password' => 'Mật khẩu',
            'password_confirmation' => 'Mật khẩu xác nhận',
            'telephone' => 'Số điện thoại',
            'title' => 'Tiêu đề',
            'order' => 'Thứ tự'
        );
        
        if(array_key_exists($keywordConvert, $arrs)) {
            return str_replace($keyword, $arrs[$keywordConvert], $str);
        }
        
        return $str;
    }

}
