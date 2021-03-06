// 定义模块，加载头部、尾部资源
define(["jquery", "cookie"], function($){
	// 将 header.html 加载显示，绑定交互效果
	$.ajax("/html/include/header.html").done(function(data){
		$(".header").html(data);
		$(".shouye").click(function(){
			location="/index.html";
		});
		$(".all").click(function(){
			$(".phone").show();
		});
	}).done(function(){
		// 绑定查找的键盘按键事件
		$(".search .word").keyup(function(){
			var url = "https://suggest.taobao.com/sug?code=utf-8&q="+ $(this).val() +"&callback=?";
			$.getJSON(url, function(data){
				var html = "";
				data.result.forEach(function(curr){
					html += "<div>"+ curr[0] +"</div>"
				});

				$(".search .info").html(html);
			});
		});
	}).done(function(){
		// 如果有用户登录成功，则显示欢迎信息
		var user = $.cookie("key");
		if (user){
			setTimeout(function  () {
				$(".scroll").text("尊敬的用户"+ user+"： 汇贾商城提前祝您新年快乐，狗年大吉！旺旺......" );		
			},1000);
		}
	});

	// 将 footer.html 加载显示到 div.footer 中
	$(".footer").load("/html/include/footer.html");
});