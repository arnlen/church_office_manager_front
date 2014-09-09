'use strict';

app.factory('membersFactory', ['$resource', function($resource) {

	var Member = $resource('http://localhost:3000/members/:id');

	return Member;

}]);