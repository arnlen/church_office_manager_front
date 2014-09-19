'use strict';

app.directive('chToggleServicePanel', function (servicesService, $rootScope) {

	function link(scope, element, attr) {
		element.on('click', function(event) {

			if (!scope.servicePanelOpen) {

				servicesService.load(scope.service).then(function(result) {
					servicesService.loadedService = result;
					$rootScope.$broadcast('loadedService.updated');
					$rootScope.$broadcast('ask.servicePanel.open');
				});

			} else {
				$rootScope.$broadcast('ask.servicePanel.close');
			}

		});
	}

	return {
		restrict: 'A',
		controller: function($scope, $element) {
			// console.log($scope, $element);
		},
		link: link
	};

});