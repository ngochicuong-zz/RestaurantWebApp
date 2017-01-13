function AddProductDialog(product, callback) {
	
	this.product = product;
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
						_text: "Món ăn:"
					},
					{
						_name: "input",
						id: "food-name",
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
						_text: "Đơn vị tính: "
					},
					{
						_name: "input",
						id: "unit-type",
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
						_text: "Số lượng / đơn vị: "
					},
					{
						_name: "input",
						id: "quantity-per-unit",
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
						_text: "Giá:  "
					},
					{
						_name: "input",
						id: "price",
						_text: "0 Đ",
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
						_text: "Phân loại:",
						
					},
					{
						_name: "select",
						id: "categories",
						_children: [
							{
								_name: "option",
								value: 0,
								_text: "Món ăn"
							},
							{
								_name: "option",
								value: 1,
								_text: "Nước giải khát"
							}
						]
							
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
		thiz.foodName = thiz.container.querySelector("#food-name");
		thiz.unit = thiz.container.querySelector("#unit-type");
		thiz.quantityPerUnit = thiz.container.querySelector("#quantity-per-unit");
		thiz.price = thiz.container.querySelector("#price");
		thiz.categories = thiz.container.querySelector("#categories");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		thiz.price.addEventListener("keypress", function(e) {
			e.preventDefault();
			var moneyStr = thiz.price.value.replace(" Đ", "").replace(/,/g, "");
			if (e.keyCode == 8) {
				moneyStr = moneyStr.substr(0,moneyStr.length - 1);
			} else {
				var char = String.fromCharCode(e.charCode);
				moneyStr += char;
			}
			thiz.price.value = parseFloat(moneyStr).formatMoney(0, " Đ");
		})
		
		if (thiz.product != null) {
			thiz.acceptButton.innerHTML = "Save";
			thiz.foodName.value = thiz.product.productName;
			thiz.unit.value = thiz.product.unitType;
			thiz.quantityPerUnit.value = thiz.product.quantityPerUnit;
			thiz.price.value = parseFloat(thiz.product.price).formatMoney(0, " Đ");
			thiz.categories.selectedIndex = thiz.product.categoryType;
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

AddProductDialog.prototype.onAccept = function() {
	var thiz = this;
	if (!this.validate()) {
		Dialog.alert("Lỗi! ","Vui lòng điền đầy đủ thông tin"
				, "Close", null, null , null, null, null
		);
		return;
	};
	if (this.product) {
		var callback = function(updated){
			if (updated) {
				thiz.product.productName = thiz.foodName.value;
				thiz.product.unitType = thiz.unit.value,
				thiz.product.quantityPerUnit = thiz.quantityPerUnit.value;
				thiz.product.price = thiz.price.value.replace(" Đ", "").replace(/,/g, "");
				thiz.product.categoryType = thiz.categories.options[thiz.categories.selectedIndex].value;
				if (thiz.callback) thiz.callback(thiz.product);
			}
		}
		serverReport.getJson("/updateProduct.do", "GET", callback, {
			"productId" : thiz.product.id,
			"productName" : thiz.foodName.value,
			"unit" : thiz.unit.value,
			"quantityPerUnit": thiz.quantityPerUnit.value,
			"price" : thiz.price.value.replace(" Đ", "").replace(/,/g, ""),
			"categories" : thiz.categories.options[thiz.categories.selectedIndex].value,
		});
	} else {
		var callback = function(newProduct){
			if (newProduct) {
				thiz.product = newProduct;
				if (thiz.callback) thiz.callback(thiz.product);
			}
		}
		serverReport.getJson("/createProduct.do", "GET", callback, {
					"productName" : thiz.foodName.value,
					"unit" : thiz.unit.value,
					"quantity": thiz.quantityPerUnit.value,
					"price" : thiz.price.value.replace(" Đ", "").replace(/,/g, ""),
					"categories" : thiz.categories.options[thiz.categories.selectedIndex].value,
				});
	}
	
//	var args = this.calendarItem;
//	args.start = new DayPilot.Date(moment(start).format('YYYY-MM-DDTHH:mm:ss').toString());
//	args.end = new DayPilot.Date(moment(end).format('YYYY-MM-DDTHH:mm:ss').toString());
//	var e = new DayPilot.Event({
//	      start: args.start,
//	      end: args.end,
//	      id: DayPilot.guid(),
//	      resource: args.resource,
//	      text: thiz.customerName.value + "<br/>" + thiz.customerPhone.value + "<br/>" + thiz.customerCapacity.value + "<br/>" + thiz.customerMail.value, 
//	      cusName: thiz.customerName.value,
//	      cusPhone: thiz.customerPhone.value,
//	      cusMail: thiz.customerMail.value,
//	      cusCapacity: thiz.customerCapacity.value
//	  });
//	
//	

	this.close();
}

AddProductDialog.prototype.onCancel = function() {
	this.close();
}

AddProductDialog.prototype.getContainer = function() {
	return this.container;
}

AddProductDialog.prototype.show = function() {
	var thiz = this;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

AddProductDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

AddProductDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}
AddProductDialog.prototype.validate = function(){
	var check = true;
	if (this.foodName.value == "") {
		this.foodName.style.background="#fff8b9";
		check = false;
	}else {
		this.foodName.style.background = "#fff";
	}
	if(this.unit.value == ""){
		this.unit.style.background = "#fff8b9";
		check = false;
	}else {
		this.unit.style.background = "#fff";
	}
	if(this.quantityPerUnit.value == ""){
		this.quantityPerUnit.style.background = "#fff8b9";
		check = false;
	}else {
		this.quantityPerUnit.style.background = "#fff";
	}
	if(this.price.value == ""){
		this.price.style.background = "#fff8b9";
		check = false;
	}else {
		this.price.style.background = "#fff";
	}
	if(this.categories.value == ""){
		this.categories.style.background = "#fff8b9";
		check = false;
	}else {
		this.categories.style.background = "#fff";
	}
	return check;
}




