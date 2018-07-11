/*dw-wheel.js@2.1.4*/

var dw = (function(undefined) {
	var dwWheel = {};

	/**
	 * 判断对象是否节点对象
	 * @param {Object} obj 
	 */
	dwWheel.isDom = (typeof HTMLElement === 'object') ? function(obj) {
		return obj instanceof HTMLElement;
	} : function(obj) {
		return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	};

	/**
	 * 在父节点的指定的子节点前插入新节点
	 * @param {Object} child
	 * @param {Number} num 子节点下标
	 */
	dwWheel.prependChild = function(child, num) {
		this[0].insertBefore(child, this[0].childNodes[num || 0]);
		return this;
	};

	/**
	 * 克隆要动态加载内容的节点
	 * @param {String} ele  选择器名
	 * @param {Number} num	可选选择器下标
	 */
	dwWheel.cloneEleDom = function(ele, num) {
		var clone;
		if(this[0] == window) {
			clone = document.querySelectorAll(ele)[num || 0].cloneNode(true);
		} else {
			clone = this[num || 0].cloneNode(true);
		}

		return clone;
	};

	/**
	 * 只传一个参数，则为所找父元素标签名称或id或类名，默认当前this为操作对象；
	 * 传两个参数，第一个为当前元素dom对象，第二个为所找父元素标签名称或id或类名
	 */
	dwWheel.parent = function() {
		var arg = arguments,
			eleStr = arg[0],
			dom = this;
		if(arg.length > 1) {
			dom = arg[1];
			if(dom.parentElement.matches(eleStr)) {
				return dom.parentElement;
			} else {
				try {
					return dwWheel.parent(eleStr, dom.parentElement);
				} catch(e) {
					console.error(e.message);
				}
			}

		} else {
			if(dom[0].parentElement.matches(eleStr)) {
				return mui(dom[0].parentElement);
			} else {
				try {
					return mui(dom[0].parentElement).parent(eleStr);
				} catch(e) {
					console.error(e.message);
				}
			}
		}

	};

	/**
	 * class操作
	 * @param {String} cls 元素名称 
	 */
	dwWheel.hasClass = function(cls) {
		if(cls.replace(/\s/g, "").length == 0) return false;
		return !!this[0].className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
	};

	dwWheel.addClass = function(cls) {
		var cls = cls || "";
		if(cls.replace(/\s/g, "").length == 0) return false;

		if(this.length && this.length > 1) {
			Array.prototype.forEach.call(this, function(val) {
				val.classList.add(cls);
			});

			return this.es(0);
		} else {
			this[0].classList.add(cls);
			return this;
		}
	};

	dwWheel.removeClass = function(cls) {
		if(this.length && this.length > 1) {
			Array.prototype.forEach.call(this, function(val) {
				val.classList.remove(cls);
			});

			return this.es(0);
		} else {
			this[0].classList.remove(cls);
			return this;
		}
	};

	dwWheel.toggleClass = function(cls) {
		var cls = cls || "";
		if(cls.replace(/\s/g, "").length == 0) return false;
		if(this.length && this.length > 1) {
			Array.prototype.forEach.call(this, function(val) {
				val.classList.toggle(cls);
			});

			return this.es(0);
		} else {
			this[0].classList.toggle(cls);
			return this;
		}
	};

	/**
	 * 
	 * @param {String} ele 选择器名
	 * @param {Object} cssObj	style样式对象	ex:{'color':'red'} 
	 * @param {Boolean} all 是否全局修改，缺省值为false,ture为全局修改
	 */
	dwWheel.css = function() {

		var checkName = function(str) {
			if((/-/).test(str)) {
				var ind = str.indexOf('-'),
					upper = str.substr(ind + 1, 1).toUpperCase();
				str = str.replace('-', '');
				str = str.substring(0, ind) + upper + str.substring(ind + 1);
				return str;
			}
			return str;
		};

		var arg = arguments;

		if(typeof arg[0] === 'string') {
			var ele = arg[0],
				cssObj = arg[1],
				all = arg[2] ? arg[2] : false,
				eleList = document.querySelectorAll(ele),
				eleLen = eleList.length,
				elem = document.querySelector(ele);
		} else {
			var cssObj = arg[0],
				all = arg[1] ? arg[1] : false,
				eleList = this,
				eleLen = this.length,
				elem = this[0];
		}

		for(val in cssObj) {
			if(all && eleLen > 1) {

				for(var i = 0, len = eleLen; i < len; i++) {
					eleList[i].style[checkName(val)] = cssObj[val];
				}

			} else {
				elem.style[checkName(val)] = cssObj[val];
			}
		}
	};

	/**
	 * 获取浏览器类型
	 */
	dwWheel.getExplore = function() {
		var sys = {},
			ua = navigator.userAgent.toLowerCase(),
			s;

		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
			(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
			(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
			(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
			(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
			(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
			(s = ua.match(/version\/([\d\.]+).safari/)) ? sys.safari = s[1] : 0;

		if(sys.ie) return('IE' + sys.ie)
		if(sys.edge) return('EDGE' + sys.edge)
		if(sys.firefox) return('Firefox' + sys.firefox)
		if(sys.opera) return('Opera' + sys.opera)
		if(sys.chrome) return('Chrome' + sys.chrome)
		if(sys.safari) return('Safari' + sys.safari)
		return 'Unkonwn';

	};

	/**
	 * 获取系统类型
	 */
	dwWheel.getOS = function() {
		var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
		var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
		var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

		if(/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
		if(/android/i.test(userAgent)) return 'android';
		if(/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
		if(/mac/i.test(appVersion)) return 'MacOSX';
		if(/win/i.test(appVersion)) return 'windows';
		if(/linux/i.test(appVersion)) return 'linux';

	}

	/**
	 * 选择元素的下标,返回对应的节点对象  mui(ele).es(num)
	 * @param {Number} num
	 */
	dwWheel.es = function(num) {
		num = parseInt(Number(num)) || 0;
		if(typeof num === "number" && num !== NaN) {
			return mui(this[num]);
		}
	};

	//克隆对象或数组
	dwWheel.cloneObj = (function() {
		function copyObject() {
			var option, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
				length = arguments.length,
				i = 1,
				deep = false;

			/*判断第一个参数是否布尔值，
			 如果是赋值deep代表深复制，
			 然后将target移到arguments的第二个值*/
			if(typeof target === 'boolean') {
				deep = target;
				target = arguments[1];

				//i提升；
				i++;
			}

			/*判断target是否一个对象或数组或函数，
			 若不是则target设置为{}。*/
			if(typeof target !== 'object' && !(typeof target === 'function')) {
				target = {};
			}

			/*如果arguments.length == 1或
			typeof arguments[0] == 'boolean' 且  存在arguments[1]，
			此时不需要再循环复制了，target = arguments[1]*/
			if(i === length) {
				//i回退为0，不进入循环
				return target;

			}

			for(; i < length; i++) {
				// 针对下面if判断
				// 有一点需要注意的是
				// 这里有一个隐式强制类型转换 undefined == null 为 true
				// 而undefined === null 为 false
				// 所以如果源对象中数据类型为Undefined或Null
				// 那么就会跳过本次循环，接着循环下一个源对象
				if((option = arguments[i]) != null) {
					/*循环遍历源对象，
					如果源对象为Object、Array、String，则进入for in循环。*/
					for(name in option) {
						//src用于判断target对象是否存在name属性
						src = target[name];

						copy = option[name];

						if(target === src) {
							continue;
						}

						/*判断如果是深复制且copy是一个对象或者是数组，
						 则需要递归复制，
						 直到copy成为一个基础数据类型。*/
						copyIsArray = Array.isArray(copy);
						if(deep && copy && (typeof copy === 'object' || copyIsArray)) {
							//深复制

							if(copyIsArray) {
								//如果copy是数组，将copyIsArray重置为默认值
								copyIsArray = false;
								// 如果目标对象存在name属性且是一个数组
								// 则使用目标对象的name属性，否则重新创建一个数组，用于复制
								clone = src && Array.isArray(src) ? src : [];
							} else {
								// 如果目标对象存在name属性且是一个对象
								// 则使用目标对象的name属性，否则重新创建一个对象，用于复制
								clone = src && typeof src === 'object' ? src : {};

							}

							/*要深复制，要递归deepCopy,
							 返回值为target，即clone对象，
							 源对象是copy。*/
							target[name] = copyObject(deep, clone, copy);

						} else if(copy !== undefined) {
							//浅复制
							target[name] = copy;
						}
					}
				}
			}

			return target;
		}

		function assignObject() {
			var option, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
				length = arguments.length,
				i = 1,
				deep = false;

			/*判断第一个参数是否布尔值，
			 如果是赋值deep代表深复制，
			 然后将target移到arguments的第二个值*/
			if(typeof target === 'boolean') {
				deep = target;
				target = arguments[1];

				//i提升；
				i++;
			}

			/*判断target是否一个对象或数组或函数，
			 若不是则target设置为{}。*/
			if(typeof target !== 'object' && !(typeof target === 'function')) {
				target = {};
			}

			/*如果arguments.length == 1或
			typeof arguments[0] == 'boolean' 且  存在arguments[1]，
			此时不需要再循环复制了，target = arguments[1]*/
			if(i === length) {
				//i回退为0，不进入循环
				return target;

			}

			for(; i < length; i++) {
				if(deep) {
					copyObject(deep, target, arguments[i]);
				} else {
					Object.assign(target, arguments[i]);
				}

			}

			return target;
		}

		if(!Object.assign) {
			return assignObject;
		}

		return copyObject;
	})();

	/**
	 * 判断空对象
	 * @param {Object} obj
	 */
	dwWheel.isEmptyObj = function(obj) {
		if(!obj || typeof obj !== 'object' || Array.isArray(obj)) {
			return false;
		}
		return !Object.keys(obj).length;
	}

	/**
	 * 转换成中文日期对象
	 * @param {String} date 可选日期字符串
	 */
	dwWheel.transDate = function(date) {
		var dateobj = {},
			_getdate = date ? new Date(date) : new Date(),
			_day = ["日", "一", "二", "三", "四", "五", "六"];

		dateobj.day = "星期" + _day[_getdate.getDay()];
		dateobj.year = _getdate.getFullYear() + "年";
		dateobj.month = (_getdate.getMonth() + 1) + "月";
		dateobj.days = _getdate.getDate() + "日";
		dateobj.theDate = dateobj.year + dateobj.month + dateobj.days;

		return dateobj;
	};

	//检查并转换JSON格式
	dwWheel.parseJson = function(val) {
		return val && typeof val === "string" && (/{*}/g).test(val) ? JSON.parse(val) === "string" ? JSON.parse(val) : this.parseJson(JSON.parse(val)) : val;
	};

	dwWheel.debounce = function() {

	};

	//原生ajax
	dwWheel.dwajax = function(opt) {
		var lxhr = new XMLHttpRequest(),
			sendData = "";

		var ajaxToStr = function(ak) {
			var first = 0;
			if(ak == 'params') {
				for(key in opt[ak]) {
					if(first == 0) {
						first = 1;
						opt.url += '?' + key + '=' + opt[ak][key];

					} else {
						opt.url += '&' + key + '=' + opt[ak][key];
					}
				}
			} else if(ak == 'data') {
				for(key in opt[ak]) {
					if(first == 0) {
						first = 1;
						sendData += key + '=' + opt[ak][key];
					} else {
						sendData += '&' + key + '=' + opt[ak][key];
					}
				}
			} else {
				for(key in opt.params) {
					opt.url += '&' + key + '=' + opt.params[key];
				}
			}
		};

		if(opt.params) {
			if(opt.url.indexOf("?") > -1) {
				ajaxToStr();
			} else {
				ajaxToStr('params');
			}
		} else if(opt.data) {
			ajaxToStr('data');
		}

		lxhr.open(opt.type, opt.url);
		lxhr.withCredentials = true;
		lxhr.crossDomain = true;

		if(opt.beforeSend) {
			opt.beforeSend();
		}

		if(opt.type.toLowerCase() == 'get') {
			lxhr.send();
		} else if(opt.type.toLowerCase() == 'post') {
			if(opt.data) {
				lxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}

			lxhr.send(sendData);
		}

		lxhr.onreadystatechange = function() {
			if(lxhr.readyState == 4) {
				if(lxhr.status == 200) {
					opt.success(lxhr.responseText);

					lxhr = null;
				} else {
					if(opt.error) {
						opt.error();
					} else {
						alert(lxhr.status);
					}
				}
			}
			if(opt.endFn) {
				opt.endFn();
			}
		}
	}

	dwWheel.dwTemplate = (function() {
		var ele = {};

		//获取dom节点对象
		function getElement(idName) {
			return document.getElementById(idName) !== null ? document.getElementById(idName) : undefined;
		}

		//检查tpl-type的操作类型
		function checkType(key, str) {
			str = str.split(" ");
			for(var i = 0, len = str.length; i < len; i++) {
				if(str[i] === key) {
					return true;
				}
			}
			return false;
		}

		//判断是否全局匹配
		function eachRegExp(typeStr, str) {
			if(checkType("each", typeStr)) {
				return new RegExp("\\{\\{" + str + "\\}\\}", "g");
			}
			return new RegExp("\\{\\{" + str + "\\}\\}");
		}

		//数组去重
		function regsort(str) {
			var _str = [];

			str.forEach(function(val) {
				_str.length === 0 && _str.push(val);
				if(val.indexOf(_str) === -1) {
					_str.push(val);
				}
			});
			return _str;
		}

		//获取对象中对应的值
		function regObj(obj, str) {
			if(str == undefined) {
				return undefined;
			} else if(str.indexOf('.') !== 0) {
				return objGetself(obj, str.split('.'));
			} else {
				return obj[str];
			}
		}

		//循环获取对象的属性值
		function objGetself(obj, arr) {
			arr.forEach(function(val) {
				if(!obj[val]) {
					return obj = "";
				}

				obj = obj[val];
			});
			return obj;
		}

		//替换自定义属性内容
		function dwBind(ele, type) {
			var virtualDom = document.createElement('div'),
				qsList = [],
				vhtml;
			virtualDom.innerHTML = ele;
			qsList = virtualDom.querySelectorAll('[' + type + ']');
			if(qsList.length > 0) {
				switch(type) {
					case 'dw-bind':
						for(var i = 0, len = qsList.length; i < len; i++) {
							qsList[i].innerText = qsList[i].getAttribute(type);
							qsList[i].removeAttribute(type);
						}
						break;
					case 'dw-form':
						for(var i = 0, len = qsList.length; i < len; i++) {
							var val = qsList[i].getAttribute(type);
							qsList[i].setAttribute('value', val);
							qsList[i].removeAttribute(type);
						}
						break;
				}

			}

			vhtml = virtualDom.innerHTML;
			virtualDom = null;
			return vhtml;
		};

		//清除节点字符串中的bind属性
		function allBind(ele, bindArr) {
			var tranDom = ele,
				arg = bindArr;
			for(var i = 0, len = arg.length; i < len; i++) {
				tranDom = dwBind(tranDom, arg[i]);
			}

			return tranDom;
		}

		//替换$value的值
		function applyDom(applyObj) {

			var _domstr = applyObj.domstr,
				_content = applyObj.content,
				_domtype = applyObj.domtype,
				_eachLen = applyObj.eachRegArr.length,
				_eachRegArr = regsort(applyObj.eachRegArr);

			//遍历匹配的键名，替换内容
			for(var i = 0, len = _eachLen; i < len; i++) {
				_domstr = _domstr.replace(eachRegExp(_domtype, _eachRegArr[i]), regObj(_content, _eachRegArr[i]) || "");
			}

			_domstr = _domstr.replace(/\{\{(\.*\w*)*\}\}/g, "");

			return _domstr;
		}

		function setTemp(obj, data) {
			var domStr = obj.elemDom,
				domType = obj.type,
				reg = /\{\{(\.*\w*)*\}\}/g,
				replaceStr = domStr.match(reg),
				eachReg = /(\.*\w+)+/g,
				eachRegArr = replaceStr.map(function(val) {
					return val.match(eachReg)[0];
				}),
				_inner = data ? data : {},
				repDomStr = "";

			if(checkType("repeat", domType) && _inner instanceof Array) {

				for(var i = 0, len = _inner.length; i < len; i++) {

					repDomStr += applyDom({
						"domstr": domStr,
						"content": _inner[i],
						"domtype": domType,
						"eachRegArr": eachRegArr
					});
				}
			} else {
				repDomStr = applyDom({
					"domstr": domStr,
					"content": _inner,
					"domtype": domType,
					"eachRegArr": eachRegArr
				});
			}

			return repDomStr;
		}

		return function(name, data, flag) {

			var elem = getElement(name);

			if(name in ele && elem !== null && elem !== undefined) {
				throw new Error(name + "模版已存在，请更改名称！");

			} else if(!(name in ele) && elem !== undefined) {
				var idReg = new RegExp('\\sid="' + name + '"'),
					tplReg = new RegExp('\\stpl-type="' + elem.getAttribute("tpl-type") + '"'),
					eleOuterHtml = allBind(elem.outerHTML, ['dw-bind', 'dw-form']).replace(idReg, "").replace(tplReg, "");
				ele[name] = {
					elemDom: eleOuterHtml,
					type: elem.getAttribute("tpl-type") || 'each'
				};
				if(flag && flag === true) {
					elem.parentNode.removeChild(elem);
				}
			}

			return setTemp(ele[name], data);
		}
	})();

	return dwWheel;
})();

var mui = mui || "";
if(mui !== "") {
	mui = (function($, undefined) {

		$.fn = $.extend(dw, $.fn);

		return $;

	})(mui);
}