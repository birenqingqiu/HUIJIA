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
		$(".tijiao").click(function(){
			alert("购买成功");
			location="/index.html";
		});
	});
});
