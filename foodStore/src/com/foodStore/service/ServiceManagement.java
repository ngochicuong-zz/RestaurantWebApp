package com.foodStore.service;

import java.util.HashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ServiceManagement {
	public static HashMap<String, Object> serviceMap = new HashMap<String, Object>(); 
	static ApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "Spring.xml" });
	public static synchronized <T> T get(Class<T> clazz){
		return context.getBean(clazz);
	};
}
