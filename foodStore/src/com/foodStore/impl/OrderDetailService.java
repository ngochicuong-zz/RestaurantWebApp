package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
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
	public boolean updateOrderDetail(OrderDetail orderDetail, int productId, double quality, String note) {
		Product product = this.repository.getItemById(Product.class, productId);
		return updateOrderDetail(orderDetail, null, product, quality, note);
		
	}
	@Override
	public boolean updateOrderDetail(OrderDetail orderDetail, int orderId, String note) {
		Order order = this.repository.getItemById(Order.class, orderId);
		return updateOrderDetail(orderDetail, order, null, -1, note);
		
	}
	
	public boolean updateOrderDetail(OrderDetail orderDetail, Order order, Product product, double quality, String note) {
		if (order != null) {
			orderDetail.setOrder(order);
		}
		if (product != null) {
			orderDetail.setQuality(quality);
			orderDetail.setProduct(product);
			orderDetail.setPrice(product.getPrice());
			orderDetail.setTotal(quality * product.getPrice());
		}
		if (note != null) orderDetail.setNote(note);
		orderDetail.setLastUpdateTime(new Date());
		orderDetail.setUsedUpdateTime(orderDetail.getUsedUpdateTime() == null ? new Date().toString() : orderDetail.getUsedUpdateTime() + "," + new Date());
		orderService.updateOrderTotal(order.getId());
		return update(orderDetail);
	}
	
	@Override
	public OrderDetail createOrderDetail(int orderId, int productId, double quality, String note){
		OrderDetail orderDetail = new OrderDetail();
		Order order = this.repository.getItemById(Order.class, orderId);
		Product product = this.repository.getItemById(Product.class, productId);
		orderDetail.setId(0);
		orderDetail.setNote(note);
		orderDetail.setQuality(quality);
		orderDetail.setProduct(product);
		orderDetail.setPrice(product.getPrice());
		orderDetail.setOrder(order);
		orderDetail.setTotal(quality * product.getPrice());
		orderDetail.setNote(note);
		orderDetail.setLastUpdateTime(new Date());
		return save(orderDetail);
	}

	@Override
	public List<OrderDetail> getOrderDetailWithOrderId(int orderId) {
		Order order = this.repository.getItemById(Order.class, orderId);
		if (order == null) return null;
		List<OrderDetail> orderDetails = this.repository.customQuery(OrderDetail.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(OrderDetail.class);
				criteria.add(Restrictions.eq("order.id", orderId));
				return criteria;
			}
		});
		return orderDetails;
	}
}
