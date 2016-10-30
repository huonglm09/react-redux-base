<?php

namespace Api\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;

class Users extends Model implements AuthenticatableContract, CanResetPasswordContract, AuthorizableContract {

    use Authenticatable,
        CanResetPassword,
        Authorizable,
        SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['role_id', 'username', 'password', 'email', 'card', 'telephone', 'first_name', 'last_name', 'name', 'address', 'bank_name', 'bank_branch', 'bank_account_name',
        'birthday', 'gender', 'status', 'lat_long', 'remember_token', 'provider', 'confirmed', 'confirmation_code', 'presenter', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Get the role record associated with the user.
     */
    public function role() {
        return $this->hasOne('Api\Models\Roles', 'id', 'role_id');
    }

    /**
     * Get the notifications for the order.
     */
    public function shipers() {
        return $this->hasMany('Api\Models\Orders', 'shiper_id', 'id');
    }

    /**
     * Get the notifications for the order.
     */
    public function customers() {
        return $this->hasMany('Api\Models\Orders', 'customer_id', 'id');
    }

    /**
     * Get the notifications for the order.
     */
    public function reports() {
        return $this->hasMany('Api\Models\Reports', 'order_id', 'id');
    }

    public function scopeGetShip($query, $user) {
        if (empty($user)) {
            return $query;
        }

        $query->select('users.id', 'users.username', 'users.name', 'users.telephone', 'users.lat_long', 'users.gender');

        $query->join('roles', function($join) {
            $join->on('roles.id', '=', 'users.role_id');
        });
        
        $query->where('roles.name', '=', config('model.role.shiper.name'));
        
        switch ($user->role->name) {
            case config('model.role.shiper.name'):
                $query->where('users.id', '=', $user->id);
                break;
        }
        
        $query->whereNotNull('lat_long');
        $query->orderBy('users.id', 'desc');

        return $query;
    }

}
