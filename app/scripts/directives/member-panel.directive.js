(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberPanel', chMemberPanel);

	chMemberPanel.$inject = ['membersService', 'logsService'];

	function chMemberPanel (Member, Log) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/member-panel.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {
			scope.$on('OfficesController > member.clicked', function(event) {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > member.clicked');

				vm.Member.find(vm.Member.clicked).then(function(member) {
					vm.Member.loaded = member;
					vm.Member.openPanel();
				});
			});

			scope.$on('OfficesController > service.panelClosed', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > service.panelClosed');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > closeAllPanels');
				vm.Member.closePanel();
			});
		}

		function controller ($scope) {
			var vm = this;

			vm.Member = Member;
			vm.Member.openPanel = openPanel;
			vm.Member.closePanel = closePanel;
			vm.Member.toggleEditMode = toggleEditMode;

			function openPanel () {
				vm.Member.panelOpen = true;
				$scope.$emit('member-panel.directive > member.panelOpen');
			}

			function closePanel () {
				vm.Member.panelOpen = false;
				$scope.$emit('member-panel.directive > member.panelClosed');
			}

			function toggleEditMode () {
				vm.Member.editMode = !vm.Member.editMode
			}
		}
	}

})();