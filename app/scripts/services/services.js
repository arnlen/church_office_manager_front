'use strict';

app.factory('servicesService', ['$resource', 'API_BASE_URL', 'tasksService', 'membersService', function ($resource, API_BASE_URL, tasksService, membersService) {

	// Will be returned by the service
	var Service = {

		resource: $resource(API_BASE_URL + 'services/:id',
			{
				id: '@id'
			},
			{
				update: { method: "PUT" },
				getOfficeServices: { method: 'GET', params: { officeId: "@officeId"}, isArray: true },
				getServiceMembers: { method: 'GET', params: { getMembers: true}, isArray: true }
			}
		),

		loadOne: function(scope, service, notloadServiceTasksOnCallback, notloadServiceMembersOnCallback) {

			this.resource.get({ id: service.id }).$promise.then(function(result) {
				scope.loadedService = result;

				if (!notloadServiceTasksOnCallback) {
					tasksService.loadAll(scope, scope.loadedService);
				}

				if (!notloadServiceMembersOnCallback) {
					membersService.loadAll(scope, scope.loadedService);
				}

			});
		},

		loadAll: function(scope, office) {
			this.resource.getOfficeServices({ officeId: office.id }).$promise.then(function(result) {
				scope.services = result;
			});
		}

	};

	return Service;

}]);