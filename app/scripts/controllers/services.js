'use strict';

app.controller('ServicesController', function ($scope, servicesFactory, membersFactory, notify) {

	// ------------------------------------------------------
	// Service loading

	var loadService = function() {
		servicesFactory.get({ id: $scope.selectedService.id }).$promise.then(function(result) {
			$scope.loadedService = result;
			$scope.servicePanelOpen = true;
			$scope.selectService(false);
		});
	};

	$scope.unloadService = function() {
		$scope.loadedService = false;
		console.log("Service unloaded.");
	};

	// Watch the variabel "selectedService" to load the service when clicked
	$scope.$watch('selectedService', function(newService, oldService) {
		if (!$scope.selectedService) { return; }

		$scope.openServicePanel();
	});


	// ------------------------------------------------------
	// Panels management

	$scope.openServicePanel = function() {
		loadService();

		// Load member list on service loading
		if (!$scope.members) { $scope.loadMemberList(); }

		$scope.bodyNotScrollable();
	};

	$scope.closeServicePanel = function() {
		$scope.pullServicePanel();
		$scope.servicePanelOpen = false;

		console.log('Closing panel...');

		$scope.broadcastCloseMemberPanel = true;
		$scope.bodyScrollable();
	};

	$scope.pushServicePanel = function() {
		$scope.pushedOnce = true;
	};

	$scope.pullServicePanel = function() {
		$scope.pushedOnce = false;
	};

	$scope.closeAllPanels = function() {
		$scope.broadcastCloseMemberPanel = true;
		$scope.closeServicePanel();
	};

	// Broadcast ack from the MemberPanel
	$scope.broadcastCloseMemberPanelAck = function() {
		$scope.broadcastCloseMemberPanel = false;
	};

	// ------------------------------------------------------
	// View / Edit mode manager

	$scope.toggleEditMode = function() {
		$scope.editMode = !$scope.editMode;
	};

	$scope.editModeToggleMemberList = function() {
		$scope.editModeMemberListOpen = !$scope.editModeMemberListOpen;
	};

	$scope.editModeToggleServiceMembersList = function() {
		$scope.editModeServiceMembersListOpen = !$scope.editModeServiceMembersListOpen;
	};

	// Load every members of the church
	$scope.loadMemberList = function() {
		membersFactory.query().$promise.then(function(result) {
			$scope.members = result;
		});
	};

	// Load only members of this service
	$scope.loadServiceMembersList = function() {
		membersFactory.getServiceMembers().$promise.then(function(result) {
			$scope.serviceMembers = result;
		});
	};

	$scope.thisServiceHasThisMember = function(member) {
		if ($scope.loadedService) {
			var isMember = false;

			angular.forEach(member.services, function(memberService) {

				if (!isMember && $scope.loadedService.id === memberService.id) {
					isMember = true;
				};
			});

			return isMember;
		}
	};

	$scope.toggleServiceMember = function(member) {
		var isMember = $scope.thisServiceHasThisMember(member);

		member.$toggleMemberService({ id: member.id, serviceId: $scope.loadedService.id, isMember: isMember },
			function(success) {
				notify({ message: success.message, classes: 'success' });
			},
			function(failure) {
				notify({ message: failure.data.message, classes: 'failure' });
			}
		);
	};

	$scope.thisServiceHasThisLeader = function(member) {
		if ($scope.loadedService) {
			$scope.loadedService.leader_id === member.id
		}
	};

});