<?php

namespace Api\Facades;

use Lang;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Facade;

class Run extends Facade {

    public static function status($status = null) {
        $default = Lang::get('orders.convert.undefined');

        if (empty($status)) {
            return $default;
        }

        try {
            return Lang::get(implode('.', array('orders.convert', $status)));
        } catch (Exception $e) {
            return $default;
        }
    }
    
    public static function icon($status = null) {
        $default = asset('backend/images/receiver_32.png');
        
        try {
            if($status == 'finished' || $status == 'payment'){
                return asset('backend/images/finish_32.png');
            }
        } catch (Exception $e) {
            return $default;
        }
        
        return $default;
    }

    public static function disk($disk) {

        if (empty($disk)) {
            return null;
        }

        return camel_case($disk);
    }

    public static function makeName() {
        return sha1(uniqid('', true) . Str::random(30) . microtime(true));
    }

}
