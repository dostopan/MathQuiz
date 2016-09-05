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
			return window.atob(output);
		}

		function getClaimsFromToken() {
			var token = $window.localStorage.token;
			var user = {};
			if (token !== 'undefined') {
				var encoded = token.split('.')[1];
				user = JSON.parse(urlBase64Decode(encoded));
			}
			return user;
		}

		return {
			register: function(user) {
				return $resource('/api/saveuser').save(user);
			},
			login: function() {
				return $resource('').save();
			},
			getTokenClaims: getClaimsFromToken
		}
	});