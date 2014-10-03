(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberServices', chMemberServices);

	chMemberServices.$inject = ['officesService', 'membersService', '$q'];

	function chMemberServices (Office, Member, $q) {

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

					var isMember = vm.Member.isMemberOfThisService(vm.Member.loaded, service),
							isLeader = vm.Member.isLeaderOfThisService(vm.Member.loaded, service);

					console.log(service);

					// If member > become leader of the service
					if (isMember && !isLeader) {
						service.$update({ leader_id: vm.Member.loaded.id }).then(function(success) {
							console.log(vm.Member.loaded.name + ' is now leader of service ' + service.name);
						});

					// Else if leader > leave service
					} else if (isLeader) {
						var membership = vm.Member.leaveService(vm.Member.loaded, service),
								leadership = service.$update({ leader_id: 0 });

						$q.all(membership, leadership).then(function() {
							console.log(vm.Member.loaded.name + ' has left service ' + service.name);
						});

					// Else > join the service as member
					} else {
						vm.Member.joinService(vm.Member.loaded, service).then(function() {
							console.log(vm.Member.loaded.name + ' is now member of service ' + service.name);
						});
					}
				}
			}
		}
	}

})();