function serverReport() {};

serverReport.getHTML = function(patent, method, callback) {
	serverReport.sendRequest(patent, method, callback);
}

serverReport.getBoolean = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		callback(responseText == "true" ? true : false);
	}
	serverReport.sendRequest(patent, method, callBack, params);
}

serverReport.getJson = function(patent, method, callback, params) {
	var callBack = function(responseText) {
		var json = null;
		if (responseText != null) 
			json = JSON.parse(responseText);
		callback(json);
	}
	serverReport.sendRequest(patent, method, callBack, params);
}

serverReport.sendRequest = function(patent, method, callBack, params) {
	var paramString = null;
	if (params != null) {
		paramString = serverReport.encodeQueryData(params);
		console.log(paramString);
	}
	
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (callBack != null) {
				callBack(this.responseText);
			}
		}
	};
	if (method == "POST"){
		xhttp.open(method, patent, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (paramString != null) xhttp.send(paramString);
	} else {
		xhttp.open(method, patent + (paramString != null ? "?" + paramString : ""), true);
		xhttp.send();
	}
	
}

serverReport.encodeQueryData = function(data) {
	   let ret = [];
	   for (let d in data)
	     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
	   return ret.join('&');
	}
