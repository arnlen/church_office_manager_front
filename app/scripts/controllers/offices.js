'use strict';

app.controller('OfficesController', function ($scope, officesFactory, tasksFactory, servicesFactory, membersFactory) {

	var initializeOffice = function() {
		officesFactory.get().$promise.then(function(result) {
			$scope.office = result.offices[0];
		});
	}

	initializeOffice();


	// ------------------------------------------------------
	// SERVICE SELECTION

	$scope.selectService = function(selectedService) {
		$scope.selectedService = selectedService;
	};

});