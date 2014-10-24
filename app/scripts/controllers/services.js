(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', 'notify', 'servicesService', 'membersService'];

	function ServicesController ($scope, notify, Service, Member) {

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

		$scope.isMemberOfThisService = function(member) {
			return membersService.isMemberOfThisService(member, $scope.loadedService);
		};

		$scope.toggleMembership = function(member) {
			membersService.joinOrLeaveService($scope, member, $scope.loadedService);
		};

	}

})();