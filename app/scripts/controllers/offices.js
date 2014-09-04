'use strict';

app.controller('OfficesController', function ($scope, officeFactory) {

	officeFactory.get().$promise.then(function(result) {
		$scope.office = result.offices[0];
	});

});