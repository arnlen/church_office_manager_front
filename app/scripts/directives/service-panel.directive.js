(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['$q', 'servicesService', 'membersService', 'logsService', 'officesService'];

	function chServicePanel ($q, Service, Member, Log, Office) {

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
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > service.clicked');

				vm.Service.find(vm.Service.clicked).then(function(service) {
					vm.Service.loaded = service;
					Log('ServicePanelDirective', 'Info', 'Service loaded');
					vm.Service.openPanel();

					vm.Member.all(vm.Service.loaded).then(function(members) {
						vm.Service.loaded.members = members;
						Log('ServicePanelDirective', 'Info', 'Service\'s members loaded');
					});
				});
			});

			scope.$on('OfficesController > member.panelOpen', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > member.panelOpen');
				vm.Service.panelPushed = true;
			});

			scope.$on('OfficesController > member.panelClosed', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > member.panelClosed');
				vm.Service.panelPushed = false;
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > closeAllPanels');
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
			vm.Service.editMode = false;

			vm.Member = Member;
			vm.Office = Office;

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