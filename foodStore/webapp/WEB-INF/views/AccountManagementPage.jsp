<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
	#search-panel{
		min-width: 10em;
		background-color: #313236;
		color: #ffffff;
		padding: 0.5em;
	}
	#search-panel > vbox + hbox {
		margin-top:1em;
	}
</style>
<vbox flex="1"> 
	<vbox id="search-panel"> 
		<hbox flex="1" class="InputRow" id="add-detail-panel" style=" align-items: flex-start;" >
			<hbox flex="1" >
				<label>Account: </label>
				<input flex="1" style="color:#000;" type="text" id="account-name"/>
			</hbox>
			<hbox style="justify-content: flex-end; color: #000000">
				<button id="search-button"><i class="material-icons md-dark md-32" >search</i></button>
				<button style="margin-left: 0.5em" id="add-button"><i class="material-icons md-dark md-32" >add</i></button>
			</hbox>
		</hbox>
	</vbox> 
	<vbox id="container-panel" flex="1">
	<!-- 
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Id</th>
					<th>Room</th>
					<th>Floor</th>
					<th>Capacity</th>
					<th>Description</th>
					<th>Priority</th>
					<th>OnDesk</th>
				</tr>
			</thead>
			<tbody class="tBodyNode">
			
				<c:forEach var="i" items="${tables}">
					<tr class="tableItem" tableId="${i.id }">
						<td >${ i.id }</td>
						<td >${ i.room }</td>
						<td >${ i.floor }</td>
						<td >${ i.capacity }</td>
						<td >${ i.priority }</td>
						<td >${ i.description }</td>
						<td >${ i.onDesk }</td>
					</tr>
				</c:forEach>
			
			</tbody>
		</table>
		-->
	</vbox> 
</vbox>
