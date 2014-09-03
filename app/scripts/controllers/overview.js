'use strict';

app.controller('OverviewController', function ($scope, churchServicesFactory, membersFactory, tasksFactory) {

	var initialize = function(members, services, tasks) {

		// Loop over every service
		angular.forEach(services, function(service, index) {

			// Loop over every members
			angular.forEach(members, function(member, index) {

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

			}); // End loop over every member

			angular.forEach(tasks, function(task, index) {
				if (task.service.toLowerCase() === service.name.toLowerCase()) {
					typeof(service.taskDoneCounter) == 'undefined' ? service.taskDoneCounter = 0 : '';
					typeof(service.taskCounter) == 'undefined' ? service.taskCounter = 1 : service.taskCounter++;
					typeof(service.tasks) == 'undefined' ? service.tasks = [] : '';
					task.completed ? service.taskDoneCounter++ : '';
					service.tasks.push(task);
				}
			}); // End loop over every task

		}); // End loop over every service

		$scope.members = members;
		$scope.services = services;
		$scope.tasks = tasks;

		// Init display mode (display all task yes or no)
		$scope.displayAllTasks = true;

	};

	// Call the function
	initialize(membersFactory, churchServicesFactory, tasksFactory);

});