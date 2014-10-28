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