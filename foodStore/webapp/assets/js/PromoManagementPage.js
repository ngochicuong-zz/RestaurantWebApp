function PromoManagementPage() {
	this.name = "promotion-manager-page";
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
	serverReport.getHTML("/getPromoManagementPage.do", "GET", callback);
}

PromoManagementPage.prototype.init = function(){
	this.addButton = this.pageContainer.querySelector("#add-button");
	this.searchButton = this.pageContainer.querySelector("#search-button");
	this.containerPanel = this.pageContainer.querySelector("#container-panel");
	
	this.promoName = this.pageContainer.querySelector("#promo-name");
	this.fromDate = this.pageContainer.querySelector("#from-date");
	this.toDate = this.pageContainer.querySelector("#to-date");
	var thiz = this;
	var theader = new Array("promotionCode", "payCondition", "discount", "fromDate", "toDate",
			"description");
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
					var dialog = new AddPromotionDialog();
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
					var dialog = new AddPromotionDialog(handleItem.data, callback);
					dialog.show();
//				
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
		var dialog = new AddPromotionDialog();
		dialog.show();
	});
	
}

PromoManagementPage.prototype.reloadPage = function() {
	var thiz = this;
	console.log("Search button click.... ");

	var callback = function(seats) {
		thiz.table.render(seats);
	}
	serverReport.getJson("/searchPromotion.do", "GET",
			callback, {
				"description" : thiz.promoName.value,
				"fromDate" : thiz.fromDate.value == "" ? thiz.fromDate.value : moment(thiz.fromDate.value).format('YYYY-MM-DD HH:mm:ss').toString(),
				"toDate" : thiz.toDate.value == "" ? thiz.toDate.value : moment(thiz.toDate.value).format('YYYY-MM-DD HH:mm:ss').toString()
					
	});
}

PromoManagementPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
