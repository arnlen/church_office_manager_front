'use strict';

app.directive('chServiceListItem', function ($rootScope) {

	function link(scope, element, attr) {
		element.on('mousedown', function(event) {
			$rootScope.$apply(function() {
				scope.selectedService = scope.service;
			});
		});
	}

	function controller($scope) {
		$scope.$watch('selectedService', function(service) {
			console.log($scope.selectedService);
		});
	}

	return {
		restrict: 'A',
		replace: true,
		scope: {
			service: '=',
			selectedService: "="
		},
		templateUrl: 'views/services/service-list-item-template.html',
		link: link,
		controller: controller
	};

	// { completed: service.ready, 'ng-hide': service.ready && !displayAllTasks }
});