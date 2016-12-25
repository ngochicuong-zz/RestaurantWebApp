package com.foodStore.impl;

import com.foodStore.hibernate.IRepository;

import java.util.List;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.model.Order;
import com.foodStore.model.Payment;
import com.foodStore.model.Promotion;
import com.foodStore.service.IPaymentService;

public class PaymentService extends ServiceBase<Payment> implements IPaymentService {

	public PaymentService(IRepository repository) {
		super(repository);
	}

	@Override
	public Payment createPayment(String refCode, String promotionCode, double realPay) {
		Order order = this.repository.getItemsWithAllKey(Order.class, new CompareKey("refCode", refCode)).get(0);
		System.out.println(promotionCode);
		List<Promotion> promotions = this.repository.getItemsWithAllKey(Promotion.class, new CompareKey("promotionCode", promotionCode));
		Promotion promo = promotions.size() == 0 ? null : promotions.get(0);
		Payment payment = new Payment();
		payment.setId(0);
		payment.setRefCode(refCode);
		payment.setTotalOnOrder(order.getTotal());
		if (promo != null) {
			payment.setPromosApply(promotionCode);
			if (promo.getDiscount() < 1) {
				payment.setTotalDiscount(order.getTotal() * promo.getDiscount());
			} else {
				payment.setTotalDiscount(promo.getDiscount());
			}
		} else {
			payment.setTotalDiscount(0);
		}
		payment.setTotalToPay(order.getTotal() - payment.getTotalDiscount());
		payment.setRealPay(realPay);
		payment.setDebt(payment.getTotalToPay() - realPay);
		return save(payment);
	}

}
