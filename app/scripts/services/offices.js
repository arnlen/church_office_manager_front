'use strict';

app.factory('officesService', ['$resource', 'API_BASE_URL', '$rootScope', '$q', function ($resource, API_BASE_URL, $rootScope, $q) {

	// Init attributes
	var office = null;

	var resource = $resource(API_BASE_URL + 'offices/:id',
		{
			id: '@id'
		}
	);

	var loadOffice = function(id) {
		var deferred = $q.defer();
		if (id) {
			var date = (office && office.date) || null;
			resource.get({ id: id, date: date }).$promise.then(function(result) {
				deferred.resolve(result);
			});
		}
		return deferred.promise;
	};

	var Office = {
		office: office, // null on init
		load: loadOffice // promise
	};

	return Office;

}]);