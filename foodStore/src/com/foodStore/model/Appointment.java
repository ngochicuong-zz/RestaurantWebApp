package com.foodStore.model;

import java.util.Date;

public class Appointment extends BaseModelObject {
	private String customName, customPhone, customEmail;
	private int customGender, capacity;
	private Date timeStart, timeEnd;
	private SeatTable seatTable;
	public String getCustomName() {
		return customName;
	}
	public void setCustomName(String customName) {
		this.customName = customName;
	}
	public String getCustomPhone() {
		return customPhone;
	}
	public void setCustomPhone(String customPhone) {
		this.customPhone = customPhone;
	}
	public String getCustomEmail() {
		return customEmail;
	}
	public void setCustomEmail(String customEmail) {
		this.customEmail = customEmail;
	}
	public int getCustomGender() {
		return customGender;
	}
	public void setCustomGender(int customGender) {
		this.customGender = customGender;
	}
	public SeatTable getSeatTable() {
		return seatTable;
	}
	public void setSeatTable(SeatTable seatTable) {
		this.seatTable = seatTable;
	}
	public Date getTimeStart() {
		return timeStart;
	}
	public void setTimeStart(Date timeStart) {
		this.timeStart = timeStart;
	}
	public Date getTimeEnd() {
		return timeEnd;
	}
	public void setTimeEnd(Date timeEnd) {
		this.timeEnd = timeEnd;
	}
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
}
