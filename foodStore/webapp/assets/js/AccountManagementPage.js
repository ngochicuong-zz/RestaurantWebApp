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

AccountManagementPage.prototype.requestItems = function(requestCallBack) {
	var thiz = this;
	var callback = function(accounts) {
		if (accounts.length > 1) {
			accounts.sort(function(a, b){
				return a.id - b.id;
			});
		}
		thiz.accounts = accounts;
		if(requestCallBack) requestCallBack();
	}
	serverReport.getJson("/getAccounts.do", "POST", callback);
}

AccountManagementPage.prototype.init = function(){
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.accountName = this.pageContainer.querySelector("#account-name");
	
	var theader = new Array("user", "pass", "email", "role", "lastSignInAt", "actived", "online");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	
	
	var thiz = this;
	var requestCallBack = function() {
		thiz.table.render(thiz.accounts);
	}
	this.accounts = new Array();
	this.requestItems(requestCallBack);
	this.contextMenu = new ContextMenu();
	this.contextMenu.init([
			{
				name : "Add",
				handler : function(handleItem) {
					var callback = function(newItem) {
						if (newItem) {
							thiz.onCreateItem(newItem);
						}
					}
					var dialog = new AddAccountDialog(null, callback);
					dialog.show();
				}
			},
			{
				name : "Edit",
				handler : function(handleItem) {
					var callback = function(newItem) {
						var oldItem = handleItem.data;
						thiz.onUpdateItem(oldItem, newItem);
					}
					var dialog = new AddAccountDialog(handleItem.data, callback);
					dialog.show();
				}
			},
			{
				name : "Deactive",
				handler : function(handleItem) {
					var account = handleItem.data;
					var callback = function(updated) {
						if (updated) {
							var newItem = {};
							newItem = account;
							newItem.actived = 'f';
							thiz.onUpdateItem(account, newItem);
						}
					}
					serverReport.getJson("/setActiveAccount.do", "GET", callback, {
						"userId" : account.id,
						"active" : false
					});
				},
				express: function() {
					if (thiz.contextMenu.handleItem == null) return false;
					var account = thiz.contextMenu.handleItem.data;
					if (!account) return false;
					if (account.actived == 't') return true;
					
				}
			},
			{
				name : "Active",
				handler : function(handleItem) {
					var account = handleItem.data;
					var callback = function(updated) {
						if (updated) {
							var newItem = {};
							newItem = account;
							newItem.actived = 't';
							thiz.onUpdateItem(account, newItem);
						}
					}
					serverReport.getJson("/setActiveAccount.do", "GET", callback, {
						"userId" : account.id,
						"active" : true
					});
				},
				express: function() {
					if (thiz.contextMenu.handleItem == null) return false;
					var account = thiz.contextMenu.handleItem.data;
					if (!account) return false;
					if (account.actived == 'f') return true;
					
				}
			}
		]);
	this.searchButton.addEventListener("click", function(ev) {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, false);
	
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
	
	this.addButton.addEventListener("click", function() {
		var callback = function(newItem) {
			if (newItem) {
				thiz.onCreateItem(newItem);
			}
		}
		var dialog = new AddAccountDialog(null, callback);
		dialog.show();
	})
}

AccountManagementPage.prototype.onSearch = function() {
	if (this.accountName.value == "") return this.accounts;
	var result = new Array();
	var thiz = this;
	this.accounts.forEach(function(account){
		if (account.user.indexOf(thiz.accountName.value) != -1) result.push(account);
	});
	return result;
}

AccountManagementPage.prototype.onUpdateItem = function(oldItem, newItem) {
	var index = this.accounts.indexOf(oldItem);
	if (index == -1) return;
	this.accounts[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 100);
}

AccountManagementPage.prototype.onCreateItem = function(newItem) {
	if (newItem != null) {
		this.accounts.push(newItem);
		var thiz = this;
		window.setTimeout(function() {
			thiz.accountName.value = "";
			var result = thiz.onSearch();
			thiz.table.render(result);
		}, 100);
	}
}

AccountManagementPage.prototype.getPageContainer = function() {
	var thiz = this;
	this.requestItems(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	});
	return this.pageContainer;
}
