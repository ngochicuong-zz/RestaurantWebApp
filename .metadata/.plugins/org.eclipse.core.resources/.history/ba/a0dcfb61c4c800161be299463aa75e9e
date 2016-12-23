package com.foodStore.model;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class PaymentAdapter extends Adapter implements JsonSerializer<Payment> {
	@Override
	public JsonElement serialize(Payment pay, Type type, JsonSerializationContext jsc) {
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("orderId", pay.getOrder().getId());
		jsonObject.addProperty("paymentType", pay.getPaymentType());
		jsonObject.addProperty("promosApply", pay.getPromosApply());
		jsonObject.addProperty("totalOnOrder", pay.getTotalOnOrder());
		jsonObject.addProperty("totalDiscount", pay.getTotalDiscount());
		jsonObject.addProperty("totalToPay", pay.getTotalToPay());
		jsonObject.addProperty("realPay", pay.getRealPay());
		jsonObject.addProperty("Debt", pay.getDebt());
		return jsonObject;
	}
}