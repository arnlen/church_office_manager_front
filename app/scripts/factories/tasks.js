'use strict';

app.factory('tasksFactory', ['$resource', function($resource) {

	var Task = $resource('http://localhost:3000/tasks/:id',
	{
		id: '@id'
	},
	{
		update: { method: 'PUT' },
		get_service_tasks: { method: 'GET', params: { serviceId: '@serviceId' }, isArray: true }
	});

	return Task;

}]);