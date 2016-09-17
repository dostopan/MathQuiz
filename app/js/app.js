'use strict';

var pitagoraApp = angular.module("pitagoraApp", ["ngRoute", "ngResource"])
	.config(function($routeProvider, $locationProvider, $httpProvider){
		$routeProvider.when("/Pitagora",
			{
				templateUrl : "templates/loginPage.html",
				controller : "LoginPageController",
				authenticate: false
			});
		$routeProvider.when("/Pitagora/logged",
			{
				templateUrl : "templates/loggedPage.html",
				controller : "LoggedPageController",
				authenticate: true,
				resolve: {
					users: function(auth) {
						return auth.getAllUsers().$promise;
					}
				}
			});
		$routeProvider.when("/Pitagora/allQuestions",
			{
				templateUrl : "templates/allQuestions.html",
				controller : "AllQuestionsController",
				authenticate : true
			});
		$locationProvider.html5Mode(
    		{
        		enabled : true, 
        		requireBase : false
    		});
		$routeProvider.otherwise({redirectTo: '/Pitagora'});
		$httpProvider.interceptors.push(function($q, $location, $window) {
			return {
				'request' : function(config) {
					config.headers = config.headers || {};
					if ($window.localStorage.token) {
						config.headers['x-access-token'] = $window.localStorage.token;
					}
					return config;
				},
				'responseError' : function(res) {
					if (res.status ===401 || res.status === 403) {
						$location.path('/Pitagora');
					}
					return $q.reject(res);
				}
			}
		});
	})
	.run(function($rootScope, $window) {
		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			if(next.authenticate) {
				if (!$window.localStorage.token) {
					event.preventDefault();
					$window.location = '/Pitagora';
				}
			}
		});
	});