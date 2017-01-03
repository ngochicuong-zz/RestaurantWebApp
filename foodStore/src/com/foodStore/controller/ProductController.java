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
	@RequestMapping(value = "/getProductManagementPage.do", method = RequestMethod.GET)
	public String getProductManagementPage(ModelMap model) {
		return "ProductManagementPage";
	}
	
	@RequestMapping(value = "/getProducts.do",produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getProducts(ModelMap model) {
		List<Product> products = ServiceManagement.get(IProductService.class).getAllProduct();
		if (products == null) return "{}";
		return JsonUtil.build(Product.class, new ProductAdapter()).toJson(products);
	}
	
	@RequestMapping(value = "/searchProduct.do",produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String searchProduct(
			@RequestParam("name") String name,
			@RequestParam("price") double price,
			@RequestParam("categories") int categories,
			ModelMap model) {
		List<Product> products = ServiceManagement.get(IProductService.class).searchProduct(name, price, categories);
		return JsonUtil.build(Product.class, new ProductAdapter()).toJson(products);
	}
	
	@RequestMapping(value = "/createProduct.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String createProduct(
			@RequestParam("productName") String productName,
			@RequestParam("unit") String unit,
			@RequestParam("quantity") int quantityPerUnit,
			@RequestParam("price") double price,
			@RequestParam("categories") int categories,
			ModelMap model) {
		Product product = ServiceManagement.get(IProductService.class).createProduct(price, productName, quantityPerUnit, unit, categories);
		return JsonUtil.build(Product.class, new ProductAdapter()).toJson(product);
	}
	
	@RequestMapping(value = "/updateProduct.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String updateProduct(
			@RequestParam("productId") int productId,
			@RequestParam("productName") String productName,
			@RequestParam("unit") String unit,
			@RequestParam("quantityPerUnit") int quantityPerUnit,
			@RequestParam("price") double price,
			@RequestParam("categories") int categories,
			ModelMap model) {
		boolean updated = ServiceManagement.get(IProductService.class).updateProduct(productId, price, productName, quantityPerUnit, unit, categories);
		return String.valueOf(updated);
	}
	
}
