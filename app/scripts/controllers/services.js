'use strict';

app.controller('ServicesController', function ($scope, servicesFactory, membersFactory) {


	// ------------------------------------------------------
	// Service loading

	var loadService = function() {
		servicesFactory.get({ id: $scope.selectedService.id }).$promise.then(function(result) {
			$scope.loadedService = result;
			$scope.servicePanelOpen = true;
			$scope.selectService(false);
		});
	};

	$scope.unloadService = function() {
		$scope.loadedService = false;
		console.log("Service unloaded.");
	};

	// Watch the variabel "selectedService" to load the service when clicked
	$scope.$watch('selectedService', function(newService, oldService) {
		if (!$scope.selectedService) { return; }

		$scope.openServicePanel();
	});


	// ------------------------------------------------------
	// Panels management

	$scope.openServicePanel = function() {
		loadService();
		$scope.bodyNotScrollable();
	};

	$scope.closeServicePanel = function() {
		$scope.servicePanelOpen = false;

		// Ensure member list is closed
		$scope.memberListOpen = false;
		$scope.memberToConfirm = false;

		console.log('Closing panel...');
		$scope.bodyScrollable();
	};

	$scope.openMemberPanel = function() {
		$scope.memberPanelOpen = true;
	};

	$scope.closeMemberPanel = function() {
		$scope.memberPanelOpen = false;
	};

	$scope.closeAllPanels = function() {
		$scope.closeServicePanel();
		$scope.closeMemberPanel();
	};


	// ------------------------------------------------------
	// Assign a member section

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

	$scope.confirmMemberInCharge = function(member) {
		$scope.memberToConfirm = member;
	};

	$scope.updateMemberInCharge = function(member) {
		$scope.loadedService.member_in_charge_id = member.id;
		$scope.loadedService.$update();
		$scope.memberListOpen = false;
		$scope.memberToConfirm = false;
	};

});