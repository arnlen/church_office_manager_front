'use strict';

app.factory('officesFactory', ['$resource', function($resource) {

	return $resource('http://localhost:3000/offices/next/1');

}]);