(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['servicesService'];

	function chServicePanel (Service) {

		function link(scope, element, attr) {
			scope.$watch('selectedService', function(service) {
				console.log('Service Panel Controller says: ' + offices.selectedService.name);
				// $scope.$apply(function() {
					scope.servicePanelOpen = true;
				// });
			})
		}

		function controller($scope) {
		}

		return {
			restrict: 'E',
			scope: {
				servicePanelOpen: '=',
				selectedService: '='
			},
			templateUrl: 'views/services/show.html',
			link: link,
			// controllerAs: '',
			controller: controller
		};

	}

})();