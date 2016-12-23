<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
</style>
<hbox flex="1">
	<vbox>
		<vbox flex="1">
			<label>Food Name:</label><input type="text" id="foodname" >
		</vbox>
		<vbox flex="1">
			<label>Price:</label><input type="text" id="price" >
		</vbox>
		<vbox flex="1">
			<label>Category:</label><input type="text" id="" >
		</vbox>
		<hbox flex="1" style="justify-content:flex-end">
			<button id="search-button">Submit</button>
		</hbox>
	</vbox>
		<vbox flexx="1" id="container-panel">
			
		</vbox>
</hbox>