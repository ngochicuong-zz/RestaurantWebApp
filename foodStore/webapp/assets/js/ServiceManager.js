App.service("serviceManager", function($timeout, $http) {
		this.services = {};
		this.init = function() {
			this.registerService(new ServerService($http));
		}
		this.get = function(serviceName) {
			return this.services[serviceName];
		}
		this.registerService = function(service) {
			this.services[service.name] = service;
		}
		$timeout(this.init());
});