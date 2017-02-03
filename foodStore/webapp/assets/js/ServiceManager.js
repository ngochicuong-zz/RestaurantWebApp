function ServiceManager() {
	this.services = {};
	var thiz = this;
	App.module.service("serviceManager", function() {
		this.get = function(serviceName) {
			return thiz.services[serviceName];
		}
		this.registerService = function(service) {
			thiz.services[service.name] = service;
		}
	});
}
