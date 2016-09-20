pitagoraApp.controller('AllQuestionsController',
	function($rootScope, $scope, auth, $window, $location, $route) {

		$scope.questions = auth.getAllQuestions();
		$scope.question = {};
		
		$scope.submitQuestion = function(question) {
			auth.saveQuestion(question).$promise.then(
				function(response) {
					$location.url('/Pitagora/allQuestions');
				},
				function(response){console.log('Something went wrong.');}
			);
		};

		$scope.checkRightAnswer = function() {
			var answers = $scope.question.answers;
			var rightAnswer = $scope.question.rightAnswer;
			
			if(answers.indexOf(rightAnswer) == -1) {
				document.getElementById("confBtn").disabled = true;
				$scope.answerMessage = true;
			} else {
				document.getElementById("confBtn").disabled = false;
				$scope.answerMessage = false;
			}
		}

		$scope.toggleAccordion = function(id) {
			var x = document.getElementById(id);
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else {
				x.className = x.className.replace(" w3-show", "");
			}
		};

	});