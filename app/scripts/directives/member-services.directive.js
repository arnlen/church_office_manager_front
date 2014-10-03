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
		}
	}

})();