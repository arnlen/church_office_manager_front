'use strict';

app.controller('OfficesController', function ($scope, officesService, servicesService, membersService, tasksService, $timeout, $q, $rootScope) {

	activate();

	// ================= FUNCTIONS ================= //

	function activate() {

		$scope.selected = {
			service: undefined,
			member: undefined
		};

		$scope.loaded = {
			service: undefined,
			member: undefined
		};

		$scope.panel = {
			service: { open: false },
			member: { open: false }
		};

		// ------------------------------------------------
		// Office loading

		officesService.load('next').then(function(result) {
			officesService.office = result;
			$rootScope.$broadcast('office.loaded');

			// ------------------------------------------------
			// Services loading

			servicesService.loadAll(officesService.office).then(function(result) {
				servicesService.services = result;
				$rootScope.$broadcast('services.loaded');
			});
		});

		// ------------------------------------------------
		// Members loading

		membersService.loadAll().then(function(result) {
			membersService.members = result;
			$rootScope.$broadcast('members.loaded');
		});

	} // end function activate()


	function previousOffice() {
		officesService.load($scope, 'previous');
	}

	function nextOffice() {
		officesService.load($scope, 'next');
	}


	// ================= EVENT CATCHERS ================= //

	// Loadings

	$scope.$on('office.loaded', function(event) {
		$scope.office = officesService.office;
		console.log('[Loaded] Office');
	});

	$scope.$on('services.loaded', function(event) {
		$scope.services = servicesService.services;
		console.log('[Loaded] Services');
	});

	$scope.$on('members.loaded', function(event) {
		$scope.members = membersService.members;
		console.log('[Loaded] Members');
	});

	// Updates

	$scope.$on('office.updated', function(event) {
		$scope.office = officesService.office;
		console.log('[Updated] Office');
	});

	$scope.$on('services.updated', function(event) {
		$scope.services = servicesService.services;
		console.log('[Updated] Services');
	});

	$scope.$on('loadedService.updated', function(event) {
		$scope.loadedService = servicesService.loadedService;
		console.log('[Updated] Loaded Service');
	});

	$scope.$on('ask.allPanels.close', function(event) {
		console.log('[Ask] All panels to close');
		$scope.servicePanelOpen = false;
		$scope.memberPanelOpen = false;
		$scope.$apply(); // TODO: find why this doesn't work without this call
	});

});