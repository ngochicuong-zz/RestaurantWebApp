package com.foodStore.app;

import com.foodStore.model.Account;
import com.foodStore.service.IAccountService;
import com.foodStore.service.ServiceManagement;

public class FoodStore {
	
	private Account user;
	
	public Account test () {
		return ServiceManagement.get(IAccountService.class).login("anhjiro", "123456");
	}
		
	public Account getUser() {
		return user;
	}

	public void setUser(Account user) {
		this.user = user;
	}
}
