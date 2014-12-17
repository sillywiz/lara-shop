<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCartProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cart_product', function(Blueprint $table)
		{
			$table->integer('cart_id')->unsigned()->index('cart_id');
			$table->integer('product_id')->unsigned()->index('product_id');
			$table->smallInteger('count')->unsigned();
			$table->float('price', 9)->default(0.00);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('cart_product');
	}

}
