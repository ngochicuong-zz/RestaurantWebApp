<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="webapp/assets/css/Main.css">
<link rel="stylesheet" href="webapp/assets/bootstrap/css/bootstrap.min.css">
<script src="webapp/assets/js/jquery-1.11.1.min.js"></script>
<script src="webapp/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="webapp/assets/js/ServerSide.js"></script>
<script src="webapp/assets/js/common-dom.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="webapp/assets/js/moment.js"></script>
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
<script src="webapp/assets/js/MenuPage.js"></script>
<title>Que ta restaurant</title>
<style>
	#navbar {
		background-color: #000000;
		color: #fff;
		max-height: 3em;
	}
	
	#navbar .navbar-items {
		line-height: 3em;
		max-height: 3em;
		padding-left: 1em;
		min-width: 10em;
	}
	
	#navbar .navbar-items .active {
		padding-right: 0.2em;
		color: #E76F00;
	}
	
	#navbar .navbar-items:hover {
		color: #000;
		background-color: #F90;
	}
	
	table > tbody > tr:hover {
		background-color: #FA6800;
	}
	
	table > thead  {
		background-color: #EAEAEA;
	}
</style>
</head>
<body>
	<hbox id="navbar" flex="1"> 
		<hbox class="navbar-items" page-name="table-page">
			<p >Seat Management</p>
		</hbox>
		<hbox class="navbar-items" page-name="menu-page">
			<p >Product page</p>
		</hbox>
		<hbox class="navbar-items" page-name="appointment-page">
			<p >Appointment Management</p>
		</hbox>
		<hbox class="navbar-items" page-name="systemManger">
			<p >Table</p>
		</hbox>
		<hbox style="width:5em; height:3em;"></hbox>
	</hbox>
	<hbox id="main-container">
	
	</hbox>
</body>
</html>