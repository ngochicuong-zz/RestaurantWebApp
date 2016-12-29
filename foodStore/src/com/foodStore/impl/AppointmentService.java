package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.foodStore.hibernate.IRepository;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.model.Appointment;
import com.foodStore.model.OrderDetail;
import com.foodStore.service.IAppointmentService;

public class AppointmentService extends ServiceBase<Appointment> implements IAppointmentService {

	public AppointmentService(IRepository repository) {
		super(repository);
	}

	@Override
	public Appointment createAppointment(String name, String mail, String phone, int gender, int seatId, Date timeStart, Date timeEnd) {
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
		appointment.setTimeStart(timeStart);
		appointment.setTimeEnd(timeEnd);
		return save(appointment);
	}

	@Override
	public List<Appointment> getEventFrom(Date fromDate) {
		List<Appointment> appointments = this.repository.customQuery(Appointment.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Appointment.class);
				return criteria.add(Restrictions.ge("timeStart", fromDate));
			}
		});
		return appointments;
	}
	

}
