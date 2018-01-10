require(["config"], function(){
	require(["jquery","template","zoom","cookie","load"], function($,template){
		$.cookie.json = true;
		//加载对应商品的数据
		var contrast = $.cookie("id");

		$.getJSON("/mock/detail.json", function(data){
			let contrastData = data.res_body.data;
			let arr=[],
				xb=0;
			$.each(contrastData,function(index,elements){
				arr.push(`${elements.id}`);
			})
			xb=$.inArray(contrast,arr);
			let cData = {products : data.res_body.data};
			var array =[];
			array.push(cData.products[xb])
			//获取即将要渲染的数据
			// let sj = {pr : cData.products[xb]};
			// console.log(sj);
			// var html = template("mb_box", sj);
			
			var html = "";
			$.each(array, function(index, element){
				html = `<div class="box">
					<div class="id" style="display:none">${element.id}</div>
					<div class="title">${element.title}</div>
					
					<div class="price">${element.price}</div>
					
					<p>配送至:</p>
					 	<select id="province"></select>
						<select id="city"></select>
						<select id="district"></select>
				</div>`
			});
			$(".mb_box").html(html);
			var pic = "";
			$.each(array, function(index, e){
				pic = `<div id="imgwrapper"> 
    					<img id="zoom_03" src="${e.img}" data-zoom-image="${e.big_img}"/> 
					</div> 
					<div id="pics"> 
    					<a href="http://www.sucaihuo.com/js" data-image="${e.img}" data-zoom-image="${e.big_img}"> 
        				<img  src="${e.s_img}" />
    					</a> 
 
    					<a href="#" data-image="${e.img2}" data-zoom-image="${e.big_img2}"> 
        				<img  src="${e.s_img2}" /> 
   						</a> 
					</div>`
			});
			$(".pic_box").html(pic);
			$("#zoom_03").elevateZoom({ 
    			gallery: 'pics', //缩略图id 
    			lensColour: '#fede4f', //放大镜背景颜色 
   				cursor: 'move', //悬浮在放大镜鼠标形状 
    			borderSize: '1', //右侧放大镜边框尺寸 
    			borderColour: '#dddddd' //右侧放大镜边框颜色 
			});
			//ajax 加载地址部分
			$(function(){
				// 加载省份
				function loadProvince() {
					var url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=1",
						url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";

					$.when($.ajax(url1), $.ajax(url2)).then(function(a1, a2){
						// 将响应回的两页省份数据合并为一个数组结构
						var provinces = a1[0].showapi_res_body.data.concat(a2[0].showapi_res_body.data);
						// 遍历数组
						var html = `<option value="-1">请选择省份</option>`;
						$.each(provinces, function(index, province){
							html += `<option value="${province.id}">${province.areaName}</option>`;
						});
						// 渲染
						$("#province").html(html);
					});
				}

				// 根据选择省份加载城市
				function loadCity() {
					// 获取选择的省份 id
					var _id = $("#province").val();
					// 构建URL
					var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
					// 请求
					$.getJSON(url).done(function(data){
						// 获取所有城市信息
						var cities = data.showapi_res_body.data;
						// 遍历
						var html = `<option value="-1">请选择城市</option>`;
						$.each(cities, function(index, city){
							html += `<option value="${city.id}">${city.areaName}</option>`;
						});
						// 渲染
						$("#city").html(html);
					});
				}

				// 加载区县信息
				function loadDistrict() {
					// 获取选择的城市 id
					var _id = $("#city").val();
					// 构建URL
					var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
					// 请求
					$.getJSON(url).done(function(data){
						// 获取所有区县信息
						var districts = data.showapi_res_body.data;
						// 遍历
						var html = `<option value="-1">请选择区县</option>`;
						$.each(districts, function(index, district){
							html += `<option value="${district.id}">${district.areaName}</option>`;
						});
						// 渲染
						$("#district").html(html);
					});
				}

				// 页面打开即加载省份
				loadProvince();
				// 当省份选择项改变，则加载城市
				$("#province").change(function(){
					$("#city").html(`<option>请选择城市</option>`);
					$("#district").html(`<option>请选择区县</option>`);
					loadCity();
				});
				// 当城市选择项改变，则加载区县
				$("#city").change(function(){
					$("#district").html(`<option>请选择区县</option>`);
					loadDistrict();
				});
			});
			// <div class="mb">
			// 	<div class="id" style="display:none">{{product.id}}</div>
			// 	<img src="{{product.img}}" class="img">
			// 	<div class="title">{{product.title}}</div>
			// 	<div class="price">{{product.price}}</div>
			// </div>	
		});
		
		// //商品详情购物车cookie部分
		// $.getJSON("/mock/detail.json", function(data){
		// 	// 准备渲染数据
		// 	var renderData = {products : data.res_body.data};
		// 	// 渲染数据
		// 	// var html = template("list_template", renderData);
		// 	// $(".discounts").html(html);

		// 	var renderData_lx = {lenovos : data.res_body.lenovo};
		// 	// var html_lx = template("list_template_lenovo", renderData_lx);
		// 	// $(".lenovo").html(html_lx);

		// 	// 配置 cookie 插件的 json 数据自动转换
		// 	$.cookie.json = true;
		// 	// 查找 id 所表示的商品在 products 中位置
		// 	function exist(id, products) {
		// 		var idx = -1;
		// 		$.each(products, function(index, elemenet){
		// 			if (elemenet.id == id) {
		// 				idx = index;
		// 				return false;
		// 			}
		// 		});

		// 		return idx;
		// 	}
		// 	$(".add_box").delegate(".detail_add", "click", function(event){
		// 		var _box = $(this).parent();
		// 		// 将当前选购商品的信息保存到对象中
		// 		var prod = {
		// 			id:_box.children(".id").text(),
		// 			title:_box.children(".title").text(),
		// 			price:_box.children(".price").text(),
		// 			amount:1,
		// 			img:_box.children(".img").attr("src")
		// 		};
		// 		// 查找 cookie 中已有购物车结构
		// 		var _products = $.cookie("products") || [];
		// 		// 判断当前选购商品是否在数组中已有选购
		// 		var index = exist(prod.id, _products);
		// 		if (index === -1) {
		// 			// 将当前选购商品保存到数组中
		// 			_products.push(prod);					
		// 		} else {
		// 			// 将已选购商品的数量自增
		// 			_products[index].amount++;
		// 		}
		// 		// 将数组存回 cookie 中
		// 		$.cookie("products", _products, {expires:7, path:"/"});
		// 	});
		// });
	})
});