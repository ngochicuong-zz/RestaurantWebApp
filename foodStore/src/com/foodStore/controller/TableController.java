package com.foodStore.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.foodStore.hibernate.JsonUtil;
import com.foodStore.model.SeatAdapter;
import com.foodStore.model.SeatTable;
import com.foodStore.service.ISeatTableService;
import com.foodStore.service.ServiceManagement;

@Controller
public class TableController {
	
	@RequestMapping(value = "/getTablePage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String render(Model model) {
		return "TablePage";
	}
	
	@RequestMapping(value = "/getSeatMangementPage.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	public String getSeatMangementPage(Model model) {
		return "SeatManagementPage";
	}
	
	@RequestMapping(value="/getAllTable.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getAllTable(
			ModelMap model) {
		List<SeatTable> tables = ServiceManagement.get(ISeatTableService.class).getAllTable();
		return JsonUtil.build(SeatTable.class, new SeatAdapter()).toJson(tables);
	}
	
	@RequestMapping(value="/searchTable.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String searchSeatTable(
			@RequestParam("floor") int floor,
			@RequestParam("room") int room,
			@RequestParam("capacity") int capacity,
			@RequestParam("onDesk") Boolean onDesk,
			ModelMap model) {
		List<SeatTable> tables = ServiceManagement.get(ISeatTableService.class).searchTable(floor, room, capacity, onDesk);
		return JsonUtil.build(SeatTable.class, new SeatAdapter()).toJson(tables);
	}
	
	@RequestMapping(value="/createSeatTable.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String createSeatTable(
			@RequestParam("floor") int floor,
			@RequestParam("room") int room,
			@RequestParam("capacity") int capacity,
			@RequestParam("priority") int priority,
			@RequestParam("description") String description,
			ModelMap model) {
		SeatTable table = ServiceManagement.get(ISeatTableService.class).createSeatTable(floor, room, capacity, priority, description);
		return JsonUtil.build(SeatTable.class, new SeatAdapter()).toJson(table);
	}
	
	@RequestMapping(value="/getTableByCapacity.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String getTableByCapacity(
			@RequestParam("capacity") int capacity,
			ModelMap model) {
		List<SeatTable> tables = ServiceManagement.get(ISeatTableService.class).getTableByCapacity(capacity);
		return JsonUtil.build(SeatTable.class, new SeatAdapter()).toJson(tables);
	}
	
	@RequestMapping(value="/updateTable.do", produces = "text/plain;charset=UTF-8", method = RequestMethod.GET)
	@ResponseBody
	public String updateTable(
			@RequestParam("floor") int seatId,
			@RequestParam("floor") int floor,
			@RequestParam("room") int room,
			@RequestParam("capacity") int capacity,
			@RequestParam("priority") int priority,
			@RequestParam("description") String description,
			ModelMap model) {
		boolean updated = ServiceManagement.get(ISeatTableService.class).updateSeatTable(seatId, floor, room, capacity, priority, description);
		return String.valueOf(updated);
	}
	
}

