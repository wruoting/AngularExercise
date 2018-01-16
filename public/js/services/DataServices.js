angular.module('DataServices', [])
		// super simple service
		// each function returns a promise object
		.factory('HTTP_Request', HTTP_Request)

		HTTP_Request.$inject = ['$http']
		function HTTP_Request($http) {
				return {
					get : function() {
						return $http.get('/api/data');
					},
					create : function(data) {
						return $http.post('/api/data', data);
					},
					delete : function(id) {
						return $http.delete('/api/data/' + id);
					}
				}
			};
