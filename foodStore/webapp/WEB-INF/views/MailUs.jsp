<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<section id="contact" style="background-color:#282C35;">
            <vbox id="content">
                <h1>Contact</h1>
                <form action=" " method="post" autocomplete="on">
                    <hbox>
                    	<hbox flex="1">
                    		<p>
	                            <label for="subject" class="icon-bullhorn"> Subject</label>
	                            <input type="text" name="subject" id="subject" placeholder="What would you like to talk about?" />
                        	</p>
                    	</hbox>
                        <hbox flex="1">
                            <p>
	                           	<label for="username" class="icon-user"> Name
				                   <span class="required">*</span>
				               	</label>
	                            <input type="text" name="username" id="username" required="required" placeholder="Your Name" />
                        	</p>
                        </hbox>
                    </hbox>
                    <hbox>
                    	<hbox flex="1">
                    		<p>
	                            <label for="usermail" class="icon-envelope"> E-mail address
				                   <span class="required">*</span>
				               </label>
	                            <input type="email" name="usermail" id="usermail" placeholder="I promise I hate spam too!" required="required" />
	                        </p>
                    	</hbox>
                    	<hbox flex="1">
                    		<p>
	                            <label for="usersite" class="icon-link"> Website</label>
	                            <input type="url" name="usersite" id="usersite" placeholder="eg: http://www.example.com" />
	                        </p>
                    	</hbox>
                    </hbox>
                    <hbox>
                    	<hbox flex="1">
                    		<p>
		                       <label for="message" class="icon-comment"> Message
				                   <span class="required">*</span>
				               </label>
	                           <textarea placeholder="Your message here and I'll answer as soon as possible " required="required"></textarea>
	                        </p>
                    	</hbox>
                    	<vbox style="item-align: center" flex="1">
                    		 <p class="indication">Fields with
	                             <span class="required"> * </span>are required</p>
	                          <input type="submit" value=" Send this mail ! " />
                    	</vbox>
                       
                    </hbox>
                </form>
            </vbox>
        </section>