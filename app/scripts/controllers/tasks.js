'use strict';

app.controller('TasksController', function ($scope, tasksFactory) {

	$scope.loadTasks = function(serviceId) {
		tasksFactory.get_service_tasks({ serviceId: serviceId }).$promise.then(function(result) {
			$scope.tasks = result;
		});
	};

	$scope.$watch('loadedService', function() {
		if (!$scope.loadedService) { return; }

		$scope.loadTasks($scope.loadedService.id);
	});

	$scope.updateTask = function(task) {

		// Task update
		task.$update().then(function() {

			// Get updated service
			$scope.loadedService.$get().then(function() {

				// Refresh the global list with all services
				$scope.refreshService($scope.loadedService);
			});
		});
	};

});