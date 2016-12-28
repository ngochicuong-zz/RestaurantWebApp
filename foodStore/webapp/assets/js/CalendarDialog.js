function CalendarDialog(dayPilot) {
	this.contextMenuClassName = "combo-popup";
	this.contextMenuItemClassName = "combo-popup__item";
	this.contextMenuLinkClassName = "context-menu__link";
	this.contextMenuActive = "context-menu--active";
	
	this.dayPilot = dayPilot;
	this.calendarItem;
	this.busyBackground = Dom.newDOMElement({
		_name: "div",
		style: "position: absolute; height:100%; width:100%; z-index: 99; top: 0px"
	});
	this.container = Dom.newDOMElement({
		_name : "vbox",
		class : "combo-popup",
		_children: [
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Customer Name:"
					},
					{
						_name: "input",
						id: "customer-name",
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
						_text: "Phone: "
					},
					{
						_name: "input",
						id: "customer-phone",
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
						_text: "Email: "
					},
					{
						_name: "input",
						id: "customer-mail",
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
						_text: "Capacity: "
					},
					{
						_name: "input",
						id: "customer-capacity",
						type: "number",
						min: "0"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Time start: "
					},
					{
						_name: "input",
						id: "time-start",
						type: "datetime-local"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "label",
						_text: "Time end: "
					},
					{
						_name: "input",
						id: "time-end",
						type: "datetime-local"
					}
				]
			},
			{
				_name : "hbox",
				class: "InputRow",
				_children : [
					{
						_name: "button",
						id: "accept",
						_text: "Ok "
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
		thiz.customerPhone = thiz.container.querySelector("#customer-phone");
		thiz.customerName = thiz.container.querySelector("#customer-name");
		thiz.customerMail = thiz.container.querySelector("#customer-mail");
		thiz.customerCapacity = thiz.container.querySelector("#customer-capacity");
		
		thiz.acceptButton = thiz.container.querySelector("#accept");
		thiz.closeButton = thiz.container.querySelector("#close");
		
		thiz.timeStart = thiz.container.querySelector("#time-start");
		thiz.timeEnd = thiz.container.querySelector("#time-end");
		
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

CalendarDialog.prototype.onAccept = function() {
	var thiz = this;
	
	var start = this.timeStart.value;
	var end = this.timeEnd.value;

	
	var callback = function(appointment){
		console.log(appointment);
	}
	serverReport.getJson("/createEvent.do", "POST", callback, {
				"name" : thiz.customerName.value,
				"phone" : thiz.customerPhone.value,
				"gender" : "1",
				"mail": thiz.customerMail.value,
				"timeStart": start.toString()
			});
	
	
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
//	this.dayPilot.events.add(e);
	this.close();
}

CalendarDialog.prototype.onCancel = function() {
	this.close();
}

CalendarDialog.prototype.getContainer = function() {
	return this.container;
}

CalendarDialog.prototype.show = function(cEvent) {
	var thiz = this;
	this.calendarItem = cEvent;
	document.body.appendChild(this.container);
	document.body.appendChild(this.busyBackground);
	window.setTimeout(function(){
		thiz.positionContainer();
		thiz.timeStart.value = cEvent.start.value;
		thiz.timeEnd.value = cEvent.end.value;
	}, 10)
	
}

CalendarDialog.prototype.close = function() {
	document.body.removeChild(this.container);
	document.body.removeChild(this.busyBackground);
}

CalendarDialog.prototype.positionContainer = function(){
	var container = this.container;
	container.style.left = (window.innerWidth - container.offsetWidth) / 2 + "px";
	container.style.top = (window.innerHeight - container.offsetHeight) / 2 + "px";
	
}





