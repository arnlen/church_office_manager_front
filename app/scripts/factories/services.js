'use strict';

app.factory('servicesFactory', ['$resource', function($resource) {

	var Service = $resource('http://localhost:3000/services/:id',
	{
		id: '@id'
	},
	{
		update: { method: "PUT", params: { member_id: "@member_id" }}
	});

	return Service;

}]);