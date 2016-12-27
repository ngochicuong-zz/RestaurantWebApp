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
		jsonObject.addProperty("name", src.getCustomName());
		jsonObject.addProperty("phone", src.getCustomPhone());
		jsonObject.addProperty("email", src.getCustomEmail());
		jsonObject.addProperty("timeStart", src.getTimeStart().toString());
		jsonObject.addProperty("timeEnd", src.getTimeEnd().toString());
		return jsonObject;
	}

}
