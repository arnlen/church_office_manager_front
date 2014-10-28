(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('officesService', officesService);

	officesService.$inject = ['$resource', 'ENV', '$rootScope', '$q'];

	function officesService ($resource, ENV, $rootScope, $q) {

		console.log(ENV.name);
		console.log(ENV.apiBaseURL);

		var loaded = undefined,
				members = undefined,
				services = undefined,
				resource = $resource(ENV.apiBaseURL + 'offices/:id', { id: '@id' });

		var Office = {
			loaded: loaded, // undefined on init
			members: members, // undefined on init
			services: services, // undefined on init
			find: find // promise
		};

		return Office;

		// ---------------- Functions ---------------- //

		// id might equals:
		// => 'next', 'previous'
		// => an 'id'
		function find(id) {
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