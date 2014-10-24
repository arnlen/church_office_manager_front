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
				vm.Member.loadMember();
			});

			scope.$on('OfficesController > service.panelClosed', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > service.panelClosed');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > service.editMode', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > service.editMode');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > closeAllPanels');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > member.loaded.updated', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > member.loaded.updated');
				vm.Member.reloadMember();
			});
		}

		function controller ($scope) {
			var vm = this;

			vm.Member = Member;
			vm.Member.editMode = false;
			vm.Member.loadMember = loadMember;
			vm.Member.reloadMember = loadMember;
			vm.Member.openPanel = openPanel;
			vm.Member.closePanel = closePanel;
			vm.Member.toggleEditMode = toggleEditMode;
			vm.Member.validEdition = validEdition;


			// ----- Resource management ----- //

			function loadMember() {
				vm.Member.find(vm.Member.clicked).then(function(member) {
					vm.Member.loaded = member;
					Log('ServicePanelDirective', 'Info', 'Service loaded');
					vm.Member.openPanel();
				});
			}

			function validEdition() {
				vm.Member.loaded.$update().then(function() {
					toggleEditMode();
					$scope.$emit('member-panel.directive > member.updated');
					Log('MemberPanelDirective', 'Info', vm.Member.loaded.name + ' saved');
				});
			}


			// ----- UI / UX ----- //

			function openPanel () {
				vm.Member.panelOpen = true;
				$scope.$emit('member-panel.directive > member.panelOpen');
			}

			function closePanel () {
				vm.Member.panelOpen = false;
				vm.Member.editMode = false;
				$scope.$emit('member-panel.directive > member.panelClosed');
			}

			function toggleEditMode () {
				vm.Member.editMode = !vm.Member.editMode
			}
		}
	}

})();