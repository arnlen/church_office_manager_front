'use strict';

app.factory('servicesFactory', ['$resource', function($resource) {

	var Service = $resource('http://localhost:3000/services/:id',
	{
		id: '@id'
	},
	{
		update: { method: "PUT" },
		get_office_services: { method: 'GET', params: { officeId: "@officeId"}, isArray: true }
	});

	return Service;

}]);