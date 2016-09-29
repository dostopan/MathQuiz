pitagoraApp.controller('AllQuizzesController',
	function($rootScope, $scope, auth, $window, $location, ModalService) {

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

		(function($) {
			var $window = $(window),
				$contentBtn = $('.contentBtn'),
				$sideNav = $('.sideNav'),
				$topNav = $('.topNav');

			function resize() {
				if ($window.width() < 450) {
					return $contentBtn.addClass('pull-right'),
							$sideNav.hide(),
							$topNav.show();		
				}

				$contentBtn.removeClass('pull-right');
				$sideNav.show();
				$topNav.hide();
			}

			$window
			.resize(resize)
			.trigger('resize');
		})(jQuery);
	});