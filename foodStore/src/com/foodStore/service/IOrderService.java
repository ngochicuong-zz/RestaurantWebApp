package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Order;

public interface IOrderService{
	boolean setOnPay(Order order, boolean onPay);
	Order createOrder(int seatId, int accountId);
	boolean updateOrderTotal(int orderId);
	Order getOrderWithSeat(int seatId);
	
	List<? extends Object> sumOrderByYear();
	List<? extends Object> sumOrderByMonth(String year);
	
	List<? extends Object> sumOrderByFoodOnYear();
	List<? extends Object> sumOrderByFoodOnMonth(String year);
	List<? extends Object> getAllYear();
}
