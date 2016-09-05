pitagoraApp.controller('LoggedPageController',
	function($rootScope, $scope, data) {
		data.getLoggedData(function(res) {
			$scope.data = res.data;
		}, function() {
			$rootScope.error = 'Failed to fetch restricted content.';
		});
		data.getApiData(function(res) {
			$scope.api = res.data;
		}, function() {
			$rootScope.error = 'Failed to fetch logged API content.';
		});
	});