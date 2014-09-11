'use strict';

app.controller('ServicesController', function ($scope, servicesFactory, membersFactory) {


	// ------------------------------------------------------
	// Service loading

	var loadService = function(callback) {
		servicesFactory.get({ id: $scope.selectedService.id }).$promise.then(function(result) {
			$scope.loadedService = result;
			callback;
		});
	};

	var unloadService = function() {
		$scope.loadedService = false;
		$scope.selectService(false);
	};

	// Watch the variabel "selectedService" to load the service when clicked
	$scope.$watch('selectedService', function(newService, oldService) {
		if (!$scope.selectedService) { return; }

		$scope.openServicePanel();
	});


	// ------------------------------------------------------
	// Panels management

	$scope.openServicePanel = function() {
		loadService($scope.servicePanelOpen = true);
	};

	$scope.closeServicePanel = function() {
		unloadService();
		$scope.servicePanelOpen = false;
	};

	$scope.closeAllPanels = function() {
		$scope.closeServicePanel();
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