function AppointmentPage() {
	this.name = "appointment-page";
	
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "vbox",
		id : "pageContainer",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getAppointmentPage.do", "GET", callback);
}

AppointmentPage.prototype.init = function() {
	this.dayPilot = new DayPilot.Calendar(this.pageContainer.querySelector("#day-pilot"));
	this.dayPilot.viewType = "Week";
	this.dayPilot.init();
	this.setupEvent();
	
}
AppointmentPage.prototype.setupEvent = function() {
	var thiz = this;
	this.dayPilot.onEventMoved = function(args) {
		console.log(args);
		
	};
	this.dayPilot.onEventClick = function(args) {
		console.log(args.e.data.eventId);
		if (args.e.data == null) return;
		Dialog.alert("Event infomation!","Customer name: " + args.e.data.cusName 
				+ "<br>Customer phone: " + args.e.data.cusPhone
				+ "<br>Customer mail: " + args.e.data.cusMail
				+ "<br>Capacity: " + args.e.data.cusCapacity
				, null, null);
	};
	
	this.dayPilot.onTimeRangeSelected = function(args) {
		var calendarDgl = new CalendarDialog(thiz.dayPilot);
		calendarDgl.show(args);
	};
}

AppointmentPage.prototype.updateEvent = function(evId, newStart, newEnd) {
	var callback = function(appointment){
		var args = thiz.calendarItem;
		args.start = new DayPilot.Date(moment(start).format('YYYY-MM-DDTHH:mm:ss').toString());
		args.end = new DayPilot.Date(moment(end).format('YYYY-MM-DDTHH:mm:ss').toString());
		var e = new DayPilot.Event({
		      start: args.start,
		      end: args.end,
		      id: DayPilot.guid(),
		      resource: args.resource,
		      text: thiz.customerName.value + "<br/>" + thiz.customerPhone.value + "<br/>" + thiz.customerCapacity.value + "<br/>" + thiz.customerMail.value, 
		      cusName: thiz.customerName.value,
		      cusPhone: thiz.customerPhone.value,
		      cusMail: thiz.customerMail.value,
		      cusCapacity: thiz.customerCapacity.value,
		      eventId: appointment.id
		  });
		thiz.dayPilot.events.add(e);
		
	}
	serverReport.getJson("/createEvent.do", "POST", callback, {
				"name" : thiz.customerName.value,
				"phone" : thiz.customerPhone.value,
				"gender" : "1",
				"mail": thiz.customerMail.value,
				"timeStart": moment(start).format('YYYY-MM-DD HH:mm:ss').toString(),
				"timeEnd": moment(end).format('YYYY-MM-DD HH:mm:ss').toString()
			});
}

AppointmentPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}