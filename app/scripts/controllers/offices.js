'use strict';

app.controller('OfficesController', function ($scope, officesFactory, servicesFactory) {

	var initialize = function() {
		// Get office ID + date
		officesFactory.get({ id: 'next' }).$promise.then(function(result) {
			$scope.office = result;

			// Get office's services
			loadServices();
		});
	};

	var loadServices = function(officeId) {
		servicesFactory.get_office_services({ officeId: $scope.office.id }).$promise.then(function(result) {
			$scope.services = result;
		});
	};

	initialize();

	$scope.previousOffice = function() {
		officesFactory.get({ id: 'previous', date: $scope.office.date }).$promise.then(function(result) {
			$scope.office = result;

			// Get office's services
			loadServices();
		});
	};

	$scope.nextOffice = function() {
		officesFactory.get({ id: 'next', date: $scope.office.date }).$promise.then(function(result) {
			$scope.office = result;

			// Get office's services
			loadServices();
		});
	};

	// ------------------------------------------------------
	// Service selection for right panel openning

	$scope.selectService = function(selectedService) {
		$scope.selectedService = selectedService;
	};

	// ------------------------------------------------------
	// Service refresh after task update

	$scope.refreshService = function(serviceToRefresh) {
		var found = false;

		angular.forEach($scope.services, function(service) {

			if (!found && service.id == serviceToRefresh.id) {
				found = true;

				service.task_done = serviceToRefresh.task_done;
				service.ready = serviceToRefresh.ready;
			}

		});
	};

});