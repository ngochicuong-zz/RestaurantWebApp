package com.foodStore.service;

import java.util.List;

import com.foodStore.model.Promotion;

public interface IPromotionService {
	List<Promotion> findPromoWithPay(double pay);
	List<Promotion> getAllPromoOnDesk();
	List<Promotion> getAllPromo();
}
