'use strict';

app.directive('chServicePanel', ['servicesService', '$timeout', function (servicesService, $timeout) {

	function link(scope, element, attr) {
	}

	function controller($scope, servicesService) {

		$scope.$watch('selectedService', function(service) {
			console.log($scope.selectedService);
		})

		function selectService(service) {
			$scope.selectedService = service;
			console.log($scope.selectedService);
		}

		function toggleServicePanel() {
			$scope.selectedService = !$scope.selectedService;
			console.log($scope.selectedService);
		}
	}

	return {
		restrict: 'E',
		scope: {
			selectedService: '=selectedService'
		},
		templateUrl: 'views/services/show.html',
		link: link,
		controller: controller
	};

}]);