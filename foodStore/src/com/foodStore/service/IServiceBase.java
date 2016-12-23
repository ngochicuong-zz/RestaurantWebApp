package com.foodStore.service;

import com.foodStore.hibernate.HibernateRepository.CompareKey;

public interface IServiceBase<T> {
	int Save(T item);
	boolean delete(T item);
	boolean update(T item);
	T getItemWithId(Class<T> clazz, int id);
	T getItemWithKey(Class<T> clazz, CompareKey...compareKeys);
}
