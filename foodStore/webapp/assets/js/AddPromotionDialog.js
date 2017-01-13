function AddPromotionDialog(promotion, callback) {
	
	this.promotion = promotion;
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
						_text: "Tên chương trình:",
						
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
						_text: "Giảm giá: "
					},
					{
						_name: "input",
						id: "discount",
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
						_text: "Điều kiện: "
					},
					{
						_name: "input",
						id: "pay-condition",
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
						_text: "Từ ngày: "
					},
					{
						_name: "input",
						id: "from-date",
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
						_text: "Đến ngày:  "
					},
					{
						_name: "input",
						id: "to-date",
						type: "text"
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
		thiz.payCondition = thiz.container.querySelector("#pay-condition");
		thiz.discount = thiz.container.querySelector("#discount");
		thiz.description = thiz.container.querySelector("#description");
		
		thiz.fromDate;
		thiz.toDate;
		
		var fromDateBox= thiz.container.querySelector("#from-date");
		var toDateBox = thiz.container.querySelector("#to-date");
		
	    var fromDatePicker = new Pikaday({
	        field: fromDateBox,
	        format: 'DD-MM-YYYY',
	        onSelect: function() {
	            thiz.fromDate = this.getMoment();
	        }
	        
	    });
	    
	    var toDatePicker = new Pikaday({
	        field: toDateBox,
	        format: 'DD-MM-YYYY',
	        onSelect: function() {
	            thiz.toDate = this.getMoment();
	        }
	    });
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		thiz.payCondition.addEventListener("keypress", function(e) {
			e.preventDefault();
			var moneyStr = thiz.payCondition.value.replace(" Đ", "").replace(/,/g, "");
			if (e.keyCode == 8) {
				moneyStr = moneyStr.substr(0,moneyStr.length - 1);
			} else {
				var char = String.fromCharCode(e.charCode);
				moneyStr += char;
			}
			thiz.payCondition.value = parseFloat(moneyStr).formatMoney(0, " Đ");
		})
		
		if (thiz.promotion != null) {
			thiz.acceptButton.innerHTML = "Save";
			thiz.payCondition.value = parseFloat(thiz.promotion.payCondition).formatMoney(0, " Đ");
			thiz.discount.value = thiz.promotion.discount;
			
			fromDateBox.value = moment(thiz.promotion.fromDate).format('DD-MM-YYYY').toString();
			toDateBox.value = moment(thiz.promotion.toDate).format('DD-MM-YYYY').toString();
			
			thiz.fromDate = moment(thiz.promotion.fromDate);
			thiz.toDate =  moment(thiz.promotion.toDate);
			
			thiz.description.value = thiz.promotion.description;
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

AddPromotionDialog.prototype.onAccept = function() {
	var thiz = this;
	if (!this.validate()) {
		Dialog.alert("Lỗi! ","Vui lòng điền đầy đủ thông tin"
				, "Close", null, null , null, null, null
		);
		return;
	};
	if (this.promotion) {
		var callback = function(updated){
			if (updated) {
				thiz.promotion.payCondition = thiz.payCondition.value.replace(" Đ", "").replace(/,/g, "");
				thiz.promotion.discount = thiz.discount.value;
				thiz.promotion.fromDate =  thiz.fromDate;
				thiz.promotion.toDate = thiz.toDate;
				thiz.promotion.description = thiz.description.value;
				if (thiz.callback) thiz.callback(thiz.promotion);
			}
		}
		serverReport.getJson("/updatePromotion.do", "GET", callback, {
			"promoId" : thiz.promotion.id,
			"paycondition" : parseFloat(thiz.payCondition.value.replace(" Đ", "").replace(/,/g, "")),
			"discount" : thiz.discount.value,
			"fromDate" : !thiz.fromDate ? "" : moment(thiz.fromDate).format('YYYY-MM-DD HH:mm:ss').toString(),
			"toDate" : !thiz.toDate ? "" : moment(thiz.toDate).format('YYYY-MM-DD HH:mm:ss').toString(),
			"description" : thiz.description.value,
		});
	} else {
		var callback = function(newPromotion){
			if (newPromotion) {
				newPromotion.fromDate = thiz.fromDate;
				newPromotion.toDate = thiz.toDate;
				if (thiz.callback) thiz.callback(newPromotion);
			}
		}
		serverReport.getJson("/createPromotion.do", "GET", callback, {
					"paycondition" : thiz.payCondition.value.replace(" Đ", "").replace(/,/g, ""),
					"discount" : thiz.discount.value,
					"fromDate" : !thiz.fromDate ? "" : moment(thiz.fromDate).format('YYYY-MM-DD HH:mm:ss').toString(),
					"toDate" : !thiz.toDate ? "" : moment(thiz.toDate).format('YYYY-MM-DD HH:mm:ss').toString(),
					"description" : thiz.description.value,
				});
	}
	
	this.close();
}

AddPromotionDialog.prototype.onCancel = function() {
	this.close();
}

AddPromotionDialog.prototype.getContainer = function() {
	return this.container;
}

AddPromotionDialog.prototype.show = function() {
	var thiz = this;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
	}, 10)
	
}

AddPromotionDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

AddPromotionDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}
AddPromotionDialog.prototype.validate = function(){
	var check = true;
	if (this.payCondition.value == "") {
		this.payCondition.style.background="#fff8b9";
		check = false;
	}else {
		this.payCondition.style.background = "#fff";
	}
	if(this.discount.value == ""){
		this.discount.style.background = "#fff8b9";
		check = false;
	}else {
		this.discount.style.background = "#fff";
	}
	if(this.description.value == ""){
		this.description.style.background = "#fff8b9";
		check = false;
	}else {
		this.description.style.background = "#fff";
	}
	if(!this.fromDate || !this.toDate){
		check = false;
	}
	
	return check;
}




