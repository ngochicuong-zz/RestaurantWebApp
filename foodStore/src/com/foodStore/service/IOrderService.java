package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Order;

public interface IOrderService{
	boolean setOnPay(Order order, boolean onPay);
	Order createOrder(int seatId, int accountId, String note, int customerId);
	boolean updateOrderTotal(int orderId);
	Order getOrderWithSeat(int seatId);
	
	List<Order> sumOrderByYear();
	List<Order> sumOrderByMonth(String year);
	List<Order> sumOrderByPrecious(String year);
}
