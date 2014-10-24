(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('OfficesController', OfficesController);

	OfficesController.$inject = ['$scope', '$q', 'officesService', 'servicesService', 'membersService', 'tasksService', 'logsService'];

	function OfficesController($scope, $q, Office, Service, Member, Task, Log) {

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
				Log('OfficeController', 'Info', '---> System activated and ready to rock!');
			});
		}

		function loadOffice() {
			var deferred = $q.defer();

			vm.Office.find('next').then(function(office) {
				vm.Office.loaded = office;
				Log('OfficeController', 'Info', 'Office loaded');

				loadServices().then(function() {
					deferred.resolve();
				});
			});

			return deferred.promise;
		}

		function loadServices() {
			var deferred = $q.defer();

			vm.Service.all(Office.loaded).then(function(services) {
				vm.Office.services = services;
				Log('OfficeController', 'Info', 'Services (re)loaded');
				deferred.resolve();
			});

			return deferred.promise;
		}

		function loadMembers() {
			var deferred = $q.defer();

			vm.Member.all().then(function(members) {
				vm.Office.members = members;
				Log('OfficeController', 'Info', 'Members (re)loaded');
				deferred.resolve();
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

		// function eventCatcher(eventList, callback) {
		// 	angular.forEach(eventList, function(eventMessage) {
		// 		var splitted = eventMessage.split(' > ');
		// 		var eventSender = splitted[0],
		// 				eventName = splitted[1];

		// 		$scope.$on(eventMessage, function(event) {
		// 			event.stopPropagation();
		// 			callback();
		// 		});
		// 	});
		// }

		vm.Office.eventList = [
			'service-list-item.directive > service.clicked',

			'service-panel.directive > service.panelClosed',
			'service-panel.directive > member.clicked',
			'service-panel.directive > service.editMode',
			'service-panel.directive > service.loaded.updated',
			'service-panel.directive > member.loaded.updated',

			'member-panel.directive > member.panelOpen',
			'member-panel.directive > member.panelClosed',

			'member-services.directive > service.loaded.updated',
			'member-services.directive > member.loaded.updated',
		];

		angular.forEach(vm.Office.eventList, function(eventMessage) {
			var splitted = eventMessage.split(' > ');
			var eventSender = splitted[0],
					eventName = splitted[1];

			$scope.$on(eventMessage, function(event) {
				event.stopPropagation();
				Log('OfficesController', 'Event catched', eventMessage);
				$scope.$broadcast('OfficesController > ' + eventName);

				// Specific actions where refresh is required
				if (eventName === 'service.loaded.updated') {
					loadServices();
				} else if (eventName === 'member.loaded.updated') {
					loadMembers();
				}
			});
		});
	}

})();