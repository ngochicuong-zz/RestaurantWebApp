package com.foodStore.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.OrderAdapter;
import com.foodStore.model.Product;
import com.foodStore.model.ProductAdapter;
import com.foodStore.service.IProductService;
import com.foodStore.service.ServiceManagement;

@Controller
public class ProductController {
	@RequestMapping(value = "/getMenuPage.do", method = RequestMethod.GET)
	public String getProductPage(ModelMap model) {
		return "MenuPage";
	}
	
	@RequestMapping(value = "/getProducts.do", method = RequestMethod.GET)
	@ResponseBody
	public String getProducts(ModelMap model) {
		List<Product> products = ServiceManagement.get(IProductService.class).getAllProduct();
		if (products == null) return "{}";
		return JsonUtil.build(Product.class, new ProductAdapter()).toJson(products);
	}
	
	@RequestMapping(value = "/searchProduct.do", method = RequestMethod.GET)
	@ResponseBody
	public String searchProduct(
			@RequestParam("name") String name,
			ModelMap model) {
		List<Product> products = ServiceManagement.get(IProductService.class).searchWithName(name);
		if (products == null) return "[]";
		return JsonUtil.build(Product.class, new ProductAdapter()).toJson(products);
	}
}
