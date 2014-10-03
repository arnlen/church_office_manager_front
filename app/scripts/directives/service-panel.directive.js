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
			scope.$on('OfficesController > service.clicked', function() {
				console.log('[ServicePanelDirective][Event catched] "OfficesController > service.clicked"');

				vm.Service.find(vm.Service.clicked).then(function(service) {
					vm.Service.loaded = service;
					vm.Service.openPanel();
				});
			});

			scope.$on('OfficesController > member.panelOpen', function() {
				console.log('[ServicePanelDirective][Event catched] "OfficesController > member.panelOpen"');
				vm.Service.panelPushed = true;
			});

			scope.$on('OfficesController > member.panelClosed', function() {
				console.log('[ServicePanelDirective][Event catched] "OfficesController > member.panelClosed"');
				vm.Service.panelPushed = false;
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				console.log('[ServicePanelDirective][Event catched] "OfficesController > closeAllPanels"');
				vm.Service.closePanel();
			});
		}

		function controller($scope) {
			var vm = this;

			vm.Service = Service;
			vm.Service.openPanel = openPanel;
			vm.Service.closePanel = closePanel;
			vm.Service.toggleEditMode = toggleEditMode;
			vm.Service.selectMember = selectMember;
			vm.Service.panelPushed = false;

			vm.Member = Member;

			function openPanel() {
				vm.Service.panelOpen = true;
				$scope.$emit('service-panel.directive > service.panelOpen');
			}

			function closePanel() {
				vm.Service.panelOpen = false;
				vm.Service.panelPushed = false;
				$scope.$emit('service-panel.directive > service.panelClosed');
			}

			function toggleEditMode() {
				vm.Service.editMode = !vm.Service.editMode
			}

			function selectMember(memberId) {
				vm.Member.clicked = memberId;
				$scope.$emit('service-panel.directive > member.clicked');
			}
		}
	}

})();