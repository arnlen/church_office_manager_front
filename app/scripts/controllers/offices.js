(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('OfficesController', OfficesController);

	OfficesController.$inject = ['$scope', '$rootScope', 'officesService', 'servicesService', 'membersService', 'tasksService'];

	function OfficesController ($scope, $rootScope, Office, Service, Member, Task) {

		/*jshint validthis: true */
		var vm = this;

		vm.office = {};
		vm.service = {};
		vm.member = {};
		vm.getPrevious = getPrevious;
		vm.getNext = getNext;

		activate();


		// ================= FUNCTIONS ================= //


		function activate() {

			vm.office = {
				loaded: undefined,
				members: undefined,
				services: undefined
			};

			vm.service = {
				clicked: undefined,
				loaded: undefined,
				panelOpen: false,
				displayAll: false
			};

			vm.member = {
				clicked: undefined,
				loaded: undefined,
				panelOpen: false
			};

			// ------------------------------------------------
			// Office loading

			Office.find('next').then(function(office) {
				Office.current_office = office;
				$rootScope.$broadcast('office.loaded');

				// ------------------------------------------------
				// Services loading

				Service.all(Office.current_office).then(function(services) {
					Service.services = services;
					$rootScope.$broadcast('services.loaded');
				});
			});

			// ------------------------------------------------
			// Members loading

			Member.all().then(function(members) {
				Member.members = members;
				$rootScope.$broadcast('members.loaded');
			});

		} // end function activate()


		function getPrevious() {
			Office.find($scope, 'previous');
		}

		function getNext() {
			Office.find($scope, 'next');
		}


		// ================= EVENT CATCHERS ================= //

		// Loadings

		$scope.$on('office.loaded', function(event) {
			vm.office.loaded = Office.current_office;
			console.log('[Loaded] Office');
		});

		$scope.$on('services.loaded', function(event) {
			vm.office.services = Service.services;
			console.log('[Loaded] Services');
		});

		$scope.$on('members.loaded', function(event) {
			vm.office.members = Member.members;
			console.log('[Loaded] Members');
		});

		// // Updates

		// $scope.$on('office.updated', function(event) {
		// 	$scope.office.loaded = officesService.office;
		// 	console.log('[Updated] Office');
		// });

		// $scope.$on('services.updated', function(event) {
		// 	$scope.office.services = servicesService.services;
		// 	console.log('[Updated] Services');
		// });

		$scope.$on('loadedService.updated', function(event) {
			vm.service.loaded = Service.loadedService;
			vm.service.panelOpen = true;
			console.log('[Updated] Loaded Service');
		});

		// $scope.$on('ask.allPanels.close', function(event) {
		// 	console.log('[Ask] All panels to close');
		// 	$scope.servicePanelOpen = false;
		// 	$scope.memberPanelOpen = false;
		// 	$scope.$apply(); // TODO: find why this doesn't work without this call
		// });

	}

})();