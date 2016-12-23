package com.foodStore.hibernate;

import com.foodStore.model.Adapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtil {
	public static <T> Gson build(Class<T> clazz, Adapter adapter){
		GsonBuilder bGson = new GsonBuilder();
		bGson.registerTypeAdapter(clazz, adapter);
		return bGson.create();
	}
}
