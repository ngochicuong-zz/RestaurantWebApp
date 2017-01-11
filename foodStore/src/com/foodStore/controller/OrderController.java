package com.foodStore.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.foodStore.model.GroupYearReturn;
import com.foodStore.model.ImageRepo;
import com.foodStore.model.Order;
import com.foodStore.model.OrderAdapter;
import com.foodStore.model.Payment;
import com.foodStore.model.PaymentAdapter;
import com.foodStore.model.Promotion;
import com.foodStore.model.PromotionAdapter;
import com.foodStore.service.IImageService;
import com.foodStore.service.IOrderService;
import com.foodStore.service.IPaymentService;
import com.foodStore.service.IPromotionService;
import com.foodStore.service.ServiceManagement;

@Controller
public class OrderController {
	
	@RequestMapping(value = "/getOrderPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "OrderPage";
	}
	
	@RequestMapping(value = "/getChartPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getChartPage(ModelMap model) {
		return "ChartPage";
	}
	
	@RequestMapping(value = "/getBillTemplate.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getBillTemplate(ModelMap model) {
		return "BillTemplate_A5";
	}
		
	@RequestMapping(value = "/getOrderWithSeat.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getOrder(
			@RequestParam("seatId") int seatId,
			ModelMap model) {
		Order order = ServiceManagement.get(IOrderService.class).getOrderWithSeat(seatId);
		if (order == null) return "{}";
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(order);
	}
	
	@RequestMapping(value = "/createOrder.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String createOrder(
			@RequestParam("seatId") int seatId,
			ModelMap model) {
		System.out.println("orderController run");
		Account account = ServiceManagement.get(FoodStore.class).test();
		if (account == null) return null;
		Order order = ServiceManagement.get(IOrderService.class).createOrder(seatId, account.getId());
		System.out.println(order);
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(order);
	}
	
	@RequestMapping(value = "/getPromotionByPay.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getPromotionByPay(
			@RequestParam("pay") double pay,
			ModelMap model) {
		System.out.println(pay);
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).findPromoWithPay(pay);
		System.out.println(promotions);
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/getAllPromotionOnDesk.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getAllPromotionOnDesk(
			ModelMap model) {
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).getAllPromoOnDesk();
		return JsonUtil.build(Order.class, new OrderAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/getAllPromotion.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getAllPromotion(
			ModelMap model) {
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).getAllPromo();
		return JsonUtil.build(Order.class, new PromotionAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/createPayment.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getPromotionByPay(
			@RequestParam("refCode") String refCode,
			@RequestParam("promotionCode") String promotionCode,
			@RequestParam("realPay") double realPay,
			ModelMap model) {
		Payment payment = ServiceManagement.get(IPaymentService.class).createPayment(refCode, promotionCode, realPay);
		return JsonUtil.build(Order.class, new PaymentAdapter()).toJson(payment);
	}
	
	@RequestMapping(value = "/getPromoManagementPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getPromoManagementPage(
			ModelMap model) {
		return "PromoManagementPage";
	}
	
	@RequestMapping(value = "/searchPromotion.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String searchPromotion(
			@RequestParam("description") String description,
			@RequestParam("fromDate") String fromdate,
			@RequestParam("toDate") String todate,
			ModelMap model) {
		System.out.println("from date" + fromdate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date fromDate = null;
		Date toDate = null;
		try {
			if (fromdate != "") {
				fromDate = format.parse(fromdate);
			}
			if (todate != "") {
				toDate = format.parse(todate);
			}
		} catch (ParseException e) {
		}
		List<Promotion> promotions = ServiceManagement.get(IPromotionService.class).searchPromotion(description, fromDate, toDate);
		return JsonUtil.build(Promotion.class, new PromotionAdapter()).toJson(promotions);
	}
	
	@RequestMapping(value = "/createPromotion.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String createPromotion(
			@RequestParam("paycondition") double paycondition,
			@RequestParam("discount") double discount,
			@RequestParam("fromDate") String fromdate,
			@RequestParam("toDate") String todate,
			@RequestParam("description") String descripstion,
			ModelMap model) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date fromDate = null;
		Date toDate = null;
		try {
			if (fromdate != "") {
				fromDate = format.parse(fromdate);
			}
			if (todate != "") {
				toDate = format.parse(todate);
			}
		} catch (ParseException e) {
		}
		Promotion promotion = ServiceManagement.get(IPromotionService.class).createPromotion(paycondition, discount, fromDate, toDate, descripstion);
		return JsonUtil.build(Promotion.class, new PromotionAdapter()).toJson(promotion);
	}
	
	@RequestMapping(value = "/updatePromotion.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String updatePromotion(
			@RequestParam("promoId") int promoId,
			@RequestParam("paycondition") double paycondition,
			@RequestParam("discount") double discount,
			@RequestParam("fromDate") String fromdate,
			@RequestParam("toDate") String todate,
			@RequestParam("description") String descripstion,
			ModelMap model) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date fromDate = null;
		Date toDate = null;
		try {
			if (fromdate != "") {
				fromDate = format.parse(fromdate);
			}
			if (todate != "") {
				toDate = format.parse(todate);
			}
		} catch (ParseException e) {
		}
		System.out.println(fromDate + "||" + toDate);
		boolean updated = ServiceManagement.get(IPromotionService.class).updatePromotion(promoId, paycondition, discount, fromDate, toDate, descripstion);
		return String.valueOf(updated);
	}
	
	@RequestMapping(value = "/addPromoImage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String addPromoImage(
			@RequestParam("code") String code,
			@RequestParam("image") String image,
			ModelMap model) {
		ImageRepo results = null;
		results = ServiceManagement.get(IImageService.class).createImage(code.equals("") ? null : code, image.getBytes());
		return JsonUtil.quickBuild(results);
	}
	
	@RequestMapping(value = "/getImageByCode.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getImageByCode(
			@RequestParam("code") String code,
			ModelMap model) {
		List<ImageRepo> results = null;
		results = ServiceManagement.get(IImageService.class).getImageByCode(code);
		return JsonUtil.quickBuild(results);
	}
	
	@RequestMapping(value = "/timeStatistic.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String timeStatistic(
			@RequestParam("year") String year,
			ModelMap model) {
		List<Object> results = null;
		if (!year.equals("0")) results = (List<Object>) ServiceManagement.get(IOrderService.class).sumOrderByMonth(year);
		else results = (List<Object>) ServiceManagement.get(IOrderService.class).sumOrderByYear();
		return JsonUtil.quickBuild(results);
	}
	
	@RequestMapping(value = "/foodStatistic.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String foodStatistic(
			@RequestParam("year") String year,
			ModelMap model) {
		System.out.println(year);
		List<Object> results = null;
		if (!year.equals("0")) results = (List<Object>) ServiceManagement.get(IOrderService.class).sumOrderByFoodOnMonth(year);
		else results = (List<Object>) ServiceManagement.get(IOrderService.class).sumOrderByFoodOnYear();
		return JsonUtil.quickBuild(results);
	}
	
	@RequestMapping(value = "/getYearStatistic.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getYearStatistic(
			ModelMap model) {
		List<Object> results = (List<Object>) ServiceManagement.get(IOrderService.class).getAllYear();
		return JsonUtil.quickBuild(results);
	}
	
}
