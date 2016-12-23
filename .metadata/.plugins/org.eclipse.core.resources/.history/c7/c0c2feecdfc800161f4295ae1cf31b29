package com.foodStore.service;

import java.util.List;

import com.foodStore.model.OrderDetail;

public interface IOrderDetailService{
	OrderDetail createOrderDetail(String refCode, int productId, double quality, String note);
	List<OrderDetail> getOrderDetailWithOrderId(int orderId);
	boolean updateOrderDetail(OrderDetail orderDetail, int productId, double quality, String note);
	boolean updateOrderDetail(OrderDetail orderDetail, int orderId, String note);
}
