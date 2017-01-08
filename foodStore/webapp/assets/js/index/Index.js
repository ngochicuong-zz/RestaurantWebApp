function IndexMain() {
	this.navContainer = document.querySelector("#nav-container");
	this.loginButton = document.querySelector("#login-button");
	var thiz = this;
	this.navContainer.addEventListener("click", function(e) {
		var navNode = Dom.findUpward(e.target, {
			eval : function(n) {
				return n.getAttribute("navName");
			}
		});
		if (navNode == null) return;
		thiz.renderContainer(navNode.getAttribute("navName"));
	},false);
	
	this.loginButton.addEventListener("click", function() {
		window.location.href = "/loginPage.do";
	})
}

IndexMain.prototype.renderContainer = function(navName){
	var patent = null;
	switch(navName) {
		case "menu" : patent = "/getIndexMenu.do"; break;
		case "aboutus" : patent = "/getAboutUs.do"; break;
		case "contact" :  patent = "/getMailUs.do"; break;
	}
	if (!patent) return;
	var renderPage = document.querySelector("#container-render");
	var callback = function(htmlText) {
		if (!htmlText) return;
		renderPage.innerHTML = htmlText;
		if (navName == "menu") {
			window.setTimeout(function(){
				IndexMain.renderMenu();
			}, 100);
		}
	}
	serverReport.getHTML(patent, "GET", callback);
	
}

IndexMain.renderMenu = function() {
	var foodContainer = document.querySelector("#food-container");
	var waterContainer = document.querySelector("#water-container");
	var callback = function(products) {
		if (products.length == 0) return;
		for (var i = 0; i< products.length; i++) {
			var product = products[i];
			var hbox = Dom.newDOMElement({
				_name : "hbox",
				style : "padding-bottom: 0.5em",
				_children: [
					{
						_name: "hbox",
						_text: product.productName.toUpperCase()
					},
					{
						_name: "hbox",
						style: "border-bottom: dotted 3px; margin-bottom: 3px;",
						flex: "1"
					},
					{
						_name: "hbox",
						_text: product.price.formatMoney(0, " Đ")
					}
				]
			});
			if (product.categoryType == 0) {
				foodContainer.appendChild(hbox);
			} else {
				waterContainer.appendChild(hbox);
			}
			
		}
		
	}
	serverReport.getJson("/searchProduct.do", "GET",
			callback, {
				"name" : "" ,
				"price" : -1 ,
				"categories" : "-1"
	});
}
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
window.addEventListener("load", function() {
	var main = new IndexMain();
})