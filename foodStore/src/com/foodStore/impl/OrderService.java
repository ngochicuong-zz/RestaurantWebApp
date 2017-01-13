package com.foodStore.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Account;
import com.foodStore.model.GroupYearReturn;
import com.foodStore.model.Order;
import com.foodStore.model.OrderDetail;
import com.foodStore.model.SeatTable;
import com.foodStore.service.IOrderService;
import com.foodStore.service.ISeatTableService;

public class OrderService extends ServiceBase<Order> implements IOrderService{
	
	@Autowired
	ISeatTableService seatTableRepository;
	
	public OrderService(IRepository repository) {
		super(repository);
	}

	@Override
	public boolean setOnPay(Order order, boolean onPay) {
		order.setOnPay(onPay ? 't' : 'f');
		return this.repository.updateItem(order);
	}

	@Override
	public Order createOrder(int seatId, int accountId) {
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		if (seat == null || seat.getOnDesk() == 't') return null;
		Account account = this.repository.getItemById(Account.class, accountId);
		if (account == null) return null;
		Order order = new Order();
		order.setId(-1);
		order.setAccount(account);
		order.setSeatTable(seat);
		order.setRefCode(UUID.randomUUID().toString());
		order.setOnPay('f');
		order.setDateInsert(new Date());
		seatTableRepository.setOnDesk(seatId, true);
		return save(order);
	}

	@Override
	public Order searchOrderByRefCode(String refCode) {
		List<Order> orders = this.repository.customQuery(Order.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Order.class);
				criteria.add(Restrictions.eq("refCode", refCode));
				return criteria;
			}
		});
		if (orders.size() == 0) return null;
		return orders.get(0);
	}
	
	@Override
	public boolean updateOrderTotal(int orderId) {
		Order order = this.repository.getItemById(Order.class, orderId);
		Object total = this.repository.customQuery(OrderDetail.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(OrderDetail.class);
				criteria.add(Restrictions.eq("order", orderId));
				return criteria.setProjection(Projections.sum("total"));
			}
		});
		order.setTotal((double)total);
		return update(order);
	}

	@Override
	public Order getOrderWithSeat(int seatId) {
		SeatTable seat = this.repository.getItemById(SeatTable.class, seatId);
		System.out.println(seat);
		if (seat == null) return null;
		List<Order> orders = (List<Order>) this.repository.getItemsWithAllKey(Order.class, new CompareKey("seatTable", seat));
		Order order = orders.size() == 0 ? null : orders.get(orders.size() - 1);
		return order;
	}
	
	@Override
	public List<? extends Object> sumOrderByYear() {
		String sqlCommand = "select EXTRACT(YEAR FROM dateinsert) as year, sum(total) as total from order_bill group by year";
		return this.repository.runSqlQuery(sqlCommand);
	}

	@Override
	public  List<? extends Object> sumOrderByMonth(String year) {
		String sqlCommand = "select  EXTRACT(MONTH FROM dateinsert) as month, sum(total) as total from order_bill where extract(year from dateinsert) = "+ year +"  group by month";
		return this.repository.runSqlQuery(sqlCommand);
	}

	@Override
	public List<? extends Object> sumOrderByFoodOnYear() {
		
		String sqlCommand = "select c.productname, sum(b.total) as total, extract(year from a.dateinsert) as year from order_bill as a, orderdetail as b, product as c"
				+ " where b.refcode like a.refcode and c.id = b.product_id group by year, c.productname order by year desc";
		System.out.println(sqlCommand);
		return this.repository.runSqlQuery(sqlCommand);
	}
	
	@Override
	public List<? extends Object> getAllYear() {
		String sqlCommand = "select extract(year from dateinsert) as year from order_bill group by year order by year desc";
		return this.repository.runSqlQuery(sqlCommand);
	}
	
	@Override
	public List<? extends Object> sumOrderByFoodOnMonth(String year) {
		String sqlCommand = "select c.productname, sum(b.total) as total, extract(month from a.dateinsert) as month from order_bill as a, orderdetail as b, product as c "
				+ " where b.refcode like a.refcode and c.id = b.product_id and extract(year from a.dateinsert) = " + year + " group by month, c.productname order by month desc";
		System.out.println(sqlCommand);
		return this.repository.runSqlQuery(sqlCommand);
	}

}
