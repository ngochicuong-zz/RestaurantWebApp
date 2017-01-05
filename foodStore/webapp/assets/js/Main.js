function Main() {
	this.navbar = document.getElementById("navbar");
	this.pageManagement = new PageManagement();
	this.pageManagement.registerPage(new TablePage());
	this.pageManagement.registerPage(new OrderPage());
	this.pageManagement.registerPage(new ProductManagementPage());
	this.pageManagement.registerPage(new SeatManagementPage());
	this.pageManagement.registerPage(new AppointmentPage());
	this.pageManagement.registerPage(new AccountManagementPage());
	this.pageManagement.registerPage(new PromoManagementPage());
	this.pageManagement.registerPage(new ChartPage());
	this.pageManagement.registerPage(new AdminPage());
	var thiz = this;
	var navActived = null;
	navbar.addEventListener("click", function(event){
		var target = event.target;
		
		var pageNode = Dom.findUpward(target, {
			eval: function(node) {
				return node.getAttribute("page-name") != null;
			}
		}); 
		
		pageNode.className += " active";
		
		if (navActived != null) 
			navActived.classList.remove("active");
		navActived = pageNode;
		thiz.pageManagement.active(pageNode.getAttribute("page-name"));
	}, false);
	
	Main.pageManagement = this.pageManagement;
	Main.productManagement = new ProductManagement();
	
}
window.addEventListener("load", function(){
	 var mainWindow = new Main();
} );

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