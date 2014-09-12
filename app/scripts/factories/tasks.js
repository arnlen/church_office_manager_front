'use strict';

app.factory('tasksFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	var Task = $resource(API_BASE_URL + 'tasks/:id',
	{
		id: '@id'
	},
	{
		update: { method: 'PUT' },
		get_service_tasks: { method: 'GET', params: { serviceId: '@serviceId' }, isArray: true }
	});

	return Task;

}]);