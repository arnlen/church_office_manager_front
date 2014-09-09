'use strict';

app.controller('OfficesController', function ($scope, officesFactory, tasksFactory, servicesFactory, membersFactory) {

	$scope.reloadOffice = function() {
		officesFactory.get().$promise.then(function(result) {
			$scope.office = result.offices[0];
		});
	};

	$scope.reloadOffice();


	// ------------------------------------------------------
	// SERVICE PANEL

	$scope.openServicePanel = function(clicked_service) {
		$scope.selectedService = clicked_service;
		$scope.servicePanelOpenned = true;
	};

	$scope.closeServicePanel = function(clicked_service) {
		$scope.servicePanelOpenned = false;
	};

	$scope.toggleCompletedTask = function(task, selectedService) {
		task.completed = !task.completed
		tasksFactory.update(task).$promise.then(function(result) {
			$scope.task = result.task;
			$scope.reloadOffice();
			// $scope.reloadService(selectedService);
		});
	};

	$scope.reloadService = function(selectedService) {
		servicesFactory.get({ id: selectedService.id }).$promise.then(function(result) {
			// TODO: only reload one service
		});
	};


	// ------------------------------------------------------
	// MEMBER PANEL

	$scope.openMemberPanel = function(member) {
		// membersFactory.get({ id: member.id }).$promise.then(function(result) {
			// TODO : load into the member panel
			$scope.memberPanelOpenned = true;
		// });
	};

	$scope.closeMemberPanel = function(member) {
		$scope.memberPanelOpenned = false;
	};

	$scope.closeAllPanels = function() {
		$scope.memberPanelOpenned = false;
		$scope.servicePanelOpenned = false;
	};

});