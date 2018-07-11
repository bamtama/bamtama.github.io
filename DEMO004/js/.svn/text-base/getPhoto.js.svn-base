var getPhoto = (function() {
	var gp = {
		IMAGE_OBJ: {
			length: 0
		},
		IMG_ID: 0
	};

	function getIOS(getFilesObj) {
		return function() {
			if(getPhoto.IMAGE_OBJ.length === 5) return mui.toast('可上传图片上限为5张！', 2000);

			function iosGF(fiels, fun) {
				var _files = fiels,
					len = _files.length,
					i = 0,
					imageUrl = {},
					fnAI = fun;

				if(len == 0) {
					return;
				} else if(len + gp.IMAGE_OBJ.length > 5) {
					return mui.toast('可上传图片上限为5张！', 2000);
				}

				function setImg(fil) {

					var fl = fil,
						reader = new FileReader(),
						imgName = fl.name + gp.IMG_ID++;

					gp.IMAGE_OBJ[imgName] = fl;
					gp.IMAGE_OBJ.length++;

					reader.onload = function(e) {
						var fd = e;

						i++;
						imageUrl[imgName] = fd.target.result;

					}

					reader.onloadend = function() {
						if(i < len) {
							setImg(_files[i]);
						} else {

							fnAI(imageUrl);
						}
					}
					reader.readAsDataURL(fl);
				}
				setImg(_files[i]);
			}

			var fileDom = mui(getFilesObj.domID)[0],
				callBackFuntion = getFilesObj.callbackfn;

			fileDom.onchange = function(e) {
				var _files = this.files;
				iosGF(_files, callBackFuntion);
			};

			fileDom.click();
		};
	}

	function andGF() {
		//添加按钮层
		function addBtn() {
			var itools = mui('.image-tools');

			if(!!itools.length) {
				itools.removeClass('mui-hidden');
				return;
			} else {
				var createDom = document.createElement('div');
				createDom.className = 'image-tools';
				createDom.innerHTML = '<div class="itBtn-wrap"><button class="mui-btn-block image-tools-btn" type="camera">拍照</button><button class="mui-btn-block image-tools-btn" type="album">打开手机相册</button><button class="mui-btn-block image-tools-btn" style="margin-top: 20px;" type="cancel">取消</button></div>';

				mui('body')[0].appendChild(createDom);

				bindToolsBtn();
			}
		}

		//绑定按钮事件
		function bindToolsBtn() {

			//取消选择
			function cancel() {
				/*gp.andSP('[{"base": "123","url": "C:/Users/archer/Pictures/Saved Pictures/afde6141392945c7e45325645b44c672.png"},{"base": "123","url": "C:/Users/archer/Pictures/Saved Pictures/afde6141392945c7e45325645b44c672.png"}]');*/
			}

			//调用安卓拍照
			function camera() {

				window.androidShare.take_photo();
			}

			//调用安卓系统相册
			function album() {
				window.androidShare.choose_photo();
			}

			mui('.itBtn-wrap').on('tap', 'button', function(e) {
				var type = this.getAttribute('type');

				var itools = mui('.image-tools');
				itools.addClass('mui-hidden'); //隐藏按钮层

				switch(type) {
					case 'camera':
						camera();
						break;
					case 'album':
						album();
						break;
					case 'cancel':
						cancel();
						break;
				}

			});
		}

		addBtn();
	}

	gp.getFiles = function(getFilesObj) {

		if(dw.getOS() === 'ios') {
			return getIOS(getFilesObj);
		} else if(dw.getOS() === 'android') {
			gp.CALLBACK = getFilesObj.callbackfn;
			return andGF;
		}

	};

	//安卓系统获取图片后调用的回调函数
	gp.andSP = function(Arr) {

		try {
			var arr = JSON.parse(Arr),
				len = arr.length,
				imageUrl = {},
				_addFn = gp.CALLBACK;

			if(len + gp.IMAGE_OBJ.length > 5) {
				return mui.toast('可上传图片上限为5张！', 2000);
			}

			for(var i = 0; i < len; i++) {
				var _url = arr[i].url,
					_base = arr[i].base,
					_name = _url.substr(_url.lastIndexOf('/') + 1);
					
				imageUrl[_name + gp.IMG_ID] = _url;
				gp.IMAGE_OBJ[_name + gp.IMG_ID++] = {
					base: _base,
					name: _name
				};
				gp.IMAGE_OBJ.length++;
				
			}
			_addFn(imageUrl);

		} catch(e) {
			mui.alert(e.message);
		}
	}

	gp.setFormData = function(data) {
		var _data = data,
			fd = new FormData(),
			OS = dw.getOS();

		//页面表单内容放入FormData
		for(var _key in _data) {
			fd.append(_key, _data[_key]);
		}

		if(OS === 'ios') {

			//File对象放入FormData
			for(var fileObj in gp.IMAGE_OBJ) {
				if(fileObj !== 'length') {
					fd.append(gp.IMAGE_OBJ[fileObj].name, gp.IMAGE_OBJ[fileObj]);
				}
			}

			return fd;

		} else if(OS === 'android') {

			//将Base64转换为File对象
			function andAddfile(img) {
				var _img = img,
					_url = _img.base,
					_name = _img.name,
					_type = _name.substr(_name.lastIndexOf('.') + 1);

				var arr = _url.split(','),
					bstr = atob(arr[1]), //二进制编码
					n = bstr.length,
					u8arr = new Uint8Array(n); //8 位无符号整数值的类型化数组

				while(n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}

				var setfile = new File([u8arr], _name, {
					type: _type
				}); //将Blob对象放入新建File对象中，

				return setfile;
			}

			//File对象放入FormData
			for(var _key in gp.IMAGE_OBJ) {
				if(_key !== 'length') {
					var imsrc = gp.IMAGE_OBJ[_key];
					var _file = andAddfile(imsrc);

					fd.append(_key, _file);
				}

			}

			return fd;
		}
	};

	return gp;
})();