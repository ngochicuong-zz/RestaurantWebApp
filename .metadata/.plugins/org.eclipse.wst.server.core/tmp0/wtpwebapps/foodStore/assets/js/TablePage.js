function TablePage () {
	 var searchButton = document.getElementsByClassName("searchButton");
	 var thiz = this;
	 searchButton[0].addEventListener("click", function(ev){
		 	var f = document.getElementsByClassName("floor")[0];
		 	var r = document.getElementsByClassName("room")[0];
		 	var c = document.getElementsByClassName("capacity")[0];
		 	var o = document.getElementsByClassName("onDesk")[0];
		 	
		 	var floor = f.options[f.selectedIndex].value;
		 	var room = r.options[r.selectedIndex].value;
		 	var capacity = c.options[c.selectedIndex].value;
		 	var onDesk = o.options[o.selectedIndex].value;
		 	
		 	console.log("Search button click.... ");
		 	var tablePanel = document.getElementsByClassName("tablePanel");
		 	var callback = function(json) {
		 		thiz.render(json);
		 	}
		 	serverReport.getJson("/getTables.do?floor="+ floor +"&room="+ room +"&capacity="+ capacity +"&onDesk="+ onDesk +"", "GET", callback);
		 }, false);
}

TablePage.prototype.render = function(spec) {
	console.log("render");
	var tableBody = document.getElementsByClassName("tBodyNode")[0];
	tableBody.innerHTML = "";
	for(var i = 0; i < spec.length; i++) {
		 var trNode = Dom.newDOMElement({
			 _name: "tr",
			 class: "tableItem"
		 });
		 for(var index in spec[i]) {
			 var h = spec[i];
			 var tdNode = Dom.newDOMElement({
				 _name: "td",
				 _text: h[index]
			 });
			 trNode.appendChild(tdNode);
		 }
		 tableBody.appendChild(trNode);
	 }
}
 



