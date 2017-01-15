 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
	#search-panel label {
		min-width: 5em;
	}
</style>
<vbox flex="1"> 
		<hbox class="InputRow" id="search-panel" style=" align-items: flex-start;" >
			<hbox class="InputRow">
				<label>Tài khoản: </label>
				<input flex="2" style="color:#000;" type="text" id="account-name"/>
			</hbox>
			<hbox flex="1" style="justify-content: flex-start; color: #000000">
				<button id="search-button"><i class="material-icons md-dark md-32" >search</i></button>
			</hbox>
			<hbox flex="1" style="justify-content: flex-end; color: #000000">
				<button style="margin-left: 0.5em" id="add-button"><i class="material-icons md-dark md-32" >add</i></button>
			</hbox>
		</hbox>
	<vbox id="container-panel" flex="1" style="overflow: auto">
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
