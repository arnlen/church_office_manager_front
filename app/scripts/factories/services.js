'use strict';

app.factory('servicesFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	var Service = $resource(API_BASE_URL + 'services/:id',
	{
		id: '@id'
	},
	{
		update: { method: "PUT" },
		getOfficeServices: { method: 'GET', params: { officeId: "@officeId"}, isArray: true }
	});

	return Service;

}]);