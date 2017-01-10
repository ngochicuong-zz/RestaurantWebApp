 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>

<style>
	#seat-info{
		min-width: 10em;
	    background-color: #FBA800;
	    box-shadow: 1px 1px 5px #000;
	    border-top: solid 2px #000;
	}
		
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
		padding: 0.5em;
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
		<hbox class="InputRow" style=" padding-left: 1em; justify-content: flex-start;" flex="1">
		</hbox>	
		<vbox flex="2" style="color: #fff;">
			<hbox class="InputRow" style="display:none;">
				<label>Seat id:</label>
				<label id="seatIdText"></label>
			</hbox>
			<hbox class="InputRow" style="justify-content: center; display:none;">
				<label>Mã hóa đơn: </label>
				<label id="order-code" ></label>
			</hbox>
			<hbox style="justify-content: center;">
				<hbox class="InputRow" style="padding-right:0.5em;">
					<label>Lầu: </label>
					<label id="floorText" style="padding-left:0.2em"></label>
				</hbox>
				<hbox class="InputRow"  style="padding-right:0.5em;">
					<label>Phòng:</label>
					<label id="roomText" style="padding-left:0.2em"></label>
				</hbox>
				<hbox class="InputRow"  style="padding-right:0.5em;">
					<label>Chỗ ngồi:</label>
					<label id="seatCapacity" style="padding-left:0.2em"></label>
				</hbox>
			</hbox>
			<hbox class="InputRow" style="justify-content: center" >
				<label>Ngày: </label>
				<label id="orderDate"></label>
			</hbox>
		</vbox>
		<hbox class="InputRow" style="padding-right: 1em; justify-content: flex-end;" flex="1">
			<button id="checkout-button" title="Thanh toán"><i>payment</i></button>
			<button id="back-button" title="Quay lại"><i>replay</i></button>
			<button id="print-button" title="In hóa đơn"><i>print</i></button>
		</hbox>	
	</hbox> 
	<vbox id="container-panel" flex="1">
		<vbox id="orderDetailPanel" flex="1">
			<vbox id="orderDetailTable" style="overflow-y:auto;" flex="1">
				<hbox class="InputRow" id="add-detail-panel" style="margin-bottom: 0.5em;" >
				<hbox flex="1">
					<label>Món ăn: </label>
					<input flex="1" style="margin-left: 0.5em;" type="text" id="productText"/>
				</hbox>
				<hbox >
					<label>Số lượng: </label>
					<input style="width:5em; margin-left: 0.5em;" value = 0 type="number" min=0.1 step="0.01" id="quality"/>
				</hbox>
				<hbox>
					<button style="font-size: 0.8em;" id="addOrderDetail"><i>add</i><span>Thêm món ăn</span></button>
				</hbox>
				<hbox style="justify-content: flex-end; color: red;" flex="1">
						<h4>Tổng cộng: </h4>
						<h4 style="padding-left: 0.2em" id="order-total"></h4>
				</hbox>
			</hbox>
			</vbox>
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