 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>
</style>
<vbox flex="1">
	<hbox id="chart-container"></hbox>
	<hbox id="chart-controls">
		<vbox flex="1">
			<hbox class="InputRow">
				<label>Năm: </label>
				<select id="year-combo"></select>
			</hbox>	
			<hbox class="InputRow">
				<label>Type: </label>
				<select id="type-combo"></select>
			</hbox>	
		</vbox>
	</hbox>
</vbox>