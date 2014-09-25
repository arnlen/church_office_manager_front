'use strict';

app.directive('chServiceListItem', function () {

	function link(scope, element, attr) {
		element.on('click', function(event) {
			scope.$apply(function() {
				scope.selectedService = scope.service;
			});
		});
	}

	return {
		restrict: 'A',
		scope: {
			service: '=',
			selectedService: "="
		},
		templateUrl: 'views/services/service-list-item-template.html',
		link: link
	};

	// { completed: service.ready, 'ng-hide': service.ready && !displayAllTasks }
});