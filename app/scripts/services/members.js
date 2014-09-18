'use strict';

app.factory('membersService', ['$resource', 'API_BASE_URL', 'notify', function ($resource, API_BASE_URL, notify) {

	var Member = {

		resource: $resource(API_BASE_URL + 'members/:id',
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
		),

		loadOne: function(scope, member) {
			this.resource.get({ id: member.id }).$promise.then(function(result) {
				scope.loadedMember = result;
			});
		},

		loadAll: function(scope, service) {
			if (service) {
				this.resource.query({ serviceId: service.id }).$promise.then(function(result) {
					scope.serviceMembers = result;
				});
			} else {
				this.resource.query().$promise.then(function(result) {
					scope.members = result;
				});
			}
		},

		isMemberOfThisService: function(member, service) {
			if (service) {
				var isMember = false;

				angular.forEach(member.services, function(memberService) {
					if (!isMember && service.id === memberService.id) {
						isMember = true;
					};
				});

				return isMember;
			}
		},

		isLeaderOfThisService: function(member, service) {
			return service.leader_id === member.id;
		},

		joinOrLeaveService: function(scope, member, service) {

			var isMember = this.isMemberOfThisService(member, service);

			member.$joinOrLeaveService({ id: member.id, serviceId: service.id, isMember: isMember }).then(
				function(success) {
					notify({ message: success.message, classes: 'success' });
				},
				function(failure) {
					notify({ message: failure.data.message, classes: 'failure' });
				}
			);

		}

	};

	return Member;

}]);