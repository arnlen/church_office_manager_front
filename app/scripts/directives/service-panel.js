'use strict';

app.directive('chServicePanel', function () {

	function link(scope, element, attr) {
	}

	return {
		restrict: 'E',
		link: link,
		// template: '<div>MyDirective</div>'
		templateUrl: 'views/services/show.html'
	};

});