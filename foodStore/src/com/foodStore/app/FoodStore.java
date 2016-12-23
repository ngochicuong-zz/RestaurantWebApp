package com.foodStore.app;

import com.foodStore.model.Account;
import com.foodStore.service.IAccountService;
import com.foodStore.service.ServiceManagement;

public class FoodStore {
	
	private Account user;
	
	public Account test () {
		Account acc = new Account();
		acc.setUser("anhjiro");
		acc.setPass("123");
		return ServiceManagement.get(IAccountService.class).login(acc);
	}
		
	public Account getUser() {
		return user;
	}

	public void setUser(Account user) {
		this.user = user;
	}
}
