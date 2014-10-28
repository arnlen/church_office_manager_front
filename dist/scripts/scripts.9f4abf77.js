'use strict';

/**
 * @ngdoc overview
 * @name churchOfficeManager
 * @description
 * # churchOfficeManager
 *
 * Main module of the application.
 */
angular
	.module('churchOfficeManager', [
		'ngResource',
		'ngAnimate',
		'churchOfficeManagerConfig',
		'cgNotify'
	]);
(function() {
	'use strict';

	angular
			.module('churchOfficeManager')
			.controller('GlobalController', GlobalController);

	GlobalController.$inject = ['$scope', 'notify'];

	function GlobalController ($scope, notify) {

		var vm = this;

		vm.bodyScrollable = true;

		// Configure notify
		notify.config({
			duration: 3000,
			templateUrl: 'views/shared/notify-template.html'
		});

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('MembersController', MembersController);

	MembersController.$inject = ['$scope', 'notify', 'membersService'];

	function MembersController ($scope, notify, Member) {

		/*jshint validthis: true */
		var vm = this;


		// ---------------- Functions ---------------- //


		// ------------------------------------------------------
		// Assign a member section

		$scope.toggleMemberList = function() {
			// This test should be useless since member list
			// is loaded in ServicesController. Keep it whatever for now.
			if (!$scope.members) { $scope.loadMemberList(); }

			$scope.memberListOpen = !$scope.memberListOpen;
		};

		$scope.closeMemberList = function() {
			$scope.memberListOpen = false;
			$scope.memberToConfirm = false;
		};

		$scope.confirmMemberInCharge = function(member) {
			$scope.memberToConfirm = member;
		};

		$scope.updateMemberInCharge = function(member) {
			$scope.loadedService.member_in_charge_id = member.id;
			$scope.loadedService.$update();
			$scope.closeMemberList();
		};

		// ------------------------------------------------------
		// Member service

		$scope.toggleMemberService = function(member, service) {
			var isLeader = $scope.loadedMember.leader_of_id === service.id,
					isMember = $scope.isMemberOfThisService(service);

			$scope.loadedMember.$toggleMemberService({ id: member.id, serviceId: service.id, isMember: isMember, isLeader: isLeader },
				function(success) {
					notify({ message: success.message, classes: 'success' });
				},
				function(failure) {
					notify({ message: failure.data.message, classes: 'failure' });
				}
			);
		};

		$scope.isMemberOfThisService = function(service) {
			if ($scope.loadedMember) {
				var isMember = false;

				angular.forEach($scope.loadedMember.services, function(memberService) {

					if (!isMember && service.id === memberService.id) {
						isMember = true;
					};
				});

				return isMember;
			}
		};

	}

})();
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
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', 'notify', 'servicesService', 'membersService'];

	function ServicesController ($scope, notify, Service, Member) {

		// ------------------------------------------------------
		// View / Edit mode manager

		$scope.toggleEditMode = function() {
			$scope.editMode = !$scope.editMode;
		};

		$scope.editModeToggleMemberList = function() {
			$scope.editModeMemberListOpen = !$scope.editModeMemberListOpen;
		};

		$scope.editModeToggleServiceMembersList = function() {
			$scope.editModeServiceMembersListOpen = !$scope.editModeServiceMembersListOpen;
		};

		$scope.isMemberOfThisService = function(member) {
			return membersService.isMemberOfThisService(member, $scope.loadedService);
		};

		$scope.toggleMembership = function(member) {
			membersService.joinOrLeaveService($scope, member, $scope.loadedService);
		};

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.controller('TasksController', TasksController);

	TasksController.$inject = ['$scope', 'tasksService'];

	function TasksController ($scope, Task) {

		/*jshint validthis: true */
		var vm = this;

		vm.update = update;

		function update(task) {
			Task.update($scope, task);
		}

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chAfterTransition', chAfterTransition);

	function chAfterTransition () {

		return {
			restrict: 'A',
			link: function(scope, element) {

				// Listen for the event "transitionend" raised after a transition
				// Only trigger on property "right", the one animated on panel open/close
				element[0].addEventListener('transitionend', function(transitionEvent) {

					if (transitionEvent.propertyName === 'right' && !scope.servicePanelOpen) {
						scope.unloadService();
					}

				});

			}
		}

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chCapitalize', chCapitalize);

	function chCapitalize () {

		return {
			restrict: 'A',
			scope: {
				name: '@'
			},
			template: "{{ name[0].toUpperCase() }}" + "{{ name.slice(1) }}"
		}

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServiceListItem', chServiceListItem);

	chServiceListItem.$inject = ['$rootScope', 'servicesService'];

	function chServiceListItem ($rootScope, Service) {

		var directive = {
			restrict: 'A',
			scope: {
				service: '='
			},
			templateUrl: 'scripts/directives/service-list-item.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link(scope, element, attr, vm) {

			// On click on a service
			element.on('click', function(event) {
				vm.Service.clicked = scope.service;
				scope.$emit('service-list-item.directive > service.clicked');
			});
		}

		function controller($scope) {
			var vm = this;

			vm.Service = Service; // ServicesService
			vm.service = $scope.service; // Service of the ng-repeat
		}

	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chServicePanel', chServicePanel);

	chServicePanel.$inject = ['$q', 'servicesService', 'membersService', 'logsService', 'officesService', 'tasksService'];

	function chServicePanel ($q, Service, Member, Log, Office, Task) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/service-panel.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {
			scope.$on('OfficesController > service.clicked', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > service.clicked');
				vm.Service.loadService();
			});

			scope.$on('OfficesController > member.panelOpen', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > member.panelOpen');
				vm.Service.panelPushed = true;
			});

			scope.$on('OfficesController > member.panelClosed', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > member.panelClosed');
				vm.Service.panelPushed = false;
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > closeAllPanels');
				vm.Service.closePanel();
			});

			scope.$on('OfficesController > service.loaded.updated', function() {
				Log('ServicePanelDirective', 'Event catched', 'OfficesController > service.loaded.updated');
				vm.Service.reloadService();
			});
		}

		function controller($scope) {
			var vm = this;

			vm.Service = Service;
			vm.Service.loadService = loadService;
			vm.Service.reloadService = loadService;
			vm.Service.openPanel = openPanel;
			vm.Service.closePanel = closePanel;
			vm.Service.toggleEditMode = toggleEditMode;
			vm.Service.selectMember = selectMember;
			vm.Service.toggleMembership = toggleMembership;
			vm.Service.setLeader = setLeader;
			vm.Service.toggleMemberInChargeList = toggleMemberInChargeList;
			vm.Service.selectMemberInCharge = selectMemberInCharge;
			vm.Service.resetMemberToConfirm = resetMemberToConfirm;
			vm.Service.confirmSelectedMemberInCharge = confirmSelectedMemberInCharge;
			vm.Service.panelPushed = false;
			vm.Service.editMode = false;
			vm.Service.memberInChargeListOpen = false;
			vm.Service.memberToConfirm = false;


			vm.Member = Member;
			vm.Office = Office;

			vm.Task = Task;
			vm.Task.toggleCompletion = toggleTaskCompletion;


			// ----- Resource management ----- //

			function loadService() {
				vm.Service.find(vm.Service.clicked).then(function(service) {
					vm.Service.loaded = service;
					Log('ServicePanelDirective', 'Info', 'Service loaded');
					vm.Service.openPanel();

					vm.Task.all(vm.Service.loaded).then(function(tasks) {
						vm.Service.loadedTasks = tasks;
						Log('ServicePanelDirective', 'Info', 'Service tasks loaded');
					});
				});
			}

			function toggleMembership(member) {
				if (vm.Member.isMemberOfThisService(member, vm.Service.loaded)) {
					vm.Member.leaveService(member, vm.Service.loaded).then(function(members) {
						vm.Service.reloadService();
						$scope.$emit('service-panel.directive > member.loaded.updated');
						Log('ServicePanelDirective', 'Info', member.name + ' just left service ' + vm.Service.loaded.name);
					});
				} else {
					vm.Member.joinService(member, vm.Service.loaded).then(function(members) {
						vm.Service.reloadService();
						$scope.$emit('service-panel.directive > member.loaded.updated');
						Log('ServicePanelDirective', 'Info', member.name + ' just joined service ' + vm.Service.loaded.name);
					});
				}
			}

			function setLeader(member) {
				vm.Service.loaded.leader_id = member.id;
				vm.Service.loaded.leader_name = member.name;

				vm.Service.loaded.$update({ leader_id: member.id, leader_name: member.name }).then(function() {
					$scope.$emit('service-panel.directive > service.loaded.updated');
					Log('ServicePanelDirective', 'Info', member.name + ' is now leader of service ' + vm.Service.loaded.name);
				});
			}

			function toggleTaskCompletion(task) {
				var found = false;

				task.$update().then(function() {

					// Manually update the service in the global Office list of services
					angular.forEach(vm.Office.services, function(service) {
						if (!found && service.id === task.service_id) {
							found = true;
							service.$get();
							Log('ServicePanelDirective', 'Info', 'Task updated and Office service concerned updated');
						}
					});
				});
			}

			function toggleMemberInChargeList() {
				vm.Service.memberInChargeListOpen = !vm.Service.memberInChargeListOpen;
			}

			function selectMemberInCharge(member) {
				vm.Service.memberToConfirm = member;
			}

			function resetMemberToConfirm() {
				vm.Service.memberToConfirm = false;
			}

			function confirmSelectedMemberInCharge() {
				vm.Service.loaded.member_in_charge_id = vm.Service.memberToConfirm.id;
				vm.Service.loaded.$update().then(function(service) {
					Log('ServicePanelDirective', 'Info', service.member_in_charge_name + ' is now in charge of service ' + vm.Service.loaded.name + ' for this office');
					resetMemberToConfirm();
					toggleMemberInChargeList();
				});
			}


			// ----- UI / UX ----- //

			function openPanel() {
				vm.Service.panelOpen = true;
				$scope.$emit('service-panel.directive > service.panelOpen');
			}

			function closePanel() {
				vm.Service.panelOpen = false;
				vm.Service.panelPushed = false;
				vm.Service.editMode = false;
				$scope.$emit('service-panel.directive > service.panelClosed');
			}

			function toggleEditMode() {
				vm.Service.editMode = !vm.Service.editMode;
				if (vm.Service.editMode) {
					$scope.$emit('service-panel.directive > service.editMode');
				}
			}

			function selectMember(memberId) {
				vm.Member.clicked = memberId;
				$scope.$emit('service-panel.directive > member.clicked');
			}

		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberPanel', chMemberPanel);

	chMemberPanel.$inject = ['membersService', 'logsService'];

	function chMemberPanel (Member, Log) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/member-panel.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {
			scope.$on('OfficesController > member.clicked', function(event) {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > member.clicked');
				vm.Member.loadMember();
			});

			scope.$on('OfficesController > service.panelClosed', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > service.panelClosed');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > service.editMode', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > service.editMode');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > closeAllPanels', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > closeAllPanels');
				vm.Member.closePanel();
			});

			scope.$on('OfficesController > member.loaded.updated', function() {
				Log('MemberPanelDirective', 'Event catched', 'OfficesController > member.loaded.updated');
				vm.Member.reloadMember();
			});
		}

		function controller ($scope) {
			var vm = this;

			vm.Member = Member;
			vm.Member.editMode = false;
			vm.Member.loadMember = loadMember;
			vm.Member.reloadMember = loadMember;
			vm.Member.openPanel = openPanel;
			vm.Member.closePanel = closePanel;
			vm.Member.toggleEditMode = toggleEditMode;
			vm.Member.validEdition = validEdition;


			// ----- Resource management ----- //

			function loadMember() {
				vm.Member.find(vm.Member.clicked).then(function(member) {
					vm.Member.loaded = member;
					Log('ServicePanelDirective', 'Info', 'Service loaded');
					vm.Member.openPanel();
				});
			}

			function validEdition() {
				vm.Member.loaded.$update().then(function() {
					toggleEditMode();
					$scope.$emit('member-panel.directive > member.updated');
					Log('MemberPanelDirective', 'Info', vm.Member.loaded.name + ' saved');
				});
			}


			// ----- UI / UX ----- //

			function openPanel () {
				vm.Member.panelOpen = true;
				$scope.$emit('member-panel.directive > member.panelOpen');
			}

			function closePanel () {
				vm.Member.panelOpen = false;
				vm.Member.editMode = false;
				$scope.$emit('member-panel.directive > member.panelClosed');
			}

			function toggleEditMode () {
				vm.Member.editMode = !vm.Member.editMode
			}
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.directive('chMemberServices', chMemberServices);

	chMemberServices.$inject = ['officesService', 'membersService', '$q', 'logsService'];

	function chMemberServices (Office, Member, $q, Log) {

		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'scripts/directives/member-services.directive.html',
			link: link,
			controller: controller,
			controllerAs: 'dvm'
		};

		return directive;

		// ---------------- Functions ---------------- //

		function link (scope, element, attr, vm) {

		}

		function controller ($scope) {
			var vm = this;

			vm.Office = Office;

			vm.Member = Member;
			vm.Member.toggleMemberService = toggleMemberService;

			function toggleMemberService(service) {

				// Check if we're in edit mode
				if (service && vm.Member.editMode) {

					var isMember = vm.Member.isMemberOfThisService(vm.Member.loaded, service),
							isLeader = vm.Member.isLeaderOfThisService(vm.Member.loaded, service);

					// If member > become leader of the service
					if (isMember && !isLeader) {
						service.$update({ leader_id: vm.Member.loaded.id }).then(function(success) {
							$scope.$emit('member-services.directive > service.loaded.updated');
							Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' is now leader of service ' + service.name);
						});

					// Else if leader > leave service
					} else if (isLeader) {

						// Caution: order is crutial here! First leave the service as member,
						// if not, the server could reaffect the same member as leader,
						// because it takes the first member in the list as the new leader.

						// 1. Leave the service (membership part)
						vm.Member.leaveService(vm.Member.loaded, service).then(function() {

							// 2. Leave the service (leadership part)
							service.leader_id = 0;
							service.$update().then(function() {
								$scope.$emit('member-services.directive > service.loaded.updated');
								$scope.$emit('member-services.directive > member.loaded.updated');
								Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' has left service ' + service.name);
							});
						});

					// Else > join the service as member
					} else {
						vm.Member.joinService(vm.Member.loaded, service).then(function() {
							$scope.$emit('member-services.directive > member.loaded.updated');
							Log('MemberServiceDirective', 'Info', vm.Member.loaded.name + ' is now member of service ' + service.name);
						});
					}
				}
			}
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('membersService', membersService);

	membersService.$inject = ['$resource', 'ENV', '$rootScope', 'notify', '$q'];

	function membersService ($resource, ENV, $rootScope, notify, $q) {

		// Init attributes
		var clicked = undefined,
				loaded = undefined,
				panelOpen = false,
				resource = $resource(ENV.apiBaseURL + 'members/:id', { id: '@id' },
				{
					update: { method: 'PUT' }
				}),
				membership = $resource(ENV.apiBaseURL + 'memberships/:id', { id: '@id' },
				{
					create: { method: 'POST', params: {
						serviceId: '@serviceId',
						memberId: '@memberId'
					}},
					destroy: { method: 'DELETE', params: {
						serviceId: '@serviceId',
						memberId: '@memberId'
					}}
				});

		var Member = {
			clicked: clicked, // undefined on init
			loaded: loaded, // undefined on init
			panelOpen: panelOpen, // false on init
			find: find, // promise
			all: all, // promise
			isMemberOfThisService: isMemberOfThisService, // bool
			isLeaderOfThisService: isLeaderOfThisService, // bool
			joinService: joinService, // promise
			leaveService: leaveService // promise
		};

		return Member;

		// ---------------- Functions ---------------- //

		function find(memberId) {
			var deferred = $q.defer();
			if (memberId) {
				resource.get({ id: memberId }).$promise.then(function(member) {
					deferred.resolve(member);
				});
			}
			return deferred.promise;
		}

		function all(service) {
			var deferred = $q.defer();
			if (service) {
				resource.query({ serviceId: service.id }).$promise.then(function(members) {
					deferred.resolve(members);
				});
			} else {
				resource.query().$promise.then(function(members) {
					deferred.resolve(members);
				});
			}
			return deferred.promise;
		}

		function isMemberOfThisService(member, service) {
			if (member && service) {
				var isMember = false;

				angular.forEach(member.services, function(memberService) {
					if (!isMember && service.id === memberService.id) {
						isMember = true;
					};
				});

				return isMember;
			}
		}

		function isLeaderOfThisService(member, service) {
			if (member && service) {
				return service.leader_id === member.id;
			}
		}

		function joinService(member, service) {
			var deferred = $q.defer();

			membership.create({ memberId: member.id, serviceId: service.id }).$promise.then(function() {
				deferred.resolve();
			});

			return deferred.promise;
		}

		function leaveService(member, service) {
			var deferred = $q.defer();

			membership.destroy({ id: 42, memberId: member.id, serviceId: service.id }).$promise.then(function() {
				deferred.resolve();
			});

			return deferred.promise;
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('officesService', officesService);

	officesService.$inject = ['$resource', 'ENV', '$rootScope', '$q'];

	function officesService ($resource, ENV, $rootScope, $q) {

		var loaded = undefined,
				members = undefined,
				services = undefined,
				resource = $resource(ENV.apiBaseURL + 'offices/:id', { id: '@id' });

		var Office = {
			loaded: loaded, // undefined on init
			members: members, // undefined on init
			services: services, // undefined on init
			find: find // promise
		};

		return Office;

		// ---------------- Functions ---------------- //

		// id might equals:
		// => 'next', 'previous'
		// => an 'id'
		function find(id) {
			var deferred = $q.defer();
			if (id) {
				var date = (loaded && loaded.date) || null;
				resource.get({ id: id, date: date }).$promise.then(function(result) {
					deferred.resolve(result);
				});
			}
			return deferred.promise;
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['$resource', 'ENV', '$rootScope', '$q'];

	function servicesService ($resource, ENV, $rootScope, $q) {

		// Init attributes
		var clicked = undefined,
				loaded = undefined,
				panelOpen = false,
				displayAll = false,
				resource = $resource(ENV.apiBaseURL + 'services/:id', { id: '@id' },
				{
					update: { method: "PUT" },
					getOfficeServices: { method: 'GET', params: { officeId: "@officeId"}, isArray: true }
				});

		var Service = {
			clicked: clicked, // undefined on init
			loaded: loaded, // undefined on init
			panelOpen: panelOpen, // false on init
			displayAll: displayAll, // false on init
			find: find, // promise
			all: all, // promise
		};

		return Service;

		// ---------------- Functions ---------------- //

		function find(service) {
			var deferred = $q.defer();
			resource.get({ id: service.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}

		function all(office) {
			var deferred = $q.defer();
			resource.getOfficeServices({ officeId: office.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('churchOfficeManager')
		.factory('tasksService', tasksService);

	tasksService.$inject = ['$resource', 'ENV', '$q'];

	function tasksService ($resource, ENV, $q) {

		var resource = $resource(ENV.apiBaseURL + 'tasks/:id', { id: '@id' },
			{
				update: { method: 'PUT' },
				getServiceTasks: { method: 'GET', params: { serviceId: '@serviceId' }, isArray: true }
			}
		);

		var Task = {
			find: find, // promise
			all: all, // promise
			update: update // promise
		};

		return Task;

		// ---------------- Functions ---------------- //

		function find(task) {
			var deferred = $q.defer();
			resource.get({ id: task.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}

		function all(service) {
			var deferred = $q.defer();
			resource.getServiceTasks({ serviceId: service.id }).$promise.then(function(result) {
				deferred.resolve(result);
			});
			return deferred.promise;
		}

		function update(task) {
			var deferred = $q.defer();
			task.$update().then(function(success) {
					deferred.resolve();
			});
			return deferred.promise;
		}
	}

})();
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