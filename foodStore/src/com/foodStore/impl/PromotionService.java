package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;
import com.foodStore.hibernate.IRepository;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.model.Product;
import com.foodStore.model.Promotion;
import com.foodStore.service.IPromotionService;

public class PromotionService extends ServiceBase<Product> implements IPromotionService{

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
				and.add(Restrictions.le("fromDate", date));
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
				and.add(Restrictions.le("todate", date));
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

}
