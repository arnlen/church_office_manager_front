'use strict';

app.factory('membersService', ['$resource', 'API_BASE_URL', '$rootScope', 'notify', '$q', function ($resource, API_BASE_URL, $rootScope, notify, $q) {

	// Init attributes
	var members = null;

	var resource = $resource(API_BASE_URL + 'members/:id',
		{
			id: '@id'
		},
		{
			joinOrLeaveService: { method: 'PUT', params: {
				serviceId: '@serviceId',
				isMember: '@isMember',
				isLeader: '@isLeader'
			}}
		}
	);

	var loadMember = function(member) {
		var deferred = $q.defer();
		if (member) {
			this.resource.get({ id: member.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
		}
		return deferred.promise;
	};

	var loadAllMembers = function(service) {
		var deferred = $q.defer();
		if (service) {
			resource.query({ serviceId: service.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
		} else {
			resource.query().$promise.then(function(result) {
				deferred.resolve(result);
			});
		}
		return deferred.promise;
	};

	var isMemberOfThisService = function(member, service) {
		if (service) {
			var isMember = false;

			angular.forEach(member.services, function(memberService) {
				if (!isMember && service.id === memberService.id) {
					isMember = true;
				};
			});

			return isMember;
		}
	};

	var isLeaderOfThisService = function(member, service) {
		return service.leader_id === member.id;
	};

	var joinOrLeaveService = function(member, service) {
		var deferred = $q.defer(),
				isMember = isMemberOfThisService(member, service);

		member.$joinOrLeaveService({ id: member.id, serviceId: service.id, isMember: isMember }).then(
			function(success) {
				deferred.resolve(success);
			},
			function(failure) {
				deferred.reject(failure);
			}
		);
		return deferred.promise;
	};

	var Member = {
		members: members, // null on init
		load: loadMember, // promise
		loadAll: loadAllMembers, // promise
		isMemberOfThisService: isMemberOfThisService, // bool
		isLeaderOfThisService: isLeaderOfThisService, // bool
		joinOrLeaveService: joinOrLeaveService // promise
	};

	return Member;

}]);