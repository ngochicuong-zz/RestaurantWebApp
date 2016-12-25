package com.foodStore.model;

import java.util.Date;

public class Promotion extends BaseModelObject{
	private String promotionCode, description;
	private double payCondition, discount;
	private Date fromDate, toDate;
	public String getPromotionCode() {
		return promotionCode;
	}
	public void setPromotionCode(String promotionCode) {
		this.promotionCode = promotionCode;
	}
	public double getPayCondition() {
		return payCondition;
	}
	public void setPayCondition(double payCondition) {
		this.payCondition = payCondition;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
