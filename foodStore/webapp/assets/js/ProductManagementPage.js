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

ProductManagementPage.prototype.init = function(){
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	this.foodName = this.pageContainer.querySelector("#food-name");
	this.price = this.pageContainer.querySelector("#price");
	this.categories = this.pageContainer.querySelector("#categories");
	
	var thiz = this;
	
	var theader = new Array("productName", "unitType", "quantityPerUnit", "price", "discontinued",
			"categoryType");
	this.table = new Table();
	this.table.init(theader);
	this.containerPanel.appendChild(this.table.getTable());
	
	this.searchButton.addEventListener("click", function(ev) {
		thiz.reloadPage();
	}, false);

	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Add",
				handler : function(handleItem) {
					var dialog = new AddProductDialog();
					dialog.show();
				}
			},
			{
				name : "Edit",
				handler : function(handleItem) {
					var callback = function() {
						window.setTimeout(function() {
							thiz.reloadPage();
						}, 100)
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
		var dialog = new AddProductDialog();
		dialog.show();
	});
	
}

ProductManagementPage.prototype.reloadPage = function() {
	var thiz = this;
	var c = this.categories;

	var callback = function(seats) {
		thiz.table.render(seats);
	}
	serverReport.getJson("/searchProduct.do", "GET",
			callback, {
				"name" : this.foodName.value,
				"price" : this.price.value == "" ? -1 : this.price.value,
				"categories" : c.options[c.selectedIndex].value
	});
}

ProductManagementPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
