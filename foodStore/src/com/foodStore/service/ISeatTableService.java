package com.foodStore.service;

import java.util.List;

import com.foodStore.model.SeatTable;

public interface ISeatTableService{
	boolean setOnDesk(int seatId, boolean onDesk);
	boolean updateTable(SeatTable newSeatTable);
	List<SeatTable> getAllTableWithOnDesk(boolean onDesk);
	List<SeatTable> searchTable(int floor, String room, int capacity, Boolean onDesk);
	List<SeatTable> getAllTable();
	
	List<SeatTable> getTableByCapacity(int capacity);
	SeatTable createSeatTable(int floor, String room, int capacity, int priority, String description);
	boolean updateSeatTable(int seatId, int floor, String room, int capacity, int priority, String description);
}
