(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('officesService', officesService);

	officesService.$inject = ['$resource', 'API_BASE_URL', '$rootScope', '$q'];

	function officesService ($resource, API_BASE_URL, $rootScope, $q) {

		var loaded = undefined,
				members = undefined,
				services = undefined,
				resource = $resource(API_BASE_URL + 'offices/:id', { id: '@id' });

		var Office = {
			loaded: loaded, // undefined on init
			members: members, // undefined on init
			services: services, // undefined on init
			find: find // promise
		};

		return Office;

		// ---------------- Functions ---------------- //

		function find (id) {
			var deferred = $q.defer();
			if (id) {
				var date = (loaded && loaded.date) || null;
				resource.get({ id: id, date: date }).$promise.then(function(result) {
					deferred.resolve(result);
				});
			}
			return deferred.promise;
		}
	}

})();