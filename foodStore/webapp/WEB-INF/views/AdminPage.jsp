 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>

.admin-item {
	padding: 0.2em;
}
.admin-item label{
	max-width: 5em;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
}

#admin-page .active {
	background-color: #fff;
	color: #000;
}

.admin-item:hover{
	background-color: #fff;
	color: #000;
}
</style>
<hbox flex="1" id="admin-page">
	<vbox style="justify-content: flex-start;
			background-color: #3b3b3b;
			color: #fff">	
		<vbox page-name="account-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32" >account_circle</i>
			<label>Quản lý tài khoản</label>
		</vbox>
		<vbox page-name="table-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">view_quilt</i>
			<label>Quản lý bàn ăn</label>
		</vbox>
		<vbox page-name="product-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">restaurant_menu</i>
			<label>Quản lý thực đơn</label>
		</vbox>
		<vbox page-name="promotion-manager-page" class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">credit_card</i>
			<label>Quản lý Sự kiện</label>
		</vbox>
		<vbox class="admin-item" style="text-align: center;">
			<i class="material-icons orange600 md-32">settings</i>
			<label> Cài đặt</label>
		</vbox>
	</vbox>
	<vbox flex= "1" id="container">
	
	</vbox>
</hbox>
