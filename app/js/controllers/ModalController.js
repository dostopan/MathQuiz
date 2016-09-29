pitagoraApp.controller('ModalController', function($scope, close, auth, $location) {
  
	$scope.question = {};
		
	$scope.submitQuestion = function(question) {
		auth.saveQuestion(question).$promise.then(
			function(response) {
				$location.url('/Pitagora/allQuestions');
				$scope.question = {};
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

});