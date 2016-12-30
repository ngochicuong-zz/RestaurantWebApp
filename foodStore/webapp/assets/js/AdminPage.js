function AdminPage() {
	this.name = "admin-page";
	
	this.pageContainer = Dom.newDOMElement({
		_name : "hbox",
		id : "pageContainer",
		flex: "1"
	});
	
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
//		thiz.init();
	}
	serverReport.getHTML("/getAdminPage.do", "GET", callback);
	
}

AdminPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}