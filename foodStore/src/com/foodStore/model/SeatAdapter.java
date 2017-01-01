package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class SeatAdapter extends Adapter implements JsonSerializer<SeatTable> {
	@Override
	public JsonElement serialize(SeatTable seat, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", seat.getId());
		jsonObject.addProperty("floor", seat.getFloor());
		jsonObject.addProperty("room", seat.getRoom());
		jsonObject.addProperty("capacity", seat.getCapacity());
		jsonObject.addProperty("onDesk", seat.getOnDesk());
		jsonObject.addProperty("description", seat.getDescription());
		jsonObject.addProperty("priority", seat.getPriority());
		return jsonObject;
	}
}
