'use strict';

app.factory('tasksService', ['$resource', 'API_BASE_URL', '$q', function ($resource, API_BASE_URL, $q) {


	var resource = $resource(API_BASE_URL + 'tasks/:id',
		{
			id: '@id'
		},
		{
			update: { method: 'PUT' },
			getServiceTasks: { method: 'GET', params: { serviceId: '@serviceId' }, isArray: true }
		}
	);

	var loadAllTasks = function(service) {
		var deferred = $q.defer();
		resource.getServiceTasks({ serviceId: service.id }).$promise.then(function(result) {
			deferred.resolve(result);
		});
		return deferred.promise;
	};

	var updateTask = function(task) {
		var found = false,
				loadedService = scope.loadedService;

		task.$update().then(function() {

			// Get updated service
			loadedService.$get().then(function() {

				// Refresh the global list with all services
				angular.forEach(scope.services, function(service) {
					if (!found && service.id === loadedService.id) {
						found = true;
						service.task_done = loadedService.task_done;
						service.ready = loadedService.ready;
					}
				});

			});
		});
	};

	var Task = {
		loadAll: loadAllTasks, // promise
		update: updateTask // promise
	};

	return Task;

}]);