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
	
	this.setupEvent();
	var thiz = this;
	var callback = function(appointments) {
		console.log(appointments);
		if (appointments.length == 0) return;
		thiz.dayPilot.events.list = new Array();
		for(var i = 0; i < appointments.length; i++) {
			var appointment = appointments[i];
			console.log(appointment);
			var e = {
			      "start": moment(appointment.timeStart).format('YYYY-MM-DDTHH:mm:ss').toString(),
			      "end": moment(appointment.timeEnd).format('YYYY-MM-DDTHH:mm:ss').toString(),
			      "id": DayPilot.guid(),
			      "text": appointment.customName + "<br/>" + appointment.customPhone + "<br/>" + appointment.customEmail + "<br/>" + appointment.capacity, 
			      "cusName": appointment.customName,
			      "cusPhone": appointment.customPhone,
			      "cusMail": appointment.customEmail,
			      "cusCapacity": appointment.capacity,
			      "eventId": appointment.id
			  };
			thiz.dayPilot.events.list.push(e);
		}
		thiz.dayPilot.init();
	}
	serverReport.getJson("/getEventByWeek.do?week=-1", "GET", callback, null);
}
AppointmentPage.prototype.setupEvent = function() {
	var thiz = this;
	this.dayPilot.onEventMoved = function(args) {
		console.log(thiz.dayPilot);
		var data = args.e.data;
		if (data == null) return;
		var start = data.start.value;
		var end = data.end.value;
		var callback = function(updated){
			console.log(updated);
		};
		serverReport.getBoolean("/updateEvent.do", "GET", callback, {
			"eventId" : data.eventId,
			"timeStart": moment(start).format('YYYY-MM-DD HH:mm:ss').toString(),
			"timeEnd": moment(end).format('YYYY-MM-DD HH:mm:ss').toString()
		});
	};
	this.dayPilot.onEventClick = function(args) {
		console.log(thiz.dayPilot);
		console.log(args.e.data.eventId);
		if (args.e.data == null) return;
		var removeEvent = function() {
			thiz.remove(args.e);
			
			
		}
		Dialog.alert("Event infomation!","Customer name: " + args.e.data.cusName 
				+ "<br>Customer phone: " + args.e.data.cusPhone
				+ "<br>Customer mail: " + args.e.data.cusMail
				+ "<br>Capacity: " + args.e.data.cusCapacity
				, "Ok", null, "Delete", removeEvent);
	};
	
	this.dayPilot.onTimeRangeSelected = function(args) {
		var calendarDgl = new CalendarDialog(thiz.dayPilot);
		calendarDgl.show(args);
	};
	
	
}

AppointmentPage.prototype.remove = function(e) {
	var thiz = this;
	var callback = function(removed) {
		if (removed) {
			thiz.dayPilot.events.remove(e);
		}
	}
	serverReport.getBoolean("/removeEvent.do", "GET", callback, {
		"eventId" : e.data.eventId
	});
	
	
}

AppointmentPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}