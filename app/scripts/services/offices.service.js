(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('officesService', officesService);

	officesService.$inject = ['$resource', 'API_BASE_URL', '$rootScope', '$q'];

	function officesService ($resource, API_BASE_URL, $rootScope, $q) {

		var current_office = null,
				resource = $resource(API_BASE_URL + 'offices/:id', { id: '@id' });

		var Office = {
			current_office: current_office, // null on init
			find: find // promise
		};

		return Office;

		// ---------------- Functions ---------------- //

		function find (id) {
			var deferred = $q.defer();
			if (id) {
				var date = (current_office && current_office.date) || null;
				resource.get({ id: id, date: date }).$promise.then(function(result) {
					deferred.resolve(result);
				});
			}
			return deferred.promise;
		}
	}

})();