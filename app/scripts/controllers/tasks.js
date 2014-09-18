'use strict';

app.controller('TasksController', function ($scope, tasksService) {

	$scope.update = function(task) {
		tasksService.update($scope, task);
	};

});