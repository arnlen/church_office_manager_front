'use strict';

app.controller('OfficesController', function ($scope, officesFactory, servicesFactory) {

	var initialize = function() {
		// Get office ID + date
		officesFactory.get().$promise.then(function(result) {
			$scope.office = result.offices[0];

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