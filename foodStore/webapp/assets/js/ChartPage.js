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
	this.chartContainer = this.pageContainer.querySelector("#chart-container");
	this.yearCombo = this.pageContainer.querySelector("#year-combo");
	this.typeCombo= this.pageContainer.querySelector("#type-combo");
	this.drawChart(null, "2017");
}

ChartPage.prototype.drawChart = function(type, year) {
	var thiz = this;
	var callback = function(data) {
		thiz.drawChartIplm(data, year);
	}
	serverReport.getJson("/foodStatistic.do", "GET", callback, {
		"year" : year
	});
}
ChartPage.prototype.drawChartIplm = function(chartData, year) {
	var thiz = this;
	var genFoodType = function() {
		var header = new Array(year == "" ? "year" : "month");
		var rows = {};
		var maxLength = 0;
		for (var i = 0; i < chartData.length; i ++) {
			var item = chartData[i];
			if (header.indexOf(item["productname"]) < 0)
				header.push(item["productname"]);
			if (rows[item["productname"]]) {
				rows[item["productname"]].push(item["total"]);
				if (rows[item["productname"]].length > maxLength) maxLength = rows[item["productname"]].length;
			} else {
				rows[item["productname"]] = new Array(item[year == "" ? "year" : "month"].toString(), item["total"]);
			}
		}
		var rowArray = new Array();
		for (var prop in rows) {
			var item = rows[prop];
			if (item.length < maxLength) {
				for (var i = 0; i < maxLength - item.length; i++) {
					item.push(0);
				}
			}
			rowArray.push(rows[prop]);
		}
		rowArray.unshift(header);
		return rowArray;
	}
	var beginDraw = function() {
		var options = {
		      title: 'Phân tích thực đơn'      
		};  
		var data = google.visualization.arrayToDataTable(genFoodType());
		var chart = new google.visualization.BarChart(thiz.chartContainer);
		chart.draw(data, options);
	}
	google.charts.load('current', {packages: ['corechart']});
	google.charts.setOnLoadCallback(beginDraw);
	
}

ChartPage.prototype.getPageContainer = function() {
//	var thiz = this;
//	this.requestItems(function() {
//		var result = thiz.onSearch();
//		thiz.table.render(result);
//	});
	return this.pageContainer;
}
