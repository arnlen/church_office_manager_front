'use strict';

app.factory('officesFactory', ['$resource', 'API_BASE_URL', function($resource, API_BASE_URL) {

	return $resource(API_BASE_URL + 'offices/next/1');

}]);