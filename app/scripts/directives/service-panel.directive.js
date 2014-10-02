(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['servicesService', '$q'];

	function chServicePanel (Service, $q) {

		var directive = {
			restrict: 'E',
			scope: {
				service: '='
			},
			templateUrl: 'scripts/directives/service-panel.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {
			scope.$on('ServiceController > service.clicked', function(event) {
				console.log('[ServicePanelDirective][Event] Catched "ServiceController > service.clicked"');

				loadService(vm.Service.clicked).then(function(success) {
					vm.Service.openPanel();
				});
			});

			function loadService (service) {
				var deferred = $q.defer();

				Service.find(service).then(function(service) {
					vm.Service.loaded = service;
					deferred.resolve(vm.Service.loaded);
				});

				return deferred.promise;
			}
		}

		function controller ($scope) {
			var vm = this;

			vm.Service = $scope.service;
			vm.Service.openPanel = openPanel;
			vm.Service.closePanel = closePanel;
			vm.Service.toggleEditMode = toggleEditMode;

			function openPanel () {
				vm.Service.panelOpen = true;
				$scope.$emit('service-panel.directive > service.panelOpen');
			}

			function closePanel () {
				vm.Service.panelOpen = false;
				$scope.$emit('service-panel.directive > service.panelClosed');
			}

			function toggleEditMode () {
				vm.Service.editMode = !vm.Service.editMode
			}
		}

	}

})();