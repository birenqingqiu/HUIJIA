require(["config"], function(){
	require(["jquery", "cookie","load"], function($){
		$.cookie.json = true;
		$("#zc").submit(function(e){
		e.preventDefault ? e.preventDefault():e.returnValue = false;
			var username = $(".user").val(),
				pass = $(".pswd").val();
				var urls = `http://10.7.187.114/HUIJIA_php/_register.php?username=${username}&password=${pass}`	
			$.ajax({
				url:urls,
				// data:`username = ${username}&password=${pass}`,
				type: "GET",
				dataType:"json",
				success:function(data){
					if (data.status == 1){
						alert("注册成功");
						setTimeout(function  () {
							location="/html/login.html";
						},2000);
					}else{
						alert("请重新注册");
					}
				}
			});
	    });
	});
});
