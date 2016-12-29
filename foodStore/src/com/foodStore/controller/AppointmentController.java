package com.foodStore.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Appointment;
import com.foodStore.model.AppointmentAdapter;
import com.foodStore.model.Order;
import com.foodStore.service.IAppointmentService;
import com.foodStore.service.ServiceManagement;

@Controller
public class AppointmentController {
	@RequestMapping(value = "/getAppointmentPage.do", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AppointmentPage";
	}
	
	@RequestMapping(value = "/getEventFromDate.do", method = RequestMethod.GET)
	@ResponseBody
	public String getEventFromDate(
			@RequestParam("fromDate") Date fromDate,
			ModelMap model) {
		List<Appointment> appointments = ServiceManagement.get(IAppointmentService.class).getEventFrom(fromDate);
		return JsonUtil.build(Order.class, new AppointmentAdapter()).toJson(appointments);
	}
	
	@RequestMapping(value = "/createEvent.do", method = RequestMethod.POST)
	@ResponseBody
	public String createEvent(
			@RequestParam("name") String name,
			@RequestParam("phone") String phone, 
			@RequestParam("gender") int gender,
			@RequestParam("mail") String mail,
			@RequestParam("timeStart") String timestart ,
			@RequestParam("timeEnd") String timeend ,
			ModelMap model) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date timeStart = new Date();
		Date timeEnd = new Date();
		try {
			timeStart = format.parse(timestart);
			timeEnd = format.parse(timeend);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Appointment appointment = ServiceManagement.get(IAppointmentService.class).createAppointment(name, mail, phone, gender, 0, timeStart, timeEnd);
		return JsonUtil.build(Order.class, new AppointmentAdapter()).toJson(appointment);
	}
	
	
}

