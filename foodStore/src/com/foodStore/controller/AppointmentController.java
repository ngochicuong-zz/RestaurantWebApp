package com.foodStore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AppointmentController {
	@RequestMapping(value = "/getAppointmentPage.do", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AppointmentPage";
	}
	
	@RequestMapping(value = "/createAppointment.do", method = RequestMethod.GET)
	@ResponseBody
	public String createEvent(ModelMap model) {
		return "AppointmentPage";
	}
	
	
}

