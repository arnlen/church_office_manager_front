'use strict';

app.controller('TasksController', function ($scope, tasksFactory) {

	$scope.loadTasks = function(serviceId) {
		tasksFactory.getServiceTasks({ serviceId: serviceId }).$promise.then(function(result) {
			$scope.tasks = result;
		});
	};

	$scope.$watch('selectedService', function() {
		if (!$scope.selectedService) { return; }

		$scope.loadTasks($scope.selectedService.id);
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