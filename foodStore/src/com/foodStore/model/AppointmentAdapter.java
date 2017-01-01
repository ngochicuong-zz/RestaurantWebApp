package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class AppointmentAdapter extends Adapter implements JsonSerializer<Appointment> {

	@Override
	public JsonElement serialize(Appointment src, Type typeOfSrc, JsonSerializationContext context) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		jsonObject.addProperty("customName", src.getCustomName());
		jsonObject.addProperty("customPhone", src.getCustomPhone());
		jsonObject.addProperty("customEmail", src.getCustomEmail());
		jsonObject.addProperty("capacity", src.getCapacity());
		jsonObject.addProperty("timeStart", src.getTimeStart().toString());
		jsonObject.addProperty("timeEnd", src.getTimeEnd().toString());
		if (src.getSeatTable() != null) {
			jsonObject.addProperty("seatId", src.getSeatTable().getId());
			jsonObject.addProperty("room", src.getSeatTable().getRoom());
			jsonObject.addProperty("floor", src.getSeatTable().getFloor());
		}
		return jsonObject;
	}

}
