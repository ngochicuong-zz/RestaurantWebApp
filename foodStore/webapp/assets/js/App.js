function App() {
	App.module = angular.module("app", ["ngRoute"]);
	new ServiceManager();
	var thiz = this;
//	App.module.controller("index-ctrl", function($scope, $timeout) {
//		var indexMain = new IndexMain();
//		$scope.init = indexMain.init;
//		$scope.init($scope, $timeout);
//	});
	App.module.controller("main-ctrl", function($scope ,$http, $timeout, serviceManager, $compile) {
		$scope.serviceManager = serviceManager;
		$scope.init = function() {
			$scope.serviceManager.registerService(new ServerService($http));
			var mainContainer = document.querySelector("#main-container");
			var thiz = this;
			var callback = function(htmlText) {
				mainContainer.innerHTML = htmlText;
				var templateElement = angular.element('htmlText');
				var clonedElement = $compile(templateElement)($scope, function() {
					var indexMain = new IndexMain();
				});
//				$compile(mainContainer);
				BusyHandler.unLoadding();
			}
			$scope.serviceManager.get("server-service").getHTML("/getIndexPage.do", "GET", callback);
		};
		$scope.init();
	});

}

document.onreadystatechange = function(e)
{
	BusyHandler.loadding();
    if (document.readyState === 'complete')
    {
    	var app = new App();
    }
};
