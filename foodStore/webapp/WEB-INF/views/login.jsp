 <%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap Login &amp; Register Templates</title>

        <!-- CSS -->
        <link rel="stylesheet" href="webapp/assets/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="webapp/assets/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="webapp/assets/css/form-elements.css">
        <link rel="stylesheet" href="webapp/assets/css/style.css">
		<script src="webapp/assets/js/ServerSide.js"></script>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <!-- Favicon and touch icons -->
        <link rel="shortcut icon" href="webapp/assets/ico/favicon.png">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="webapp/assets/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="webapp/assets/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="webapp/assets/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="webapp/assets/ico/apple-touch-icon-57-precomposed.png">
		<style>
			.login-page {
			  width: 360px;
			  padding: 8% 0 0;
			  margin: auto;
			}
			.form {
			  position: absolute;
			  z-index: 1;
			  background: #f5f5f5;
			  max-width: 360px;
			  margin: 0 auto 100px;
			  padding: 45px;
			  text-align: center;
			  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
			}
			.form input {
			  font-family: liberties;
			  outline: 0;
			  background-color: #f2f2f2;
			  width: 100%;
			  border: solid 1px #fff;
			  margin: 0 0 15px;
			  padding: 15px;
			  box-sizing: border-box;
			  font-size: 14px;
			}
			.form button {
			  font-family: liberties;
			  text-transform: uppercase;
			  font-weight: 700;
			  outline: 0;
			  background: #ff7500;
			  width: 100%;
			  border: 0;
			  padding: 15px;
			  color: #FFFFFF;
			  font-size: 14px;
			  -webkit-transition: all 0.3 ease;
			  transition: all 0.3 ease;
			  cursor: pointer;
			}
			.form button:hover,.form button:active,.form button:focus {
			  background: #faaa1a;
			}
			.form .message {
			  margin: 15px 0 0;
			  color: #b3b3b3;
			  font-size: 12px;
			}
			.form .message a {
			  color: #4CAF50;
			  text-decoration: none;
			}
			.form .register-form {
			  display: none;
			}
			.container {
			  position: relative;
			  z-index: 1;
			  max-width: 300px;
			  margin: 0 auto;
			}
			.container:before, .container:after {
			  content: "";
			  display: block;
			  clear: both;
			}
			.container .info {
			  margin: 50px auto;
			  text-align: center;
			}
			.container .info h1 {
			  margin: 0 0 15px;
			  padding: 0;
			  font-size: 36px;
			  font-weight: 300;
			  color: #1a1a1a;
			}
			.container .info span {
			  color: #4d4d4d;
			  font-size: 12px;
			}
			.container .info span a {
			  color: #000000;
			  text-decoration: none;
			}
			.container .info span .fa {
			  color: #EF3B3A;
			}
			body {
			  background-color: #4B4B4B;
			  font-family: liberties;
			  -webkit-font-smoothing: antialiased;
			  -moz-osx-font-smoothing: grayscale;      
			}
		</style>
    </head>
    <body>
    	<div class="login-page">
		  <div class="form">
		    <form class="login-form">
		      <input id="user" type="text" placeholder="username"/>
		      <input id="pwd" type="password" placeholder="password"/>
		      <button id="login-button">Đăng nhập</button>
		      <span id="message" style="color: red; font-size: 0.8em"></span>
		    </form>
		  </div>
		</div>
		<script>
			function sendLogin() {
				var loginButton = document.querySelector("#login-button");
				loginButton.addEventListener("click", function(e) {
					e.preventDefault();
					var user = document.querySelector("#user").value;
					var pass = document.querySelector("#pwd").value;
					var messageBox = document.querySelector("#message");
					var callback = function(string) {
						console.log(string);
						if (string != "") {
							window.location.href = "/main.do?user="+string+"";
						} else {
							messageBox.innerHTML = "Tài khoản hoặc mật khẩu không đúng!";
						}
					}
					serverReport.getHTML("/signIn.do", "POST",
							callback, {
								"user" : user,
								"pass" : pass 
					});
				});
			}
			sendLogin();
			
		</script>
    </body>

</html>