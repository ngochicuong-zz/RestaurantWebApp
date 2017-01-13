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
	this.typeCombo = this.pageContainer.querySelector("#type-combo");
	this.initYearCombo();
	var thiz = this;
	this.yearCombo.addEventListener("change", function(ev){
		var year = thiz.yearCombo.options[thiz.yearCombo.selectedIndex].value;
		thiz.drawChart(thiz.typeCombo.options[thiz.typeCombo.selectedIndex].value, year);
	}, false);
	
	this.typeCombo.addEventListener("change", function(ev){
		var type = thiz.typeCombo.options[thiz.typeCombo.selectedIndex].value;
		thiz.drawChart(type, thiz.yearCombo.options[thiz.yearCombo.selectedIndex].value);
	}, false);
}
ChartPage.prototype.initYearCombo = function() {
	var thiz = this;
	var callback = function(years) {
		for (var i = 0; i < years.length; i++) {
			var year = years[i]["year"].toString();
			var node = Dom.newDOMElement({
				_name : "option",
				_text : year,
				value : year
			});
			thiz.yearCombo.appendChild(node);
		}
	}
	serverReport.getJson("/getYearStatistic.do", "GET", callback);
}

ChartPage.prototype.drawChart = function(type, year) {
	var thiz = this;
	var callback = function(data) {
		if (data.length == 0) {
			thiz.chartContainer.appendChild(Dom.newDOMElement({
				_name : "h4",
				_text: "Không tìm thấy thông tin",
				style: "width: 100%; text-align: center",
			}));
			return;
		}
		thiz.chartContainer.innerHTML = "";
		thiz.drawChartIplm(data, year, type == "profit" ? false : true);
	}
	var patent = type == "profit" ? "/timeStatistic.do" : "/foodStatistic.do";
	serverReport.getJson(patent, "GET", callback, {
		"year" : year
	});
	Main.busyHandler.waitting();
}
ChartPage.prototype.drawChartIplm = function(chartData, year, productChart) {
	var thiz = this;
	var genFoodType = function() {
		var header = new Array(year == "0" ? "year" : "month");
		var products = {};
		var yearArr = new Array();
		for (var i = 0; i < chartData.length; i ++) {
			var item = chartData[i];
			if (header.indexOf(item["productname"]) < 0){
				header.push(item["productname"]);
			}
			if (!products[item["productname"]]) products[item["productname"]] = {};
			products[item["productname"]][item[year == "0" ? "year" : "month"].toString()] =  item["total"];
			
			if (yearArr.indexOf(item[year == "0" ? "year" : "month"].toString()) < 0) {
				yearArr.push(item[year == "0" ? "year" : "month"].toString());
			}
		}
		var rows = new Array();
		for (var i = 0; i < yearArr.length; i ++) {
			var yearStr = yearArr[i];
			var row = new Array();
			row.push( (year == "0" ? "Năm " : "Tháng ") + yearStr);
			for (var ii = 0; ii < header.length; ii++) {
				var index = header[ii];
				if (products[index]) {
					row.push(products[index][yearStr]);
				} else if (ii > 0) {
					row.push(1);
				}
			}
			rows.push(row);
		}
		rows.unshift(header);
		return rows;
	}
	
	var genProfitType = function() {
		var header = new Array(year == "0" ? "year" : "month", "total");
		var rows = new Array();
		for (var i = 0; i < chartData.length; i ++) {
			var data = chartData[i];
			var row = new Array();
			for (var ii = 0; ii < header.length; ii++) {
				var index = header[ii];
				if (!data[index]) row.push(1);
				if (index == "year" || index == "month") {
					row.push((index == "year" ? "Năm " : "Tháng ") + data[index]);
				} else 
					row.push(data[index]);
			}
			rows.push(row);
		}
		rows.unshift(header);
		return rows;
	}
	
	var beginDraw = function() {
		var options = {
		      title: productChart ? "Kết quả phân tích theo từng món ăn" : "Kết quả phân tích theo lợi nhuận từng năm" 
		};  
		var data = google.visualization.arrayToDataTable(productChart ? genFoodType() : genProfitType());
		var chart = new google.visualization.BarChart(thiz.chartContainer);
		chart.draw(data, options);
		Main.busyHandler.unWait();
	}
	google.charts.load('current', {packages: ['corechart']});
	google.charts.setOnLoadCallback(beginDraw);
	
}

ChartPage.prototype.getPageContainer = function() {
	var thiz = this;
	window.setTimeout(function () {
		thiz.drawChart(thiz.typeCombo.options[thiz.typeCombo.selectedIndex].value, thiz.yearCombo.options[thiz.yearCombo.selectedIndex].value);
	}, 100);
	return this.pageContainer;
	
}
