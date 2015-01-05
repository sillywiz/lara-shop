<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@showWelcome');

Route::resource('registration', 'RegistrationController',
    array('only' => array('index', 'store')));

Route::get('template/{name}', function($name)
{
	return View::make($name . '_haml');
});
