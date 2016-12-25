function serverReport() {};

serverReport.getHTML = function(patent, method, callback) {
	serverReport.sendRequest(patent, method, callback);
}

serverReport.getBoolean = function(patent, method, callback) {
	var callBack = function(responseText) {
		callback(responseText == "true" ? true : false);
	}
	serverReport.sendRequest(patent, method, callBack);
}

serverReport.getJson = function(patent, method, callback) {
	var callBack = function(responseText) {
		var json = null;
		if (responseText != null) 
			json = JSON.parse(responseText);
		callback(json);
	}
	serverReport.sendRequest(patent, method, callBack);
}

serverReport.sendRequest = function(patent, method, callBack) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (callBack != null) {
				callBack(this.responseText);
			}
		}
	};
	xhttp.open(method, patent, true);
	xhttp.send();
}
