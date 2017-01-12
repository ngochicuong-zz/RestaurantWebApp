<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html>
<html>
    <head>
        <link href="webapp/assets/css/Main.css" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link href="webapp/assets/css/my-slider.css" rel="stylesheet" type="text/css"/>
            <link href="webapp/assets/css/index.css" rel="stylesheet" type="text/css"/>
            <script src="webapp/assets/js/common-dom.js"></script>
            <script src="webapp/assets/js/ServerSide.js"></script>
            <script src="webapp/assets/js/index/Index.js"></script>
            <script src="webapp/assets/js/index/Slider.js"></script>
            <script src="webapp/assets/js/detect.min.js"></script>

            <style>
                html {
                    background: url("webapp/assets/img/backgrounds/index-wallpaper.jpg") no-repeat center center fixed;
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
                
                section {
                    flex-direction: column;
                    display: -webkit-box;
                    display: -moz-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                }
                #navbar {
                    height: 37px;
                    line-height: 37px;
                    color: #fa5d00;
                    text-shadow: 0 -1px black;
                    background: #243942;
                    border-bottom: 1px solid #191919;
                    background-image: -webkit-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
                    background-image: -moz-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
                    background-image: -o-linear-gradient(top, #696464, #272727 50%, #1C1C20 50%, #000);
                    background-image: linear-gradient(to bottom, #696464, #272727 50%, #1C1C20 50%, #000);
                }

                #navbar .navbar-items {
                    max-height: 3em;
                    padding-right: 1em;
                }

                #navbar .navbar-items span {
                    font-weight: bold;
                    display: table-cell;
                    vertical-align: middle;
                }
                #navbar .navbar-items label {
                    font-weight: bold;
                    display: table-cell;
                    vertical-align: middle;
                }

                #navbar .active {
                    padding-right: 16px;
                    background-color: #4e4e4e;
                    border-right: 0;
                    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.7);
                    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.7);
                }

                #navbar .navbar-items {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: baseline;
                    border-left: 1px solid #191919;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    min-width: 5em;
                    padding: 0 1em;
                    cursor: pointer;
                }
                #navbar .navbar-items:hover {
                    color: #ffcf00;
                    background: #2f4b56;
                    background: rgba(255, 255, 255, 0.1);
                }
                .intro-button {
                    width: 15em;
                    height: 10em;
                    background: #fa5d00;
                    border: none;
                    border-radius: 0.5ex;
                }
                .intro-button i {
                    font-size: 6em;
                    color: #fff;
                    opacity: 1;
                    text-shadow: 2px 2px 1px #000;
                }
                #navSection span {
                    color: #666;
                }
                span {
                    width: 100%;
                }
                h1:after {
                    font-size: 25px;
                    color: #ff6300;
                    content: '&';
                    text-align: center;
                    display: block;
                    width: 100%;
                    font-family: liberties;
                    text-shadow: 1px 1px 1px rgb(63, 63, 63);
                }

            </style>
        </head>
        <body>
            <div style="width: 900px; margin: auto; margin-top: 1em; box-shadow: 1px 1px 10px #000;">
                <section>
                    <hbox id="navbar">
                        <hbox flex="1" class="navbar-items">
                            <span style="font-size: 1.5em;
				                   font-style: italic;
				                   color: #ffc726;">
                                Nhà Hàng Quê Ta</span>
                        </hbox>
                        <hbox class="navbar-items InputRow" page-name="admin-page" id="login-button">
                            <i class="material-icons orange600 md-16">account_circle</i>
                            <span>Đăng nhập</span>
                        </hbox>
                    </hbox>
                </section>
                
                <section>
				    <vbox id="slideshow">
				        <vbox id="slides">
				        	<div class="slide"><img src="webapp/assets/img/backgrounds/interface.jpg" width="100%" height="100%" /></div>
				        </vbox>
				        <hbox id="slides-controls"><a href="#">1</a></hbox>
				    </vbox>
				</section>

				<section id="navSection" style="background-color: #fff;">
				    <vbox style="text-align: center;">
				        <h3>Nhà hàng Quê ta
				                                               <br>
				                                                   <span style="font-style: italic ;font-size: 16px; font-weight: 400;">
				                                                       Có những tình cảm ngày càng đằm thắm có những hương vị không thể nào quên
				                                                   </span>
				                                               </h3>
				    </vbox>
				    <hbox id="nav-container" class="InputRow" style="justify-content: center; padding: 1em;">
				        <hbox flex="1" style="justify-content: center">
				            <vbox navName="menu" flex="1">
				                <hbox style="justify-content: center">
				                    <button class="intro-button">
				                        <i>restaurant_menu</i>
				                    </button>
				                </hbox>
				                <hbox style="justify-content: center; max-height: 3em;">
				                    <h3>THỰC ĐƠN
				                                                           </h3>
				                </hbox>
				                <hbox>
				                    <span style="text-align: center">Có những tình cảm ngày càng đằm thắm có những hương vị không thể nào quên</span>
				                </hbox>
				            </vbox>
				        </hbox>
				        <hbox flex="1" style="justify-content: center">
				            <vbox navName="aboutus" flex="1">
				                <hbox style="justify-content: center">
				                    <button class="intro-button">
				                        <i>info_outline</i>
				                    </button>
				                </hbox>
				                <hbox style="justify-content: center; max-height: 3em;">
				                    <h3>VỀ CHÚNG TÔI
				                                                           </h3>
				                </hbox>
				                <hbox>
				                    <span style="text-align: center">Có những tình cảm ngày càng đằm thắm có những hương vị không thể nào quên</span>
				                </hbox>
				            </vbox>
				        </hbox>
				        <hbox flex="1" style="justify-content: center">
				            <vbox navName="contact" flex="1">
				                <hbox style="justify-content: center">
				                    <button class="intro-button">
				                        <i>phone</i>
				                    </button>
				                </hbox>
				                <hbox style="justify-content: center; max-height: 3em;">
				                    <h3>LIÊN HỆ - ĐẶT BÀN
				                                                           </h3>
				                </hbox>
				                <hbox>
				                    <span style="text-align: center">Có những tình cảm ngày càng đằm thắm có những hương vị không thể nào quên</span>
				                </hbox>
				            </vbox>
				        </hbox>
				    </hbox>
				</section>
				
				<section id="container-render">
				    <hbox style="text-align: center;">
				        <span>NHẤP VÀO CÁC NÚT TRÊN ĐỂ XEM</span>
				    </hbox>
				</section>
				
				<section>
				    <hbox id="footer" style="text-align: center; background-color: #414141;">
				        <vbox flex="1">
				            <span>Thông tin liên hệ</span>
				            <span>Địa chỉ: 31 Cao Thắng - Phường 2 - Quận 3 - TPHCM</span>
				            <span>Điện thoại:08.38.390.704</span>
				            <span>Hotline:0903 618 795 (Mr Nhã)</span>
				            <span>Email: info@tieccuoifestival.com - yen_festival@yahoo.com</span>
				            <span style="">© Copyright 2012 - nhà hàng Festival . All Rights Reserved</span>
				        </vbox>
				    </hbox>
				</section>
                 </div>
                                </body>
                            </html>                   