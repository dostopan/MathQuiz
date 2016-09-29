pitagoraApp.controller('LoggedPageController',
	function($rootScope, $scope, auth, $window, $location, ModalService) {
		$scope.users = auth.getAllUsers();
		
		$scope.logout = function () {
			delete $window.localStorage.token;
			$location.url('/Pitagora');
		};

		$scope.show = function() {
			ModalService.showModal({
				templateUrl: '/../../templates/directives/modal.html',
				controller: "ModalController"
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
					console.log(result);
				});
			});
		};

	});