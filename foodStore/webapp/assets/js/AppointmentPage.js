function AppointmentPage() {
	this.name = "appointment-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "div",
		id : "dp"
	});
	var thiz = this;
	window.setTimeout(function() {
		thiz.dp = new DayPilot.Calendar(thiz.pageContainer);
		thiz.dp.viewType = "Week";
		thiz.dp.init();
		thiz.setupEvent();
	}, 10);
}

AppointmentPage.prototype.setupEvent = function() {
	var thiz = this;
	this.dp.onEventMoved = function(args) {
		console.log(args);
	};
	this.dp.onTimeRangeSelected = function(args) {
		console.log(args);
		var e = new DayPilot.Event({
		      start: args.start,
		      end: args.end,
		      id: DayPilot.guid(),
		      resource: args.resource,
		      text: name
		  });
		  thiz.dp.events.add(e);
	};
}

AppointmentPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}