package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.foodStore.hibernate.HibernateRepository.CompareKey;
import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.Account;
import com.foodStore.service.IAccountService;

public class AccountService extends ServiceBase<Account> implements IAccountService{
	
	public AccountService(IRepository repository) {
		super(repository);
	}
	
	@Override
	public boolean changePassword(Account account, String password) {
		account.setPass(password);
		return this.repository.updateItem(account);
	}
	
	@Override
	public Account login(Account account) {
		List<Account> results = this.repository.customQuery(Account.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Account.class, "a");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ilike("a.user", account.getUser()));
				and.add(Restrictions.ilike("a.pass", account.getPass()));
				criteria.add(and);
				return criteria;
			}
		});
		if (results.size() > 0) {
			Account item = results.get(0);
			item.setLastSignInAt(new Date());
			item.setOnline('t');
			this.repository.updateItem(item);
		}
		return  results.size() == 0 ? null : results.get(0);
	}
	
	@Override
	@Transactional
	public boolean setActive(Account account, boolean active) {
		account.setActived(active ? 't' : 'f');
		this.repository.updateItem(account);
		return false;
	}

	@Override
	public List<Account> getAllAccountWithOnline(boolean online) {
		return this.repository.getItemsWithAllKey(Account.class, new CompareKey("online", online ? 't' : 'f'));
	}

	@Override
	public List<Account> getAllAccountWithActive(boolean active) {
		return this.repository.getItemsWithAllKey(Account.class, new CompareKey("actived", active ? 't' : 'f'));
	}

	@Override
	public void logout(Account account) {
		account.setOnline('t');
		this.repository.updateItem(account);
	}
	
	
	
}
