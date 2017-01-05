package com.foodStore.hibernate;

import java.util.List;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;


public interface IRepository {
	
	<T> boolean deleteItem (T entity);
	<T> boolean updateItem (T entity);
	<T> boolean addItems(List<T> entity);
	<T> int save(T entity);
	<T> T getItemById(Class<T> entityType, int id);
	// get only item with keys
	<T> List<T> getItemsWithAllKey(Class<T> entityType, CompareKey...keys);
	// get list items with keys
	<T> List<T> getItemsWithOneKey(Class<T> entityType, CompareKey...keys);
	<T> List<T> customQuery(Class<T> entityType, ICriteriaBuilder criteriaBuilder);
	<T> List<T> getAll(Class<T> entityType);
	
	<T> List<? extends Object> runSqlQuery(String sqlCommand);
}
