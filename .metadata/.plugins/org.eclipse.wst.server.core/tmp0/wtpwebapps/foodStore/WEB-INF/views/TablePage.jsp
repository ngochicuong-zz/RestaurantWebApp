<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
	.searchPanel{
		height: 100vh;
		min-width: 10em;
		background-color: #313236;
		color: #ffffff;
		padding: 0.5em;
	}
	.searchPanel > vbox {
		margin-top:1em;
		
	}
	.tablePanel {
		box-shadow: -2px 0px 10px #000000;
	}
	.tablePanel > table {
		height: 100vh;
	}
	.tablePanel > table > tbody > tr:hover {
		background-color: #FA6800;
	}
</style>
<hbox flex="1"> 
<vbox class="searchPanel"> 
	<vbox>
		<label>Floor</label>
		<select class="floor">
		  <option value= -1></option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>Room:</label>
		<select class="room">
		  <option value= -1></option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>Capacity: </label>
		<select class="capacity">
		  <option value= -1></option>
		  <option value= 1>1</option>
		  <option value= 2>2</option>
		  <option value= 3>3</option>
		  <option value= 4>4</option>
		</select>
	</vbox>
	<vbox>
		<label>On desk: </label>
		<select class="onDesk">
		  <option value="true">true</option>
		  <option value="false">false</option>
		  <option value="null"></option>
		</select>
	</vbox>
	<hbox style="justify-content: flex-end; color: #000000">
		<button class="searchButton"> submit</button>
	</hbox>
</vbox> 
<vbox class="tablePanel" flex="1">
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>Id</th>
				<th>Room</th>
				<th>Floor</th>
				<th>Capacity</th>
				<th>Priority</th>
				<th>OnDesk</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody class="tBodyNode">
		<!-- 
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
		-->
		</tbody>
	</table>
</vbox> 
</hbox>
