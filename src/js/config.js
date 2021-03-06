require.config({
	baseUrl : "/", 
	paths : {
		"jquery" : "lib/jquery/jquery-1.12.4.min",
		"cookie" : "lib/jquery_plugins/jquery.cookie",
		"zoom" : "lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		"fly" : "lib/jquery_plugins/jquery.fly.min",
		"template" : "lib/arttemplate/template",
		"load" : "js/loadHeaderFooter",
		"bootstrap" : "lib/bootstrap/js/bootstrap.min",
		"x_zoom" : "lib/zoom/js/tiksluslens.min"
	},
	shim : {//由于 zoom ， fly ，jquer标准不支持，需自己定义配置依赖
		"zoom" : {
			deps : ["jquery"]
		},
		"fly" : {
			deps : ["jquery"]
		},
		"bootstrap" : {
			deps : ["jquery"]
		},
		"cookie":{
			deps : ["jquery"]
		}
	}
});