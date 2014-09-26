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
				Service.find(scope.service).then(function(service) {
					Service.loadedService = service;
					$rootScope.$broadcast('loadedService.updated');
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
			// controllerAs: '',
			// controller: OfficeController,
			link: link
		};

	}

})();