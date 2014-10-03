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
		vm.Office.eventList = [];

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

		vm.Office.eventList = [
			'service-list-item.directive > service.clicked',
			'service-panel.directive > service.panelClosed',
			'service-panel.directive > member.clicked',
			'member-panel.directive > member.panelOpen',
			'member-panel.directive > member.panelClosed'
		];

		angular.forEach(vm.Office.eventList, function(eventMessage) {
			var splitted = eventMessage.split(' > ');
			var eventSender = splitted[0],
					eventName = splitted[1];

			$scope.$on(eventMessage, function(event) {
				event.stopPropagation();
				console.log('[OfficesController][Event catched] "' + eventMessage + '"');
				$scope.$broadcast('OfficesController > ' + eventName);
			});
		});
	}

})();