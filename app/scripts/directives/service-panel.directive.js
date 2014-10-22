(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['$q', 'servicesService', 'membersService', 'logsService', 'officesService', 'tasksService'];

	function chServicePanel ($q, Service, Member, Log, Office, Task) {

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
				vm.Service.loadService();
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
			vm.Service.loadService = loadService;
			vm.Service.reloadService = loadService;
			vm.Service.openPanel = openPanel;
			vm.Service.closePanel = closePanel;
			vm.Service.toggleEditMode = toggleEditMode;
			vm.Service.selectMember = selectMember;
			vm.Service.panelPushed = false;
			vm.Service.editMode = false;
			vm.Service.toggleMembership = toggleMembership;
			vm.Service.setLeader = setLeader;

			vm.Member = Member;
			vm.Office = Office;

			vm.Task = Task;
			vm.Task.toggleCompletion = toggleTaskCompletion;


			// ----- Resource management ----- //

			function loadService() {
				vm.Service.find(vm.Service.clicked).then(function(service) {
					vm.Service.loaded = service;
					Log('ServicePanelDirective', 'Info', 'Service loaded');
					vm.Service.openPanel();

					vm.Task.all(vm.Service.loaded).then(function(tasks) {
						vm.Service.loaded.tasks = tasks;
						Log('ServicePanelDirective', 'Info', 'Service tasks loaded');
					});
				});
			}

			function toggleMembership(member) {
				if (vm.Member.isMemberOfThisService(member, vm.Service.loaded)) {
					vm.Member.leaveService(member, vm.Service.loaded).then(function(members) {
						vm.Office.members = members[0];
						vm.Service.loaded.members = members[1];
						Log('ServicePanelDirective', 'Info', member.name + ' just left service ' + vm.Service.loaded.name);
					});
				} else {
					vm.Member.joinService(member, vm.Service.loaded).then(function(members) {
						vm.Office.members = members[0];
						vm.Service.loaded.members = members[1];
						Log('ServicePanelDirective', 'Info', member.name + ' just joined service ' + vm.Service.loaded.name);
					});
				}
			}

			function setLeader(member) {
				vm.Service.loaded.leader_id = member.id;
				vm.Service.loaded.leader_name = member.name;

				vm.Service.loaded.$update({ leader_id: member.id, leader_name: member.name }).then(function() {
					Log('ServicePanelDirective', 'Info', member.name + ' is now leader of service ' + vm.Service.loaded.name);
				});
			}

			function toggleTaskCompletion(task) {
				var found = false;

				task.$update().then(function() {

					// Manually update the service in the global Office list of services
					angular.forEach(vm.Office.services, function(service) {
						if (!found && service.id === task.service_id) {
							found = true;
							service.$get();
							Log('ServicePanelDirective', 'Info', 'Task updated and Office service concerned updated');
						}
					});

				});
			}


			// ----- UI / UX ----- //

			function openPanel() {
				vm.Service.panelOpen = true;
				$scope.$emit('service-panel.directive > service.panelOpen');
			}

			function closePanel() {
				vm.Service.panelOpen = false;
				vm.Service.panelPushed = false;
				vm.Service.editMode = false;
				$scope.$emit('service-panel.directive > service.panelClosed');
			}

			function toggleEditMode() {
				vm.Service.editMode = !vm.Service.editMode;
				if (vm.Service.editMode) {
					$scope.$emit('service-panel.directive > service.editMode');
				}
			}

			function selectMember(memberId) {
				vm.Member.clicked = memberId;
				$scope.$emit('service-panel.directive > member.clicked');
			}

		}
	}

})();