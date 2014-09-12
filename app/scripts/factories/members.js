'use strict';

app.factory('membersFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	var Member = $resource(API_BASE_URL + 'members/:id');

	return Member;

}]);