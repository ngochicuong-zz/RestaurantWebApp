function ProductManagement() {
	this.products={};
	var thiz = this;
	var callback = function(products) {
		console.log(products);
		for(var i = 0; i < products.length; i++) {
			var product = products[i];
			thiz.products[product.id] = product;
		}
	}
	serverReport.getJson("/getProducts.do", "GET", callback);
}

ProductManagement.prototype.getProductWithId = function(productId){
	return this.products[productId]
}

