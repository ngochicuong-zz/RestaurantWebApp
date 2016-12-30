package com.foodStore.service;

import java.util.Date;
import java.util.List;

import com.foodStore.model.Appointment;

public interface IAppointmentService {
	Appointment createAppointment(String name, String mail, String phone, int gender, int seatId, int capacity, Date timeStart, Date timeEnd );
	List<Appointment> getEventByDate(Date fromDate, Date toDate);
	List<Appointment> getEventByWeek(int week);
	boolean updateEvent(int eventId, Date newTimeStart, Date newTimeEnd);
	boolean removeEvent(int eventId);
	List<Appointment> getEventByCapacity(int capacity);
}
