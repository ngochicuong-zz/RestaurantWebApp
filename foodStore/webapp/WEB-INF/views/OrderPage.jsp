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
		box-shadow: -2px 0px 10px #000000;
	}
	#container-panel > table {
		
	}
	#container-panel > table > tbody > tr:hover {
		background-color: #FA6800;
	}
	
	#orderDetailPanel{
		padding: 1em;
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
		<hbox style="justify-content: flex-end; color: #000000">
			<button id="back-button" class="glyphicon glyphicon-triangle-left"> back</button>
		</hbox>	
	</vbox>
</vbox> 
<vbox id="container-panel" flex="1">
	<vbox>
		<hbox class="InputRow" flex="1" style="justify-content: center">
			<label>Order id: </label>
			<label id="orderId" ></label>
		</hbox>
		<hbox class="InputRow" style="justify-content: center">
			<label>Date: </label>
			<label id="orderDate"></label>
		</hbox>
	</vbox>
	<vbox id="orderDetailPanel" flex="1">
		<vbox id="orderDetailTable" style="overflow-y:auto; margin-bottom: 1em; " flex="1"></vbox>
		<hbox class="InputRow" style="align-items: flex-start;" >
			<hbox flex="1">
				<input flex="1" type="text" id="productText"/>
			</hbox>
			<hbox>
				<input style="width:5em;" type="number" min=0.1 step="0.01" id="quality"/>
			</hbox>
			<hbox>
				<button style="width:5em;" id="addOrderDetail">add</button>
			</hbox>
		</hbox>
	</vbox>
</vbox> 
</hbox>