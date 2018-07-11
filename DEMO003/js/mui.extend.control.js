function getSwitchState(dom){
	if(dom.classList.contains('mui-active')){
		return true;
	}
	else{
		return false;
	}
}

function setSwitchState(dom, flag){
	//直接使用mui(dom).switch().toggle()会触发lightOnOff
	if(flag){
		if(!getSwitchState(dom)){
			//打开
			mui(dom).switch().toggle()
		}
	}
	else{
		if(getSwitchState(dom)){
			//关闭
			mui(dom).switch().toggle()
		}
	}
}

function setSwitchStateStyle(dom, flag){
	//仅仅更改外观，并不会触发toggle事件
	if(flag){
		if(!getSwitchState(dom)){
			dom.classList.add('mui-active')
			dom.querySelector('.mui-switch-handle').style="";
		}
	}
	else{
		if(getSwitchState(dom)){
			dom.classList.remove('mui-active')
			dom.querySelector('.mui-switch-handle').style="";
		}
	}
}

;(function($, window, document) {
	$.LoadingMask = function(){
		this.init = function(){
			console.log('init')
			var maskhtml = 
			'<div style="background: rgba(0,0,0,0.5);position: absolute;left: 0;top: 0;right: 0;bottom: 0;z-index: 9999;">'
				+'<div style="position: absolute; left: 50%; top: 50%;margin: -12px 0 0 -12px;">'
			    	+'<i style="vertical-align: middle;" class="mui-spinner mui-spinner-white"></i>'
				+'</div></div>';
			var divdom = document.createElement('div');
			divdom.id = 'LOADINGMASK';
			divdom.innerHTML = maskhtml;
			if(self != top){
				top.document.body.appendChild(divdom);
			}
			else{
				document.body.appendChild(divdom);
			}
		}
		this.show = function(){
			if(self != top){
				doc = top.document;
			}
			else{
				doc = document;
			}
			var maskdom = doc.querySelector('#LOADINGMASK');
			if(maskdom){
				maskdom.style.display = 'block';
				maskdom.style.opacity = 1;
			}
			else{
				this.init()
			}
		}
		this.close = function(){
			if(self != top){
				doc = top.document;
			}
			else{
				doc = document;
			}
			var maskdom = doc.querySelector('#LOADINGMASK');
			if(maskdom){
				maskdom.style.transition = 'all 0.1s';
				maskdom.style.opacity = 0;
				setTimeout(function(){
					maskdom.style.display = 'none';
				},100)
			}
		}
		return this;
	}
	
	var _getSwitchState = function(dom){
		if(dom.classList.contains('mui-active')){
			return true;
		}
		else{
			return false;
		}
	}
	
	var _setSwitchState = function(dom, flag){
		//直接使用mui(dom).switch().toggle()会触发lightOnOff
		if(flag){
			if(!getSwitchState(dom)){
				//打开
				mui(dom).switch().toggle()
			}
		}
		else{
			if(getSwitchState(dom)){
				//关闭
				mui(dom).switch().toggle()
			}
		}
	}
	
	var _setSwitchStateStyle = function(dom, flag){
		//仅仅更改外观，并不会触发toggle事件
		if(flag){
			if(!getSwitchState(dom)){
				dom.classList.add('mui-active')
				dom.querySelector('.mui-switch-handle').style="";
			}
		}
		else{
			if(getSwitchState(dom)){
				dom.classList.remove('mui-active')
				dom.querySelector('.mui-switch-handle').style="";
			}
		}
	}
	
	$.fn.getSwitchState = function(){
		return _getSwitchState(this[0])
	}
	
	$.fn.setSwitchState = function(flag){
		_setSwitchState(this[0],flag)
	}
	
	$.fn.setSwitchStateStyle = function(flag){
		_setSwitchStateStyle(this[0],flag)
	}
	
	$.getCoord = function(sucCallback, errorCallback){
		//sucCallback({latitude:'23.174', longitude:'113.399'});
		if(!document.querySelector('#hiddenMap')){
			document.querySelector('body').insertAdjacentHTML('beforeEnd','<div id="hiddenMap"></div>');
			window.mapObj = new AMap.Map('hiddenMap');
		}
		window.mapObj.plugin('AMap.Geolocation', function () {
		    geolocation = new AMap.Geolocation({
		        enableHighAccuracy: true,//是否使用高精度定位，默认:true
		        timeout: 15000,          //超过10秒后停止定位，默认：无穷大
		        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		    });
		    geolocation.getCurrentPosition();
		    AMap.event.addListener(geolocation, 'complete', function(res){
//		    	alert(res.position.lng)
//		    	alert(res.position.lat)
		    	sucCallback({
		    		latitude: res.position.lat,
		    		longitude: res.position.lng
		    	})
		    });//返回定位信息
		    AMap.event.addListener(geolocation, 'error', function(res){
		    	alert(res.message)
		    	errorCallback()
		    });      //返回定位出错信息
		});
//		if(navigator.geolocation){
//			console.log('get coords')
//			navigator.geolocation.getCurrentPosition(
//				function(position) {
//					sucCallback(position.coords);
//	//				alert(position.coords.longitude);
//	//				alert(position.coords.latitude);
//				},
//				function(error){
//				    switch(error.code) {
//				        case error.PERMISSION_DENIED:
//				            alert("定位失败,用户拒绝请求地理定位");
//				            break;
//				        case error.POSITION_UNAVAILABLE:
//				            alert("定位失败,位置信息不可用");
//				            break;
//				        case error.TIMEOUT:
//				            alert("定位失败,请求获取用户位置超时");
//				            break;
//				        case error.UNKNOWN_ERROR:
//				            alert("定位失败,定位系统失效");
//				            break;
//				    }
//					errorCallback();
//				},
//				{timeout:15*1000}
//			)
//		}
//		else{
//			mui.alert('当前不支持定位', ' ', '确定',function(){console.log('callback fn here')})
//		}
	}

	
	$.extendAjax = function(options){
		var _opts = $.extend({
			dataType:'json',
			beforeSend:function(){
				console.log('beforesend')	
			},
			complete:function(){
				console.log('complete')
			}
		},options, true)
		$.ajax(_opts)
	}
	
	$.xhrAjax = function(options){
		var opts = options || {};
		
		var xhr = new XMLHttpRequest();
		if(opts.type == 'post'){
			xhr.open('post', opts.url)
		}
		else if(opts.type == 'post'){
			xhr.open('get', opts.url)
		}
		
		xhr.withCredentials = true;
		xhr.crossDomain = true;
		xhr.responseType = opts.dataType;
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 ){
				opts.callback(xhr.response)
			}
		}
		if(opts.data){
			xhr.send(opts.data);
		}
		else{
			xhr.send();
		}
	}
})(mui,window,document);
