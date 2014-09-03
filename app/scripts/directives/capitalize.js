'use strict';

app.directive('chCapitalize', function () {

	return {
		restrict: 'A',
		scope: {
			name: '@'
		},
		template: "{{ name[0].toUpperCase() }}" + "{{ name.slice(1) }}"
	}

});
