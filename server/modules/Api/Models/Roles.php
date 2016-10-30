<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'roles';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'created_at', 'updated_at', 'deleted_at'];


}
