package com.foodStore.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;

import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Appointment;
import com.foodStore.model.SeatTable;
import com.foodStore.service.IAppointmentService;

public class AppointmentService extends ServiceBase<Appointment> implements IAppointmentService {

	public AppointmentService(IRepository repository) {
		super(repository);
	}

	@Override
	public Appointment createAppointment(String name, String mail, String phone, int gender, int seatId, int capacity, Date timeStart, Date timeEnd) {
		List<Appointment> appointments = this.repository.customQuery(Appointment.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Appointment.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.eq("seatTable.id", seatId));
				and.add(Restrictions.le("timeStart", timeStart));
				and.add(Restrictions.gt("timeEnd", timeEnd));
				return criteria.add(and);
			}
		});
		if (appointments.size() > 0) return null;
		
		Appointment appointment = new Appointment();
		appointment.setId(0);
		appointment.setCustomEmail(mail);
		appointment.setCustomName(name);
		appointment.setCustomPhone(phone);
		appointment.setCustomGender(gender);
		appointment.setCapacity(capacity);
		appointment.setTimeStart(timeStart);
		appointment.setTimeEnd(timeEnd);
		return save(appointment);
	}

	@Override
	public List<Appointment> getEventByDate(Date fromDate, Date toDate) {
		List<Appointment> appointments = this.repository.customQuery(Appointment.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Appointment.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ge("timeStart", fromDate));
				and.add(Restrictions.le("timeEnd", toDate));
				return criteria.add(and);
			}
		});
		return appointments;
	}

	@Override
	public boolean updateEvent(int eventId, Date newTimeStart, Date newTimeEnd) {
		Appointment oldEvent = this.repository.getItemById(Appointment.class, eventId);
		if (oldEvent == null) return false;
		Appointment newEvent = new Appointment();
		newEvent = oldEvent;
		newEvent.setTimeStart(newTimeStart);
		newEvent.setTimeEnd(newTimeEnd);
		return update(newEvent);
		
	}

	@Override
	public List<Appointment> getEventByWeek(int week) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.WEEK_OF_YEAR, week);
		c.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date firstDate = c.getTime();
		c.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
		Date endDate = c.getTime();
		System.out.println(firstDate + "|" + endDate);
		return getEventByDate(firstDate, endDate);
	}

	@Override
	public boolean removeEvent(int eventId) {
		Appointment appointment = this.repository.getItemById(Appointment.class, eventId);
		if (appointment == null) return false;	
		return this.repository.deleteItem(appointment);
	}

	@Override
	public List<Appointment> getEventByCapacity(int capacity) {
		List<Appointment> appointments = this.repository.customQuery(Appointment.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Appointment.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ge("timeStart", new Date()));
				and.add(Restrictions.le("timeEnd", new Date()));
				and.add(Restrictions.ge("capacity", capacity));
				return criteria.add(and);
			}
		});
		return appointments;
	}

	@Override
	public boolean bookSeatForEvent(int seatId, int eventId) {
		Appointment appointment = this.repository.getItemById(Appointment.class, eventId);
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		System.out.println(appointment + "||" + seat);
		if (appointment == null || seat == null) return false;
		appointment.setSeatTable(seat);
		seat.setOnDesk('t');
		update(appointment);
		this.repository.updateItem(seat);
		return true;
	}
}
