'use strict';

app.controller('OfficesController', function ($scope, officeFactory, tasksFactory) {

	$scope.reloadOffice = function() {
		officeFactory.get().$promise.then(function(result) {
			$scope.office = result.offices[0];
			$scope.selectedService = $scope.office.services[0];
		});
	};

	$scope.reloadOffice();

	$scope.loadClickedService = function(clicked_service) {
		$scope.selectedService = clicked_service;
		$scope.panelOpenned = true;
	};

	$scope.closePanel = function() {
		$scope.panelOpenned = false;
	};

	$scope.toggleCompletedTask = function(task) {
		task.completed = !task.completed
		tasksFactory.update(task).$promise.then(function(result) {
			$scope.task = result.task;
			$scope.reloadOffice();
		});
	};

});