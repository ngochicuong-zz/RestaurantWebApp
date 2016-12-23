package com.foodStore.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.foodStore.model.Account;
import com.foodStore.model.Employee;
import com.foodStore.service.IAccountService;
import com.foodStore.service.IEmployeeService;
import com.foodStore.service.ServiceManagement;

//@Controller
//@RequestMapping("/login.do")
//public class loginController {
//
////	@RequestMapping(method = RequestMethod.GET)
////	public String sayHello(ModelMap model) {
////		Account account = new Account();
////		model.addAttribute("account", account);
////		return "login";
////	}
////
////	@RequestMapping(value="/login/helloagain", method = RequestMethod.GET)
////	public String sayHelloAgain(ModelMap model) {
////		model.addAttribute("greeting", "Hello World Again, from Spring 4 MVC");
////		return "login/login";
////	}
////	
////	@RequestMapping(method = RequestMethod.POST)
////	public String handleAccount(@Valid Account account, ModelMap model) {
////		account = ServiceManagement.get(IAccountService.class).login(account);
////		List<Employee> emp = ServiceManagement.get(IEmployeeService.class).searchEmployeeWithName("Chí Cường");
////		
////		System.out.println("ACCOUNT" + emp.get(0).getFirstName());
////		model.addAttribute("account", account);
////		return "welcome";
////	}
//}
