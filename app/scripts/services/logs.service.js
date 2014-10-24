(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('logsService', logsService);

	logsService.$inject = [];

	function logsService () {

		// Init attributes
		var debugLevel = 1; // Not used ATM

		return log;

		// ---------------- Functions ---------------- //

		function log(emitter, type, message, debugLevel) {
			var compiled = '[ ' + type + ' | ' + emitter + ' ] ' + message;

			console.log(compiled);
		}
	}

})();