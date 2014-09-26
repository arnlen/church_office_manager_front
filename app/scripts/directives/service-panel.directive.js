(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['servicesService'];

	function chServicePanel (Service) {

		var directive = {
			restrict: 'E',
			scope: {
				panelOpen: '=',
				loadedService: '=',
				bodyScrollable: '='
			},
			templateUrl: 'scripts/directives/service-panel.directive.html',
			controller: controller,
			controllerAs: 'vm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function controller ($scope) {
			var vm = this;

			vm.panelOpen = false;
			vm.editMode = false;
			vm.openPanel = openPanel;
			vm.closePanel = closePanel;
			vm.toggleEditMode = toggleEditMode;
			vm.updateScope = updateScope;

			$scope.$watch('panelOpen', function() {
				if ($scope.panelOpen) {
					vm.openPanel();
				} else {
					vm.closePanel();
				}
			});

			function openPanel () {
				vm.panelOpen = true;
				vm.bodyScrollable = false;
				vm.updateScope(); // update scope with new controller variables status
			}

			function closePanel () {
				vm.panelOpen = false;
				vm.bodyScrollable = true;
				vm.updateScope();  // update scope with new controller variables status
			}

			function toggleEditMode () {
				vm.editMode = !vm.editMode
			}

			function updateScope () {
				$scope.panelOpen = vm.panelOpen;
				$scope.bodyScrollable = vm.bodyScrollable;
			}
		}

	}

})();