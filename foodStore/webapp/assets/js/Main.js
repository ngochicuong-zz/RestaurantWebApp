App.controller('mainController', function mainController($timeout, $scope) {
	console.log("main controller");
	
	$scope.logout = function() {
		window.location.href="/logout.do?loginCode="+Main.loginCode;
	}
	$scope.activeNavNode = null;
	$scope.navBarOnClick = function(event) {
		var target = event.target;
		console.log(target);
		var pageNode = Dom.findUpward(target, {
			eval: function(node) {
				return node.getAttribute("page-name") != null;
			}
		}); 
		if ($scope.pageManagement.activePage && pageNode.getAttribute("page-name") == $scope.pageManagement.activePage.name) return;
		if ($scope.activeNavNode != null) 
			$scope.activeNavNode.classList.remove("active");
		
		pageNode.className += " active";
		
		
		$scope.activeNavNode = pageNode;
		$scope.pageManagement.active(pageNode.getAttribute("page-name"));
	}
//	this.init = function() {
//		var navbar = document.querySelector("#navbar");
//		var logoutButton = document.querySelector("#logout");
//		logoutButton.addEventListener("click", function() {
//			
//		}, false);
//		var navActived = null;
//		navbar.addEventListener("click", function(event){
//			
//		}, false);
//		window.setTimeout(function() {
//			thiz.navbar.childNodes[1].click();
//		}, 10)
//		var loginItem = document.querySelector("#account-info");
//		Main.pageManagement = this.pageManagement;
//		Main.loginCode = loginItem.getAttribute("loginCode");
//		loginItem.removeAttribute("loginCode");
//	}
	$scope.init = function() {
		$scope.pageManagement = new PageManagement();
//		pageManagement.registerPage(new TablePage());
//		pageManagement.registerPage(new OrderPage());
//		pageManagement.registerPage(new ProductManagementPage());
//		pageManagement.registerPage(new SeatManagementPage());
//		pageManagement.registerPage(new AppointmentPage());
//		pageManagement.registerPage(new AccountManagementPage());
//		pageManagement.registerPage(new PromoManagementPage());
//		pageManagement.registerPage(new ChartPage());
//		pageManagement.registerPage(new AdminPage());
	}
	$timeout($scope.init());
});

App.directive("container-render", function($scope){
	return {
		restrict: "A",
		link: function ($scope) {
				console.log("fkldfj");
		}
	} 
});
//function Main() {
//	this.navbar = document.querySelector("#navbar");
//	this.logoutButton = document.querySelector("#logout");
//	this.logoutButton.addEventListener("click", function() {
//		window.location.href="/logout.do?loginCode="+Main.loginCode;
//	}, false);
//	this.pageManagement = new PageManagement();
//	this.pageManagement.registerPage(new TablePage());
//	this.pageManagement.registerPage(new OrderPage());
//	this.pageManagement.registerPage(new ProductManagementPage());
//	this.pageManagement.registerPage(new SeatManagementPage());
//	this.pageManagement.registerPage(new AppointmentPage());
//	this.pageManagement.registerPage(new AccountManagementPage());
//	this.pageManagement.registerPage(new PromoManagementPage());
//	this.pageManagement.registerPage(new ChartPage());
//	this.pageManagement.registerPage(new AdminPage());
//	var thiz = this;
//	var navActived = null;
//	navbar.addEventListener("click", function(event){
//		var target = event.target;
//		
//		var pageNode = Dom.findUpward(target, {
//			eval: function(node) {
//				return node.getAttribute("page-name") != null;
//			}
//		}); 
//		if (thiz.pageManagement.activePage && pageNode.getAttribute("page-name") == thiz.pageManagement.activePage.name) return;
//		if (navActived != null) 
//			navActived.classList.remove("active");
//		
//		pageNode.className += " active";
//		
//		
//		navActived = pageNode;
//		thiz.pageManagement.active(pageNode.getAttribute("page-name"));
//	}, false);
//	window.setTimeout(function() {
//		thiz.navbar.childNodes[1].click();
//	}, 10)
//	var loginItem = document.querySelector("#account-info");
//	Main.pageManagement = this.pageManagement;
//	Main.loginCode = loginItem.getAttribute("loginCode");
//	loginItem.removeAttribute("loginCode");
//	
//
//}

Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "") + symbol;
};