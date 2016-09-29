pitagoraApp.controller('AllQuestionsController',
	function($rootScope, $scope, auth, $window, $location, $route, ModalService) {

		$scope.questions = auth.getAllQuestions();

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

		$scope.toggleAccordion = function(id) {
			var x = document.getElementById(id);
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else {
				x.className = x.className.replace(" w3-show", "");
			}
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