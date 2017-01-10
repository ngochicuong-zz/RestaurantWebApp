function PrintHandle() {
	
}
PrintHandle.Print = function (dataNode) {
	var mainInterface = document.querySelector("#main-interface");
	var printSpace = document.querySelector("#print-space");
	document.body.removeChild(mainInterface);
	printSpace.appendChild(dataNode);
	window.setTimeout(function() {
		window.print();
		printSpace.removeChild(dataNode);
		document.body.appendChild(mainInterface);
	}, 10);
}