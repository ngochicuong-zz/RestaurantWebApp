package com.foodStore.controller;

import java.util.List;

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
import com.foodStore.model.Payment;
import com.foodStore.model.PaymentAdapter;
import com.foodStore.model.Promotion;
import com.foodStore.model.PromotionAdapter;
import com.foodStore.service.IOrderService;
import com.foodStore.service.IPaymentService;
import com.foodStore.service.IPromotionService;
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
		if (order == null) return "[]";
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(order);
	}
	
	@RequestMapping(value = "/getPromotionByPay.do", method = RequestMethod.GET)
	@ResponseBody
	public String getPromotionByPay(
			@RequestParam("pay") double pay,
			ModelMap model) {
		System.out.println(pay);
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).findPromoWithPay(pay);
		System.out.println(promotions);
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/getAllPromotionOnDesk.do", method = RequestMethod.GET)
	@ResponseBody
	public String getAllPromotionOnDesk(
			ModelMap model) {
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).getAllPromoOnDesk();
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/getAllPromotion.do", method = RequestMethod.GET)
	@ResponseBody
	public String getAllPromotion(
			ModelMap model) {
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).getAllPromo();
		return JsonUtil.build(Order.class, new PromotionAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/createPayment.do", method = RequestMethod.GET)
	@ResponseBody
	public String getPromotionByPay(
			@RequestParam("refCode") String refCode,
			@RequestParam("promotionCode") String promotionCode,
			@RequestParam("realPay") double realPay,
			ModelMap model) {
		Payment payment = ServiceManagement.get(IPaymentService.class).createPayment(refCode, promotionCode, realPay);
		return JsonUtil.build(Order.class, new PaymentAdapter()).toJson(payment);
	}
	
}
