'use strict';

app.factory('officesFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	var Office = $resource(API_BASE_URL + 'offices/:id',
	{
		id: '@id'
	});

	return Office;

}]);