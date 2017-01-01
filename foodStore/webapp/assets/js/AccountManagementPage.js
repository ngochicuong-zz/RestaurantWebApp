function AccountManagementPage() {
	this.name = "account-manager-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		id : "",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getAccountManagementPage.do", "GET", callback);
}

AccountManagementPage.prototype.init = function(){
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.accountName = this.pageContainer.querySelector("#account-name");
	var thiz = this;
	var theader = new Array("user", "pass", "email", "role",
			"lastSignInAt", "actived", "online");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	
	this.searchButton.addEventListener("click", function(ev) {
		thiz.reloadPage();
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Add",
				handler : function(handleItem) {
					var dialog = new AddAccountDialog();
					dialog.show();
				}
			},
			{
				name : "Edit",
				handler : function(handleItem) {
					var callback = function() {
						window.setTimeout(function() {
							thiz.reloadPage();
						}, 100);
					}
					var dialog = new AddAccountDialog(handleItem.data, callback);
					dialog.show();
//				
			}
			} ]);
	this.table.tableBody.addEventListener("contextmenu", function(e) {
		var target = e.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (dataNode != null) {
			e.dataNode = dataNode;
			thiz.contextMenu.toggleMenuOn(e);
		}
	});
}

AccountManagementPage.prototype.reloadPage = function() {
	var thiz = this;
	var callback = function(accounts) {
		thiz.table.render(accounts);
	}
	serverReport.getJson("/getAccounts.do", "POST", callback, {
		"user" : thiz.accountName.value
	});
}

AccountManagementPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
