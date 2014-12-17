<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductOptionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product_option', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 100)->default('');
			$table->dateTime('create_at')->default('0000-00-00 00:00:00');
			$table->dateTime('update_at')->default('0000-00-00 00:00:00');
			$table->string('value_type')->default('field');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product_option');
	}

}
