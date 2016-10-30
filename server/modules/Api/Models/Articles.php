<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model {

    /**
     * The database table notification by the model.
     *
     * @var string
     */
    protected $table = 'articles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status', 'category_id', 'type', 'title', 'slug', 'description', 'order', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * Get the order record associated with the notification.
     */
    //public function category() {
    //    return $this->hasOne('Api\Models\Categories', 'id', 'category_id');
    //}

}
