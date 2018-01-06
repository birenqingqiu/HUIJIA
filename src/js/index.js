require(["config"], function(){
	require(["load"], function(){
		
	});
	require(["jquery", "template","fly","load"], function($, template){
		// 异步加载列表页面数据，使用模板引擎渲染
		$.getJSON("/mock/list.json", function(data){
			// 准备渲染数据
			var renderData = {products : data.res_body.data};
			// 渲染数据
			var html = template("list_template", renderData);

			$(".discounts").html(html);

			var renderData_lx = {lenovos : data.res_body.lenovo};
			var html_lx = template("list_template_lenovo", renderData_lx);
			$(".lenovo").html(html_lx);


			$(".discounts-box").delegate(".add", "click", function(event){
				var _box = $(this).parent();

				var flyer = $(`<img src="${_box.children(".img").attr("src")}">`);
				
				flyer.fly({
					start:{
						left : event.pageX,
						top : event.pageY
					},
					end:{
						left : $(".my-cart").offset().left,
						top : $(".my-cart").offset().top,
						width: 0,
						height: 0
					}
				});
			});
			$(".lenovo-box").delegate(".add", "click", function(event){
				var _box = $(this).parent();

				var flyer = $(`<img src="${_box.children(".img").attr("src")}">`);
				
				flyer.fly({
					start:{
						left : event.pageX,
						top : event.pageY
					},
					end:{
						left : $(".my-cart").offset().left,
						top : $(".my-cart").offset().top,
						width: 0,
						height: 0
					}
				});
			});
		});
	});
});