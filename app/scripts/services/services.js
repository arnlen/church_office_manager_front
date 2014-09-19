'use strict';

app.factory('servicesService', ['$resource', 'API_BASE_URL', '$rootScope', '$q', function ($resource, API_BASE_URL, $rootScope, $q) {

	// Init attributes
	var loadedService = null,
			services = null;

	var resource = $resource(API_BASE_URL + 'services/:id',
		{
			id: '@id'
		},
		{
			update: { method: "PUT" },
			getOfficeServices: { method: 'GET', params: { officeId: "@officeId"}, isArray: true }
		}
	);

	var loadService = function(service) {
		var deferred = $q.defer();
		resource.get({ id: service.id }).$promise.then(function(result) {
			deferred.resolve(result);
		});
		return deferred.promise;
	};

	var loadAllServices = function(office) {
		var deferred = $q.defer();
		// if (office) {
			resource.getOfficeServices({ officeId: office.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
		// }
		return deferred.promise;
	};

	var Service = {
		services: services, // null on init
		loadedService: loadedService, // null on init
		load: loadService, // promise
		loadAll: loadAllServices // promise
	};

	return Service;

}]);