<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\Model;

class Areas extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'areas';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'status', 'max_order', 'created_at', 'updated_at', 'deleted_at'];


}
