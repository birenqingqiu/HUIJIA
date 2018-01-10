require(["config"], function(){
	require(["jquery", "template","bootstrap","load"], function($, template){
		// cookie 配置
		$.cookie.json = true;

		// 读取cookie 中保存的购物车数据
		var _products = $.cookie("buy") || [];
		console.log(_products);
		// 判断
		if (_products.length === 0) { // 购物车为空
			$(".main_box").html(`购买失败，请<a href="/index.html">选购商品</a>`);
			return;
		}
		/* 将购物车中保存的商品渲染显示到页面中 */
		var _html = template("put_template", {buys : [_products]});
	
		$(".main_box").html(_html);

		/************************************************************/
		// 查找 id 所表示的商品在 buy 中位置
		// function exist(id, buy) {
		// 	var idx = -1;
		// 	$.each(buy, function(index, elemenet){
		// 		if (elemenet.id == id) {
		// 			idx = index;
		// 			return false;
		// 		}
		// 	});

		// 	return idx;
		// }

		// /************************************************************/
		//  计算合计 
		// function calcTotal() {
		// 	// 获取所有选中的商品行前的复选框
		// 	var sum = 0;
		// 	$(".ck_product:checked").each(function(index, element){
		// 		sum += Number($(this).parents(".put_box").children(".sub").text())
		// 	});
		// 	$(".total .money").text(sum.toFixed(2));
		// }
	});
});
