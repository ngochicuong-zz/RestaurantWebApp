 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
</style>
<vbox flex="1">
	<hbox class="InputRow" style="justify-content: flex-end; margin-right: 1em; padding: 1em;">
		<label>Thống kê theo: </label>
		<select id="type-combo">
			<option value="profit">Lợi nhuận</option>
			<option value="product">Thực đơn</option>
		</select>
	</hbox>
	<hbox flex="1" id="chart-container" style="overflow-y: auto; overflow-x: hidden"></hbox>
	<hbox class="InputRow" style="justify-content: center; padding: 1em">
		<label>Biều đồ thống kê năm: </label>
		<select id="year-combo">
			<option value="0">--Từ ngày đầu tiên--</option>
		</select>
	</hbox>
</vbox>