function OrderPage() {
	this.name = "order-page";
	this.seat;
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
	serverReport.getHTML("/getOrderPage.do", "GET", callback);
	
	this.order;
	this.orderDetails = new Array();
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
	
	
	this.backButton = this.pageContainer.querySelector("#back-button");
	console.log(this.backButton);
	this.backButton.addEventListener("click", function(ev){
		Main.pageManagement.active("table-page");
	});
	var thiz = this;
	this.addOrderDetailBtn.addEventListener("click", function(e){
		
		if (thiz.productNameIn.value == "" || thiz.qualityIn.value == "") return;
		var callback = function(orderDetail) {
			if (orderDetail.length == 0) return;
			thiz.productNameIn.value = "";
			thiz.qualityIn.value = "";
			thiz.orderDetails.push(orderDetail);
			thiz.detailTable.render(thiz.orderDetails);
			thiz.order.total += orderDetail.total;
			thiz.orderTotal.innerHTML = thiz.order.total;
			console.log(orderDetail);
		}
		serverReport.getJson("/createOrderDetail.do?refCode="+ thiz.order.refCode +"&quality="+ thiz.qualityIn.value +"&productId="+ e.target.data.id +"", "GET", callback);
	});
	var theader = new Array("productName", "quality", "price", "note", "total");
	this.detailTable = new Table();
	this.detailTable.init(theader);
	this.orderDetailTable.insertBefore(this.detailTable.getTable(), this.orderDetailTable.childNodes[0]);
	
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
						_text : item["price"] + " vnd",
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
		
		console.log(item.data);
	}
	
	var thiz = this;
	this.productNameIn.addEventListener("change", function(e) {
		var value = thiz.productNameIn.value;
		var callback = function(products) {
			if (products == null) return;
			console.log(products);
			thiz.comboPopup.renderItems(products);
			thiz.comboPopup.toggleMenuOn(e.target);
		}
		serverReport.getJson("/searchProduct.do?name="+ value +"", "GET", callback);
	})
}

OrderPage.prototype.renewPage = function(){
	this.seat = null;
	this.detailTable.tableBody.innerHTML = "";
	this.seatId.innerHTML = "";
	this.floor.innerHTML = "";
	this.room.innerHTML = "";
	this.capacity.innerHTML = "";
	this.orderCode.innerHTML = "";
	this.orderDate.innerHTML = "";
	this.order = null;
	this.orderDetails = new Array();
}

OrderPage.prototype.renderWithSeat = function(seat) {
	this.renewPage();
	this.seat = seat;
	this.seatId.innerHTML = this.seat.id;
	this.floor.innerHTML = this.seat.floor;
	this.room.innerHTML = this.seat.room;
	this.capacity.innerHTML = this.seat.capacity;
	this.renderOrder(seat);
}

OrderPage.prototype.renderOrder = function(seat){
	var thiz = this;
	var callback = function(order){
		thiz.order = order;
		console.log(order.id);
		if (order.id == null) return;
		thiz.orderCode.innerHTML = order.refCode;
		thiz.orderTotal.innerHTML = order.total;
		thiz.orderDate.innerHTML = moment(order.dataInsert).format("DD-MM-YYYY h:mm a");
		thiz.renderOrderDetail(order);
	}
	serverReport.getJson("/getOrderWithSeat.do?seatId="+ seat.id +"", "GET", callback);
}

OrderPage.prototype.renderOrderDetail = function(order) {
	if (order == null) return;
	var thiz = this;
	var callback = function(orderDetails){
		if (orderDetails.length == 0) return;
		thiz.detailTable.render(orderDetails);
		console.log(thiz.orderDetails);
		thiz.orderDetails = orderDetails;
	}
	serverReport.getJson("/getOrderDetailByRefCode.do?refCode="+ order.refCode +"", "GET", callback);
}

OrderPage.prototype.getPageContainer = function() {
	return this.pageContainer;
}
