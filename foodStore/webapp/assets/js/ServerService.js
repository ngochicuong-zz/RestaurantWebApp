function ServerService($http) {
	this.$http = $http;
	this.name = "server-service";
};

ServerService.prototype.getHTML = function(patent, method, callback, params) {
	this.sendRequest(patent, method, callback, params);
}

ServerService.prototype.getBoolean = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		if (callback) callback(responseText == "true" ? true : false);
	}
	this.sendRequest(patent, method, callBack, params);
}

ServerService.prototype.getJson = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		var json = null;
		if (responseText != null) 
			json = JSON.parse(responseText);
		if (callback) callback(json);
	}
	this.sendRequest(patent, method, callBack, params);
}

ServerService.prototype.sendRequest = function(patent, method, callBack, params) {
	if (method == "POST") {
		this.$http({
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
		this.$http({
			  url: patent,
			  method: method,
			  params: params,
			  paramSerializer: '$httpParamSerializerJQLike'
			}).then(function successCallback(response) {
				  if (callBack) callBack(response.data);
			});
	}
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

ServerService.encodeQueryData = function(data) {
	   let ret = [];
	   for (let d in data)
	     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   return ret.join('&');
	}
