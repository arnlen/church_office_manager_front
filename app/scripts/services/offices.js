'use strict';

app.factory('officesService', ['$resource', 'API_BASE_URL', 'servicesService', 'membersService', function ($resource, API_BASE_URL, servicesService, membersService) {

	var Office = {

		resource: $resource(API_BASE_URL + 'offices/:id',
			{
				id: '@id'
			}
		),

		// => notloadOfficeServicesOnCallback: block auto load services after the office loading
		load: function(scope, id, notloadOfficeServicesOnCallback, notloadChurchMembersOnCallback) {
			if (scope.office) { var date = scope.office.date }

			this.resource.get({ id: id, date: date }).$promise.then(function(result) {
				scope.office = result;

				if (!notloadOfficeServicesOnCallback) {
					servicesService.loadAll(scope, scope.office);
				}

				if (!notloadChurchMembersOnCallback) {
					membersService.loadAll(scope);
				}

			});
		}

	};

	return Office;

}]);