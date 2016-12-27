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
	this.dayPilot.onTimeRangeSelected = function(args) {
		var calendarDgl = new CalendarDialog(thiz.dayPilot);
		calendarDgl.show(args);
//		var e = new DayPilot.Event({
//		      start: args.start,
//		      end: args.end,
//		      id: DayPilot.guid(),
//		      resource: args.resource,
//		      text: name
//		  });
//		  thiz.dayPilot.events.add(e);
	};
}

AppointmentPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}