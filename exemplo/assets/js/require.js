var require = {
	scriptMap: {},
	import: function(url, opcoes) {
		var options = Object.assign({}, {async: false, inline: true, logLoaded: false }, opcoes );
		var listnerAllLoadeds = [];
		var ext = url.split('.');
		 	ext = ext[ext.length-1];
		if (typeof require.scriptMap[url] == "object") {
			if (require.scriptMap[url].js.length > 0) {
				require.scriptMap[url].js.forEach(function(a) {
					require.insertjs(a, options);
				});
				require.scriptMap[url].css.forEach(function(a) {
					require.insertcss(a, options);
				});
			}
		} else {
			if(ext=='js'){
				require.insertjs(url, options);
			}else if(ext=='css'){
				require.insertcss(url, options);
			}
		}
	},
	insertcss: function(url, options) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, options.async == false ? false : true);

		xmlhttp.onload = function(xhr) {
			if (xhr.target.status >= 200 && xhr.target.status < 300) {
				var style = document.querySelector('link[href="' + url + '"]');

				if (style != null) {style.remove();}
				var s           = document.getElementsByTagName("head")[0];
				var getHeadTag  = document.getElementsByTagName("head")[0];
				var style       = document.createElement("link");
				style.setAttribute("required", true);
				style.setAttribute("rel", "stylesheet");
				style.setAttribute("type", "text/css");
				
				if(options.inline==true){
					style.setAttribute("path", url);
					var inlineCode = document.createTextNode(xhr.target.response);
					style.appendChild(inlineCode);
					getHeadTag.appendChild(style);
				}else{
					style.href      = url;
					getHeadTag.appendChild(style);
				}


				if (options.logLoaded == true) {
					console.info("import inline:", url);
				}
			} else {
				console.log(xhr);
			}
		};

		xmlhttp.onerror = function(xhr) {
			console.log(xhr.target.statusText);
		};

		xmlhttp.send();
	},
	insertjs: function(url, options) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, options.async == false ? false : true);
		xmlhttp.onload = function(xhr) {
			if (xhr.target.status >= 200 && xhr.target.status < 300) {
				var scritp = document.querySelector('script[path="' + url + '"]');
				if (scritp != null) {
					scritp.remove();
				}
				var scriptElm = document.createElement("script");

				if (options.logLoaded == true) {
					var inlineCode = document.createTextNode(
						xhr.target.response + "\n\n\nconsole.info('import inline:','" + url + "')"
					);
				} else {
					var inlineCode = document.createTextNode(xhr.target.response);
				}

				var getHeadTag = document.getElementsByTagName("head")[0];
				scriptElm.setAttribute("required", true);
				scriptElm.setAttribute("async", true);
				scriptElm.setAttribute("path", url);
				scriptElm.appendChild(inlineCode);
				getHeadTag.appendChild(scriptElm);
			} else {
				console.log(xhr);
			}
		};

		xmlhttp.onerror = function(xhr) {
			console.log(xhr.target.statusText);
		};

		xmlhttp.send();
	},
	export: function(object, aliase) {
		if (aliase == "scriptMap" || aliase == "insertjs" || aliase == "insertcss" || aliase == "export" || aliase == "import") {
			console.error('O nome "' + aliase + '" é nativo da classe require.js');
			return false;
		} else if (typeof require[aliase] != "undefined") {
			console.warn("O nome " + aliase + " já existe e foi substituido");
			require[aliase] = object;
			return;
		} else {
			require[aliase] = object;
			return;
		}
	},
	setup: function(path) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET",path,false);
		xmlhttp.onload = function(xhr) {
			require.scriptMap = JSON.parse(xhr.target.responseText);
		};
		xmlhttp.onerror = function(xhr) {
			console.error(xhr.target.statusText);
		};
		xmlhttp.send();
	}
};