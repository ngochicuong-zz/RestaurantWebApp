package com.foodStore.model;

import java.util.HashSet;
import java.util.Set;

public class Product extends BaseModelObject {
	private String productName, unitType; 
	private double quantityPerUnit, Price;
	private char discontinued;
	private Set<OrderDetail> orderDetails = new HashSet<OrderDetail>();
	private int categoryType;
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public String getUnitType() {
		return unitType;
	}
	public void setUnitType(String unitType) {
		this.unitType = unitType;
	}
	public double getPrice() {
		return Price;
	}
	public void setPrice(double price) {
		Price = price;
	}
	public double getQuantityPerUnit() {
		return quantityPerUnit;
	}
	public void setQuantityPerUnit(double quantityPerUnit) {
		this.quantityPerUnit = quantityPerUnit;
	}
	public char getDiscontinued() {
		return discontinued;
	}
	public void setDiscontinued(char discontinued) {
		this.discontinued = discontinued;
	}
	public Set<OrderDetail> getOrderDetails() {
		return orderDetails;
	}
	public void setOrderDetails(Set<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}
	public int getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(int categoryType) {
		this.categoryType = categoryType;
	}
}
