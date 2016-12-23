package com.foodStore.impl;

import java.util.List;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Account;
import com.foodStore.model.Employee;
import com.foodStore.service.IEmployeeService;

public class EmployeeService extends ServiceBase<Employee> implements IEmployeeService {

	public EmployeeService(IRepository repository) {
		super(repository);
	}

	@Override
	public boolean setOnWork(Employee emp, boolean onWork) {
		emp.setOnWork(onWork ? 't' : 'f');
		return this.repository.updateItem(emp);
	}

	@Override
	public boolean SetAccount(Employee emp, Account account) {
		emp.setAccount(account);
		return this.repository.updateItem(emp);
	}

	@Override
	public boolean updateEmployee(Employee newEmp) {
		Employee oldEmployee = this.repository.getItemById(Employee.class, newEmp.getId());
		if (!oldEmployee.getFirstName().equals(newEmp.getFirstName())) oldEmployee.setFirstName(newEmp.getFirstName());
		if (!oldEmployee.getLastName().equals(newEmp.getLastName())) oldEmployee.setLastName(newEmp.getLastName());
		if (!oldEmployee.getTitle().equals(newEmp.getTitle())) oldEmployee.setTitle(newEmp.getTitle());
		if (oldEmployee.getBirthDate().compareTo(newEmp.getBirthDate()) != 0) oldEmployee.setBirthDate(newEmp.getBirthDate());
		if (oldEmployee.getHireDate().compareTo(newEmp.getHireDate()) != 0) oldEmployee.setHireDate(newEmp.getHireDate());
		if (!oldEmployee.getAddress().equals(newEmp.getAddress())) oldEmployee.setAddress(newEmp.getAddress());
		if (!oldEmployee.getCity().equals(newEmp.getCity())) oldEmployee.setCity(newEmp.getCity());
		if (!oldEmployee.getHomePhone().equals(newEmp.getHomePhone())) oldEmployee.setHomePhone(newEmp.getHomePhone());
		if (!oldEmployee.getNotes().equals(newEmp.getNotes())) oldEmployee.setNotes(newEmp.getNotes());
		return update(newEmp);
	}

	@Override
	public List<Employee> getAllEmployeeWithOnWork(boolean onWork) {
		return this.repository.getItemsWithAllKey(Employee.class, new CompareKey("onWork", onWork ? 't' : 'f'));
	}

	@Override
	public List<Employee> searchEmployeeWithName(String name) {
		List<Employee> results = this.repository.getItemsWithOneKey(Employee.class, new CompareKey("firstName", name), new CompareKey("lastName", name));
		return results;
	}
}
