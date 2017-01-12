package com.foodStore.service;

import java.util.Date;
import java.util.List;

import com.foodStore.model.Promotion;

public interface IPromotionService {
	List<Promotion> findPromoWithPay(double pay);
	List<Promotion> getAllPromoOnDesk();
	List<Promotion> getAllPromo();
	List<Promotion> searchPromotion(String description, Date fromDate, Date toDate);
	
	Promotion createPromotion(double paycondition, double discount, Date fromDate, Date toDate, String description);
	boolean updatePromotion(int promoId ,double paycondition, double discount, Date fromDate, Date toDate, String description);
	List<? extends Object> getPromoWithImageOnDesk();
}
