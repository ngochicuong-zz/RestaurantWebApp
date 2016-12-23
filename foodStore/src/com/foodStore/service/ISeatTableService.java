package com.foodStore.service;

import java.util.List;

import com.foodStore.model.SeatTable;

public interface ISeatTableService{
	boolean setOnDesk(int seatId, boolean onDesk);
	boolean updateTable(SeatTable newSeatTable);
	List<SeatTable> getAllTableWithOnDesk(boolean onDesk);
	List<SeatTable> searchTable(int floor, int room, int capacity, boolean onDesk);
	List<SeatTable> getAllTable();
}
