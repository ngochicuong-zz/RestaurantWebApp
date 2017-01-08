 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
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
			<input style="width: 10em;" type="text" id="room">
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
		<hbox  style="justify-content: flex-end; color: #000000">
			<button class="InputRow" id="search-button"><i>search</i><span>Tìm kiếm</span> </button>
		</hbox>
	</vbox> 
	<vbox id="container-panel" flex="1" style="overflow: auto">
	</vbox> 
</hbox>
