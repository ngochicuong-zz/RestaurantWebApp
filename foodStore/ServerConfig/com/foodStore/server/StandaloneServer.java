package com.foodStore.server;

import java.io.File;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class StandaloneServer {

	public static int PORT = 8080;

	public static void main(String[] args) throws Exception {
		
		System.out.println("START SERVER");
		
		Server server = new Server(PORT);
		File dir = new File(new File(System.getProperty("user.dir")), "webapp");
        
        WebAppContext context = new WebAppContext();
        String path = dir.getAbsolutePath();
        System.out.println(path);
        context.setDescriptor(path + "/WEB-INF/web.xml");
        context.setResourceBase(".");
        context.setContextPath("/*");
        System.out.println(context.getDescriptor());
		
        server.setHandler(context);
		
		server.start();
		server.join();

	}

}
