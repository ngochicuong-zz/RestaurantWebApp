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
	
	public boolean updateProduct(int productId ,double price, String productName, double quantityPerUnit, String unitType, int categoryType) {
		Product product = this.repository.getItemById(Product.class, productId);
		if (product == null) return false;
		product.setPrice(price);
		product.setProductName(productName);
		product.setQuantityPerUnit(quantityPerUnit);
		product.setUnitType(unitType);
		product.setCategoryType(categoryType);
		return update(product);
	}

	@Override
	public Product createProduct(double price, String productName, double quantityPerUnit, String unitType, int categoryType) {
		Product product = new Product();
		product.setId(0);
		product.setPrice(price);
		product.setProductName(productName);
		product.setDiscontinued('f');
		product.setQuantityPerUnit(quantityPerUnit);
		product.setUnitType(unitType);
		product.setCategoryType(categoryType);
		return save(product);
	}

	@Override
	public List<Product> getAllProduct() {
		List<Product> products = this.repository.getAll(Product.class);
		return products;
	}

	@Override
	public List<Product> searchProduct(String productName, double price, int categories) {
		List<Product> products = this.repository.customQuery(Product.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Product.class, "p");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.eq("p.discontinued", 'f'));
				if (productName != null)
					and.add(Restrictions.ilike("p.productName", productName, MatchMode.ANYWHERE));
				if (price != -1)
					and.add(Restrictions.le("p.Price", price));
				if (categories != -1)
					and.add(Restrictions.eq("p.categoryType", categories));
				return criteria.add(and);
			}
		});
		return products;
	}

}
