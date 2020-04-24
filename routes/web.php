<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/fetch-user-data', 'HomeController@userData');


Route::get('/auth/spotify/callback', 'HomeController@callback');
Route::get('/auth/spotify', 'HomeController@authSpotify')->name('spotify');

Route::get('/auth/spotify/logout', 'HomeController@authLogout')->name('spotify-logout');
Auth::routes(['register' => false, 'login'=> false]);