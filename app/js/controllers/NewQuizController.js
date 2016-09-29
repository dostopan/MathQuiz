pitagoraApp.controller('NewQuizController',
	function($rootScope, $scope, auth, $window, $location, ModalService) {

		$scope.questions = auth.getAllQuestions();
		$scope.quiz = {};

		$scope.quiz.quizQuestions = [];

		$scope.$watchCollection( 'quiz.quizQuestions', function(newVal){
			for( var i = 0; i < newVal.length; ++i ) {

			return $scope.quiz.quizQuestions;
			}
		});

		$scope.submitQuiz = function(quiz) {
			auth.saveQuiz(quiz).$promise.then(
				function(response) {
					console.log('Hello from saveQuiz.');
					$location.url('/Pitagora/allQuizzes');
				},
				function(response){console.log('Something went wrong.');}
			);
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
				if ($window.width() < 768) {
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