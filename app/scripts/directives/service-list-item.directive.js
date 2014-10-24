(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServiceListItem', chServiceListItem);

	chServiceListItem.$inject = ['$rootScope', 'servicesService'];

	function chServiceListItem ($rootScope, Service) {

		var directive = {
			restrict: 'A',
			scope: {
				service: '='
			},
			templateUrl: 'scripts/directives/service-list-item.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link(scope, element, attr, vm) {

			// On click on a service
			element.on('click', function(event) {
				vm.Service.clicked = scope.service;
				scope.$emit('service-list-item.directive > service.clicked');
			});
		}

		function controller($scope) {
			var vm = this;

			vm.Service = Service; // ServicesService
			vm.service = $scope.service; // Service of the ng-repeat
		}

	}

})();