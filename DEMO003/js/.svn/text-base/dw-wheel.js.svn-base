dw = (function() {
	var dwWheel = {};

	/**
	 * 在父节点的指定的子节点前插入新节点
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Object} num 子节点下标
	 */
	dwWheel.prependChild = function(child, num) {
		this[0].insertBefore(child, this[0].children[num || 0]);
	};

	/**
	 * 克隆要动态加载内容的节点
	 * @param {Object} ele  选择器名
	 * @param {Object} num	可选选择器下标
	 */
	dwWheel.cloneEleDom = function(num, ele) {
		var clone;
		if(this[0] == window) {
			clone = document.querySelectorAll(ele)[num || 0].cloneNode(true);
		} else {
			clone = this[num || 0].cloneNode(true);
		}

		return clone;
	}

	dwWheel.parent = function(ele) {
		if(this[0].parentElement.matches(ele)) {
			return mui(this[0].parentElement);
		} else {
			try {
				return mui(this[0].parentElement).parent(ele);
			} catch(e) {
				console.error('this has not parent "' + ele + '" !');
			}
		}
	}

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
		} else {
			this[0].classList.add(cls);
		}

	};

	dwWheel.removeClass = function(cls) {
		if(this.length && this.length > 1) {
			Array.prototype.forEach.call(this, function(val) {
				val.classList.remove(cls);
			});
		} else {
			this[0].classList.remove(cls);
		}
	};

	dwWheel.toggleClass = function(cls) {
		var cls = cls || "";
		if(cls.replace(/\s/g, "").length == 0) return false;
		if(this.length && this.length > 1) {
			Array.prototype.forEach.call(this, function(val) {
				val.classList.toggle(cls);
			});
		} else {
			this[0].classList.toggle(cls);
		}
	};

	//选择元素的下标  mui(ele).es(num);
	dwWheel.es = function(num) {
		num = parseInt(Number(num)) || 0;
		if(typeof num === "number" && num !== NaN) {
			return mui(this[num]);
		}
	};

	//转换成中文日期对象 date可选日期字符串
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

	//原生ajax
	dwWheel.dwajax = function(opt) {
		var lxhr = new XMLHttpRequest(),
			sendData = "";
		if(opt.params) {
			for(key in opt.params) {
				opt.url += key + '=' + opt.params[key];
			}
		}
		if(opt.data) {
			for(key in opt.data) {
				sendData += key + '=' + opt.data[key];
			}
		}
		lxhr.open(opt.type, opt.url);
		lxhr.withCredentials = true;
		lxhr.crossDomain = true;
		opt.beforeSend();
		if(opt.type.toLowerCase() == 'get') {
			lxhr.send();
		} else if(opt.type.toLowerCase() == 'post') {
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
			opt.endFn();
		}
	}

	//模版函数，生成模版并存储在函数内部对象内
	dwWheel.dwTemplate = (function() {
		var ele = {};

		//获取dom节点对象
		var getElement = function(idName) {
			return document.getElementById(idName) !== null ? document.getElementById(idName) : undefined;
		};

		//检查tpl-type的操作类型
		var checkType = function(key, str) {
			var str = str === null ? "" : str.split(" ");
			for(var i = 0, len = str.length; i < len; i++) {
				if(str[i] === key) {
					return true;
				}
			}
			return false;
		};

		//判断是否全局匹配
		var eachRegExp = function(typeStr, str) {
			if(checkType("each", typeStr)) {
				return new RegExp("\\{\\{" + str + "\\}\\}", "g");
			}
			return new RegExp("\\{\\{" + str + "\\}\\}");
		};

		//数组去重
		var regsort = function(str) {
			var _str = [];

			str.forEach(function(val) {
				_str.length === 0 && _str.push(val);
				if(val.indexOf(_str) === -1) {
					_str.push(val);
				}
			});
			return _str;
		};

		//获取对象中对应的值
		var regObj = function(obj, str) {
			if(str == undefined) {
				return undefined;
			} else if(str.indexOf('.') !== 0) {
				return objGetself(obj, str.split('.'));
			} else {
				return obj[str];
			}
		};

		//循环获取对象的属性对象的属性
		var objGetself = function(obj, arr) {
			arr.forEach(function(val) {
				if(!obj[val]) {
					return obj = "";
				}

				obj = obj[val];
			});
			return obj;
		};

		//替换自定义属性内容
		var dwBind = function(ele, type) {
			var virtualDom = document.createElement('div'),
				qsList = [];
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
			return virtualDom.innerHTML;
		};

		//遍历替换自定义属性
		var allBind = function(ele) {
			var tranDom = ele,
				arg = arguments;
			for(var i = 1, len = arg.length; i < len; i++) {
				tranDom = dwBind(tranDom, arg[i]);
			}

			return tranDom;
		}

		//替换$value的值
		var applyDom = function(applyObj) {

			var _domstr = applyObj.domstr,
				_content = applyObj.content,
				_domtype = applyObj.domtype,
				_eachLen = applyObj.eachRegArr.length,
				_eachRegArr = regsort(applyObj.eachRegArr);

			//遍历匹配的键名，替换内容
			for(var i = 0, len = _eachLen; i < len; i++) {
				_domstr = _domstr.replace(eachRegExp(_domtype, _eachRegArr[i]), regObj(_content, _eachRegArr[i]));
			}

			_domstr = _domstr.replace(/\{\{(\.*\w*)*\}\}|undefined/g, "");

			return _domstr;
		};

		var setTemp = function(obj, data) {
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
		};

		return function(name, data, flag) {

			var elem = getElement(name);

			if(name in ele && elem !== null && elem !== undefined) {
				throw new Error(name + "模版已存在，请更改名称！");

			} else if(!(name in ele) && elem !== undefined) {
				var idReg = new RegExp('(\\sid="' + name + '")'),
					tplReg = new RegExp('\\stpl-type="' + elem.getAttribute("tpl-type") + '"'),
					eleOuterHtml = allBind(elem.outerHTML, 'dw-bind', 'dw-form').replace(idReg, "").replace(tplReg, "");
				ele[name] = {
					elemDom: eleOuterHtml,
					type: elem.getAttribute("tpl-type")
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

mui = (function($, undefined) {

	$.fn = $.extend(dw, $.fn);

	return $;

})(mui);