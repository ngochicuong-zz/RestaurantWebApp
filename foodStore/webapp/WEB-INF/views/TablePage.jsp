 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
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
</style>
<hbox flex="1"> 
	<vbox id="search-panel"> 
		<vbox>
			<label>Lầu: </label>
			<select id="floor">
			  <option value= -1>--không chọn--</option>
			</select>
		</vbox>
		<vbox>
			<label>Phòng hoặc mã bàn: </label>
			<select  id="room">
			  <option value= -1>--không chọn--</option>
			</select>
		</vbox>
		<vbox>
			<label>Số chỗ ngồi: </label>
			<select  id="capacity">
			  <option value= -1>--không chọn--</option>
			</select>
		</vbox>
		<vbox>
			<label>Hiện trạng: </label>
			<select  id="onDesk"> 
			  <option value="undefined">--Không chọn--</option>
			  <option value="true">Đang có khách</option>
			  <option value="false">Bàn trống</option>
			</select>
		</vbox>
		<hbox style="justify-content: flex-end; color: #000000">
			<button id="search-button">Tìm kiếm</button>
		</hbox>
	</vbox> 
	<vbox id="container-panel" flex="1" style="overflow: auto;">
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
