(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['servicesService'];

	function chServicePanel (Service) {

		function controller ($scope) {
			var vm = this;

			vm.openPanel = openPanel;
			vm.closePanel = closePanel;
			vm.toggleEditMode = toggleEditMode;
			vm.editMode = false;

			function openPanel () {
				$scope.panelOpen = true;
			}

			function closePanel () {
				$scope.panelOpen = false;
			}

			function toggleEditMode () {
				vm.editMode = !vm.editMode
			}
		}

		return {
			restrict: 'E',
			scope: {
				panelOpen: '=',
				loadedService: '='
			},
			templateUrl: 'scripts/directives/service-panel.directive.html',
			controller: controller,
			controllerAs: 'vm'
		};

	}

})();