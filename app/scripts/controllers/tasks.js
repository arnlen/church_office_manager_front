(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['$scope', 'tasksService'];

	function TasksController ($scope, Task) {

		$scope.update = function(task) {
			Task.update($scope, task);
		};

	}

})();