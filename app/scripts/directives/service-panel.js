'use strict';

app.directive('chServicePanel', ['servicesService', '$timeout', function (servicesService, $timeout) {

	function link(scope, element, attr) {
	}

	function controller($scope, servicesService) {
		$scope.$watch('selectedService', function(service) {
			console.log('Service Panel Controller says: ' + $scope.selectedService.name);
			// $scope.$apply(function() {
				$scope.servicePanelOpen = true;
			// });
		})
	}

	return {
		restrict: 'E',
		scope: {
			servicePanelOpen: '=',
			selectedService: '='
		},
		templateUrl: 'views/services/show.html',
		link: link,
		controller: controller
	};

}]);