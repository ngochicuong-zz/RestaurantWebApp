package com.foodStore.service;

import com.foodStore.model.Payment;

public interface IPaymentService {
	Payment createPayment(int orderId, double realPay);
	
}
