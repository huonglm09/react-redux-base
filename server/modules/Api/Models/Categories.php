<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model {

    /**
     * The database table categories by the model.
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status', 'title', 'slug', 'description', 'order', 'created_at', 'updated_at', 'deleted_at'];

}
