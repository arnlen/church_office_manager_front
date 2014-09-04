'use strict';

app.factory('officeFactory', ['$resource', function($resource) {

	return $resource('http://localhost:3000/offices/next/1.json');

}]);