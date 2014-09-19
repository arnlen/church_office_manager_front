'use strict';

app.controller('OfficesController', function ($scope, officesService, servicesService, membersService, tasksService, $timeout, $q, $rootScope) {

	activate();


	// ================= FUNCTIONS ================= //

	function activate() {

		// ------------------------------------------------
		// Office loading

		officesService.load('next').then(function(result) {

			$rootScope.$broadcast('office.updated');
			officesService.office = result;

			// ------------------------------------------------
			// Services loading

			servicesService.loadAll(officesService.office).then(function(result) {

				$rootScope.$broadcast('services.updated');
				servicesService.services = result;

				// ------------------------------------------------
				// Services members and tasks loading

				angular.forEach(servicesService.services, function(service) {

					var deferred_tasks = $q.defer(),
							deferred_members = $q.defer(),
							all_finished = $q.all();

					tasksService.loadAll(service).then(function(tasks) {
						service.tasks = tasks;
						deferred_tasks.resolve(tasks);
					});

					membersService.loadAll(service).then(function(members) {
						service.members = members;
						deferred_members.resolve(members);
					});

					var promise_tasks = deferred_tasks.promise,
							promise_members = deferred_members.promise;

					$q.all([ promise_tasks, promise_members] ).then(function(result) {
						$rootScope.$broadcast('services.updated');
					});

				});
			});
		});

		// ------------------------------------------------
		// Members loading

		membersService.loadAll().then(function(result) {
			$rootScope.$broadcast('members.updated');
			membersService.members = result;
		});

	} // end function activate()


	function previousOffice() {
		officesService.load($scope, 'previous');
	}

	function nextOffice() {
		officesService.load($scope, 'next');
	}


	// ================= EVENT CATCHERS ================= //

	$scope.$on('office.updated', function(event) {
		console.log('[Updated] Office');
		$scope.office = officesService.office;
	});

	$scope.$on('services.updated', function(event) {
		console.log('[Updated] Services');
		$scope.services = servicesService.services;
	});

	// ------------------------------------------------------
	// Service selection for right panel openning

	$scope.selectService = function(selectedService) {
		servicesService.loadOne($scope, selectedService);
	};

});