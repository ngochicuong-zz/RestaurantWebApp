package com.foodStore.model;

public class Appointment extends BaseModelObject {
	private String customName, customPhone, customEmail;
	private int customGender;
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
}
