<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToLaraProductTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('lara_product', function(Blueprint $table)
		{
			$table->foreign('category_id', 'lara_product_ibfk_1')->references('id')->on('lara_category')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('lara_product', function(Blueprint $table)
		{
			$table->dropForeign('lara_product_ibfk_1');
		});
	}

}
