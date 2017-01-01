function SeatManagementPage() {
	this.name = "table-manager-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		id : "     ",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getSeatMangementPage.do", "GET", callback);
}

SeatManagementPage.prototype.init = function(){
	var thiz = this;
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	var theader = new Array("id", "room", "floor", "capacity", "description",
			"priority", "onDesk");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	this.searchButton.addEventListener("click", function(ev) {
		thiz.reloadPage();
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Add",
				handler : function(handleItem) {
					var dialog = new AddTableDialog();
					dialog.show();
				}
			},
			{
				name : "Edit",
				handler : function(handleItem) {
					var callback = function() {
						window.setTimeout(function() {
							thiz.reloadPage();
						}, 100)
					}
					var dialog = new AddTableDialog(handleItem.data, callback);
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
	
	this.addButton.addEventListener("click", function() {
		var dialog = new AddTableDialog();
		dialog.show();
	});
	
}

SeatManagementPage.prototype.reloadPage = function() {
	var thiz = this;
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	var floor = f.options[f.selectedIndex].value;
	var room = r.options[r.selectedIndex].value;
	var capacity = c.options[c.selectedIndex].value;

	console.log("Search button click.... ");

	var callback = function(seats) {
		thiz.table.render(seats);
	}
	serverReport.getJson("/searchTable.do", "GET",
			callback, {
				"floor" : floor,
				"room" : room,
				"capacity" : capacity,
				"onDesk" : ""
	});
}

SeatManagementPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
