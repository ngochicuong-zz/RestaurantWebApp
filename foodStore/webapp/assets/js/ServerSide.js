function serverReport() {};

serverReport.getHTML = function(patent, method, callback, params) {
	serverReport.sendRequest(patent, method, callback, params);
}

serverReport.getBoolean = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		if (callback) callback(responseText == "true" ? true : false);
	}
	serverReport.sendRequest(patent, method, callBack, params);
}

serverReport.getJson = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		var json = null;
		if (responseText != null) 
			json = JSON.parse(responseText);
		if (callback) callback(json);
	}
	serverReport.sendRequest(patent, method, callBack, params);
}

serverReport.sendRequest = function(patent, method, callBack, params) {
	var app = App.modun;
	app.controller("main-ctrl", function($scope,$http) {
		if (method == "POST") {
			$http({
			    url: patent,
			    method: method,
			    data: $httpParamSerializerJQLike(params),
			    headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    }
			  }).then(function successCallback(response) {
				  if (callBack) callBack(response.data);
			  });
		} else {
			$http({
				  url: patent,
				  method: method,
				  params: params,
				  paramSerializer: '$httpParamSerializerJQLike'
				}).then(function successCallback(response) {
					  if (callBack) callBack(response.data);
				});
		}
	});
//	var paramString = null;
//	if (params != null) {
//		paramString = serverReport.encodeQueryData(params);
//		console.log(paramString);
//	}
//	
//	var xhttp;
//	xhttp = new XMLHttpRequest();
//	xhttp.onreadystatechange = function() {
//		if (this.readyState == 4 && this.status == 200) {
//			if (callBack) {
//				callBack(decodeURIComponent(this.responseText));
//			}
//		}
//	};
//	if (method == "POST"){
//		xhttp.open(method, patent, true);
//		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
//		if (paramString != null) xhttp.send(paramString);
//		else xhttp.send();
//	} else {
//		xhttp.open(method, patent + (paramString != null ? "?" + paramString : ""), true);
//		xhttp.send();
//	}
	
}

serverReport.encodeQueryData = function(data) {
	   let ret = [];
	   for (let d in data)
	     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   return ret.join('&');
	}
