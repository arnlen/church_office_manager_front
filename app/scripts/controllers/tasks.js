(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['$scope', 'tasksService'];

	function TasksController ($scope, Task) {

		/*jshint validthis: true */
		var vm = this;

		vm.update = update;

		function update(task) {
			Task.update($scope, task);
		}

	}

})();