<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Quê Ta restaurant</title>

<!-- Index Libs -->
<link href="webapp/assets/css/Main.css" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="webapp/assets/js/index/Index.js"></script>
<script src="webapp/assets/js/index/Slider.js"></script>
<script src="webapp/assets/js/detect.min.js"></script>
<!-- Main Libs -->

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
<script src="webapp/assets/js/Table.js"></script>
<script src="webapp/assets/js/TablePage.js"></script>
<script src="webapp/assets/js/OrderPage.js"></script>
<script src="webapp/assets/js/ProductManagementPage.js"></script>
<script src="webapp/assets/js/pikaday.js"></script>
<script src="webapp/assets/js/AccountManagementPage.js"></script>
<script src="webapp/assets/js/BusyHandler.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="webapp/assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>
<body ng-app="app">
	<hbox id = "main-container" ng-controller="app-ctrl" ng-view flex="1">
	</hbox>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
	<!-- agular libs -->
	<script src="webapp/assets/js/App.js"></script>
	<script src="webapp/assets/js/Main.js"></script>
	<script src="webapp/assets/js/ServerService.js"></script>
	<script src="webapp/assets/js/ServiceManager.js"></script>
	
</body>
</html>