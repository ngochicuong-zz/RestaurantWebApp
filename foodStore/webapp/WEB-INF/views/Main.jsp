 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" href="webapp/assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="webapp/assets/css/Main.css">
<link rel="stylesheet" href="webapp/assets/css/material_icon.css">
<link rel="stylesheet" href="webapp/assets/css/pikaday.css">
<link rel="stylesheet" href="webapp/assets/css/busy.css">
<style>

	#navbar {
		height: 37px;
		line-height: 37px;
		color: #060606B3;
		text-shadow: 0px 1px white;
		background: #FFC600;
		margin: 0.2em;
		margin-bottom: 0;
		border-radius: 0.2em;

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
		  background-color: #FFC600;
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
    	min-width: 5em;
    	padding: 0em 1em 0em 1em;
    	cursor: pointer;
	}
	
	#navbar .navbar-items:hover {
		 background: rgba(254, 254, 254, 0.78);
		 border-radius: 0.2em;
	}
	
	#main-container {
		background-color:#fff0;
	}
</style>
	<vbox flex="1" id="main-interface">
		<hbox id="navbar" ng-click="navBarOnClick($event)">
			<hbox class="navbar-items InputRow" page-name="table-page" ng-click="activePage('tablePage')">
				<i class="material-icons md-dark md-16" >airline_seat_recline_normal</i>
				<span>BÀN - CHỖ NGỒI</span>
			</hbox>
				<hbox class="navbar-items InputRow" page-name="appointment-page" ng-click="activePage('appointmentPage')">
					<i class="material-icons md-dark md-16" >event</i>
					<span >ĐẶT BÀN</span>
				</hbox>
				<hbox class="navbar-items InputRow" page-name="chart-page" ng-click="activePage('chartPage')">
					<i class="material-icons md-dark md-16" >pie_chart</i>
					<span>THỐNG KÊ</span>
				</hbox>
				<hbox class="navbar-items InputRow" page-name="admin-page" ng-click="activePage('adminPage')">
					<i class="material-icons md-dark md-16" >settings</i>
					<span>QUẢN LÝ HỆ THỐNG</span>
				</hbox>
			<hbox flex="1">
				<hbox flex="1"></hbox>
				<hbox id="logout" class="navbar-items InputRow" style="justify-content: center" ng-click="logout()">
					<i class="material-icons md-dark md-16" loginCode="${loginCode}" id="account-info">account_circle</i>
					<span>ĐĂNG XUẤT</span>
				</hbox>
			</hbox>
		</hbox>
		<hbox id="main-container" flex="1" style="overflow: auto">
			<hbox ng-controller="tablePageCtrl" ng-hide="pageFlags['tablePage']" ng-include="'webapp/WEB-INF/views/TablePage.jsp'"></hbox>
			<vbox ng-controller="appointmentPageCTrl" ng-hide="pageFlags['appointmentPage']" ng-include="'webapp/WEB-INF/views/AppointmentPage.jsp'"></vbox>
			<vbox ng-controller="chartPageCtrl" ng-hide="pageFlags['chartPage']" ng-include="'webapp/WEB-INF/views/ChartPage.jsp'"></vbox>
			<vbox ng-controller="adminPageCtrl" ng-hide="pageFlags['adminPage']" ng-include="'webapp/WEB-INF/views/AdminPage.jsp'"></vbox>
		</hbox>
	</vbox>
	<hbox id="print-space"></hbox>
