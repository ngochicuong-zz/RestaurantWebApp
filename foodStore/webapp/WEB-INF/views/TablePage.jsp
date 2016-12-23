<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
	#search-panel{
		height: 100vh;
		min-width: 10em;
		background-color: #313236;
		color: #ffffff;
		padding: 0.5em;
	}
	#search-panel > vbox + hbox {
		margin-top:1em;
		
	}
	#container-panel {
		box-shadow: -2px 0px 10px #000000;
	}
</style>
<hbox flex="1"> 
<vbox id="search-panel"> 
	<vbox>
		<label>Floor</label>
		<select id="floor">
		  <option value= -1>--not selected--</option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>Room:</label>
		<select  id="room">
		  <option value= -1>--not selected--</option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>Capacity: </label>
		<select  id="capacity">
		  <option value= -1>--not selected--</option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>On desk: </label>
		<select  id="onDesk">
		  <option value="true">unavailable</option>
		  <option value="false">available</option>
		</select>
	</vbox>
	<hbox style="justify-content: flex-end; color: #000000">
		<button id="search-button"> submit</button>
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
</hbox>
