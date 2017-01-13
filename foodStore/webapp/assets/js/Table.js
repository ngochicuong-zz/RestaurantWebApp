function Table() {
	this.tableBody;
	var tHeader;
	var table;
	this.selectedItem = null;
	console.log(this);
	
}
// [{column: "", label: ""}]
Table.prototype.init = function(tHeader, action) {
	this.tHeader = tHeader;
	this.table = Dom.newDOMElement({
		_name : "table",
		class : "table table-bordered"

	});
	var trNode = Dom.newDOMElement({
		_name : "tr"
	});
	for (var i = 0; i < tHeader.length; i++) {
		var h = tHeader[i];
		var tdNode = Dom.newDOMElement({
			_name : "td",
			_text : h.column.toUpperCase(),
		});
		tdNode.style.border = "none";
		trNode.appendChild(tdNode);
	}
	var theaderNode = Dom.newDOMElement({
		_name : "thead"
	});
	trNode.style.background = "#f7ae02";
	theaderNode.appendChild(trNode);
	this.table.appendChild(theaderNode);
	this.tableBody = Dom.newDOMElement({
		_name : "tbody"
	});
	this.table.appendChild(this.tableBody);
	var thiz = this;
	
	this.tableBody.addEventListener("click", function(ev) {
		var target = ev.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.action;
			}
		});
		if (dataNode != null) dataNode.action();
	})
	
	this.tableBody.addEventListener("hover", function(ev) {
		var target = ev.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (dataNode != null) thiz.selectedItem = dataNode;
	})
	thiz.renderAction = action;
}

Table.prototype.getTable = function() {
	return this.table;
}

Table.prototype.removeChild = function(itemNode){
	this.tableBody.removeChild(itemNode);
}

Table.prototype.render = function(items) {
	var labelRightSide = new Array("price", "total", "payCondition");
	this.tableBody.innerHTML = "";
	if ( items.length == 0) return;
	var thiz = this;
	var addItem = function(item) {
		var trNode = Dom.newDOMElement({
			 _name: "tr",
			 class: "tableItem"
		 });
		for (var i = 0; i < thiz.tHeader.length; i++) {
			var tdNode = Dom.newDOMElement({
				 _name: "td",
			 });
			for(var index in item) {
				if (index == thiz.tHeader[i].label) {
					if (labelRightSide.indexOf(thiz.tHeader[i].label) != -1) tdNode.innerHTML = parseInt(item[index].toString().replace("Đ", "")).formatMoney(0, " Đ");
					else if (thiz.tHeader[i].label == "role") tdNode.innerHTML = Role[item[index]].toString();
					else if (thiz.tHeader[i].label == "quality") {
						tdNode.quality = true;
						tdNode.innerHTML = item[index];
					} else if (thiz.tHeader[i].label == "categoryType") {
						tdNode.innerHTML = CategoryType[item[index]];
					} else if (thiz.tHeader[i].type && thiz.tHeader[i].type == "date") {
						tdNode.innerHTML = moment(item[index]).format('DD-MM-YYYY').toString();
					}  else if (thiz.tHeader[i].type && thiz.tHeader[i].type == "date time") {
						tdNode.innerHTML = moment(item[index]).format('DD-MM-YYYY HH:mm').toString();
					}
					else tdNode.innerHTML = item[index];
					break;
				}
			}
			if (labelRightSide.indexOf(thiz.tHeader[i].label) != -1) tdNode.setAttribute("style", "text-align: right");
			trNode.appendChild(tdNode);
			trNode.data = item;
		}
		if (thiz.renderBackground) {
			if (thiz.renderBackground(item)) {
				trNode.style.background = "rgb(255, 248, 185)";
			} else {
				trNode.style.background = "#fff";
			}
		} else {
			trNode.style.background = "#fff";
		}
		if (thiz.renderAction != null) {
			var buttons = thiz.renderAction(item);
			if (buttons.length == 0) return;
			var tdNode = Dom.newDOMElement({
				 _name: "td",
			 });
			for(var i = 0; i < buttons.length; i++) {
				var button = buttons[i];
				tdNode.appendChild(button);
				trNode.appendChild(tdNode);
			}
		}
		return trNode;
	}
	for(var i = 0; i < items.length; i++) {
		this.tableBody.appendChild(addItem(items[i]));
	}
}

Table.prototype.getSelectedItemObject = function() {
	return this.selectedItem;
}

var Role = {0: "User", 1 : "Manager", 2: "Admin", 3 : "Recipt", 4 : "Kitchen", 5 : "Cashier"};
var CategoryType = {0: "Món ăn", 1: "Nước giải khát"};













