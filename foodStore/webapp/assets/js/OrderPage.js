function OrderPage() {
	this.name = "order-page";
	
	this.seat;
	this.order = null;
	this.orderDetails = new Array();
	
	this.pageContainer = Dom.newDOMElement({
		_name : "hbox",
		id : "pageContainer",
		flex: "1"
	});
	
	var thiz = this;
	var callback = function(htmlText) {
		thiz.pageContainer.innerHTML = htmlText;
		thiz.init();
	}
	serverReport.getHTML("/getOrderPage.do", "GET", callback);
}

OrderPage.prototype.init = function() {
	this.seatImage = this.pageContainer.querySelector("#seat-Image");
	this.seatId = this.pageContainer.querySelector("#seatIdText");
	this.floor = this.pageContainer.querySelector("#floorText");
	this.room = this.pageContainer.querySelector("#roomText");
	this.capacity = this.pageContainer.querySelector("#seatCapacity");
	
	this.orderCode = this.pageContainer.querySelector("#order-code");
	this.orderDate = this.pageContainer.querySelector("#orderDate");
	this.orderTotal = this.pageContainer.querySelector("#order-total");
	
	this.orderDetailTable = this.pageContainer.querySelector("#orderDetailTable");
	this.productNameIn = this.pageContainer.querySelector("#productText");
	this.qualityIn = this.pageContainer.querySelector("#quality");
	this.addOrderDetailBtn = this.pageContainer.querySelector("#addOrderDetail");
	
	this.addDetailPanel = this.pageContainer.querySelector("#add-detail-panel");
	
	this.orderContainer =  this.pageContainer.querySelector("#container-panel");
	this.paymentContainer = this.pageContainer.querySelector("#payment-container");
	
	this.checkoutButton = this.pageContainer.querySelector("#checkout-button");
	this.backButton = this.pageContainer.querySelector("#back-button");
	this.printButton = this.pageContainer.querySelector("#print-button");
	
	this.promoInfo = this.pageContainer.querySelector("#promo-info");
	this.totalOnOrder = this.pageContainer.querySelector("#total-on-order");
	this.promoCodeCombo = this.pageContainer.querySelector("#promo-code-combo");
	this.discount = this.pageContainer.querySelector("#discount");
	this.totalPay = this.pageContainer.querySelector("#total-pay");
	this.realPay = this.pageContainer.querySelector("#realpay");
	this.paymentType = this.pageContainer.querySelector("#payment-type");
	this.paymentAcceptBtn = this.pageContainer.querySelector("#accept-button");
	this.paymentCancelBtn = this.pageContainer.querySelector("#cancel-button");
	
	this.paymentContainer.style.display = "none";
	
	var thiz = this;
	
	this.printButton.addEventListener("click", function() {
		var callback = function(htmlText) {
			var container = Dom.newDOMElement({
				_name : "hbox",
				id : "pageContainer",
				style: "justify-content: center; width: 559.68px; border: inset 0.3em;"
			});
			container.innerHTML = htmlText;
			var theader = [
				{
					"column" : "Món ăn",
					"label" : "productName"
				},
				{
					"column" : "Số lượng",
					"label" : "quality"
				},
				{
					"column" : "Giá tiền",
					"label" : "price"
				},
				{
					"column" : "Thành tiền",
					"label" : "total"
				}
				]
			var table = new Table();
			table.init(theader);
			table.render(thiz.orderDetails);
			var billContainer = container.querySelector("#bill-container");
			var billTotal = container.querySelector("#bill-total");
			var discountPanel = container.querySelector("#discount-panel");
			var floorText = container.querySelector("#floorText");
			var roomText = container.querySelector("#roomText");
			var dateText = container.querySelector("#orderDate");
			
			floorText.innerHTML = thiz.seat.floor;
			roomText.innerHTML = thiz.seat.room;
			dateText.innerHTML = moment(thiz.order.dataInsert).format("DD-MM-YYYY h:mm a");
			billContainer.appendChild(table.getTable());
			billTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
			
			if (thiz.discount.value == "") {
				discountPanel.style.display="none";
			} else {
				discountPanel.style.display="inherit";
				var billDiscount = container.querySelector("#bill-discount");
				var billTotalAfter = container.querySelector("#bill-total-after");
				billDiscount.innerHTML = parseInt(thiz.discount.value).formatMoney(0, " Đ");
				billTotalAfter.innerHTML = parseInt(thiz.totalPay.value).formatMoney(0, " Đ");
			}
			
			PrintHandle.Print(container);
		}
		serverReport.getHTML("/getBillTemplate.do", "GET", callback);
	})
	
	this.backButton.addEventListener("click", function(ev){
		Main.pageManagement.active("table-page");
	});
	this.addOrderDetailBtn.addEventListener("click", function(e){
		if (thiz.productNameIn.value == "") {
			Dialog.alert("Lỗi! ","Vui lòng nhập tên món ăn"
					, "Close", null, null , null, null, null
			);
			return;
		};
		var dataNode = Dom.findUpward(e.target, {
			eval: function(node) { 
				return node.data;
			}
		});
		if (dataNode == null) return;
		
		var productName = dataNode.data.productName;
		
		var callback = function(orderDetail) {
			if (orderDetail.length == 0) return;
			thiz.productNameIn.value = "";
			thiz.qualityIn.value = 0;
			thiz.orderDetails.push(orderDetail);
			thiz.detailTable.render(thiz.orderDetails);
			thiz.order.total += orderDetail.total;
			thiz.orderTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
			console.log(orderDetail);
		}
		for(var i = 0; i < thiz.orderDetails.length; i++) {
			var detail = thiz.orderDetails[i];
			if (detail.productName == productName) {
				var index = i;
				callback = function(orderDetail) {
					orderDetail = thiz.orderDetails[index];
					var quality = parseInt(thiz.qualityIn.value) + parseInt(thiz.orderDetails[index].quality);
					thiz.order.total += thiz.qualityIn.value * orderDetail.price;
					thiz.orderDetails[index].quality = quality;
					thiz.orderDetails[index].total = quality * orderDetail.price;
					thiz.detailTable.render(thiz.orderDetails);
					thiz.orderTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
					thiz.productNameIn.value = "";
					thiz.qualityIn.value = 0;
					e.target.data = null;
				}
				break;
			}
		}
		thiz.orderDetailTable.scrollTop = thiz.orderDetailTable.scrollHeight;
		serverReport.getJson("/createOrderDetail.do?refCode="+ thiz.order.refCode +"&quality="+ thiz.qualityIn.value +"&productId="+ dataNode.data.id +"", "GET", callback);
	});
	
	var renderAction = function(orderDetail) {
		var buttons = new Array();
		var button = Dom.newDOMElement({
			_name : "i",
			class : "material-icons md-dark md-18",
			_text : "clear",
			title : "Hủy món ăn"
				
		});
		button.action = function() {
			var callback = function(bool) {
				if (bool) {
					var index = thiz.orderDetails.indexOf(orderDetail);
					thiz.orderDetails.splice(index,1);
					thiz.detailTable.removeChild(thiz.detailTable.tableBody.childNodes[index]);
					thiz.order.total -= orderDetail.total;
					thiz.orderTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
				}
			};
			serverReport.getBoolean("/removeOrderDetail.do?detailId=" + orderDetail.id + "", "GET", callback);
		}
		buttons.push(button);
		return buttons;
	}
	var theader = [
		{
			"column" : "Món ăn",
			"label" : "productName"
		},
		{
			"column" : "Số lượng",
			"label" : "quality"
		},
		{
			"column" : "Giá tiền",
			"label" : "price"
		},
		{
			"column" : "Thành tiền",
			"label" : "total"
		}
		]
	this.detailTable = new Table();
	this.detailTable.init(theader, renderAction);
	this.detailTable.renderBackground = function(item) {
		return item.quality == 0;
	}
	this.orderDetailTable.insertBefore(this.detailTable.getTable(), this.orderDetailTable.childNodes[0]);
	
	this.contextMenu = new ContextMenu();
	var thiz = this;
	this.contextMenu.init([
			{
				name : "Hủy món đã gọi",
				handler : function(handleItem) {
					var orderDetail = handleItem.data;
					var callback = function(bool) {
						if (bool) {
							var index = thiz.orderDetails.indexOf(thiz.orderDetail);
							thiz.orderDetails.splice(index,1);
							thiz.detailTable.removeChild(handleItem);
							thiz.order.total -= orderDetail.total;
							thiz.orderTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
						}
					};
					serverReport.getBoolean("/removeOrderDetail.do?detailId=" + orderDetail.id + "", "GET", callback);
				}
			}
			]);
	this.detailTable.tableBody.addEventListener("contextmenu", function(e) {
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
	
	this.detailTable.tableBody.addEventListener("dblclick", function(e) {
		var target = e.target;
		var trNode = Dom.findUpward(target, {
			eval : function(n) {
				return n.data;
			}
		});
		if (trNode == null || !target.quality) return;
		var inputPopup = new InputPopup(target, trNode.data["quality"]);
		var orderDetail = trNode.data;
		inputPopup.onAccept = function(quality) {
			var callback = function(bool) {
				if (bool) {
					var index = thiz.orderDetails.indexOf(orderDetail);
					thiz.order.total += ( (quality * orderDetail.price) - orderDetail.total) ;
					thiz.orderDetails[index].quality = quality;
					thiz.orderDetails[index].total = quality * orderDetail.price;
					thiz.detailTable.render(thiz.orderDetails);
					thiz.orderTotal.innerHTML = thiz.order.total.formatMoney(0, " Đ");
				}
			};
			serverReport.getBoolean("/updateOrderDetail.do?detailId=" + orderDetail.id + "&quality="+ quality +"", "GET", callback);
		}
		inputPopup.toggleMenuOn();
	});
	
	this.comboPopup = new ComboPopup();
	this.comboPopup.renderHandler = function(popupContainer, items){
		popupContainer.innerHTML = "";
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			var container =  Dom.newDOMElement({
				_name : "hbox",
				flex:"1",
				style: "padding: 0.5em",
				class: "combo-popup__item",
				_children: [
					{
						_name : "hbox",
						_text : item["productName"],
						flex:"2"
					
					},
					{
						_name : "hbox",
						_text : item["price"].formatMoney(0, " Đ"),
						flex : "1",
						style: "justify-content: flex-end"
					},
					{
						_name : "hbox",
						_text : item["unitType"],
						style: "width: 5em; justify-content: flex-end"
					}
				]
			});
			container.data = item;
			popupContainer.appendChild(container);
		}
	};
	this.comboPopup.action = function(item) {
		if (item.data == null) return;
		thiz.productNameIn.value = item.data.productName;
		thiz.addOrderDetailBtn.data = item.data;
	}
	
	this.productNameIn.addEventListener("keypress", function(e) {
		if (e.keyCode == 13) {
			var value = thiz.productNameIn.value;
			var callback = function(products) {
				if (products == null) return;
				console.log(products);
				thiz.comboPopup.renderItems(products);
				thiz.comboPopup.toggleMenuOn(e.target);
			}
			serverReport.getJson("/searchProduct.do", "GET",
					callback, {
						"name" : value,
						"price" : -1,
						"categories" : -1
			});
		}
	})
	
	this.checkoutButton.addEventListener("click", function() {
		thiz.paymentContainer.style.display = "inherit";
		thiz.orderContainer.style.display = "none";
		thiz.checkoutButton.style.display = "none";
		thiz.backButton.style.display="none";
		thiz.printButton.style.display="inherit";
		thiz.paymentInit();
	});
	
	this.paymentAcceptBtn.addEventListener("click", function(){
		var order = thiz.order;
		var promoData = thiz.promoCodeCombo.options[thiz.promoCodeCombo.selectedIndex].promoData;
		var realPay = thiz.realPay;
		var callback = function(payment) {
			if (payment == null) return;
			Main.pageManagement.active("table-page");
		}
		var promotionCode = promoData == null ? "~" : promoData.promotionCode;
		serverReport.getJson("/createPayment.do?refCode="+ order.refCode +"&promotionCode="+ promotionCode +"&realPay="+ realPay.value +"", "GET", callback);
	},false);
	
	this.paymentCancelBtn.addEventListener("click", function(){
		thiz.paymentContainer.style.display = "none";
		thiz.orderContainer.style.display = "inherit";
		thiz.totalOnOrder.value = "";
		thiz.promoCodeCombo.innerHTML = "";
		thiz.discount.value = "";
		thiz.totalPay.value = "";
		thiz.realPay.value = "";
		thiz.paymentType.value = 1;
		thiz.printButton.style.display="none";
		thiz.backButton.style.display="inherit";
		thiz.checkoutButton.style.display="inherit";
	},false);
	
	this.promoCodeCombo.addEventListener("change", function(e){
		var promoData = thiz.promoCodeCombo.options[thiz.promoCodeCombo.selectedIndex].promoData;
		var order = thiz.order;
		if (promoData == null) {
			thiz.discount.value = "0";
			thiz.totalPay.value = order.total;
			thiz.promoInfo.innerHTML = "Discount: ";
			return;
		}
		thiz.promoInfo.innerHTML = "Discount: " + (promoData.discount < 1 ? promoData.discount * 100 + "%" : promoData.discount);
		if (parseInt(promoData.discount) <= 1 ) {
			thiz.discount.value = order.total * parseFloat(promoData.discount);
		} else {
			thiz.discount.value = promoData.discount;
		}
		thiz.totalPay.value = order.total - parseFloat(thiz.discount.value);
	},false);
}

OrderPage.prototype.paymentInit = function() {
	var order = this.order;
	this.totalOnOrder.value = "";
	this.promoCodeCombo.innerHTML = "";
	this.discount.value = "";
	this.totalPay.value = "";
	this.realPay.value = "";
	this.paymentType.value = 1;
	this.totalOnOrder.value = order.total;
	this.totalPay.value = order.total;
	var thiz = this;
	var callback = function(promos) {
		thiz.renderPromoCombo(promos);
	}
	serverReport.getJson("/getPromotionByPay.do?pay="+ order.total +"", "GET", callback);
}

OrderPage.prototype.renderPromoCombo = function(promos) {
	this.promoCodeCombo.innerHTML = "";
	var optionNode = Dom.newDOMElement({
		_name : "option",
		_text : promos.length > 0 ? "--Không chọn--" : "--Không tìm thấy khuyến mãi--"
	});
	this.promoCodeCombo.appendChild(optionNode);
	if (promos.length > 0) {
		for(var i = 0; i < promos.length; i++) {
			var promo = promos[i];
			var optionNode = Dom.newDOMElement({
				_name : "option",
				value : promo.promotionCode,
				_text : promo.description
			});
			optionNode.promoData = promo;
			this.promoCodeCombo.appendChild(optionNode);
		}
	}
}

OrderPage.prototype.renewPage = function() {
	this.seat = null;
	this.order = null;
	this.orderDetails = new Array();
	
	this.detailTable.tableBody.innerHTML = "";
	this.seatId.innerHTML = "";
	this.floor.innerHTML = "";
	this.room.innerHTML = "";
	this.capacity.innerHTML = "";
	this.orderCode.innerHTML = "";
	this.orderDate.innerHTML = "";
	
	this.printButton.style.display="none";
	this.backButton.style.display="inherit";
	this.checkoutButton.style.display="inherit";
}

OrderPage.prototype.open = function(seat) {
	this.paymentContainer.style.display = "none";
	this.orderContainer.style.display = "inherit";
	
	if (seat != this.seat) {
		this.renewPage();
		this.seat = seat;
		this.seatId.innerHTML = this.seat.id;
		this.floor.innerHTML = this.seat.floor;
		this.room.innerHTML = this.seat.room;
		this.capacity.innerHTML = this.seat.capacity;
		this.requestOrder(seat);
	} 
}

OrderPage.prototype.requestOrder = function(seat){
	var thiz = this;
	var callback = function(order){
		thiz.order = order;
		if (order.id == null) return;
		thiz.orderCode.innerHTML = order.refCode;
		thiz.orderTotal.innerHTML = order.total.formatMoney(0, " Đ");
		thiz.orderDate.innerHTML = moment(order.dataInsert).format("DD-MM-YYYY h:mm a");
		thiz.requestOrderDetail(order);
	}
	serverReport.getJson("/getOrderWithSeat.do?seatId="+ seat.id +"", "GET", callback);
}

OrderPage.prototype.requestOrderDetail = function(order) {
	if (order == null) return;
	var thiz = this;
	var callback = function(orderDetails){
		if (orderDetails.length == 0) return;
		thiz.detailTable.render(orderDetails);
		console.log(thiz.orderDetails);
		thiz.orderDetails = orderDetails;
		window.setTimeout(function() {
			thiz.orderDetailTable.scrollTop = thiz.orderDetailTable.scrollHeight;
		},10);
	}
	serverReport.getJson("/getOrderDetailByRefCode.do?refCode="+ order.refCode +"", "GET", callback);
}

OrderPage.prototype.getPageContainer = function() {
	this.renewPage();
	this.orderDetailTable.scrollTop = 100;
	this.printButton.style.display="none";
	return this.pageContainer;
}
