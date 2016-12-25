package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class PromotionAdapter extends Adapter implements JsonSerializer<Promotion> {

	@Override
	public JsonElement serialize(Promotion src, Type typeOfSrc, JsonSerializationContext context) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		jsonObject.addProperty("promotionCode", src.getPromotionCode());
		jsonObject.addProperty("payCondition", src.getPayCondition());
		jsonObject.addProperty("discount", src.getDiscount());
		jsonObject.addProperty("fromDate", src.getFromDate().toString());
		jsonObject.addProperty("toDate", src.getToDate().toString());
		jsonObject.addProperty("description", src.getDescription());
		return jsonObject;
	}

}
