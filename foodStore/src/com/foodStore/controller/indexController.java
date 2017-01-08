package com.foodStore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.foodStore.model.Roles;

@Controller
public class indexController {
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
	public String startPage(ModelMap model) {
		return "index";
	}
	@RequestMapping(value = "/getMailUs.do", method = RequestMethod.GET)
	public String getMailUs(ModelMap model) {
		return "MailUs";
	}
	@RequestMapping(value = "/getIndexMenu.do", method = RequestMethod.GET)
	public String getIndexMenu(ModelMap model) {
		return "IndexMenu";
	}
	@RequestMapping(value = "/getAboutUs.do", method = RequestMethod.GET)
	public String getAboutUs(ModelMap model) {
		return "AboutUs";
	}
	@RequestMapping(value = "/loginPage.do", method = RequestMethod.GET)
	public String loginPage(ModelMap model) {
		return "login";
	}
}
