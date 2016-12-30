<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
.admin-item {
	padding: 0.2em;
}

.admin-item:hover{
	background: #f1f1f1;
 	border: solid 0.1em #000;
 	border-radius: 0.2em;
}
</style>
<vbox flex="1">	
	<hbox flex="1" style="justify-content: center; padding-top: 5em;">
		<vbox class="admin-item" style="text-align: center; margin-right: 3em;">
			<i class="material-icons orange600 md-48" >account_circle</i>
			<label> Account Management</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center; margin-right: 3em;">
			<i class="material-icons orange600 md-48">view_quilt</i>
			<label> Table Management</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center; margin-right: 3em;">
			<i class="material-icons orange600 md-48">restaurant_menu</i>
			<label> Menu Management</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center; margin-right: 3em;">
			<i class="material-icons orange600 md-48">credit_card</i>
			<label> Promotion Management</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center; margin-right: 3em;">
			<i class="material-icons orange600 md-48">settings</i>
			<label> Setting</label>
		</vbox>
	</hbox>	
</vbox>