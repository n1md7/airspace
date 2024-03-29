<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' =>'api'], function () {
    Route::get('commits/{page?}/{per_page?}', 'CommitController@showCommits')
        ->where([
            'page', '[0-9]+',
            'per_page', '[0-9]+'
            ]);
});
