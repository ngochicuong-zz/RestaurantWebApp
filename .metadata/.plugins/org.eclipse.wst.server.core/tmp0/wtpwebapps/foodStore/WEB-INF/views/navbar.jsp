<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="NavController" class="com.foodStore.controller.NavController" scope="session"/>
<style>
#navbar {
	background-color: #000000;
	color: #fff;
	max-height: 3em;
	
}
#navbar .navbar-items {
	margin : auto;
	justify-content: center;
	line-height: 3em;
}

#navbar .navbar-items .item {
	padding-right : 0.5em;
	display: table;
}
#navbar .navbar-items .item .active {
	padding-right : 0.2em;
	color: #E76F00;
}
#navbar .navbar-items .item:hover {
	color: #E76F00;
	backgound-color:#fffff;
	opacity: 0.9;
}
</style>

<hbox id="navbar" flex="1"> 
	<hbox style="width:5em; height:3em;"> </hbox> 
	<hbox flex="1" class="navbar-items">
		<c:forEach var="i" items="${navItems}">
		
			<p class="item" patent=${i.patent}>${i.name} </p>
			
		</c:forEach>
	</hbox>
</hbox>
