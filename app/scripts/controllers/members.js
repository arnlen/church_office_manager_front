(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('MembersController', MembersController);

	MembersController.$inject = ['$scope', 'notify', 'membersService'];

	function MembersController ($scope, notify, Member) {

		// ------------------------------------------------------
		// Panels management

		$scope.openMemberPanel = function(memberId) {
			Member.find($scope, member);

			$scope.pushServicePanel();
			$scope.memberPanelOpen = true;
		};

		$scope.closeMemberPanel = function() {
			$scope.memberPanelOpen = false;
			$scope.closeMemberList();
			$scope.pullServicePanel();
		};

		$scope.$watch('loadedMember', function() {
			if (!$scope.loadedMember) { return; }

			$scope.openMemberPanel();
		});

		// ------------------------------------------------------
		// Assign a member section

		$scope.toggleMemberList = function() {
			// This test should be useless since member list
			// is loaded in ServicesController. Keep it whatever for now.
			if (!$scope.members) { $scope.loadMemberList(); }

			$scope.memberListOpen = !$scope.memberListOpen;
		};

		$scope.closeMemberList = function() {
			$scope.memberListOpen = false;
			$scope.memberToConfirm = false;
		};

		$scope.confirmMemberInCharge = function(member) {
			$scope.memberToConfirm = member;
		};

		$scope.updateMemberInCharge = function(member) {
			$scope.loadedService.member_in_charge_id = member.id;
			$scope.loadedService.$update();
			$scope.closeMemberList();
		};

		// ------------------------------------------------------
		// Member service

		$scope.toggleMemberService = function(member, service) {
			var isLeader = $scope.loadedMember.leader_of_id === service.id,
					isMember = $scope.isMemberOfThisService(service);

			$scope.loadedMember.$toggleMemberService({ id: member.id, serviceId: service.id, isMember: isMember, isLeader: isLeader },
				function(success) {
					notify({ message: success.message, classes: 'success' });
				},
				function(failure) {
					notify({ message: failure.data.message, classes: 'failure' });
				}
			);
		};

		$scope.isMemberOfThisService = function(service) {
			if ($scope.loadedMember) {
				var isMember = false;

				angular.forEach($scope.loadedMember.services, function(memberService) {

					if (!isMember && service.id === memberService.id) {
						isMember = true;
					};
				});

				return isMember;
			}
		};

	}

})();