'use strict';

app.directive('chCloseAllPanels', function ($rootScope) {

	function link(scope, element, attr) {
		element.on('click', function(event) {
			$rootScope.$broadcast('ask.allPanels.close');
		});
	}

	return {
		restrict: 'A',
		link: link
	};

});