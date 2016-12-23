package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Account;
import com.foodStore.model.Employee;

public interface IEmployeeService{
	boolean setOnWork(Employee emp, boolean onWork);
	boolean SetAccount(Employee emp, Account account);
	boolean updateEmployee(Employee newEmp);
	List<Employee> getAllEmployeeWithOnWork(boolean onWork);
	List<Employee> searchEmployeeWithName(String name);
}
