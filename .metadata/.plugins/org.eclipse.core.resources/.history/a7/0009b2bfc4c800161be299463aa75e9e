package com.foodStore.service;

import com.foodStore.model.Order;

public interface IOrderService{
	boolean setOnPay(Order order, boolean onPay);
	Order createOrder(int seatId, int accountId, String note, int customerId);
	boolean updateOrderTotal(int orderId);
	Order getOrderWithSeat(int seatId);
}
