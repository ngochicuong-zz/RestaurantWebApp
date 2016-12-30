function Main() {
	this.navbar = document.getElementById("navbar");
	this.pageManagement = new PageManagement();
	this.pageManagement.registerPage(new TablePage());
	this.pageManagement.registerPage(new OrderPage());
	this.pageManagement.registerPage(new MenuPage());
	this.pageManagement.registerPage(new AppointmentPage());
	this.pageManagement.registerPage(new AdminPage());
	var thiz = this;
	navbar.addEventListener("click", function(event){
		var target = event.target;
		
		var pageName = Dom.findUpward(target, {
			eval: function(node) {
				return node.getAttribute("page-name") != null;
			}
		}).getAttribute("page-name"); 
		thiz.pageManagement.active(pageName);
	}, false);
	
	Main.pageManagement = this.pageManagement;
	Main.productManagement = new ProductManagement();
	
}
window.addEventListener("load", function(){
	 var mainWindow = new Main();
} );