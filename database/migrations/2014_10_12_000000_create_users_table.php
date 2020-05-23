<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('spotify_id',1000)->unique();
            $table->string('spotify_email')->unique();
            $table->string('avatar',1000)->nullable();
            $table->string('name',255);
            $table->string('account_type',255);
            $table->string('access_token',1000)->nullable();
            $table->string('refresh_token',1000)->nullable();
            $table->timestamps();
        });
           
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
