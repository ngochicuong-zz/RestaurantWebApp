package com.foodStore.model;

import java.util.Date;

public class Customer extends BaseModelObject{
	private int  lastOrderId;
	private String name, phone, email, address;
	private Gender gender;
	private Date lastVisitDate;
	public Date getLastVisitDate() {
		return lastVisitDate;
	}
	public void setLastVisitDate(Date lastVisitDate) {
		this.lastVisitDate = lastVisitDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getLastOrderId() {
		return lastOrderId;
	}
	public void setLastOrderId(int lastOrderId) {
		this.lastOrderId = lastOrderId;
	}
	
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public static enum Gender{
		Male, Female
	}
}
