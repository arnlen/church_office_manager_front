(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('OfficesController', OfficesController);

	OfficesController.$inject = ['$scope', '$q', 'officesService', 'servicesService', 'membersService', 'tasksService'];

	function OfficesController($scope, $q, Office, Service, Member, Task) {

		/*jshint validthis: true */
		var vm = this;

		vm.Office = Office;
		vm.Service = Service;
		vm.Member = Member;
		vm.Office.getPrevious = getPrevious;
		vm.Office.getNext = getNext;
		vm.Office.closeAllPanels = closeAllPanels;

		activate();


		// ---------------- Functions ---------------- //

		function activate() {
			$q.all([loadOffice(), loadMembers()]).then(function(success) {
				console.log('[OfficeController] Office and Members loaded');
			});
		}

		function loadOffice() {
			var deferred = $q.defer();

			vm.Office.find('next').then(function(office) {
				vm.Office.loaded = office;

				vm.Service.all(Office.loaded).then(function(services) {
					vm.Office.services = services;

					deferred.resolve(vm.Office);
				});
			});

			return deferred.promise;
		}

		function loadMembers() {
			var deferred = $q.defer();

			vm.Member.all().then(function(members) {
				vm.Office.members = members;
				deferred.resolve(vm.Office);
			});

			return deferred.promise;
		}


		function getPrevious() {
			vm.Office.find('previous');
		}

		function getNext() {
			vm.Office.find('next');
		}

		function closeAllPanels() {
			vm.Service.panelOpen = false;
			vm.Member.panelOpen = false;
		}


		// ================= EVENT CATCHERS ================= //

		$scope.$on('service-list-item.directive > service.clicked', function(event, service) {
			event.stopPropagation();
			console.log('[OfficeController][Event] Catched "service-list-item.directive > service.clicked"');
			$scope.$broadcast('ServiceController > service.clicked');
		});

		// $scope.$on('loadedService.updated', function(event) {
		// 	vm.service.loaded = Service.loadedService;
		// 	vm.service.panelOpen = true;
		// 	console.log('[Updated] Loaded Service');
		// });

		// $scope.$on('ask.allPanels.close', function(event) {
		// 	console.log('[Ask] All panels to close');
		// 	$scope.servicePanelOpen = false;
		// 	$scope.memberPanelOpen = false;
		// 	$scope.$apply(); // TODO: find why this doesn't work without this call
		// });

	}

})();