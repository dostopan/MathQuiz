pitagoraApp.controller('LoginPageController',
	function($rootScope, $scope, $location, $window, auth) {

		$scope.user = {};

		$scope.login = function(user) {
			var usersData = {
				email: $scope.email,
				password: $scope.password
			};
			auth.login(usersData).$promise.then(function(response) {
				if(response.success) {
					var token = $window.localStorage.getItem("token");
					$window.localStorage.token = response.token;
					$scope.tokenClaims = auth.getTokenClaims();
					console.log(token);
					$location.url('/Pitagora/logged');
				} else {
					console.log(response.message);
				}
			})
		};

		$scope.register = function(user) {
			auth.register(user).$promise.then(function(response) {
				$window.localStorage.token = response.token;
				$scope.tokenClaims = auth.getTokenClaims();
				$location.url('/Pitagora/logged');
			}, function(response) {
				console.log(response);
			});
		};

		$scope.token = $window.localStorage.token;
		
	});