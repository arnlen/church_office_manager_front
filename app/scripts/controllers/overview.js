'use strict';

app.controller('OverviewController', function ($scope, churchServicesFactory, membersFactory) {

	var initialize = function(members, services) {

		// Loop over every members
		angular.forEach(members, function(member, index) {

			// Loop over every service
			angular.forEach(services, function(service, index) {

				// Assign member to service as leader if required
				if (member.leaderOf.toLowerCase() === service.name.toLowerCase()) {
					service.leader = member.name;
				}

				// Assign member to service as member if required
				angular.forEach(member.memberOf, function(memberService, index) {
					if (memberService.toLowerCase() === service.name.toLowerCase()) {
						typeof(service.members) == 'undefined' ? service.members = [] : '';
						service.members.push(member.name);
					}
				});

			}); // End loop over every service
		}); // End loop over every members

		$scope.members = members;
		$scope.services = services;

	};

	// Call the function
	initialize(membersFactory, churchServicesFactory);

});