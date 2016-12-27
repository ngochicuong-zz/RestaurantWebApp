package com.foodStore.model;

import java.util.HashSet;
import java.util.Set;
 
public class SeatTable extends BaseModelObject {
	private int room, floor, capacity;
	private String description;
	private int priority;
	private char onDesk;
	private Set<Order> orders = new HashSet<Order>();
	private Set<Appointment> appointments = new HashSet<Appointment>();
	
	public int getRoom() {
		return room;
	}
	public void setRoom(int room) {
		this.room = room;
	}
	public int getFloor() {
		return floor;
	}
	public void setFloor(int floor) {
		this.floor = floor;
	}
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public char getOnDesk() {
		return onDesk;
	}
	public void setOnDesk(char onDesk) {
		this.onDesk = onDesk;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public Set<Order> getOrders() {
		return orders;
	}
	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}
	public Set<Appointment> getAppointments() {
		return appointments;
	}
	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}
	
}
