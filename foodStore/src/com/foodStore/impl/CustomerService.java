package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Customer;
import com.foodStore.service.ICustomerService;

public class CustomerService extends ServiceBase<Customer> implements ICustomerService{

	public CustomerService(IRepository repository) {
		super(repository);
	}
	
	@Override
	public boolean updateCustomer(Customer newCustomer) {
		Customer oldCustomer = this.repository.getItemById(Customer.class, newCustomer.getId());
		if (!oldCustomer.getName().equals(newCustomer.getName())) oldCustomer.setName(newCustomer.getName());
		if (!oldCustomer.getAddress().equals(newCustomer.getAddress())) oldCustomer.setAddress(newCustomer.getAddress());
		if (!oldCustomer.getEmail().equals(newCustomer.getEmail())) oldCustomer.setEmail(newCustomer.getEmail());
		if (oldCustomer.getGender() != newCustomer.getGender()) oldCustomer.setGender(newCustomer.getGender());
		return update(oldCustomer);
	}

	@Override
	public boolean updateLastVisitDate(int customerId) {
		Customer oldCustomer = this.repository.getItemById(Customer.class, customerId);
		oldCustomer.setLastVisitDate(new Date());
		return update(oldCustomer);
	}

	@Override
	public List<Customer> searchCustomer(String name, String address, String phone) {
		return this.repository.getItemsWithOneKey(Customer.class, (new CompareKey("name", name)), 
				new CompareKey("address", address), 
				new CompareKey("phone", phone));
	}
	
}
