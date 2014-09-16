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

});