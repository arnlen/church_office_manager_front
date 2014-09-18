'use strict';

app.controller('ServicesController', function ($scope, servicesService, membersService, notify) {

	// ------------------------------------------------------
	// Service loading

	$scope.unloadService = function() {
		$scope.loadedService = false;
		console.log("Service unloaded.");
	};

	$scope.$watch('loadedService', function() {
		if (!$scope.loadedService) { return; }

		console.log("loadedService");
		$scope.openServicePanel();
	});


	// ------------------------------------------------------
	// Panels management

	$scope.openServicePanel = function() {
		$scope.servicePanelOpen = true;
		$scope.bodyNotScrollable();
	};

	$scope.closeServicePanel = function() {
		$scope.pullServicePanel();
		$scope.servicePanelOpen = false;

		console.log('Closing panel...');

		$scope.broadcastCloseMemberPanel = true;
		$scope.bodyScrollable();
	};

	$scope.pushServicePanel = function() {
		$scope.pushedOnce = true;
	};

	$scope.pullServicePanel = function() {
		$scope.pushedOnce = false;
	};

	// ------------------------------------------------------
	// View / Edit mode manager

	$scope.toggleEditMode = function() {
		$scope.editMode = !$scope.editMode;
	};

	$scope.editModeToggleMemberList = function() {
		$scope.editModeMemberListOpen = !$scope.editModeMemberListOpen;
	};

	$scope.editModeToggleServiceMembersList = function() {
		$scope.editModeServiceMembersListOpen = !$scope.editModeServiceMembersListOpen;
	};

	$scope.isMemberOfThisService = function(member) {
		return membersService.isMemberOfThisService(member, $scope.loadedService);
	};

	$scope.toggleMembership = function(member) {
		membersService.joinOrLeaveService($scope, member, $scope.loadedService);
	};

});