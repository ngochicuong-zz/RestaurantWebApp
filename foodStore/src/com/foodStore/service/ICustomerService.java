package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Customer;

public interface ICustomerService {
	boolean updateCustomer(Customer newCustomer);
	boolean updateLastVisitDate(int customerId);
	List<Customer> searchCustomer(String name, String address, String phone);
}
