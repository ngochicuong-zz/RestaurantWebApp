function ChartPage() {
	this.name = "chart-page";
	this.pageContainer = Dom.newDOMElement({
		_name : "hbox",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getChartPage.do", "GET", callback);
}

ChartPage.prototype.init = function(){
	this.profitByMonth = this.pageContainer.querySelector("#profit-by-month");
	this.profitByYear = this.pageContainer.querySelector("#profit-by-year");
	this.profitByPrecious= this.pageContainer.querySelector("#profit-by-precious");
	this.GroupOrderByYearRender();
//	 
}

ChartPage.prototype.GroupOrderByYearRender = function() {
	var thiz = this;
	var callback = function(data) {
		console.log(data);
		var hotdata = data;
		var drawChart = function() {
			var label = new Array();
			var element = new Array();
			for (var i = 0; i < hotdata.length; i ++) {
				var item = hotdata[i];
				var temp = new Array();
				for(index in item) {
					if (i == 0) {
						label.push(index);
					}
					temp.push(item[index]);
				}
				element.push(temp);
			}
			element.unshift(label);
			
			var data = google.visualization.arrayToDataTable(element);
			var options = {
			     title: 'Population (in millions)'	  
			}; 
		
			   // Instantiate and draw the chart.
			var chart = new google.visualization.ColumnChart(thiz.profitByYear);
			chart.draw(data, options);
		}
		google.charts.load('current', {packages: ['corechart']});
		google.charts.setOnLoadCallback(drawChart);
	}
	serverReport.getJson("/timeStatistic.do", "GET", callback, {
		"year" : "2017"
	});
}

ChartPage.prototype.requestItems = function(requestCallBack) {
	var thiz = this;
	var callback = function(seatTables) {
		if (seatTables.length > 1) {
			seatTables.sort(function(a, b){
				return a.id - b.id;
			});
		}
		thiz.seatTables = seatTables;
		if(requestCallBack) requestCallBack();
	}
	serverReport.getJson("/searchTable.do", "GET",
			callback, {
				"floor" : -1,
				"room" : -1,
				"capacity" : -1,
				"onDesk" : ""
	});
}



ChartPage.prototype.onSearch = function() {
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	var o = this.pageContainer.querySelector("#onDesk");
	
	var floor = f.options[f.selectedIndex].value;
	var room = r.options[r.selectedIndex].value;
	var capacity = c.options[c.selectedIndex].value;
	var onDesk = o.options[o.selectedIndex].value == "undefined" ? "" : o.options[o.selectedIndex].value;
	
	if (floor == -1 && room == -1 && capacity == -1 && onDesk == "") return this.seatTables;
	
	var result = new Array();
	var thiz = this;
	this.seatTables.forEach(function(seat){
		if ((floor == -1 || seat.floor == floor)
			&& (room == -1 || seat.room == room )
			&& (capacity == -1 || seat.capacity <= capacity )
			&& (onDesk == "" || seat.onDesk == (onDesk == "true" ? 't' : 'f') ))
				result.push(seat);
	});
	return result;
}

ChartPage.prototype.initItemForSelect = function() {
	var f = this.pageContainer.querySelector("#floor");
	var r = this.pageContainer.querySelector("#room");
	var c = this.pageContainer.querySelector("#capacity");
	
	var floorCount = new Array();
	var roomCount = new Array();
	var capacityCount = new Array();
	for (var i = 0; i < this.seatTables.length; i++) {
		var seat = this.seatTables[i];
		if (floorCount.indexOf(seat.floor) < 0) floorCount.push(seat.floor);
		if (roomCount.indexOf(seat.room) < 0) roomCount.push(seat.room);
		if (capacityCount.indexOf(seat.capacity) < 0) capacityCount.push(seat.capacity);
	}
	floorCount.sort();
	roomCount.sort();
	capacityCount.sort(function(a, b){return a-b});
	for (var i = 0; i < Math.max(floorCount.length, roomCount.length, capacityCount.length); i++) {
		var index = i;
		if (i < floorCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : floorCount[index],
				_text : floorCount[index]
			});
			f.appendChild(option);
		}
		if (i < roomCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : roomCount[index],
				_text : roomCount[index]
			});
			r.appendChild(option);
		}
		if (i < capacityCount.length) {
			var option = Dom.newDOMElement({
				_name : "option",
				value : capacityCount[index],
				_text : capacityCount[index]
			});
			c.appendChild(option);
		}
	}
}

ChartPage.prototype.onUpdate = function(oldItem, newItem) {
	var index = this.seatTables.indexOf(oldItem);
	if (index == -1) return;
	this.seatTables[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 10);
}

ChartPage.prototype.getPageContainer = function() {
//	var thiz = this;
//	this.requestItems(function() {
//		var result = thiz.onSearch();
//		thiz.table.render(result);
//	});
	return this.pageContainer;
}
