'use strict';

app.directive('chServiceListItem', [ '$rootScope', 'servicesService', function ($rootScope, Service) {

	function link(scope, element, attr) {

		// On click on a service
		element.on('click', function(event) {
			scope.$apply(function() {
				scope.officeService.clicked = scope.service;
				Service.find(scope.officeService.clicked).then(function(service) {
					Service.loadedService = service;
					$rootScope.$broadcast('service.loaded');
				});
			});
		});
	}

	return {
		restrict: 'A',
		scope: {
			service: '=',
			officeService: '='
		},
		templateUrl: 'views/services/service-list-item-template.html',
		link: link
	};

}]);