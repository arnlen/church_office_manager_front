(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['$q', 'servicesService', 'membersService'];

	function chServicePanel ($q, Service, Member) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/service-panel.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {
			scope.$on('OfficesController > service.clicked', function(event) {
				console.log('[ServicePanelDirective][Event catched] "OfficesController > service.clicked"');

				vm.Service.find(vm.Service.clicked).then(function(service) {
					vm.Service.loaded = service;
					vm.Service.openPanel();
				});
			});
		}

		function controller($scope) {
			var vm = this;

			vm.Service = Service;
			vm.Service.openPanel = openPanel;
			vm.Service.closePanel = closePanel;
			vm.Service.toggleEditMode = toggleEditMode;
			vm.Service.selectMember = selectMember;

			vm.Member = Member;

			function openPanel() {
				vm.Service.panelOpen = true;
				$scope.$emit('service-panel.directive > service.panelOpen');
			}

			function closePanel() {
				vm.Service.panelOpen = false;
				$scope.$emit('service-panel.directive > service.panelClosed');
			}

			function toggleEditMode() {
				vm.Service.editMode = !vm.Service.editMode
			}

			function selectMember(member) {
				vm.Member.clicked = member;
				$scope.$emit('service-panel.directive > member.clicked');
			}
		}
	}

})();