(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['$resource', 'ENV', '$rootScope', '$q'];

	function servicesService ($resource, ENV, $rootScope, $q) {

		// Init attributes
		var clicked = undefined,
				loaded = undefined,
				panelOpen = false,
				displayAll = false,
				resource = $resource(ENV.apiBaseURL + 'services/:id', { id: '@id' },
				{
					update: { method: "PUT" },
					getOfficeServices: { method: 'GET', params: { officeId: "@officeId"}, isArray: true }
				});

		var Service = {
			clicked: clicked, // undefined on init
			loaded: loaded, // undefined on init
			panelOpen: panelOpen, // false on init
			displayAll: displayAll, // false on init
			find: find, // promise
			all: all, // promise
		};

		return Service;

		// ---------------- Functions ---------------- //

		function find(service) {
			var deferred = $q.defer();
			resource.get({ id: service.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}

		function all(office) {
			var deferred = $q.defer();
			resource.getOfficeServices({ officeId: office.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}
	}

})();