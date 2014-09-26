(function() {
	'use strict';

	angular
			.module('churchOfficeManager')
			.controller('GlobalController', GlobalController);

	GlobalController.$inject = ['$scope', 'notify'];

	function GlobalController ($scope, notify) {

		// Configure notify
		notify.config({
			duration: 3000,
			templateUrl: 'views/shared/notify-template.html'
		});

		$scope.bodyScrollable = function() {
			$scope.bodyNoScroll = false;
		};

		$scope.bodyNotScrollable = function() {
			$scope.bodyNoScroll = true;
		};

	}

})();