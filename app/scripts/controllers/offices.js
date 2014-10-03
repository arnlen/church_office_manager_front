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
		vm.Office.getPrevious = getPrevious;
		vm.Office.getNext = getNext;
		vm.Office.closeAllPanels = closeAllPanels;

		vm.Service = Service;
		vm.Member = Member;

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
			$scope.$broadcast('OfficesController > closeAllPanels');
		}


		// ================= EVENT CATCHERS ================= //


		// ------------------- Service -------------------

		$scope.$on('service-list-item.directive > service.clicked', function(event) {
			event.stopPropagation();
			console.log('[OfficesController][Event catched] "service-list-item.directive > service.clicked"');
			$scope.$broadcast('OfficesController > service.clicked');
		});

		$scope.$on('service-panel.directive > service.panelClosed', function(event) {
			event.stopPropagation();
			console.log('[OfficesController][Event catched] "service-panel.directive > service.panelClosed"');
			$scope.$broadcast('OfficesController > service.panelClosed');
		});

		// ------------------- Member -------------------

		$scope.$on('service-panel.directive > member.clicked', function(event) {
			event.stopPropagation();
			console.log('[OfficesController][Event catched] "service-list-item.directive > service.clicked"');
			$scope.$broadcast('OfficesController > member.clicked');
		});

		$scope.$on('member-panel.directive > member.panelOpen', function(event) {
			event.stopPropagation();
			console.log('[OfficesController][Event catched] "member-panel.directive > member.panelOpen"');
			$scope.$broadcast('OfficesController > member.panelOpen');
		});

		$scope.$on('member-panel.directive > member.panelClosed', function(event) {
			event.stopPropagation();
			console.log('[OfficesController][Event catched] "member-panel.directive > member.panelClosed"');
			$scope.$broadcast('OfficesController > member.panelClosed');
		});

	}

})();