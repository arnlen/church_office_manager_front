(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('membersService', membersService);

	membersService.$inject = ['$resource', 'API_BASE_URL', '$rootScope', 'notify', '$q'];

	function membersService ($resource, API_BASE_URL, $rootScope, notify, $q) {

		// Init attributes
		var clicked = undefined,
				loaded = undefined,
				panelOpen = false,
				resource = $resource(API_BASE_URL + 'members/:id', { id: '@id' },
				{
					joinOrLeaveService: { method: 'PUT', params: {
						serviceId: '@serviceId',
						isMember: '@isMember',
						isLeader: '@isLeader'
					}}
				}
			);

		var Member = {
			clicked: clicked, // undefined on init
			loaded: loaded, // undefined on init
			panelOpen: panelOpen, // false on init
			find: find, // promise
			all: all, // promise
			isMemberOfThisService: isMemberOfThisService, // bool
			isLeaderOfThisService: isLeaderOfThisService, // bool
			joinOrLeaveService: joinOrLeaveService // promise
		};

		return Member;

		// ---------------- Functions ---------------- //

		function find(memberId) {
			var deferred = $q.defer();
			if (memberId) {
				resource.get({ id: memberId }).$promise.then(function(result) {
					deferred.resolve(result);
				});
			}
			return deferred.promise;
		}

		function all(service) {
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

		function isLeaderOfThisService (member, service) {
			return service.leader_id === member.id;
		}

		function joinOrLeaveService (member, service) {
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
		}

	}

})();