/**
 * 申请系列页面的公共方法
 * 
 * ApplyForEmploymentCertification 在职证明
 * ApplyForFileDelivery 档案专递
 * ApplyForIncomeCertificationInChina 出国在职收入证明
 * apply-proofOfIncome 收入证明
 * 
 */

var HR_STO_APPLY_EMPLOYMENTCERTIFICATION = 'HR_STO_APPLY_EMPLOYMENTCERTIFICATION',
	HR_STO_APPLY_FILEDELIVERY = 'HR_STO_APPLY_FILEDELIVERY',
	HR_STO_APPLY_ADVANCEATTENDENCEREGISTER = 'HR_STO_APPLY_ADVANCEATTENDENCEREGISTER',
	HR_STO_APPLY_LEAVE = 'HR_STO_APPLY_LEAVE',
	HR_STO_APPLY_INCOMECERTIFICATIONINCHINA = 'HR_STO_APPLY_INCOMECERTIFICATIONINCHINA';
	
var applyPublicMethods = (function(){
	var initTextareaCounting = function(textareaDom, countDom, max){
		textareaCounting(textareaDom, countDom, max)
		textareaDom.addEventListener('input', function(){
			textareaCounting(textareaDom, countDom, max)
		})
	}
	var textareaCounting = function(textareaDom, countDom, max){
			//字数统计
			var count = textareaDom.value.length;
			if(count > max){
				textareaDom.value = textareaDom.value.substr(0,max);
				count = max;
			}
			countDom.innerHTML = count;
			
			//行高伸缩
			textareaDom.style.height = 'auto';
			textareaDom.style.height = textareaDom.scrollHeight + 'px';
	}
	var saveLocal = function(name,jsonstr){
		try{
			window.sessionStorage.setItem(name, jsonstr);
		}
		catch(e){
			alert('不支持本地存储')
		}
	}
	var removeLocal = function(name){
		window.sessionStorage.removeItem(name)
	}
	var getLocal = function(name){
		try{
			return window.sessionStorage.getItem(name);	
		}
		catch(e){
			alert('不支持本地存储')
		}
	}
	var getFormatDate = function(type, dt){
		var str = '';
		var now = (dt === undefined) ? new Date() : dt;
		var y,m,d,h,i;
		y = now.getFullYear();
		m = now.getMonth()+1;
		d = now.getDate();
		h = now.getHours();
		i = now.getMinutes();
		if(m < 10){
			m = '0' + m;
		}
		if(d < 10){
			d = '0' + d;
		}
		if(h < 10){
			h = '0' + h;
		}
		if(i < 10){
			i = '0' + i;
		}
		switch(type){
			case 0:
				//YYYY-MM-DDoldback
				str = y + '-' + m +'-' + d;
				break;
			default:
				//YYYY-MM-DD hh:mm
				str = y + '-' + m +'-' + d + ' ' + h + ':' + i;
				break;
		}
		return str;
	}
	return {
		initTextareaCounting: initTextareaCounting,
		saveLocal : saveLocal,
		getLocal: getLocal,
		removeLocal: removeLocal,
		getFormatDate: getFormatDate
	}
})()
