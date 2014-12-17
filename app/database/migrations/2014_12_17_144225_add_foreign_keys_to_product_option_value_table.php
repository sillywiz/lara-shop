<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToProductOptionValueTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('product_option_value', function(Blueprint $table)
		{
			$table->foreign('product_option_id', 'product_option_value_ibfk_2')->references('id')->on('product_option')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('product_id', 'product_option_value_ibfk_3')->references('id')->on('product')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('product_option_value', function(Blueprint $table)
		{
			$table->dropForeign('product_option_value_ibfk_2');
			$table->dropForeign('product_option_value_ibfk_3');
		});
	}

}
