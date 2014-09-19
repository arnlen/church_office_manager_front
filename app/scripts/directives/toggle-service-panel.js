'use strict';

app.directive('chToggleServicePanel', function (servicesService, $rootScope) {

	function link(scope, element, attr) {
		element.on('click', function(event) {

			if (!scope.servicePanelOpen) {

				servicesService.load(scope.service).then(function(result) {
					servicesService.loadedService = result;
					$rootScope.$broadcast('loadedService.updated');
					openServicePanel(scope);
				});

			} else {
				closeServicePanel();
			}

		});
	}

	function openServicePanel(scope) {
		$rootScope.servicePanelOpen = true;
		scope.$apply();
		console.log('Service panel open');
		// $scope.bodyNotScrollable();
	}

	function closeServicePanel() {
		// $scope.pullServicePanel();
		$rootScope.servicePanelOpen = false;
		// $scope.bodyScrollable();
	}

	// function pushServicePanel() {
	// 	$scope.pushedOnce = true;
	// }

	// function pullServicePanel() {
	// 	$scope.pushedOnce = false;
	// }

	return {
		restrict: 'A',
		controller: function($scope, $element) {
			// console.log($scope, $element);
		},
		link: link
	};

});