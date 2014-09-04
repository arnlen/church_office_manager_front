'use strict';

app.controller('OfficesController', function ($scope, officeFactory) {

	officeFactory.get().$promise.then(function(result) {
		$scope.office = result.offices[0];
		$scope.selectedService = $scope.office.services[0];
	});

	$scope.loadClickedService = function(clicked_service) {
		$scope.selectedService = clicked_service;
	}

});