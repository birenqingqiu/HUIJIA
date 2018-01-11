require(["config"], function(){
	require(["jquery","load"], function($){
		$(function(){
			function generate(){
				var url = "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7";
				$.getJSON(url, function(data){
					// 设置图片的 src 属性，显示出验证码
					$(".img").attr("src", data.showapi_res_body.image);
					// 缓存 sid 用于验证码校验
					$(".img").data("sid", data.showapi_res_body.sid);
				});
			}
			
			generate();

			$(".img").click(generate);
			$(".yzm").blur(function(){
				// 获取输入的字符串
				var _yzm = $(".yzm").val();
				// sid
				var _sid = $(".img").data("sid");
				// url
				var url = `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_yzm}&sid=${_sid}`;
				// getJSON
				$.getJSON(url,function(data){
					let result = 3;
					if(data.showapi_res_body.valid){
						$(".btn").click(function(e){
						e = e || event;
						e.preventDefault ? e.preventDefault():e.returnValue = false;
						var user = $(".uname").val(),
							pass = $(".pword").val();
						
						var urls = 	`http://10.7.187.114/HUIJIA_php/login.php`;
						$.ajax({
							url: urls,
							type: "POST",
							data:`username=${user}&password=${pass}`,
							dataType:"json",
							success:function(data){
								if (data.status == 1) {									$.cookie.json=true;
									alert("登陆成功");
									$.cookie("key",user,{expires:7,path:"/"});
									setTimeout(function  () {
										location="/index.html";
									},2000);
								}else{
										alert("请重新登陆");
									}
							}
						});
					});
					}
					else{
						alert("验证码验证失败");
						generate();
					}
				});
			});
			
		});
	});
});