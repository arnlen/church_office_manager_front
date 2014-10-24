(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberServices', chMemberServices);

	chMemberServices.$inject = ['officesService', 'membersService', '$q', 'logsService'];

	function chMemberServices (Office, Member, $q, Log) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/member-services.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {

		}

		function controller ($scope) {
			var vm = this;

			vm.Office = Office;

			vm.Member = Member;
			vm.Member.toggleMemberService = toggleMemberService;

			function toggleMemberService(service) {

				// Check if we're in edit mode
				if (service && vm.Member.editMode) {

					var isMember = vm.Member.isMemberOfThisService(vm.Member.loaded, service),
							isLeader = vm.Member.isLeaderOfThisService(vm.Member.loaded, service);

					// If member > become leader of the service
					if (isMember && !isLeader) {
						service.$update({ leader_id: vm.Member.loaded.id }).then(function(success) {
							$scope.$emit('member-services.directive > service.loaded.updated');
							Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' is now leader of service ' + service.name);
						});

					// Else if leader > leave service
					} else if (isLeader) {

						// Caution: order is crutial here! First leave the service as member,
						// if not, the server could reaffect the same member as leader,
						// because it takes the first member in the list as the new leader.

						// 1. Leave the service (membership part)
						vm.Member.leaveService(vm.Member.loaded, service).then(function() {

							// 2. Leave the service (leadership part)
							service.leader_id = 0;
							service.$update().then(function() {
								$scope.$emit('member-services.directive > service.loaded.updated');
								$scope.$emit('member-services.directive > member.loaded.updated');
								Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' has left service ' + service.name);
							});
						});

					// Else > join the service as member
					} else {
						vm.Member.joinService(vm.Member.loaded, service).then(function() {
							$scope.$emit('member-services.directive > member.loaded.updated');
							Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' is now member of service ' + service.name);
						});
					}
				}
			}
		}
	}

})();