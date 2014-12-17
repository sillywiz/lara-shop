<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCartProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('cart_product', function(Blueprint $table)
		{
			$table->foreign('product_id', 'cart_product_ibfk_2')->references('id')->on('product')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('cart_id', 'cart_product_ibfk_1')->references('id')->on('cart')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cart_product', function(Blueprint $table)
		{
			$table->dropForeign('cart_product_ibfk_2');
			$table->dropForeign('cart_product_ibfk_1');
		});
	}

}
