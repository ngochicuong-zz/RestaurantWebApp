package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class AccountAdapter extends Adapter implements JsonSerializer<Account> {
	@Override
	public JsonElement serialize(Account acc, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", acc.getId());
		jsonObject.addProperty("user", acc.getUser());
		jsonObject.addProperty("pass", acc.getPass());
		jsonObject.addProperty("email", acc.getEmail());
		jsonObject.addProperty("role", acc.getRole());
		jsonObject.addProperty("lastSignInAt", acc.getLastSignInAt().toString());
		jsonObject.addProperty("actived", acc.getActived());
		jsonObject.addProperty("online", acc.getOnline());
		return jsonObject;
	}
}
