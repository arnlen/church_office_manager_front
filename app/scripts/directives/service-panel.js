'use strict';

app.directive('chServicePanel', ['servicesService', function (servicesService) {

	function link(scope, element, attr) {
	}

	function controller($scope, servicesService) {

		$scope.servicePanelOpen = false;

		$scope.$watch('selectedService', function(service) {
			console.log($scope.selectedService);
		});

		$scope.toggleServicePanel = function() {
			servicePanelOpen = !servicePanelOpen;
			console.log('Hit!');
		};
	}

	return {
		restrict: 'E',
		scope: {
			selectedService: '='
		},
		templateUrl: 'views/services/show.html',
		link: link,
		controller: controller
	};

}]);