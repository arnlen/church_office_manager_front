'use strict';

app.controller('MembersController', function ($scope, membersFactory) {

	// ------------------------------------------------------
	// Service loading

	var loadMember = function(memberId) {
		membersFactory.get({ id: memberId }).$promise.then(function(result) {
			$scope.loadedMember = result;
			$scope.pushServicePanel();
			$scope.memberPanelOpen = true;
		});
	};

	// ------------------------------------------------------
	// Panels management

	$scope.openMemberPanel = function(memberId) {
		loadMember(memberId);
	};

	$scope.closeMemberPanel = function() {
		$scope.memberPanelOpen = false;
		$scope.closeMemberList();
		$scope.pullServicePanel();
	};

	// Broadcast message ordering to close panel
	$scope.$watch('broadcastCloseMemberPanel', function() {
		if (!$scope.broadcastCloseMemberPanel) { return; }

		$scope.closeMemberPanel();
		$scope.broadcastCloseMemberPanelAck();
	});

	// ------------------------------------------------------
	// Assign a member section

	$scope.toggleMemberList = function() {
		if (!$scope.members) {
			membersFactory.query().$promise.then(function(result) {
				$scope.members = result;
				$scope.memberListOpen = !$scope.memberListOpen;
			});
		} else {
			$scope.memberListOpen = !$scope.memberListOpen;
		}
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

		$scope.loadedMember.$toggleMemberService({ id: member.id, serviceId: service.id, isMember: isMember, isLeader: isLeader })
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

});