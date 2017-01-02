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
						_text: "Pay condition:"
					},
					{
						_name: "input",
						id: "pay-condition",
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
						_text: "Discount: "
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
						_text: "From date: "
					},
					{
						_name: "input",
						id: "from-date",
						type: "date"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "To Date:  "
					},
					{
						_name: "input",
						id: "to-date",
						type: "date"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Description:",
						
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
		thiz.fromDate = thiz.container.querySelector("#from-date");
		thiz.toDate = thiz.container.querySelector("#to-date");
		thiz.description = thiz.container.querySelector("#description");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		if (thiz.promotion != null) {
			thiz.acceptButton.innerHTML = "Save";
			thiz.payCondition.value = thiz.promotion.payCondition;
			thiz.discount.value = thiz.promotion.discount;
			
			thiz.fromDate.value = moment(thiz.promotion.fromDate).format('YYYY-MM-DD').toString();
			thiz.toDate.value = moment(thiz.promotion.toDate).format('YYYY-MM-DD').toString();
			
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
	if (this.promotion) {
		var callback = function(updated){
		}
		serverReport.getJson("/updatePromotion.do", "GET", callback, {
			"promoId" : thiz.promotion.id,
			"paycondition" : thiz.payCondition.value,
			"discount" : thiz.discount.value,
			"fromDate" : thiz.fromDate.value == "" ? thiz.fromDate.value : moment(thiz.fromDate.value).format('YYYY-MM-DD HH:mm:ss').toString(),
			"toDate" : thiz.toDate.value == "" ? thiz.toDate.value : moment(thiz.toDate.value).format('YYYY-MM-DD HH:mm:ss').toString(),
			"description" : thiz.description.value,
		});
	} else {
		var callback = function(created){
			if (!created) return;
		}
		serverReport.getBoolean("/createPromotion.do", "GET", callback, {
					"paycondition" : thiz.payCondition.value,
					"discount" : thiz.discount.value,
					"fromDate" : thiz.fromDate.value == "" ? thiz.fromDate.value : moment(thiz.fromDate.value).format('YYYY-MM-DD HH:mm:ss').toString(),
					"toDate" : thiz.toDate.value == "" ? thiz.toDate.value : moment(thiz.toDate.value).format('YYYY-MM-DD HH:mm:ss').toString(),
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
	if (this.callback) this.callback();
}

AddPromotionDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}





