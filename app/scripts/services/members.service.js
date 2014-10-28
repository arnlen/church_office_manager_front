(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('membersService', membersService);

	membersService.$inject = ['$resource', 'ENV', '$rootScope', 'notify', '$q'];

	function membersService ($resource, ENV, $rootScope, notify, $q) {

		// Init attributes
		var clicked = undefined,
				loaded = undefined,
				panelOpen = false,
				resource = $resource(ENV.apiBaseURL + 'members/:id', { id: '@id' },
				{
					update: { method: 'PUT' }
				}),
				membership = $resource(ENV.apiBaseURL + 'memberships/:id', { id: '@id' },
				{
					create: { method: 'POST', params: {
						serviceId: '@serviceId',
						memberId: '@memberId'
					}},
					destroy: { method: 'DELETE', params: {
						serviceId: '@serviceId',
						memberId: '@memberId'
					}}
				});

		var Member = {
			clicked: clicked, // undefined on init
			loaded: loaded, // undefined on init
			panelOpen: panelOpen, // false on init
			find: find, // promise
			all: all, // promise
			isMemberOfThisService: isMemberOfThisService, // bool
			isLeaderOfThisService: isLeaderOfThisService, // bool
			joinService: joinService, // promise
			leaveService: leaveService // promise
		};

		return Member;

		// ---------------- Functions ---------------- //

		function find(memberId) {
			var deferred = $q.defer();
			if (memberId) {
				resource.get({ id: memberId }).$promise.then(function(member) {
					deferred.resolve(member);
				});
			}
			return deferred.promise;
		}

		function all(service) {
			var deferred = $q.defer();
			if (service) {
				resource.query({ serviceId: service.id }).$promise.then(function(members) {
					deferred.resolve(members);
				});
			} else {
				resource.query().$promise.then(function(members) {
					deferred.resolve(members);
				});
			}
			return deferred.promise;
		}

		function isMemberOfThisService(member, service) {
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
			if (member && service) {
				return service.leader_id === member.id;
			}
		}

		function joinService(member, service) {
			var deferred = $q.defer();

			membership.create({ memberId: member.id, serviceId: service.id }).$promise.then(function() {
				deferred.resolve();
			});

			return deferred.promise;
		}

		function leaveService(member, service) {
			var deferred = $q.defer();

			membership.destroy({ id: 42, memberId: member.id, serviceId: service.id }).$promise.then(function() {
				deferred.resolve();
			});

			return deferred.promise;
		}
	}

})();