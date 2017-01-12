function SeatManagementPage() {
	this.name = "table-manager-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getSeatMangementPage.do", "GET", callback);
}

SeatManagementPage.prototype.requestItems = function(requestCallBack) {
	var thiz = this;
	var callback = function(seatTables) {
		if (seatTables.length > 1) {
			seatTables.sort(function(a, b){
				return a.id - b.id;
			});
		}
		thiz.seatTables = seatTables;
		if(requestCallBack) requestCallBack();
	}
	serverReport.getJson("/searchTable.do", "GET",
			callback, {
				"floor" : -1,
				"room" : "",
				"capacity" : -1,
				"onDesk" : ""
	});
}

SeatManagementPage.prototype.initItemForSelect = function() {
	var f = this.pageContainer.querySelector("#floor");
	var c = this.pageContainer.querySelector("#capacity");
	
	var floorCount = new Array();
	var capacityCount = new Array();
	for (var i = 0; i < this.seatTables.length; i++) {
		var seat = this.seatTables[i];
		if (floorCount.indexOf(seat.floor) < 0) floorCount.push(seat.floor);
		if (capacityCount.indexOf(seat.capacity) < 0) capacityCount.push(seat.capacity);
	}
	floorCount.sort();
	capacityCount.sort(function(a, b){return a-b});
	for (var i = 0; i < Math.max(floorCount.length, capacityCount.length); i++) {
		var index = i;
		if (i < floorCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : floorCount[index],
				_text : floorCount[index]
			});
			f.appendChild(option);
		}
		if (i < capacityCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : capacityCount[index],
				_text : capacityCount[index]
			});
			c.appendChild(option);
		}
	}
}

SeatManagementPage.prototype.init = function(){
	var thiz = this;
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	var renderAction = function(seat) {
		var button = Dom.newDOMElement({
			_name : "i",
			class : "material-icons md-dark md-18",
			_text : "mode_edit",
			title : "Chỉnh sửa"
		});
		button.action = function() {
			var callback = function(newItem) {
				var oldItem = handleItem.data;
				thiz.onUpdateItem(oldItem, newItem);
			}
			var dialog = new AddTableDialog(seat, callback);
			dialog.show();
		}
		return new Array(button);
	}
	var theader = [
		{
			"column" : "Phòng",
			"label" : "room"
		},
		{
			"column" : "Lầu",
			"label" : "floor"
		},
		{
			"column" : "Chỗ ngồi",
			"label" : "capacity"
		},
		{
			"column" : "Ghi chú",
			"label" : "description"
		},
		{
			"column" : "Ưu tiên",
			"label" : "priority"
		},
		{
			"column" : "Tình trạng",
			"label" : "onDesk"
		}];
	this.table = new Table();
	this.table.init(theader, renderAction);
	this.table.renderBackground = function(item) {
		return item.onDesk =='t';
	}
	this.containerPanel.appendChild(this.table.getTable());
	
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	
	var thiz = this;
	this.searchButton.addEventListener("click", function(ev) {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, false);

	this.contextMenu = new ContextMenu();
	this.seatTables = new Array();
	var requestCallBack = function() {
		thiz.initItemForSelect();
		thiz.table.render(thiz.seatTables);
	}
	this.requestItems(requestCallBack);
	this.contextMenu.init([
			{
				name : "Thêm mới",
				handler : function(handleItem) {
					var callback = function(newItem) {
						if (newItem) {
							thiz.onCreateItem(newItem);
						}
					}
					var dialog = new AddTableDialog(null, callback);
					dialog.show();
				}
			},
			{
				name : "Chỉnh sửa",
				handler : function(handleItem) {
					var callback = function(newItem) {
						var oldItem = handleItem.data;
						thiz.onUpdateItem(oldItem, newItem);
					}
					var dialog = new AddTableDialog(handleItem.data, callback);
					dialog.show();
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
		var callback = function(newItem) {
			if (newItem) {
				thiz.onCreateItem(newItem);
			}
		}
		var dialog = new AddTableDialog(null, callback);
		dialog.show();
	});
	
}

SeatManagementPage.prototype.onSearch = function() {
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	
	var floor = f.options[f.selectedIndex].value;
	var room = r.value
	var capacity = c.options[c.selectedIndex].value;
	
	if (floor == -1 && room == "" && capacity == -1) return this.seatTables;
	
	var result = new Array();
	var thiz = this;
	this.seatTables.forEach(function(seat){
		if ((floor == -1 || seat.floor == floor)
			&& (room == "" || seat.room.toUpperCase().indexOf(room.toUpperCase()) > -1 )
			&& (capacity == -1 || seat.capacity <= capacity ))
				result.push(seat);
	});
	return result;
}

SeatManagementPage.prototype.onCreateItem = function(newItem) {
	if (newItem != null) {
		this.seatTables.push(newItem);
		var thiz = this;
		window.setTimeout(function() {
			var result = thiz.onSearch();
			thiz.table.render(result);
		}, 100);
	}
}

SeatManagementPage.prototype.onUpdateItem = function(oldItem, newItem) {
	var index = this.seatTables.indexOf(oldItem);
	if (index == -1) return;
	this.seatTables[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 10);
}

SeatManagementPage.prototype.getPageContainer = function() {
	var thiz = this;
	this.requestItems(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	});
	return this.pageContainer;
}
