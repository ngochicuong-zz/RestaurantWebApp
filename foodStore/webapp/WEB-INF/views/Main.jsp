 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="webapp/assets/css/Main.css">
<link rel="stylesheet" href="webapp/assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="webapp/assets/css/material_icon.css">
<link rel="stylesheet" href="webapp/assets/css/pikaday.css">
<link rel="stylesheet" href="webapp/assets/css/busy.css">

<script src="webapp/assets/js/jquery-1.11.1.min.js"></script>
<script src="webapp/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="webapp/assets/js/ServerSide.js"></script>
<script src="webapp/assets/js/common-dom.js"></script>

<script src="webapp/assets/js/InputPopup.js"></script>
<script src="webapp/assets/js/Print.js"></script>
<script src="webapp/assets/js/ChartPage.js"></script>
<script src="webapp/assets/js/AddImageDialog.js"></script>
<script src="webapp/assets/js/AddPromotionDialog.js"></script>
<script src="webapp/assets/js/PromoManagementPage.js"></script>
<script src="webapp/assets/js/AddProductDialog.js"></script>
<script src="webapp/assets/js/AddAccountDialog.js"></script>
<script src="webapp/assets/js/AddTableDialog.js"></script>
<script src="webapp/assets/js/SeatManagementPage.js"></script>
<script src="webapp/assets/js/AdminPage.js"></script>
<script src="webapp/assets/js/CalendarDialog.js"></script>
<script src="webapp/assets/js/moment.js"></script>
<script src="webapp/assets/js/Dialog.js"></script>
<script src="webapp/assets/js/ComboPopup.js"></script>
<script src="webapp/assets/js/PageManagement.js"></script>
<script src="webapp/assets/js/ContextMenu.js"></script>
<script src="webapp/assets/js/AppointmentPage.js"></script>
<script src="webapp/assets/js/daypilot-all.min.js"></script>
<script src="webapp/assets/js/Main.js"></script>
<script src="webapp/assets/js/Table.js"></script>
<script src="webapp/assets/js/TablePage.js"></script>
<script src="webapp/assets/js/OrderPage.js"></script>
<script src="webapp/assets/js/ProductManagementPage.js"></script>
<script src="webapp/assets/js/pikaday.js"></script>
<script src="webapp/assets/js/AccountManagementPage.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<title>Quê Ta restaurant</title>
<style>
	#navbar {
		height: 37px;
	    line-height: 37px;
	    color: #ddd;
	    text-shadow: 0 -1px black;
	    background: #243942;
	    border-bottom: 1px solid #191919;
	   	background-image: -webkit-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
		background-image: -moz-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
		background-image: -o-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
		background-image:  linear-gradient(to bottom, #696464, #272727 50%, #1C1C20 50%, #000);
	    box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.1), 0 0 3px rgba(0, 0, 0, 0.8);
	}
	#navbar .navbar-items {
		max-height: 3em;
		padding-right: 1em;
	}
	
	#navbar .navbar-items span{
		font-weight: bold;
		display: table-cell;
		vertical-align: middle;
	}
	
	#navbar .active {
		  padding-right: 16px;
		  background-color: #4e4e4e;
		  border-right: 0;
		  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.7);
		  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.7);
	}
	
	#navbar .navbar-items {
		margin: 0;
	    padding: 0;
	    border: 0;
	    font-size: 100%;
	    font: inherit;
	    vertical-align: baseline;
	    border-left: 1px solid #191919;
    	border-right: 1px solid rgba(255, 255, 255, 0.05);
    	min-width: 5em;
    	padding: 0em 1em 0em 1em;
    	cursor: pointer;
	}
	
	#navbar .navbar-items:hover {
		  background: #2f4b56;
  		  background: rgba(255, 255, 255, 0.1);
	}
	
	table tr td{
		white-space: nowrap;
		word-wrap: break-word;
		text-overflow: ellipsis;
		max-width: 5em;
		text-align: center;
		overflow: hidden;
		font-family: liberties;
		background-color: #f5790000;
		vertical-align: middle !important;
	}
	
	table > tbody > tr > td > i{
		padding-left: 0.1em;
	}
	
	table > tbody > tr:hover {
		outline: solid 1px #FA6800;
	}
	
	table > thead  {
		background-color: #EAEAEA;
	}
</style>
</head>
<body>
	<vbox flex="1" id="main-interface">
		<hbox id="navbar">
			<hbox class="navbar-items InputRow" page-name="table-page">
				<i class="material-icons orange600 md-16" >airline_seat_recline_normal</i>
				<span>BÀN - CHỖ NGỒI</span>
			</hbox>
			<c:if test="${role == 3 || role == 2}">
				<hbox class="navbar-items InputRow" page-name="appointment-page">
					<i class="material-icons orange600 md-16" >event</i>
					<span >ĐẶT BÀN</span>
				</hbox>
			</c:if>
			
			<c:if test="${role == 1 || role == 2}">
				<hbox class="navbar-items InputRow" page-name="chart-page">
					<i class="material-icons orange600 md-16" >pie_chart</i>
					<span>THỐNG KÊ</span>
				</hbox>
			</c:if>
			<c:if test="${role == 2}">
				<hbox class="navbar-items InputRow" page-name="admin-page">
					<i class="material-icons orange600 md-16" >settings</i>
					<span>QUẢN LÝ HỆ THỐNG</span>
				</hbox>
			</c:if>
			<hbox flex="1">
				<hbox flex="1"></hbox>
				<hbox id="logout" class="navbar-items InputRow" style="justify-content: center">
					<i class="material-icons orange600 md-16" loginCode="${loginCode}" id="account-info">account_circle</i>
					<span>ĐĂNG XUẤT</span>
				</hbox>
			</hbox>
		</hbox>
		<hbox id="main-container" flex="1" style="overflow: auto">
		</hbox>
	</vbox>
	<hbox id="print-space"></hbox>
</body>
</html>