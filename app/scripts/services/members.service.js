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
				resource = $resource(API_BASE_URL + 'members/:id', { id: '@id' }),
				membership = $resource(API_BASE_URL + 'memberships/:id', { id: '@id' },
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
				// Refresh member or service members after update
				refreshLoaded(service).then(function(members) {
					deferred.resolve(members);
				});
			});

			return deferred.promise;
		}

		function leaveService(member, service) {
			var deferred = $q.defer();

			membership.destroy({ id: 42, memberId: member.id, serviceId: service.id }).$promise.then(function() {
				// Refresh member or service members after update
				refreshLoaded(service).then(function(members) {
					deferred.resolve(members);
				});
			});

			return deferred.promise;
		}

		function refreshLoaded(service) {
			var deferred = $q.defer();

			// Case 1: we are in the Member Panel, reload the loaded member
			if (Member.loaded && Member.panelOpen) {
				Member.find(Member.loaded.id).then(function(member) {
					Member.loaded = member;
					deferred.resolve(member);
				});

			// Case 2: we are on the Service Panel, reload the Service members
			} else {
				$q.all([Member.all(),Member.all(service)]).then(function(members) {
					deferred.resolve(members);
				});
			}

			return deferred.promise;
		}
	}

})();