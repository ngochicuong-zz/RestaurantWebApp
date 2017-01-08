package com.foodStore.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Base64;
import java.util.HashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ServiceManagement {
	public static HashMap<String, Object> serviceMap = new HashMap<String, Object>();
	static ApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "Spring.xml" });

	public static synchronized <T> T get(Class<T> clazz) {
		return context.getBean(clazz);
	};

	public static Object fromString(String s) throws IOException, ClassNotFoundException {
		byte[] data = Base64.getDecoder().decode(s);
		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
		Object o = ois.readObject();
		ois.close();
		return o;
	}

	/** Write the object to a Base64 string. */
	public static String toString(Serializable o) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(o);
		oos.close();
		return Base64.getEncoder().encodeToString(baos.toByteArray());
	}
}
