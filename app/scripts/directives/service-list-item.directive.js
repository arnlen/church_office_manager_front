(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServiceListItem', chServiceListItem);

	chServiceListItem.$inject = ['$rootScope', 'servicesService'];

	function chServiceListItem ($rootScope, Service) {

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
			templateUrl: 'scripts/directives/service-list-item.directive.html',
			link: link
		};

	}

})();