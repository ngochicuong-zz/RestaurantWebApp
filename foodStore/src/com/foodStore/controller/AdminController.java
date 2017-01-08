package com.foodStore.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Account;
import com.foodStore.model.AccountAdapter;
import com.foodStore.service.IAccountService;
import com.foodStore.service.ServiceManagement;

@Controller
public class AdminController {
	@RequestMapping(value = "/getAdminPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AdminPage";
	}
	
	@RequestMapping(value = "/main.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String startMain(
			@RequestParam("user") String userStr,
			ModelMap model) {
		if (userStr != null) {
			Account account = ServiceManagement.get(IAccountService.class).searchAccountByLoginCode(userStr);
			if (account != null) {
				account.setLoginCode(null);
				ServiceManagement.get(IAccountService.class).updateAccountLoginCode(account);
				model.addAttribute("role", account.getRole());
				return "Main";
			}
		}
		return "login";
	}
	
	@RequestMapping(value = "/getAccountManagementPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getAccountManagementPage(ModelMap model) {
		return "AccountManagementPage";
	}
	
	@RequestMapping(value = "/signIn.do", method = RequestMethod.POST)
	@ResponseBody
	public String signIn(
			@RequestParam("user") String user,
			@RequestParam("pass") String pass,
			ModelMap model) {
		Account account = ServiceManagement.get(IAccountService.class).login(user, pass);
		if (account != null) {
			String result = UUID.randomUUID().toString();
			account.setLoginCode(result.toString());
			ServiceManagement.get(IAccountService.class).updateAccountLoginCode(account);
			return result;
		}
		return "";
	}
	
	@RequestMapping(value = "/getAccounts.do", method = RequestMethod.POST)
	@ResponseBody
	public String getAccounts(
			ModelMap model) {
		List<Account> accounts = ServiceManagement.get(IAccountService.class).getAllAccount();
		return JsonUtil.build(Account.class, new AccountAdapter()).toJson(accounts);
	}
	
	@RequestMapping(value = "/createAccount.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
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
	
	@RequestMapping(value = "/updateAccount.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
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
	
	@RequestMapping(value = "/setActiveAccount.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String updateAccount(
			@RequestParam("userId") int userId,
			@RequestParam("active") boolean active,
			ModelMap model) {
		boolean result = ServiceManagement.get(IAccountService.class).setActive(userId, active);
		return String.valueOf(result);
	}
}
