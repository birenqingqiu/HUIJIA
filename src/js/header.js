require(["config"], function(){
	require(["jquery", "template", "bootstrap","load"], function($, template){
		$('#exampleModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var recipient = button.data('whatever') // Extract info from data-* attributes
		  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		  var modal = $(this)
		  modal.find('.modal-title').text('New message to ' + recipient)
		  modal.find('.modal-body input').val(recipient)
		});
		$(function(){
			function generate(){
				var url = "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7";
				$.getJSON(url, function(data){
					// 设置图片的 src 属性，显示出验证码
					$(".vali").attr("src", data.showapi_res_body.image);
					// 缓存 sid 用于验证码校验
					$(".vali").data("sid", data.showapi_res_body.sid);
				});
			}

			generate();

			$(".vali").click(generate);

			$(".denglu").click(function(){
				// 获取输入的字符串
				var _input = $(".input").val();
				// sid
				var _sid = $(".vali").data("sid");
				// url
				var url = `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_input}&sid=${_sid}`;
				// getJSON
				$.getJSON(url, function(data){
					if(data.showapi_res_body.valid)
						console.log("验证成功");
					else
						console.log("输入验证码有误");
				})
			});
		});
	});
});
