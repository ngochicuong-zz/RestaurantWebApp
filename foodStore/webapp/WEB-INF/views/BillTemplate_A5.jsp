<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>
<style>
	#title {
		text-align: center;
		font-family: liberties;
		font-weight: 800;
		border-bottom: double 3px #000;
		padding-bottom: 0.5em;
		margin-left: 2em;
		margin-right: 2em;
	}
	
	#title span {
		justify-content: center;
		font-family: liberties;
		font-size:1em;
		font-weight: 400;
	}
	.line{
		border-top: solid 1px #000;
		padding-bottom: 0.5em;
	}

	#print-content label{
		font-weight: normal;
	}
</style>
<vbox flex="1" style="padding:1em" id="print-content">
 	<vbox id="title">
 		<h3 style="font-weight: 800;">NHÀ HÀNG QUÊ TA</h3>
 		<span> 31 Cao Thắng - Phường 2 - Quận 3 - TPHCM</span>
 	</vbox>
 	<hbox class="InputRow" style="justify-content: center" >
		<label style="padding-left: 0.2em;">Ngày: </label>
		<label id="orderDate"></label>
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
	</hbox>
 	<hbox id="bill-container" style="padding-top: 1em;"></hbox>
 	<hbox class="InputRow" style="font-size:1.3em; font-weight: 700; justify-content: flex-end">
 		<label style="padding-right: 0.5em">Tổng tiền: </label>
 		<label id="bill-total" style="padding-right: 0.5em"></label>
 	</hbox>
 	<vbox id="discount-panel">
 		<hbox class="InputRow" style="font-size:1.3em; font-weight: 700; justify-content: flex-end">
 			<label style="padding-right: 0.5em">Giảm giá: </label>
 			<label id="bill-discount" style="padding-right: 0.5em"></label>
 		</hbox>
 		<hbox class="InputRow" style="font-size:1.3em; font-weight: 700; justify-content: flex-end">
 			<label style="padding-right: 0.5em">Còn lại: </label>
 			<label id="bill-total-after" style="padding-right: 0.5em"></label>
 		</hbox>
 	</vbox>
 
 </vbox>
