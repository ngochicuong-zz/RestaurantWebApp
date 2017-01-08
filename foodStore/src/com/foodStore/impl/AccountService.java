package com.foodStore.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
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
	public Account login(String account, String pass) {
		List<Account> results = this.repository.customQuery(Account.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Account.class, "a");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ilike("a.user", account));
				and.add(Restrictions.ilike("a.pass", pass));
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
	public boolean setActive(int accountId, boolean active) {
		Account account = this.repository.getItemById(Account.class, accountId);
		if (account == null) return false;
		account.setActived(active == true ? 't' : 'f');
		return this.repository.updateItem(account);
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
	public void logout(String account) {
		List<Account> results = this.repository.customQuery(Account.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Account.class, "a");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ilike("a.user", account));
				criteria.add(and);
				return criteria;
			}
		});
		if (results.size() > 0) {
			Account item = results.get(0);
			item.setOnline('f');
			this.repository.updateItem(item);
		}
	}
	
	@Override
	public List<Account> getAllAccount() {
		return this.repository.getAll(Account.class);
	}

	@Override
	public List<Account> getAccountByUser(String user) {
		List<Account> results = this.repository.customQuery(Account.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Account.class, "a");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ilike("a.user", user, MatchMode.ANYWHERE));
				criteria.add(and);
				return criteria;
			}
		});
		return results;
	}

	@Override
	public Account createAccount(String user, String pass, String email, int role) {
		Account account = new Account();
		account.setUser(user);
		account.setPass(pass);
		account.setEmail(email);
		account.setRole(role);
		account.setActived('t');
		account.setOnline('f');
		return save(account);
	}

	@Override
	public boolean updateAccount(int userId, String user, String pass, String email, int role) {
		Account account = this.repository.getItemById(Account.class, userId);
		account.setUser(user);
		account.setPass(pass);
		account.setEmail(email);
		account.setRole(role);
		return update(account);
	}

	@Override
	public boolean updateAccountLoginCode(Account account) {
		return this.repository.updateItem(account);
	}

	@Override
	public Account searchAccountByLoginCode(String loginCode) {
		List<Account> results = this.repository.customQuery(Account.class, new ICriteriaBuilder() {
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(Account.class, "a");
				Conjunction and = Restrictions.conjunction();
				and.add(Restrictions.ilike("a.loginCode", loginCode, MatchMode.ANYWHERE));
				criteria.add(and);
				return criteria;
			}
		});
		if (results.size() > 0) {
			Account item = results.get(0);
			return item;
		}
		return null;
	}
	
}
