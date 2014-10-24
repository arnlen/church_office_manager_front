(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chAfterTransition', chAfterTransition);

	function chAfterTransition () {

		return {
			restrict: 'A',
			link: function(scope, element) {

				// Listen for the event "transitionend" raised after a transition
				// Only trigger on property "right", the one animated on panel open/close
				element[0].addEventListener('transitionend', function(transitionEvent) {

					if (transitionEvent.propertyName === 'right' && !scope.servicePanelOpen) {
						scope.unloadService();
					}

				});

			}
		}

	}

})();