package com.foodStore.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.SeatTable;
import com.foodStore.service.ISeatTableService;

@Transactional
public class SeatTableService extends ServiceBase<SeatTable> implements ISeatTableService {

	public SeatTableService(IRepository repository) {
		super(repository);
	}

	@Override
	public boolean setOnDesk(int seatId, boolean onDesk) {
		SeatTable seatTable = this.repository.getItemById(SeatTable.class, seatId);
		if (seatTable == null) return false;
		seatTable.setOnDesk(onDesk ? 't' : 'f');
		return update(seatTable);
	}
	
	@Override
	public boolean updateTable(SeatTable newSeatTable) {
		SeatTable oldSeat = this.repository.getItemById(SeatTable.class, newSeatTable.getId());
		if (oldSeat.getRoom() != newSeatTable.getRoom()) oldSeat.setRoom(newSeatTable.getRoom());
		if (oldSeat.getFloor() != newSeatTable.getFloor()) oldSeat.setFloor(newSeatTable.getFloor());
		if (oldSeat.getCapacity() != newSeatTable.getCapacity()) oldSeat.setCapacity(newSeatTable.getCapacity());
		if (oldSeat.getDescription() != newSeatTable.getDescription()) oldSeat.setDescription(newSeatTable.getDescription());
		if (oldSeat.getPriority() != newSeatTable.getPriority()) oldSeat.setPriority(newSeatTable.getPriority());
		return update(oldSeat);
	}

	@Override
	public List<SeatTable> getAllTableWithOnDesk(boolean onDesk) {
		return this.repository.getItemsWithOneKey(SeatTable.class, new CompareKey("onDesk", onDesk ? 't' : 'f'));
	}

	@Override
	public List<SeatTable> getAllTable() {
		return this.getAll(SeatTable.class);
	}
	
	@Override
	public List<SeatTable> searchTable(int floor, int room, int capacity, boolean onDesk){
		return this.repository.getItemsWithAllKey( SeatTable.class,
				room != -1 ? new CompareKey("room", room): null,
				floor != -1 ? new CompareKey("floor", floor) : null,
				capacity != -1 ? new CompareKey("capacity", capacity) : null,
				new CompareKey("onDesk", onDesk ? 't' : 'f'));
	}
	

}
