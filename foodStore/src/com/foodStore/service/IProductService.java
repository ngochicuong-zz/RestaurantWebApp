package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Product;
import com.foodStore.model.ProductCategory;

public interface IProductService{
	List<Product> filterWithType(ProductCategory category);
	List<Product> searchWithName(String name);
	boolean setDiscontinued(int productId, boolean discontinued);
	Product createProduct(double price, String productName, double quantityPerUnit, String unitType, int categoryType);

	List<Product> getAllProduct();
	List<Product> searchProduct(String productName, double price, int categories);
	boolean updateProduct(int productId ,double price, String productName, double quantityPerUnit, String unitType, int categoryType);

}
