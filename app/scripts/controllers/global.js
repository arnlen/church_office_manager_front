(function() {
	'use strict';

	angular
			.module('churchOfficeManager')
			.controller('GlobalController', GlobalController);

	GlobalController.$inject = ['$scope', 'notify'];

	function GlobalController ($scope, notify) {

		var vm = this;

		vm.bodyScrollable = true;

		// Configure notify
		notify.config({
			duration: 3000,
			templateUrl: 'views/shared/notify-template.html'
		});

	}

})();