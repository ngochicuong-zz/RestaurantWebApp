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
		thiz.init();
	}
	serverReport.getHTML("/getAdminPage.do", "GET", callback);
	
}

AdminPage.prototype.init = function() {
	this.container = this.pageContainer.querySelector("#container");
	
	var thiz = this;
	this.pageContainer.addEventListener("click", function(event){
		var target = event.target;
		var pageNode = Dom.findUpward(target, {
			eval: function(node) {
				return typeof(node.getAttribute) == "function" && node.getAttribute("page-name") != null;
			}
		}); 
		if (!pageNode) return;
		var page = Main.pageManagement.pages[pageNode.getAttribute("page-name")];
		if (!page) return;
		thiz.container.innerHTML = "";
		thiz.container.appendChild(page.getPageContainer())
	}, false);
	
}

AdminPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}