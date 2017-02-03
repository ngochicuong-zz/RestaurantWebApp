function App() {
	App.modun = angular.module("app", ["ngRoute"]);
	var mainContainer = document.querySelector("#main-container");
	var thiz = this;
	var callback = function(htmlText) {
		mainContainer.innerHTML = htmlText;
		var indexMain = new IndexMain();
		BusyHandler.unLoadding();
	}
	serverReport.getHTML("/getIndexPage.do", "GET", callback);
}

document.onreadystatechange = function(e)
{
	BusyHandler.loadding();
    if (document.readyState === 'complete')
    {
    	var app = new App();
    }
};
