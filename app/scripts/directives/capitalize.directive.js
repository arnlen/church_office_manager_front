(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chCapitalize', chCapitalize);

	function chCapitalize () {

		return {
			restrict: 'A',
			scope: {
				name: '@'
			},
			template: "{{ name[0].toUpperCase() }}" + "{{ name.slice(1) }}"
		}

	}

})();