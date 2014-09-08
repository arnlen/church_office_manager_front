'use strict';

app.factory('tasksFactory', ['$resource', function($resource) {

	var Task = $resource('http://localhost:3000/tasks/:id',
	{
		id: "@id"
	},
	{
		update: { method: 'PUT', params: { task: "@task" }}
	});

	return Task;

}]);