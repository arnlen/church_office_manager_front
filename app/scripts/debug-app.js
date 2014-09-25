'use strict';

var dapp = angular.module('debugApp', []);

dapp.controller('DebugFirstController', ['$scope', function ($scope) {
	$scope.appStatus = 'off';
	console.log($scope.appStatus);
}]);

dapp.directive('myDirective', function() {

	return {
		scope: {
			statusDirective1: '='
		},
		restrict: 'A',
		template: "<input type='text' ng-model='statusDirective1' value='{{ statusDirective1 }}' />",
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {

					$scope.statusDirective1 = 'directive1';
					console.log($scope.statusDirective1);

			});
		}
	};

});

dapp.directive('myDirective2', function() {

	return {
		scope: {
			statusDirective2: '='
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A',
		template: '<button>Directive 2: {{ statusDirective2 }}</button>',
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {

					$scope.statusDirective2 = 'directive2';
					console.log($scope.statusDirective2);

			});
		}
	};

});