package com.foodStore.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.BaseModelObject;

@Transactional
public class ServiceBase <T extends BaseModelObject>{
	IRepository repository;
	
	public ServiceBase(IRepository repository) {
		this.repository = repository;
	}
	
	
	public T save(T item) {
		try {
			int id = this.repository.save(item);
			return this.repository.getItemById((Class<T>)item.getClass(), id);
		} catch(Exception e) {
			System.out.println(e);
		}
		return  null;
		
	}
	public boolean delete(T item) {
		if (this.repository.getItemById((Class<T>)item.getClass(), ((BaseModelObject)item).getId()) != null)
			return this.repository.deleteItem(item);
		return false;
	}
	public boolean update(T item) {
		if (this.repository.getItemById((Class<T>)item.getClass(), ((BaseModelObject)item).getId()) != null)
			return this.repository.updateItem(item);
		return false;
	}
	public T getItemWithId(Class<T> clazz, int id) {
		return this.repository.getItemById(clazz, id);
	}
	
	public List<T> getItemsWithAllKey(Class<T> clazz, CompareKey... compareKeys) {
		List<T> result = this.repository.getItemsWithAllKey(clazz, compareKeys);
		return result.size() == 0 ? null : result;
	}
	
	public List<T> getItemsWithOneKey(Class<T> clazz, CompareKey... compareKeys) {
		List<T> result = this.repository.getItemsWithOneKey(clazz, compareKeys);
		return result.size() == 0 ? null : result;
	}
	
	public List<T> getAll(Class<T> clazz) {
		return this.repository.getAll(clazz);
	}
	
	
	
}
