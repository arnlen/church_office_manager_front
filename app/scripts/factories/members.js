'use strict';

app.factory('membersFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	var Member = $resource(API_BASE_URL + 'members/:id',
	{
		id: '@id'
	},
	{
		toggleMemberService: { method: 'PUT', params: {
			serviceId: '@serviceId',
			isMember: '@isMember',
			isLeader: '@isLeader'
		}}});

	return Member;

}]);