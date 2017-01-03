 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
.admin-item {
	padding: 0.2em;
}

.admin-item label{
	max-width: 8em;
	font-size: 10px;
	font-weight: 600;
	text-overflow: ellipsis;
	overflow: hidden;
}

.admin-item:hover{
	outline: solid 1px #fb8c00;
	background-color: #00000080;
	color: #fff;
}
</style>
<hbox flex="1">
	<vbox style="justify-content: flex-start;
			height: 100vh;
			background-color: #3b3b3b;
			box-shadow: 1px 3px 3px #000;
			color: #fff;">	
		<vbox page-name="account-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32" >account_circle</i>
			<label> Account Management</label>
		</vbox>
		<vbox page-name="table-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">view_quilt</i>
			<label> Table Management</label>
		</vbox>
		<vbox page-name="product-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">restaurant_menu</i>
			<label> Menu Management</label>
		</vbox>
		<vbox page-name="promotion-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">credit_card</i>
			<label> Promotion Management</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">settings</i>
			<label> Setting</label>
		</vbox>
	</vbox>
	<vbox flex= "1" id="container">
	
	</vbox>
</hbox>
