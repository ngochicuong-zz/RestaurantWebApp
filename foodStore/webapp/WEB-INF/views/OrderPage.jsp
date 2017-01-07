 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>

<style>
	#seat-info{
		min-width: 10em;
		background-color: #313236;
		color: #ffffff;
		padding: 0.1em;
		
	}
	#search-info > vbox + hbox {
		
		
	}
	#container-panel {
	}
	#container-panel > table {
		
	}
	#container-panel > table > tbody > tr:hover {
		background-color: #FA6800;
	}
	
	#orderDetailPanel{
		padding: 1em;
	}
	
	#payment-container hbox, #payment-container vbox {
		margin-bottom: 1em;
	}
	
	#payment-container label{
		width: 10em;
	}
	
	#payment-container button{
		width: 8em;
		height: 3em;
	}
	
</style>
<vbox flex="1"> 
<hbox id="seat-info"> 
	<vbox flex="1">
		<hbox class="InputRow" style="display:none;">
			<label>Seat id:</label>
			<label id="seatIdText"></label>
		</hbox>
		<hbox class="InputRow" style="justify-content: center">
			<label>Ngày: </label>
			<label id="orderDate"></label>
		</hbox>
		<hbox class="InputRow" style="justify-content: center; display:none;">
			<label>Mã hóa đơn: </label>
			<label id="order-code" ></label>
		</hbox>
		<hbox style="justify-content: center; margin-left: 0.5em">
			<hbox class="InputRow" style="padding-right:0.5em;">
				<label>Lầu: </label>
				<label id="floorText"></label>
			</hbox>
			<hbox class="InputRow"  style="padding-right:0.5em;">
				<label>Phòng:</label>
				<label id="roomText"></label>
			</hbox>
			<hbox class="InputRow"  style="padding-right:0.5em;">
				<label>Chỗ ngồi:</label>
				<label id="seatCapacity"></label>
			</hbox>
		</hbox>
	</vbox>
	<hbox class="InputRow" style="justify-content: flex-end;color: #000000">
		<button id="checkout-button" class="round-button" title="Check out"><i class="material-icons md-light md-32">payment</i></button>
		<button id="back-button" class="round-button" title="Back"><i class="material-icons md-light md-32">replay</i></button>
	</hbox>	
</hbox> 
<vbox id="container-panel" flex="1">
	<vbox id="orderDetailPanel" flex="1">
		<hbox class="InputRow" id="add-detail-panel" style="margin-bottom: 0.5em; align-items: flex-start;" >
			<hbox flex="1" >
				<label>Món ăn: </label>
				<input flex="1" type="text" id="productText"/>
			</hbox>
			<hbox >
				<label>Số lượng: </label>
				<input style="width:5em;" type="number" min=0.1 step="0.01" id="quality"/>
			</hbox>
			<hbox>
				<button style="width:5em;" id="addOrderDetail"><i class="material-icons md-dark md-32" >add</i></button>
			</hbox>
		</hbox>
		<hbox class="InputRow" id="edit-detail-panel" style="margin-bottom: 0.5em; align-items: flex-start;" >
			<hbox flex="1">
				<label>Món ăn: </label>
				<input flex="1" type="text" id="edit-product-text" disabled/>
			</hbox>
			<hbox>
				<label>Số lượng: </label>
				<input style="width:5em;" type="number" min=0.1 step="0.01" id="edit-quality"/>
			</hbox>
			<hbox>
				<button style="width:5em;" id="edit-detail-button">Lưu</button>
			</hbox>
			<hbox>
				<button style="width:5em;" id="edit-detail-button-cancel">Thoát</button>
			</hbox>
		</hbox>
		<vbox id="orderDetailTable" style="overflow-y:auto; margin-bottom: 1em; " flex="1">
		</vbox>
		<hbox class="InputRow" style="justify-content: flex-end">
				<label>Tổng cộng: </label>
				<label id="order-total" ></label>
		</hbox>
	</vbox>
</vbox> 
<hbox flex="1" id="payment-container" style="margin-top: 1em; justify-content: center" > 
	<vbox>
		<hbox class="InputRow">
			<label>Tổng tiền trên hóa đơn:</label>
			<input type="text" id="total-on-order"/>
		</hbox>
		<vbox >
			<hbox class="InputRow">
				<label>Khuyến mãi áp dụng:</label>
				<select id="promo-code-combo">
				  <option value= -1 selected>--Không chọn--</option>
				</select>
			</hbox>
			<hbox class="InputRow">
				<label></label>
				<p flex="1" id="promo-info" style="color: red;"> Giảm giá: </p>
			</hbox>
			
		</vbox>
		
		<hbox class="InputRow">
			<label>Tổng tiền được giảm:</label>
			<input type="text" id="discount"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Tổng tiền phải trả:</label>
			<input type="text" id="total-pay"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Thực nhận:</label>
			<input type="text" id="realpay"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Payment type:</label>
			<select id="payment-type">
			  <option value= 1 selected>Tiền mặt</option>
			</select>
		</hbox>
		
		<hbox style="justify-content: center">
			<button id="accept-button" style="margin-right:1em" >Thanh toán</button>
			<button id="cancel-button">Thoát</button>
		</hbox>
	</vbox>
</hbox> 
</vbox>