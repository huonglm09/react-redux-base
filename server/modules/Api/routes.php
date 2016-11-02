<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

//==== API CORS Router ====
Route::group(['middleware' => ['cors'], 'prefix' => 'api'], function () {
    Route::post('/auth/login', 'Api\Controllers\AuthController@login');

    Route::get('/categories', 'Api\Controllers\CategoriesController@all');

    Route::get('/category/{slug}', 'Api\Controllers\ArticlesController@getByCategory');
    Route::get('/category/feature/{slug}', 'Api\Controllers\ArticlesController@getFeatureByCategory');
    Route::post('/search', 'Api\Controllers\ArticlesController@search');
});

// Catch all undefined routes. Always gotta stay at the bottom since order of routes matters.
Route::any('{undefinedRoute}', function ($undefinedRoute) {
    return view('errors.503');
})->where('undefinedRoute', '([A-z\d-\/_.]+)?');

// Using different syntax for Blade to avoid conflicts with Jade.
// You are well-advised to go without any Blade at all.
Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
