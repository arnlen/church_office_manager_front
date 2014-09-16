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

	$scope.closeAllPanels = function() {
		$scope.broadcastCloseMemberPanel = true;
		$scope.closeServicePanel();
	};

	// Broadcast ack from the MemberPanel
	$scope.broadcastCloseMemberPanelAck = function() {
		$scope.broadcastCloseMemberPanel = false;
	}

});