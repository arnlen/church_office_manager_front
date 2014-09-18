'use strict';

app.controller('OfficesController', function ($scope, officesService, servicesService) {

	var initialize = function() {
		// Get office's ID + date + services
		officesService.load($scope, 'next');
	};

	initialize();

	$scope.previousOffice = function() {
		officesService.load($scope, 'previous');
	};

	$scope.nextOffice = function() {
		officesService.load($scope, 'next');
	};

	// ------------------------------------------------------
	// Service selection for right panel openning

	$scope.selectService = function(selectedService) {
		servicesService.loadOne($scope, selectedService);
	};

});