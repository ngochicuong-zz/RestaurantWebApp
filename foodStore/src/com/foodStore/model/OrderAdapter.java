package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class OrderAdapter extends Adapter implements JsonSerializer<Order> {
	@Override
	public JsonElement serialize(Order order, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", order.getId());
		jsonObject.addProperty("note", order.getNote());
		jsonObject.addProperty("customerId", order.getCustomerId());
		jsonObject.addProperty("total", order.getTotal());
		jsonObject.addProperty("onPay", order.getOnPay());
		jsonObject.addProperty("dataInsert", order.getDateInsert().toString());
		jsonObject.addProperty("seatTableId", order.getSeatTable().getId());
		return jsonObject;
	}
}
