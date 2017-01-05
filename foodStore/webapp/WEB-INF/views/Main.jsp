 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="webapp/assets/css/Main.css">
<link rel="stylesheet" href="webapp/assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="webapp/assets/css/material_icon.css">


<script src="webapp/assets/js/jquery-1.11.1.min.js"></script>
<script src="webapp/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="webapp/assets/js/ServerSide.js"></script>
<script src="webapp/assets/js/common-dom.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="webapp/assets/js/ChartPage.js"></script>
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
<script src="webapp/assets/js/ProductManagement.js"></script>
<script src="webapp/assets/js/PageManagement.js"></script>
<script src="webapp/assets/js/ContextMenu.js"></script>
<script src="webapp/assets/js/AppointmentPage.js"></script>
<script src="webapp/assets/js/daypilot-all.min.js"></script>
<script src="webapp/assets/js/Main.js"></script>
<script src="webapp/assets/js/Table.js"></script>
<script src="webapp/assets/js/TablePage.js"></script>
<script src="webapp/assets/js/OrderPage.js"></script>
<script src="webapp/assets/js/ProductManagementPage.js"></script>
<script src="webapp/assets/js/AccountManagementPage.js"></script>
<title>Quê Ta restaurant</title>
<style>
	#navbar {
		background-color: #555;
		color: #fff;
		max-height: 3em;
		line-height: 3em;
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
	
	#navbar .navbar-items .active {
		padding-right: 0.2em;
		color: #E76F00;
	}
	
	#navbar .navbar-items:hover {
		border-bottom: solid 0.3em #F90;
	}
	
	#navbar .active {
		background: rgba(105, 105, 105, 0.93);
    	box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.59);
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
	<vbox flex="1">
		<hbox id="navbar">
			<hbox class="navbar-items InputRow" page-name="table-page">
				<i class="material-icons orange600 md-16" >airline_seat_recline_normal</i>
				<span>Quản lý bàn</span>
			</hbox>
			<hbox class="navbar-items InputRow" page-name="appointment-page">
				<i class="material-icons orange600 md-16" >event</i>
				<span >Quản lý đặt bàn</span>
			</hbox>
			<hbox class="navbar-items InputRow" page-name="chart-page">
				<i class="material-icons orange600 md-16" >pie_chart</i>
				<span>Thống kê</span>
			</hbox>
			<hbox class="navbar-items InputRow" page-name="admin-page">
				<i class="material-icons orange600 md-16" >settings</i>
				<span>Quản lý hệ thống</span>
			</hbox>
			<hbox flex="1">
				<hbox flex="1"></hbox>
				<hbox  class="navbar-items InputRow" style="justify-content: flex-end">
					<i class="material-icons orange600 md-16" >account_circle</i>
				</hbox>
			</hbox>
		</hbox>
		<hbox id="main-container" flex="1">
		
		</hbox>
	</vbox>
</body>
</html>