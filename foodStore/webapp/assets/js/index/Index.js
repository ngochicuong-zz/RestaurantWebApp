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
	
	IndexMain.renderSlider();
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
		if (navigator.userAgent.toUpperCase().indexOf("CHROME") > -1) document.body.scrollTop = renderPage.offsetTop;
		else document.documentElement.scrollTop = renderPage.offsetTop;
	}
	serverReport.getHTML(patent, "GET", callback);
}

/*
 *  <div class="slide"><img src="sample1.jpg" width="400" height="267" />Slide content 1</div>
    <div class="slide"><img src="sample2.jpg" width="400" height="267" />Slide content 2</div>
    <div class="slide"><img src="sample3.jpg" width="400" height="267" />Slide content 3</div>
 * */
IndexMain.renderSlider = function() {
	var callback = function(promos) {
		console.log(promos);
		if (promos.length == 0) return;
		var slideContainer = document.querySelector("#slides");
		var slidesControllersCollection = document.querySelector("#slides-controls");
		slidesControllersCollection.innerHTML = "";
		for (var i = 0; i < promos.length; i++) {
			var promo = promos[i];
			var element = Dom.newDOMElement({
				_name: "div",
				class: "slide",
				_text: promo.description,
				_children: [
					{
						_name: "img",
						style: "width: 100%; height: 100%;",
						src:bin2string(promo.imagebyte),
					}
				]
			});
			slideContainer.appendChild(element);
			var index = i;
			var element = Dom.newDOMElement({
				_name: "a",
				href: "#",
				_text: index + 1,
			});
			slidesControllersCollection.appendChild(element);
		}
		setUpSlideShow();
	}
	serverReport.getJson("/getPromotionWithImage.do", "GET", callback);
	
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
						_text: product.productName.toUpperCase(),
						style: "padding-right: 0.2em;"
					},
					{
						_name: "hbox",
						style: "border-bottom: dotted 3px; margin-bottom: 3px;",
						flex: "1"
					},
					{
						_name: "hbox",
						_text: product.price.formatMoney(0, " Đ"),
						style: "padding-left: 0.2em;"
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

function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
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