<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>

<style>
	#seat-info{
		height: 100vh;
		min-width: 10em;
		background-color: #313236;
		color: #ffffff;
		padding: 0.5em;
	}
	#search-info > vbox + hbox {
		margin-top:1em;
		
	}
	#container-panel {
		padding-top: 1em;
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
		width: 5em;
		height: 3em;
	}
	
	#seat-info label {
		width: 5em;
		text-align: center;
	}
</style>
<hbox flex="1"> 
<vbox id="seat-info"> 
	<vbox id="seat-Image">
		<img></img>
	</vbox>
	<vbox flex="1">
		<hbox class="InputRow" >
			<label>Seat id:</label>
			<label id="seatIdText"></label>
		</hbox>
		<hbox class="InputRow">
			<label>floor:</label>
			<label id="floorText"></label>
		</hbox>
		<hbox class="InputRow">
			<label>room:</label>
			<label id="roomText"></label>
		</hbox>
		<hbox class="InputRow">
			<label>capacity:</label>
			<label id="seatCapacity"></label>
		</hbox>
		<hbox>
			<hbox class="InputRow" style="justify-content: flex-start; margin-right:0.5em; color: #000000">
				<button id="checkout-button" class="glyphicon glyphicon-usd round-button" title="Check out"></button>
			</hbox>	
			<hbox style="justify-content: flex-end; color: #000000" flex="1">
				<button id="back-button" class="glyphicon glyphicon-hand-left round-button "title="Back"></button>
			</hbox>	
		</hbox>
	</vbox>
</vbox> 
<vbox id="container-panel" flex="1">
	<vbox>
		<hbox class="InputRow" flex="1" style="justify-content: center">
			<label>Order code: </label>
			<label id="order-code" ></label>
		</hbox>
		<hbox class="InputRow" style="justify-content: center">
			<label>Date: </label>
			<label id="orderDate"></label>
		</hbox>
	</vbox>
	<vbox id="orderDetailPanel" flex="1">
		<hbox class="InputRow" id="add-detail-panel" style="margin-bottom: 0.5em; align-items: flex-start;" >
			<hbox flex="1" >
				<label>Food Name: </label>
				<input flex="1" type="text" id="productText"/>
			</hbox>
			<hbox >
				<label>Quality: </label>
				<input style="width:5em;" type="number" min=0.1 step="0.01" id="quality"/>
			</hbox>
			<hbox>
				<button style="width:5em;" id="addOrderDetail">Add</button>
			</hbox>
		</hbox>
		<hbox class="InputRow" id="edit-detail-panel" style="margin-bottom: 0.5em; align-items: flex-start;" >
			<hbox flex="1">
				<label>Food Name: </label>
				<input flex="1" type="text" id="edit-product-text" disabled/>
			</hbox>
			<hbox>
				<label>Quality: </label>
				<input style="width:5em;" type="number" min=0.1 step="0.01" id="edit-quality"/>
			</hbox>
			<hbox>
				<button style="width:5em;" id="edit-detail-button">Save</button>
			</hbox>
			<hbox>
				<button style="width:5em;" id="edit-detail-button-cancel">Cancel</button>
			</hbox>
		</hbox>
		<vbox id="orderDetailTable" style="overflow-y:auto; margin-bottom: 1em; " flex="1">
		</vbox>
		<hbox class="InputRow" style="justify-content: flex-end">
				<label>Total: </label>
				<label id="order-total" ></label>
		</hbox>
	</vbox>
</vbox> 
<hbox flex="1" id="payment-container" style="margin-top: 1em; justify-content: center" > 
	<vbox>
		<hbox class="InputRow">
			<label>Total on order:</label>
			<input type="text" id="total-on-order"/>
		</hbox>
		<vbox >
			<hbox class="InputRow">
				<label>Promo apply:</label>
				<select id="promo-code-combo">
				  <option value= -1 selected>--select promo--</option>
				</select>
			</hbox>
			<hbox class="InputRow">
				<label></label>
				<p flex="1" id="promo-info" style="color: red;"> Discount: </p>
			</hbox>
			
		</vbox>
		
		<hbox class="InputRow">
			<label>Discount on order:</label>
			<input type="text" id="discount"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Total to pay:</label>
			<input type="text" id="total-pay"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Real pay:</label>
			<input type="text" id="realpay"/>
		</hbox>
		
		<hbox class="InputRow">
			<label>Payment type:</label>
			<select id="payment-type">
			  <option value= 1 selected>Cash</option>
			</select>
		</hbox>
		
		<hbox style="justify-content: center">
			<button id="accept-button" style="margin-right:1em" >Accept</button>
			<button id="cancel-button">Cancel</button>
		</hbox>
	</vbox>
</hbox> 
</hbox>