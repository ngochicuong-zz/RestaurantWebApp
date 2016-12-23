package com.foodStore.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import com.foodStore.hibernate.IRepository;
import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.model.Account;
import com.foodStore.model.Product;
import com.foodStore.model.ProductCategory;
import com.foodStore.service.IProductService;

public class ProductService extends ServiceBase<Product> implements IProductService {

	public ProductService(IRepository repository) {
		super(repository);
	}

	@Override
	public List<Product> filterWithType(ProductCategory category) {
		List<Product> products = this.repository.getItemsWithOneKey(Product.class, new CompareKey("categoryType", category));
		return products;
	}

	@Override
	public List<Product> searchWithName(String name) {
		
		List<Product> products = this.repository.customQuery(Product.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Product.class, "p");
				criteria.add(Restrictions.ilike("p.productName", name, MatchMode.ANYWHERE));
				return criteria;
			}
		});
		return products;
	}

	@Override
	public boolean setDiscontinued(int productId, boolean discontinued) {
		Product product = this.repository.getItemById(Product.class, productId);
		if (product == null) return false;
		product.setDiscontinued(discontinued ? 't' : 'f');
		return update(product);
	}
	
	public boolean updateProduct(int productId, double price, String name, int categoryType) {
		Product product = this.repository.getItemById(Product.class, productId);
		if (product == null) return false;
		if (price > 1000) product.setPrice(price);
		if (name != null) product.setProductName(name);
		if (categoryType != -1) product.setCategoryType(categoryType);
		return update(product);
	}

	@Override
	public Product createProduct(double price, String productName, double quantityPerUnit, String unitType, int categoryType) {
		Product product = new Product();
		product.setId(-1);
		product.setPrice(price);
		product.setProductName(productName);
		product.setDiscontinued('f');
		product.setQuantityPerUnit(quantityPerUnit);
		product.setUnitType(unitType);
		product.setCategoryType(categoryType);
		return null;
	}

	@Override
	public List<Product> getAllProduct() {
		List<Product> products = this.repository.customQuery(Product.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Product.class, "a");
				criteria.add(Restrictions.like("a.discontinued", 'f'));
				return criteria;
			}
		});
		System.out.println(products);
		return products;
	}

}
