package com.foodStore.model;

import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class ProductAdapter extends Adapter implements JsonSerializer<Product> {
	@Override
	public JsonElement serialize(Product product, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", product.getId());
		jsonObject.addProperty("productName", product.getProductName());
		jsonObject.addProperty("unitType", product.getUnitType());
		jsonObject.addProperty("quantityPerUnit", product.getQuantityPerUnit());
		jsonObject.addProperty("price", product.getPrice());
		jsonObject.addProperty("discontinued", product.getDiscontinued());
		jsonObject.addProperty("categoryType", product.getCategoryType());
		return jsonObject;
	}
}


