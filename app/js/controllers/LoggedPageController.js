pitagoraApp.controller('LoggedPageController',
	function($rootScope, $scope, auth, $window, $location) {
		$scope.users = auth.getAllUsers();
		
		$scope.logout = function () {
			delete $window.localStorage.token;
			$location.url('/Pitagora');
		};

	});