package com.foodStore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.app.FoodStore;
import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Account;
import com.foodStore.model.Order;
import com.foodStore.model.OrderAdapter;
import com.foodStore.service.IOrderService;
import com.foodStore.service.ServiceManagement;

@Controller
public class OrderController {
	
	@RequestMapping(value = "/getOrderPage.do", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "OrderPage";
	}
	
	@RequestMapping(value = "/getOrderWithSeat.do", method = RequestMethod.GET)
	@ResponseBody
	public String getOrder(
			@RequestParam("seatId") int seatId,
			ModelMap model) {
		Order order = ServiceManagement.get(IOrderService.class).getOrderWithSeat(seatId);
		if (order == null) return "{}";
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(order);
	}
	
	@RequestMapping(value = "/createOrder.do", method = RequestMethod.GET)
	@ResponseBody
	public String createOrder(
			@RequestParam("seatId") int seatId,
			@RequestParam("note") String note, 
			@RequestParam("customerId") int customerId, 
			ModelMap model) {
		System.out.println("orderController run");
		Account account = ServiceManagement.get(FoodStore.class).test();
		if (account == null) return null;
		Order order = ServiceManagement.get(IOrderService.class).createOrder(seatId, account.getId(), note, customerId);
		System.out.println(order);
		if (order == null) return null;
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(order);
	}
	
}
