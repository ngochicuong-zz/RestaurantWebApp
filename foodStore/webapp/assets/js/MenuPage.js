function MenuPage(){
	this.name="menu-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		id : "pageContainer",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getMenuPage.do", "GET", callback);
}
MenuPage.prototype.init = function(){
	this.foodName = this.pageContainer.querySelector("#foodname");
	this.price = this.pageContainer.querySelector("#price");
	this.category = this.pageContainer.querySelector("#category");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.searchButton.addEventListener("click", function(ev){
		var callback = function(json) {
			thiz.table.render(json);
		}
		serverReport.getJson("/getTables.do?foodName=" + this.foodName.value + "&price" + this.price.value
				+ "&ccategory=" + "", "GET",
				callback);
	})
	var thiz = this;
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	var theader = new Array("id","productname","category","unittype","quantityperunit","price","discontinued");
	this.table=new table();
	this.table.innit(theader);
	this.pageContainer.appendChild(this.table);
	
}
MenuPage.prototype.getPageContainer = function(){
	return this.pageContainer;
}
