package com.foodStore.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import com.foodStore.hibernate.IRepository;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.model.Product;
import com.foodStore.model.Promotion;
import com.foodStore.service.IPromotionService;

public class PromotionService extends ServiceBase<Promotion> implements IPromotionService{

	public PromotionService(IRepository repository) {
		super(repository);
	}

	@Override
	public List<Promotion> findPromoWithPay(double pay) {
		Date date = new Date();
		System.out.println(pay);
		List<Promotion> promotions = this.repository.customQuery(Promotion.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Promotion.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.le("payCondition", pay));
				and.add(Restrictions.ge("toDate", date));
				return criteria.add(and);
			}
		});
		return promotions;
	}

	@Override
	public List<Promotion> getAllPromoOnDesk() {
		Date date = new Date();
		List<Promotion> promotions = this.repository.customQuery(Promotion.class,  new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Promotion.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ge("fromDate", date));
//				and.add(Restrictions.le("todate", date));
				return criteria.add(and);
			}
		});
		return promotions;
	}

	@Override
	public List<Promotion> getAllPromo() {
		List<Promotion> promotions = this.repository.getAll(Promotion.class);
		return promotions;
	}

	@Override
	public List<Promotion> searchPromotion(String description, Date fromDate, Date toDate) {
		List<Promotion> promotions = this.repository.customQuery(Promotion.class,  new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Promotion.class);
				Conjunction and = Restrictions.conjunction();
				if (description != null)
					and.add(Restrictions.ilike("description", description, MatchMode.ANYWHERE));
				if (fromDate != null)
					and.add(Restrictions.ge("fromDate", fromDate));
				if (toDate != null)
					and.add(Restrictions.le("toDate", toDate));
				return criteria.add(and);
			}
		});
		return promotions;
	}

	@Override
	public Promotion createPromotion(double payCondition, double discount, Date fromDate, Date toDate,
			String description) {
		Promotion promo = new Promotion();
		promo.setId(0);
		promo.setPromotionCode(UUID.randomUUID().toString());
		promo.setPayCondition(payCondition);
		promo.setDiscount(discount);
		promo.setFromDate(fromDate);
		promo.setToDate(toDate);
		promo.setDescription(description);
		return save(promo);
	}

	@Override
	public boolean updatePromotion(int promoId, double paycondition, double discount, Date fromDate, Date toDate,
			String description) {
		Promotion promo = this.repository.getItemById(Promotion.class, promoId);
		System.out.println(promo);
		if (promo == null) return false;
		promo.setPayCondition(paycondition);
		promo.setDiscount(discount);
		promo.setFromDate(fromDate);
		promo.setToDate(toDate);
		promo.setDescription(description);
		System.out.println(promo.getDescription());
		return this.repository.updateItem(promo);
	}
	
	@Override
	public List<? extends Object> getPromoWithImageOnDesk() {
		String sqlCommand = " select a.description, b.imagebyte from promotion as a, imagerepo as b where a.toDate >= '"+ String.valueOf(new Date()) +"' and b.imagecode like a.promotioncode";
		return this.repository.runSqlQuery(sqlCommand);
	}

}
