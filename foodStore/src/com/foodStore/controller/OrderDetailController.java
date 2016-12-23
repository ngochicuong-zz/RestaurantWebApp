package com.foodStore.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.OrderDetail;
import com.foodStore.model.OrderDetailAdapter;
import com.foodStore.service.IOrderDetailService;
import com.foodStore.service.ServiceManagement;

@Controller
public class OrderDetailController {
	@RequestMapping(value = "/getOrderDetailByRefCode.do", method = RequestMethod.GET)
	@ResponseBody
	public String getOrderDetail(
			@RequestParam("refCode") String refCode,
			ModelMap model) {
		List<OrderDetail> orderDetails = ServiceManagement.get(IOrderDetailService.class).getOrderDetailByRefCode(refCode);
		if (orderDetails == null) return "[]";
		return JsonUtil.build(OrderDetail.class, new OrderDetailAdapter()).toJson(orderDetails);
	}
	
	@RequestMapping(value = "/createOrderDetail.do", method = RequestMethod.GET)
	@ResponseBody
	public String createOrderDetail(
			@RequestParam("refCode") String refCode,
			@RequestParam("quality") double quality,
			@RequestParam("productId") int productId,
			ModelMap model) {
		OrderDetail orderDetail = ServiceManagement.get(IOrderDetailService.class).createOrderDetail(refCode, productId, quality, null);
		if (orderDetail == null) return "[]";
		return JsonUtil.build(OrderDetail.class, new OrderDetailAdapter()).toJson(orderDetail);
	}
}
