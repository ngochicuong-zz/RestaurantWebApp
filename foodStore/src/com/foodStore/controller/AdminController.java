package com.foodStore.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Account;
import com.foodStore.model.AccountAdapter;
import com.foodStore.model.Appointment;
import com.foodStore.model.AppointmentAdapter;
import com.foodStore.service.IAccountService;
import com.foodStore.service.IAppointmentService;
import com.foodStore.service.ServiceManagement;

@Controller
public class AdminController {
	@RequestMapping(value = "/getAdminPage.do", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AdminPage";
	}
	
	@RequestMapping(value = "/getAccountManagementPage.do", method = RequestMethod.GET)
	public String getAccountManagementPage(ModelMap model) {
		return "AccountManagementPage";
	}
	
	@RequestMapping(value = "/getAccounts.do", method = RequestMethod.POST)
	@ResponseBody
	public String getAccounts(
			ModelMap model) {
		List<Account> accounts = ServiceManagement.get(IAccountService.class).getAllAccount();
		return JsonUtil.build(Account.class, new AccountAdapter()).toJson(accounts);
	}
	
	@RequestMapping(value = "/createAccount.do", method = RequestMethod.POST)
	@ResponseBody
	public String createAccounts(
			@RequestParam("user") String user,
			@RequestParam("pass") String pass,
			@RequestParam("email") String email,
			@RequestParam("role") int role,
			ModelMap model) {
		Account account = ServiceManagement.get(IAccountService.class).createAccount(user, pass, email, role);
		return JsonUtil.build(Account.class, new AccountAdapter()).toJson(account);
	}
	
	@RequestMapping(value = "/updateAccount.do", method = RequestMethod.POST)
	@ResponseBody
	public String updateAccount(
			@RequestParam("userId") int userId,
			@RequestParam("user") String user,
			@RequestParam("pass") String pass,
			@RequestParam("email") String email,
			@RequestParam("role") int role,
			ModelMap model) {
		boolean result = ServiceManagement.get(IAccountService.class).updateAccount(userId, user, pass, email, role);
		return String.valueOf(result);
	}
	
	@RequestMapping(value = "/setActiveAccount.do", method = RequestMethod.GET)
	@ResponseBody
	public String updateAccount(
			@RequestParam("userId") int userId,
			@RequestParam("active") boolean active,
			ModelMap model) {
		boolean result = ServiceManagement.get(IAccountService.class).setActive(userId, active);
		return String.valueOf(result);
	}
}
