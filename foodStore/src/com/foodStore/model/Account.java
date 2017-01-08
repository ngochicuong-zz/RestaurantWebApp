package com.foodStore.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Account extends BaseModelObject {
	private String 	user, pass, email, loginCode;
	private int role;
	private Date lastSignInAt;
	private char actived, online;
	private Set<Employee> employee = new HashSet<Employee>();
	private Set<Order> order = new HashSet<Order>();
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public char getActived() {
		return actived;
	}
	public void setActived(char actived) {
		this.actived = actived;
	}
	public Date getLastSignInAt() {
		return lastSignInAt;
	}
	public void setLastSignInAt(Date lastSignInAt) {
		this.lastSignInAt = lastSignInAt;
	}
	public char getOnline() {
		return online;
	}
	public void setOnline(char online) {
		this.online = online;
	}
	public Set<Employee> getEmployee() {
		return employee;
	}
	public void setEmployee(Set<Employee> employee) {
		this.employee = employee;
	}
	public Set<Order> getOrder() {
		return order;
	}
	public void setOrder(Set<Order> order) {
		this.order = order;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public String getLoginCode() {
		return loginCode;
	}
	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}
}
