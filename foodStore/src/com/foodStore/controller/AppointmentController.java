package com.foodStore.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
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
import com.foodStore.model.Appointment;
import com.foodStore.model.AppointmentAdapter;
import com.foodStore.model.Order;
import com.foodStore.model.SeatTable;
import com.foodStore.service.IAccountService;
import com.foodStore.service.IAppointmentService;
import com.foodStore.service.IOrderService;
import com.foodStore.service.ISeatTableService;
import com.foodStore.service.ServiceManagement;

@Controller
public class AppointmentController {
	@RequestMapping(value = "/getAppointmentPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getPage(ModelMap model) {
		return "AppointmentPage";
	}
	
	@RequestMapping(value = "/getEventByWeek.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getEventByWeek(
			@RequestParam("week") int week ,
			ModelMap model) {
		if (week == -1) {
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
			Date date = new Date();

			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			week = cal.get(Calendar.WEEK_OF_YEAR);
			System.out.println("Week" + week);
		}
		if (week == -1) return null;
		List<Appointment> appointments = ServiceManagement.get(IAppointmentService.class).getEventByWeek(week);
		return JsonUtil.build(Appointment.class, new AppointmentAdapter()).toJson(appointments);
	}
	
	@RequestMapping(value = "/getEventByDate.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getEventFromDate(
			@RequestParam("fromDate") String fromdate,
			@RequestParam("toDate") String todate,
			ModelMap model) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date fromDate = new Date();
		Date toDate = new Date();
		try {
			fromDate = format.parse(fromdate);
			toDate = format.parse(todate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<Appointment> appointments = ServiceManagement.get(IAppointmentService.class).getEventByDate(fromDate, toDate);
		System.out.println(appointments);
		return JsonUtil.build(Order.class, new AppointmentAdapter()).toJson(appointments);
	}
	
	@RequestMapping(value = "/createEvent.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String createEvent(
			@RequestParam("name") String name,
			@RequestParam("phone") String phone, 
			@RequestParam("gender") int gender,
			@RequestParam("mail") String mail,
			@RequestParam("capacity") int capacity,
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
			e.printStackTrace();
		}
		
		Appointment appointment = ServiceManagement.get(IAppointmentService.class).createAppointment(name, mail, phone, gender, 0, capacity, timeStart, timeEnd);
		return JsonUtil.build(Order.class, new AppointmentAdapter()).toJson(appointment);
	}
	
	@RequestMapping(value = "/updateEvent.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String updateEvent(
			@RequestParam("eventId") int eventId,
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
		boolean updated = ServiceManagement.get(IAppointmentService.class).updateEvent(eventId, timeStart, timeEnd);
		return String.valueOf(updated);
	}
	
	@RequestMapping(value = "/removeEvent.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String removeEvent(
			@RequestParam("eventId") int eventId,
			ModelMap model) {
		Appointment event = ServiceManagement.get(IAppointmentService.class).getAppointmentById(eventId);
		SeatTable oldSeat = event.getSeatTable();
		if (oldSeat != null) {
			Order order = ServiceManagement.get(IOrderService.class).getOrderWithSeat(oldSeat.getId());
			if (order != null) {
				ServiceManagement.get(IOrderService.class).deleteOrder(order);
			}
			ServiceManagement.get(ISeatTableService.class).setOnDesk(oldSeat.getId(), false);
		}
		boolean removed = ServiceManagement.get(IAppointmentService.class).removeEvent(eventId);
		return String.valueOf(removed);
	}
	
	@RequestMapping(value = "/getEventByCapacity.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getEventByCapacity(
			@RequestParam("capacity") int capacity,
			ModelMap model) {
		List<Appointment> appointments = ServiceManagement.get(IAppointmentService.class).getEventByCapacity(capacity);
		return JsonUtil.build(Order.class, new AppointmentAdapter()).toJson(appointments);
	}
	
	@RequestMapping(value = "/bookSeatForEvent.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String bookSeatForEvent(
			@RequestParam("seatId") int seatId,
			@RequestParam("eventId") int eventId,
			@RequestParam("loginCode") String loginCode,
			ModelMap model) {
		Appointment event = ServiceManagement.get(IAppointmentService.class).getAppointmentById(eventId);
		SeatTable oldSeat = event.getSeatTable();
		if (oldSeat != null) {
			Order order = ServiceManagement.get(IOrderService.class).getOrderWithSeat(oldSeat.getId());
			if (order != null) {
				ServiceManagement.get(IOrderService.class).deleteOrder(order);
			}
			ServiceManagement.get(ISeatTableService.class).setOnDesk(oldSeat.getId(), false);
		}
		ServiceManagement.get(IAppointmentService.class).bookSeatForEvent(seatId, eventId);
		Account account = ServiceManagement.get(IAccountService.class).searchAccountByLoginCode(loginCode);
		ServiceManagement.get(IOrderService.class).createOrder(seatId, account.getId());
		return String.valueOf(true);
	}
	
}

