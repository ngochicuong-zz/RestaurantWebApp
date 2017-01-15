function AppointmentPage() {
	this.name = "appointment-page";
	
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "vbox",
		style: "margin: 0.2em",
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
		if (appointments.length == 0) {
			thiz.dayPilot.init();
			window.setTimeout(function() {
				var pilotContain = thiz.pageContainer.querySelector("#day-pilot");
				var style = pilotContain.childNodes[1].getAttribute("style");
				pilotContain.childNodes[1].setAttribute("style", style + "flex: 1 1 1em");
			}, 10);
			return;
			
		}
		thiz.dayPilot.events.list = new Array();
		for(var i = 0; i < appointments.length; i++) {
			var appointment = appointments[i];
			console.log(appointment);
			var e = {
			      "start": moment(appointment.timeStart).format('YYYY-MM-DDTHH:mm:ss').toString(),
			      "end": moment(appointment.timeEnd).format('YYYY-MM-DDTHH:mm:ss').toString(),
			      "id": DayPilot.guid(),
			      "text": appointment.customName + "\t" + appointment.customPhone + "\t" + appointment.customEmail + "\t" + appointment.capacity, 
			      "cusName": appointment.customName,
			      "cusPhone": appointment.customPhone,
			      "cusMail": appointment.customEmail,
			      "cusCapacity": appointment.capacity,
			      "eventId": appointment.id,
			      "seatId" : appointment.seatId == null ? 0 : appointment.seatId,
			      "floor" : appointment.floor == null ? 0 : appointment.floor,
			      "room" : appointment.room == null ? 0 : appointment.room
			      
			  };
			thiz.dayPilot.events.list.push(e);
		}
		thiz.dayPilot.init();
		window.setTimeout(function() {
			var pilotContain = thiz.pageContainer.querySelector("#day-pilot");
			var style = pilotContain.childNodes[1].getAttribute("style");
			pilotContain.childNodes[1].setAttribute("style", style + "flex: 1 1 1em");
		}, 10);
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
				+ "<br>Seat Id: " + args.e.data.seatId + "\t Room:" + args.e.data.room + "\t Floor: " + args.e.data.floor
				, "Close", null, "Delete", removeEvent, "Book table...", function(extraNode, callback) { thiz.bookSeat(extraNode, args);
				 	if (callback != null) callback();
				}
		);
	};
	
	this.dayPilot.onTimeRangeSelected = function(args) {
		var callback = function(e) {
			thiz.dayPilot.events.add(e);
		}
		var calendarDgl = new CalendarDialog(callback);
		calendarDgl.show(args);
	};
	
	
}

AppointmentPage.prototype.bookSeat = function(extraNode, event) {
	var comboPopup = new ComboPopup();
	comboPopup.renderHandler = function(popupContainer, items){
		popupContainer.innerHTML = "";
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			var container =  Dom.newDOMElement({
				_name : "hbox",
				flex:"1",
				style: "padding: 0.5em",
				class: "combo-popup__item",
				_children: [
					{
						_name : "hbox",
						_text : "Seat Id: " + item["id"],
						flex:"2"
					
					},
					{
						_name : "hbox",
						_text : "Room: " + item["room"],
						flex : "1",
						style: "justify-content: flex-end"
					},
					{
						_name : "hbox",
						_text : "Floor: " + item["floor"],
						style: "width: 5em; justify-content: flex-end"
					}
				]
			});
			container.data = item;
			popupContainer.appendChild(container);
		}
	};
	comboPopup.action = function(item) {
		console.log(item);
		if (item == null  ||item.data == null) return;
		var seat = item.data;
		var callback = function(updated) {
			if (updated) {
				event.e.data.seatId = seat.id;
				event.e.data.room = seat.room;
				event.e.data.floor = seat.floor;
			}
		}
		serverReport.getBoolean("/bookSeatForEvent.do", "GET", callback, {
			"seatId" : seat.id,
			"eventId" : event.e.data.eventId,
			"loginCode" : Main.loginCode
		});
		
	}
	var callback = function(seat) {
		if (seat == null) return;
		comboPopup.renderItems(seat);
		comboPopup.toggleMenuOnCenter();
	}
	serverReport.getJson("/getTableByCapacity.do", "GET", callback, {
		"capacity" : event.e.data.cusCapacity
	});
	
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
	var thiz = this;
	return this.pageContainer;
}