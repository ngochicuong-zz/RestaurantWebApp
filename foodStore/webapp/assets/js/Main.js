function Main() {
	this.navbar = document.getElementById("navbar");
	this.pageManagement = new PageManagement();
	this.pageManagement.registerPage(new TablePage());
	this.pageManagement.registerPage(new OrderPage());
	this.pageManagement.registerPage(new ProductManagementPage());
	this.pageManagement.registerPage(new SeatManagementPage());
	this.pageManagement.registerPage(new AppointmentPage());
	this.pageManagement.registerPage(new AccountManagementPage());
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