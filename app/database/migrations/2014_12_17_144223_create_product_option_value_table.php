<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductOptionValueTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('product_option_value', function(Blueprint $table)
		{
			$table->integer('product_id')->unsigned()->index('product_id');
			$table->integer('product_option_id')->unsigned()->index('product_option_id');
			$table->dateTime('create_at')->default('0000-00-00 00:00:00');
			$table->dateTime('update_at')->default('0000-00-00 00:00:00');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('product_option_value');
	}

}
