function Table() {
	this.tableBody;
	var tHeader;
	var table;
	this.selectedItem = null;
	console.log(this);
	
}
// [{column: "", label: ""}]
Table.prototype.init = function(tHeader) {
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
			_text : h.column,
		});
		trNode.appendChild(tdNode);
	}
	var theaderNode = Dom.newDOMElement({
		_name : "thead"
	});
	theaderNode.appendChild(trNode);
	this.table.appendChild(theaderNode);
	this.tableBody = Dom.newDOMElement({
		_name : "tbody"
	});
	this.table.appendChild(this.tableBody);
	var thiz = this;
	this.tableBody.addEventListener("hover", function(ev) {
		var target = ev.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (dataNode != null) thiz.selectedItem = dataNode;
	})
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
					else tdNode.innerHTML = item[index];
					break;
				}
			}
			if (labelRightSide.indexOf(thiz.tHeader[i].label) != -1) tdNode.setAttribute("style", "text-align: right");
			trNode.appendChild(tdNode);
			trNode.data = item;
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














