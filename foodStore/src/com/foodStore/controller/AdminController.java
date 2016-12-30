package com.foodStore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminController {
	@RequestMapping(value = "/getAdminPage.do", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AdminPage";
	}
}
