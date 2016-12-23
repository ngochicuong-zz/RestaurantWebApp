window.addEventListener("load", function(){
	 var content = document.getElementById("content");
	 var navbar = document.getElementById("navbar");
		navbar.addEventListener("click", function(event){
			var target = event.target;
			console.log(event, navbar.navItem);
			var patent = target.getAttribute("patent");
			document.getElementById("content").innerHTMl = "";
			
			var callback = function(htmlText) {
				content.innerHTML = htmlText;
				var tablePage = new TablePage();
			}
			serverReport.getHTML(patent, "GET", callback);
		}, false);
 } );