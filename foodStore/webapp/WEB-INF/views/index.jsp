 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <link href="webapp/assets/css/Main.css" rel="stylesheet" type="text/css" />
    <link href="webapp/assets/css/my-slider.css" rel="stylesheet" type="text/css" />
    <link href="webapp/assets/css/index.css" rel="stylesheet" type="text/css" />
    <script src="webapp/assets/js/ism-2.2.min.js" type="text/javascript"></script>
</head>
<body>
	<vbox flex="1">
		<vbox class="container" style="min-height: 100vh">
	        <vbox class="ism-slider" data-radio_type="thumbnail" id="my-slider" style="height:100vh">
	          <ol>
	            <li>
	              <img src="webapp/assets/img/backgrounds/flower-729514_1280.jpg">
	              <div class="ism-caption ism-caption-0">QUE TA RESTAURANT</div>
	            </li>
	            <li>
	              <img src="webapp/assets/img/backgrounds/beautiful-701678_1280.jpg">
	              <div class="ism-caption ism-caption-0">WELCOME TO AHIHI !!</div>
	            </li>
	            <li>
	              <img src="webapp/assets/img/backgrounds/architecture-22039_1280.jpg">
	              <div class="ism-caption ism-caption-0">FOODSTORE NUMBER ONE</div>
	            </li>
	            <li>
	              <img src="webapp/assets/img/backgrounds/architecture-22039_1280.jpg">
	              <div class="ism-caption ism-caption-0">FOODSTORE NUMBER ONE</div>
	            </li>
	            <li>
	              <img src="webapp/assets/img/backgrounds/architecture-22039_1280.jpg">
	              <div class="ism-caption ism-caption-0">FOODSTORE NUMBER ONE</div>
	            </li>
	          </ol>
	        </vbox>
	    </vbox>
	    
	     <vbox style="height:100vh ;margin: 0 auto;padding-top: 100px;">
	        <hbox style="min-height: 130px;margin:0 auto;">
	            <vbox style=" height:100%;text-align: center;margin: 0 auto;">
	                <h3>QUE TA RESTAURANT</h3>
	                <p style="white-space: normal;width: 400px;">Welcome to Que Ta !! Cung thuong thuc nhung mon an ngon va canh quang mang hoi am cua gia dinh</p>
	            </vbox>
	        </hbox>
	        <hbox flex="1" id="navContainer">
	            <vbox class="sidebar menu" navName="menu">
	                <img src="webapp/assets/img/backgrounds/menu.png" >
	                <h3>Menu</h3>
	                <p>Click vao hinh di nao</p>
	            </vbox>
	            <vbox class="sidebar contact" navName="contact">
	                <img src="webapp/assets/img/backgrounds/blog.png" style=";margin-left: 1em;margin-right: 1em;">
	                <h3>Blog</h3>
	                <p>Click vao hinh di nao</p>
	            </vbox>
	            <vbox class="sidebar blog" navName="blog">
	                <img src="webapp/assets/img/backgrounds/contact.png" >
	                <h3>Contact</h3>
	                <p>Click vao hinh di nao</p>
	            </vbox>
	        </hbox>
	    </vbox>
	    
	    <vbox id="menu" style="height:100vh">
    	 	<vbox class="menubar" style="border:none;padding-bottom: 40px">
                    <h1 style="color:#AE9A64; ">DINNER MENU</h1>
                    <i style="text-align: center;">Get people excited about your menu and your food. Give your menu a brief description</i>
            </vbox>
            <vbox class="menubar" >
                    <vbox>
                        <h3>CHICKEN</h3>
                        </vbox>
                    <vbox>
                        <i class="menufont">This is a secion of your menu. Give you section a brief description</i>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                    </vbox>
            </vbox>
            <vbox class="menubar" >
                    <vbox>
                        <h3>PIG</h3>
                    </vbox>
                    <vbox>
                        <i class="menufont">This is a secion of your menu. Give you section a brief description</i>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                    </vbox>
            </vbox>
             <vbox class="menubar" >
                    <vbox>
                        <h3>RICE</h3>
                    </vbox>
                    <vbox>
                        <i class="menufont">This is a secion of your menu. Give you section a brief description</i>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                        <p>Center-Cut Filet Mignon</p>
                        <span class="menuspan">This is an item on your menu. Give your item a brief description . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    $9</span>
                    </vbox>
            </vbox>
        </vbox>
        
	     <vbox id="blog" style="height: 100vh;">
	            
	     </vbox>
    	 <hbox id="contact" style="height: 100vh;background-color:#282C35;justify-content: center;padding-top: 50px;">
	        <vbox >
	        <hbox>
	            <vbox>
	                <img style="width: 300px;height: 330px;" src="webapp/assets/img/backgrounds/img2.jpg"  >
	                <img style="width: 300px;height: 330px;" src="webapp/assets/img/backgrounds/img3.jpg"  >
	            </vbox>
	            <vbox >
	                <img style="width: 300px;height: 330px;" src="webapp/assets/img/backgrounds/img4.jpg"  >
	                <img style="width: 300px;height:330px;" src="webapp/assets/img/backgrounds/img1.jpg"  >
	            </vbox>
	            </hbox>
	        </vbox> 
		            <vbox id="content" >
		                 <h1>Contact</h1>
		            <form action=" " method="post" autocomplete="on">
		                    <p>
		                        <label for="username" class="icon-user"> Name
		                            <span class="required">*</span>
		                        </label>
		                        <input type="text" name="username" id="username" required="required" placeholder="Your Name" />
		                    </p>
		
		                    <p>
		                        <label for="usermail" class="icon-envelope"> E-mail address
		                            <span class="required">*</span>
		                        </label>
		                        <input type="email" name="usermail" id="usermail" placeholder="I promise I hate spam too!" required="required" />
		                    </p>
		
		                    <p>
		                        <label for="usersite" class="icon-link"> Website</label>
		                        <input type="url" name="usersite" id="usersite" placeholder="eg: http://www.example.com" />
		                    </p>
		
		                    <p>
		                        <label for="subject" class="icon-bullhorn"> Subject</label>
		                        <input type="text" name="subject" id="subject" placeholder="What would you like to talk about?" />
		                    </p>
		
		                    <p>
		                        <label for="message" class="icon-comment"> Message
		                            <span class="required">*</span>
		                        </label>
		                        <textarea placeholder="Your message here and I'll answer as soon as possible " required="required"></textarea>
		                    </p>
		                    <p class="indication">Fields with
		                        <span class="required"> * </span>are required</p>
		
		                    <input type="submit" value=" Send this mail ! " />
		
		                </form>
		            </vbox>
	    	</hbox>
    
    	 <hbox id="footer" style="height: 100vh;text-align: center; background-color: black;">
	        <vbox flex="1" class="footer-ft">
	            <span class="footer-sp">GET THE LASTED</span>
	            <b class="footer-b">Follow us on Twitter</b>
	            <img class="footer-img" src="webapp/assets/img/backgrounds/witter.png">
	        </vbox>
	        <vbox flex="1" class="footer-ft">
	            <span class="footer-sp">LIKE IT</span>
	            <b class="footer-b">We're on Facebook</b>
	            <img class="footer-img" src="webapp/assets/img/backgrounds/facebook.png">
	        </vbox>
	        <vbox flex="1" class="footer-ft">
	            <span class="footer-sp">SEND MAIL</span>
	            <b class="footer-b">Say hello here</b>
	            <img class="footer-img" src="webapp/assets/img/backgrounds/mail.png">
	        </vbox>
	        <vbox flex="1" class="footer-ft">
	            <span class="footer-sp">CALL ABOUT US</span>
	            <b class="footer-b">0909911665</b>
	            <img class="footer-img" src="webapp/assets/img/backgrounds/phone1.png">
	        </vbox>
	    </hbox>
	</vbox>
    <script language="javascript" type="text/javascript">
        this.img = document.querySelector('#image');
        this.img.addEventListener('click',function(){
        })
    </script>
</body>
</html>
