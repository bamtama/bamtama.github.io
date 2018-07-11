/**
 * 工具类公共方法扩展
 */

/*
 * 获取url参数
 */
String.prototype.getUrlParam = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null) 
    	return (r[2]);
    return null;
}


/*
 * 常用验证
 */
String.prototype.isID = function(){
	var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if(reg.test(this)){
		return true;
	}
	else{
		return false;
	}
}
String.prototype.isNumber = function(){
	var reg = /^\d+$/;
	if(reg.test(this)){
		return true;
	}
	else{
		return false;
	}
}
String.prototype.isTelphone = function(){
	var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(reg.test(this)){
		return true;
	}
	else{
		return false;
	}
}

