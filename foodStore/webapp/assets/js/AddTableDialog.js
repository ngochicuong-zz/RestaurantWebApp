function AddTableDialog(seat, callback) {
	
	this.seatTable = seat;
	this.callback = callback;
	this.contextMenuClassName = "Event-popup";
	this.contextMenuItemClassName = "Event__item";
	
	this.calendarItem;
	this.busyBackground = Dom.newDOMElement({
		_name: "div",
		style: "position: absolute; height:100%; width:100%; z-index: 99; top: 0px"
	});
	this.container = Dom.newDOMElement({
		_name : "vbox",
		class : this.contextMenuClassName,
		_children: [
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Lầu:"
					},
					{
						_name: "input",
						id: "floor",
						type: "number"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Phòng: "
					},
					{
						_name: "input",
						id: "room",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Số lượng chỗ ngồi: "
					},
					{
						_name: "input",
						id: "capacity",
						type: "number"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Ghi chú: "
					},
					{
						_name: "input",
						id: "description",
						type: "text"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Ưu tiên: "
					},
					{
						_name: "input",
						id: "priority",
						type: "number",
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				style: "justify-content: center",
				_children : [
					{
						_name: "button",
						id: "accept",
						_text: "OK "
					},
					{
						_name: "button",
						id: "close",
						_text: "Cancel"
					}
				]
			}
		]
	});
	var thiz = this;
	window.setTimeout(function() {
		thiz.floor = thiz.container.querySelector("#floor");
		thiz.room = thiz.container.querySelector("#room");
		thiz.capacity = thiz.container.querySelector("#capacity");
		thiz.description = thiz.container.querySelector("#description");
		thiz.priority = thiz.container.querySelector("#priority");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		if (thiz.seatTable != null) {
			thiz.acceptButton.innerHTML = "Save";
			thiz.floor.value = thiz.seatTable.floor;
			thiz.room.value = thiz.seatTable.room;
			thiz.capacity.value = thiz.seatTable.capacity;
			thiz.description.value = thiz.seatTable.description == null ? "": thiz.seatTable.description ;
			thiz.priority.value = thiz.seatTable.priority;
		}
		
		thiz.acceptButton.addEventListener("click", function(event) {
			thiz.onAccept();
		});
		thiz.closeButton.addEventListener("click", function(event) {
			thiz.onCancel();
		});
	}, 10);
	
}

/*
 * [{name: " ", handler: function}] <nav id="context-menu" class="context-menu">
 * <ul class="context-menu__items"> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="View"><i class="fa fa-eye"></i>
 * View Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Edit"><i class="fa fa-edit"></i>
 * Edit Task</a> </li> <li class="context-menu__item"> <a href="#"
 * class="context-menu__link" data-action="Delete"><i class="fa fa-times"></i>
 * Delete Task</a> </li> </ul> </nav>
 * 
 * 
 */

AddTableDialog.prototype.onAccept = function() {
	if (!this.validate()) {
		Dialog.alert("Lỗi! ","Vui lòng điền đầy đủ thông tin"
				, "Close", null, null , null, null, null
		);
		return;
	};
	if (this.seatTable) {
		var thiz = this;
		var callback = function(updated){
			if (updated) {
				thiz.seatTable.floor = thiz.floor.value;
				thiz.seatTable.room = thiz.room.value,
				thiz.seatTable.capacity = thiz.capacity.value;
				thiz.seatTable.description = thiz.description.value;
				thiz.seatTable.priority = thiz.priority.value;
				if (thiz.callback) thiz.callback(thiz.seatTable);
			}
		}
		serverReport.getJson("/updateTable.do", "GET", callback, {
					"seatId": thiz.seatTable.id,
					"floor" : thiz.floor.value,
					"room" : thiz.room.value,
					"capacity" : thiz.capacity.value,
					"description": thiz.description.value,
					"priority" : thiz.priority.value
				});
	} else {
		var thiz = this;
		var callback = function(newSeat){
			if (newSeat) {
				if (thiz.callback) thiz.callback(newSeat);
			}
		}
		serverReport.getJson("/createSeatTable.do", "GET", callback, {
					"floor" : thiz.floor.value,
					"room" : thiz.room.value,
					"capacity" : thiz.capacity.value,
					"description": thiz.description.value,
					"priority" : thiz.priority.value
				});
	}
	this.close();
}

AddTableDialog.prototype.onCancel = function() {
	this.close();
}

AddTableDialog.prototype.getContainer = function() {
	return this.container;
}

AddTableDialog.prototype.show = function() {
	var thiz = this;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

AddTableDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

AddTableDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}

AddTableDialog.prototype.validate = function(){
	var check = true;
	if (this.floor.value == "") {
		this.floor.style.background="#fff8b9";
		check = false;
	}else {
		this.floor.style.background = "#fff";
	}
	if(this.room.value == ""){
		this.room.style.background = "#fff8b9";
		check = false;
	}else {
		this.room.style.background = "#fff";
	}
	if(this.capacity.value == ""){
		this.capacity.style.background = "#fff8b9";
		check = false;
	}else {
		this.capacity.style.background = "#fff";
	}
	if(this.priority.value == ""){
		this.priority.style.background = "#fff8b9";
		check = false;
	}else {
		this.priority.style.background = "#fff";
	}
	return check;
}





