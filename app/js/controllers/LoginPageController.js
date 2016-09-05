pitagoraApp.controller('LoginPageController',
	function($rootScope, $scope, $location, $window, auth) {

		$scope.user = {};

		$scope.login = function() {
			var usersData = {
				email: $scope.email,
				password: $scope.password
			};

			auth.login(userData).$promise.then(function(response) {
				if(response.success) {
					$window.localStorage.token = response.token;
					//$scope.tokenClaims = auth.getTokenClaims();
				} else {
					console.log(response.message);
				}

			})
		};

		$scope.register = function(user) {
			auth.register(user).$promise.then(function(response) {
				$window.localStorage.token = response.token;
				//$scope.tokenClaims = auth.getTokenClaims();
				$location.url('/Pitagora/logged');
			}, function(response) {
				console.log(response);
			});
			
		};

		$scope.logout = function() {
			auth.logout(function() {
				window.location = '/Pitagora';
			});
		};		
	});