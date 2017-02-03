function BusyHandler() {
	
}

BusyHandler.page = Dom.newDOMElement({
	_name: "vbox",
	id: "loader-wrapper",
	_children: [
		{
			_name: "img",
			src: "webapp/assets/img/backgrounds/loading.jpg",
			style: "position: absolute; width: 100%; height: 100%; -webkit-filter: blur(5px); filter: blur(5px);"
		},
		{
			_name: "vbox",
			id: "loader",
		}
	]
});

BusyHandler.wattingPage = Dom.newDOMElement({
	_name: "vbox",
	id: "loader-wrapper",
	style: "cursor:wait;  opacity: 0;"
});
BusyHandler.busy = function() {
	document.body.appendChild(BusyHandler.wattingPage);
}

BusyHandler.unBusy = function() {
	document.body.removeChild(BusyHandler.wattingPage);
}

BusyHandler.loadding = function() {
	document.body.appendChild(BusyHandler.page);
}

BusyHandler.unLoadding = function() {
	var thiz = this;
	window.setTimeout(function() {
		document.body.removeChild(BusyHandler.page);
	}, 1000)
}