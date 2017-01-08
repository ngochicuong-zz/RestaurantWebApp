function ProductManagementPage() {
	this.name = "product-manager-page";
	this.pageContainer = this.table = Dom.newDOMElement({
		_name : "hbox",
		id : "     ",
		flex: "1"
	});
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getProductManagementPage.do", "GET", callback);
}

ProductManagementPage.prototype.requestItems = function() {
	var thiz = this;
	var callback = function(products) {
		if (products.length == 0) return;
		if (products.length > 1) {
			products.sort(function(a, b){
				return a.id - b.id;
			});
		}
		thiz.products = products;
		thiz.table.render(thiz.products);
	}
	serverReport.getJson("/searchProduct.do", "GET",
			callback, {
				"name" : "" ,
				"price" : -1 ,
				"categories" : "-1"
	});
}

ProductManagementPage.prototype.init = function(){
	var thiz = this;
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	
	this.foodName = this.pageContainer.querySelector("#food-name");
	this.price = this.pageContainer.querySelector("#price");
	this.categories = this.pageContainer.querySelector("#categories");
	
	this.products = new Array();
	this.requestItems();
	
	var renderAction = function(product) {
		var buttons = new Array();
		if (product.discontinued == 't'){
			var button = Dom.newDOMElement({
				_name : "i",
				class : "material-icons md-dark md-18",
				_text : "turned_in",
				title : "Đặt món ăn"
					
			});
			button.action = function() {
				var callback = function(updated) {
					if (updated) {
						var newItem = {};
						newItem = product;
						newItem.discontinued = 'f';
						thiz.onUpdateItem(product, newItem);
					}
				}
				serverReport.getJson("/setDiscontinuedProduct.do", "GET", callback, {
					"productId" : product.id,
					"discontinued" : false
				});
			}
			buttons.push(button);
		} 
		if (product.discontinued == 'f'){
			var button = Dom.newDOMElement({
				_name : "i",
				class : "material-icons md-dark md-18",
				_text : "turned_in_not",
				title : "Dừng món ăn"
			});
			button.action = function() {
				var callback = function(updated) {
					if (updated) {
						var newItem = {};
						newItem = product;
						newItem.discontinued = 't';
						thiz.onUpdateItem(product, newItem);
					}
				}
				serverReport.getJson("/setDiscontinuedProduct.do", "GET", callback, {
					"productId" : product.id,
					"discontinued" : true
				});
			}
			buttons.push(button);
		} 
		var button = Dom.newDOMElement({
			_name : "i",
			class : "material-icons md-dark md-18",
			_text : "mode_edit",
			title : "Chỉnh sửa"
		});
		button.action = function() {
			var callback = function(newItem) {
				var oldItem = product;
				thiz.onUpdateItem(oldItem, newItem);
			}
			var dialog = new AddProductDialog(product, callback);
			dialog.show();
		}
		buttons.push(button);
		return buttons;
	}
	var theader = [
		{
			"column" : "Tên thực phẩm",
			"label" : "productName"
		},
		{
			"column" : "Đơn vị tính",
			"label" : "unitType"
		},
		{
			"column" : "Số lượng trên 1 đơn vị",
			"label" : "quantityPerUnit"
		},
		{
			"column" : "Giá",
			"label" : "price"
		},
		{
			"column" : "Phân loại",
			"label" : "categoryType"
		},
		];
	this.table = new Table();
	this.table.init(theader, renderAction);
	this.table.renderBackground = function(item) {
		return item.discontinued =='t';
	}
	this.containerPanel.appendChild(this.table.getTable());
	
	this.searchButton.addEventListener("click", function(ev) {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Add",
				handler : function(handleItem) {
					var callback = function(newItem) {
						if (newItem) {
							thiz.onCreateItem(newItem);
						}
					}
					var dialog = new AddProductDialog(null, callback);
					dialog.show();
				}
			},
			{
				name : "Edit",
				handler : function(handleItem) {
					var callback = function(newItem) {
						var oldItem = handleItem.data;
						thiz.onUpdateItem(oldItem, newItem);
					}
					var dialog = new AddProductDialog(handleItem.data, callback);
					dialog.show();
			}
			} ]);
	this.table.tableBody.addEventListener("contextmenu", function(e) {
		var target = e.target;
		var dataNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (dataNode != null) {
			e.dataNode = dataNode;
			thiz.contextMenu.toggleMenuOn(e);
		}
	});
	this.addButton.addEventListener("click", function() {
		var callback = function(newItem) {
			if (newItem) {
				thiz.onCreateItem(newItem);
			}
		}
		var dialog = new AddProductDialog(null, callback);
		dialog.show();
	});
	
}

ProductManagementPage.prototype.onSearch = function() {
	var foodName = this.foodName.value;
	var price = this.price.value;
	var categories = this.categories.options[this.categories.selectedIndex].value;
	
	if (foodName == "" && price == "" && categories == -1) return this.products;
	var result = new Array();
	var thiz = this;
	this.products.forEach(function(product){
		if ((foodName == "" || product.productName.indexOf(foodName) != -1)
			&& (price == "" || product.price <= price )
			&& ((categories == -1 || product.categoryType == categories)))
				result.push(product);
	});
	return result;
}

ProductManagementPage.prototype.onUpdateItem = function(oldItem, newItem) {
	var index = this.products.indexOf(oldItem);
	if (index == -1) return;
	this.products[index] = newItem;
	var thiz = this;
	window.setTimeout(function() {
		var result = thiz.onSearch();
		thiz.table.render(result);
	}, 100);
}

ProductManagementPage.prototype.onCreateItem = function(newItem) {
	if (newItem != null) {
		this.products.push(newItem);
		var thiz = this;
		window.setTimeout(function() {
			var result = thiz.onSearch();
			thiz.table.render(result);
		}, 100);
	}
}

ProductManagementPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
