package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class EmployeeAdapter extends Adapter implements JsonSerializer<Employee> {
	@Override
	public JsonElement serialize(Employee emp, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", emp.getId());
		jsonObject.addProperty("lastName", emp.getLastName());
		jsonObject.addProperty("firstName", emp.getFirstName());
		jsonObject.addProperty("title", emp.getTitle());
		jsonObject.addProperty("address", emp.getAddress());
		jsonObject.addProperty("city", emp.getCity());
		jsonObject.addProperty("homePhone", emp.getHomePhone());
		jsonObject.addProperty("notes", emp.getNotes());
		
		jsonObject.addProperty("firstDate", emp.getFirstDate().toString());
		jsonObject.addProperty("hireDate", emp.getHireDate().toString());
		jsonObject.addProperty("birthDate", emp.getBirthDate().toString());
		jsonObject.addProperty("onWork", emp.getOnWork());
		return jsonObject;
	}
}
