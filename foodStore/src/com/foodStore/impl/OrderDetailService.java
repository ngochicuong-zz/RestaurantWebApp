package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Order;
import com.foodStore.model.OrderDetail;
import com.foodStore.model.Product;
import com.foodStore.service.IOrderDetailService;
import com.foodStore.service.IOrderService;

public class OrderDetailService extends ServiceBase<OrderDetail> implements IOrderDetailService {
	
	@Autowired
	IOrderService orderService;
	
	public OrderDetailService(IRepository repository) {
		super(repository);
		
	}
	
	
	@Override
	public OrderDetail createOrderDetail(String refCode, int productId, double quality, String note){
		List<OrderDetail> listDetail = this.repository.customQuery(OrderDetail.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(OrderDetail.class);
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.eq("product.id", productId));
				and.add(Restrictions.ilike("refCode", refCode, MatchMode.EXACT));
				return criteria.add(and);
			}
		});
		OrderDetail oldDetail = listDetail.size() == 0 ? null : listDetail.get(0);
		if (oldDetail != null) {
			this.updateOrderDetail(oldDetail.getId(), oldDetail.getQuality() + quality, null);
			return null;
		} else {
			OrderDetail orderDetail = new OrderDetail();
			Product product = this.repository.getItemById(Product.class, productId);
			orderDetail.setId(0);
			orderDetail.setNote(note);
			orderDetail.setQuality(quality);
			orderDetail.setProduct(product);
			orderDetail.setPrice(product.getPrice());
			orderDetail.setRefCode(refCode);
			orderDetail.setTotal(quality * product.getPrice());
			orderDetail.setNote(note);
			orderDetail.setLastUpdateTime(new Date());
			OrderDetail detail = save(orderDetail);
			try {
				Order order = this.repository.getItemsWithAllKey(Order.class, new CompareKey("refCode", refCode)).get(0);
				order.setTotal(order.getTotal() + detail.getTotal());
				this.repository.updateItem(order);
			} catch(Exception e) {
				
			}
			return detail;
			
		}
		
	}

	@Override
	public List<OrderDetail> getOrderDetailByRefCode(String refCode) {
		List<OrderDetail> orderDetails = this.repository.customQuery(OrderDetail.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(OrderDetail.class);
				criteria.add(Restrictions.eq("refCode", refCode));
				return criteria;
			}
		});
		return orderDetails;
	}

	@Override
	public boolean removeOrderDetail(int detailId) {
		try {
			OrderDetail detail = this.repository.getItemById(OrderDetail.class, detailId);
			if (detail == null) return false;
			Order order = this.repository.getItemsWithAllKey(Order.class, new CompareKey("refCode", detail.getRefCode())).get(0);
			if (order == null) return false;
			order.setTotal(order.getTotal() - detail.getTotal());
			this.repository.updateItem(order);
			this.repository.deleteItem(detail);
			return true;
		} catch (Exception ex){
			return false;
		}
	}


	@Override
	public boolean updateOrderDetail(int detailId, double quality, String note) {
		try {
			OrderDetail detail = this.repository.getItemById(OrderDetail.class, detailId);
			if (detail == null) return false;
			double total = detail.getQuality() * detail.getPrice();
			Order order = this.repository.getItemsWithAllKey(Order.class, new CompareKey("refCode", detail.getRefCode())).get(0);
			if (order == null) return false;
			order.setTotal(order.getTotal() - total + quality * detail.getPrice());
			
			detail.setQuality(quality);
			detail.setTotal(quality * detail.getPrice());
			detail.setNote(note);
			this.repository.updateItem(detail);
			this.repository.updateItem(order);
			return true;
		} catch(Exception ex) {
			return false;
		}
	}
}
