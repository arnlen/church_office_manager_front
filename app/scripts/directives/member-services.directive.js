(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberServices', chMemberServices);

	chMemberServices.$inject = ['officesService', 'membersService'];

	function chMemberServices (Office, Member) {

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

				if (service && vm.Member.editMode) {

					// If member > become leader of the service
					if (isMemberOfThisService(service)) {
						service.leader_id = member.id;

					// Else if leader > leave service
					} else if (isLeaderOfThisService(member, service)) {
						leaveService(service);

					// Else > join the service as member
					} else {
						joinService(member, service);
					}
				}

				console.log(member);
				console.log(service);
			}

			function isMemberOfThisService (member, service) {
				if (member && service) {
					var isMember = false;

					angular.forEach(member.services, function(memberService) {
						if (!isMember && service.id === memberService.id) {
							isMember = true;
						};
					});

					return isMember;
				}
			}

			function isLeaderOfThisService(member, service) {
				return service.leader_id === member.id;
			}

			function joinService(service) {
				vm.Member.loaded.services.push(service);
			}

			function leaveService(service) {
				var index = vm.Member.loaded.services.indexOf(service);

				console.log(member.services);
				console.log(index);

				if (index != -1) {
					vm.Member.loaded.services.slice(index, 1);
				}

				console.log(vm.Member.loaded.services);
			}
		}
	}

})();