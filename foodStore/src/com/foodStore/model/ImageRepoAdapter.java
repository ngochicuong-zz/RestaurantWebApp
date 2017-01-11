package com.foodStore.model;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class ImageRepoAdapter extends Adapter implements JsonSerializer<ImageRepo>{

	@Override
	public JsonElement serialize(ImageRepo src, Type typeOfSrc, JsonSerializationContext context) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("id", src.getId());
		jsonObject.addProperty("imageCode", src.getImageCode());
		jsonObject.addProperty("imageByte", new String(src.getImageByte()));
		return jsonObject;
	}

}
