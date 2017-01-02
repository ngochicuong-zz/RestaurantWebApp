function TablePage() {
	this.name = "table-page";
	this.seatStatus == null;
	this.pageContainer = Dom.newDOMElement({
		_name : "hbox",
		id : "     ",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getTablePage.do", "GET", callback);
}

TablePage.prototype.requestItems = function(requestCallBack) {
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
				"room" : -1,
				"capacity" : -1,
				"onDesk" : ""
	});
}

TablePage.prototype.init = function(){
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	var theader = new Array("room", "floor", "capacity", "description",
			"priority", "onDesk");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	this.searchButton = this.pageContainer.querySelector("#search-button");
	
	var thiz = this;
	var requestCallBack = function() {
		thiz.initItemForSelect();
		thiz.table.render(thiz.seatTables);
	}
	this.seatTables = new Array();
	this.requestItems(requestCallBack);
	
	this.searchButton.addEventListener("click", function(ev) {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Make order",
				handler : function(handleItem) {
					var seat = handleItem.data;
					var callback = function(order) {
						if(order.length == 0) return;
						var newItem = {};
						newItem = seat;
						newItem.onDesk = 't';
						thiz.onUpdate(seat, newItem);
					};
					serverReport.getJson("/createOrder.do?seatId=" + seat.id
							+ "&note='dklfj'&customerId=123", "GET", callback);
				},
				express : function() {
					if (thiz.contextMenu.handleItem == null) return false;
					var seat = thiz.contextMenu.handleItem.data;
					if (!seat) return false;
					if (seat.onDesk == 'f') return true;
				}
			},
			{
				name : "View Order Detail",
				handler : function(handleItem) {
					var seat = handleItem.data;
					var callback = function(json) {
						var order = json;
						var orderPage = Main.pageManagement.active("order-page");
						orderPage.open(seat);
					};
					serverReport.getJson("/getOrderWithSeat.do?seatId=" + seat.id +"", "GET", callback);
				},
				express: function() {
					if (thiz.contextMenu.handleItem == null) return false;
					var seat = thiz.contextMenu.handleItem.data;
					if (!seat) return false;
					if (seat.onDesk == 't') return true;
				}

			}, {
				name : "View",
				handler : function(handleItem) {
					console.log(handleItem);
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

TablePage.prototype.onSearch = function() {
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	var o = this.pageContainer.querySelector("#onDesk");
	
	var floor = f.options[f.selectedIndex].value;
	var room = r.options[r.selectedIndex].value;
	var capacity = c.options[c.selectedIndex].value;
	var onDesk = o.options[o.selectedIndex].value == "undefined" ? "" : o.options[o.selectedIndex].value;
	
	if (floor == -1 && room == -1 && capacity == -1 && onDesk == "") return this.seatTables;
	
	var result = new Array();
	var thiz = this;
	this.seatTables.forEach(function(seat){
		if ((floor == -1 || seat.floor == floor)
			&& (room == -1 || seat.room == room )
			&& (capacity == -1 || seat.capacity <= capacity )
			&& (onDesk == "" || seat.onDesk == (onDesk == "true" ? 't' : 'f') ))
				result.push(seat);
	});
	return result;
}

TablePage.prototype.initItemForSelect = function() {
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	
	var floorCount = new Array();
	var roomCount = new Array();
	var capacityCount = new Array();
	for (var i = 0; i < this.seatTables.length; i++) {
		var seat = this.seatTables[i];
		if (floorCount.indexOf(seat.floor) < 0) floorCount.push(seat.floor);
		if (roomCount.indexOf(seat.room) < 0) roomCount.push(seat.room);
		if (capacityCount.indexOf(seat.capacity) < 0) capacityCount.push(seat.capacity);
	}
	floorCount.sort();
	roomCount.sort();
	capacityCount.sort(function(a, b){return a-b});
	for (var i = 0; i < Math.max(floorCount.length, roomCount.length, capacityCount.length); i++) {
		var index = i;
		if (i < floorCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : floorCount[index],
				_text : floorCount[index]
			});
			f.appendChild(option);
		}
		if (i < roomCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : roomCount[index],
				_text : roomCount[index]
			});
			r.appendChild(option);
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

TablePage.prototype.onUpdate = function(oldItem, newItem) {
	var index = this.seatTables.indexOf(oldItem);
	if (index == -1) return;
	this.seatTables[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 10);
}

TablePage.prototype.getPageContainer = function() {
	var thiz = this;
	this.requestItems(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	});
	return this.pageContainer;
}
