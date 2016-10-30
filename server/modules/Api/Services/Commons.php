<?php

namespace Api\Services;

use Illuminate\Support\Facades\Storage;

class Commons {

    public function __construct() {
        
    }
    
    public function removeDir($dir) {        
        if(empty($dir)) {
            return false;
        }
        
        if(!Storage::directories($dir)) {
            return true;
        }
        
        Storage::deleteDirectory($dir);
        
        return true;
    }

    public function upload($file = null, $name, $dir) {
        ini_set('memory_limit', '-1');
        $fildeSystems = config('filesystems');
        
        if(empty($fildeSystems['disks'][$dir])) {
           return false; 
        }
        
        if (empty($file) && empty($name)) {
            return false;
        }

        try {
            if (Storage::disk($dir)->has($name)) {
                Storage::disk($dir)->delete($name);
            }
            
            Storage::disk($dir)->put($name, file_get_contents($file->getRealPath()));
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

}
