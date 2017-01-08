package com.foodStore.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
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
	public List<SeatTable> searchTable(int floor, String room, int capacity, Boolean onDesk){
		return this.repository.customQuery(SeatTable.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(SeatTable.class);
				Conjunction and = Restrictions.conjunction();
				if (floor != -1)  and.add(Restrictions.eq("floor", floor));
				if (room == null)  and.add(Restrictions.ilike("room", room, MatchMode.ANYWHERE));
				if (capacity != -1 ) and.add(Restrictions.eq("capacity", capacity));
				if (onDesk != null ) and.add(Restrictions.like("onDesk", onDesk == true ? 't' : 'f'));
				return criteria.add(and);
			}
		});
	}

	@Override
	public List<SeatTable> getTableByCapacity(int capacity) {
		List<SeatTable> seatTables = this.repository.customQuery(SeatTable.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(SeatTable.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.le("onDesk", 'f'));
				and.add(Restrictions.ge("capacity", capacity));
				return criteria.add(and);
			}
		});
		return seatTables;
	}

	@Override
	public SeatTable createSeatTable(int floor, String room, int capacity, int priority, String description) {
		SeatTable seat = new SeatTable();
		seat.setId(0);
		seat.setFloor(floor);
		seat.setRoom(room);
		seat.setCapacity(capacity);
		seat.setPriority(priority);
		if (description != null || description != "")
			seat.setDescription(description);
		seat.setOnDesk('f');
		return save(seat);
	}

	@Override
	public boolean updateSeatTable(int seatId, int floor, String room, int capacity, int priority, String description) {
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		if (seat == null) return false;
		seat.setFloor(floor);
		seat.setRoom(room);
		seat.setDescription(description);
		seat.setPriority(priority);
		seat.setCapacity(capacity);
		return update(seat);
	}


	
}
