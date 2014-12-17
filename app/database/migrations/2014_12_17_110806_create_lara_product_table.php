<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLaraProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('lara_product', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('asin', 20);
			$table->text('text', 65535);
			$table->dateTime('enable_to')->nullable();
			$table->string('slug', 100)->nullable();
			$table->integer('category_id')->unsigned()->index('category_id');
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
		Schema::drop('lara_product');
	}

}
