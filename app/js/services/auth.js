pitagoraApp.factory('auth',
	function($resource, $window) {
		function urlBase64Decode(str) {
			var output = str.replace('-', '+').replace('_', '/');
			switch (output.length % 4) {
				case 0:
					break;
				case 2:
					output += '==';
					break;
				case 3:
					output += '=';
					break;
				default:
					throw 'Illegal base64url string.';
			}
			return $window.atob(output);
		}

		function getClaimsFromToken() {
			var token = $window.localStorage.token;
			console.log(token);
			var user = {};
			if (token !== 'undefined') {
				var encoded = token.split('.')[1];
				user = JSON.parse(urlBase64Decode(encoded));
				console.log(user);
			}
			return user;
		}

		return {
			register: function(user) {
				return $resource('/api/saveuser').save(user);
			},
			login: function(user) {
				return $resource('/api/loginuser').save(user);
			},
			getCurrentUser: function() {
				return currentUser;
			},
			getAllUsers: function() {
				return $resource('/api/usersList').get();
			},
			saveQuestion: function(question) {
				return $resource('/api/savequestion').save(question);
			},
			getAllQuestions: function() {
				return $resource('/api/questionList').get();
			},
			getUserById: function(userId) {
				return $resource('/api/usersList/:id', { _id : '@id' }).get({_id:userId});
			},
			saveQuiz: function(quiz) {
				return $resource('/api/savequiz').save(quiz);
			},
			getAllQuizzes: function() {
				return $resource('/api/quizList').get();
			},
			getTokenClaims: getClaimsFromToken
		}
	});