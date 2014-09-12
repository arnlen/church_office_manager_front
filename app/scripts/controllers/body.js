'use strict';

app.controller('BodyController', function ($scope) {

	$scope.bodyScrollable = function() {
		$scope.bodyNoScroll = false;
	};

	$scope.bodyNotScrollable = function() {
		$scope.bodyNoScroll = true;
	};

});