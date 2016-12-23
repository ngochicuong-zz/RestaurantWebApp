<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>

<vbox flex="1">
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>Ma</th>
				<th>So Luong</th>
				<th>Ma San Pham</th>
				<th>Gia</th>
				<th>Tong tien</th>
				<th>Ghi chu</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="i" items="${detail}">
				<tr tableId="${i.id}" >
					<td class="tableItem" >${ i.id }</td>
					<td class="tableItem" >${ i.quality }</td>
					<td class="tableItem">${ i.product }</td>
					<td class="tableItem" >${ i.price }</td>
					<td class="tableItem" >${ i.total }</td>
					<td class="tableItem">${ i.note }</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</vbox>