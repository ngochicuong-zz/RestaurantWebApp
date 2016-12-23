package com.foodStore.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.HibernateProxyTypeAdapter;
import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.Order;
import com.foodStore.model.OrderAdapter;
import com.foodStore.model.SeatAdapter;
import com.foodStore.model.SeatTable;
import com.foodStore.service.ISeatTableService;
import com.foodStore.service.ServiceManagement;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

@Controller
public class TableController {
	
	@RequestMapping(value = "/getTablePage.do", method = RequestMethod.GET)
	public String render(Model model) {
		List<SeatTable> tables = ServiceManagement.get(ISeatTableService.class).getAllTable();
		model.addAttribute("tables", tables);
		return "TablePage";
	}
	
	@RequestMapping(value="/getTables.do", method = RequestMethod.GET)
	@ResponseBody
	public String getItems(
			@RequestParam("floor") int floor,
			@RequestParam("room") int room,
			@RequestParam("capacity") int capacity,
			@RequestParam("onDesk") boolean onDesk,
			ModelMap model) {
		List<SeatTable> tables = ServiceManagement.get(ISeatTableService.class).searchTable(floor, room, capacity, onDesk);
		return JsonUtil.build(SeatTable.class, new SeatAdapter()).toJson(tables);
	}
	
}

