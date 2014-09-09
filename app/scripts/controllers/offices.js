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
		$scope.servicePanelOpen = true;
	};

	$scope.closeServicePanel = function(clicked_service) {
		$scope.servicePanelOpen = false;
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

	$scope.openMemberPanel = function(member_id) {
		membersFactory.get({ id: member_id }).$promise.then(function(result) {
			$scope.member = result;
			$scope.memberPanelOpen = true;
		});
	};

	$scope.closeMemberPanel = function(member) {
		$scope.memberPanelOpen = false;
	};

	$scope.closeAllPanels = function() {
		$scope.memberPanelOpen = false;
		$scope.servicePanelOpen = false;
	};

	$scope.toggleMemberList = function() {
		if (!$scope.members) {
			membersFactory.query().$promise.then(function(result) {
				$scope.members = result;
				$scope.memberListOpen = !$scope.memberListOpen;
			});
		} else {
			$scope.memberListOpen = !$scope.memberListOpen;
		}
	};

	$scope.updateMemberInCharge = function(service_id, member_id) {
		servicesFactory.update({ id: service_id, member_id: member_id }).$promise.then(function(result) {
			// TODO:
			$scope.toggleMemberList();
		});
	};

});