package com.foodStore.service;

import java.util.Date;
import java.util.List;

import com.foodStore.model.Appointment;

public interface IAppointmentService {
	Appointment createAppointment(String name, String mail, String phone, int gender, int seatId, Date timeStart, Date timeEnd );
	List<Appointment> getEventFrom(Date fromDate);
}
