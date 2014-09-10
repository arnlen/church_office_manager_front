'use strict';

app.controller('ServicesController', function ($scope, servicesFactory) {

	$scope.loadService = function() {
		if (!$scope.selectedService) { return; }

		servicesFactory.get({ id: $scope.selectedService.id }).$promise.then(function(result) {
			$scope.loadedService = result;
			$scope.servicePanelOpen = true;
		});
	};

	$scope.unloadService = function() {
		$scope.loadedService = false;
		$scope.selectService(false);
	};

	// Watch the variabel "selectedService" to load the service when clicked
	$scope.$watch('selectedService', function(newValue, oldValue) {
		$scope.loadService();
	});

	// $scope.toggleCompletedTask = function(task, selectedService) {
	// 	task.completed = !task.completed
	// 	tasksFactory.update(task).$promise.then(function(result) {
	// 		$scope.task = result.task;
	// 		$scope.reloadOffice();
	// 		// $scope.reloadService(selectedService);
	// 	});
	// };

	// $scope.reloadService = function(selectedService) {
	// 	servicesFactory.get({ id: selectedService.id }).$promise.then(function(result) {
	// 		// TODO: only reload one service
	// 	});
	// };

	// ------------------------------------------------------
	// MEMBER PANEL

	// $scope.openMemberPanel = function(member_id) {
	// 	membersFactory.get({ id: member_id }).$promise.then(function(result) {
	// 		$scope.member = result;
	// 		$scope.memberPanelOpen = true;
	// 	});
	// };

	// $scope.closeAllPanels = function() {
	// 	$scope.memberPanelOpen = false;
	// 	$scope.servicePanelOpen = false;
	// };

	// $scope.toggleMemberList = function() {
	// 	if (!$scope.members) {
	// 		membersFactory.query().$promise.then(function(result) {
	// 			$scope.members = result;
	// 			$scope.memberListOpen = !$scope.memberListOpen;
	// 		});
	// 	} else {
	// 		$scope.memberListOpen = !$scope.memberListOpen;
	// 	}
	// };

	// $scope.updateMemberInCharge = function(service_id, member_id) {
	// 	servicesFactory.update({ id: service_id, member_id: member_id }).$promise.then(function(result) {
	// 		// TODO:
	// 		$scope.toggleMemberList();
	// 	});
	// };


});