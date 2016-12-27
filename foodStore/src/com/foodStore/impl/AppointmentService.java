package com.foodStore.impl;

import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Appointment;
import com.foodStore.service.IAppointmentService;

public class AppointmentService extends ServiceBase<Appointment> implements IAppointmentService {

	public AppointmentService(IRepository repository) {
		super(repository);
	}
	

}
